"use client";

import { useState, useEffect } from "react";
import useSoundEngine from "@/hooks/useSoundEngine";
import { Zap } from "lucide-react";

export default function BootSequence() {
  const [bootState, setBootState] = useState<"waiting" | "booting" | "complete">("waiting");
  const { playBoot } = useSoundEngine();

  useEffect(() => {
    const handleStart = () => {
      if (bootState === "waiting") {
        setBootState("booting");
        playBoot();
        
        // Unmount sequence after the animation/sound completes (4.5 seconds)
        setTimeout(() => {
          setBootState("complete");
          window.dispatchEvent(new CustomEvent("studium-boot-complete"));
        }, 4500);
      }
    };

    if (bootState === "waiting") {
      window.addEventListener("keydown", handleStart);
      window.addEventListener("click", handleStart);
    }

    return () => {
      window.removeEventListener("keydown", handleStart);
      window.removeEventListener("click", handleStart);
    };
  }, [bootState, playBoot]);

  if (bootState === "complete") return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#0f0c16] flex flex-col items-center justify-center transition-opacity duration-1000 ${bootState === "booting" ? "opacity-100" : "opacity-100"}`}>
      
      {/* Waiting for Interaction State */}
      {bootState === "waiting" && (
        <div className="flex flex-col items-center animate-pulse duration-2000">
           <span className="text-6xl mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">✨</span>
           <p className="font-[var(--font-fredoka)] text-xl text-slate-400 tracking-widest uppercase">Press Any Key or Click to Start</p>
        </div>
      )}

      {/* Cinematic Boot Animation */}
      {bootState === "booting" && (
        <div className="relative flex flex-col items-center justify-center w-full h-full delay-[3500ms] duration-1000 ease-in-out animate-out zoom-out-150 fade-out fill-mode-forwards">
            
            {/* Exploding Logo Box */}
            <div className="relative w-32 h-32 bg-purple-600 rounded-[32px] shadow-[0_0_100px_rgba(168,85,247,0.8)] flex items-center justify-center animate-in zoom-in spin-in-12 duration-[1500ms] cubic-bezier(0.16,1,0.3,1)">
                <div className="absolute inset-0 rounded-[32px] border-2 border-white/50 animate-ping opacity-75 duration-[2000ms]" />
                <Zap size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" />
            </div>
            
            {/* Sweeping Line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen max-w-[800px] h-[2px] bg-purple-500 scale-x-0 animate-[shimmer_1.5s_ease-out_forwards] shadow-[0_0_20px_rgba(168,85,247,1)] delay-500" />
            
            {/* Title Fade */}
            <h1 className="mt-12 font-[var(--font-fredoka)] text-6xl font-black text-white tracking-[0.5em] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-[800ms] fill-mode-backwards drop-shadow-[0_0_30px_rgba(255,255,255,0.5)] pl-6">
               STUDIUM
            </h1>
        </div>
      )}
      
      {/* Camera Flash Overlay at the end */}
      {bootState === "booting" && (
        <div className="absolute inset-0 bg-white pointer-events-none opacity-0 animate-[pulse_1s_ease-out_3s] fill-mode-forwards" />
      )}
      
    </div>
  );
}
