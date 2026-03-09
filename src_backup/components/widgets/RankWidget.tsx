export default function RankWidget() {
  return (
    <div className="h-full bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] border border-blue-500/15 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_4px_16px_var(--color-accent-glow)]">
      <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">🏆 Guild Rank</div>
      <div>
        <div className="font-[var(--font-fredoka)] text-[26px] font-bold text-accent leading-none">#4</div>
        <div className="text-[11px] text-muted mt-0.5">420 XP to reach #3</div>
      </div>
    </div>
  );
}
