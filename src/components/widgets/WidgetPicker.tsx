"use client";

import { useState } from "react";

import { ElementType } from "react";

interface WidgetPickerProps {
  availableWidgets: { id: string; label: string; icon: ElementType }[];
  onAdd: (id: string) => void;
  onClose: () => void;
}

export default function WidgetPicker({ availableWidgets, onAdd, onClose }: WidgetPickerProps) {
  if (availableWidgets.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="bg-surface2 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-6 min-w-[340px] w-full max-w-[420px] animate-in zoom-in-95 duration-200 border border-white/10 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        <h3 className="font-[var(--font-fredoka)] text-xl font-bold text-white mb-5 uppercase tracking-wider relative z-10 flex items-center gap-2">
          <span className="text-accent">+</span> Add Widget
        </h3>
        <div className="flex flex-col gap-2 relative z-10">
          {availableWidgets.map((w) => {
            const Icon = w.icon;
            return (
              <button
                key={w.id}
                onClick={() => { onAdd(w.id); onClose(); }}
                className="flex items-center gap-4 px-5 py-3.5 rounded-2xl border border-white/5 bg-sidebar/50 hover:border-accent hover:bg-accent/10 hover:-translate-y-0.5 hover:shadow-[0_0_20px_var(--color-accent-glow)] transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-slate-400 group-hover:bg-accent/20 group-hover:text-accent transition-colors">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <span className="text-[15px] font-bold text-slate-300 group-hover:text-white transition-colors">{w.label}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-5 w-full py-3 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors cursor-pointer relative z-10"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
