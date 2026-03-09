import { Flame } from "lucide-react";

export default function StreakWidget() {
  return (
    <div className="h-full bg-sidebar/50 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(251,191,36,0.15)] group relative overflow-hidden">
      <div className="absolute -top-[30%] -right-[20%] w-[100px] h-[100px] bg-[radial-gradient(circle,_rgba(251,191,36,0.1),_transparent_70%)] rounded-full pointer-events-none" />
      <div className="flex items-center gap-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-gold transition-colors relative z-10">
        <Flame size={14} className="text-gold" /> Streak
      </div>
      <div className="relative z-10">
        <div className="font-[var(--font-fredoka)] text-[34px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-gold to-yellow-200 leading-none drop-shadow-[0_0_12px_rgba(251,191,36,0.3)]">14</div>
        <div className="text-[12px] font-bold text-slate-400 mt-1 uppercase tracking-wide">Days Active</div>
      </div>
    </div>
  );
}
