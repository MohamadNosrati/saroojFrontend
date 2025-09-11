import { useFindFile } from "@/lib/services/file";
import Image, { ImageProps } from "next/image";

interface ICustomImageProps {
  id: string;
  props: ImageProps;
}

const CustomImage: React.FC<ICustomImageProps> = ({ props, id }) => {
  const { data, isLoading } = useFindFile(id);
  return <Image className={`w-full h-full ${props.className}`} {...props} />;
};

export default CustomImage;
