// "use client";

// import { Chip } from "@heroui/chip";
// import { createPortal } from "react-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import clsx from "clsx";
// import { Button } from "@heroui/button";
// import { Swiper as SwiperType } from "swiper/types";
// import { useLocale } from "next-intl";

// import { IStep } from "@/lib/types/project";
// import { DescriptionIcon } from "@/components/icons";
// import { yekanBakh } from "@/lib/config/fonts";
// import { CustomWhen } from "@/components/ui/CustomWhen";
// import { dirSelector } from "@/lib/tools/dataSelectors";
// import { LocaleEnum } from "@/lib/types/base";

// import Video from "../Video";

// interface IProps {
//   steps: IStep[];
//   activeIndex: number;
//   setIsOpen: (open: boolean) => void;
//   swiperRef: React.MutableRefObject<SwiperType | null>;
//   isOpen: boolean;
// }

// export default function StepsDetails({
//   steps,
//   activeIndex,
//   setIsOpen,
//   swiperRef,
//   isOpen,
// }: IProps) {
//   const locale = useLocale();
//   const dir = dirSelector(locale as LocaleEnum);

//   return createPortal(
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           animate={{
//             y: 0,
//             opacity: 1,
//           }}
//           className={clsx(
//             "fixed w-full left-0 z-[1000000] font-yekan sm:py-6 py-4",
//             "bottom-0 rounded-t-3xl border-t border-primary/20 bg-white dark:bg-dark shadow-[0_-10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)]",
//           )}
//           dir={dir}
//           exit={{
//             y: "100%",
//             opacity: 0,
//           }}
//           initial={{
//             y: "100%",
//             opacity: 0,
//           }}
//           style={
//             {
//               "--font-yekan": yekanBakh.style.fontFamily,
//             } as React.CSSProperties
//           }
//           transition={{
//             type: "spring",
//             stiffness: 300,
//             damping: 30,
//           }}
//         >
//           <div className="container px-4 max-w-6xl">
//             <div className="flex flex-col gap-4">
//               <div className="flex justify-between w-full items-center">
//                 <span className="sm:text-2xl text-lg font-bold text-primary">
//                   {steps[activeIndex]?.name}
//                 </span>

//                 {steps[activeIndex]?.isActive ? (
//                   <Chip className="text-white font-bold" color="success">
//                     فعال
//                   </Chip>
//                 ) : (
//                   <Chip className="text-white font-bold" color="warning">
//                     غیر فعال
//                   </Chip>
//                 )}
//               </div>
//               <div className="grid grid-cols-12 lg:gap-8 gap-4 sm:mt-2">
//                 <div
//                   className={clsx(
//                     "flex gap-2 ",
//                     steps[activeIndex]?.video
//                       ? "lg:col-span-8 sm:col-span-6 col-span-full"
//                       : "col-span-full",
//                   )}
//                 >
//                   <DescriptionIcon className="sm:size-5 min-w-fit text-primary size-4" />
//                   <p className="text-xs sm:text-sm font-bold text-justify text-neutral-800 dark:text-neutral-200">
//                     {steps[activeIndex]?.description}
//                   </p>
//                 </div>
//                 <CustomWhen condition={Boolean(steps[activeIndex]?.video)}>
//                   <div className="lg:col-span-4 sm:col-span-6 col-span-full">
//                     <Video video={steps[activeIndex]?.video as string} />
//                   </div>
//                 </CustomWhen>
//               </div>
//               <div className="flex items-center gap-1 sm:mt-4">
//                 <Button
//                   className="font-bold"
//                   color="primary"
//                   isDisabled={activeIndex === steps?.length - 1}
//                   size="sm"
//                   onPress={() => swiperRef.current?.slideTo(activeIndex + 1)}
//                 >
//                   مرحله بعد
//                 </Button>

//                 <Button
//                   className="font-bold"
//                   color="primary"
//                   isDisabled={activeIndex === 0}
//                   size="sm"
//                   onPress={() => swiperRef.current?.slideTo(activeIndex - 1)}
//                 >
//                   مرحله قبل
//                 </Button>

//                 <Button
//                   className="font-bold"
//                   color="danger"
//                   size="sm"
//                   onPress={() => setIsOpen(false)}
//                 >
//                   بستن
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>,
//     document.body,
//   );
// }

"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { useLocale, useTranslations } from "next-intl";
import { Swiper as SwiperType } from "swiper/types";

import { DescriptionIcon } from "@/components/icons";
import { CustomWhen } from "@/components/ui/CustomWhen";
import { dirSelector } from "@/lib/tools/dataSelectors";
import { LocaleEnum } from "@/lib/types/base";
import { IStep } from "@/lib/types/project";

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

  const dir = dirSelector(locale as LocaleEnum);
  const activeStep = steps[activeIndex];

  if (typeof document === "undefined") {
    return null;
  }

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
            onClick={() => setIsOpen(false)}
          />

          {/* Bottom Sheet */}
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className="fixed inset-x-0 bottom-0 z-[999999] max-h-[90vh] overflow-y-auto rounded-t-[32px] border-t border-black/5 bg-white/95 shadow-[0_-20px_80px_rgba(0,0,0,0.2)] backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-950/95"
            dir={dir}
            exit={{ y: "100%", opacity: 0 }}
            initial={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <div className="mx-auto w-full max-w-6xl px-4 pb-6 pt-3 sm:px-6 sm:pb-8 sm:pt-4">
              {/* Handle */}
              <div className="mb-5 flex justify-center">
                <div className="h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>

              {/* Header */}
              <div className="mb-6 flex items-start justify-between gap-4">
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
                  onPress={() => setIsOpen(false)}
                >
                  <span className="text-lg">×</span>
                </Button>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Description */}
                <div
                  className={clsx(
                    "flex flex-col justify-center",
                    activeStep?.video ? "lg:col-span-7" : "lg:col-span-12",
                  )}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <DescriptionIcon className="size-5" />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400">
                        {t("details.title")}
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
                        {t("details.active")}
                      </Chip>
                    ) : (
                      <Chip
                        className="font-bold text-white"
                        color="warning"
                        size="sm"
                      >
                        {t("details.deActive")}
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
                    <span className="hidden sm:inline">{t("details.before")}</span>
                  </Button>

                  {/* Progress */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                      {t("details.progress")}
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
                    <span className="hidden sm:inline">{t("details.after")}</span>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
