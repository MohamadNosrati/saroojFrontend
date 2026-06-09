import { CustomWhen } from "@/components/ui/CustomWhen";
import { useGetConversations } from "@/lib/hooks/conversation";
import { useGetUser } from "@/lib/hooks/user";
import getUser from "@/lib/tools/localstorage";
import { uploadUrl } from "@/lib/tools/upload";
import { IConversation } from "@/lib/types/conversation";
import { IUser } from "@/lib/types/user";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  selectedConversation?: IConversation;
  setSelectedConversation: Dispatch<SetStateAction<IConversation | undefined>>;
  setSelectedContact: Dispatch<SetStateAction<IUser | undefined>>;
  conversations:IConversation[];
}

const Conversations: React.FC<IProps> = ({
  setSelectedConversation,
  selectedConversation,
  setSelectedContact,
  conversations
}) => {


  const handleClick = (item: IConversation) => {
    setSelectedConversation(item);
    // setSelectedContact(undefined);
  };

  return (
    <div className="flex flex-col">
      {conversations?.map((item) => (
        <button
          onClick={() => handleClick(item)}
          key={item?.id}
          className={clsx(
            " gap-2 p-2 flex items-center border-1 border-black",
            item?.id === selectedConversation?.id ? "bg-warning" : "",
          )}
        >
          <div className="flex items-center gap-2.5 text-white   size-10 rounded-full bg-dark ">
            <CustomWhen condition={Boolean(item?.otherUser?.pictureId?.image)}>
              <Image
                alt=""
                src={uploadUrl(item?.otherUser?.pictureId?.image as string)}
                width={40}
                height={40}
                className="rounded-full size-full"
              />
            </CustomWhen>
          </div>
          <span>{item?.otherUser?.userName}</span>
        </button>
      ))}
    </div>
  );
};

export default Conversations;
