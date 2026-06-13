// import { create } from "zustand";
// import getUser from "../tools/localstorage";
// import { IUser } from "../types/user";

// const STORAGE_KEY = process.env.NEXT_PUBLIC_USER_LOCAL_STORAGE_KEY;

// interface IAuthStore {
//   user: IUser | undefined;
//   setUser: (user: IUser) => void;
//   clearUser: () => void;
//   hydrateUser: () => void;
// }

// export const useAuthStore = create<IAuthStore>((set) => ({
//   user: undefined,
//   setUser: (user) => {
//     if (typeof window !== "undefined" && STORAGE_KEY) {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
//     }

//     set({ user });
//   },
//   clearUser: () => {
//     if (typeof window !== "undefined" && STORAGE_KEY) {
//       localStorage.removeItem(STORAGE_KEY);
//     }

//     set({ user: undefined });
//   },
//   hydrateUser: () => {
//     set({ user: getUser() });
//   },
// }));

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuthStore } from "../types/auth";

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: undefined }),
    }),
    {
      name: "user-storage",
    },
  ),
);
