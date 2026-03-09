"use client";

import { useState } from "react";
import useSoundEngine from "@/hooks/useSoundEngine";
import NoteCard from "@/components/notes/NoteCard";
import NoteModal from "@/components/notes/NoteModal";

type Note = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  date: string;
  color: string;
};

const MOCK_NOTES: Note[] = [
  {
    id: "1",
    title: "Calculus integration formulas to remember",
    content: "Integration by parts: ∫ u dv = uv - ∫ v du\n\nTrigonometric substitution:\n- For √(a² - x²), let x = a sin(θ)\n- For √(a² + x²), let x = a tan(θ)\n- For √(x² - a²), let x = a sec(θ)",
    excerpt: "Integration by parts and trigonometric substitution formulas for the upcoming final exam.",
    tags: ["Math", "Exams"],
    date: "TODAY",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "History Essay Draft - Industrial Rev",
    content: "Key points to hit in the essay:\n\n1. Technological advancements (steam engine, spinning jenny)\n2. Shift from agrarian to urban society\n3. Working conditions and the rise of labor unions\n4. Economic impacts globally",
    excerpt: "Key points to hit in the essay: technological advancements, urbanization, working conditions...",
    tags: ["History", "Drafts"],
    date: "YESTERDAY",
    color: "bg-gold",
  },
  {
    id: "3",
    title: "Project Ideas for Hackathon",
    content: "1. Study tracker with gamification (RPG elements)\n2. AI flashcard generator from PDF notes\n3. Focus timer that plants virtual trees that grow the longer you focus",
    excerpt: "Brainstorming for the weekend hackathon: study trackers, AI tools, focus timers.",
    tags: ["Personal", "Coding"],
    date: "OCT 12",
    color: "bg-green",
  },
  {
    id: "4",
    title: "Physics Lab Data - Pendulum",
    content: "Length (m) | Period (s)\n0.5 | 1.42\n0.6 | 1.55\n0.7 | 1.68\n0.8 | 1.80",
    excerpt: "Raw data collected from the pendulum experiment in Friday's lab session.",
    tags: ["Physics", "Lab"],
    date: "OCT 10",
    color: "bg-red",
  },
  {
    id: "5",
    title: "Books to Read",
    content: "1. Atomic Habits by James Clear\n2. Deep Work by Cal Newport\n3. Thinking, Fast and Slow by Daniel Kahneman",
    excerpt: "List of productivity books recommended by study group.",
    tags: ["Reading", "Personal", "Growth"],
    date: "SEP 28",
    color: "bg-purple-500",
  }
];

export default function NotesPage() {
  const [filter, setFilter] = useState("All Notes");
  const [notes, setNotes] = useState<Note[]>(MOCK_NOTES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const { playHover, playSelect } = useSoundEngine();

  const filters = [
    { label: "All Notes", badge: notes.length.toString() },
    { label: "Personal", color: "bg-blue-400" },
    { label: "Study", color: "bg-green" },
    { label: "Drafts", color: "bg-gold" },
  ];

  const handleOpenNote = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleSaveNote = (title: string, content: string, tags: string[]) => {
    const excerpt = content.substring(0, 100) + "...";
    
    if (selectedNote) {
      // Update existing
      setNotes(notes.map(n => n.id === selectedNote.id ? {
        ...n, title, content, excerpt, tags
      } : n));
    } else {
      // Create new
      const colors = ["bg-blue-500", "bg-green", "bg-gold", "bg-red", "bg-purple-500"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newNote: Note = {
        id: Date.now().toString(),
        title: title || "Untitled Note",
        content,
        excerpt,
        tags,
        date: "JUST NOW",
        color: randomColor,
      };
      setNotes([newNote, ...notes]);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-up min-h-0 w-full max-w-[1200px] mx-auto pb-8 relative">
      
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
        
        <div className="flex gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="bg-white border border-blue-500/10 rounded-xl py-2 pl-9 pr-4 text-[13px] font-bold text-slate-700 outline-none focus:border-accent transition-colors w-[200px]"
            />
          </div>
          <button
            onClick={() => { playSelect(); handleNewNote(); }}
            onMouseEnter={playHover}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-[13px] font-bold transition-all cursor-pointer outline-none shadow-[0_4px_12px_var(--color-accent-glow)] hover:bg-accent-light hover:-translate-y-0.5 border-none"
          >
            <span className="text-lg leading-none">+</span> New Note
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-[-10px]">
        <h2 className="font-[var(--font-fredoka)] text-[22px] font-bold text-slate-900 flex items-center gap-3">
          <span className="text-blue-500">📝</span> All Notes
        </h2>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 items-start">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            excerpt={note.excerpt}
            tags={note.tags}
            date={note.date}
            color={note.color}
            onClick={() => handleOpenNote(note)}
          />
        ))}
      </div>

      {/* Note Modal */}
      <NoteModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTitle={selectedNote?.title || ""}
        initialContent={selectedNote?.content || ""}
        initialTags={selectedNote?.tags || []}
        onSave={handleSaveNote}
      />
      
    </div>
  );
}
