import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

// This is the shape of our store — what it holds and what it can do
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useAuthStore = create<AuthStore>()(
  // persist means — save this to localStorage automatically
  // so if user refreshes the page, they stay logged in
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // called after successful login
      setUser: (user) => set({ user, isAuthenticated: true }),

      // called after logout
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // the localStorage key
    },
  ),
);

export default useAuthStore;
