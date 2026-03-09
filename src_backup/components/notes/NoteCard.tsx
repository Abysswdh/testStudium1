"use client";

import useSoundEngine from "@/hooks/useSoundEngine";

export default function NoteCard({
  title,
  excerpt,
  tags,
  date,
  color = "bg-blue-100",
  onClick,
}: {
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  color?: string;
  onClick?: () => void;
}) {
  const { playHover, playSelect } = useSoundEngine();

  return (
    <div
      onClick={() => {
        playSelect();
        onClick?.();
      }}
      onMouseEnter={playHover}
      tabIndex={0}
      data-focusable={true}
      className={`relative group bg-white border border-blue-500/10 rounded-2xl p-5 cursor-pointer outline-none transition-all duration-200 hover:-translate-y-[2px] hover:border-accent hover:shadow-[0_8px_24px_var(--color-accent-glow)] flex flex-col items-start gap-3 h-[180px] overflow-hidden`}
    >
      <div className={`absolute top-0 left-0 w-full h-1.5 ${color} opacity-80 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex flex-col gap-1 w-full">
        <h3 className="font-bold text-[15px] text-slate-800 line-clamp-1">{title}</h3>
        <span className="text-[10px] font-extrabold text-muted tracking-wider uppercase">{date}</span>
      </div>

      <p className="text-[13px] text-slate-600 line-clamp-3 leading-relaxed flex-1">
        {excerpt}
      </p>

      <div className="flex items-center gap-1.5 flex-wrap">
        {tags.map((tag, idx) => (
          <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
