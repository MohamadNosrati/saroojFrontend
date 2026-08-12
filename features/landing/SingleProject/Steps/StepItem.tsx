

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "use-intl";

import { uploadUrl } from "@/lib/tools/upload";
import { IStep } from "@/lib/types/project";

interface IProps {
  item: IStep;
  index: number;
  activeIndex: number;
}

export default function LandingStepItem({ item, index, activeIndex }: IProps) {
  const t = useTranslations("SingleProject.steps");

  const isActive = activeIndex === index;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.55,
        y: 0,
        scale: isActive ? 1 : 0.92,
      }}
      className="relative w-full"
      initial={{ opacity: 0, y: 25 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Active Border / Glow */}
      <div
        className={clsx(
          "absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-primary via-primary/40 to-transparent transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={clsx(
          "relative overflow-hidden rounded-[25px] border bg-neutral-950 transition-all duration-500",
          isActive
            ? "border-primary/40 shadow-2xl shadow-primary/20"
            : "border-white/10",
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.div
            animate={{ scale: isActive ? 1 : 1.04 }}
            className="absolute inset-0"
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              fill
              alt={item?.alt || `Project Step ${index + 1}`}
              className="object-cover"
              priority={index < 2}
              sizes="(max-width: 540px) 85vw, (max-width: 768px) 55vw, (max-width: 1200px) 40vw, 33vw"
              src={uploadUrl(item?.pictureId?.image)}
            />
          </motion.div>

          {/* Image Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />

          {/* Top Information */}
          <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
            {/* Step Number */}
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 backdrop-blur-md">
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">
                {t("title")}
              </span>

              <span className="text-xs font-black text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Before After */}
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 backdrop-blur-md">
              <span className="text-[9px] font-bold text-white/50">{t("SingleProject.steps.item.before")}</span>

              <span className="text-xs font-bold text-primary">→</span>

              <span className="text-[9px] font-bold text-white">{t("SingleProject.steps.item.after")}</span>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <motion.p
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    x: isActive ? 0 : -6,
                  }}
                  className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-primary sm:text-[10px]"
                  transition={{ duration: 0.35 }}
                >
                  {t("sectionTitle")} {index + 1}
                </motion.p>

                <h3 className="truncate text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
                  {item?.name}
                </h3>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0.5 }}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md"
                transition={{ duration: 0.35 }}
              >
                <span className="text-lg">↗</span>
              </motion.div>
            </div>
          </div>

          {/* Active Indicator */}
          <motion.div
            animate={{ scaleX: isActive ? 1 : 0 }}
            className="absolute bottom-0 left-0 h-1 w-full origin-left bg-primary"
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
