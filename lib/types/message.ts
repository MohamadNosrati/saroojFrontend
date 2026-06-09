
export enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    VIDEO = "video",
    FILE = "file",
    AUDIO = "audio",
    LOCATION = "location",
    SYSTEM = "system",
    DELETED = "deleted"
  }
  
  export enum MessageStatus {
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read",
    FAILED = "failed",
    SENDING="sending"
  }
  
  // ============ SUB-INTERFACES ============
  export interface IAttachment {
    url: string;
    type: string;
    name: string;
    size: number;
    mimeType: string;
    thumbnail?: string; // Optional thumbnail URL
  }
  
  export interface IReaction {
    userId:  string;
    reaction: string; // Emoji or reaction type
    timestamp: Date;
  }
  
  export interface IMessageStatus {
    status:MessageStatus;
    readAt?: Date;
    deliveredAt?: Date;
  }
  
  export interface IReplyTo {
    messageId:  string;
    content: string;
    senderId?:  string; // Optional: who wrote the original
  }
  
  export interface IEditHistory {
    content: string;
    editedAt: Date;
  }
  
  export interface IMessageMetadata {
    ip?: string;
    userAgent?: string;
    platform?: string;
  }
  
  export interface ILastMessage {
    content: string;
    senderId: string;
    timestamp: number;
    type: MessageType;
  }


export interface IMessagePayload {
    content: string;
}

export interface IMessage {
    id?:  string;
    

    conversationId?:string;
    
    // Sender info
    senderId: string;
    senderName?: string; // Denormalized
    senderAvatar?: string; // Denormalized
    
    // Content
    content: string;
    type: MessageType;
    otherUserId?: string;
    
    // Attachments
    attachments?: IAttachment[];
    
    // Status
    status: IMessageStatus;
    
    // Reactions
    reactions?: IReaction[];
    
    // Reply feature
    replyTo?: IReplyTo;
    
    // Edit feature
    edited?: boolean;
    editedAt?: Date;
    editHistory?: IEditHistory[];
    
    // Delete feature
    deleted?: boolean;
    deletedFor?: string[]; // Users who deleted this message
    deletedAt?: number;
    
    // Metadata
    metadata?: IMessageMetadata;
    
    // Timestamps
    createdAt?: number;
    updatedAt?: number;
  }
  