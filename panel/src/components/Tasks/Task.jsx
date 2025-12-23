import React from "react";
import { toJalaali } from "jalaali-js";
import "./Task.css";
import { Link, useParams } from "react-router-dom";
const WEEKDAYS_PERSIAN = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

function formatJalali(dateString) {
  const d = new Date(dateString); // مثلاً "2025-07-15"
  const weekday = WEEKDAYS_PERSIAN[d.getDay()];

  const { jm, jd } = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());

  const mm = String(jm).padStart(2, "0");
  const dd = String(jd).padStart(2, "0");

  return `${weekday} ${mm}/${dd}`;
}

function Task({ id, title, category, percent, date }) {
  const formattedDate = formatJalali(date);
  const param = useParams()

  return (
    <Link to={`/tasks/${param.category}/${id}`}>
      <div className="task flex flex-col transition-colors duration-300 cursor-pointer justify-between min-h-40 bg-white w-full p-5 rounded-xl border border-black/10 gap-6 dark:bg-white/5 dark:border-white/10 hover:border-blue-300 hover:bg-blue-500/5">
        <div className="flex items-start justify-between gap-10">
          <p className="text-sm text-nowrap dark:text-white/40">
            {formattedDate}
          </p>

          <div className="text-right">
            <h2 className="text-lg dark:text-white/90" dir="rtl">
              {title}
            </h2>
            <p className="text-sm text-black/70 dark:text-white/60">
              {category}
            </p>
          </div>
        </div>

        <div className="w-full bg-black/10 h-1 rounded-3xl overflow-hidden">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    </Link>
  );
}

export default Task;
