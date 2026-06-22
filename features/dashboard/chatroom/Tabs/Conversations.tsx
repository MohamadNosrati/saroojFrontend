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
    <div className="flex flex-col w-full gap-1">
      {conversations?.map((item) => {
        const isSelected = item?.id === selectedConversation?.id;

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
            {/* Conversation Avatar */}
            <div
              className={clsx(
                "relative flex shrink-0 justify-center items-center size-10 rounded-full overflow-hidden bg-slate-800 transition-transform duration-200 group-hover:scale-105",
                isSelected
                  ? "ring-2 ring-primary/40"
                  : "ring-1 ring-slate-700/50",
              )}
            >
              <CustomWhen
                condition={Boolean(item?.otherUser?.pictureId?.image)}
              >
                <Image
                  alt={item?.otherUser?.userName || ""}
                  className="rounded-full size-full object-cover"
                  height={40}
                  src={uploadUrl(item?.otherUser?.pictureId?.image as string)}
                  width={40}
                />
              </CustomWhen>
              <CustomWhen
                condition={!Boolean(item?.otherUser?.pictureId?.image)}
              >
                <span className="text-xs font-bold text-slate-400">
                  {item?.otherUser?.userName?.slice(0, 2)}
                </span>
              </CustomWhen>
            </div>

            {/* Username/Meta Title */}
            <div className="flex flex-col overflow-hidden grow">
              <span
                className={clsx(
                  "text-sm tracking-wide truncate transition-colors",
                  isSelected
                    ? "font-bold text-primary"
                    : "font-medium text-slate-200 group-hover:text-slate-100",
                )}
              >
                {item?.otherUser?.userName}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Conversations;
