export default function BossWidget() {
  return (
    <div className="h-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] border border-red-400/25 rounded-2xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 relative overflow-hidden hover:border-red-400/50 hover:shadow-[0_4px_20px_rgba(248,113,113,0.15)]">
      {/* Glow */}
      <div className="absolute -top-[30%] -right-[20%] w-[140px] h-[140px] bg-[radial-gradient(circle,_rgba(248,113,113,0.15),_transparent_70%)] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-1 bg-red-400/15 border border-red-400/25 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide mb-2">
          ⚠️ Boss Fight
        </div>
        <div className="font-[var(--font-fredoka)] text-[15px] font-semibold text-[#e0e7ff] mb-1 leading-snug">
          Calculus III Midterm
        </div>
        <div className="text-[11px] text-blue-200/60 mb-2.5">Monday · Hall B · 2 hours</div>

        <div className="flex justify-between text-[10px] font-bold text-blue-200/50 mb-1">
          <span>Boss HP</span>
          <span className="text-red-400">72% remaining</span>
        </div>
        <div className="h-[7px] bg-white/[0.08] rounded-full overflow-hidden">
          <div className="h-full w-[72%] bg-gradient-to-r from-red-400 to-orange-400 rounded-full" />
        </div>
        <div className="text-[11px] text-amber-400/80 mt-2 font-semibold">⏳ 3 days left — prepare now!</div>
      </div>

      <div className="absolute bottom-3 right-4 text-[40px] opacity-90 animate-[bossFloat_3s_ease-in-out_infinite] pointer-events-none">
        👹
      </div>
    </div>
  );
}
