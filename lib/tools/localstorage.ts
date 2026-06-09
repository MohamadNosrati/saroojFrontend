import { IUser } from "../types/user";

const STORAGE_KEY = process.env.NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY;

const getUser = (): IUser | undefined => {
  if (typeof window === "undefined" || !STORAGE_KEY) {
    return undefined;
  }

  try {
    const user = localStorage.getItem(STORAGE_KEY);

    if (!user) {
      return undefined;
    }

    return JSON.parse(user) as IUser;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return undefined;
  }
};

export default getUser;