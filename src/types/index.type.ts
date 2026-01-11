import type { TarrotCard } from "@/data/tarrot.data";
import type { LucideProps } from "lucide-react";

export type ThemeMode = "light" | "dark";
export type TabId = "home" | "journal" | "profile";
export type ScreenId = "onboarding" | "home" | "reading";
export type Gender = "male" | "female" | "other";

export type UserProfile = {
  name: string;
  gender: Gender;
  dob: { day: string; month: string; year: string };
  zodiac: string;
  lifePathNumber: string;
};

export type AdConfig = {
  enabled: boolean;
  bannerText: string;
};

export type SpreadMeanings = {
  daily: string;
  love: string;
  money: string;
  career: string;
  health: string;
  year: string;
  [key: string]: string;
};

export type SpreadType = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  bg: string;
  border: string;
  dataKey: string;
  color: string;
  question: string;
};

export type JournalEntry = {
  id: string;
  date: string;
  cardId: string;
  spreadId: string;
  note: string;
  timestamp: number; // Dùng để sort nếu cần
};

export type ThemeStyles = {
  bg: string;
  text: string;
  textSub: string;
  cardBg: string;
  cardBorder: string;
  navBg: string;
  navTextActive: string;
  navTextInactive: string;
  sectionTitle: string;
  inputBg: string;
  accentGradient: string;
  sidebarBorder: string;
  chipActive: string;
  chipInactive: string;
};
export type ThemeProps = {
  theme: ThemeMode;
};

export interface ReadingSession {
  question: string;
  selectedCards: TarrotCard[];
  interpretation: string;
  status:
    | "asking"
    | "shuffling"
    | "drawing"
    | "watching_ad"
    | "interpreting"
    | "finished";
}

export interface Message {
  role: "user" | "model";
  content: string;
}

export type WeeklyRecapData = {
  weekId: string; // ISO week format: "2026-W02"
  totalReadings: number;
  topCards: { cardId: string; count: number }[];
  aiInsight: string | null;
  generatedAt: number;
};
