"use client";

import { useState } from "react";

interface WidgetPickerProps {
  availableWidgets: { id: string; label: string; icon: string }[];
  onAdd: (id: string) => void;
  onClose: () => void;
}

export default function WidgetPicker({ availableWidgets, onAdd, onClose }: WidgetPickerProps) {
  if (availableWidgets.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 min-w-[340px] max-w-[420px] animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-[var(--font-fredoka)] text-lg font-bold text-slate-900 mb-4">Add Widget</h3>
        <div className="flex flex-col gap-2">
          {availableWidgets.map((w) => (
            <button
              key={w.id}
              onClick={() => { onAdd(w.id); onClose(); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-blue-500/10 hover:border-accent hover:bg-blue-50 transition-all duration-200 cursor-pointer"
            >
              <span className="text-2xl">{w.icon}</span>
              <span className="text-sm font-semibold text-slate-800">{w.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 text-sm font-semibold text-muted hover:text-slate-900 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
