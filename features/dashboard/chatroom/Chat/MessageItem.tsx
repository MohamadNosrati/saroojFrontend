import { useAuthStore } from "@/lib/stores/auth";
import { dateConvertor, timeConvertor } from "@/lib/tools/dateConvertor";
import { IMessage } from "@/lib/types/message";
import clsx from "clsx";

interface IProps {
  item: IMessage;
}

const MessageItem: React.FC<IProps> = ({ item }) => {
  const user = useAuthStore((state) => state?.user);
  return (
    <div
      className={clsx([
        "text-white flex items-center gap-1.5",
        item?.senderId === user?.id
          ? "self-start"
          : "self-end flex-row-reverse",
      ])}
    >
      <div className="bg-emerald-600 p-3 rounded-xl max-w-xs break-words">
        <span className="font-bold">{item?.content}</span>
      </div>
      <div>
        <span className="text-xs text-gray-400">
          {timeConvertor(item?.createdAt as number)}
        </span>
      </div>
    </div>
  );
};
export default MessageItem;
