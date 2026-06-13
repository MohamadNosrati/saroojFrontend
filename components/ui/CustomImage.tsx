import { Spinner } from "@heroui/spinner";
import Image, { ImageProps } from "next/image";

import { CustomWhen } from "./CustomWhen";

import { useFindUpload } from "@/lib/hooks/upload";
import { uploadUrl } from "@/lib/tools/upload";

interface ICustomImageProps extends ImageProps {
  id: string;
  alt: string;
  width: number;
  height: number;
}

const CustomImage: React.FC<Partial<ICustomImageProps>> = ({
  id,
  alt,
  width,
  height,
  ...props
}) => {
  const { data, isLoading } = useFindUpload(id || "");

  return (
    <CustomWhen condition={Boolean(data?.data?.image)}>
      <>
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <div className="flex gap-x-2 items-center">
            <CustomWhen condition={Boolean(data?.data?.image)}>
              <Image
                alt={alt || ""}
                className={`w-full h-full ${props.className}`}
                height={height}
                src={uploadUrl(data?.data?.image as string)}
                width={width}
                {...props}
              />
              <span className="text-xs font-bold text-dark">
                {data?.data?.image.split("-")[1]}
              </span>
            </CustomWhen>
          </div>
        )}
      </>
    </CustomWhen>
  );
};

export default CustomImage;
