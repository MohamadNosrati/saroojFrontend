import { CustomWhen } from "@/components/ui/CustomWhen";
import { useGetUser, useGetUsers } from "@/lib/hooks/user";
import { uploadUrl } from "@/lib/tools/upload";
import { IConversation } from "@/lib/types/conversation";
import { IUser } from "@/lib/types/user";
import { Spinner } from "@heroui/spinner";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  selectedContact?: IUser;
  setSelectedContact: Dispatch<SetStateAction<IUser | undefined>>;
  setSelectedConversation: Dispatch<SetStateAction<IConversation | undefined>>;
  conversations: IConversation[];
}

const Contacts: React.FC<IProps> = ({
  selectedContact,
  setSelectedContact,
  setSelectedConversation,
  conversations,
}) => {
  const { data, isLoading } = useGetUsers();
  const userId = useGetUser()?.id;
  const otherUsers = data?.data?.filter((item) => item?.id !== userId);
  const conversationsOtherUserIds = conversations?.map(
    (item) => item?.otherUser?.id,
  );

  const handleClick = (item: IUser) => {
    setSelectedContact(item);
    if (!conversationsOtherUserIds?.includes(item?.id)) {
      setSelectedConversation(undefined);
    } else {
      console.log("oomd inja")
      setSelectedConversation(
        conversations?.find((elem) => elem?.otherUser?.id === item?.id),
      );
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <CustomWhen condition={!isLoading}>
        <div className="h-full flex flex-col w-full">
          {otherUsers?.map((item) => (
            <button
              onClick={() => handleClick(item)}
              key={item?.id}
              className={clsx(
                " gap-2 p-2 flex items-center border-1 border-black",
                item?.id === selectedContact?.id ? "bg-warning" : "",
              )}
            >
              <div className="flex items-center gap-2.5 text-white   size-10 rounded-full bg-dark ">
                <CustomWhen condition={Boolean(item?.pictureId?.image)}>
                  <Image
                    alt=""
                    src={uploadUrl(item?.pictureId?.image)}
                    width={40}
                    height={40}
                    className="rounded-full size-full"
                  />
                </CustomWhen>
              </div>
              <span>{item?.userName}</span>
            </button>
          ))}
        </div>
      </CustomWhen>
      <CustomWhen condition={isLoading}>
        <Spinner size="lg" />
      </CustomWhen>
    </div>
  );
};

export default Contacts;
