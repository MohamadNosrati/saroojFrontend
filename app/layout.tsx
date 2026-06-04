
import "@/public/globals.css";
import clsx from "clsx";

import Providers from "@/lib/providers";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";



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
