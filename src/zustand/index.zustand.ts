import type {
  SpreadType,
  TabId,
  ThemeMode,
  UserProfile,
} from "@/types/index.type";

import { create } from "zustand";
type AppState = {
  theme: ThemeMode;
  activeTab: TabId;
  userProfile: UserProfile;
  selectedSpread: SpreadType | null;

  // Actions
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setActiveTab: (tab: TabId) => void;
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (partial: Partial<UserProfile>) => void;
  setSelectedSpread: (spread: SpreadType | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  theme: "dark",
  currentScreen: "onboarding",
  activeTab: "home",
  userProfile: {
    name: "Seeker",
    gender: "male",
    dob: { day: "01", month: "01", year: "2000" },
    zodiac: "Bọ Cạp",
    lifePathNumber: "7",
  },
  selectedSpread: null,

  setTheme: (mode) => set({ theme: mode }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  updateUserProfile: (partial) =>
    set((state) => ({ userProfile: { ...state.userProfile, ...partial } })),
  setSelectedSpread: (spread) => set({ selectedSpread: spread }),
}));
