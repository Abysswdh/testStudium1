import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useSoundEngine from "@/hooks/useSoundEngine";
import { 
  Home, 
  Swords, 
  CalendarDays, 
  FileText, 
  Crosshair, 
  Trophy, 
  Library, 
  Settings,
  Gamepad2,
  PenTool,
  Check,
  X
} from "lucide-react";

type ToolId = "notes" | "schedule" | "quests" | "leaderboard";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { playHover, playSelect } = useSoundEngine();

  const [isEditingTools, setIsEditingTools] = useState(false);
  const [activeTools, setActiveTools] = useState<ToolId[]>(["notes", "schedule", "quests"]);

  const ALL_TOOLS: { id: ToolId; icon: React.ElementType; label: string; href: string; badge?: number }[] = [
    { id: "notes", icon: FileText, label: "The Grimoire", href: "/notes" },
    { id: "schedule", icon: CalendarDays, label: "Schedule", href: "/schedule" },
    { id: "quests", icon: Swords, label: "Quests", badge: 3, href: "/quests" },
    { id: "leaderboard", icon: Trophy, label: "Leaderboard", href: "#" },
  ];

  const mainHubs = [
    { type: "header", label: "Hubs" },
    { icon: Home, label: "Home", href: "/" },
    { icon: Library, label: "Guild", href: "/guild" },
    { icon: Crosshair, label: "Arena", href: "/arena" },
  ];

  const visibleTools = ALL_TOOLS.filter((tool) => activeTools.includes(tool.id));

  // Build the complete render list
  const renderItems = [
    ...mainHubs,
    { type: "divider" },
    { type: "header", label: "Tools" },
    ...visibleTools.map((t) => ({ ...t, type: "tool" })),
  ];

  const toggleTool = (id: ToolId) => {
    setActiveTools(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <aside className="
      fixed bottom-0 left-0 right-0 w-full h-[64px] flex flex-row items-center px-4 py-1 z-[60]
      bg-sidebar/95 backdrop-blur-3xl border-t border-white/5 shadow-2xl transition-all duration-400
      md:relative md:flex-col md:justify-between md:items-start md:w-[72px] md:hover:w-[240px] md:focus-within:w-[240px] 
      md:h-screen md:border-r md:border-t-0 md:py-6 md:pb-6 md:px-0 group shrink-0
    ">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none hidden md:block" />
      
      {/* Top Section: Logo (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col w-full">
        <div className="flex items-center gap-4 px-[14px] mb-8 whitespace-nowrap w-full relative z-10 cursor-pointer">
          <div className="w-[44px] h-[44px] min-w-[44px] rounded-[14px] bg-accent flex items-center justify-center text-white shadow-[0_0_24px_var(--color-accent-glow)] shrink-0 transition-transform duration-300 hover:scale-105">
            <Gamepad2 size={24} strokeWidth={2.5} />
          </div>
          <span className="font-[var(--font-fredoka)] text-[20px] font-bold text-white opacity-0 -translate-x-2 transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 tracking-wide">
            Studium
          </span>
        </div>
      </div>

      {/* Middle Section: Nav */}
      <nav className="flex flex-row md:flex-col items-center justify-around md:justify-center gap-1 flex-1 w-full px-2 md:px-3 relative z-10 overflow-y-auto no-scrollbar md:my-auto">
        {renderItems.map((item: any, idx) => {
          if (item.type === "header") {
            return (
              <div key={`header-${idx}`} className="hidden md:flex items-center justify-between text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mt-4 mb-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span>{item.label}</span>
                {item.label === "Tools" && (
                  <button 
                    onClick={() => { playSelect(); setIsEditingTools(!isEditingTools); }}
                    className={`p-1 transition-colors ${isEditingTools ? "text-accent" : "hover:text-purple-400"}`}
                  >
                    {isEditingTools ? <Check size={14} /> : <PenTool size={12} />}
                  </button>
                )}
              </div>
            );
          }
          if (item.type === "divider") {
            return <div key={`divider-${idx}`} className="hidden md:block h-px bg-white/5 my-2 mx-2" />;
          }

          // Hide tools on mobile to keep bottom bar clean
          if (item.type === "tool") {
            return (
              <div key={item.label} className="hidden md:flex relative items-center group/item w-full">
                <NavItem item={item} isActive={pathname === item.href} isEditingTools={isEditingTools} playSelect={playSelect} playHover={playHover} router={router} />
              </div>
            );
          }

          const isActive = pathname === item.href;
          
          return (
            <div key={item.label} className="flex-1 md:flex-none relative flex items-center justify-center md:justify-start group/item w-full md:w-full">
              <NavItem item={item} isActive={isActive} isEditingTools={isEditingTools} playSelect={playSelect} playHover={playHover} router={router} />
            </div>
          );
        })}

        {/* Edit Tools Dropdown - Desktop Only */}
        {isEditingTools && (
          <div className="hidden md:flex mt-2 bg-[#1a1625] border border-[#2e293f] rounded-2xl p-2 flex-col gap-1 w-[216px] animate-in fade-in slide-in-from-top-2 duration-300 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 shadow-xl ml-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-1">Available Tools</span>
            {ALL_TOOLS.map((tool) => {
              const isSelected = activeTools.includes(tool.id);
              const ToolIcon = tool.icon;
              return (
                <button
                  key={`edit-${tool.id}`}
                  onClick={() => { playSelect(); toggleTool(tool.id); }}
                  onMouseEnter={playHover}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <ToolIcon size={16} className={isSelected ? "text-purple-400" : "text-slate-500"} />
                    <span className={`text-[13px] font-bold ${isSelected ? "text-white" : "text-slate-400"}`}>{tool.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? "bg-purple-500 border-purple-400" : "bg-transparent border-slate-600 group-hover:border-slate-400"}`}>
                    {isSelected && <Check size={12} className="text-white" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Bottom Profile / Settings (Desktop Only or simplified on mobile if needed) */}
      <div className="hidden md:flex w-full px-3 flex-col gap-2 relative z-10 pt-4 mt-2">
        <button
          tabIndex={0}
          onMouseEnter={playHover}
          data-focusable={true}
          className="
            w-[48px] h-[48px] rounded-2xl
            group-hover/sb:w-full
            group-focus-within/sb:w-full
            flex items-center gap-3.5 px-[12px]
            cursor-pointer outline-none whitespace-nowrap
            transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            bg-transparent text-slate-400 hover:bg-white/5 hover:text-white
          "
        >
          <span className="shrink-0 flex items-center justify-center w-[24px]">
            <Settings size={22} strokeWidth={2} />
          </span>
          <span className="text-[14px] font-bold opacity-0 -translate-x-2 transition-all duration-300 delay-[50ms] group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0">
            Settings
          </span>
        </button>

        <div className="flex items-center gap-3 p-2 rounded-2xl cursor-pointer hover:bg-white/5 whitespace-nowrap transition-colors duration-300 group-hover/sb:w-full">
          <div className="w-[32px] h-[32px] min-w-[32px] rounded-full bg-[linear-gradient(45deg,var(--color-accent),var(--color-accent-light))] flex items-center justify-center shrink-0 shadow-[0_0_12px_var(--color-accent-glow)] overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abyasa&backgroundColor=transparent" alt="Avatar" className="w-[120%] h-[120%] object-cover mt-1" />
          </div>
          <div className="opacity-0 -translate-x-2 transition-all duration-300 delay-[100ms] group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 flex-1 min-w-0">
            <div className="text-[13px] font-extrabold text-white leading-tight truncate">Abyasa Wedha</div>
            <div className="text-[10px] text-accent-light font-bold flex items-center gap-1">
              <span>Lv.7 Mage</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item, isActive, isEditingTools, playSelect, playHover, router }: any) {
  const IconInfo = item.icon;
  return (
    <button
      onClick={() => {
        playSelect();
        if (!isEditingTools && item.href && item.href !== "#") router.push(item.href);
      }}
      onMouseEnter={playHover}
      tabIndex={0}
      data-focusable={!isEditingTools}
      className={`
        w-[48px] h-[48px] rounded-2xl
        md:group-hover:w-full
        md:group-focus-within:w-full
        flex items-center justify-center md:justify-start gap-3.5 px-[12px]
        cursor-pointer outline-none overflow-hidden whitespace-nowrap
        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        border border-transparent relative
        ${
          isActive && !isEditingTools
            ? "bg-accent/10 border-accent/20 text-accent shadow-[inset_0_0_20px_var(--color-accent-glow)]"
            : "bg-transparent text-slate-400 hover:bg-white/5 hover:text-white"
        }
        ${isEditingTools && item.type === "tool" ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {isActive && !isEditingTools && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-1/2 bg-accent rounded-r-full shadow-[0_0_12px_var(--color-accent)] animate-[shimmer_2s_infinite] hidden md:block" />
      )}
      
      <span className="shrink-0 flex items-center justify-center w-[24px]">
        <IconInfo size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive && !isEditingTools ? "drop-shadow-[0_0_8px_var(--color-accent-glow)]" : ""} />
      </span>
      
      <span
        className={`hidden md:block text-[14px] font-bold flex-1 text-left
          opacity-0 -translate-x-2
          transition-all duration-300 delay-[50ms]
          group-hover:opacity-100 group-hover:translate-x-0
          group-focus-within:opacity-100 group-focus-within:translate-x-0
          ${isActive && !isEditingTools ? "text-white" : ""}
        `}
      >
        {item.label}
      </span>
      
      {item.badge && !isEditingTools && (
        <span className="hidden md:block bg-accent text-white text-[10px] font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center opacity-0 transition-opacity duration-300 delay-[100ms] group-hover:opacity-100 group-focus-within:opacity-100 shrink-0 shadow-[0_0_10px_var(--color-accent-glow)]">
          {item.badge}
        </span>
      )}
    </button>
  );
}
