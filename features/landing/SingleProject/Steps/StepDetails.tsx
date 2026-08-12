"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Swiper as SwiperType } from "swiper/types";

import { DescriptionIcon } from "@/components/icons";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { dirSelector } from "@/lib/tools/dataSelectors";
import { LocaleEnum } from "@/lib/types/base";
import { IStep } from "@/lib/types/project";
import { yekanBakh } from "@/lib/config/fonts";

import Video from "../Video";

interface IProps {
  steps: IStep[];
  activeIndex: number;
  setIsOpen: (open: boolean) => void;
  swiperRef: React.MutableRefObject<SwiperType | null>;
  isOpen: boolean;
}

export default function StepsDetails({
  steps,
  activeIndex,
  setIsOpen,
  swiperRef,
  isOpen,
}: IProps) {
  const locale = useLocale();

  const t = useTranslations("SingleProject.steps");
  const td = useTranslations("SingleProject.steps.details");

  const dir = dirSelector(locale as LocaleEnum);
  const activeStep = steps[activeIndex];

  const sheetRef = useRef<HTMLDivElement>(null);

  const [maxDragUp, setMaxDragUp] = useState(0);

  const handleClose = () => {
    setIsOpen(false);
  };

  const goPrevious = () => {
    if (activeIndex > 0) {
      swiperRef.current?.slideTo(activeIndex - 1);
    }
  };

  const goNext = () => {
    if (activeIndex < steps.length - 1) {
      swiperRef.current?.slideTo(activeIndex + 1);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    const shouldClose = offset > 150 || velocity > 800;

    if (shouldClose) {
      handleClose();
    }
  };

  useEffect(() => {
    const calculateDragLimit = () => {
      if (!sheetRef.current) return;

      const height = sheetRef.current.getBoundingClientRect().height;

      setMaxDragUp(Math.max(0, height - window.innerHeight));
    };

    calculateDragLimit();

    window.addEventListener("resize", calculateDragLimit);

    return () => {
      window.removeEventListener("resize", calculateDragLimit);
    };
  }, [isOpen]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[999998] bg-black/40 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            ref={sheetRef}
            animate={{ y: 0, opacity: 1 }}
            className="fixed inset-x-0 bottom-0 z-[999999] max-h-[90vh] cursor-grab overflow-hidden rounded-t-[32px] border-t border-black/5 bg-white/95 font-yekan shadow-[0_-20px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-950/95"
            dir={dir}
            drag="y"
            dragConstraints={{
              top: -maxDragUp,
              bottom: 300,
            }}
            dragElastic={0.1}
            dragMomentum
            exit={{
              y: "100%",
              opacity: 0,
            }}
            initial={{
              y: "100%",
              opacity: 0,
            }}
            onDragEnd={handleDragEnd}
            style={
              {
                "--font-yekan": yekanBakh.style.fontFamily,
              } as React.CSSProperties
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 32,
            }}
          >
            <div className="mx-auto flex max-h-[90vh] w-full max-w-6xl flex-col px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-4">
              {/* Handle */}
              <div className="mb-5 flex shrink-0 justify-center">
                <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>

              {/* Header */}
              <div className="mb-6 flex shrink-0 items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                      {t("sectionTitle")}{" "}
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xs text-neutral-300 dark:text-neutral-700">
                      /
                    </span>

                    <span className="text-[10px] font-bold text-neutral-400">
                      {String(steps.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="truncate text-xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
                    {activeStep?.name}
                  </h2>
                </div>

                <Button
                  isIconOnly
                  aria-label="Close"
                  className="size-10 shrink-0 rounded-full bg-neutral-100 text-neutral-700 dark:bg-white/10 dark:text-white"
                  onPress={handleClose}
                >
                  <span className="text-lg">×</span>
                </Button>
              </div>

              {/* Content */}
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                  {/* Description */}
                  <div
                    className={clsx(
                      "flex flex-col justify-center",
                      activeStep?.video
                        ? "lg:col-span-7"
                        : "lg:col-span-12",
                    )}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <DescriptionIcon className="size-5" />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                          {t("title")}
                        </p>

                        <p className="text-sm font-bold text-neutral-900 dark:text-white">
                          {activeStep?.name}
                        </p>
                      </div>
                    </div>

                    <p className="text-justify text-sm font-medium leading-7 text-neutral-600 dark:text-neutral-300 sm:text-base sm:leading-8">
                      {activeStep?.description}
                    </p>

                    {/* Status */}
                    <div className="mt-5">
                      {activeStep?.isActive ? (
                        <Chip
                          className="font-bold text-white"
                          color="success"
                          size="sm"
                        >
                          {td("active")}
                        </Chip>
                      ) : (
                        <Chip
                          className="font-bold text-white"
                          color="warning"
                          size="sm"
                        >
                          {td("deActive")}
                        </Chip>
                      )}
                    </div>
                  </div>

                  {/* Video */}
                  <CustomWhen condition={Boolean(activeStep?.video)}>
                    <div className="lg:col-span-5">
                      <div className="overflow-hidden rounded-2xl border border-black/5 bg-neutral-100 shadow-sm dark:border-white/10 dark:bg-white/5">
                        <Video video={activeStep?.video as string} />
                      </div>
                    </div>
                  </CustomWhen>
                </div>

                {/* Navigation */}
                <div className="mt-7 border-t border-black/5 pt-5 dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    {/* Previous */}
                    <Button
                      className="h-11 rounded-full bg-neutral-100 px-5 font-bold text-neutral-800 dark:bg-white/10 dark:text-white"
                      isDisabled={activeIndex === 0}
                      onPress={goPrevious}
                    >
                      <span>←</span>

                      <span className="hidden sm:inline">
                        {td("before")}
                      </span>
                    </Button>

                    {/* Progress */}
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                        {td("progress")}
                      </span>

                      <div className="mt-1 flex items-center gap-1">
                        <span className="text-lg font-black text-primary">
                          {String(activeIndex + 1).padStart(2, "0")}
                        </span>

                        <span className="text-xs font-bold text-neutral-400">
                          / {String(steps.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Next */}
                    <Button
                      className="h-11 rounded-full bg-primary px-5 font-bold text-white shadow-lg shadow-primary/20"
                      isDisabled={activeIndex === steps.length - 1}
                      onPress={goNext}
                    >
                      <span className="hidden sm:inline">
                        {td("after")}
                      </span>

                      <span>→</span>
                    </Button>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-5 h-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                    <motion.div
                      animate={{
                        width: `${((activeIndex + 1) / steps.length) * 100}%`,
                      }}
                      className="h-full rounded-full bg-primary"
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}