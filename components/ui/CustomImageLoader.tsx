import { ChangeEvent } from "react";

const CustomImageLoader = () => {
  const onChangeImage = (e:ChangeEvent<HTMLInputElement>)=>{

  }
  return (
    <div className="w-full">
      <label htmlFor="uploader" className="flex flex-col gap-y-1 bg-shark-950 rounded-xl p-2">
        <div className="top-4 right-10">
          <span className="text-sm text-woodSmoke-500 font-bold">{`آپلود عکس`}</span>
        </div>
        <div className="h-10">

        </div>
      </label>
      <input id="uploader" onChange={onChangeImage} multiple className="hidden" type="file" />
    </div>
  );
};

export default CustomImageLoader;
