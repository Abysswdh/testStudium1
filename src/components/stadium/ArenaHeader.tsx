import { Swords, Timer, ChevronLeft } from "lucide-react";
import useSoundEngine from "@/hooks/useSoundEngine";

export default function ArenaHeader({ onExit }: { onExit?: () => void }) {
  const { playSelect } = useSoundEngine();
  return (
    <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto bg-[#1a1625] border-b border-[#2e293f] p-4 rounded-b-3xl shadow-lg relative z-20">
      
      {/* Left: Match Info */}
      <div className="flex items-center gap-4 px-4 w-[350px]">
        {onExit && (
          <button 
            onClick={() => { playSelect(); onExit(); }}
            className="w-10 h-10 rounded-xl bg-[#241f33] border border-[#3f3852] flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 transition-colors cursor-pointer mr-2 shrink-0 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}
        <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <Swords size={20} />
        </div>
        <div>
          <h1 className="font-[var(--font-fredoka)] text-xl font-bold text-white leading-tight">Ranked Arena Duel</h1>
          <p className="text-[13px] font-semibold text-slate-400">Season 5: Crystal League • Match ID #8842</p>
        </div>
      </div>

      {/* Center: Timer */}
      <div className="absolute left-1/2 -translate-x-1/2 top-4">
        <div className="bg-[#241f33] border-2 border-purple-500/40 rounded-2xl px-8 py-3 flex items-center gap-4 shadow-[0_10px_30px_rgba(168,85,247,0.2)]">
          <Timer className="text-purple-400" size={24} />
          <span className="font-[var(--font-fredoka)] text-3xl font-bold text-white tracking-wider tabular-nums">00:14</span>
        </div>
        {/* Timer Bar */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1.5 bg-purple-500/20 blur-[2px] rounded-full" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7]" />
      </div>

      {/* Right: Score/Streak Info */}
      <div className="flex items-center bg-[#241f33] rounded-2xl border border-[#3f3852] p-1 shadow-inner mr-4 w-[350px] justify-end">
        <div className="px-5 py-2 flex flex-col items-center justify-center border-r border-[#3f3852]">
          <span className="text-[10px] font-extrabold text-slate-500 tracking-widest uppercase mb-0.5">Current Streak</span>
          <span className="text-[15px] font-bold text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">5x Combo</span>
        </div>
        <div className="px-5 py-2 flex flex-col items-center justify-center">
          <span className="text-[10px] font-extrabold text-slate-500 tracking-widest uppercase mb-0.5">Duel Points</span>
          <span className="text-[15px] font-bold text-white">1,250 DP</span>
        </div>
      </div>
      
    </div>
  );
}
