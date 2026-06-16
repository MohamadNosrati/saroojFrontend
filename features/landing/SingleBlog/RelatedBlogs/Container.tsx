"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import BlogItem from "../../Blog/List/BlogItem";
import { IBlog } from "@/lib/types/blog";

interface IProps {
  suggestions: IBlog[];
}

export default function RelatedBlogsContainer({ suggestions }: IProps) {
  return (
    <Swiper
      loop
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
          slidesPerView: 1.4,
          spaceBetween: 8,
          centeredSlides: true,
        },
      }}
      modules={[Autoplay]}
    >
      {suggestions?.map((item) => (
        <SwiperSlide key={item?.id} className="">
          <BlogItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
