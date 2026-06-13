import type { SliderValue } from "@heroui/slider";

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

import { DeleteIcon } from "../icons";

import CustomImage from "./CustomImage";
import { CustomWhen } from "./CustomWhen";
import ImageCropper from "./Cropper";

import { useUpload } from "@/lib/hooks/upload";
import { getCroppedImg } from "@/lib/tools/croppedImage";

export type CroppedPixels = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Crop = {
  x: number;
  y: number;
};

const DEFAULTCROP = { x: 0, y: 0 };

interface ICustomImageLoaderProps {
  value: string;
  changeImageHandler: (value: string) => void;
  htmlFor: string;
  label?: string;
  aspect: number;
}

const CustomImageLoader: React.FC<ICustomImageLoaderProps> = ({
  value,
  changeImageHandler,
  htmlFor,
  label,
  aspect,
}) => {
  const [zoom, setZoom] = useState<SliderValue>(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<
    string | null
  >(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState<Crop>(DEFAULTCROP);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedPixels | null>(null);

  const onCropComplete = (
    _: CroppedPixels,
    croppedAreaPixels: CroppedPixels,
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  const { isPending, mutateAsync } = useUpload();
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setSelectedFile(file);
    if (selectedImagePreview) {
      URL.revokeObjectURL(selectedImagePreview);
    }
    const previewUrl = URL.createObjectURL(file);

    setSelectedImagePreview(previewUrl);
    setShowCropper(true);
  };

  const handleSave = async () => {
    if (!croppedAreaPixels || !selectedFile) {
      alert("Please select a crop area");

      return;
    }
    try {
      const croppedImageUrl = await getCroppedImg(
        String(selectedImagePreview),
        croppedAreaPixels,
      );
      const blob = await fetch(croppedImageUrl).then((r) => r.blob());
      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();

      formData.append("image", file);
      const res = await mutateAsync({
        image: selectedFile,
      });

      if (res?.data?.data) {
        changeImageHandler(res?.data?.data?.id);
        if (selectedImagePreview) {
          URL.revokeObjectURL(selectedImagePreview);
        }
        setShowCropper(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = () => {
    changeImageHandler("");
  };

  const handleCancel = () => {
    setShowCropper(false);
    setSelectedFile(null);
    setSelectedImagePreview(null);
    setCrop(DEFAULTCROP);
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const handleReset = () => {
    setCrop(DEFAULTCROP);
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  useEffect(() => {
    return () => {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  return (
    <>
      <label className="flex flex-col gap-y-2 cursor-pointer" htmlFor={htmlFor}>
        {""}
        <div>
          <span className="text-small text-white font-bold">
            {label || `آپلود عکس`}
          </span>
        </div>
        <div className="h-10 bg-white rounded-xl flex items-center justify-between p-4">
          <div className="flex items-center gap-x-2">
            {value && (
              <CustomImage
                className="w-8 h-8 rounded-full"
                height={32}
                id={value}
                width={32}
              />
            )}
          </div>
          <div className="flex gap-x-2 items-center">
            <div>
              {!value && (
                <>
                  {isPending && (
                    <div>
                      <Spinner size="sm" />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="w-6">
              {value && (
                <Button
                  className="bg-transparent min-w-0 w-fit min-h-0 p-0"
                  onPress={deleteImage}
                >
                  <span>
                    <DeleteIcon
                      className="text-red-500"
                      height={24}
                      width={24}
                    />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </label>
      <input
        multiple
        className="hidden"
        id={htmlFor}
        type="file"
        onChange={onChangeImage}
      />
      <CustomWhen
        condition={
          showCropper && Boolean(selectedFile) && Boolean(selectedImagePreview)
        }
      >
        <ImageCropper
          aspect={aspect}
          crop={crop}
          handleCancel={handleCancel}
          handleReset={handleReset}
          handleSave={handleSave}
          selectedImagePreview={String(selectedImagePreview)}
          setCrop={setCrop}
          setZoom={setZoom}
          zoom={Number(zoom)}
          onCropComplete={onCropComplete}
        />
      </CustomWhen>
    </>
  );
};

export default CustomImageLoader;
