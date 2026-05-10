"use client";
import SideBar from "@/features/dashboard/layout/SideBar";
import { yekanBakh } from "@/lib/config/fonts";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      style={{ '--font-yekan': yekanBakh.style.fontFamily } as React.CSSProperties}
      dir="rtl" className="bg-gray-darker p-6 min-h-screen font-yekan flex flex-col  w-full gap-4 ">
      <div className="p-6 border-primary border-2 rounded-2xl">

      </div>
      <div className="flex gap-4 grow">
        <SideBar />
        <div
          className="z-1 grow flex-col border-2 border-primary rounded-2xl justify-start overflow-y-auto overflow-x-hidden scroll-smooth p-6"
        >
          {children}
        </div>
      </div>
    </main>
  );
}
