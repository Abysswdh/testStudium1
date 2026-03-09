import useSoundEngine from "@/hooks/useSoundEngine";
import { useRouter } from "next/navigation";
import { Gamepad2, PencilLine, CalendarDays, Target, Shield, Flame } from "lucide-react";

export default function WelcomeRow() {
  const router = useRouter();
  return (
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 md:gap-6 flex-1 min-h-[260px] animate-fade-up w-full max-w-[1400px] mx-auto mt-4 md:mt-6" style={{ animationDelay: "0.1s" }}>
      {/* Character Card Hero */}
      <div className="bg-[#1f1b2e] border-2 border-transparent hover:border-[#383152] rounded-[32px] flex flex-col md:flex-row items-center md:items-end relative overflow-hidden p-6 md:p-8 md:pl-[220px] min-h-[260px] cursor-pointer transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] group/hero">
        {/* Abstract Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(168,85,247,0.1),transparent_70%)] rounded-full mix-blend-screen pointer-events-none" />
        
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-[0.03] mix-blend-overlay" />
        <div className="relative md:absolute md:left-0 md:bottom-0 h-32 md:h-full w-full md:w-[220px] flex items-center justify-center md:items-end pointer-events-none group-hover/hero:scale-105 group-hover/hero:-translate-y-2 transition-transform duration-500 mb-4 md:mb-0">
          <div className="text-[100px] md:text-[140px] leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] animate-[charIdle_4s_ease-in-out_infinite] md:mb-2">
            🧙
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 relative z-10 w-full">
          <div className="font-[var(--font-fredoka)] text-2xl md:text-[32px] font-bold text-white leading-[1.1] mb-2 drop-shadow-md">
            Welcome Home,<br />Abyasa!
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-[11px] md:text-[13px] font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1.5"><Shield size={14} className="text-purple-400" /> 1 Quest today</span>
            <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-blue-400" /> 3 Events</span>
            <span className="flex items-center gap-1.5"><Flame size={14} className="text-orange-400" /> 14 day streak</span>
          </div>
          <div className="flex gap-3 mt-3">
            <button 
              tabIndex={0} 
              data-focusable={true} 
              className="px-8 py-3 bg-purple-600 text-white font-[var(--font-fredoka)] text-[15px] font-bold rounded-[14px] cursor-pointer transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-purple-500 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] outline-none border-none flex items-center gap-2 group"
            >
              <Gamepad2 size={18} className="transition-transform group-hover:scale-110" /> Play Now
            </button>
          </div>
        </div>
      </div>

      {/* Tile: Notes */}
      <TileCard
        icon={<PencilLine size={44} strokeWidth={1.5} className="text-green-400 transition-transform duration-300 group-hover/tile:scale-110 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]" />}
        label="Take Notes"
        sub="12 notes · +Mana"
        hoverBorder="hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.1)]"
        onClick={() => router.push("/notes")}
      />

      {/* Tile: Calendar */}
      <TileCard
        icon={<CalendarDays size={44} strokeWidth={1.5} className="text-blue-400 transition-transform duration-300 group-hover/tile:scale-110 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]" />}
        label="Calendar"
        sub="3 events today"
        hoverBorder="hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(96,165,250,0.1)]"
      />

      {/* Tile: Focus */}
      <TileCard
        icon={<Target size={44} strokeWidth={1.5} className="text-orange-400 transition-transform duration-300 group-hover/tile:scale-110 drop-shadow-[0_0_15px_rgba(251,146,60,0.3)]" />}
        label="Focus Mode"
        sub="Pomodoro · +Energy"
        hoverBorder="hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(251,146,60,0.1)]"
      />
    </div>
  );
}

function TileCard({
  icon,
  label,
  sub,
  hoverBorder,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  hoverBorder: string;
  onClick?: () => void;
}) {
  const { playHover, playSelect } = useSoundEngine();
  return (
    <div
      onClick={() => {
        if (onClick) {
          playSelect();
          onClick();
        }
      }}
      onMouseEnter={playHover}
      tabIndex={0}
      data-focusable={true}
      className={`bg-[#1c1927] border-2 border-transparent rounded-[32px] flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 outline-none gap-4 relative overflow-hidden group/tile ${hoverBorder} hover:-translate-y-1`}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-[0.02] mix-blend-overlay" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        {icon}
        <div className="flex flex-col items-center gap-1 mt-2">
          <span className="font-[var(--font-fredoka)] text-xl font-bold text-white text-center tracking-wide">{label}</span>
          <span className="text-[13px] text-slate-400 text-center font-bold tracking-wide">{sub}</span>
        </div>
      </div>
    </div>
  );
}
