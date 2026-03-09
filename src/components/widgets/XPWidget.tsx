import { Sparkles } from "lucide-react";

export default function XPWidget() {
  return (
    <div className="h-full bg-sidebar/50 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_0_24px_var(--color-accent-glow)] group">
      <div className="flex items-center gap-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-accent-light transition-colors">
        <Sparkles size={14} /> Experience
      </div>
      <div>
        <div className="font-[var(--font-fredoka)] text-[28px] font-bold text-accent-light leading-none drop-shadow-[0_0_12px_rgba(96,165,250,0.4)]">2,340</div>
        <div className="text-[12px] font-bold text-slate-400 mt-1">/ 3,500 XP · Lv.7</div>
        <div className="mt-3 relative">
          <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light bar-shimmer shadow-[0_0_12px_var(--color-accent)]" style={{ width: "67%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
