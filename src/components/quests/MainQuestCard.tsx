"use client";

import useSoundEngine from "@/hooks/useSoundEngine";

export default function MainQuestCard({
  title,
  due,
  desc,
  progress,
  gold,
  xp,
  tag,
  icon,
  iconBg,
}: {
  title: string;
  due: string;
  desc: string;
  progress: number;
  gold: number;
  xp: number;
  tag: string;
  icon: string;
  iconBg: string;
}) {
  const { playHover, playSelect } = useSoundEngine();

  return (
    <div
      tabIndex={0}
      data-focusable={true}
      className="bg-white border border-blue-500/15 rounded-2xl p-5 outline-none flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:border-accent group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${iconBg}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-[var(--font-fredoka)] text-lg font-bold text-slate-900 leading-tight">
              {title}
            </h3>
            <p className="text-[11px] font-semibold text-muted mt-[1px]">Due: {due}</p>
          </div>
        </div>
        <div className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-accent bg-accent/10 border border-accent/20 rounded-md">
          {tag}
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
        {desc}
      </p>

      {/* Progress */}
      <div className="flex flex-col gap-1.5 mt-1">
        <div className="flex justify-between text-[11px] font-bold text-muted">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full bg-blue-500/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer / Action */}
      <div className="flex items-center justify-between mt-1 pt-4 border-t border-blue-500/10">
        <div className="flex items-center gap-4 text-[13px] font-bold">
          <span className="flex items-center gap-1.5 text-gold">🪙 {gold}</span>
          <span className="flex items-center gap-1.5 text-accent">✨ {xp} XP</span>
        </div>
        <button
          onClick={playSelect}
          onMouseEnter={playHover}
          tabIndex={0}
          data-focusable={true}
          className="flex items-center gap-2 px-5 py-2 bg-accent/10 text-accent font-bold text-sm rounded-xl cursor-pointer hover:bg-accent hover:text-white transition-colors duration-200 outline-none"
        >
          <span className="text-xs">▶</span> Start Mission
        </button>
      </div>
    </div>
  );
}
