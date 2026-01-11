import type { AdConfig, SpreadType } from "@/types/index.type";
import {
  Heart,
  Briefcase,
  Sun,
  Activity,
  Calendar,
  Wallet,
  HelpCircle,
  Users,
  Grid3X3,
} from "lucide-react";
import TARROT_CARDS from "./tarrot.data";
import i18n from "@/language";
import {
  YESNO_POSITIONS_EN,
  YESNO_POSITIONS_VI,
  RELATIONSHIP_POSITIONS_EN,
  RELATIONSHIP_POSITIONS_VI,
  CELTIC_POSITIONS_EN,
  CELTIC_POSITIONS_VI,
} from "./spreads.data";

const AD_CONFIG_VI: AdConfig = {
  enabled: true,
  bannerText: "✨ Bộ sưu tập đá phong thủy cao cấp - Ưu đãi 50%",
};
const AD_CONFIG_EN: AdConfig = {
  enabled: true,
  bannerText: "✨ Premium Feng Shui Crystal Collection - 50% Off",
};
export const AD_CONFIG: AdConfig =
  i18n.language === "vi" ? AD_CONFIG_VI : AD_CONFIG_EN;
const SPREAD_TYPES_VI: SpreadType[] = [
  {
    id: "daily",
    title: "Thông điệp Ngày",
    subtitle: "Năng lượng dẫn lối",
    icon: Sun,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    dataKey: "overview", // Map vào key 'overview' trong data
    question: "Vũ trụ muốn gửi thông điệp gì cho tôi hôm nay?",
  },
  {
    id: "love",
    title: "Tình Yêu",
    subtitle: "Kết nối & Cảm xúc",
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    dataKey: "love", // Map vào key 'love' trong data
    question: "Chuyện tình cảm của tôi sẽ diễn biến thế nào?",
  },
  {
    id: "finance",
    title: "Tài Chính",
    subtitle: "Tiền bạc & Đầu tư",
    icon: Wallet,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dataKey: "finance", // Map vào key 'finance' trong data
    question: "Tình hình tài chính sắp tới có khởi sắc không?",
  },
  {
    id: "career",
    title: "Sự Nghiệp",
    subtitle: "Định hướng thăng tiến",
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    dataKey: "career", // Map vào key 'career' trong data
    question: "Sự nghiệp của tôi cần lưu ý điều gì?",
  },
  {
    id: "health",
    title: "Sức Khỏe",
    subtitle: "Tâm trí & Cơ thể",
    icon: Activity,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    dataKey: "overview", // Data chưa có health, dùng tạm overview
    question: "Năng lượng thể chất và tinh thần của tôi ra sao?",
  },
  {
    id: "year",
    title: "Tổng Quan Năm",
    subtitle: "Dự báo dài hạn",
    icon: Calendar,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    dataKey: "overview",
    question: "Bức tranh tổng thể của năm nay là gì?",
  },
  // Multi-card spreads
  {
    id: "yesno",
    title: "Có hoặc Không",
    subtitle: "Câu trả lời nhanh",
    icon: HelpCircle,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    cardCount: 2,
    layout: "grid",
    positions: YESNO_POSITIONS_VI,
    question: "Hãy đặt một câu hỏi có hoặc không cho vũ trụ",
  },
  {
    id: "relationship",
    title: "Mối Quan Hệ",
    subtitle: "Kết nối tình yêu",
    icon: Users,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
    cardCount: 6,
    layout: "relationship",
    positions: RELATIONSHIP_POSITIONS_VI,
    question: "Năng lượng giữa bạn và đối phương đang chảy như thế nào?",
  },
  {
    id: "celtic",
    title: "Celtic Cross",
    subtitle: "Trải bài sâu 10 lá",
    icon: Grid3X3,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    cardCount: 10,
    layout: "celtic",
    positions: CELTIC_POSITIONS_VI,
    question: "Vũ trụ muốn tiết lộ điều gì sâu sắc?",
  },
];
const SPREAD_TYPES_EN: SpreadType[] = [
  {
    id: "daily",
    title: "Daily Message",
    subtitle: "Guiding Energy",
    icon: Sun,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    dataKey: "overview", // Map to 'overview' key in data
    question: "What message does the universe have for me today?",
  },
  {
    id: "love",
    title: "Love",
    subtitle: "Connection & Emotions",
    icon: Heart,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    border: "border-rose-400/20",
    dataKey: "love", // Map to 'love' key in data
    question: "How will my love life unfold?",
  },
  {
    id: "finance",
    title: "Finance",
    subtitle: "Money & Investments",
    icon: Wallet,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    dataKey: "finance", // Map to 'finance' key in data
    question: "What is the outlook for my finances?",
  },
  {
    id: "career",
    title: "Career",
    subtitle: "Career Path & Growth",
    icon: Briefcase,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    dataKey: "career", // Map to 'career' key in data
    question: "What should I focus on in my career?",
  },
  {
    id: "health",
    title: "Health",
    subtitle: "Mind & Body",
    icon: Activity,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    dataKey: "overview", // Data doesn't have health yet, using overview temporarily
    question: "How is my physical and mental energy?",
  },
  {
    id: "year",
    title: "Yearly Overview",
    subtitle: "Long-term Forecast",
    icon: Calendar,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    dataKey: "overview",
    question: "What is the overall picture for this year?",
  },
  // Multi-card spreads
  {
    id: "yesno",
    title: "Yes or No",
    subtitle: "Quick binary answer",
    icon: HelpCircle,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    cardCount: 2,
    layout: "grid",
    positions: YESNO_POSITIONS_EN,
    question: "Ask a yes or no question to the universe",
  },
  {
    id: "relationship",
    title: "Relationship",
    subtitle: "Love connection reading",
    icon: Users,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
    cardCount: 6,
    layout: "relationship",
    positions: RELATIONSHIP_POSITIONS_EN,
    question: "How does the energy flow between you and your partner?",
  },
  {
    id: "celtic",
    title: "Celtic Cross",
    subtitle: "Deep 10-card reading",
    icon: Grid3X3,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    cardCount: 10,
    layout: "celtic",
    positions: CELTIC_POSITIONS_EN,
    question: "What deep insights does the universe reveal?",
  },
];
export const SPREAD_TYPES: SpreadType[] = i18n.language.startsWith("vi")
  ? SPREAD_TYPES_VI
  : SPREAD_TYPES_EN;
export const TAROT_DECK = TARROT_CARDS;
