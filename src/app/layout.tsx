import type { Metadata } from "next";
import { Fredoka, DM_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

import ClientLayout from "@/components/ClientLayout";
import BootSequence from "@/components/BootSequence";

export const metadata: Metadata = {
  title: "Studium",
  description: "Gamified study dashboard — level up your learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${dmSans.variable} antialiased`}>
        <BootSequence />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
