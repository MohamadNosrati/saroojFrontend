import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

import { uploadUrl } from "@/lib/tools/upload";
import { IStep } from "@/lib/types/project";

interface IProps {
  item: IStep;
  index: number;
  activeIndex: number;
}

export default function LandingStepItem({ item, index, activeIndex }: IProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-xl relative overflow-hidden  w-full"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div
        className={clsx(
          "relative w-full aspect-square overflow-hidden border border-black/5 dark:border-white/5 transition-all duration-500",
          activeIndex === index ? "grayscale-0" : "grayscale-100",
        )}
      >
        <motion.div
          className="absolute inset-0 z-0"
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            fill
            alt={item?.alt || `Project Step ${index + 1}`}
            className="object-cover w-full h-full"
            priority={index < 2} // Optimizes loading for the first couple of visible steps
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={uploadUrl(item?.pictureId?.image)}
          />
        </motion.div>
        <div className="absolute inset-0 z-20 flex flex-col justify-end py-6 px-6 text-right select-none">
          <div className="flex flex-col gap-1.5">
            {/* Step Counter Tag */}
            <span className="text-xs sm:text-sm font-bold text-primary/90 uppercase tracking-widest drop-shadow-sm">
              مرحله {index + 1}
            </span>

            {/* Step Title */}
            <span className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-wide leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              {item?.name}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
