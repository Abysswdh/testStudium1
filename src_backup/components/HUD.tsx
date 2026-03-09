import { useEffect } from "react";
import useSoundEngine from "@/hooks/useSoundEngine";

export default function HUD() {
  const { toggleBGM, bgmPlaying } = useSoundEngine();

  // Add global 'm' key shortcut for music
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m" && document.activeElement?.tagName !== "INPUT") {
        toggleBGM();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggleBGM]);

  return (
    <div className="h-9 min-h-9 bg-white border-t border-blue-500/[0.13] flex items-center px-6 gap-4">
      <HudKey keys={["W", "A", "S", "D"]} label="Navigate" />
      <div className="w-px h-4 bg-blue-500/[0.13]" />
      <HudKey keys={["↑", "↓", "←", "→"]} label="Arrows" />
      <div className="w-px h-4 bg-blue-500/[0.13]" />
      <HudKey keys={["Enter"]} label="Select" />
      <div className="w-px h-4 bg-blue-500/[0.13]" />
      <HudKey keys={["Esc"]} label="Back" />
      <div className="w-px h-4 bg-blue-500/[0.13]" />
      
      <button 
        onClick={toggleBGM}
        tabIndex={0}
        data-focusable={true}
        className={`flex items-center gap-2 px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors outline-none ${
          bgmPlaying ? "bg-accent/10 text-accent" : "hover:bg-blue-500/[0.05] text-muted hover:text-slate-600"
        }`}
      >
        <HudKey keys={["M"]} label={bgmPlaying ? "Music: On" : "Music: Off"} />
      </button>

      <div className="ml-auto text-[11px] font-semibold text-muted">
        🧙 Abyasa Wedha &nbsp;·&nbsp; Lv.7 Scholar Mage &nbsp;·&nbsp; ⚡ 80/100
      </div>
    </div>
  );
}

function HudKey({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center gap-[5px] text-[11px] font-semibold text-muted">
      {keys.map((k) => (
        <span
          key={k}
          className="bg-bg border border-blue-500/[0.13] rounded px-[5px] py-[1px] text-[10px] font-bold text-slate-900 shadow-[0_1px_0_rgba(59,130,246,0.13)] min-w-5 text-center"
        >
          {k}
        </span>
      ))}
      {label}
    </div>
  );
}
