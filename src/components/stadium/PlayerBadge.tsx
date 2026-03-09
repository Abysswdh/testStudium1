import { Zap, Shield } from "lucide-react";

interface PlayerBadgeProps {
  name: string;
  title: string;
  level: number;
  hp: number;
  maxHp: number;
  avatar: string;
  colorTheme: "green" | "red";
  flip?: boolean;
}

export default function PlayerBadge({
  name,
  title,
  level,
  hp,
  maxHp,
  avatar,
  colorTheme,
  flip = false,
}: PlayerBadgeProps) {
  const hpPercent = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  const isDanger = hpPercent <= 25;

  // Theme colors
  const primary = colorTheme === "green" ? "bg-green shadow-[0_0_15px_rgba(52,211,153,0.3)]" : "bg-red shadow-[0_0_15px_rgba(248,113,113,0.3)]";
  const bg = colorTheme === "green" ? "bg-green/20" : "bg-red/20";
  const glow = colorTheme === "green" ? "border-green hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]" : "border-red hover:shadow-[0_0_30px_rgba(248,113,113,0.4)]";

  return (
    <div className="bg-[#1c1927] border-2 border-transparent hover:border-[#2e293f] rounded-[32px] p-8 flex flex-col transition-all duration-300 relative overflow-hidden group">
      {/* Background Ambient Glow */}
      <div className={`absolute top-0 ${flip ? "right-0" : "left-0"} w-48 h-48 bg-[radial-gradient(circle,rgba(168,85,247,0.1),transparent_70%)] rounded-full mix-blend-screen pointer-events-none`} />

      <div className={`flex flex-col items-center flex-1 ${flip ? "mt-12" : "mt-8"}`}>
        {/* Avatar Ring */}
        <div className={`relative mb-6 transition-transform duration-500 group-hover:scale-105`}>
          <div className={`w-36 h-36 rounded-full border-4 ${colorTheme === "green" ? "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]" : "border-red shadow-[0_0_20px_rgba(248,113,113,0.5)]"} overflow-hidden bg-[#2a2438] flex items-center justify-center p-2`}>
            <img src={avatar} alt={name} className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[13px] font-bold px-4 py-1 rounded-full shadow-lg border-2 border-[#1c1927]">
            Lvl {level}
          </div>
        </div>

        {/* Identity */}
        <h3 className="font-[var(--font-fredoka)] text-[28px] font-bold text-white mb-1">{name}</h3>
        <p className="text-sm font-semibold text-slate-400 mb-8">{title}</p>
      </div>

      {/* HP Bar */}
      <div className="mt-auto w-full">
        <div className="flex justify-between items-end mb-2">
          <span className={`text-[13px] font-extrabold ${colorTheme === "green" ? "text-green" : "text-red"}`}>HP</span>
          <span className="text-[13px] font-bold text-white">{hp}/{maxHp}</span>
        </div>
        <div className={`h-3 w-full rounded-full bg-slate-800 border border-slate-700 overflow-hidden relative`}>
          <div 
            className={`h-full rounded-full ${primary} transition-all duration-1000 ease-out`}
            style={{ width: `${hpPercent}%` }}
          />
          {isDanger && (
            <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
          )}
        </div>

        {/* Buff Icons */}
        <div className={`flex gap-3 mt-6 ${flip ? "justify-center" : "justify-center"}`}>
          {!flip && (
            <>
              <div className="w-10 h-10 rounded-xl bg-[#2a2438] flex items-center justify-center border border-[#3f3852] shadow-inner text-purple-400">
                <Zap size={18} fill="currentColor" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#2a2438] flex items-center justify-center border border-[#3f3852] shadow-inner text-blue-400">
                <Shield size={18} fill="currentColor" />
              </div>
            </>
          )}
          {flip && (
            <div className="w-10 h-10 rounded-xl bg-[#2a2438] flex items-center justify-center border border-[#3f3852] shadow-inner text-orange-400">
              <Zap size={18} fill="currentColor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
