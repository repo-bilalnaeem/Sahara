import { create } from "zustand";

interface CallState {
  isCallActive: boolean;
  setCallActive: (active: boolean) => void;
}

export const useCallStore = create<CallState>((set) => ({
  isCallActive: false,
  setCallActive: (active) => set({ isCallActive: active }),
}));
