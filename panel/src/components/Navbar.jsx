import { BsStars } from "react-icons/bs";
import Button from "@mui/material/Button";
import { IoSettingsOutline } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { IoCodeSlashOutline } from "react-icons/io5";
import { useTheme } from "./ToggleDark";
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import AddModal from "./AddModal";
function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pb-6 w-full flex items-center justify-between">
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddModal />
        </Modal>
      )}
      <div className="flex gap-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="contained"
          sx={{
            backgroundColor:
              theme == "dark" ? "rgba(255, 255, 255, 1)" : "black",
            color: theme == "dark" ? "black" : "white",
            fontSize: "14px",
            border: "solid #0000002A 1px",
            fontFamily: "Yekan",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderRadius: "20px",
            padding: "5px 12px",
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          اضافه کردن
          <IoAddSharp />
        </Button>
        <Button
          variant="contained"
          onClick={toggleTheme}
          sx={{
            backgroundColor:
              theme == "dark" ? "rgba(255, 255, 255, 0.1)" : "white",
            color: theme == "dark" ? "white" : "black",
            fontSize: "15px",
            border: "solid #0000002A 1px",
            fontFamily: "Yekan",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderRadius: "20px",
            padding: "5px 12px",
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          {theme == "dark" ? "روشن" : "تاریک"}
          {theme == "dark" ? <FiSun /> : <FaRegMoon />}
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              theme == "dark" ? "rgba(255, 255, 255, 0.1)" : "white",
            color: theme == "dark" ? "white" : "black",
            fontSize: "15px",
            border: "solid #0000002A 1px",
            fontFamily: "Yekan",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderRadius: "20px",
            padding: "5px 12px",
            ":hover": {
              boxShadow: "none",
            },
          }}
        >
          تنظیمات
          <IoSettingsOutline />
        </Button>
      </div>
      <h1 className="text-lg flex items-center gap-2 text-black/70 dark:text-white/80">
        <span className="bg-linear-to-r from-cyan-100 to-purple-100 text-xs px-2 py-0.5 rounded-md border border-black/10 text-black/70">
          پلاس
        </span>
        دستیار من
        <BsStars />
      </h1>
    </div>
  );
}

export default Navbar;
