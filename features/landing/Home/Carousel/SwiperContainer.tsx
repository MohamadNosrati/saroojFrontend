"use client";

import "swiper/css";
import type { Swiper as SwiperType } from "swiper/types";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Autoplay } from "swiper/modules";

import CarouselItem from "./CarouselItem";

import { ISlider } from "@/lib/types/slider";

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
            <CarouselItem
              key={item?.id}
              activeIndex={activeIndex}
              index={index}
              item={item}
            />
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
