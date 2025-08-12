import { create } from 'zustand';

export const useTimerStore = create((set) => ({
  birthDate: null,
  showWeeks: true,
  setBirthDate: (date) => set({ birthDate: date }),
  toggleMode: () => set((s) => ({ showWeeks: !s.showWeeks })),
}));
