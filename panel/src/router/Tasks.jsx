import { useEffect, useState } from "react";
import Task from "../components/Tasks/Task";
import "./Default.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Outlet, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import notFoundImg from "../assets/404.png"
import { Link } from "react-router-dom";
function Tasks() {
  const { tasks, loading } = useTasks();
  const param = useParams();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsOpen(true), 20);
  }, []);
  const getCategoryName = (category) => {
    if (category === "homeworks") return "تکالیف";
    if (category === "english") return "انگلیسی";
    if (category === "coding") return "برنامه نویسی";
    if (category === "exam") return "امتحانات";
    if (category === "daily") return "روزانه";
    return category; // اگر category ناشناخته بود، همون رو برگردون
  };
  let filteredTasks = tasks.filter(
    (task) => getCategoryName(param.category) === task.category
  );
  if (filteredTasks.length <= 0 && param.category === "all") {
    filteredTasks = tasks
  }
  const sortedTasks = [...filteredTasks].sort((a, b) => b.percent - a.percent);

  return (
    <div className="relative w-full h-full">
      <div
        className={`z-20 w-full h-fit grid grid-cols-3 transition-all duration-300 gap-4 p-6 ${
          isOpen ? "opacity-100 scale-100" : "scale-90 opacity-0"
        }`}
      >
        {
          sortedTasks.length <= 0 && !loading && <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <img src={notFoundImg} className="w-90" alt="" />
            <h1 className="text-center text-2xl">چیزی یافت نشد</h1>
            <Link to="/tasks/all">
            <button className="py-2 px-4 bg-white border border-black/20 rounded-lg mt-6">برگشت به همه</button>
            </Link>
          </div>
        }
        {!loading &&
          sortedTasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              category={task.category}
              percent={task.percent}
              date={task.date}
            />
          ))}

        {loading && (
          <>
            <div className="task flex flex-col gap-4 p-5 min-h-40 bg-white rounded-xl border max-w-100 border-black/10 dark:bg-white/5 dark:border-white/10">
              <Skeleton height={20} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={8} width="100%" borderRadius={999} />
            </div>
            <div className="task flex flex-col gap-4 p-5 min-h-40 bg-white rounded-xl border max-w-100 border-black/10 dark:bg-white/5 dark:border-white/10">
              <Skeleton height={20} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={8} width="100%" borderRadius={999} />
            </div>
            <div className="task flex flex-col gap-4 p-5 min-h-40 bg-white rounded-xl border max-w-100 border-black/10 dark:bg-white/5 dark:border-white/10">
              <Skeleton height={20} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={8} width="100%" borderRadius={999} />
            </div>
            <div className="task flex flex-col gap-4 p-5 min-h-40 bg-white rounded-xl border max-w-100 border-black/10 dark:bg-white/5 dark:border-white/10">
              <Skeleton height={20} width={150} />
              <Skeleton height={25} width={200} />
              <Skeleton height={8} width="100%" borderRadius={999} />
            </div>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Tasks;
