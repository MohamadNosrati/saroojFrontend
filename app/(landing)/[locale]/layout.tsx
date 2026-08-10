import clsx from "clsx";
import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Header from "@/features/landing/layout/Header";
import Footer from "@/features/landing/layout/Footer";
import { yekanBakh } from "@/lib/config/fonts";
import { LocaleEnum, LocaleParams } from "@/lib/types/base";
import { dirSelector } from "@/lib/tools/dataSelectors";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const PersianLyout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) => {
  const { locale } = await params;
  const isPersian = locale === "fa";
  const messages = await getMessages();
  const dir = dirSelector(locale as LocaleEnum);
  return (
    <NextIntlClientProvider messages={messages}>
      <main
        className={clsx([
          "flex flex-col justify-between min-h-screen",
          isPersian ? "font-yekan" : "font-inter",
        ])}
        dir={dir}
        style={
          { "--font-yekan": yekanBakh.style.fontFamily } as React.CSSProperties
        }
      >
        <Header />
        {children}
        <Footer />
      </main>
    </NextIntlClientProvider>
  );
};

export default PersianLyout;
