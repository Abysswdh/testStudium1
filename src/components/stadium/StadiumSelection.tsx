import { Swords, Trophy, Users, Zap, Search } from "lucide-react";
import useSoundEngine from "@/hooks/useSoundEngine";

export default function StadiumSelection({ onFindMatch }: { onFindMatch: () => void }) {
  const { playSelect, playHover } = useSoundEngine();

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full animate-in fade-in duration-500 max-w-[1400px] mx-auto mt-6 gap-6">
      
      {/* Top Banner: Arena Details */}
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
        <h1 className="font-[var(--font-fredoka)] text-2xl md:text-[32px] font-bold text-white tracking-wider flex items-center gap-3">
          <Swords className="text-purple-500" size={32} /> Ranked Arena
        </h1>
        <div className="w-full md:w-auto bg-[#1c1927] border border-[#2e293f] rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between md:justify-start gap-3 md:gap-6 shadow-lg">
          <div className="flex flex-col">
            <span className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Current League</span>
            <span className="text-[14px] md:text-[16px] font-bold text-purple-400">Crystal III</span>
          </div>
          <div className="w-px h-8 bg-[#3f3852]" />
          <div className="flex flex-col">
            <span className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest">Duel Points</span>
            <span className="text-[14px] md:text-[16px] font-bold text-white">1,250 DP</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:grid xl:grid-cols-[2fr_1fr] gap-6 w-full flex-1 min-h-0 pb-24 xl:pb-0 px-2 md:px-0 overflow-y-auto xl:overflow-visible no-scrollbar">
        
        {/* Left Column: Matchmaking & Stats */}
        <div className="flex flex-col gap-6">
          
          {/* Hero Matchmaking Card */}
          <div className="bg-[#1f1b2e] border-2 border-[#2e293f] rounded-[32px] p-6 md:p-10 flex flex-col justify-center items-center relative overflow-hidden flex-1 group shadow-2xl min-h-[300px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            
            <div className="w-16 h-16 md:w-24 md:h-24 bg-purple-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-pulse">
              <Search size={32} className="text-purple-400" />
            </div>
            
            <h2 className="font-[var(--font-fredoka)] text-2xl md:text-4xl font-bold text-white mb-2">Memory Duels</h2>
            <p className="text-slate-400 font-semibold mb-6 md:mb-8 text-center max-w-md text-sm md:text-base">
              Challenge other students to high-speed SNBT flashcards. Win to steal their Gold and climb the global ranks!
            </p>
            
            <button
              onClick={() => { playSelect(); onFindMatch(); }}
              onMouseEnter={playHover}
              className="px-8 md:px-12 py-3 md:py-4 bg-purple-600 hover:bg-purple-500 text-white font-[var(--font-fredoka)] text-lg md:text-xl font-bold rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:-translate-y-1 active:translate-y-0"
            >
              Find Match
            </button>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[140px]">
            <StatCard icon={<Trophy className="text-yellow-400" />} label="Win Rate" value="68%" sub="Last 20 Duels" />
            <StatCard icon={<Zap className="text-blue-400" />} label="Highest Combo" value="12x" sub="Personal Best" />
            <StatCard icon={<Users className="text-emerald-400" />} label="Players Online" value="2,401" sub="Searching..." />
          </div>
        </div>

        {/* Right Column: Global Leaderboard */}
        <div className="bg-[#1c1927] border-2 border-[#2e293f] rounded-[32px] p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="text-gold" size={24} />
            <h3 className="font-[var(--font-fredoka)] text-xl font-bold text-white">Global Top 10</h3>
          </div>
          
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 bg-[#241f33] p-3 rounded-xl border border-[#3f3852] hover:border-purple-500/50 transition-colors cursor-pointer group">
                <span className={`text-[15px] font-extrabold w-6 text-center ${i === 0 ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" : i === 1 ? "text-slate-300" : i === 2 ? "text-amber-600" : "text-slate-500"}`}>
                  #{i + 1}
                </span>
                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=User${i}`} className="w-10 h-10 rounded-full bg-[#1c1927]" alt="avatar" />
                <div className="flex flex-col flex-1">
                  <span className="text-white font-bold text-[14px] group-hover:text-purple-300 transition-colors">Player_{100 + i}</span>
                  <span className="text-slate-400 font-semibold text-[11px]">Level {80 - i * 2}</span>
                </div>
                <span className="text-purple-400 font-bold text-[14px]">{5400 - i * 150} DP</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode, label: string, value: string, sub: string }) {
  return (
    <div className="bg-[#1c1927] border-2 border-[#2e293f] hover:border-[#3f3852] rounded-[24px] p-5 flex flex-col justify-between transition-colors group">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-[#241f33] rounded-lg border border-[#3f3852] group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <div>
        <div className="font-[var(--font-fredoka)] text-3xl font-bold text-white leading-none mb-1">{value}</div>
        <div className="text-[11px] font-semibold text-slate-500">{sub}</div>
      </div>
    </div>
  );
}
