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
