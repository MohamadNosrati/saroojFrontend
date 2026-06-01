import "@/public/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { siteConfig } from "@/lib/config/site";
import Providers from "@/lib/providers";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body className={clsx("antialiased min-h-screen")}>
        <NextTopLoader
          color="#ae8649"
          height={3} // Height in pixels
          showSpinner={false}
          zIndex={1000000}
        />
        <Providers>{children}</Providers>
        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}
