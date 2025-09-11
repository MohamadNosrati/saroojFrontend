import { ITeamate } from "@/lib/types/teamate";
import Image from "next/image";

import { Button } from "@heroui/button";
import { EditIcon } from "../icons";
import CustomDelete from "./CustomDelete";
import { Dispatch, SetStateAction, useState } from "react";
import { dateConvertor } from "@/lib/tools/dateConvertor";

interface ICustomCardProps {
  onOpen: () => void;
  item: ITeamate;
  setEditData: Dispatch<SetStateAction<ITeamate | undefined>>;
}

const CustomCard: React.FC<ICustomCardProps> = ({
  item,
  onOpen,
  setEditData,
}) => {
  const src = `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${item?.pictureId?.image}`;

  const editHandler = () => {
    setEditData(item);
    onOpen();
  };
  return (
    <div className="rounded-xl border border-wood-smoke-200 p-4">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div>
            <Image
              className="w-20 h-20"
              width={100}
              height={100}
              src={src}
              alt={item?.title}
            />
          </div>
          <div className="flex flex-col gap-y-8">
            <span className="text-sm font-bold text-slate-200">
              {" "}
              {item?.title}
            </span>
            <span className="text-xs font-bold text-wood-smoke-400">
              {item?.position}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex items-center gap-3">
            <CustomDelete id={item?.id} title={item?.title} />
            <Button
              onPress={editHandler}
              className="bg-transparent min-w-0 w-fit min-h-0 p-0"
            >
              <span>
                <EditIcon
                  width={24}
                  height={24}
                  className="text-charade-600 hover:text-rose-500"
                />
              </span>
            </Button>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="text-xs text-wood-smoke-200">
                تاریخ ایجاد
            </span>
            <span className="text-xs text-wood-smoke-400">
                {dateConvertor(item?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-xs">{item?.description}</p>
      </div>
    </div>
  );
};

export default CustomCard;
