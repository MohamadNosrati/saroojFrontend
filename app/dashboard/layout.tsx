"use client";
import SideBar from "@/features/dashboard/layout/SideBar";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main dir="rtl" className="h-screen w-full gap-4 p-8 bg-component-base-2 grid grid-cols-5 ">
        <div className="relative z-2  lg:pr-5 rounded-2xl h-full">
          <SideBar />
        </div>
        <div
          id="mainContainer"
          className="z-1 col-span-4 flex-col min-h-full justify-start overflow-y-auto overflow-x-hidden scroll-smooth"
        >
          {children}
        </div>
      </main>
    </>
  );
}
