type TLanguage = "persian" | "english" | "arabic"

interface ICommentPayload {
  fullName: string;
  email: string;
  text: string;
  type: TLanguage;
}

interface IComment {
  id: string;
  fullName: string;
  email: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  type: TLanguage;
}

interface IUpdateCommentPayload extends Partial<ICommentPayload> {
  id: string;
}
