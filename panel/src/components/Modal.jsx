import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Modal({ go = null, open, onClose, children }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 20); // fade-in
    } else {
      setIsVisible(false); // fade-out
    }
  }, [open]);

  const handleClose = () => {
    setIsVisible(false); // fade-out
    setTimeout(() => {
      if (onClose) onClose();        // اطلاع دادن والد
      if (go) navigate(go);           // navigate فقط اگر go مقدار داشت
      setShouldRender(false);         // حذف کامل از DOM
    }, 300); // مدت زمان انیمیشن با CSS یکی باشد
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* لایه پس‌زمینه */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {/* محتوای مودال */}
      <div
        className={`relative z-60 rounded-2xl transition-all duration-300 max-w-200
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        `}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
