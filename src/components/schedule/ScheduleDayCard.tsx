"use client";

import useSoundEngine from "@/hooks/useSoundEngine";

export interface ScheduleEvent {
  id: string;
  courseCode: string;
  courseTitle: string;
  type: string;
  session: string;
  time: string;
  location: string;
  badge: string;
}

export default function ScheduleDayCard({
  dayName,
  dateNum,
  events,
}: {
  dayName: string;
  dateNum: string;
  events: ScheduleEvent[];
}) {
  const { playHover, playSelect } = useSoundEngine();

  return (
    <div className="flex items-start gap-4 sm:gap-8 pb-8 border-b border-blue-500/[0.08] last:border-b-0 animate-fade-up">
      {/* Date Column */}
      <div className="w-12 sm:w-16 flex flex-col items-center pt-2 shrink-0">
        <span className="text-[12px] font-bold text-muted uppercase tracking-widest">{dayName}</span>
        <span className="font-[var(--font-fredoka)] text-3xl sm:text-[34px] font-bold text-slate-900 leading-none mt-1">{dateNum}</span>
      </div>

      {/* Events List */}
      <div className="flex-1 flex flex-col gap-3">
        {events.map((evt) => (
          <div
            key={evt.id}
            onClick={playSelect}
            onMouseEnter={playHover}
            tabIndex={0}
            data-focusable={true}
            className="group flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-4 rounded-xl border border-transparent hover:border-blue-500/15 hover:bg-white hover:shadow-[0_4px_20px_var(--color-accent-glow)] cursor-pointer transition-all duration-300 outline-none"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-extrabold text-slate-800 tracking-wide">{evt.courseCode}</span>
              </div>
              <h3 className="font-[var(--font-fredoka)] text-[16px] font-semibold text-accent leading-tight group-hover:text-accent-light transition-colors">
                {evt.courseTitle}
              </h3>
              
              <div className="flex flex-col gap-1 mt-1 text-[11px] font-bold text-muted">
                <span className="flex items-center gap-1.5">👥 {evt.type}</span>
                <span className="flex items-center gap-1.5">📅 {evt.session}</span>
                <span className="flex items-center gap-1.5">⏰ {evt.time}</span>
                <span className="flex items-center gap-1.5">📍 {evt.location}</span>
              </div>
            </div>

            <div className="sm:mt-1">
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#5e6ad2] bg-[#5e6ad2]/10 border border-[#5e6ad2]/20 rounded-full inline-block whitespace-nowrap shadow-sm">
                {evt.badge}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
