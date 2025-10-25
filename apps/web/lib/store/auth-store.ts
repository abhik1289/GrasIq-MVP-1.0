import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface IUserAuthentication {
  id: string;
  firstname: string;
  role: string;
  isSignIn: boolean;
  signIn: (id: string, firstname: string, role: string) => void;
  signOut: () => void;
}

export const useUserData = create<IUserAuthentication>()(
  persist(
    immer((set) => ({
      id: "",
      firstname: "",
      role: "",
      isSignIn: false,
      signIn: (id, firstname, role) => {
        set((state) => {
          state.id = id;
          state.firstname = firstname;
          state.role = role;
          state.isSignIn = true;
        });
      },
      signOut: () => {
        set((state) => {
          state.id = "";
          state.firstname = "";
          state.role = "";
          state.isSignIn = false;
        });
      },
    })),
    {
      name: "userInfo", 
    }
  )
);
