import clsx from "clsx";

import { useAuthStore } from "@/lib/stores/auth";
import { timeConvertor, toPersianReadable } from "@/lib/tools/dateConvertor";
import { GroupedMessageItem } from "@/lib/types/message";

interface IProps {
  item: GroupedMessageItem;
}

const MessageItem: React.FC<IProps> = ({ item }) => {
  const user = useAuthStore((state) => state?.user);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Date Timeline Divider */}
      <div className="flex items-center justify-center my-2 position-relative w-full">
        <div className="absolute w-full h-[1px] bg-slate-800/60 left-0 top-1/2 -z-10" />
        <span className="bg-slate-950 px-4 py-1 rounded-full text-xs text-slate-400 font-bold border border-slate-800 shadow-sm">
          {toPersianReadable(item?.date)}
        </span>
      </div>

      {/* Chat Message Rows */}
      <div className="flex gap-2 flex-col w-full">
        {item?.messages?.map((elem) => {
          // Determine if current user is the author of this message entry
          const isMe = elem?.senderId === user?.id;

          return (
            <div
              key={elem?.id}
              className={clsx(
                "flex items-end gap-2 max-w-[75%] group",
                isMe ? "self-start flex-row" : "self-end flex-row-reverse",
              )}
            >
              {/* Main Bubble */}
              <div
                className={clsx(
                  "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm break-words border",
                  isMe
                    ? "bg-primary border-primary/20 text-slate-950 font-medium rounded-br-sm"
                    : "bg-slate-900 border-slate-800 text-slate-100 font-medium rounded-bl-sm",
                )}
              >
                <span>{elem?.content}</span>
              </div>

              {/* Timing Label */}
              <div className="mb-1 shrink-0">
                <span className="text-[10px] font-medium text-slate-500 opacity-80 select-none group-hover:opacity-100 transition-opacity">
                  {timeConvertor(elem?.createdAt as number)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageItem;
