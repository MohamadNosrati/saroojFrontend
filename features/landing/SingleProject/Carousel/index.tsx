"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useRef, useState } from "react";
import Image from "next/image";

import type { Swiper as SwiperType } from "swiper/types";

import { Button } from "@heroui/button";
import clsx from "clsx";

import BeforeAfterItem from "./BeforeAfterItem";

import cn from "@/lib/tools/cn";
import { ArrowIcon } from "@/components/icons";
import { ImageItem } from "@/lib/types/project";
import { uploadUrl } from "@/lib/tools/upload";

interface IProps {
  images: ImageItem[];
}

const Carousel: React.FC<IProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div>
      <Swiper
        allowTouchMove={false}
        autoHeight={true}
        className="sm:mb-5 aspect-video mb-3"
        modules={[Thumbs]}
        slidesPerView={1}
        spaceBetween={20}
        thumbs={{ swiper: thumbsSwiper }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images?.map((item) => (
          <SwiperSlide key={item?.id}>
            <BeforeAfterItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative">
        <Button
          className={cn(
            "sm:size-8 size-6 min-w-0 p-0 z-10 rounded-none bg-primary absolute top-0 bottom-0 my-auto right-0",
          )}
          isDisabled={activeIndex === 4}
          onPress={() => swiperRef.current?.slideNext()}
        >
          <span>
            <ArrowIcon
              className="text-[0E0E0E] max-sm:w-2 max-sm:h-3 "
              height={20}
              width={12}
            />
          </span>
        </Button>
        <Button
          className={cn(
            "sm:size-8 size-6 min-w-0 p-0 z-10 rounded-none bg-primary absolute top-0 bottom-0 my-auto left-0",
          )}
          isDisabled={activeIndex === 0}
          onPress={() => swiperRef.current?.slidePrev()}
        >
          <span>
            <ArrowIcon
              className="text-[0E0E0E] max-sm:w-2 max-sm:h-3 rotate-180"
              height={20}
              width={12}
            />
          </span>
        </Button>
        <Swiper
          autoplay={{
            delay: 2500,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            1020: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.4,
              spaceBetween: 16,
            },
            540: {
              slidesPerView: 1.6,
              spaceBetween: 12,
            },
            320: {
              slidesPerView: 2.2,
              spaceBetween: 8,
            },
          }}
          className="mySwiper"
          freeMode={true}
          modules={[Thumbs]}
          spaceBetween={20}
          watchSlidesProgress={true}
          onSwiper={setThumbsSwiper}
        >
          {images?.map((item, index) => (
            <SwiperSlide
              key={item?.id}
              className="aspect-video relative sm:border-5 border-2 overflow-hidden border-white"
            >
              <Image
                fill
                alt=""
                className={clsx([
                  "size-full absolute bg-cover",
                  activeIndex === index ? "grayscale" : "",
                ])}
                src={uploadUrl(item?.before?.pictureId?.image)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
