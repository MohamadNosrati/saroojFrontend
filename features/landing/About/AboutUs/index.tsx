// "use client";

import Image from "next/image";

// import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import StaticImage from "@/public/images/serviceImage.png";

const AboutUs = () => {
  const t = useTranslations("About.sarooj");

  return (
    <section className="relative bg-gray-darker py-16 sm:py-24 overflow-hidden border-b border-white/[0.03]">
      {/* INDUSTRIAL STRUCTURAL ACCENT LINE */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />

      <div className="container relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 px-4">
        {/* LEFT COLUMN: THE ARCHITECTURAL CANVAS FRAME */}
        <div className="relative w-full max-w-sm md:max-w-none md:w-[35%] lg:w-[30%] shrink-0 group">
          {/* Subtle warm industrial ambient glow backplate */}
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl transition-opacity duration-700 group-hover:opacity-75 pointer-events-none" />

          {/* Sharp asymmetric geometric border mask */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-gray-dark/40 backdrop-blur-sm">
            <div className="aspect-square relative overflow-hidden">
              <Image
                fill
                priority
                alt="شرکت مهندسی معماری ساروج"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                sizes="(max-w-7xl) 30vw, 100vw"
                src={StaticImage}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BRAND NARRATIVE TEXT PLATFORM */}
        <div className="flex flex-col gap-5 md:gap-7 w-full md:w-[65%] lg:w-[70%] select-none">
          {/* MAIN PAGE HEADLINE */}
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-black tracking-tight max-md:text-center leading-tight">
            {t("title")}
            <span className="text-primary mr-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 mx-2 after:w-full after:h-[2px] after:bg-primary/20">
              {t("secondTitle")}
            </span>
          </h1>

          {/* PARAGRAPH DESCRIPTIONS BLOCK */}
          <p className="text-gray-200/90 text-justify md:text-lg font-medium leading-9 max-w-4xl text-sm tracking-wide">
            {t("description")}
          </p>

          {/* STRUCTURAL SEGMENT BAR ACCENT */}
          <div className="flex items-center gap-3 mt-2 max-md:justify-center">
            <span className="w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
            <span className="w-2 h-[3px] bg-white/20 rounded-full" />
            <span className="w-2 h-[3px] bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
