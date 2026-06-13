import clsx from "clsx";
import { Viewport } from "next";

import Footer from "@/features/landing/layout/Footer";
import Header from "@/features/landing/layout/Header";
import { yekanBakh } from "@/lib/config/fonts";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const PersianLyout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className={clsx([
        "font-yekan",
        // yekanBakh.className,
        "flex flex-col justify-between min-h-screen",
      ])}
      dir="rtl"
      style={
        { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
      }
    >
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default PersianLyout;
