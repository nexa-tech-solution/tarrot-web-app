import type { TarrotCard } from "@/data/tarrot.data";
import { GoogleGenAI } from "@google/genai";

export const getTarotInterpretation = async (
  question: string,
  cards: TarrotCard[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const cardInfo = cards
    .map((c, i) => {
      const position = i === 0 ? "QUÁ KHỨ" : i === 1 ? "HIỆN TẠI" : "TƯƠNG LAI";
      return `[${position}]: Lá ${c.name}. Ý nghĩa: ${c.meaning.overview}.`;
    })
    .join("\n");

  const prompt = `
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

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-lite-latest", // Sử dụng model Lite tiết kiệm nhất
      contents: prompt,
    });
    return response.text || "Vũ trụ đang tạm thời tĩnh lặng...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Có lỗi xảy ra khi kết nối với các vì sao. Hãy thử lại sau.";
  }
};
