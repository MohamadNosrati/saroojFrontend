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
  isPending: boolean;
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
  isPending,
}) => {
  return (
    <div className="fixed inset-0 flex flex-col z-10  bg-black">
      {/* Cropper Section */}
      <div className="flex-1 overflow-hidden bg-[#111827]">
        <Cropper
          zoomWithScroll
          aspect={aspect}
          classes={{
            containerClassName: "relative h-full w-full bg-[#111827]",
            cropAreaClassName:
              "rounded-xl border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,.55)]",
          }}
          crop={crop}
          image={String(selectedImagePreview)}
          zoom={Number(zoom)}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
        />
      </div>

      {/* Controls */}
      <div className="border-t min-h-fit border-white/10 bg-zinc-900 px-6 py-5">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <Slider
            className="w-full"
            dir="ltr"
            isDisabled={isPending}
            label="Zoom"
            marks={sliderMarks}
            maxValue={2}
            minValue={0}
            step={0.1}
            value={zoom}
            onChange={setZoom}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Button
              className="font-semibold"
              color="success"
              isLoading={isPending}
              size="lg"
              onPress={handleSave}
            >
              Save
            </Button>

            <Button
              className="font-semibold"
              color="warning"
              isDisabled={isPending}
              size="lg"
              onPress={handleReset}
            >
              Reset
            </Button>

            <Button
              className="font-semibold"
              color="danger"
              isDisabled={isPending}
              size="lg"
              onPress={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
