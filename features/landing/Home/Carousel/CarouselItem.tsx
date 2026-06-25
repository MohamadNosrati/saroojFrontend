import Image from "next/image";
import "swiper/css";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Link from "next/link";

import { uploadUrl } from "@/lib/tools/upload";
import { ISlider } from "@/lib/types/slider";
import { CustomWhen } from "@/components/ui/CustomWhen";

export default function CarouselItem({
  item,
  index,
  activeIndex,
}: {
  item: ISlider;
  index: number;
  activeIndex: number;
}) {
  return (
    <>
      <motion.div
        animate={{ scale: 1 }}
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <Image
          fill
          alt={item?.alt || ""}
          className="object-cover" // Un-commented for proper scaling
          src={uploadUrl(item?.pictureId?.image)}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#0e0e0e]/70 to-[#09090b]/80" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="max-w-xl flex flex-col items-center text-center">
          <motion.div
            key={`title-container-${index}`}
            className="flex flex-col items-center gap-3"
          >
            <motion.h1
              key={`title-${index}`}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                y: index === activeIndex ? 0 : 30,
              }}
              className="text-2xl sm:text-5xl tracking-wide text-white font-extrabold drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
            >
              {item?.title}
            </motion.h1>
            <motion.span
              animate={{ width: index === activeIndex ? "80px" : "0px" }}
              className="h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full shadow-[0_0_8px_var(--tw-shadow-color)] shadow-primary/50"
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          <motion.p
            key={`desc-${index}`}
            animate={{
              opacity: index === activeIndex ? 1 : 0,
              y: index === activeIndex ? 0 : 20,
            }}
            className="max-sm:text-sm text-gray-200/90 font-medium mt-5 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {item?.description}
          </motion.p>
          <CustomWhen condition={Boolean(item?.link)}>
            <motion.div
              key={`btn-${index}`}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                scale: index === activeIndex ? 1 : 0.9,
              }}
              className="mt-10"
              initial={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href={item?.link || ""}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Glassmorphism primary ghost button */}
                  <Button
                    className="font-bold text-base px-8 py-6 rounded-xl border-2 backdrop-blur-md bg-primary/5 hover:bg-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all duration-300"
                    color="primary"
                    variant="ghost"
                  >
                    مشاهده جزییات
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </CustomWhen>
        </div>
      </div>
    </>
  );
}
