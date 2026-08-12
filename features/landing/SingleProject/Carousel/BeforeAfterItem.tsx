"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { useTranslations } from "next-intl";

import { uploadUrl } from "@/lib/tools/upload";
import { ImageItem } from "@/lib/types/project";

interface IProps {
  item: ImageItem;
  index?: number;
  total?: number;
}

export default function BeforeAfterItem({
  item,
  index = 0,
  total = 1,
}: IProps) {
  const t = useTranslations("SingleProject.beforeAfter");

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
      <ReactCompareSlider
        className="absolute inset-0 h-full w-full"
        itemOne={
          <ReactCompareSliderImage
            alt={item?.after?.name}
            className="h-full w-full object-cover"
            src={uploadUrl(item?.after?.pictureId?.image)}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            alt={item?.before?.name}
            className="h-full w-full object-cover"
            src={uploadUrl(item?.before?.pictureId?.image)}
          />
        }
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-3 sm:p-5">
        <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-[10px]">
          {item?.before?.name}
        </div>

        <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-[10px]">
          {item?.after?.name}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 sm:bottom-5">
        <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-medium tracking-wide text-white/90 backdrop-blur-md sm:px-4 sm:py-2 sm:text-[10px]">
          {t("text")}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 right-3 z-20 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-semibold text-white backdrop-blur-md sm:bottom-5 sm:right-5 sm:px-4 sm:py-2 sm:text-[10px]">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}
