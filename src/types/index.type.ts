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

export type TarotCard = {
  id: number;
  name: string;
  image: string;
  element: string;
  astrology: string;
  keywords: string[];
  meanings: SpreadMeanings;
};

export type SpreadType = {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
  question: string;
};

export type JournalEntry = {
  id: number;
  date: string;
  spreadId: string;
  cardId: number;
  note: string;
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
