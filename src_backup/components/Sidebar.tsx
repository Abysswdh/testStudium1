"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useSoundEngine from "@/hooks/useSoundEngine";

const navItems = [
  { icon: "🏠", label: "Dashboard", href: "/" },
  { icon: "⚔️", label: "Quests", badge: 3, href: "/quests" },
  { icon: "📅", label: "Schedule", href: "/schedule" },
  { icon: "📝", label: "Notes", href: "/notes" },
  { icon: "🏟️", label: "Arena", href: "#" },
  { icon: "🏆", label: "Leaderboard", href: "#" },
  { icon: "🏰", label: "Study Rooms", href: "#" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { playHover, playSelect } = useSoundEngine();

  return (
    <aside className="group/sb w-[68px] hover:w-[200px] focus-within:w-[200px] bg-sidebar flex flex-col items-start py-4 pb-5 z-20 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-[13px] mb-7 whitespace-nowrap w-full">
        <div className="w-[42px] h-[42px] min-w-[42px] rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-xl shadow-[0_4px_12px_var(--color-accent-glow)] cursor-pointer shrink-0">
          ⚔️
        </div>
        <span className="font-[var(--font-fredoka)] text-[17px] font-bold text-white opacity-0 -translate-x-2 transition-all duration-200 delay-100 group-hover/sb:opacity-100 group-hover/sb:translate-x-0 group-focus-within/sb:opacity-100 group-focus-within/sb:translate-x-0 whitespace-nowrap">
          Studium
        </span>
      </div>

      {/* Nav — centered vertically */}
      <nav className="flex flex-col justify-center gap-1 flex-1 w-full px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.label}
              onClick={() => {
                playSelect();
                if (item.href !== "#") router.push(item.href);
              }}
            tabIndex={0}
            data-focusable={true}
            className={`
              w-[44px] h-[44px] rounded-full
              group-hover/sb:w-[176px] group-hover/sb:rounded-[11px]
              group-focus-within/sb:w-[176px] group-focus-within/sb:rounded-[11px]
              flex items-center gap-3 px-[10px]
              cursor-pointer outline-none relative overflow-hidden whitespace-nowrap
              transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              border-[1.5px] border-transparent
              ${
                isActive
                  ? "bg-accent border-accent-light shadow-[0_0_16px_var(--color-accent-glow)]"
                  : "bg-transparent hover:bg-white/[0.09] hover:border-white/[0.12]"
              }
            `}
          >
            <span className="text-lg min-w-[24px] text-center shrink-0">
              {item.icon}
            </span>
            <span
              className={`text-[13px] font-semibold flex-1 text-left
                opacity-0 -translate-x-1.5
                transition-all duration-[180ms] delay-[80ms]
                group-hover/sb:opacity-100 group-hover/sb:translate-x-0
                group-focus-within/sb:opacity-100 group-focus-within/sb:translate-x-0
                ${isActive ? "text-white" : "text-white/75"}
              `}
            >
              {item.label}
            </span>
            {item.badge && (
              <span className="bg-red text-white text-[9px] font-extrabold px-[5px] py-[1px] rounded-full min-w-[18px] text-center opacity-0 transition-opacity duration-[180ms] delay-[80ms] group-hover/sb:opacity-100 group-focus-within/sb:opacity-100 shrink-0">
                {item.badge}
              </span>
            )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="w-full px-3 flex flex-col gap-1 border-t border-white/[0.08] pt-3 mt-1">
        <button
          tabIndex={0}
          data-focusable={true}
          className="
            w-[44px] h-[44px] rounded-full
            group-hover/sb:w-[176px] group-hover/sb:rounded-[11px]
            group-focus-within/sb:w-[176px] group-focus-within/sb:rounded-[11px]
            flex items-center gap-3 px-[10px]
            cursor-pointer outline-none overflow-hidden whitespace-nowrap
            transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            border-[1.5px] border-transparent
            bg-transparent hover:bg-white/[0.09] hover:border-white/[0.12]
          "
        >
          <span className="text-lg min-w-[24px] text-center shrink-0">⚙️</span>
          <span className="text-[13px] font-semibold text-white/75 opacity-0 -translate-x-1.5 transition-all duration-[180ms] delay-[80ms] group-hover/sb:opacity-100 group-hover/sb:translate-x-0 group-focus-within/sb:opacity-100 group-focus-within/sb:translate-x-0">
            Settings
          </span>
        </button>

        <div className="flex items-center gap-3 py-2 px-[5px] rounded-[11px] cursor-pointer hover:bg-white/[0.09] whitespace-nowrap transition-colors duration-[180ms]">
          <div className="w-[34px] h-[34px] min-w-[34px] rounded-full bg-gradient-to-br from-blue-600 to-blue-900 border-2 border-white/20 flex items-center justify-center text-base shrink-0">
            🧙
          </div>
          <div className="opacity-0 -translate-x-1.5 transition-all duration-[180ms] delay-[80ms] group-hover/sb:opacity-100 group-hover/sb:translate-x-0 group-focus-within/sb:opacity-100 group-focus-within/sb:translate-x-0">
            <div className="text-xs font-bold text-white/90 leading-tight">Abyasa Wedha</div>
            <div className="text-[10px] text-accent-light font-semibold">⚔️ Lv.7 Scholar Mage</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
