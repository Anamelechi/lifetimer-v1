import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Goal types
// - age: countdown to a specific age (requires birthDate from timerStore)
// - event: countdown to a specific ISO date/time
// - year: countdown to Jan 1 of a given year
// - custom: countdown to an arbitrary ISO date/time with custom label

export const useGoalsStore = create(
  persist(
    (set, get) => ({
      goals: [],
      addGoal: (goal) => set((s) => ({ goals: [...s.goals, { id: crypto.randomUUID(), createdAt: Date.now(), ...goal }] })),
      updateGoal: (id, patch) => set((s) => ({ goals: s.goals.map(g => g.id === id ? { ...g, ...patch } : g) })),
      removeGoal: (id) => set((s) => ({ goals: s.goals.filter(g => g.id !== id) })),
      clearGoals: () => set({ goals: [] }),
    }),
    {
      name: 'life-timer:goals',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Helpers
export function computeTargetDate(goal, birthDate) {
  if (!goal) return null;
  const type = goal.type;
  if (type === 'event' || type === 'custom') {
    const d = new Date(goal.targetIso);
    return isNaN(d) ? null : d;
  }
  if (type === 'year') {
    const y = parseInt(goal.year, 10);
    if (!y) return null;
    return new Date(y, 0, 1, 0, 0, 0, 0);
  }
  if (type === 'age') {
    if (!birthDate) return null;
    const age = parseInt(goal.age, 10);
    if (!Number.isFinite(age)) return null;
    const b = new Date(birthDate);
    return new Date(b.getFullYear() + age, b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds(), 0);
  }
  return null;
}

export function diffTo(target) {
  if (!target) return null;
  const now = new Date();
  const ms = target - now;
  const past = ms < 0;
  const abs = Math.abs(ms);
  const totalSeconds = Math.floor(abs / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);
  return { past, days, hours, minutes, seconds, totalSeconds };
}
