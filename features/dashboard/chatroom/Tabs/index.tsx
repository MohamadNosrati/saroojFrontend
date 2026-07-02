import { Button } from "@heroui/button";
import React, { Dispatch, SetStateAction, useState } from "react";
import clsx from "clsx";

import { CustomWhen } from "@/components/ui/CustomWhen";
import { IUser } from "@/lib/types/user";
import { IConversation } from "@/lib/types/conversation";
import { useGetConversations } from "@/lib/hooks/conversation";
import { useAuthStore } from "@/lib/stores/auth";

import Conversations from "./Conversations";
import Contacts from "./Contacts";

type TTabType = "conversations" | "contacts";
type TabItem = {
  label: string;
  key: TTabType;
};

const tabs: TabItem[] = [
  {
    key: "conversations",
    label: "چت ها",
  },
  {
    key: "contacts",
    label: "مخاطبین",
  },
];

interface IProps {
  selectedContact?: IUser;
  setSelectedContact: Dispatch<SetStateAction<IUser | undefined>>;
  selectedConversation?: IConversation;
  setSelectedConversation: Dispatch<SetStateAction<IConversation | undefined>>;
}

const Tabs: React.FC<IProps> = ({
  selectedContact,
  setSelectedContact,
  selectedConversation,
  setSelectedConversation,
}) => {
  const [selected, setSelected] = useState<TTabType>("conversations");
  const user = useAuthStore((state) => state?.user);
  const { data } = useGetConversations(user?.id);
  const converstions = data?.data?.map((item) => {
    const otherUser = item?.participants?.find((elem) => elem?.id !== user?.id);

    item.otherUser = otherUser as {
      id: string;
      userName: string;
      pictureId: {
        id: string;
        image: string;
      };
    };

    return item;
  });

  return (
    <div className="flex flex-col w-full h-full relative overflow-hidden">
      {/* Tab Controls Header */}
      <div className="p-3 border-b border-slate-800 bg-slate-900/40">
        <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 gap-1">
          {tabs?.map((item, index) => {
            const isActive = item?.key === selected;

            return (
              <Button
                key={index}
                className={clsx(
                  "grow h-9 rounded-lg font-bold text-xs transition-all duration-200",
                  isActive
                    ? "bg-primary text-slate-950 shadow-md shadow-primary/20 font-extrabold"
                    : "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40",
                )}
                onPress={() => setSelected(item?.key)}
              >
                {item?.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content Panel */}
      <div className="grow overflow-y-auto custom-scrollbar p-2 space-y-1">
        <CustomWhen condition={selected === "contacts"}>
          <Contacts
            conversations={converstions || []}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
            setSelectedConversation={setSelectedConversation}
          />
        </CustomWhen>

        <CustomWhen condition={selected === "conversations"}>
          <Conversations
            conversations={converstions || []}
            selectedConversation={selectedConversation}
            setSelectedContact={setSelectedContact}
            setSelectedConversation={setSelectedConversation}
          />
        </CustomWhen>
      </div>
    </div>
  );
};

export default Tabs;
