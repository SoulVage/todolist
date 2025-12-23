import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 گرفتن تسک‌ها و subtasks مرتب
  const fetchTasks = async () => {
    setLoading(true);

    const { data: tasksData, error: tasksError } = await supabase
      .from("tasks")
      .select("*");

    if (tasksError) {
      console.error("Error fetching tasks:", tasksError);
      setLoading(false);
      return;
    }

    const tasksWithSubtasks = await Promise.all(
      tasksData.map(async (task) => {
        const { data: subs, error: subError } = await supabase
          .from("subtasks")
          .select("*")
          .eq("task_id", task.id)
          .order("id", { ascending: true }); // 🔹 مرتب‌سازی subtasks بر اساس id

        if (subError) {
          console.error(`Error fetching subtasks for task ${task.id}:`, subError);
        }

        return { ...task, subtasks: subs || [] };
      })
    );

    setTasks(tasksWithSubtasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
