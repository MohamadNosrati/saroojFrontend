import Cropper, { Point } from "react-easy-crop";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";

import { Crop, CroppedPixels } from "./CustomImageLoader";

import sliderMarks from "@/lib/config/marks";

interface IProps {
  zoom: number;
  setZoom: (value: number | number[]) => void;
  selectedImagePreview: string;
  crop: Crop;
  setCrop: (location: Point) => void;
  handleSave: () => void;
  handleCancel: () => void;
  handleReset: () => void;
  onCropComplete: (_: CroppedPixels, croppedAreaPixels: CroppedPixels) => void;
  aspect: number;
}

const ImageCropper: React.FC<IProps> = ({
  selectedImagePreview,
  zoom,
  crop,
  setZoom,
  setCrop,
  handleCancel,
  handleReset,
  handleSave,
  onCropComplete,
  aspect,
}) => {
  return (
    <div className="flex justify-center z-[100000000] items-end p-6 fixed left-0 top-0 gap-4 w-full min-h-screen bg-dark/75">
      <Cropper
        aspect={aspect}
        classes={{
          containerClassName:
            "w-full h-full flex relative justify-center items-center bg-dark/75",
          cropAreaClassName: "size-full",
        }}
        crop={crop}
        image={String(selectedImagePreview)}
        zoom={Number(zoom)}
        zoomWithScroll={true}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
      />
      <div className="flex flex-col gap-3">
        <div className="w-full flex justify-center gap-2.5">
          <Button
            className="text-white text-xl font-bold"
            color="success"
            size="lg"
            onPress={handleSave}
          >
            SAVE
          </Button>
          <Button
            className="text-white text-xl font-bold"
            color="danger"
            size="lg"
            onPress={handleCancel}
          >
            CANCEL
          </Button>
          <Button
            className="text-white text-xl font-bold"
            color="warning"
            size="lg"
            onPress={handleReset}
          >
            RESET
          </Button>
        </div>
        <Slider
          className="max-w-md"
          dir="ltr"
          label="zoom level"
          marks={sliderMarks}
          maxValue={2}
          minValue={0}
          step={0.1}
          value={zoom}
          onChange={setZoom}
        />
      </div>
    </div>
  );
};

export default ImageCropper;
