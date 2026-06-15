import { useQueryClient } from "@tanstack/react-query";
import { GroupedMessageItem, IMessage } from "../types/message";
const getDateKey = (timestamp: string | number | Date) =>
  new Date(timestamp).toISOString().split("T")[0];

const useUpdateCache = () => {
  const queryClient = useQueryClient();
  const updateCache = (
    key: string,
    newMessage: IMessage,
    grouped?: boolean,
  ) => {
    queryClient.setQueryData([key], (old: any) => {
      if (!old) return old;

      if (grouped) {
        // old.data.data should be an array of { date, messages, count }
        const groups: GroupedMessageItem[] = old.data?.data || [];
        const messageDate = getDateKey(newMessage?.createdAt as number);
        const groupIndex = groups.findIndex(
          (g: GroupedMessageItem) => g.date === messageDate,
        );

        if (groupIndex !== -1) {
          // Add to existing group
          const updatedGroups = [...groups];
          updatedGroups[groupIndex] = {
            ...updatedGroups[groupIndex],
            messages: [...updatedGroups[groupIndex].messages, newMessage],
          };
          return {
            ...old,
            data: { ...old.data, data: updatedGroups },
          };
        } else {
          // Create new group and insert in chronological order
          const newGroup : GroupedMessageItem = {
            date: messageDate,
            messages: [newMessage],
          };
          const newGroups = [...groups, newGroup];
          return {
            ...old,
            data: { ...old.data, data: newGroups },
          };
        }
      } else {
        // Flat array mode
        return {
          ...old,
          data: {
            ...old.data,
            data: [...(old.data?.data || []), newMessage],
          },
        };
      }
    });
  };

  return { updateCache };
};

export default useUpdateCache;
