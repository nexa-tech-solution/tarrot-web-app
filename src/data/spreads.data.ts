import type { SpreadPosition } from "@/types/index.type";

// Yes/No Spread (2 cards)
export const YESNO_POSITIONS_EN: SpreadPosition[] = [
  {
    id: "yes",
    name: "Yes Energy",
    description: "Forces supporting your question",
  },
  {
    id: "no",
    name: "No Energy",
    description: "Forces opposing your question",
  },
];

export const YESNO_POSITIONS_VI: SpreadPosition[] = [
  {
    id: "yes",
    name: "Năng Lượng Có",
    description: "Những lực lượng ủng hộ câu hỏi của bạn",
  },
  {
    id: "no",
    name: "Năng Lượng Không",
    description: "Những lực lượng phản đối câu hỏi của bạn",
  },
];

// Relationship Spread (6 cards)
export const RELATIONSHIP_POSITIONS_EN: SpreadPosition[] = [
  // Partner 1 (You)
  {
    id: "p1_feelings",
    name: "Your Feelings",
    description: "How you feel",
    gridPosition: { row: 0, col: 0 },
  },
  {
    id: "p1_thoughts",
    name: "Your Thoughts",
    description: "What you think",
    gridPosition: { row: 0, col: 1 },
  },
  {
    id: "p1_actions",
    name: "Your Actions",
    description: "What you do",
    gridPosition: { row: 0, col: 2 },
  },
  // Partner 2 (Them)
  {
    id: "p2_feelings",
    name: "Their Feelings",
    description: "How they feel",
    gridPosition: { row: 1, col: 0 },
  },
  {
    id: "p2_thoughts",
    name: "Their Thoughts",
    description: "What they think",
    gridPosition: { row: 1, col: 1 },
  },
  {
    id: "p2_actions",
    name: "Their Actions",
    description: "What they do",
    gridPosition: { row: 1, col: 2 },
  },
];

export const RELATIONSHIP_POSITIONS_VI: SpreadPosition[] = [
  // Partner 1 (You)
  {
    id: "p1_feelings",
    name: "Cảm Xúc Của Bạn",
    description: "Bạn cảm thấy thế nào",
    gridPosition: { row: 0, col: 0 },
  },
  {
    id: "p1_thoughts",
    name: "Suy Nghĩ Của Bạn",
    description: "Bạn đang nghĩ gì",
    gridPosition: { row: 0, col: 1 },
  },
  {
    id: "p1_actions",
    name: "Hành Động Của Bạn",
    description: "Bạn sẽ làm gì",
    gridPosition: { row: 0, col: 2 },
  },
  // Partner 2 (Them)
  {
    id: "p2_feelings",
    name: "Cảm Xúc Của Họ",
    description: "Họ cảm thấy thế nào",
    gridPosition: { row: 1, col: 0 },
  },
  {
    id: "p2_thoughts",
    name: "Suy Nghĩ Của Họ",
    description: "Họ đang nghĩ gì",
    gridPosition: { row: 1, col: 1 },
  },
  {
    id: "p2_actions",
    name: "Hành Động Của Họ",
    description: "Họ sẽ làm gì",
    gridPosition: { row: 1, col: 2 },
  },
];

// Celtic Cross (10 cards)
export const CELTIC_POSITIONS_EN: SpreadPosition[] = [
  {
    id: "present",
    name: "Present",
    description: "Current situation",
    gridPosition: { row: 0, col: 0 },
  },
  {
    id: "challenge",
    name: "Challenge",
    description: "Immediate obstacle",
    gridPosition: { row: 0, col: 1 },
  },
  {
    id: "past",
    name: "Foundation",
    description: "Basis of the situation",
    gridPosition: { row: 1, col: 0 },
  },
  {
    id: "recent",
    name: "Recent Past",
    description: "Recent influences",
    gridPosition: { row: 1, col: 1 },
  },
  {
    id: "crown",
    name: "Crown",
    description: "Best possible outcome",
    gridPosition: { row: 2, col: 0 },
  },
  {
    id: "future",
    name: "Near Future",
    description: "Coming influences",
    gridPosition: { row: 2, col: 1 },
  },
  {
    id: "self",
    name: "Self",
    description: "Your attitude",
    gridPosition: { row: 3, col: 0 },
  },
  {
    id: "environment",
    name: "Environment",
    description: "External influences",
    gridPosition: { row: 3, col: 1 },
  },
  {
    id: "hopes",
    name: "Hopes/Fears",
    description: "Your hopes and fears",
    gridPosition: { row: 4, col: 0 },
  },
  {
    id: "outcome",
    name: "Outcome",
    description: "Final outcome",
    gridPosition: { row: 4, col: 1 },
  },
];

export const CELTIC_POSITIONS_VI: SpreadPosition[] = [
  {
    id: "present",
    name: "Hiện Tại",
    description: "Tình huống hiện tại",
    gridPosition: { row: 0, col: 0 },
  },
  {
    id: "challenge",
    name: "Thử Thách",
    description: "Trở ngại trước mắt",
    gridPosition: { row: 0, col: 1 },
  },
  {
    id: "past",
    name: "Nền Tảng",
    description: "Căn nguyên của tình huống",
    gridPosition: { row: 1, col: 0 },
  },
  {
    id: "recent",
    name: "Quá Khứ Gần",
    description: "Những ảnh hưởng gần đây",
    gridPosition: { row: 1, col: 1 },
  },
  {
    id: "crown",
    name: "Vương Miện",
    description: "Kết quả tốt nhất có thể",
    gridPosition: { row: 2, col: 0 },
  },
  {
    id: "future",
    name: "Tương Lai Gần",
    description: "Những ảnh hưởng sắp tới",
    gridPosition: { row: 2, col: 1 },
  },
  {
    id: "self",
    name: "Bản Thân",
    description: "Thái độ của bạn",
    gridPosition: { row: 3, col: 0 },
  },
  {
    id: "environment",
    name: "Môi Trường",
    description: "Ảnh hưởng bên ngoài",
    gridPosition: { row: 3, col: 1 },
  },
  {
    id: "hopes",
    name: "Hy Vọng/Sợ Hãi",
    description: "Hy vọng và nỗi sợ của bạn",
    gridPosition: { row: 4, col: 0 },
  },
  {
    id: "outcome",
    name: "Kết Quả",
    description: "Kết quả cuối cùng",
    gridPosition: { row: 4, col: 1 },
  },
];
