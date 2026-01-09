import i18n from "@/language";
import PLAYING_CARDS_EN from "./playing-cards.en.data";
import PLAYING_CARDS_VI from "./playing-cards.vi.data";

type Meaning = {
  overview: string;
  love: string;
  career: string;
  finance: string;
};
export type TarrotCard = {
  id: string;
  name: string;
  image: string;
  element: string;
  keywords: string[];
  astrology?: string;
  meaning: Meaning;
};
type RawMeaning = {
  overview: string[];
  love: string[];
  career: string[];
  finance: string[];
};

export type RawTarotCard = Omit<TarrotCard, "meaning"> & {
  meaning: RawMeaning;
};
const RAW_DATA: RawTarotCard[] = i18n.language.startsWith("vi")
  ? PLAYING_CARDS_VI
  : PLAYING_CARDS_EN;
const pickRandom = (arr: string[]): string => {
  if (!Array.isArray(arr) || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
};
const TARROT_CARDS: TarrotCard[] = RAW_DATA.map((card) => ({
  ...card, // Giữ nguyên id, name, image...
  meaning: {
    // Chọn ngẫu nhiên 1 câu cho mỗi khía cạnh
    overview: pickRandom(card.meaning.overview),
    love: pickRandom(card.meaning.love),
    career: pickRandom(card.meaning.career),
    finance: pickRandom(card.meaning.finance),
  },
}));
export const getRandomCards = (count: number): TarrotCard[] => {
  // Fix: Changed TARROT_CARDS to TAROT_CARDS to match the constant name
  const shuffled = [...TARROT_CARDS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
export default TARROT_CARDS;
