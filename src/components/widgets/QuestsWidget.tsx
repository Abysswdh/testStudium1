import { Swords } from "lucide-react";

export default function QuestsWidget() {
  return (
    <div className="h-full bg-sidebar/50 backdrop-blur-md border border-white/5 rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-[0_0_24px_var(--color-accent-glow)] group">
      <div className="flex items-center gap-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 group-hover:text-accent transition-colors">
        <Swords size={14} className="text-accent" /> Quests Today
      </div>
      <div className="flex items-center gap-4">
        <div>
          <div className="font-[var(--font-fredoka)] text-[28px] font-bold text-white leading-none drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">
            1 <span className="text-lg text-slate-500">/ 4</span>
          </div>
          <div className="text-[12px] font-bold text-slate-400 mt-1">1 done · 290 XP remaining</div>
        </div>
        <div className="flex-1">
          <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light bar-shimmer shadow-[0_0_12px_var(--color-accent)]" style={{ width: "25%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
