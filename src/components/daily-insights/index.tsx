import { getThemeStyles } from "@/themes/index.theme";
import { useAppStore } from "@/zustand/index.zustand";
import { Sparkles, Sun, Zap } from "lucide-react";

const DailyInsights: React.FC = () => {
  const theme = useAppStore((state) => state.theme);
  const isDark = theme === "dark";
  const s = getThemeStyles(theme);
  const items = [
    {
      label: "Số may mắn",
      val: "07",
      color: isDark ? "text-emerald-300" : "text-emerald-600",
      icon: <Zap size={14} />,
    },
    {
      label: "Màu đạo",
      val: "Tím",
      color: isDark ? "text-purple-300" : "text-purple-600",
      icon: <Sparkles size={14} />,
    },
    {
      label: "Giờ vàng",
      val: "9h-11h",
      color: isDark ? "text-amber-300" : "text-amber-600",
      icon: <Sun size={14} />,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {items.map((item, i) => (
        <div
          key={i}
          className={`${s.cardBg} ${s.cardBorder} border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
        >
          <div className={`${isDark ? "text-white/50" : "text-stone-300"}`}>
            {item.icon}
          </div>
          <div className="text-center">
            <span
              className={`text-[9px] ${s.textSub} uppercase tracking-widest block mb-1`}
            >
              {item.label}
            </span>
            <span className={`text-lg font-serif font-bold ${item.color}`}>
              {item.val}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyInsights;
