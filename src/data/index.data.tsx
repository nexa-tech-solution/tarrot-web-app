import type {
  AdConfig,
  JournalEntry,
  SpreadType,
  TarotCard,
} from "@/types/index.type";
import { Heart, Briefcase, Sun, Coins, Activity, Calendar } from "lucide-react";

export const AD_CONFIG: AdConfig = {
  enabled: true,
  bannerText: "✨ Bộ sưu tập đá phong thủy cao cấp - Ưu đãi 50%",
};

export const MOCK_JOURNAL: JournalEntry[] = [
  {
    id: 1,
    date: "Hôm nay, 10:30",
    spreadId: "daily",
    cardId: 0,
    note: "Cần tự tin hơn vào quyết định mới.",
  },
  {
    id: 2,
    date: "Hôm qua, 21:15",
    spreadId: "love",
    cardId: 6,
    note: "Dấu hiệu tốt về mối quan hệ.",
  },
  {
    id: 3,
    date: "26 Th12",
    spreadId: "career",
    cardId: 4,
    note: "Sếp đang để ý đến dự án này.",
  },
];

export const SPREAD_TYPES: SpreadType[] = [
  {
    id: "daily",
    title: "Thông điệp Ngày",
    subtitle: "Năng lượng dẫn lối",
    icon: <Sun className="w-5 h-5 text-amber-200" />,
    color: "from-amber-700/50 to-orange-600/50",
    accent: "text-amber-300",
    question: "Hôm nay vũ trụ muốn nhắn nhủ điều gì?",
  },
  {
    id: "love",
    title: "Tình Yêu",
    subtitle: "Kết nối & Cảm xúc",
    icon: <Heart className="w-5 h-5 text-rose-200" />,
    color: "from-rose-700/50 to-pink-600/50",
    accent: "text-rose-300",
    question: "Trái tim bạn đang tìm kiếm câu trả lời nào?",
  },
  {
    id: "money",
    title: "Tài Chính",
    subtitle: "Tiền bạc & Đầu tư",
    icon: <Coins className="w-5 h-5 text-yellow-200" />,
    color: "from-yellow-700/50 to-amber-600/50",
    accent: "text-yellow-300",
    question: "Dòng chảy tài chính đang hướng về đâu?",
  },
  {
    id: "career",
    title: "Sự Nghiệp",
    subtitle: "Định hướng thăng tiến",
    icon: <Briefcase className="w-5 h-5 text-emerald-200" />,
    color: "from-emerald-700/50 to-teal-600/50",
    accent: "text-emerald-300",
    question: "Con đường sự nghiệp sắp tới có gì?",
  },
  {
    id: "health",
    title: "Sức Khỏe",
    subtitle: "Tâm trí & Cơ thể",
    icon: <Activity className="w-5 h-5 text-red-200" />,
    color: "from-red-700/50 to-pink-600/50",
    accent: "text-red-300",
    question: "Cơ thể bạn đang muốn nói điều gì?",
  },
  {
    id: "year",
    title: "Tổng Quan Năm",
    subtitle: "Dự báo dài hạn",
    icon: <Calendar className="w-5 h-5 text-purple-200" />,
    color: "from-purple-700/50 to-indigo-600/50",
    accent: "text-purple-300",
    question: "Bức tranh tổng thể cho chặng đường sắp tới?",
  },
];

export const TAROT_DECK: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/90/RWS_Tarot_00_Fool.jpg",
    element: "Khí",
    astrology: "Sao Thiên Vương",
    keywords: ["Khởi đầu", "Tự do", "Ngây thơ"],
    meanings: {
      daily: "Sống vô tư và đón nhận bất ngờ.",
      love: "Tình yêu mới chớm nở đầy thú vị.",
      money: "Cơ hội đầu tư mới lạ.",
      career: "Khởi đầu dự án mới.",
      health: "Giữ tinh thần lạc quan.",
      year: "Năm của những chuyến đi.",
    },
  },
  {
    id: 1,
    name: "The Magician",
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg",
    element: "Khí",
    astrology: "Sao Thủy",
    keywords: ["Kỹ năng", "Tập trung", "Hành động"],
    meanings: {
      daily: "Bạn có đủ công cụ để thành công.",
      love: "Chủ động bày tỏ cảm xúc.",
      money: "Kỹ năng mang lại thu nhập.",
      career: "Sự tập trung mang lại thành quả.",
      health: "Sức khỏe dồi dào.",
      year: "Hiện thực hóa giấc mơ.",
    },
  },
  {
    id: 2,
    name: "The High Priestess",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/88/RWS_Tarot_02_High_Priestess.jpg",
    element: "Nước",
    astrology: "Mặt Trăng",
    keywords: ["Trực giác", "Bí ẩn", "Tiềm thức"],
    meanings: {
      daily: "Lắng nghe tiếng nói bên trong.",
      love: "Những điều chưa nói ra.",
      money: "Tin vào trực giác.",
      career: "Quan sát kỹ trước khi làm.",
      health: "Chú ý nội tiết tố.",
      year: "Phát triển tâm linh.",
    },
  },
  {
    id: 3,
    name: "The Empress",
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/d2/RWS_Tarot_03_Empress.jpg",
    element: "Đất",
    astrology: "Sao Kim",
    keywords: ["Thịnh vượng", "Sáng tạo", "Vẻ đẹp"],
    meanings: {
      daily: "Tận hưởng vẻ đẹp cuộc sống.",
      love: "Tình yêu nồng nàn, quyến rũ.",
      money: "Tài chính dư dả.",
      career: "Sáng tạo đỉnh cao.",
      health: "Tin vui về thai sản/sắc đẹp.",
      year: "Năm sung túc.",
    },
  },
  {
    id: 4,
    name: "The Emperor",
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/c3/RWS_Tarot_04_Emperor.jpg",
    element: "Lửa",
    astrology: "Bạch Dương",
    keywords: ["Quyền lực", "Cấu trúc", "Ổn định"],
    meanings: {
      daily: "Cần lập kế hoạch và hành động có kỷ luật.",
      love: "Mối quan hệ cần sự cam kết.",
      money: "Quản lý tài chính chặt chẽ.",
      career: "Cơ hội thăng tiến lãnh đạo.",
      health: "Rèn luyện thể lực.",
      year: "Xây dựng nền móng vững chắc.",
    },
  },
  {
    id: 6,
    name: "The Lovers",
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
    element: "Khí",
    astrology: "Song Tử",
    keywords: ["Tình yêu", "Lựa chọn", "Hòa hợp"],
    meanings: {
      daily: "Đứng trước ngã rẽ quan trọng.",
      love: "Sự kết nối sâu sắc.",
      money: "Hợp tác làm ăn sinh lời.",
      career: "Đối tác phù hợp.",
      health: "Cân bằng tinh thần.",
      year: "Năm của mối quan hệ lớn.",
    },
  },
  {
    id: 19,
    name: "The Sun",
    image:
      "https://upload.wikimedia.org/wikipedia/en/1/17/RWS_Tarot_19_Sun.jpg",
    element: "Lửa",
    astrology: "Mặt Trời",
    keywords: ["Niềm vui", "Thành công", "Rạng rỡ"],
    meanings: {
      daily: "Một ngày tràn ngập niềm vui.",
      love: "Hạnh phúc viên mãn.",
      money: "Đầu tư sinh lời tốt.",
      career: "Được công nhận, thăng chức.",
      health: "Sức sống căng tràn.",
      year: "Thành công rực rỡ.",
    },
  },
  {
    id: 13,
    name: "Death",
    image:
      "https://upload.wikimedia.org/wikipedia/en/d/d7/RWS_Tarot_13_Death.jpg",
    element: "Nước",
    astrology: "Bọ Cạp",
    keywords: ["Kết thúc", "Chuyển hóa", "Tái sinh"],
    meanings: {
      daily: "Đừng sợ thay đổi.",
      love: "Kết thúc để bắt đầu mới.",
      money: "Tìm nguồn thu mới.",
      career: "Thay đổi cách làm việc.",
      health: "Thay đổi lối sống.",
      year: "Lột xác hoàn toàn.",
    },
  },
];
