import { useEffect, useRef } from "react";
import { Users, Globe2, Compass } from "lucide-react";
import useSoundEngine from "@/hooks/useSoundEngine";

type TabId = "your_guild" | "all_guilds" | "discover";

interface GuildTabsProps {
  activeTab: TabId;
  onChange: (tabId: TabId) => void;
}

export default function GuildTabs({ activeTab, onChange }: GuildTabsProps) {
  const { playHover, playSelect } = useSoundEngine();

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "your_guild", label: "Your Guild", icon: <Users size={20} /> },
    { id: "all_guilds", label: "All Guilds", icon: <Globe2 size={20} /> },
    { id: "discover", label: "Discover", icon: <Compass size={20} /> },
  ];

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        return;
      }

      const order: TabId[] = ["your_guild", "all_guilds", "discover"];
      const currentIndex = order.indexOf(activeTab);
      let newIndex = currentIndex;

      // Determine the intended destination index based on hotkeys
      if (e.key === "ArrowLeft" || (e.shiftKey && (e.key === "<" || e.key === ","))) {
        newIndex = Math.max(0, currentIndex - 1);
      } else if (e.key === "ArrowRight" || (e.shiftKey && (e.key === ">" || e.key === "."))) {
        newIndex = Math.min(order.length - 1, currentIndex + 1);
      }

      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < order.length) {
        e.preventDefault();
        playSelect();
        onChange(order[newIndex]);
        // Visually update the focus outline to match the new tab selection
        tabRefs.current[newIndex]?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, onChange, playSelect]);

  return (
    <div className="flex items-center gap-1 md:gap-2 p-1 md:p-1.5 bg-[#1a1625] rounded-[20px] md:rounded-[24px] border border-[#2e293f] mx-auto w-full md:w-fit shadow-lg overflow-x-auto no-scrollbar max-w-full">
      {tabs.map((tab, idx) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[idx] = el; }}
            onClick={() => {
              playSelect();
              onChange(tab.id);
            }}
            onMouseEnter={playHover}
            tabIndex={0}
            className={`
              flex-1 md:flex-none flex items-center justify-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-full outline-none
              transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${isActive 
                ? "bg-[#2a2438] text-white shadow-[0_0_20px_rgba(168,85,247,0.15)] border border-purple-500/30 font-bold" 
                : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }
            `}
          >
            <span className={`${isActive ? "text-purple-400" : "text-slate-500"} shrink-0`}>
              {tab.icon}
            </span>
            <span className="font-bold text-[13px] md:text-[15px] whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
