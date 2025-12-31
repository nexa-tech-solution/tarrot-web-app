import type { AdConfig, JournalEntry, SpreadType } from "@/types/index.type";
import {
  Heart,
  Briefcase,
  Sun,
  Activity,
  Calendar,
  Wallet,
} from "lucide-react";
import TARROT_CARDS from "./tarrot.data";

export const AD_CONFIG: AdConfig = {
  enabled: true,
  bannerText: "✨ Bộ sưu tập đá phong thủy cao cấp - Ưu đãi 50%",
};

export const SPREAD_TYPES: SpreadType[] = [
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
export const TAROT_DECK = TARROT_CARDS;
