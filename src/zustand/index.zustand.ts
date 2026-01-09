import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // 1. Import middleware persist

import type {
  SpreadType,
  TabId,
  ThemeMode,
  UserProfile,
  JournalEntry, // Import type mới
} from "@/types/index.type";
import { getLifePathNumber, getZodiacSign } from "@/utils/mysticHelper";

type AppState = {
  theme: ThemeMode;
  activeTab: TabId;
  userProfile: UserProfile;
  selectedSpread: SpreadType | null;

  // --- Thêm State cho Journal ---
  journal: JournalEntry[];

  // Actions cũ
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  setActiveTab: (tab: TabId) => void;
  setUserProfile: (profile: UserProfile) => void;
  updateUserProfile: (partial: Partial<UserProfile>) => void;
  setSelectedSpread: (spread: SpreadType | null) => void;

  // --- Thêm Actions cho Journal ---
  addJournalEntry: (
    entry: Omit<JournalEntry, "id" | "date" | "timestamp">
  ) => void;
  removeJournalEntry: (id: string) => void;
};

// 2. Bọc create trong persist
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "dark",
      // currentScreen: "onboarding", // (Lưu ý: Bạn có dòng này trong code cũ nhưng chưa khai báo trong type, tôi giữ nguyên logic của bạn)
      activeTab: "home",
      userProfile: {
        name: "Seeker",
        gender: "male",
        dob: { day: "01", month: "01", year: "2000" },
        zodiac: "Capricorn",
        lifePathNumber: "7",
      },
      selectedSpread: null,

      // Khởi tạo mảng rỗng
      journal: [],

      setTheme: (mode) => set({ theme: mode }),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setUserProfile: (profile) =>
        set(() => {
          // Tự động tính toán lại khi set profile mới
          const zodiac = getZodiacSign(profile.dob.day, profile.dob.month);
          const lifePathNumber = getLifePathNumber(
            profile.dob.day,
            profile.dob.month,
            profile.dob.year
          );

          return {
            userProfile: { ...profile, zodiac, lifePathNumber },
          };
        }),
      updateUserProfile: (partial) =>
        set((state) => {
          // Merge dữ liệu cũ và mới
          const newProfile = { ...state.userProfile, ...partial };

          // Nếu người dùng có cập nhật ngày sinh (partial chứa dob) -> Tính lại
          if (partial.dob) {
            newProfile.zodiac = getZodiacSign(
              newProfile.dob.day,
              newProfile.dob.month
            );
            newProfile.lifePathNumber = getLifePathNumber(
              newProfile.dob.day,
              newProfile.dob.month,
              newProfile.dob.year
            );
          }

          return { userProfile: newProfile };
        }),
      setSelectedSpread: (spread) => set({ selectedSpread: spread }),

      // --- Logic thêm Journal ---
      addJournalEntry: (entryData) =>
        set((state) => {
          const now = new Date();
          const newEntry: JournalEntry = {
            id: crypto.randomUUID(), // Tạo ID ngẫu nhiên
            date: now.toLocaleDateString("vi-VN"), // Format ngày Việt Nam
            timestamp: now.getTime(),
            ...entryData,
          };

          // Thêm vào đầu danh sách (mới nhất lên trên)
          return { journal: [newEntry, ...state.journal] };
        }),

      // --- Logic xóa Journal ---
      removeJournalEntry: (id) =>
        set((state) => ({
          journal: state.journal.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "tarot-app-storage", // Tên key trong LocalStorage
      storage: createJSONStorage(() => localStorage), // Nơi lưu trữ
      // (Tuỳ chọn) Chỉ định những field nào muốn lưu, nếu không nó sẽ lưu hết state
      // partialize: (state) => ({ journal: state.journal, theme: state.theme, userProfile: state.userProfile }),
    }
  )
);
