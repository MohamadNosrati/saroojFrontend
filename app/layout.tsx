"use client";

import "../public/globals.css";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

import Providers from "@/lib/providers";

// import Providers from "@/lib/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="fa">
      <head />
      <body className={clsx("antialiased min-h-screen")}>
        <NextTopLoader
          color="#ae8649"
          height={3} // Height in pixels
          showSpinner={false}
          zIndex={1000000}
        />
        <Providers>{children}</Providers>
        <ToastContainer autoClose={3000} position="top-center" />
      </body>
    </html>
  );
}
