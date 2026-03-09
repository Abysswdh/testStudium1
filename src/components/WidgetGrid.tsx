"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import XPWidget from "./widgets/XPWidget";
import StreakWidget from "./widgets/StreakWidget";
import BossWidget from "./widgets/BossWidget";
import RankWidget from "./widgets/RankWidget";
import QuestsWidget from "./widgets/QuestsWidget";
import EnergyWidget from "./widgets/EnergyWidget";
import WidgetPicker from "./widgets/WidgetPicker";
import useSoundEngine from "@/hooks/useSoundEngine";

import { Sparkles, Flame, Skull, Trophy, Swords, Zap } from "lucide-react";

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
const RGL = require("react-grid-layout");
const GridLayout = RGL.GridLayout || RGL.ReactGridLayout || RGL.default;

interface WidgetDef {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
  defaultLayout: { w: number; h: number; minW?: number; minH?: number };
}

const ALL_WIDGETS: WidgetDef[] = [
  { id: "xp", label: "Experience", icon: Sparkles, component: XPWidget, defaultLayout: { w: 1, h: 1, minW: 1, minH: 1 } },
  { id: "streak", label: "Streak", icon: Flame, component: StreakWidget, defaultLayout: { w: 1, h: 1, minW: 1, minH: 1 } },
  { id: "boss", label: "Boss Fight", icon: Skull, component: BossWidget, defaultLayout: { w: 2, h: 2, minW: 1, minH: 1 } },
  { id: "rank", label: "Guild Rank", icon: Trophy, component: RankWidget, defaultLayout: { w: 1, h: 1, minW: 1, minH: 1 } },
  { id: "quests", label: "Quests Today", icon: Swords, component: QuestsWidget, defaultLayout: { w: 2, h: 1, minW: 1, minH: 1 } },
  { id: "energy", label: "Energy", icon: Zap, component: EnergyWidget, defaultLayout: { w: 1, h: 1, minW: 1, minH: 1 } },
];

const STORAGE_KEY = "studium_widget_layout";
const ACTIVE_KEY = "studium_active_widgets";

function getDefaultLayout(): any[] {
  return [
    { i: "xp", x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "streak", x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "boss", x: 2, y: 0, w: 2, h: 2, minW: 1, minH: 1 },
    { i: "rank", x: 0, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "quests", x: 1, y: 1, w: 1, h: 1, minW: 1, minH: 1 },
    { i: "energy", x: 0, y: 2, w: 1, h: 1, minW: 1, minH: 1 },
  ];
}

export default function WidgetGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const { playHover, playSelect } = useSoundEngine();
  const [editing, setEditing] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [activeIds, setActiveIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return ALL_WIDGETS.map((w) => w.id);
    try {
      const saved = localStorage.getItem(ACTIVE_KEY);
      return saved ? JSON.parse(saved) : ALL_WIDGETS.map((w) => w.id);
    } catch { return ALL_WIDGETS.map((w) => w.id); }
  });

  const [layout, setLayout] = useState<any[]>(() => {
    if (typeof window === "undefined") return getDefaultLayout();
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return getDefaultLayout();
      const parsed = JSON.parse(saved);
      // Handle migration from old {lg: [...]} format
      if (Array.isArray(parsed)) return parsed;
      if (parsed && Array.isArray(parsed.lg)) return parsed.lg;
      return getDefaultLayout();
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return getDefaultLayout();
    }
  });

  // Measure container width
  useEffect(() => {
    setMounted(true);
    const measure = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  }, [layout, mounted]);

  useEffect(() => {
    if (mounted) localStorage.setItem(ACTIVE_KEY, JSON.stringify(activeIds));
  }, [activeIds, mounted]);

  const onLayoutChange = useCallback((newLayout: any[]) => {
    setLayout(newLayout);
  }, []);

  const removeWidget = useCallback((id: string) => {
    setActiveIds((prev) => prev.filter((wid) => wid !== id));
    setLayout((prev: any[]) => prev.filter((l: any) => l.i !== id));
  }, []);

  const addWidget = useCallback((id: string) => {
    const def = ALL_WIDGETS.find((w) => w.id === id);
    if (!def) return;
    setActiveIds((prev) => [...prev, id]);
    setLayout((prev: any[]) => [
      ...prev,
      { i: id, x: 0, y: Infinity, ...def.defaultLayout },
    ]);
  }, []);

  const removedWidgets = useMemo(
    () => ALL_WIDGETS.filter((w) => !activeIds.includes(w.id)),
    [activeIds]
  );

  const filteredLayout = layout
    .filter((l: any) => activeIds.includes(l.i))
    .map((l: any) => ({ ...l, static: !editing, isDraggable: editing, isResizable: editing }));

  return (
    <div className="animate-fade-up" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 mt-8">
        <h2 className="font-[var(--font-fredoka)] text-xl font-bold text-white tracking-wider flex items-center gap-2">Stats & Progress</h2>
        <div className="flex items-center gap-3">
          {editing && removedWidgets.length > 0 && (
            <button
              onClick={() => { playSelect(); setPickerOpen(true); }}
              className="px-4 py-2 text-[12px] font-extrabold text-accent bg-accent/10 border border-accent/20 rounded-xl hover:bg-accent/20 hover:shadow-[0_0_12px_var(--color-accent-glow)] transition-all cursor-pointer uppercase tracking-wide"
            >
              + Add Widget
            </button>
          )}
          <button
            onClick={() => { playSelect(); setEditing((e) => !e); }}
            tabIndex={0}
            data-focusable={true}
            className={`px-4 py-2 text-[12px] font-extrabold rounded-xl transition-all cursor-pointer outline-none uppercase tracking-wide border ${
              editing
                ? "bg-accent/20 text-accent border-accent/30 shadow-[0_0_16px_var(--color-accent-glow)]"
                : "bg-sidebar/50 text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
            }`}
          >
            {editing ? "✓ Done" : "Customize"}
          </button>
        </div>
      </div>

      {/* Grid */}
      {mounted && width > 0 && (
        <GridLayout
          className="relative"
          layout={filteredLayout}
          cols={4}
          rowHeight={110}
          width={width}
          margin={[10, 10]}
          isDraggable={editing}
          isResizable={editing}
          onLayoutChange={onLayoutChange}
          useCSSTransforms={true}
          compactType="vertical"
          draggableHandle=".widget-drag-handle"
        >
          {activeIds.map((id) => {
            const def = ALL_WIDGETS.find((w) => w.id === id);
            if (!def) return null;
            const Widget = def.component;
            return (
              <div 
                key={id} 
                className="relative outline-none" 
                tabIndex={editing ? -1 : 0} 
                data-focusable={!editing}
              >
                {editing && (
                  <>
                    <div className="widget-drag-handle absolute inset-0 z-10 cursor-grab active:cursor-grabbing rounded-2xl border-2 border-dashed border-accent/40 bg-accent/[0.03]" />
                    <button
                      onClick={() => removeWidget(id)}
                      className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-red text-white text-xs font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    >
                      ×
                    </button>
                  </>
                )}
                <Widget />
              </div>
            );
          })}
        </GridLayout>
      )}

      {/* Picker */}
      {pickerOpen && (
        <WidgetPicker
          availableWidgets={removedWidgets.map((w) => ({ id: w.id, label: w.label, icon: w.icon }))}
          onAdd={addWidget}
          onClose={() => setPickerOpen(false)}
        />
      )}
    </div>
  );
}
