import { Spinner } from "@heroui/spinner";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { CustomWhen } from "@/components/ui/CustomWhen";
import { useGetUsers } from "@/lib/hooks/user";
import { useAuthStore } from "@/lib/stores/auth";
import { uploadUrl } from "@/lib/tools/upload";
import { IConversation } from "@/lib/types/conversation";
import { IUser } from "@/lib/types/user";

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
  const user = useAuthStore((state) => state?.user);
  const otherUsers = data?.data?.filter((item) => item?.id !== user?.id);
  const conversationsOtherUserIds = conversations?.map(
    (item) => item?.otherUser?.id,
  );

  const handleClick = (item: IUser) => {
    setSelectedContact(item);
    if (!conversationsOtherUserIds?.includes(item?.id)) {
      setSelectedConversation(undefined);
    } else {
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
              key={item?.id}
              className={clsx(
                " gap-2 p-2 flex items-center border-1 border-black",
                item?.id === selectedContact?.id ? "bg-warning" : "",
              )}
              onClick={() => handleClick(item)}
            >
              <div className="flex items-center gap-2.5 text-white   size-10 rounded-full bg-dark ">
                <CustomWhen condition={Boolean(item?.pictureId?.image)}>
                  <Image
                    alt=""
                    className="rounded-full size-full"
                    height={40}
                    src={uploadUrl(item?.pictureId?.image)}
                    width={40}
                  />
                </CustomWhen>
              </div>
              <span className="text-white">{item?.userName}</span>
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
