import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import shamsi from "shamsi-date-converter";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const models = ["openai/gpt-4o-mini", "openai/gpt-3.5-turbo"];

// حافظه چت
let chatHistory = [];

// قوانین سیستم
const systemRules = `
You are Neo, a warm and friendly Persian AI ToDo assistant.

You ONLY answer based on provided tasks. Never invent tasks.

Date rules:
- Today's Jalali date is today_jalali_text
- Today's weekday is today_weekday
- NEVER guess date or weekday
- When greeting, naturally mention today's date

Important meanings:
- percent = completion progress
- Hardest task = lowest percent
- Easiest task = highest percent
- Today's tasks = tasks with today's date (today_gregorian)
- This week's tasks = tasks_this_week

Conversation rules:
- If user asks "چرا" → explain based on previous question
- If user asks "الان ازت چی پرسیدم؟" → tell previous question
- If unrelated → politely say you only help with tasks
- Tone: warm, friendly, supportive
- You are "Neo"
`;

// گرفتن تسک‌ها و subtasks
async function fetchTasksWithSubtasks() {
  const { data: tasksData } = await supabase
    .from("tasks")
    .select("*")
    .order("id", { ascending: true });

  if (!tasksData) return [];

  return Promise.all(
    tasksData.map(async (task) => {
      const { data: subs } = await supabase
        .from("subtasks")
        .select("*")
        .eq("task_id", task.id)
        .order("id", { ascending: true });

      return { ...task, subtasks: subs || [] };
    })
  );
}

// محاسبه محدوده هفته جاری (دو شنبه تا یکشنبه)
function getWeekRange(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday...
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMon);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return [monday, sunday];
}

// فیلتر تسک‌های هفته جاری
function filterTasksThisWeek(tasks, today) {
  const [weekStart, weekEnd] = getWeekRange(today);
  return tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return taskDate >= weekStart && taskDate <= weekEnd;
  });
}

// API اصلی
app.post("/api/message", async (req, res) => {
  const userText = req.body.text;
  chatHistory.push({ role: "user", content: userText });

  const now = new Date();

  const weekdays = [
    "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", 
    "پنجشنبه", "جمعه", "شنبه"
  ];

  const months = [
    "فروردین","اردیبهشت","خرداد","تیر","مرداد",
    "شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"
  ];

  const yyyy = now.getFullYear();
  const mm = now.getMonth() + 1;
  const dd = now.getDate();

  const [jy, jm, jd] = shamsi.gregorianToJalali(yyyy, mm, dd);

  const todayGregorian = `${yyyy}-${String(mm).padStart(2,"0")}-${String(dd).padStart(2,"0")}`;
  const todayJalaliText = `${jd} ${months[jm-1]} ${jy}`;
  const todayWeekday = weekdays[now.getDay()];

  // سوال قبلی
  const lastUserQuestion =
    [...chatHistory]
      .reverse()
      .find(m => m.role === "user" && m.content !== userText)?.content || "";

  // تسک‌ها
  const tasks = await fetchTasksWithSubtasks();
  const tasksThisWeek = filterTasksThisWeek(tasks, now);

  // پیام نهایی به AI
  const finalUserMessage = `
tasks: ${JSON.stringify(tasks)}
tasks_this_week: ${JSON.stringify(tasksThisWeek)}
current_question: "${userText}"
previous_question: "${lastUserQuestion}"
today_gregorian: "${todayGregorian}"
today_jalali_text: "${todayJalaliText}"
today_weekday: "${todayWeekday}"
`;

  let aiMessage = "Neo: مشکلی پیش آمد.";

  for (const model of models) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemRules },
            ...chatHistory,
            { role: "user", content: finalUserMessage }
          ]
        })
      });

      const data = await response.json();
      if (data?.choices?.[0]?.message?.content) {
        aiMessage = data.choices[0].message.content;
        break;
      }
    } catch (err) {
      console.log("Model error:", err);
    }
  }

  chatHistory.push({ role: "assistant", content: aiMessage });
  res.json({ message: aiMessage });
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);
