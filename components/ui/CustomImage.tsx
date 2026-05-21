import { useFindUpload } from "@/lib/hooks/upload";
import { Spinner } from "@heroui/spinner";
import Image, { ImageProps } from "next/image";
import { CustomWhen } from "./CustomWhen";

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
  const src = `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${data?.data?.image}`;
  console.log(src);
  return (
    <CustomWhen condition={Boolean(data?.data?.image)}>
      <>
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <div className="flex gap-x-2 items-center">
            <Image
              className={`w-full h-full ${props.className}`}
              alt={alt || ""}
              src={src}
              width={width}
              height={height}
              {...props}
            />
            <span className="text-xs font-bold text-foreground">
              {data?.data?.image.split("-")[1]}
            </span>
          </div>
        )}
      </>
    </CustomWhen>
  );
};

export default CustomImage;
