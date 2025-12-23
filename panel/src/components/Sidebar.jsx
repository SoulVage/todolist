import React, { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { GrTask } from "react-icons/gr";
import { MdAccessTime } from "react-icons/md";
import { IoBookOutline } from "react-icons/io5";
import { IoLanguageOutline } from "react-icons/io5";
import { GoPaperclip } from "react-icons/go";
import { IoIosCode } from "react-icons/io";
import { RiHomeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Sidebar() {
  // const [isOpen, setIsOpen] = useState();
  const [currentTab, setCurrentTab] = useState("دستیار من");
  const sidebarItems = [
    [
      {
        label: "دستیار من",
        icon: [<FaRegStar style={{ color: "green" }} />],
        style: "bg-green-100 dark:bg-green-400/10",
        link: "/",
      },
      {
        label: "وظایف",
        icon: [<GrTask style={{ color: "orange" }} />],
        style: "bg-orange-100 dark:bg-orange-400/10",
        link: "/tasks/all",
      },
      {
        label: "آخرین ها",
        icon: [<MdAccessTime style={{ color: "purple" }} />],
        style: "bg-purple-100 dark:bg-purple-400/10",
        link: "/latest",
      },
    ],
    [
      {
        label: "تکالیف",
        icon: [<IoBookOutline />],
        link: "homeworks",
      },
      {
        label: "انگلیسی",
        icon: [<IoLanguageOutline />],
        link: "english",
      },
      {
        label: "امتحانات",
        icon: [<GoPaperclip />],
        link: "exam",
      },
      {
        label: "برنامه نویسی",
        icon: [<IoIosCode />],
        link: "coding",
      },
      {
        label: "روزانه",
        icon: [<RiHomeLine />],
        link: "daily",
      },
    ],
  ];
  console.log(currentTab);
  return (
    <aside className="w-70 p-8 bg-white h-screen border-l border-black/10 transition-colors duration-500 dark:bg-[#1d1e22] dark:border-white/10">
      <div className="w-full text-md justify-between flex items-center mb-6 dark:text-white/80">
        <CiMenuFries className="text-md" />
        داشبورد
      </div>
      <button className="bg-black flex items-center justify-center gap-2 text-white w-full p-2 text-sm rounded-4xl dark:bg-[#3b474d]">
        تسک جدید
        <MdOutlineTaskAlt />
      </button>
      <div className="flex justify-end items-center text-black/60 text-sm gap-2 my-5 dark:text-white/40">
        ویژه
        <FaRegStar />
      </div>
      <div>
        {sidebarItems[0].map((item, index) => {
          return (
            <Link key={index} to={item.link}>
              <div
                onClick={() => setCurrentTab(item.label)}
                className={`w-full flex items-center justify-between p-3 transition-all duration-300 hover:pr-5 dark:text-white/80 dark:hover:bg-[#22262b] hover:bg-black/3 rounded-xl ${
                  currentTab == item.label ? "bg-black/5 dark:bg-[#22262b]" : ""
                }`}
              >
                <BsThreeDots className="text-sm text-black/40 dark:text-white/30" />
                <div className="flex items-center gap-4 text-sm">
                  {item.label}
                  <span className={`${item.style} p-1.5 rounded-full`}>
                    {item.icon}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="w-full h-px my-6 bg-black/10 dark:bg-white/10"></div>
      <div>
        {sidebarItems[1].map((item, index) => {
          return (
            <Link to={`/tasks/${item.link}`}>
              <div
                onClick={() => setCurrentTab(item.label)}
                key={index}
                className={`w-full flex items-center justify-between p-3 transition-all duration-300 hover:pr-5 dark:text-white/80 dark:hover:bg-[#22262b] hover:bg-black/3 rounded-xl ${
                  currentTab == item.label ? "bg-black/5 dark:bg-[#22262b]" : ""
                }`}
              >
                <div></div>
                <div className="flex items-center gap-4 text-sm">
                  {item.label}
                  <span
                    className={`bg-black/5 p-1.5 rounded-full dark:bg-white/5`}
                  >
                    {item.icon}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
