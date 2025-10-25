import { create } from 'zustand';

export const useAuthToken = create<{ accessToken: string | null; setToken: (t: string) => void }>((set) => ({
  accessToken: null,
  setToken: (accessToken) => set({ accessToken }),
}));