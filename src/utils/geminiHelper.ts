import type { TarrotCard } from "@/data/tarrot.data";
import { GoogleGenAI } from "@google/genai";

const TEXT_OUT_MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3-flash",
] as const;

const generateWithFallback = async (
  ai: GoogleGenAI,
  prompt: string
): Promise<string> => {
  let lastError: unknown;

  for (const model of TEXT_OUT_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      if (response.text) {
        console.log(`✅ Gemini model used: ${model}`);
        return response.text || "Vũ trụ đang tạm thời tĩnh lặng...";
      }
    } catch (error: any) {
      lastError = error;

      console.warn(`⚠️ Model ${model} failed, trying next...`, error?.message);

      // Nếu lỗi không phải quota / unavailable → throw luôn
      if (
        !error?.message?.includes("quota") &&
        !error?.message?.includes("limit") &&
        !error?.message?.includes("unavailable")
      ) {
        throw error;
      }
    }
  }

  console.error("❌ All Gemini models failed", lastError);
  throw lastError;
};

export const getTarotInterpretation = async (
  question: string,
  cards: TarrotCard[],
  language: string = "vi" // <--- Add language parameter (default 'vi')
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const isVietnamese = language === "vi";

  // 1. Localize Position Labels
  const positions = isVietnamese
    ? ["QUÁ KHỨ", "HIỆN TẠI", "TƯƠNG LAI"]
    : ["PAST", "PRESENT", "FUTURE"];

  const cardInfo = cards
    .map((c, i) => {
      const position = positions[i];
      // Handle if meaning.overview is array or string
      const meaning = Array.isArray(c.meaning.overview)
        ? c.meaning.overview.join(". ")
        : c.meaning.overview;

      return `[${position}]: Card ${c.name}. Meaning: ${meaning}.`;
    })
    .join("\n");

  // 2. Define Prompts for each language
  const promptVI = `
    Bạn là một bậc thầy Tarot thông thái và thấu cảm. 
    Người dùng hỏi: "${question}"
    
    Trải bài 3 lá:
    ${cardInfo}
    
    Hãy trả về kết quả theo cấu trúc sau (Sử dụng Tiếng Việt, văn phong sâu sắc, huyền bí):
    
    ---
    1. Ý nghĩa từng lá bài (Giải thích ngắn gọn mỗi lá gắn với vị trí Quá khứ/Hiện tại/Tương lai và câu hỏi).
    2. Sự liên kết (Mối liên hệ giữa 3 lá bài này tạo nên câu chuyện gì?).
    3. Lời khuyên tổng kết (Thông điệp cuối cùng vũ trụ muốn gửi gắm - Ngắn gọn, súc tích, mang tính truyền động lực).
    ---
    
    Lưu ý: Không dùng markdown phức tạp như dấu #, chỉ dùng gạch đầu dòng và xuống dòng rõ ràng.
  `;

  const promptEN = `
    You are a wise and empathetic Tarot Master.
    User Question: "${question}"
    
    3-Card Spread:
    ${cardInfo}
    
    Please provide the interpretation in the following structure (Use English, deep and mystical tone):
    
    ---
    1. Card Meanings (Briefly explain each card in relation to Past/Present/Future positions and the question).
    2. The Connection (How do these 3 cards connect to tell a story?).
    3. Summary Advice (The final cosmic message - Concise, impactful, motivational).
    ---
    
    Note: Do not use complex markdown like # headers, just use bullet points and clear line breaks.
  `;

  const prompt = isVietnamese ? promptVI : promptEN;

  try {
    return await generateWithFallback(ai, prompt);
  } catch (error) {
    console.error("Gemini Error:", error);
    return isVietnamese
      ? "Có lỗi xảy ra khi kết nối với các vì sao. Hãy thử lại sau."
      : "An error occurred while connecting with the stars. Please try again later.";
  }
};
