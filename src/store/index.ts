import { create } from 'zustand';

export type Language = 'en' | 'pl';

interface Preferences {
  routePreference: 'foot' | 'bike';
  language: Language;
}

export interface AppState {
  preferences: Preferences;
}

interface Action {
  setRoutePreference: (tripPreference: AppState['preferences']['routePreference']) => void;
  setLanguage: (language: AppState['preferences']['language']) => void;
}

export const useAppStore = create<AppState & Action>((set) => ({
  preferences: {
    routePreference: 'foot',
    language: 'pl',
  },
  setRoutePreference: (routePreference: AppState['preferences']['routePreference']) =>
    set((prev) => ({
      preferences: {
        ...prev.preferences,
        routePreference: routePreference,
      },
    })),
  setLanguage: (language: AppState['preferences']['language']) =>
    set((prev) => ({
      preferences: {
        ...prev.preferences,
        language: language,
      },
    })),
}));
