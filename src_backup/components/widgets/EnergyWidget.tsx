export default function EnergyWidget() {
  return (
    <div className="h-full bg-gradient-to-br from-[#eefff8] to-[#e0fff0] border border-green/15 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-green hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(43,181,122,0.2)]">
      <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">⚡ Energy</div>
      <div>
        <div className="font-[var(--font-fredoka)] text-[22px] font-bold text-green leading-none">80</div>
        <div className="text-[11px] text-muted mt-0.5">/ 100 · Feeling good!</div>
        <div className="mt-2">
          <div className="h-1.5 bg-green/[0.13] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-400 bar-shimmer" style={{ width: "80%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
