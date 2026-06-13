"use client";

import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@heroui/button";
import { useRef, useState } from "react";

import type { Swiper as SwiperType } from "swiper/types";

import { Autoplay } from "swiper/modules";
import Link from "next/link";

import cn from "@/lib/tools/cn";
import { ISlider } from "@/lib/types/slider";
import { uploadUrl } from "@/lib/tools/upload";

interface IProps {
  data: ISlider[];
}

const SwiperContainer: React.FC<IProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <Swiper
        loop
        autoplay={{
          delay: 2500,
        }}
        className="!w-full bg-black h-screen"
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
        {data?.map((item) => (
          <SwiperSlide key={item?.id} className="!relative hfu">
            <Image fill alt="" src={uploadUrl(item?.pictureId?.image)} />
            <Link
              className="absolute left-0 gap-3 h-fit top-0 bottom-0 my-auto w-full flex flex-col items-center"
              href={item?.link}
            >
              <h1 className="text-3xl leading-11 text-white font-semibold">
                {item?.title}
              </h1>
              <p className="text-sm text-gray-lighter w-1/2 text-center">
                {item?.description}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full absolute z-10 gap-11 flex justify-center left-0 bottom-11">
        {data?.map((item, index) => (
          <Button
            key={item?.id + index}
            className={cn(
              "min-h-0 min-w-0 border-2 border-white  h-3 w-3 rounded-full bg-transparent p-0",
              {
                "bg-white border-transparent": index === activeIndex,
              },
            )}
            onPress={() => swiperRef.current?.slideTo(index)}
          />
        ))}
      </div>
    </>
  );
};

export default SwiperContainer;
