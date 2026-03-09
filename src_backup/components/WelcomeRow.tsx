import useSoundEngine from "@/hooks/useSoundEngine";
import { useRouter } from "next/navigation";

export default function WelcomeRow() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2.5 flex-1 min-h-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      {/* Character Card */}
      <div className="bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] border border-blue-500/20 rounded-2xl flex items-end relative overflow-hidden pl-[200px] p-5 min-h-[220px] cursor-pointer transition-all duration-200 hover:border-accent hover:shadow-[0_6px_24px_var(--color-accent-glow)]">
        <div className="absolute left-0 bottom-0 h-full w-[200px] flex items-end justify-center pointer-events-none">
          <div className="text-[100px] leading-none drop-shadow-[4px_0_16px_rgba(59,130,246,0.3)] animate-[charIdle_4s_ease-in-out_infinite]">
            🧙
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="font-[var(--font-fredoka)] text-[22px] font-bold text-accent leading-tight">
            Welcome Home,<br />Abyasa! ⚔️
          </div>
          <div className="flex flex-col gap-[3px] text-[13px] font-medium text-blue-900">
            <span className="flex items-center gap-1.5">⚔️ <strong>1</strong> Quest done today</span>
            <span className="flex items-center gap-1.5">📅 <strong>3</strong> Events scheduled</span>
            <span className="flex items-center gap-1.5">🏆 Guild Rank <strong>#4</strong></span>
            <span className="flex items-center gap-1.5">🔥 <strong>14</strong> day streak</span>
          </div>
          <button 
            tabIndex={0} 
            data-focusable={true} 
            className="mt-3 px-7 py-2.5 bg-accent text-white font-[var(--font-fredoka)] text-base font-semibold rounded-[10px] cursor-pointer transition-all duration-200 shadow-[0_4px_12px_var(--color-accent-glow)] hover:bg-accent-light hover:-translate-y-0.5 hover:shadow-[0_6px_18px_var(--color-accent-glow)] outline-none self-start border-none"
          >
            ▶ Play
          </button>
        </div>
      </div>

      {/* Tile: Notes */}
      <TileCard
        icon="📝"
        label="Take Notes"
        sub="12 notes · +XP per note"
        gradient="from-[#efffef] to-[#e4ffee]"
        borderColor="border-green/20"
        hoverColor="hover:border-green hover:shadow-[0_6px_20px_rgba(43,181,122,0.2)]"
        onClick={() => router.push("/notes")}
      />

      {/* Tile: Calendar */}
      <TileCard
        icon="📅"
        label="Calendar"
        sub="3 events today"
        gradient="from-[#eef4ff] to-[#e4edff]"
        borderColor="border-blue-400/20"
        hoverColor="hover:border-blue-500 hover:shadow-[0_6px_20px_rgba(74,144,217,0.2)]"
      />

      {/* Tile: Focus */}
      <TileCard
        icon="🎯"
        label="Focus Mode"
        sub="Pomodoro · +energy"
        gradient="from-[#fff8ee] to-[#fff3dd]"
        borderColor="border-gold/20"
        hoverColor="hover:border-gold hover:shadow-[0_6px_20px_rgba(232,160,32,0.2)]"
      />
    </div>
  );
}

function TileCard({
  icon,
  label,
  sub,
  gradient,
  borderColor,
  hoverColor,
  onClick,
}: {
  icon: string;
  label: string;
  sub: string;
  gradient: string;
  borderColor: string;
  hoverColor: string;
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
      className={`bg-gradient-to-br ${gradient} border ${borderColor} rounded-[14px] flex flex-col items-center justify-end p-4 cursor-pointer transition-all duration-200 outline-none gap-2 min-h-0 relative overflow-hidden ${hoverColor} hover:-translate-y-[3px]`}
    >
      <span className="text-[36px]">{icon}</span>
      <span className="font-[var(--font-fredoka)] text-sm font-semibold text-slate-900 text-center">{label}</span>
      <span className="text-[11px] text-muted text-center">{sub}</span>
    </div>
  );
}
