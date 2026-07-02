"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import { IProject } from "@/lib/types/project";

import ProjectItem from "../../ProjectItem";

interface IProps {
  suggsetions: IProject[];
}

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      duration: 0.6,
    },
  },
};

const slideVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function RelatedProjectsContainer({ suggsetions }: IProps) {
  return (
    <motion.div
      className="relative overflow-visible mt-6"
      initial="hidden"
      variants={containerVariant}
      viewport={{ once: true, amount: 0.2 }}
      whileInView="show"
    >
      {/* soft edge fade (premium touch) */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white/10 dark:from-dark to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white/10 dark:from-dark to-transparent z-10" />

      <Swiper
        loop
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          1020: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 18,
          },
          540: {
            slidesPerView: 1.6,
            spaceBetween: 14,
          },
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
            centeredSlides: true,
          },
        }}
        className="!w-full !overflow-visible"
        modules={[Autoplay]}
      >
        {suggsetions?.map((item) => (
          <SwiperSlide
            key={item?.id}
            className="!overflow-visible !bg-transparent "
          >
            <motion.div
              className="
                h-full
                rounded-2xl
                transition-shadow
                duration-300
  
              "
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
              }}
              variants={slideVariant}
              whileHover={{
                scale: 1.02,
              }}
            >
              <ProjectItem item={item} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
