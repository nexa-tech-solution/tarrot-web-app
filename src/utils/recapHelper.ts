/**
 * Weekly Recap helper utilities
 * Computes weekly stats and generates AI insights
 */

import type { JournalEntry, WeeklyRecapData } from "@/types/index.type";
import { getWeekBounds, getISOWeek } from "./weekHelper";
import { TAROT_DECK } from "@/data/index.data";
import { GoogleGenAI } from "@google/genai";

const TEXT_OUT_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3-flash",
] as const;

/**
 * Compute weekly statistics from journal entries
 * @param journal - Array of journal entries
 * @returns Stats including weekId, totalReadings, and topCards
 */
export const computeWeeklyStats = (
  journal: JournalEntry[]
): Omit<WeeklyRecapData, "aiInsight" | "generatedAt"> => {
  const { start, end } = getWeekBounds();

  // Filter entries from current week
  const weekEntries = journal.filter((entry) => {
    const entryTimestamp = entry.timestamp;
    return entryTimestamp >= start.getTime() && entryTimestamp <= end.getTime();
  });

  // Count card occurrences
  const cardCounts = new Map<string, number>();
  weekEntries.forEach((entry) => {
    const current = cardCounts.get(entry.cardId) || 0;
    cardCounts.set(entry.cardId, current + 1);
  });

  // Sort by count descending, get top 3
  const topCards = Array.from(cardCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cardId, count]) => ({ cardId, count }));

  return {
    weekId: getISOWeek(),
    totalReadings: weekEntries.length,
    topCards,
  };
};

/**
 * Generate AI weekly insight using Gemini with fallback
 * @param topCards - Top cards from the week
 * @param language - Current language (vi/en)
 * @returns AI-generated insight string
 */
export const generateWeeklyInsight = async (
  topCards: { cardId: string; count: number }[],
  language: string
): Promise<string> => {
  if (topCards.length === 0) return "";

  const cardNames = topCards
    .map((tc) => TAROT_DECK.find((c) => c.id === tc.cardId)?.name || "Unknown")
    .join(", ");

  const isVi = language.startsWith("vi");

  const prompt = isVi
    ? `Bạn là bậc thầy Tarot. Tuần này người dùng đã rút các lá: ${cardNames}.
Viết 2-3 câu nhận xét tổng quan về tuần của họ và lời khuyên cho tuần tới.
Phong cách: Huyền bí, truyền cảm hứng, ngắn gọn. Không dùng markdown.`
    : `You are a Tarot master. This week the user drew these cards: ${cardNames}.
Write 2-3 sentences summarizing their week and advice for next week.
Style: Mystical, inspiring, concise. No markdown.`;

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

  for (const model of TEXT_OUT_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      if (response.text) {
        return response.text;
      }
    } catch (e) {
      console.warn(`Recap AI: Model ${model} failed, trying next...`);
      continue;
    }
  }

  // Fallback message if all models fail
  return isVi
    ? "Các vì sao đang suy ngẫm về hành trình của bạn..."
    : "The stars are contemplating your journey...";
};

/**
 * Generate complete weekly recap data
 * @param journal - Array of journal entries
 * @param language - Current language
 * @returns Complete WeeklyRecapData object
 */
export const generateWeeklyRecapData = async (
  journal: JournalEntry[],
  language: string
): Promise<WeeklyRecapData> => {
  const stats = computeWeeklyStats(journal);
  const aiInsight = await generateWeeklyInsight(stats.topCards, language);

  return {
    ...stats,
    aiInsight,
    generatedAt: Date.now(),
  };
};
