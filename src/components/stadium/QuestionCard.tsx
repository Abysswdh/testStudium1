export default function QuestionCard() {
  const options = [
    { id: "A", label: "Treaty of Versailles" },
    { id: "B", label: "Peace of Westphalia" },
    { id: "C", label: "Treaty of Utrecht" },
    { id: "D", label: "Congress of Vienna" },
  ];

  return (
    <div className="bg-[#1f1b2e] border-2 border-[#2e293f] rounded-[32px] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
      {/* Subtle Background Elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[radial-gradient(circle,rgba(168,85,247,0.05),transparent_70%)] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Top Tag */}
      <div className="flex justify-end relative z-10 w-full mb-6">
        <div className="bg-purple-900/50 text-purple-300 text-[11px] font-extrabold tracking-widest uppercase px-4 py-1.5 rounded-full border border-purple-500/30">
          History
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="text-[13px] font-bold text-slate-400 tracking-[0.2em] uppercase mb-6">
          Question 4 of 10
        </div>
        <h2 className="font-[var(--font-fredoka)] text-[36px] font-bold text-white leading-[1.3] drop-shadow-md">
          Which treaty officially ended the Thirty Years' War in Europe in 1648?
        </h2>
      </div>

      {/* Answer Grid */}
      <div className="grid grid-cols-2 gap-4 mt-12 relative z-10">
        {options.map((opt) => (
          <button
            key={opt.id}
            className="group/btn bg-[#2a253a] hover:bg-[#342e47] border-2 border-[#3f3852] hover:border-purple-500/50 rounded-2xl flex items-center p-4 transition-all duration-200 cursor-pointer outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1f1b2e] group-hover/btn:bg-purple-500/20 text-slate-400 group-hover/btn:text-purple-300 flex items-center justify-center font-bold text-lg transition-colors border border-[#3f3852] group-hover/btn:border-purple-500/30 shrink-0">
              {opt.id}
            </div>
            <span className="ml-4 font-semibold text-slate-300 group-hover/btn:text-white text-left leading-tight">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
