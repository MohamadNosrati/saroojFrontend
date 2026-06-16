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
        <SwiperSlide key={item?.id} className="!pt-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
          >
            <CommentItem item={item} />
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Container;
