"use client";

import Sidebar from "@/components/Sidebar";
import TopStrip from "@/components/TopStrip";
import HUD from "@/components/HUD";
import useKeyboardNav from "@/hooks/useKeyboardNav";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useKeyboardNav();

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden bg-bg">
        <TopStrip />
        <div className="flex-1 overflow-y-auto px-[22px] py-[18px] flex flex-col gap-4 scrollbar-none">
          {children}
        </div>
        <HUD />
      </div>
    </div>
  );
}
