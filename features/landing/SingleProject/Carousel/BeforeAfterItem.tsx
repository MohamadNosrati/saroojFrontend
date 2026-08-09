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
}

export default function BeforeAfterItem({ item }: IProps) {
  const locale = useLocale();
  const itemLang: Record<
    LocaleEnum,
    {
      alt: {
        before: string;
        after: string;
      };
    }
  > = {
    fa: {
      alt: {
        before: item?.before?.name,
        after: item?.after?.name,
      },
    },
    en: {
      alt: {
        before: item?.before?.nameEn || "",
        after: item?.after?.nameEn || "",
      },
    },
    ar: {
      alt: {
        before: item?.before?.nameAr || "",
        after: item?.after?.nameAr || "",
      },
    },
  };

  return (
    <div className="">
      <ReactCompareSlider
        className="relative"
        itemOne={
          <ReactCompareSliderImage
            alt="Image one"
            className="object-cover"
            src={uploadUrl(item?.after?.pictureId?.image)}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            alt="Image two"
            className="object-cover"
            src={uploadUrl(item?.before?.pictureId?.image)}
          />
        }
      />
    </div>
  );
}
