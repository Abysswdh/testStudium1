import { Zap } from "lucide-react";

export default function EnergyWidget() {
  return (
    <div className="h-full bg-sidebar/50 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-green/40 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(52,211,153,0.15)] group relative overflow-hidden">
      <div className="absolute -top-[30%] -right-[20%] w-[100px] h-[100px] bg-[radial-gradient(circle,_rgba(52,211,153,0.1),_transparent_70%)] rounded-full pointer-events-none" />
      <div className="flex items-center gap-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-green transition-colors relative z-10">
        <Zap size={14} className="text-green" /> Energy
      </div>
      <div className="relative z-10">
        <div className="font-[var(--font-fredoka)] text-[28px] font-bold text-green leading-none drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]">80</div>
        <div className="text-[12px] font-bold text-slate-400 mt-1">/ 100 · Feeling good!</div>
        <div className="mt-3 relative">
          <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-green to-emerald-400 bar-shimmer shadow-[0_0_12px_rgba(52,211,153,0.5)]" style={{ width: "80%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
