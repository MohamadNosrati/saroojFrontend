import type { ILastMessage } from "./message.js";

export enum ConversationType {
  PRIVATE = "private",
  GROUP = "group",
  CHANNEL = "channel",
}

export interface IConversation {
  id: string;

  // Basic info
  type: ConversationType;
  participants: {
    id: string;
    userName: string;
  }[];


  otherUser?: {
    id: string;
    userName: string;
    pictureId: {
      id: string;
      image: string;
    };
  };

  // Group specific
  groupName?: string;
  groupAvatar?: string;
  groupDescription?: string;
  adminIds?: string[];

  // Channel specific (if needed)
  channelName?: string;
  isPublic?: boolean;

  // Last message (denormalized for quick display)
  lastMessage?: ILastMessage;

  // Unread counts per user

  // Settings
  settings?: {
    muteNotifications?: boolean;
    pinMessage?: string;
    theme?: string;
  };

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
