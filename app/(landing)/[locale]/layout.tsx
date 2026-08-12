import clsx from "clsx";
import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Header from "@/features/landing/layout/Header";
import Footer from "@/features/landing/layout/Footer";
import { inter, notoSansArabic, yekanBakh } from "@/lib/config/fonts";
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
  const messages = await getMessages();
  const dir = dirSelector(locale as LocaleEnum);
  const font =
    locale === "fa" ? yekanBakh : locale === "ar" ? notoSansArabic : inter;

  return (
    <NextIntlClientProvider messages={messages}>
      <main
        className={clsx(
          "flex min-h-screen flex-col justify-between",
          font.variable,
          font.className,
        )}
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
