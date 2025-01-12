import { create } from 'zustand';

export type Language = 'en' | 'pl';

interface Preferences {
  routePreference: 'foot' | 'bike';
  language: Language;
}

interface AuthData {
  email: string;
  id: number;
  token: string;
}

export interface AppState {
  preferences: Preferences;
  authData: AuthData | null;
}

interface Action {
  setRoutePreference: (tripPreference: AppState['preferences']['routePreference']) => void;
  setLanguage: (language: AppState['preferences']['language']) => void;
  setAuthData: (authData: AppState['authData']) => void;
}

export const useAppStore = create<AppState & Action>((set) => ({
  preferences: {
    routePreference: 'foot',
    language: 'pl',
  },
  authData: null,
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
  setAuthData: (authData: AppState['authData']) => set({ authData }),
}));
