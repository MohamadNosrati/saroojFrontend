import { useFindFile } from "@/lib/services/file";
import { Spinner } from "@heroui/spinner";
import Image, { ImageProps } from "next/image";

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
  const { data, isLoading } = useFindFile(id || "");
  const src = `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${data?.data?.image}`;
  console.log(src);
  return (
    <>
      {data?.data?.image ? (
        <div className="flex gap-x-2 items-center">
          <Image
            {...props}
            className={`w-full h-full ${props.className}`}
            alt={alt || ""}
            src={src}
            width={width}
            height={height}
          />
          <span className="text-xs font-bold text-foreground">{data?.data?.image.split("-")[1]}</span>
        </div>
      ) : (
        <Spinner size="sm" />
      )}
    </>
  );
};

export default CustomImage;
