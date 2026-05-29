import { uploadUrl } from "@/lib/tools/upload";
import { ImageItem } from "@/lib/types/project";
import ReactCompareImage from "react-compare-image";

interface IProps {
  item: ImageItem;
}

export default function BeforeAfterItem({ item }: IProps) {
  return (
    <div className="aspect-video">
      <ReactCompareImage
        leftImageAlt={item?.after?.name}
        rightImageAlt={item?.before?.name}
        aspectRatio="wider"
        leftImageCss={{
          height: "100%",
          objectFit: "cover",
        }}
        rightImageCss={{
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%)",
        }}
        leftImage={uploadUrl(item?.after?.pictureId?.image)}
        rightImage={uploadUrl(item?.before?.pictureId?.image)}
      />
    </div>
  );
}
