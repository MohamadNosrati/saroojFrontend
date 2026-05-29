import Cropper, { Point } from "react-easy-crop";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import sliderMarks from "@/lib/config/marks";
import { Crop, CroppedPixels } from "./CustomImageLoader";

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
    <div className="flex justify-center z-[100000000] items-end p-6 fixed left-0 top-0 gap-4 w-full min-h-screen bg-black/75">
      <Cropper
        classes={{
          containerClassName:
            "w-full h-full flex relative justify-center items-center bg-black/75",
          cropAreaClassName: "size-full",
        }}
        image={String(selectedImagePreview)}
        crop={crop}
        aspect={aspect}
        zoom={Number(zoom)}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        zoomWithScroll={true}
      />
      <div className="flex flex-col gap-3">
        <div className="w-full flex justify-center gap-2.5">
          <Button
            onPress={handleSave}
            color="success"
            size="lg"
            className="text-white text-xl font-bold"
          >
            SAVE
          </Button>
          <Button
            onPress={handleCancel}
            color="danger"
            size="lg"
            className="text-white text-xl font-bold"
          >
            CANCEL
          </Button>
          <Button
            onPress={handleReset}
            color="warning"
            size="lg"
            className="text-white text-xl font-bold"
          >
            RESET
          </Button>
        </div>
        <Slider
          label="zoom level"
          marks={sliderMarks}
          dir="ltr"
          className="max-w-md"
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
