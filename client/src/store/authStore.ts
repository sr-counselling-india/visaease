import { create } from "zustand";
import { User } from "firebase/auth";
import { AuthService } from "@/config/firebaseConfig";

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  initialize: () => () => void; // Returns unsubscribe function
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logout: async () => {
    try {
        await AuthService.logout();
        set({ user: null });
    } catch (error) {
        console.error("Logout failed", error);
    }
  },
  initialize: () => {
    set({ loading: true });
    const unsubscribe = AuthService.onAuthChange((user) => {
      set({ user, loading: false });
    });
    return unsubscribe;
  },
}));