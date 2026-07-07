interface ICommentPayload {
  fullName: string;
  email: string;
  text: string;
  type: "persian" | "english";
}

interface IComment {
  id: string;
  fullName: string;
  email: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  type: "persian" | "english";
}

interface IUpdateCommentPayload extends Partial<ICommentPayload> {
  id: string;
}
