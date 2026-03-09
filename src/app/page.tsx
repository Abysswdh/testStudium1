"use client";

import dynamic from "next/dynamic";
import WelcomeRow from "@/components/WelcomeRow";

const WidgetGrid = dynamic(() => import("@/components/WidgetGrid"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500">
      <WelcomeRow />
      <WidgetGrid />
    </div>
  );
}
