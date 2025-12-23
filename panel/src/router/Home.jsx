import React, { useState, useRef, useEffect } from "react";
import TypeIndiactor from "../components/TypeIndiactor";
import ChatMessage from "../components/ChatMessage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PreChatBot from "../components/PreChatBot/PreChatBot";
import "./Default.css";

function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChattingStarted, setIsChattingStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null); // رفرنس به کانتینر پیام‌ها
  const handleMessage = async (text, sender) => {
    const userMsg = {
      id: crypto.randomUUID(),
      message: text,
      sender: sender,
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setIsChattingStarted(true);
    try {
      const response = await fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();

      const aiMsg = {
        id: crypto.randomUUID(),
        message:
          typeof data.message === "string"
            ? data.message
            : "خطا در دریافت پاسخ از AI",
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error fetching AI response:", error);

      const aiMsg = {
        id: crypto.randomUUID(),
        message: "خطا در اتصال به سرور",
        sender: "ai",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false); // پایان لودینگ
    }
  };
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, loading]);
  useEffect(()=> {
    setTimeout(()=> setIsOpen(true), 20 )
  }, [])
  return (
    <div className={`z-10 relative flex w-full h-full justify-center items-center transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>

      <div className="flex flex-col w-min justify-center h-140 gap-4">
        <div
          ref={containerRef}
          className="w-full h-124 mt-4 flex flex-col gap-6 overflow-auto scroll-smooth scroll-hidden"
        >
          {!isChattingStarted && <PreChatBot onSend={handleMessage} />}
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.message}
              sender={msg.sender}
            />
          ))}

          {loading && (
            <div className="flex gap-2 flex-col">
              <Skeleton
                height={20}
                width={250}
                borderRadius={10}
                baseColor="#cccccc"
              />
              <Skeleton
                height={20}
                width={200}
                borderRadius={10}
                baseColor="#cccccc"
              />
              <Skeleton
                height={20}
                width={300}
                borderRadius={10}
                baseColor="#cccccc"
              />
            </div>
          )}
        </div>
        <TypeIndiactor onSend={handleMessage} />
      </div>
    </div>
  );
}

export default Home;
