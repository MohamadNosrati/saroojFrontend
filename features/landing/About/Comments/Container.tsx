"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CommentItem from "./CommentItem";
import { Autoplay } from "swiper/modules";

const Container = () => {
  return (
    <Swiper
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
          slidesPerView: 1.4,
          spaceBetween: 8,
          centeredSlides: true
        }
      }}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,  
      }}
      
      loop
      modules={[Autoplay]}
    >
      {[1, 2, 3, 4, 5]?.map((item) => (
        <SwiperSlide className="!pt-12" key={item}>
          <CommentItem />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Container;
