import { ChangeEvent } from "react";
import { DeleteIcon } from "../icons";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import CustomImage from "./CustomImage";
import { useUpload } from "@/lib/hooks/upload";

interface ICustomImageLoaderProps {
  value: string;
  changeImageHandler: (value: string) => void;
  htmlFor: string;
  label?:string;
}

const CustomImageLoader: React.FC<ICustomImageLoaderProps> = ({
  value,
  changeImageHandler,
  htmlFor,
  label
}) => {
  const { isPending, mutateAsync } = useUpload();
  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (files?.length) {
      const res = await mutateAsync(files[0]);
      if (res?.data?.data) changeImageHandler(res?.data?.data[0]?.id);
      try {
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteImage = () => {
    changeImageHandler("");
  };

  return (
    <>
      <label htmlFor={htmlFor} className="flex flex-col gap-y-2 cursor-pointer">
        <div>
          <span className="text-small text-white">{label || `آپلود عکس`}</span>
        </div>
        <div className="h-10 bg-white rounded-xl flex items-center justify-between p-4">
          <div className="flex items-center gap-x-2">
            {value && <CustomImage width={32} className="w-8 h-8 rounded-full" height={32} id={value} />}
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
                  onPress={deleteImage}
                  className="bg-transparent min-w-0 w-fit min-h-0 p-0"
                >
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
        id={htmlFor}
        multiple
        onChange={onChangeImage}
        className="hidden"
        type="file"
      />
    </>
  );
};

export default CustomImageLoader;
