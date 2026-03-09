"use client";

import Sidebar from "@/components/Sidebar";
import TopStrip from "@/components/TopStrip";
import HUD from "@/components/HUD";
import useKeyboardNav from "@/hooks/useKeyboardNav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useKeyboardNav();

  return (
    <div className="flex w-screen h-screen overflow-hidden text-slate-100 selection:bg-accent/30 selection:text-white">
      {/* Dynamic Background Noise overlay for premium feel */}
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
      
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative backdrop-blur-3xl">
        <TopStrip />
        <div className="flex-1 overflow-y-auto px-[32px] py-[24px] flex flex-col gap-6 scrollbar-none z-10 transition-opacity duration-300">
          {children}
        </div>
        <HUD />
      </div>
    </div>
  );
}
