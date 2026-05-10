"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import ServiceImage from "@/public/images/serviceImage.png";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper/types";
import cn from "@/lib/tools/cn";
import { Button } from "@heroui/button";
import { ArrowIcon } from "@/components/icons";
import clsx from "clsx";
import BeforeAfterItem from "./BeforeAfterItem";

const Carousel = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
      <div>
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
          className="mb-5 border-5 border-primary"
          slidesPerView={1}
        >
          {[1, 2, 3, 4, 5]?.map((item) => (
            <SwiperSlide key={item}>
              <BeforeAfterItem/>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="relative">
          <Button
            isDisabled={activeIndex === 4}
            onPress={() => swiperRef.current?.slideNext()}
            className={cn(
              "size-8 min-w-0 p-0 z-10 rounded-none bg-primary absolute top-0 bottom-0 my-auto right-0",
            )}
          >
            <span>
              <ArrowIcon width={12}
                height={20} className="text-[0E0E0E]" />
            </span>
          </Button>
          <Button
            isDisabled={activeIndex === 0}
            onPress={() => swiperRef.current?.slidePrev()}
            className={cn(
              "size-8 min-w-0 p-0 z-10 rounded-none bg-primary absolute top-0 bottom-0 my-auto left-0",
            )}
          >
            <span>
              <ArrowIcon
                width={12}
                height={20}
                className="text-[0E0E0E] rotate-180"
              />
            </span>
          </Button>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={20}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            autoplay={{
              delay: 2500,
              pauseOnMouseEnter: true,
            }}
            className="mySwiper"
            breakpoints={{
              1020: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2.4,
                spaceBetween: 16
              },
              540: {
                slidesPerView: 1.6,
                spaceBetween: 12
              },
              320: {
                slidesPerView: 1.8,
                spaceBetween: 8,
              }
            }}
          >
            {[1, 2, 3, 4, 5]?.map((item,index) => (
              <SwiperSlide key={item} className="aspect-video relative border-5 overflow-hidden border-white">
                <Image
                  src={ServiceImage}
                  fill
                  alt=""
                  className={clsx([
                    "size-full absolute bg-cover",
                    activeIndex === index ? "grayscale" : ""
                  ])}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
  );
};

export default Carousel;
