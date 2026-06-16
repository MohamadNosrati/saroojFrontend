import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

import { uploadUrl } from "@/lib/tools/upload";
import { ImageItem } from "@/lib/types/project";

interface IProps {
  item: ImageItem;
}

export default function BeforeAfterItem({ item }: IProps) {
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
      {/* <ReactCompareImage
        aspectRatio="wider"
        leftImage={uploadUrl(item?.after?.pictureId?.image)}
        leftImageAlt={item?.after?.name}
        leftImageCss={{
          height: "100%",
          // objectFit: "cover",
        }}
        rightImage={uploadUrl(item?.before?.pictureId?.image)}
        rightImageAlt={item?.before?.name}
        rightImageCss={{
          height: "100%",
          // objectFit: "cover",
          filter: "grayscale(100%)",
        }}
      /> */}
    </div>
  );
}
