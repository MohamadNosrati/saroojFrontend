"use client";
import LogoutButton from "@/features/dashboard/layout/Logout";
import SideBar from "@/features/dashboard/layout/SideBar";
import User from "@/features/dashboard/layout/User";
import { yekanBakh } from "@/lib/config/fonts";
import React from "react";



export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      style={
        { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
      }
      dir="rtl"
      className="bg-gray-darker p-6 h-screen flex !font-yekan flex-col  w-full gap-4 "
    >
      <div className="p-6 border-primary h-32 border-2 rounded-2xl flex justify-between items-center">
        <User/>
        <LogoutButton/>
      </div>
      <div className="flex gap-4 grow overflow-auto relative">
        <SideBar />
        <div className="z-1 grow flex-col border-2 border-primary rounded-2xl justify-start overflow-y-auto overflow-x-hidden scroll-smooth">
          {children}
        </div>
      </div>
    </main>
  );
}
