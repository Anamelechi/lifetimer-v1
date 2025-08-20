import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useTimerStore = create(
  persist(
    (set, get) => ({
  // Personal
  fullName: '',
  setFullName: (name) => set({ fullName: name }),

  // Core birth date/time (Date in local time)
  birthDate: null,
  setBirthDate: (date) => set({ birthDate: date }),

  // Birth location details
  birthCountry: '',
  birthCity: '',
  birthLat: null,
  birthLon: null,
  birthTimeZone: '', // IANA, e.g., Europe/Rome
  birthUtcOffsetSeconds: null, // offset at birth moment

  // Current location details
  currentCountry: '',
  currentCity: '',
  currentLat: null,
  currentLon: null,
  currentTimeZone: '',
  currentUtcOffsetSeconds: null,

  // Bulk setter helpers
  setBirthLocation: (info) => set((state) => ({
    birthCountry: info.birthCountry ?? state.birthCountry,
    birthCity: info.birthCity ?? state.birthCity,
    birthLat: info.birthLat ?? state.birthLat,
    birthLon: info.birthLon ?? state.birthLon,
    birthTimeZone: info.birthTimeZone ?? state.birthTimeZone,
    birthUtcOffsetSeconds: info.birthUtcOffsetSeconds ?? state.birthUtcOffsetSeconds,
  })),
  setCurrentLocation: (info) => set((state) => ({
    currentCountry: info.currentCountry ?? state.currentCountry,
    currentCity: info.currentCity ?? state.currentCity,
    currentLat: info.currentLat ?? state.currentLat,
    currentLon: info.currentLon ?? state.currentLon,
    currentTimeZone: info.currentTimeZone ?? state.currentTimeZone,
    currentUtcOffsetSeconds: info.currentUtcOffsetSeconds ?? state.currentUtcOffsetSeconds,
  })),

  deviceType: null, // 'ios' | 'android'
  setDeviceType: (type) => set({ deviceType: type }),
    }),
    {
      name: 'life-timer:store',
      storage: createJSONStorage(() => localStorage),
      // Persist only the fields we need across sessions
      partialize: (state) => ({
        fullName: state.fullName,
        birthDate: state.birthDate,
        birthCountry: state.birthCountry,
        birthCity: state.birthCity,
        birthLat: state.birthLat,
        birthLon: state.birthLon,
        birthTimeZone: state.birthTimeZone,
        birthUtcOffsetSeconds: state.birthUtcOffsetSeconds,
        currentCountry: state.currentCountry,
        currentCity: state.currentCity,
        currentLat: state.currentLat,
        currentLon: state.currentLon,
        currentTimeZone: state.currentTimeZone,
        currentUtcOffsetSeconds: state.currentUtcOffsetSeconds,
        deviceType: state.deviceType,
      }),
    }
  )
);
