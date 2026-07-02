"use client";

import { Chip } from "@heroui/chip";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { Swiper as SwiperType } from "swiper/types";

import { IStep } from "@/lib/types/project";
import { DescriptionIcon } from "@/components/icons";
import { yekanBakh } from "@/lib/config/fonts";
import { CustomWhen } from "@/components/ui/CustomWhen";

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
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{
            y: 0,
            opacity: 1,
          }}
          className={clsx(
            "fixed w-full left-0 z-[1000000] font-yekan sm:py-6 py-4",
            "bottom-0 rounded-t-3xl border-t border-primary/20 bg-white dark:bg-dark shadow-[0_-10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.5)]",
          )}
          dir="rtl"
          exit={{
            y: "100%",
            opacity: 0,
          }}
          initial={{
            y: "100%",
            opacity: 0,
          }}
          style={
            {
              "--font-yekan": yekanBakh.style.fontFamily,
            } as React.CSSProperties
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="container px-4 max-w-6xl">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between w-full items-center">
                <span className="sm:text-2xl text-lg font-bold text-primary">
                  {steps[activeIndex]?.name}
                </span>

                {steps[activeIndex]?.isActive ? (
                  <Chip className="text-white font-bold" color="success">
                    فعال
                  </Chip>
                ) : (
                  <Chip className="text-white font-bold" color="warning">
                    غیر فعال
                  </Chip>
                )}
              </div>
              <div className="grid grid-cols-12 lg:gap-8 gap-4 sm:mt-2">
                <div
                  className={clsx(
                    "flex gap-2 ",
                    steps[activeIndex]?.video
                      ? "lg:col-span-8 sm:col-span-6 col-span-full"
                      : "col-span-full",
                  )}
                >
                  <DescriptionIcon className="sm:size-5 min-w-fit text-primary size-4" />
                  <p className="text-xs sm:text-sm font-bold text-justify text-neutral-800 dark:text-neutral-200">
                    {steps[activeIndex]?.description}
                  </p>
                </div>
                <CustomWhen condition={Boolean(steps[activeIndex]?.video)}>
                  <div className="lg:col-span-4 sm:col-span-6 col-span-full">
                    <Video video={steps[activeIndex]?.video as string} />
                  </div>
                </CustomWhen>
              </div>
              <div className="flex items-center gap-1 sm:mt-4">
                <Button
                  className="font-bold"
                  color="primary"
                  isDisabled={activeIndex === steps?.length - 1}
                  size="sm"
                  onPress={() => swiperRef.current?.slideTo(activeIndex + 1)}
                >
                  مرحله بعد
                </Button>

                <Button
                  className="font-bold"
                  color="primary"
                  isDisabled={activeIndex === 0}
                  size="sm"
                  onPress={() => swiperRef.current?.slideTo(activeIndex - 1)}
                >
                  مرحله قبل
                </Button>

                <Button
                  className="font-bold"
                  color="danger"
                  size="sm"
                  onPress={() => setIsOpen(false)}
                >
                  بستن
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
