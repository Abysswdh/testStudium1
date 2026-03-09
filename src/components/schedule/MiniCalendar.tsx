"use client";

import useSoundEngine from "@/hooks/useSoundEngine";

export default function MiniCalendar() {
  const { playHover, playSelect } = useSoundEngine();
  
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Static 5x7 grid to match the "March 2026" layout from the reference
  const days = [
    { num: 1, active: false, dot: false },
    { num: 2, active: false, dot: true },
    { num: 3, active: false, dot: false },
    { num: 4, active: false, dot: false },
    { num: 5, active: false, dot: false },
    { num: 6, active: false, dot: false },
    { num: 7, active: false, dot: false },
    { num: 8, active: false, dot: false },
    { num: 9, active: true, dot: true }, // Highlighted/Selected "Today"
    { num: 10, active: false, dot: false },
    { num: 11, active: false, dot: true },
    { num: 12, active: false, dot: true },
    { num: 13, active: false, dot: true },
    { num: 14, active: false, dot: true },
    { num: 15, active: false, dot: false },
    { num: 16, active: false, dot: false },
    { num: 17, active: false, dot: false },
    { num: 18, active: false, dot: false },
    { num: 19, active: false, dot: false },
    { num: 20, active: false, dot: false },
    { num: 21, active: false, dot: false },
    { num: 22, active: false, dot: false },
    { num: 23, active: false, dot: false },
    { num: 24, active: false, dot: false },
    { num: 25, active: false, dot: false },
    { num: 26, active: false, dot: false },
    { num: 27, active: false, dot: false },
    { num: 28, active: false, dot: false },
    { num: 29, active: false, dot: false },
    { num: 30, active: false, dot: true },
    { num: 31, active: false, dot: false },
    { num: 1, active: false, dot: false, faded: true },
    { num: 2, active: false, dot: false, faded: true },
    { num: 3, active: false, dot: false, faded: true },
    { num: 4, active: false, dot: false, faded: true },
  ];

  return (
    <div className="bg-white border border-blue-500/10 rounded-2xl p-5 sticky top-4">
      {/* Header */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {daysOfWeek.map((d, i) => (
          <div key={`dow-${i}`} className="text-center text-[10px] font-extrabold text-slate-800">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {days.map((d, i) => (
          <button
            key={`day-${i}`}
            onClick={playSelect}
            onMouseEnter={playHover}
            tabIndex={0}
            data-focusable={true}
            className={`relative flex flex-col items-center justify-center h-8 rounded-full outline-none cursor-pointer group transition-colors ${
              d.active 
                ? "bg-accent text-white shadow-[0_2px_8px_var(--color-accent-glow)]" 
                : d.faded 
                  ? "text-slate-300 pointer-events-none" 
                  : "text-muted hover:bg-blue-500/10 hover:text-slate-900 font-bold"
            }`}
          >
            <span className={`text-[11px] ${d.active ? "font-bold" : "font-semibold"}`}>
              {d.num}
            </span>
            {d.dot && (
              <div 
                className={`absolute bottom-[2px] w-1 h-1 rounded-full ${
                  d.active ? "bg-white" : "bg-accent/60 group-hover:bg-accent"
                }`} 
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
