"use client";

import useSoundEngine from "@/hooks/useSoundEngine";

export default function SideQuestCard({
  title,
  xp,
  gold,
  icon,
  iconBg,
  done,
  progressText,
}: {
  title: string;
  xp: number;
  gold: number;
  icon: string;
  iconBg: string;
  done?: boolean;
  progressText?: string;
}) {
  const { playHover, playSelect } = useSoundEngine();

  return (
    <div
      onClick={playSelect}
      onMouseEnter={playHover}
      tabIndex={0}
      data-focusable={true}
      className={`bg-white border flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 outline-none group ${
        done
          ? "border-green/30 bg-green/5"
          : "border-blue-500/10 hover:border-accent hover:shadow-[0_4px_12px_var(--color-accent-glow)] hover:-translate-y-[2px]"
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${iconBg} ${done ? "opacity-50 grayscale" : ""}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-bold text-[13px] truncate ${done ? "text-slate-400 line-through" : "text-slate-800"}`}>
          {title} {progressText && <span className="text-muted ml-1 font-semibold">({progressText})</span>}
        </div>
        {!done && (
          <div className="flex gap-2 text-[10px] font-bold mt-0.5">
            <span className="text-gold">+{gold}g</span>
            <span className="text-accent">+{xp}xp</span>
          </div>
        )}
      </div>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${done ? "bg-green text-white" : "bg-blue-500/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors"}`}>
        {done ? "✓" : "▶"}
      </div>
    </div>
  );
}
