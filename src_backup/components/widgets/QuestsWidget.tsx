export default function QuestsWidget() {
  return (
    <div className="h-full bg-white border border-blue-500/[0.13] rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_4px_16px_var(--color-accent-glow)]">
      <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">⚔️ Quests Today</div>
      <div className="flex items-center gap-3">
        <div>
          <div className="font-[var(--font-fredoka)] text-[22px] font-bold text-green leading-none">
            1 <span className="text-sm text-muted">/ 4</span>
          </div>
          <div className="text-[11px] text-muted mt-0.5">1 done · 290 XP remaining</div>
        </div>
        <div className="flex-1">
          <div className="h-1.5 bg-blue-500/[0.13] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-green to-lime-400 bar-shimmer" style={{ width: "25%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
