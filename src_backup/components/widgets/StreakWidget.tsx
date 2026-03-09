export default function StreakWidget() {
  return (
    <div className="h-full bg-gradient-to-br from-[#fff8ee] to-[#fff3dd] border border-[rgba(232,160,32,0.2)] rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:border-gold hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,160,32,0.2)]">
      <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">🔥 Streak</div>
      <div>
        <div className="font-[var(--font-fredoka)] text-[26px] font-bold text-gold leading-none">14</div>
        <div className="text-[11px] text-muted mt-0.5">days in a row</div>
      </div>
    </div>
  );
}
