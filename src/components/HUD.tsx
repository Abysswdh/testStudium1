import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import useSoundEngine from "@/hooks/useSoundEngine";

export default function HUD() {
  const { 
    toggleBGM, 
    bgmPlaying, 
    currentTrackName, 
    bgmVolume, 
    setBgmVolume, 
    nextTrack, 
    prevTrack,
    playSelect
  } = useSoundEngine();
  const pathname = usePathname();

  // Add global keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      
      const key = e.key.toLowerCase();
      if (key === "m") {
        toggleBGM();
      } else if (key === "n") {
        nextTrack();
      } else if (key === "p") {
        prevTrack();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggleBGM, nextTrack, prevTrack]);

  return (
    <div className="h-12 min-h-[48px] bg-sidebar2/80 md:bg-sidebar2/50 backdrop-blur-md border-t border-white/5 flex items-center px-4 md:px-8 gap-2 md:gap-5 z-20 mb-[64px] md:mb-0">
      <div className="hidden md:flex items-center gap-5">
        <HudKey keys={["W", "A", "S", "D"]} label="Navigate" />
        <div className="w-px h-4 bg-white/10" />
        <HudKey keys={["↑", "↓", "←", "→"]} label="Arrows" />
        <div className="w-px h-4 bg-white/10" />
        <HudKey keys={["Enter"]} label="Select" />
        <div className="w-px h-4 bg-white/10" />
        <HudKey keys={["Esc"]} label="Back" />
        <div className="w-px h-4 bg-white/10" />
        
        {/* Dynamic Guild Hub Keys */}
        {pathname === "/guild" && (
          <>
            <HudKey keys={["←", "→"]} label="Switch Tab" />
            <div className="w-px h-4 bg-white/10" />
            <HudKey keys={["↑", "↓"]} label="Exit Tab" />
            <div className="w-px h-4 bg-white/10" />
          </>
        )}
      </div>

      {/* Music Player */}
      <div className="flex-1 md:flex-none flex items-center gap-1 bg-white/5 p-1 px-1.5 md:px-2 rounded-xl border border-white/5 overflow-hidden max-w-[180px] md:max-w-none">
        <button 
          onClick={() => { playSelect(); prevTrack(); }}
          className="p-1 md:p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer outline-none focus:ring-1 focus:ring-accent"
          title="Previous (P)"
        >
          <SkipBack size={12} className="md:w-[14px] md:h-[14px]" />
        </button>

        <button 
          onClick={() => { playSelect(); toggleBGM(); }}
          className={`p-1 md:p-1.5 rounded-lg transition-all duration-200 cursor-pointer outline-none focus:ring-1 focus:ring-accent ${
            bgmPlaying ? "bg-accent/20 text-accent shadow-[0_0_12px_var(--color-accent-glow)]" : "bg-white/5 text-slate-400 hover:text-white"
          }`}
          title="Play/Pause (M)"
        >
          {bgmPlaying ? <Pause size={12} className="md:w-[14px] md:h-[14px]" /> : <Play size={12} className="md:w-[14px] md:h-[14px]" />}
        </button>

        <button 
          onClick={() => { playSelect(); nextTrack(); }}
          className="p-1 md:p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer outline-none focus:ring-1 focus:ring-accent"
          title="Next (N)"
        >
          <SkipForward size={12} className="md:w-[14px] md:h-[14px]" />
        </button>

        <div className="w-px h-6 bg-white/10 mx-0.5 hidden md:block" />

        <div className="marquee-container flex flex-col justify-center min-w-[100px] flex-1 md:flex-none md:w-[150px]">
          <span className={`text-[8px] md:text-[10px] font-bold tracking-tight text-accent-light uppercase whitespace-nowrap ${bgmPlaying ? 'animate-marquee' : 'text-slate-500'}`}>
            {bgmPlaying ? `${currentTrackName}` : "Paused"}
          </span>
        </div>

        <div className="w-px h-6 bg-white/10 mx-1 hidden lg:block" />

        <div className="hidden lg:flex items-center gap-2 px-1">
          <Volume2 size={14} className="text-slate-500" />
          <input 
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={bgmVolume}
            onChange={(e) => setBgmVolume(parseFloat(e.target.value))}
            className="w-12 md:w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
          />
        </div>
      </div>

      <div className="hidden md:flex ml-auto text-[12px] font-bold text-slate-300 items-center gap-3">
        <span className="text-accent-light">🧙 Abyasa</span>
        <span className="text-white/20">|</span>
        <span>Lv.7 Mage</span>
        <span className="text-white/20">|</span>
        <span className="text-gold drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">⚡ 80/100</span>
      </div>
    </div>
  );
}

function HudKey({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center gap-[6px] text-[12px] font-bold text-slate-400">
      {keys.map((k) => (
        <span
          key={k}
          className="bg-surface2 border border-white/10 rounded-md px-[6px] py-[2px] text-[10px] font-extrabold text-white shadow-[0_2px_0_rgba(255,255,255,0.1)] min-w-[22px] text-center tracking-wider uppercase"
        >
          {k}
        </span>
      ))}
      <span className="ml-0.5">{label}</span>
    </div>
  );
}
