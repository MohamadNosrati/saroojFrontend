// "use client";

// import { EffectCoverflow } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Button } from "@heroui/button";
// import { useEffect, useRef, useState } from "react";
// import { Swiper as SwiperType } from "swiper/types";
// import { useTranslations } from "next-intl";

// import { IStep } from "@/lib/types/project";
// import { CustomWhen } from "@/components/ui/CustomWhen";

// import LandingStepItem from "./StepItem";
// import StepsDetails from "./StepDetails";

// export interface IProps {
//   steps: IStep[];
// }

// export default function StepsContainer({ steps }: IProps) {
//   const t = useTranslations("SingleProject.steps");
//   const [activeIndex, setActiveIndex] = useState<number>(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const swiperRef = useRef<SwiperType | null>(null);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <>
//       <div>
//         <Swiper
//           breakpoints={{
//             1020: {
//               slidesPerView: 3.2,
//               // centeredSlides: true,
//             },
//             768: {
//               slidesPerView: 2.6,
//               // centeredSlides: true,
//             },
//             540: {
//               slidesPerView: 2,
//               // centeredSlides: true,
//             },
//             320: {
//               slidesPerView: 1.6,
//             },
//           }}
//           centeredSlides={true}
//           className="mySwiper !w-full"
//           coverflowEffect={{
//             rotate: 50,
//             stretch: 0,
//             depth: 100,
//             modifier: 1,
//             slideShadows: true,
//           }}
//           effect={"coverflow"}
//           grabCursor={true}
//           modules={[EffectCoverflow]}
//           pagination={true}
//           onSlideChange={(swiper) => {
//             setActiveIndex(swiper.realIndex);
//           }}
//           onSwiper={(swiper) => {
//             swiperRef.current = swiper;
//           }}
//         >
//           {steps?.map((item, index) => (
//             <SwiperSlide key={item?.name} className="bg-transparent !relative">
//               <LandingStepItem
//                 key={item?.name}
//                 activeIndex={activeIndex}
//                 index={index}
//                 item={item}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//       <CustomWhen condition={!isOpen && Boolean(steps?.length)}>
//         <div className="w-full mt-10">
//           <Button
//             fullWidth
//             className="font-bold"
//             color="primary"
//             size="sm"
//             variant="bordered"
//             onPress={() => setIsOpen(true)}
//           >
//             {t("button")}
//           </Button>
//         </div>
//       </CustomWhen>
//       <CustomWhen condition={mounted && isOpen}>
//         <StepsDetails
//           activeIndex={activeIndex}
//           isOpen={isOpen}
//           setIsOpen={setIsOpen}
//           steps={steps}
//           swiperRef={swiperRef}
//         />
//       </CustomWhen>
//     </>
//   );
// }


"use client";

import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { CustomWhen } from "@/components/ui/CustomWhen";
import { IStep } from "@/lib/types/project";

import LandingStepItem from "./StepItem";
import StepsDetails from "./StepDetails";

export interface IProps {
  steps: IStep[];
}

export default function StepsContainer({ steps }: IProps) {
  const t = useTranslations("SingleProject.steps");

  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!steps?.length) {
    return null;
  }

  return (
    <>
      <section className="relative w-full overflow-hidden py-4 sm:py-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          {/* Section Header */}
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary sm:text-xs">
                  Project Journey
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-3xl lg:text-4xl">
                {t("title")}
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-6 text-neutral-500 dark:text-neutral-400 sm:text-sm">
                {t("description")}
              </p>
            </div>

            <div className="hidden shrink-0 items-end gap-1 sm:flex">
              <span className="text-3xl font-black leading-none text-primary">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="mb-0.5 text-sm font-bold text-neutral-400">
                / {String(steps.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Swiper */}
          <div className="relative -mx-4 sm:mx-0">
            <Swiper
              centeredSlides
              grabCursor
              effect="coverflow"
              modules={[EffectCoverflow]}
              coverflowEffect={{
                rotate: 0,
                stretch: -20,
                depth: 180,
                modifier: 1,
                slideShadows: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.15,
                  spaceBetween: 12,
                },
                540: {
                  slidesPerView: 1.6,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
                1020: {
                  slidesPerView: 2.8,
                  spaceBetween: 24,
                },
              }}
              className="!w-full !overflow-visible"
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex);
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {steps.map((item, index) => (
                <SwiperSlide key={item?.name} className="!h-auto !bg-transparent">
                  <LandingStepItem activeIndex={activeIndex} index={index} item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Mobile Progress */}
          <div className="mt-6 flex items-center justify-center gap-1.5 sm:hidden">
            {steps.map((_, index) => (
              <button
                key={index}
                aria-label={`${t("title")} ${index + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${activeIndex === index ? "w-8 bg-primary" : "w-1.5 bg-neutral-300 dark:bg-neutral-700"}`}
                onClick={() => swiperRef.current?.slideTo(index)}
              />
            ))}
          </div>

          {/* CTA */}
          <CustomWhen condition={!isOpen}>
            <div className="mt-8 flex justify-center sm:mt-10">
              <Button
                className="group h-12 min-w-[210px] rounded-full bg-primary px-6 font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30"
                onPress={() => setIsOpen(true)}
              >
                <span>{t("button")}</span>
                <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
              </Button>
            </div>
          </CustomWhen>
        </div>
      </section>

      <CustomWhen condition={mounted && isOpen}>
        <StepsDetails
          activeIndex={activeIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          steps={steps}
          swiperRef={swiperRef}
        />
      </CustomWhen>
    </>
  );
}