"use client";

import dynamic from "next/dynamic";
import TabRow from "@/components/TabRow";
import WelcomeRow from "@/components/WelcomeRow";

const WidgetGrid = dynamic(() => import("@/components/WidgetGrid"), { ssr: false });

export default function Home() {
  return (
    <>
      <WidgetGrid />
      <TabRow />
      <WelcomeRow />
    </>
  );
}
