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
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        <div className="bg-sky-400 rounded-4xl px-4 py-2.5 mb-4">
          <span>{toPersianReadable(item?.date)}</span>
        </div>
      </div>
      <div className="flex gap-1.5 flex-col">
        {item?.messages?.map((elem) => (
          <div
            key={elem?.id}
            className={clsx([
              "text-white flex items-center gap-1.5",
              elem?.senderId === user?.id
                ? "self-start"
                : "self-end flex-row-reverse",
            ])}
          >
            <div className="bg-emerald-600 px-2 py-1 rounded-xl max-w-xs break-words">
              <span className="font-bold text-sm">{elem?.content}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400">
                {timeConvertor(elem?.createdAt as number)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageItem;
