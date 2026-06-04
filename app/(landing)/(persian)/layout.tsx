import Footer from "@/features/landing/layout/Footer";
import Header from "@/features/landing/layout/Header";
import { yekanBakh } from "@/lib/config/fonts";
import clsx from "clsx";
import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const PersianLyout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      style={
        { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
      }
      dir="rtl"
      className={clsx([
        "font-yekan",
        // yekanBakh.className,
        "flex flex-col justify-between min-h-screen",
      ])}
    >
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default PersianLyout;
