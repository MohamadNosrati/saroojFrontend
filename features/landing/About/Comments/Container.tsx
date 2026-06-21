"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import CommentItem from "./CommentItem";

interface IProps {
  data: IComment[];
}

const Container: React.FC<IProps> = ({ data }) => {
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
      className="!overflow-visible"
      modules={[Autoplay]}
    >
      {data?.map((item) => (
        <SwiperSlide key={item?.id} className="!pt-10 pb-4">
          <div className="w-full h-full transform transition-all duration-300 hover:-translate-y-1">
            <CommentItem item={item} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Container;
