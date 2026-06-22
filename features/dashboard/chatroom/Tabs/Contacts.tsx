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
    <div className="flex flex-col h-full w-full">
      <CustomWhen condition={!isLoading}>
        <div className="flex flex-col w-full gap-1">
          {otherUsers?.map((item) => {
            const isSelected = item?.id === selectedContact?.id;
            return (
              <button
                key={item?.id}
                className={clsx(
                  "w-full gap-3 p-3 flex items-center rounded-xl transition-all duration-200 text-right group outline-none",
                  isSelected
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "border border-transparent text-slate-300 hover:bg-slate-800/40 hover:text-slate-100",
                )}
                onClick={() => handleClick(item)}
              >
                {/* Avatar Frame */}
                <div
                  className={clsx(
                    "relative flex shrink-0 justify-center items-center size-10 rounded-full overflow-hidden bg-slate-800 transition-transform duration-200 group-hover:scale-105",
                    isSelected
                      ? "ring-2 ring-primary/40"
                      : "ring-1 ring-slate-700/50",
                  )}
                >
                  <CustomWhen condition={Boolean(item?.pictureId?.image)}>
                    <Image
                      alt={item?.userName || ""}
                      className="rounded-full size-full object-cover"
                      height={40}
                      src={uploadUrl(item?.pictureId?.image)}
                      width={40}
                    />
                  </CustomWhen>
                  <CustomWhen condition={!Boolean(item?.pictureId?.image)}>
                    <span className="text-xs font-bold text-slate-400">
                      {item?.userName?.slice(0, 2)}
                    </span>
                  </CustomWhen>
                </div>

                {/* Content info */}
                <div className="flex flex-col overflow-hidden grow">
                  <span
                    className={clsx(
                      "text-sm tracking-wide truncate transition-colors",
                      isSelected
                        ? "font-bold text-primary"
                        : "font-medium text-slate-200 group-hover:text-slate-100",
                    )}
                  >
                    {item?.userName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </CustomWhen>

      <CustomWhen condition={isLoading}>
        <div className="flex grow items-center justify-center p-6">
          <Spinner size="md" color="primary" />
        </div>
      </CustomWhen>
    </div>
  );
};

export default Contacts;
