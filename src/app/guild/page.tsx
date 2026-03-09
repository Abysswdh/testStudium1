"use client";

import { useState } from "react";
import GuildTabs from "@/components/guild/GuildTabs";

type TabId = "your_guild" | "all_guilds" | "discover";

export default function GuildHub() {
  const [activeTab, setActiveTab] = useState<TabId>("your_guild");

  return (
    <div className="flex-1 flex flex-col min-h-0 w-full animate-in fade-in duration-500 max-w-[1400px] mx-auto mt-4 md:mt-6 pb-24 md:pb-0 px-4 md:px-0">
      
      {/* Top Header & Navigation */}
      <div className="flex flex-col items-center mb-6 md:mb-8 gap-4 md:gap-6 text-center">
        <h1 className="font-[var(--font-fredoka)] text-3xl md:text-[40px] font-bold text-white tracking-wider flex items-center justify-center gap-4">
          <span className="text-3xl md:text-4xl">🛡️</span> Guild Center
        </h1>
        <GuildTabs activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Tab Content Placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-[#2e293f] rounded-[24px] md:rounded-[32px] bg-[#1a1625]/50 m-0 md:m-4 p-6 md:p-10 animate-in fade-in zoom-in duration-300 min-h-[300px]">
        
        {activeTab === "your_guild" && (
          <div className="flex flex-col items-center text-center max-w-lg">
            <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <span className="text-4xl text-purple-400">🏰</span>
            </div>
            <h2 className="font-[var(--font-fredoka)] text-3xl font-bold text-white mb-3">Your Basecamp</h2>
            <p className="text-slate-400 text-lg">Check in with your squad, deposit earned Gold, and enter the Co-Op Pomodoro Focus Room.</p>
          </div>
        )}

        {activeTab === "all_guilds" && (
          <div className="flex flex-col items-center text-center max-w-lg">
            <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <span className="text-4xl text-blue-400">🌐</span>
            </div>
            <h2 className="font-[var(--font-fredoka)] text-3xl font-bold text-white mb-3">Global Rankings</h2>
            <p className="text-slate-400 text-lg">Spy on the top-ranking Guilds across the server and see how your clan stacks up.</p>
          </div>
        )}

        {activeTab === "discover" && (
          <div className="flex flex-col items-center text-center max-w-lg">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <span className="text-4xl text-emerald-400">🗺️</span>
            </div>
            <h2 className="font-[var(--font-fredoka)] text-3xl font-bold text-white mb-3">Find a Clan</h2>
            <p className="text-slate-400 text-lg">Looking for teammates? Browse open Guilds recruiting for Study Raids and Tournaments.</p>
          </div>
        )}

      </div>
    </div>
  );
}
