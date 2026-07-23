"use client";

import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@heroui/button";
import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper/types";

import { IStep } from "@/lib/types/project";
import { CustomWhen } from "@/components/ui/CustomWhen";

import LandingStepItem from "./StepItem";
import StepsDetails from "./StepDetails";
import { useLocale, useTranslations } from "next-intl";

export interface IProps {
  steps: IStep[];
}

export default function StepsContainer({ steps }: IProps) {
  const t = useTranslations("SingleProject.steps");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const locale = useLocale();
  const condition = locale === "fa" ? "name" : "nameEn";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div>
        <Swiper
          breakpoints={{
            1020: {
              slidesPerView: 3.2,
              // centeredSlides: true,
            },
            768: {
              slidesPerView: 2.6,
              // centeredSlides: true,
            },
            540: {
              slidesPerView: 2,
              // centeredSlides: true,
            },
            320: {
              slidesPerView: 1.6,
            },
          }}
          centeredSlides={true}
          className="mySwiper !w-full"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          effect={"coverflow"}
          grabCursor={true}
          modules={[EffectCoverflow]}
          pagination={true}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {steps
            ?.filter((item) => item[condition])
            ?.map((item, index) => (
              <SwiperSlide
                key={item?.name}
                className="bg-transparent !relative"
              >
                <LandingStepItem
                  key={item?.name}
                  activeIndex={activeIndex}
                  index={index}
                  item={item}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <CustomWhen condition={!isOpen && Boolean(steps?.length)}>
        <div className="w-full mt-10">
          <Button
            fullWidth
            className="font-bold"
            color="primary"
            size="sm"
            variant="bordered"
            onPress={() => setIsOpen(true)}
          >
            {t("button")}
          </Button>
        </div>
      </CustomWhen>
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
