import React from "react";
import orbImg from "../../assets/orb.png";
import "./PreChatBot.css";
import ideaImg from "../../assets/idea.png";
import questionImg from "../../assets/question.png";
import hourImg from "../../assets/hour-glass.png";

function PreChatBot({ onSend }) {
  const handleReadyCmd = (cmd) => {
    onSend(cmd);
  };
  const data = [
    {
      title: "چند تا ایده بده",
      desc: "چند تا ایده مرتبط به درسام بده که انجام بدم و جالب باشن",
      img: ideaImg,
      style: "bg-yellow-50 dark:bg-yellow-500/10",
    },
    {
      title: "امروز چیا دارم؟",
      desc: "چند تا ایده مرتبط به درسام بده که انجام بدم و جالب باشن",
      img: questionImg,
      style: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      title: "سخت ترین تکلیفم چیه؟",
      desc: "چند تا ایده مرتبط به درسام بده که انجام بدم و جالب باشن",
      img: hourImg,
      style: "bg-green-50 dark:bg-green-500/10",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img src={orbImg} className="w-28 mb-10" alt="" />
      <h1 className="text-2xl dark:text-white/80">
        به دستیار هوش مصنوعی من خوش اومدی
      </h1>
      <div className="flex gap-4 mt-8">
        {data.map((item, index) => {
          return (
            <div
              onClick={() => handleReadyCmd(item.title)}
              key={index}
              className="ready-card flex flex-1 flex-col border justify-end text-right bg-white border-black/10 p-6  cursor-pointer rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors duration-500 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-blue-500/10 dark:hover:border-blue-500/50"
            >
              <span className={`p-2 ${item.style} w-fit ml-auto rounded-2xl`}>
                <img className="w-6" src={item.img} alt="" />
              </span>
              <h3 className="mt-4 text-lg">{item.title}</h3>
              <p className="text-black/50 text-sm dark:text-white/60">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PreChatBot;
