import { fileServices } from "@/lib/services/file";
import { responseHandler } from "@/lib/tools/responseHandler";
import { ChangeEvent, useState } from "react";
import { DeleteIcon } from "../icons";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import CustomImage from "./CustomImage";

interface ICustomImageLoaderProps {
  value: string;
  setValue: (value: string) => void;
}

const CustomImageLoader: React.FC<ICustomImageLoaderProps> = ({
  value,
  setValue,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files?.length) {
        setIsUploading(true);
        const formData = new FormData();
        formData.set("images", e.target.files[0]);
        const res = await fileServices.upload(formData);
        if (res?.data?.data) {
          setValue(res.data?.data[0].id);
        }
      }
    } catch (err) {
      responseHandler.fail(err);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = ()=>{
    setValue("")
  }

  return (
    <>
      <label
        htmlFor="uploader"
        className="flex flex-col gap-y-2 cursor-pointer"
      >
        <div>
          <span className="text-small text-foreground">{`آپلود عکس`}</span>
        </div>
        <div className="h-10 bg-shark-950 rounded-xl flex items-center justify-between p-4">
          <div className="flex items-center gap-x-2">
            {value && <CustomImage width={32} height={32} id={value} />}
          </div>
          <div className="flex gap-x-2 items-center">
            <div>
              {!value && (
                <>
                  {isUploading && (
                    <div>
                      <Spinner size="sm" />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="w-6">
              {value && (
                <Button onPress={deleteImage} className="bg-transparent min-w-0 w-fit min-h-0 p-0">
                  <span>
                    <DeleteIcon
                      width={24}
                      height={24}
                      className="text-red-500"
                    />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </label>
      <input
        id="uploader"
        multiple
        onChange={onChangeImage}
        className="hidden"
        type="file"
      />
    </>
  );
};

export default CustomImageLoader;
