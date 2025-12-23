import React from "react";

function UnderLayerHalo() {
  return (
    <div className="absolute z-0 -top-20 -left-20">
      <div className="w-[520px] h-[520px] bg-[#fef7ea] rounded-full blur-3xl transition-colors duration-500 dark:bg-[#fae26c29]"></div>
      <div className="absolute top-60 left-30 w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl transition-colors duration-500 dark:bg-[#9e6cfa21]"></div>
      <div className="absolute top-20 left-70 w-[200px] h-[280px] bg-purple-100 rounded-full blur-3xl transition-colors duration-500 dark:bg-[#5266b61f]"></div>
    </div>
  );
}

export default UnderLayerHalo;
