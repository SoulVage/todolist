import { useEffect, useState } from "react";
import { IoAlert } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import "./Notification.css";
function Notification({ type, desc, children }) {
  const [isOpen, setIsOpen] = useState(true);
  const colors = {
    alert: "bg-red-500 text-red-500",
    success: "green-500",
    normal: "white",
    default: "gray-500",
  };

  const color = colors[type] || colors.default;

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  const closeToast = () => setIsOpen(false);
  console.log(color);
  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed bottom-10 left-10 overflow-hidden w-80 h-22 flex items-center
        bg-white/80 
        shadow-xl backdrop-blur-xl rounded-lg z-999
        dark:bg-white/10
      `}
    >
      <span className="p-1.5 rounded-full ml-4 w-fit bg-black/5 dark:bg-white/5">
      <span
      style={{boxShadow: "rgba(234, 10, 10, 0.12) 0px 0px 60px 60px"}}
        className={`
          w-fit text-lg p-1 rounded-full flex items-center justify-center
          ${type === "alert" && "bg-[#f04248] text-white dark:text-[#523b42]"}
          ${type === "success" && "bg-green-500/10 text-green-500"}
          ${type === "normal" && "bg-white/10 text-white"}
          ${
            !["alert", "success", "normal"].includes(type) &&
            "bg-gray-500/10 text-gray-500"
          }
        `}
      >
        <IoAlert />
      </span>
      </span>

      <span className="ml-4">
        <h3 className="text-md dark:text-white/90">
          {children || "عنوان نوتیفیکیشن"}
        </h3>
        <p className="text-sm dark:text-white/50">{desc}</p>
      </span>

      <IoMdClose
        onClick={closeToast}
        className="absolute top-3 right-3 text-xl cursor-pointer dark:text-white"
      />

      <div className="absolute overflow-hidden bottom-1 w-[95%] rounded-xl -translate-x-1/2 left-1/2 h-1 bg-white/10">
        <div
          style={{ animation: "bar 5s linear" }}
          className="w-0 h-full bg-black/20"
        ></div>
      </div>
    </div>
  );
}

export default Notification;
