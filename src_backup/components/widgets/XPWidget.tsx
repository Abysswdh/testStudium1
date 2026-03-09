export default function XPWidget() {
  return (
    <div className="h-full bg-white border border-blue-500/[0.13] rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_4px_16px_var(--color-accent-glow)]">
      <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">✨ Experience</div>
      <div>
        <div className="font-[var(--font-fredoka)] text-[22px] font-bold text-accent leading-none">2,340</div>
        <div className="text-[11px] text-muted mt-0.5">/ 3,500 XP · Lv.7</div>
        <div className="mt-2">
          <div className="h-1.5 bg-blue-500/[0.13] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light bar-shimmer" style={{ width: "67%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
