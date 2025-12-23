import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useTasks } from "../context/TaskContext";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function AddModal() {
  const { fetchTasks } = useTasks();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null);

  const [subtaskText, setSubtaskText] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // افزودن زیرتسک با Enter
  const handleSubtaskKeyDown = (e) => {
    if (e.key === "Enter" && subtaskText.trim()) {
      e.preventDefault();
      setSubtasks((prev) => [...prev, { text: subtaskText.trim() }]);
      setSubtaskText("");
    }
  };

  // ساخت تسک
  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error("عنوان تسک الزامی است");
      return;
    }

    if (!date) {
      toast.error("تاریخ را انتخاب کنید");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ insert task (بدون id)
      const { data: task, error: taskError } = await supabase
        .from("tasks")
        .insert([
          {
            title: title.trim(),
            description: desc.trim(),
            category,
            date: dayjs(date).format("YYYY-MM-DD"),
          },
        ])
        .select()
        .single();

      if (taskError) {
        console.error(taskError);
        toast.error(taskError.message);
        return;
      }

      // 2️⃣ insert subtasks
      if (subtasks.length > 0) {
        const payload = subtasks.map((s) => ({
          task_id: task.id,
          text: s.text,
          done: false,
        }));

        const { error: subError } = await supabase
          .from("subtasks")
          .insert(payload);

        if (subError) {
          console.error(subError);
          toast.error(subError.message);
          return;
        }
      }
      await fetchTasks();
      toast.success("✅ تسک با موفقیت ساخته شد");

      // reset
      setTitle("");
      setDesc("");
      setCategory("");
      setDate(null);
      setSubtasks([]);
      setSubtaskText("");
    } catch (err) {
      console.error(err);
      toast.error("خطای غیرمنتظره");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white gap-6 flex p-4">
      <div className="flex flex-col gap-6 w-80">
        <TextField
          label="عنوان تسک"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          dir="rtl"
        />

        <TextField
          label="توضیحات"
          multiline
          minRows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          dir="rtl"
        />

        <FormControl>
          <InputLabel>دسته بندی</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="دسته بندی"
          >
            <MenuItem value="">هیچ کدام</MenuItem>
            <MenuItem value="روزانه">روزانه</MenuItem>
            <MenuItem value="برنامه نویسی">برنامه نویسی</MenuItem>
            <MenuItem value="امتحانات">امتحانات</MenuItem>
            <MenuItem value="انگلیسی">انگلیسی</MenuItem>
            <MenuItem value="تکالیف">تکالیف</MenuItem>
          </Select>
        </FormControl>

        {/* زیرتسک */}
        <TextField
          variant="standard"
          label="اضافه کردن زیرتسک (Enter)"
          value={subtaskText}
          onChange={(e) => setSubtaskText(e.target.value)}
          onKeyDown={handleSubtaskKeyDown}
          dir="rtl"
        />

        <div className="h-40 overflow-y-auto flex flex-col gap-2">
          {subtasks.map((s, i) => (
            <div key={i} className="p-2 rounded bg-black/5 text-sm" dir="rtl">
              {s.text}
            </div>
          ))}
        </div>

        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "در حال ساخت..." : "ساختن تسک"}
        </Button>
      </div>

      <StaticDatePicker value={date} onChange={setDate} />
    </div>
  );
}

export default AddModal;
