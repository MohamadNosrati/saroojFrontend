// import {
//   ReactCompareSlider,
//   ReactCompareSliderImage,
// } from "react-compare-slider";
// import { useLocale } from "next-intl";

// import { uploadUrl } from "@/lib/tools/upload";
// import { ImageItem } from "@/lib/types/project";
// import { LocaleEnum } from "@/lib/types/base";

// interface IProps {
//   item: ImageItem;
// }

// export default function BeforeAfterItem({ item }: IProps) {
//   const locale = useLocale();
//   const itemLang: Record<
//     LocaleEnum,
//     {
//       alt: {
//         before: string;
//         after: string;
//       };
//     }
//   > = {
//     fa: {
//       alt: {
//         before: item?.before?.name,
//         after: item?.after?.name,
//       },
//     },
//     en: {
//       alt: {
//         before: item?.before?.nameEn || "",
//         after: item?.after?.nameEn || "",
//       },
//     },
//     ar: {
//       alt: {
//         before: item?.before?.nameAr || "",
//         after: item?.after?.nameAr || "",
//       },
//     },
//   };

//   return (
//     <div className="cursor-pointer">
//       <ReactCompareSlider
//         className="relative"
//         itemOne={
//           <ReactCompareSliderImage
//             alt="Image one"
//             className="object-cover"
//             src={uploadUrl(item?.after?.pictureId?.image)}
//           />
//         }
//         itemTwo={
//           <ReactCompareSliderImage
//             alt="Image two"
//             className="object-cover"
//             src={uploadUrl(item?.before?.pictureId?.image)}
//           />
//         }
//       />
//     </div>
//   );
// }

"use client";

import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { useLocale } from "next-intl";

import { uploadUrl } from "@/lib/tools/upload";
import { ImageItem } from "@/lib/types/project";
import { LocaleEnum } from "@/lib/types/base";

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
  const locale = useLocale();

  const itemLang: Record<LocaleEnum, { before: string; after: string }> = {
    fa: {
      before: item?.before?.name || "قبل",
      after: item?.after?.name || "بعد",
    },
    en: {
      before: item?.before?.nameEn || "Before",
      after: item?.after?.nameEn || "After",
    },
    ar: {
      before: item?.before?.nameAr || "قبل",
      after: item?.after?.nameAr || "بعد",
    },
  };

  const labels = itemLang[locale as LocaleEnum];

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
      <ReactCompareSlider
        className="absolute inset-0 h-full w-full"
        itemOne={
          <ReactCompareSliderImage
            alt={labels.after}
            className="h-full w-full object-cover"
            src={uploadUrl(item?.after?.pictureId?.image)}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            alt={labels.before}
            className="h-full w-full object-cover"
            src={uploadUrl(item?.before?.pictureId?.image)}
          />
        }
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-3 sm:p-5">
        <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-[10px]">
          {labels.before}
        </div>

        <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-[10px]">
          {labels.after}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-20 -translate-x-1/2 sm:bottom-5">
        <div className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-medium tracking-wide text-white/90 backdrop-blur-md sm:px-4 sm:py-2 sm:text-[10px]">
          {locale === "fa"
            ? "برای مقایسه بکشید"
            : locale === "ar"
              ? "اسحب للمقارنة"
              : "Drag to compare"}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 right-3 z-20 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[9px] font-semibold text-white backdrop-blur-md sm:bottom-5 sm:right-5 sm:px-4 sm:py-2 sm:text-[10px]">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}
