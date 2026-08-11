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

import { ArrowIcon } from "@/components/icons";
import { uploadUrl } from "@/lib/tools/upload";

// interface IProps {
//   images: ImageItem[];
// }

// const Carousel: React.FC<IProps> = ({ images }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//   const swiperRef = useRef<SwiperType | null>(null);
//   const [activeIndex, setActiveIndex] = useState<number>(0);

//   return (
//     <div>
//       <Swiper
//         allowTouchMove={false}
//         autoHeight={true}
//         className="sm:mb-5 aspect-video mb-3"
//         modules={[Thumbs]}
//         slidesPerView={1}
//         spaceBetween={20}
//         thumbs={{ swiper: thumbsSwiper }}
//         onSlideChange={(swiper) => {
//           setActiveIndex(swiper.realIndex);
//         }}
//         onSwiper={(swiper) => {
//           swiperRef.current = swiper;
//         }}
//       >
//         {images?.map((item) => (
//           <SwiperSlide key={item?.id}>
//             <BeforeAfterItem item={item} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       <div className="relative">
//         <Button
//           className={cn(
//             "sm:size-8 size-6 min-w-0 p-0 z-10 rounded-none bg-primary absolute top-0 bottom-0 my-auto right-0",
//           )}
//           isDisabled={activeIndex === images?.length - 1}
//           onPress={() => swiperRef.current?.slideNext()}
//         >
//           <span>
//             <ArrowIcon
//               className="text-[0E0E0E] max-sm:w-2 max-sm:h-3 "
//               height={20}
//               width={12}
//             />
//           </span>
//         </Button>
//         <Button
//           className={cn(
//             "sm:size-8 size-6 min-w-0 p-0 z-10 rounded-none bg-primary absolute top-0 bottom-0 my-auto left-0",
//           )}
//           isDisabled={activeIndex === 0}
//           onPress={() => swiperRef.current?.slidePrev()}
//         >
//           <span>
//             <ArrowIcon
//               className="text-[0E0E0E] max-sm:w-2 max-sm:h-3 rotate-180"
//               height={20}
//               width={12}
//             />
//           </span>
//         </Button>
//         <Swiper
//           autoplay={{
//             delay: 2500,
//             pauseOnMouseEnter: true,
//           }}
//           breakpoints={{
//             1020: {
//               slidesPerView: 3,
//               spaceBetween: 20,
//             },
//             768: {
//               slidesPerView: 2.4,
//               spaceBetween: 16,
//             },
//             540: {
//               slidesPerView: 1.6,
//               spaceBetween: 12,
//             },
//             320: {
//               slidesPerView: 2.2,
//               spaceBetween: 8,
//             },
//           }}
//           className="mySwiper"
//           freeMode={true}
//           modules={[Thumbs]}
//           spaceBetween={20}
//           watchSlidesProgress={true}
//           onSwiper={setThumbsSwiper}
//         >
//           {images?.map((item, index) => (
//             <SwiperSlide
//               key={item?.id}
//               className="aspect-video relative sm:border-5 border-2 overflow-hidden border-white"
//             >
//               <Image
//                 fill
//                 alt=""
//                 className={clsx([
//                   "size-full absolute bg-cover",
//                   activeIndex === index ? "grayscale" : "",
//                 ])}
//                 src={uploadUrl(item?.before?.pictureId?.image)}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default Carousel;

// import { useRef, useState } from "react";
// import Image from "next/image";
// import clsx from "clsx";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode, Thumbs, Autoplay } from "swiper/modules";
// import type { Swiper as SwiperType } from "swiper";
// import { Button } from "@heroui/react";

// import BeforeAfterItem from "./BeforeAfterItem";
// import { uploadUrl } from "@/lib/tools/upload";
// import { ArrowIcon } from "@/components/icons/ArrowIcon";

interface IProps {
  images: any[];
}

export default function Carousel({ images }: IProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = images?.length || 0;

  if (!total) return null;

  console.log("images", images);

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
          {images.map((item, index) => (
            <SwiperSlide key={item?.id} className="w-full">
              <BeforeAfterItem index={index} item={item} total={total} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-2 sm:px-4">
          <Button
            isIconOnly
            aria-label="Previous image"
            className="pointer-events-auto flex size-8 min-w-0 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/65 disabled:opacity-30 sm:size-10"
            isDisabled={activeIndex === 0}
            onPress={() => swiperRef.current?.slidePrev()}
          >
            <ArrowIcon className="rotate-180" height={16} width={10} />
          </Button>

          <Button
            isIconOnly
            aria-label="Next image"
            className="pointer-events-auto flex size-8 min-w-0 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/65 disabled:opacity-30 sm:size-10"
            isDisabled={activeIndex === total - 1}
            onPress={() => swiperRef.current?.slideNext()}
          >
            <ArrowIcon height={16} width={10} />
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 sm:mt-4">
        <div className="flex min-w-0 items-center gap-2">
          <span className="size-1.5 shrink-0 rounded-full bg-primary" />
          <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/50 sm:text-[11px]">
            Before & After
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
          {images.map((item, index) => (
            <SwiperSlide
              key={item?.id}
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
