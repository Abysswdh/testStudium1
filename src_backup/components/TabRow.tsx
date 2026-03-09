"use client";

import { useState } from "react";

const tabs = ["Home", "Guild", "Stadium"];

export default function TabRow() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex gap-1.5 justify-center animate-fade-up" style={{ animationDelay: "0.05s" }}>
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          tabIndex={0}
          data-focusable={true}
          className={`px-6 py-[7px] rounded-[10px] text-[13px] font-semibold cursor-pointer transition-all duration-150 outline-none border ${
            active === i
              ? "bg-accent text-white border-accent shadow-[0_2px_12px_var(--color-accent-glow)]"
              : "bg-white text-muted border-blue-500/[0.13] hover:text-slate-900 hover:border-accent/30"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
