"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import StaticImage from "@/public/images/carouselStatic.png";
import { Button } from "@heroui/button";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper/types";
import cn from "@/lib/tools/cn";

const SwiperContainer = () => {
  const [acitveIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <>
      <Swiper
        spaceBetween={5}
        slidesPerView={1}
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
        className="!w-full  !h-screen"
      >
        {[1, 2, 3]?.map((item) => (
          <SwiperSlide className="!relative" key={item}>
            <Image src={StaticImage} alt="" fill />
            <div className="absolute left-0 gap-3 h-fit top-0 bottom-0 my-auto w-full flex flex-col items-center">
              <h1 className="text-3xl leading-11 text-white font-semibold">
                Hello this is a sentence for welcome
              </h1>
              <p className="text-sm text-gray-lighter w-1/2 text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam animi quae quidem beatae vel labore natus, sapiente
                soluta, assumenda temporibus sunt cum tenetur nulla libero nemo!
                Numquam quasi ipsam laborum.
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full absolute z-10 gap-11 flex justify-center left-0 bottom-11">
        {[1, 2, 3]?.map((item, index) => (
          <Button
            onPress={() => swiperRef.current?.slideTo(index)}
            key={item}
            className={cn(
              "min-h-0 min-w-0 border-2 border-white  h-3 w-3 rounded-full bg-transparent p-0",
              {
                "bg-white border-transparent": index === acitveIndex,
              }
            )}
          ></Button>
        ))}
      </div>
    </>
  );
};

export default SwiperContainer;
