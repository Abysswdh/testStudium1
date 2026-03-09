"use client";

import ScheduleDayCard, { ScheduleEvent } from "@/components/schedule/ScheduleDayCard";
import MiniCalendar from "@/components/schedule/MiniCalendar";
import useSoundEngine from "@/hooks/useSoundEngine";

export default function SchedulePage() {
  const { playHover, playSelect } = useSoundEngine();

  // Dummy data shaped like the reference image
  const scheduleData: { dayName: string; dateNum: string; events: ScheduleEvent[] }[] = [
    {
      dayName: "Mon",
      dateNum: "9",
      events: [
        {
          id: "lec1",
          courseCode: "LC20 - LEC",
          courseTitle: "Creativity and Innovation",
          type: "F2F",
          session: "Session 5",
          time: "15:20 - 17:00 GMT+7",
          location: "Malang - 0409",
          badge: "Onsite Class",
        },
      ],
    },
    {
      dayName: "Wed",
      dateNum: "11",
      events: [
        {
          id: "lab1",
          courseCode: "BE20 - LAB",
          courseTitle: "Data Structures",
          type: "F2F",
          session: "Session 5",
          time: "15:20 - 17:00 GMT+7",
          location: "Malang - 0214",
          badge: "Onsite Class",
        },
      ],
    },
    {
      dayName: "Thu",
      dateNum: "12",
      events: [
        {
          id: "lec2",
          courseCode: "LC20 - LEC",
          courseTitle: "Scientific Computing",
          type: "F2F",
          session: "Session 6",
          time: "07:20 - 09:00 GMT+7",
          location: "Malang - 0310",
          badge: "Onsite Class",
        },
        {
          id: "lec3",
          courseCode: "LC20 - LEC",
          courseTitle: "Character Building: Kewarganegaraan",
          type: "F2F",
          session: "Session 6",
          time: "13:20 - 15:00 GMT+7",
          location: "Malang - 0313",
          badge: "Onsite Class",
        },
      ],
    },
    {
      dayName: "Fri",
      dateNum: "13",
      events: [
        {
          id: "lec4",
          courseCode: "LC20 - LEC",
          courseTitle: "Calculus",
          type: "F2F",
          session: "Session 11",
          time: "07:20 - 09:00 GMT+7",
          location: "Malang - 0306",
          badge: "Onsite Class",
        },
        {
          id: "lec5",
          courseCode: "LC20 - LEC",
          courseTitle: "Calculus",
          type: "F2F",
          session: "Session 12",
          time: "09:20 - 11:00 GMT+7",
          location: "Malang - 0306",
          badge: "Onsite Class",
        },
      ],
    },
    {
      dayName: "Sat",
      dateNum: "14",
      events: [
        {
          id: "lec6",
          courseCode: "LC20 - LEC",
          courseTitle: "Data Structures",
          type: "F2F",
          session: "Session 6",
          time: "09:20 - 11:00 GMT+7",
          location: "Malang - 0214",
          badge: "Onsite Class",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-up min-h-0 w-full max-w-[1200px] mx-auto pb-24 md:pb-8 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-blue-500/[0.08] gap-3">
        <h2 className="font-[var(--font-fredoka)] text-[20px] md:text-[22px] font-bold text-slate-900 flex items-center gap-2">
          My Schedule <span className="text-muted text-sm cursor-help">ℹ️</span>
        </h2>
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-bold text-accent">
          <button className="hover:underline cursor-pointer outline-none focus:ring-2 focus:ring-accent rounded">View Academic Calendar</button>
          <span className="text-blue-500/20">•</span>
          <button className="hover:underline cursor-pointer outline-none focus:ring-2 focus:ring-accent rounded">Unsync Outlook</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={playSelect}
            onMouseEnter={playHover}
            tabIndex={0}
            data-focusable={true}
            className="px-4 py-1.5 bg-sidebar text-white text-[10px] md:text-[11px] font-bold rounded-md hover:bg-sidebar2 transition-colors outline-none shadow-sm cursor-pointer tracking-wide"
          >
            TODAY
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={playSelect}
              onMouseEnter={playHover}
              tabIndex={0}
              data-focusable={true}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500/10 text-muted hover:bg-blue-500/20 hover:text-slate-800 transition-colors outline-none cursor-pointer"
            >
              <span className="text-xs font-bold leading-none -translate-x-0.5">&lt;</span>
            </button>
            <button
              onClick={playSelect}
              onMouseEnter={playHover}
              tabIndex={0}
              data-focusable={true}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500/10 text-muted hover:bg-blue-500/20 hover:text-slate-800 transition-colors outline-none cursor-pointer"
            >
              <span className="text-xs font-bold leading-none translate-x-0.5">&gt;</span>
            </button>
          </div>
          <span className="text-[12px] md:text-[13px] font-bold text-slate-800 ml-1 md:ml-2">March 2026 ⌄</span>
        </div>
        
        <button
          onClick={playSelect}
          onMouseEnter={playHover}
          tabIndex={0}
          data-focusable={true}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/10 text-muted hover:bg-blue-500/20 hover:text-slate-800 transition-colors outline-none cursor-pointer"
        >
          <span className="text-sm">🌪️</span>
        </button>
      </div>

      {/* Main Grid: Left (List) + Right (Calendar) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 lg:gap-12 items-start mt-2">
        {/* Left List */}
        <div className="flex flex-col gap-8">
          {scheduleData.map((day) => (
            <ScheduleDayCard
              key={day.dateNum}
              dayName={day.dayName}
              dateNum={day.dateNum}
              events={day.events}
            />
          ))}
        </div>

        {/* Right Calendar */}
        <div className="hidden lg:block border-l border-blue-500/[0.08] pl-10 min-h-full">
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
}
