import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { CustomWhen } from "@/components/ui/CustomWhen";
import { uploadUrl } from "@/lib/tools/upload";
import { IConversation } from "@/lib/types/conversation";
import { IUser } from "@/lib/types/user";

interface IProps {
  selectedConversation?: IConversation;
  setSelectedConversation: Dispatch<SetStateAction<IConversation | undefined>>;
  setSelectedContact: Dispatch<SetStateAction<IUser | undefined>>;
  conversations: IConversation[];
}

const Conversations: React.FC<IProps> = ({
  setSelectedConversation,
  selectedConversation,
  conversations,
}) => {
  const handleClick = (item: IConversation) => {
    setSelectedConversation(item);
    // setSelectedContact(undefined);
  };

  return (
    <div className="flex flex-col">
      {conversations?.map((item) => (
        <button
          key={item?.id}
          className={clsx(
            " gap-2 p-2 flex items-center border-1 border-black",
            item?.id === selectedConversation?.id ? "bg-warning" : "",
          )}
          onClick={() => handleClick(item)}
        >
          <div className="flex items-center gap-2.5 text-white   size-10 rounded-full bg-dark ">
            <CustomWhen condition={Boolean(item?.otherUser?.pictureId?.image)}>
              <Image
                alt=""
                className="rounded-full size-full"
                height={40}
                src={uploadUrl(item?.otherUser?.pictureId?.image as string)}
                width={40}
              />
            </CustomWhen>
          </div>
          <span className="text-white">{item?.otherUser?.userName}</span>
        </button>
      ))}
    </div>
  );
};

export default Conversations;
