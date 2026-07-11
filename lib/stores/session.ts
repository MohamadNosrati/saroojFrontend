import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGENAME = "session-storage";

// If you installed uuid:
import { v4 as uuidv4 } from "uuid";
interface SessionState {
  sessionId: string | null;
  generateSessionId: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessionId: null,

      generateSessionId: () => {
        // Only generate if it doesn't already exist
        if (!get().sessionId) {
          // Option 2: using uuid package
          const newId = uuidv4();

          set({ sessionId: newId });
        }
      },
    }),
    {
      name: STORAGENAME, // unique key for storage
      storage: createJSONStorage(() => sessionStorage), // ✅ wrap wi
      // For persistent across browser restarts, use localStorage instead:
      // getStorage: () => localStorage,
    },
  ),
);
