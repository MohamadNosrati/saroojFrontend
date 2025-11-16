import Image from "next/image";
import CommentImage from "@/public/images/commentImage.png";
import { DobleQuatesIcon } from "@/components/icons";

const CommentItem = () => {
  return (
    <div className="w-full pt-14 pb-10 px-5 relative flex flex-col items-center bg-gray-darker">
      <div className="absolute w-24 h-24 left-0 right-0 mx-auto -top-12 rounded-full">
        <Image src={CommentImage} alt="" />
      </div>
      <span className="text-base text-white-gray font-bold ">
        Sahra Rostami
      </span>
      <span className="text-gray-lighter block mt-1 text-sm font-medium">
        Itszahrarostami@gmail.com
      </span>
      <span className="mt-5">
        <DobleQuatesIcon width={16} height={12} className="text-primary" />
      </span>
      <p className="mt-5 text-center">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean Lorem ipsum dolor sit amet, consectetuer
        adipiscing elit. Aenean
      </p>
    </div>
  );
};
export default CommentItem;
