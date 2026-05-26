import Image from "next/image";
import CommentImage from "@/public/images/commentImage.png";
import { DobleQuatesIcon } from "@/components/icons";
import React from "react";

interface IProps {
  item: IComment;
}

const CommentItem: React.FC<IProps> = ({ item }) => {
  return (
    <div className="w-full pt-14 pb-10 px-5 relative flex flex-col items-center bg-gray-darker">
      <div className="absolute w-24 h-24 left-0 right-0 mx-auto -top-12 rounded-full">
        <Image src={CommentImage} alt="" />
      </div>
      <span className="text-base text-white-gray font-bold ">
        {item?.fullName}
      </span>
      <span className="text-gray-lighter block mt-1 text-sm font-medium">
        {item?.email}
      </span>
      <span className="mt-5">
        <DobleQuatesIcon width={16} height={12} className="text-primary" />
      </span>
      <p className="mt-5 text-center text-gray-lighter">{item?.text}</p>
    </div>
  );
};
export default CommentItem;
