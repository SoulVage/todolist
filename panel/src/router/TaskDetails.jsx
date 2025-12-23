import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import Modal from "../components/Modal";
import { FaCheck } from "react-icons/fa6";
import { AiOutlineLoading } from "react-icons/ai";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function TaskDetails() {
  const { id, category } = useParams();
  const navigate = useNavigate();
  const { tasks, loading, fetchTasks } = useTasks();
  const [ isClose, setIsClose ] = useState(false)
  const task = tasks.find((t) => t.id == Number(id));
  const [subtasks, setSubtasks] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  // بارگذاری subtasks وقتی task آماده شد
  useEffect(() => {
    if (task?.subtasks) setSubtasks(task.subtasks);
  }, [task]);

  const toggleSubtask = (index) => {
    setSubtasks((prev) =>
      prev.map((tsk, i) => (i === index ? { ...tsk, done: !tsk.done } : tsk))
    );
  };

  const saveChanges = async () => {
    if (saveLoading) return;
    setSaveLoading(true);
    try {
      // 1) ذخیره تمام subtasks
      await Promise.all(
        subtasks.map((tsk) =>
          supabase.from("subtasks").update({ done: tsk.done }).eq("id", tsk.id)
        )
      );

      // 2) محاسبه درصد جدید
      const doneCount = subtasks.filter((s) => s.done).length;
      const total = subtasks.length;
      const newPercent =
        total === 0 ? 0 : Math.round((doneCount / total) * 100);

      // 3) ذخیره درصد جدید در دیتابیس
      await supabase
        .from("tasks")
        .update({ percent: newPercent })
        .eq("id", task.id);
      await fetchTasks();
      toast.success("تغییرات شما ذخیره شد");
      navigate(`/tasks/${category}`);
    } catch (err) {
      console.error("Error saving subtasks:", err);
    } finally {
      setSaveLoading(false);
    }
  };

  const deleteTask = async () => {
    if (delLoading) return;
    setDelLoading(true);
    await supabase.from("subtasks").delete().eq("task_id", task.id);
    await supabase.from("tasks").delete().eq("id", task.id);
    toast.success("تسک شما حذف شد");
    navigate(`/tasks/${category}`);
    await fetchTasks();
  };
  const handleClose = () => {
    setIsClose(true)
    setTimeout(()=> {
      navigate(`/tasks/${category}`)
    },300)
  }
  if (loading || !task) return null;
  return (
    <Modal go={`/tasks/${category}`} isClose={isClose} open={!isClose}> 
      <div className="w-full p-2 bg-white dark:bg-gray-500/10 backdrop-blur-xl rounded-xl">
        <div className="w-full h-20 bg-black/10 rounded-t-xl dark:bg-white/7"></div>
        <div className="w-full p-4 flex flex-col text-right">
          <div className="flex flex-row-reverse gap-10 mt-4 items-start">
            <div>
              <h2
                className="border-r-3 text-lg border-blue-500 px-2 dark:text-white/90"
                dir="rtl"
              >
                {task.title}
              </h2>
              <p className="mt-2 text-sm text-black/60 dark:text-white/70">
                {task.category}
              </p>

              <p className="mt-10 text-sm text-black/60 dark:text-white/30">
                : توضیح
              </p>
              <div
                className="text-sm p-4 mt-4 bg-black/5 rounded-xl dark:bg-white/5 dark:text-white/70"
                dir="rtl"
              >
                {task.description}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {subtasks.map((tsk, index) => (
                <div
                  key={tsk.id}
                  className="flex w-full justify-between items-center cursor-pointer min-w-80"
                  onClick={() => toggleSubtask(index)}
                >
                  <div
                    className={`p-1 text-xs rounded-2xl border text-white border-blue-500 transition-colors duration-300 ${
                      tsk.done ? "bg-blue-500" : "text-white/0"
                    }`}
                  >
                    <FaCheck />
                  </div>
                  <div className="flex items-center gap-4 dark:text-white/80">
                    <span dir="rtl">{tsk.text}</span>
                    <span className="h-5 text-blue-500 text-xs w-5 flex items-center justify-center bg-blue-500/5 rounded-lg border border-blue-500 leading-1 pt-0.5">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-black/20 mt-20"></div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-3">
              <button
                onClick={saveChanges}
                className="px-5 py-3 bg-black rounded-lg text-sm text-white dark:text-black dark:bg-white"
              >
                {saveLoading ? (
                  <span className="flex items-center gap-2">
                    <AiOutlineLoading className="animate-spin" />
                    در حال ذخیره
                  </span>
                ) : (
                  "ثبت تغییرات"
                )}
              </button>
              <button
                onClick={handleClose}
                className="px-5 py-3 rounded-lg text-sm text-black/90 border border-black/30 dark:bg-white/10 dark:text-white"
              >
                کنسل
              </button>
            </div>
            <button
              onClick={deleteTask}
              disabled={saveLoading}
              className="px-5 py-3 rounded-lg text-sm text-red-500 bg-red-500/10"
            >
              {delLoading ? (
                <span className="flex items-center gap-2">
                  <AiOutlineLoading className="animate-spin" />
                  در حال حذف
                </span>
              ) : (
                "حذف"
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TaskDetails;
