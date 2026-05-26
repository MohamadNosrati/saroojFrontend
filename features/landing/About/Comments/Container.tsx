"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import CommentItem from "./CommentItem";
import { Autoplay } from "swiper/modules";

interface IProps {
  data:IComment[];
}

const Container : React.FC<IProps> = ({data}) => {
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
      {data?.map((item) => (
        <SwiperSlide className="!pt-12" key={item?.id}>
          <CommentItem item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Container;
