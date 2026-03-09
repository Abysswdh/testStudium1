"use client";

import MainQuestCard from "@/components/quests/MainQuestCard";
import SideQuestCard from "@/components/quests/SideQuestCard";
import { useState } from "react";
import useSoundEngine from "@/hooks/useSoundEngine";

export default function QuestsPage() {
  const [filter, setFilter] = useState("All Quests");
  const { playHover, playSelect } = useSoundEngine();

  const filters = [
    { label: "All Quests", badge: "8" },
    { label: "Easy", color: "bg-green" },
    { label: "Medium", color: "bg-gold" },
    { label: "Hard", color: "bg-red" },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-up min-h-0 w-full max-w-[1200px] mx-auto pb-8">
      
      {/* Top Header / Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => { playSelect(); setFilter(f.label); }}
              onMouseEnter={playHover}
              tabIndex={0}
              data-focusable={true}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold transition-all cursor-pointer outline-none border ${
                filter === f.label
                  ? "bg-sidebar2 text-white border-sidebar"
                  : "bg-white text-muted border-blue-500/10 hover:border-sidebar2/30 hover:text-slate-800"
              }`}
            >
              {f.color && <div className={`w-2 h-2 rounded-full ${f.color}`} />}
              {f.label}
              {f.badge && (
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] ml-1">
                  {f.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[13px] font-bold text-muted">
          <span>Sort by:</span>
          <select className="bg-transparent border-none text-slate-800 outline-none font-bold cursor-pointer hover:text-accent transition-colors">
            <option>Priority</option>
            <option>Due Date</option>
            <option>Rewards</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Left (Main Quests) + Right (Side Quests) */}
      <div className="grid grid-cols-[1fr_340px] gap-6 items-start">
        
        {/* LEFT COLUMN: Main Quests */}
        <div className="flex flex-col gap-4">
          <h2 className="font-[var(--font-fredoka)] text-[22px] font-bold text-slate-900 flex items-center gap-3">
            <span className="text-accent">📚</span> Main Quests 
            <span className="bg-accent/10 border border-accent/20 text-accent text-[11px] px-2 py-0.5 rounded-md uppercase tracking-wider font-extrabold">Active</span>
          </h2>

          <MainQuestCard
            title="Advanced Calculus Final Prep"
            due="Tomorrow, 23:59"
            desc="Complete the review of Chapter 5-8 integration problems and solve at least 5 complex past paper questions."
            progress={60}
            gold={500}
            xp={1200}
            tag="ELITE BOSS"
            icon="📖"
            iconBg="bg-blue-100 text-blue-600"
          />

          <MainQuestCard
            title="Physics Lab Report"
            due="In 2 days"
            desc="Write the introduction and methodology section for the thermodynamics experiment. Include error analysis."
            progress={0}
            gold={250}
            xp={600}
            tag="HARD"
            icon="🧪"
            iconBg="bg-red/10 text-red"
          />

          <MainQuestCard
            title="Essay Outline"
            due="In 3 days"
            desc='Draft the main arguments for the History essay on "The Industrial Revolution".'
            progress={15}
            gold={150}
            xp={300}
            tag="MEDIUM"
            icon="📝"
            iconBg="bg-gold/10 text-gold"
          />
        </div>

        {/* RIGHT COLUMN: Side Quests */}
        <div className="flex flex-col gap-6">
          <h2 className="font-[var(--font-fredoka)] text-[22px] font-bold text-slate-900 flex items-center gap-3">
            <span className="text-green">🔁</span> Side Quests (Daily)
          </h2>

          {/* Morning Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-extrabold text-muted uppercase tracking-wider pl-1">Morning Routine</h3>
            <div className="flex flex-col gap-2">
              <SideQuestCard
                title="Drink Water"
                progressText="0/3"
                xp={20}
                gold={10}
                icon="💧"
                iconBg="bg-blue-100"
              />
              <SideQuestCard
                title="10 Min Stretch"
                xp={100}
                gold={50}
                icon="🧘"
                iconBg="bg-orange-100"
              />
            </div>
          </div>

          {/* Evening Section */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[11px] font-extrabold text-muted uppercase tracking-wider pl-1">Evening Routine</h3>
            <div className="flex flex-col gap-2">
              <SideQuestCard
                title="Read 10 Pages"
                xp={80}
                gold={30}
                icon="📘"
                iconBg="bg-indigo-100"
              />
              <SideQuestCard
                title="Sleep by 11PM"
                xp={200}
                gold={100}
                icon="🌙"
                iconBg="bg-slate-100"
                done={true}
              />
            </div>
          </div>

          {/* Consistency Tracker */}
          <div className="bg-white border border-blue-500/10 rounded-2xl p-5 mt-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[13px] text-slate-900">Weekly Consistency</h3>
              <button className="text-[11px] font-bold text-accent hover:underline cursor-pointer">View</button>
            </div>
            <div className="flex justify-between items-end gap-1 px-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                const isFilled = i < 5; // Fake some progress
                const isToday = i === 4;
                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-3 rounded-full transition-all duration-500 ${isFilled ? "bg-green shadow-[0_0_8px_rgba(43,181,122,0.4)]" : "bg-blue-500/10"} ${isToday ? "h-14" : (isFilled ? "h-10" : "h-10")}`} />
                    <span className={`text-[10px] font-bold ${isToday ? "text-slate-900" : "text-muted"}`}>{day}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
