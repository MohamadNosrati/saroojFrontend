"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useRef, useState } from "react";
import Image from "next/image";
import ProjectImage from "@/public/images/projectImage.png";
import type { Swiper as SwiperType } from "swiper/types";
import cn from "@/lib/tools/cn";
import { Button } from "@heroui/button";
import { ArrowIcon } from "@/components/icons";

const Carousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <section className="pt-12 bg-black container">
      <>
        <div className="relative">
          <Button
            isDisabled={activeIndex === 4}
            onPress={() => swiperRef.current?.slideNext()}
            className={cn(
              "w-12 h-12 min-w-0 p-0 z-10 rounded-none bg-primary absolute top-0 bottom-0 my-auto right-0",
              {
                "bg-red-400": activeIndex === 4,
              }
            )}
          >
            <span>
              <ArrowIcon width={14} height={26} className="text-[0E0E0E]" />
            </span>
          </Button>
          <Button
            isDisabled={activeIndex === 0}
            onPress={() => swiperRef.current?.slidePrev()}
            className={cn(
              "w-12 h-12 min-w-0 p-0 z-10 rounded-none bg-primary absolute top-0 bottom-0 my-auto left-0",
              {
                "bg-red-300": activeIndex === 0,
              }
            )}
          >
            <span>
              <ArrowIcon
                width={14}
                height={26}
                className="text-[0E0E0E] rotate-180"
              />
            </span>
          </Button>
          <Swiper
            allowTouchMove={false}
            spaceBetween={20}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Thumbs]}
            className="!w-full !h-96"
          >
            {[1, 2, 3, 4, 5]?.map((item) => (
              <SwiperSlide key={item} className="!relative">
                <Image
                  src={ProjectImage}
                  fill
                  alt=""
                  className="object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-5">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={20}
            slidesPerView={"auto"}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="mySwiper"
          >
            {[1, 2, 3, 4, 5]?.map((item) => (
              <SwiperSlide key={item} className="!h-52 !w-96">
                <Image
                  src={ProjectImage}
                  fill
                  alt=""
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </>
    </section>
  );
};

export default Carousel;
