import { create } from "zustand";

export interface UserStoreInterface {
  user?: {
    id?: string;
    name?: string;
    image?: string;
  };
  isLoggedIn: boolean;
  setUser: (user: {}) => void;
  unsetUser: (user: {}) => void;
}

const useUserStore = create<UserStoreInterface>((set) => ({
  user: {},
  isLoggedIn: false,

  setUser: (user: {}) => set({ isLoggedIn: true, user }),
  unsetUser: (user: {}) => set({ isLoggedIn: false, user }),
}));

export default useUserStore;
