import type { AdConfig, SpreadType } from "@/types/index.type";
import {
  Heart,
  Briefcase,
  Sun,
  Activity,
  Calendar,
  Wallet,
} from "lucide-react";
import TARROT_CARDS from "./tarrot.data";
import i18n from "@/language";

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
];
export const SPREAD_TYPES: SpreadType[] = i18n.language.startsWith("vi")
  ? SPREAD_TYPES_VI
  : SPREAD_TYPES_EN;
export const TAROT_DECK = TARROT_CARDS;
