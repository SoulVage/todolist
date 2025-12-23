import React, { useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import Button from "@mui/material/Button";
import { LuSendHorizontal } from "react-icons/lu";
import { MdOutlineMicNone } from "react-icons/md";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useTheme } from "./ToggleDark";

function TypeIndiactor({ onSend }) {
  const [text, setText] = useState("");
  const [isOnVoice, setIsOnVoice] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const { theme } = useTheme();
  const handleVoice = () => {
    setIsOnVoice(true);
    SpeechRecognition.startListening({ language: "fa-IR", continuous: true });
  };
  const handleSend = () => {
    const messageToSend = isOnVoice ? transcript : text;
    if (messageToSend.length > 0) {
      onSend(messageToSend, "user");
    } else return;
    resetTranscript();
    setText("");
    if (isOnVoice) {
      SpeechRecognition.stopListening();
      setIsOnVoice(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSend();
    } else return;
  };
  return (
    <div className=" bg-white/80 backdrop-blur-3xl rounded-xl border h-min border-black/10 p-4 dark:bg-white/5 dark:border-white/10">
      <div className="flex items-center text-right mb-4">
        <input
          type="text"
          value={isOnVoice ? transcript : text}
          onKeyDown={handleKeyDown}
          onChange={(e) => setText(e.target.value)}
          className="w-180 h-8 p-2 text-right focus:outline-0 dark:text-white/70 dark:placeholder:text-white/60"
          placeholder="سوالت رو بپرس "
        />
        <TbCategoryPlus className="dark:text-white/60" />
      </div>
      <div className="flex items-center justify-between">
        <Button
          onClick={handleSend}
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
          ارسال
          <LuSendHorizontal />
        </Button>
        <Button
          onClick={handleVoice}
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
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
          صدا
          <MdOutlineMicNone />
        </Button>
      </div>
    </div>
  );
}

export default TypeIndiactor;
