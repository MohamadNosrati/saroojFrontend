"use client";
import React from "react";

import LogoutButton from "@/features/dashboard/layout/Logout";
import SideBar from "@/features/dashboard/layout/SideBar";
import User from "@/features/dashboard/layout/User";
import { yekanBakh } from "@/lib/config/fonts";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="bg-slate-950 text-slate-100 p-6 h-screen flex flex-col w-full gap-5 !font-yekan antialiased select-none selection:bg-primary/30"
      dir="rtl"
      style={
        { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
      }
    >
      {/* Top Header Card */}
      <header className="px-8 h-24 bg-slate-900/40 border border-slate-800 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-lg shadow-black/20 transition-all duration-300">
        <div className="flex items-center gap-4 hover:scale-[1.01] transition-transform duration-200">
          <User />
        </div>
        <div className="flex items-center gap-3">
          <LogoutButton />
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex gap-5 grow overflow-hidden relative">
        {/* Sidebar Container */}
        <aside className="w-64 shrink-0 flex-col bg-slate-900/20 rounded-2xl border border-slate-900/50 overflow-y-auto hidden md:flex">
          <SideBar />
        </aside>

        {/* Main Content Area */}
        <section className="z-10 grow flex flex-col bg-gradient-to-b from-slate-900/60 to-slate-900/20 border border-slate-800 rounded-2xl overflow-y-auto overflow-x-hidden scroll-smooth shadow-inner shadow-white/[0.02] custom-scrollbar">
          <div className="p-6 h-full w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}
