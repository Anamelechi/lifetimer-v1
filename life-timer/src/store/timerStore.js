import { create } from 'zustand';

export const useTimerStore = create((set) => ({
  birthDate: null,
  setBirthDate: (date) => set({ birthDate: date }),
}));
