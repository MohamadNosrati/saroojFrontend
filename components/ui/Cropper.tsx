import { useState } from "react";
import Cropper from "react-easy-crop";
import StaticImage from "@/public/images/serviceImage.png";
import { Modal } from "@heroui/modal";

type Crop = {
  x: number;
  y: number;
};

interface IProps {
  onOpen: () => void;
  isOpen: boolean;
  onOpenChange: () => void;
}

const ImageCropper: React.FC<IProps> = ({ isOpen, onOpen, onOpenChange }) => {
  const [crop, setCrop] = useState<Crop>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  };
  return (
    <Cropper
      classes={{
        containerClassName:
          "w-full flex justify-center items-center aspect-square",
        cropAreaClassName: "",
      }}
      image={StaticImage?.src}
      crop={crop}
      zoom={zoom}
      aspect={4 / 3}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
      zoomWithScroll={false}
    />
  );
};

export default ImageCropper;
