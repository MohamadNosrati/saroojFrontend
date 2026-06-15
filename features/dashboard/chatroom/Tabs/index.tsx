import { Button } from "@heroui/button";
import React, { Dispatch, SetStateAction, useState } from "react";

import Contacts from "./Contacts";
import Conversations from "./Conversations";

import { CustomWhen } from "@/components/ui/CustomWhen";
import { IUser } from "@/lib/types/user";
import { IConversation } from "@/lib/types/conversation";
import { useGetConversations } from "@/lib/hooks/conversation";
import { useAuthStore } from "@/lib/stores/auth";

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
    <div className="flex w-full h-full overflow-auto relative bg-gray-darker">
      <div className="flex flex-col relative w-full ">
        <div className="flex sticky top-0">
          {tabs?.map((item, index) => (
            <Button
              key={index}
              className="grow rounded-none"
              color="success"
              variant={item?.key === selected ? "solid" : "ghost"}
              onPress={() => setSelected(item?.key)}
            >
              {item?.label}
            </Button>
          ))}
        </div>
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
