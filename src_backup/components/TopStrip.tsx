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
    <div className="h-[52px] min-h-[52px] flex items-center px-6 gap-4 justify-end bg-transparent">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-xs font-bold text-gold">🔥 14 days</span>
        <span className="flex items-center gap-1 text-xs font-bold text-accent">✨ 2,340 XP</span>
        <span className="text-xs font-semibold text-muted min-w-[50px] text-right">{time}</span>
      </div>
    </div>
  );
}
