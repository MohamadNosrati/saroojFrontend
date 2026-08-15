import { IFile } from "../types/file";

export const uploadUrl = (image: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${image}`;
};

export const userUploadUrl = (pictureId: string | IFile) => {
  if (typeof pictureId === "string") {
    return pictureId;
  } else {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}uploads/${pictureId?.image}`;
  }
};
