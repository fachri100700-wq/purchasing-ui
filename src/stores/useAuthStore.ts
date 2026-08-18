import { create } from "zustand";
import type { UserData } from "../types/ApiResponse";

type UseAuthStore = {
  user: UserData | null;
  setAuth: (data: UserData) => void;
  clearAuth: () => void;
};

const useAuthStore = create<UseAuthStore>((set) => ({
  user: null,
  setAuth: (data) => {
    set({ user: data });
  },
  clearAuth: () => {
    set({ user: null });
  },
}));

export default useAuthStore;