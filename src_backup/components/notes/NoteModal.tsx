"use client";

import { useState, useEffect } from "react";
import useSoundEngine from "@/hooks/useSoundEngine";

export default function NoteModal({
  isOpen,
  onClose,
  initialTitle = "",
  initialContent = "",
  initialTags = [],
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
  onSave?: (title: string, content: string, tags: string[]) => void;
}) {
  const { playHover, playSelect } = useSoundEngine();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [tags, setTags] = useState<string[]>(initialTags);

  // Update effect
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setContent(initialContent);
      setTags(initialTags);
    }
  }, [isOpen, initialTitle, initialContent, initialTags]);

  if (!isOpen) return null;

  const handleSave = () => {
    playSelect();
    onSave?.(title, content, tags);
    onClose();
  };

  const handleClose = () => {
    playSelect();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-500/10 bg-slate-50">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="bg-transparent border-none outline-none font-[var(--font-fredoka)] text-xl font-bold text-slate-900 flex-1 placeholder:text-slate-400"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              onMouseEnter={playHover}
              tabIndex={0}
              className="p-2 rounded-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors outline-none cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <button
              onClick={handleSave}
              onMouseEnter={playHover}
              tabIndex={0}
              className="px-4 py-2 bg-accent text-white font-bold text-sm rounded-xl hover:bg-accent-light transition-colors outline-none cursor-pointer border-none shadow-[0_4px_12px_var(--color-accent-glow)]"
            >
              Save Note
            </button>
          </div>
        </div>

        {/* Tags bar */}
        <div className="px-6 py-3 flex items-center gap-2 border-b border-blue-500/5 bg-white">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">Tags:</span>
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
              {tag}
              <button 
                onClick={() => setTags(tags.filter((_, i) => i !== idx))}
                className="hover:text-red transition-colors"
              >
                ×
              </button>
            </span>
          ))}
          <button 
            onClick={() => {
              const newTag = prompt("Enter new tag");
              if (newTag && newTag.trim()) {
                setTags([...tags, newTag.trim()]);
              }
            }}
            className="text-xs font-bold text-slate-400 hover:text-accent transition-colors bg-slate-50 px-2.5 py-1 rounded-md border border-dashed border-slate-300 cursor-pointer"
          >
            + Add Tag
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 min-h-[300px] max-h-[60vh] overflow-y-auto bg-white">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note..."
            className="w-full h-full min-h-[250px] resize-none border-none outline-none text-slate-700 text-base leading-relaxed placeholder:text-slate-300"
          />
        </div>
      </div>
    </div>
  );
}
