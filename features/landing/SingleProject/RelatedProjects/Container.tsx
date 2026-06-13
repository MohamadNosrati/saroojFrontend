"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function RelatedProjectsContainer() {
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
          slidesPerView: 1.8,
          spaceBetween: 8,
          centeredSlides: true,
        },
      }}
      className="!w-full"
      modules={[Autoplay]}
    >
      {[1, 2, 3, 4, 5]?.map((item) => (
        <SwiperSlide key={item}>{/* <ProjectItem/> */}</SwiperSlide>
      ))}
    </Swiper>
  );
}
