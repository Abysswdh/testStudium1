"use client";

import { useEffect, useState } from "react";

export default function TopStrip() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h}:${m.toString().padStart(2, "0")} ${ampm}`);
    }
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-[60px] min-h-[60px] flex items-center px-8 gap-6 justify-end bg-transparent w-full z-10">
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1.5 text-[13px] font-bold text-gold drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]">🔥 14 Days</span>
        <span className="flex items-center gap-1.5 text-[13px] font-bold text-accent-light drop-shadow-[0_0_12px_rgba(96,165,250,0.3)]">✨ 2,340 XP</span>
        <div className="w-px h-4 bg-white/10" />
        <span className="text-[14px] font-extrabold text-white tracking-wide min-w-[60px] text-right">{time}</span>
      </div>
    </div>
  );
}
