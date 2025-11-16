"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper/types";
import cn from "@/lib/tools/cn";
import CommentItem from "./CommentItem";

const Container = () => {
  const [acitveIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay: 2500,
        }}
        loop
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {[1, 2, 3, 4, 5]?.map((item) => (
          <SwiperSlide className="!pt-12 " key={item}>
            <CommentItem />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Container;
