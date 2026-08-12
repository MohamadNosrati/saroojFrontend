"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useRef, useState } from "react";
import Image from "next/image";

import type { Swiper as SwiperType } from "swiper/types";

import { Button } from "@heroui/button";
import clsx from "clsx";

const BeforeAfterItem = dynamic(() => import("./BeforeAfterItem"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";

import { ArrowIcon } from "@/components/icons";
import { uploadUrl } from "@/lib/tools/upload";
import { ImageItem } from "@/lib/types/project";
interface IProps {
  images: ImageItem[];
}

export default function Carousel({ images }: IProps) {
  const locale = useLocale();
  const t = useTranslations("SingleProject.beforeAfter");
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images?.length || 0;

  const isRtl = locale === "fa" || locale === "ar";

  if (!total) return null;

  return (
    <section className="w-full">
      <div className="relative w-full">
        <Swiper
          allowTouchMove={false}
          autoHeight={false}
          className="w-full"
          modules={[Thumbs]}
          slidesPerView={1}
          spaceBetween={0}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {images?.map((item, index) => (
            <SwiperSlide key={item?._id || index} className="w-full">
              <BeforeAfterItem index={index} item={item} total={total} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={clsx([
            "pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-2 sm:px-4",
            // isRtl ? "flex-row-reverse" : "",
          ])}
        >
          <Button
            isIconOnly
            aria-label="Previous image"
            className="pointer-events-auto flex size-8 min-w-0 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/65 disabled:opacity-30 sm:size-10"
            isDisabled={activeIndex === 0}
            onPress={() => swiperRef.current?.slidePrev()}
          >
            <ArrowIcon
              className={isRtl ? "" : "rotate-180"}
              height={16}
              width={10}
            />
          </Button>

          <Button
            isIconOnly
            aria-label="Next image"
            className="pointer-events-auto flex size-8 min-w-0 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/65 disabled:opacity-30 sm:size-10"
            isDisabled={activeIndex === total - 1}
            onPress={() => swiperRef.current?.slideNext()}
          >
            <ArrowIcon
              className={!isRtl ? "" : "rotate-180"}
              height={16}
              width={10}
            />
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-1.5 shrink-0 rounded-full bg-primary" />
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/50 sm:text-[11px]">
            {t("title")}
          </span>
        </div>

        <span className="shrink-0 text-[10px] font-semibold tabular-nums text-foreground/40 sm:text-[11px]">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-3 sm:mt-4">
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 2.25, spaceBetween: 8 },
            480: { slidesPerView: 3.2, spaceBetween: 10 },
            640: { slidesPerView: 4, spaceBetween: 12 },
            1024: { slidesPerView: 5, spaceBetween: 12 },
            1280: { slidesPerView: 6, spaceBetween: 14 },
          }}
          className="w-full"
          freeMode={{ enabled: true, sticky: true }}
          modules={[Thumbs, FreeMode, Autoplay]}
          slidesPerView={2.25}
          spaceBetween={8}
          watchSlidesProgress={true}
          onSwiper={setThumbsSwiper}
        >
          {images?.map((item, index) => (
            <SwiperSlide
              key={item?._id || index}
              className="group aspect-video cursor-pointer overflow-hidden rounded-xl"
            >
              <div
                className={clsx(
                  "relative h-full w-full overflow-hidden rounded-xl border transition-all duration-300",
                  activeIndex === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  fill
                  alt=""
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 16vw"
                  src={uploadUrl(item?.before?.pictureId?.image)}
                />

                <div
                  className={clsx(
                    "absolute inset-0 transition-opacity duration-300",
                    activeIndex === index ? "bg-transparent" : "bg-black/20",
                  )}
                />

                <div className="absolute bottom-1.5 left-1.5 rounded-md bg-black/50 px-1.5 py-0.5 text-[8px] font-semibold tabular-nums text-white backdrop-blur-sm sm:bottom-2 sm:left-2 sm:px-2 sm:py-1 sm:text-[9px]">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
