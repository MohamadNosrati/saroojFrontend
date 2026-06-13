import ReactCompareImage from "react-compare-image";

import { uploadUrl } from "@/lib/tools/upload";
import { ImageItem } from "@/lib/types/project";

interface IProps {
  item: ImageItem;
}

export default function BeforeAfterItem({ item }: IProps) {
  return (
    <div className="aspect-video">
      <ReactCompareImage
        aspectRatio="wider"
        leftImage={uploadUrl(item?.after?.pictureId?.image)}
        leftImageAlt={item?.after?.name}
        leftImageCss={{
          height: "100%",
          objectFit: "cover",
        }}
        rightImage={uploadUrl(item?.before?.pictureId?.image)}
        rightImageAlt={item?.before?.name}
        rightImageCss={{
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%)",
        }}
      />
    </div>
  );
}
