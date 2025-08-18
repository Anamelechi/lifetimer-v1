import { create } from 'zustand';

export const useTimerStore = create((set) => ({
  birthDate: null,
  setBirthDate: (date) => set({ birthDate: date }),
  // Birth location
  birthCountry: '',
  birthCity: '',
  setBirthCountry: (country) => set({ birthCountry: country }),
  setBirthCity: (city) => set({ birthCity: city }),
  birthTimeZone: '',
  setBirthTimeZone: (tz) => set({ birthTimeZone: tz }),
  // Current location
  currentCountry: '',
  currentCity: '',
  setCurrentCountry: (country) => set({ currentCountry: country }),
  setCurrentCity: (city) => set({ currentCity: city }),
  currentTimeZone: '',
  setCurrentTimeZone: (tz) => set({ currentTimeZone: tz }),
  deviceType: null, // 'ios' | 'android'
  setDeviceType: (type) => set({ deviceType: type }),
}));
