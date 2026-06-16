"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@heroui/button";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

import type { Swiper as SwiperType } from "swiper/types";

import { Autoplay } from "swiper/modules";
import Link from "next/link";

import { ISlider } from "@/lib/types/slider";
import { uploadUrl } from "@/lib/tools/upload";

interface IProps {
  data: ISlider[];
}

const SwiperContainer: React.FC<IProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="relative"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Swiper
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="!w-full bg-black h-[calc(100vh-80px)]"
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={item?.id} className="!relative overflow-hidden">
            {/* IMAGE ZOOM LAYER */}
            <motion.div
              animate={{ scale: 1 }}
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <Image
                fill
                alt={item?.alt || ""}
                src={uploadUrl(item?.pictureId?.image)}
                // className="object-cover"
              />
            </motion.div>

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-[#0E0E0E]/60" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-4/5 flex flex-col items-center text-center">
                {/* TITLE */}
                <motion.h1
                  key={`title-${index}`}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    y: index === activeIndex ? 0 : 30,
                  }}
                  className="text-3xl leading-11 text-white font-semibold"
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6 }}
                >
                  {item?.title}
                </motion.h1>

                {/* DESCRIPTION */}
                <motion.p
                  key={`desc-${index}`}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    y: index === activeIndex ? 0 : 20,
                  }}
                  className="max-sm:text-sm text-gray-lighter mt-3"
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  {item?.description}
                </motion.p>

                {/* BUTTON */}
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
                  <Link href={item?.link}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className="font-bold text-lg"
                        color="primary"
                        variant="ghost"
                      >
                        مشاهده جزییات
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* DOT NAVIGATION */}
      <div className="w-full absolute z-10 gap-11 flex justify-center left-0 bottom-11">
        {data?.map((item, index) => (
          <motion.button
            key={item?.id + index}
            animate={{
              scale: index === activeIndex ? 1.3 : 1,
              backgroundColor:
                index === activeIndex ? "#ffffff" : "transparent",
            }}
            className="h-3 w-3 rounded-full border-2 border-white"
            transition={{ duration: 0.3 }}
            onClick={() => swiperRef.current?.slideTo(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SwiperContainer;
