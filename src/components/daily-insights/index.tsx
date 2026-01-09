import React, { useMemo } from "react";
import { getThemeStyles } from "@/themes/index.theme";
import { useAppStore } from "@/zustand/index.zustand";
import { Sparkles, Sun, Zap } from "lucide-react";
import { getDailyNumber, getMysticAttributes } from "@/utils/mysticHelper"; // Import tiện ích
import { useTranslation } from "react-i18next";

const DailyInsights: React.FC = () => {
  const { t } = useTranslation();
  const { theme, userProfile } = useAppStore(); // Lấy userProfile từ store
  const isDark = theme === "dark";
  const s = getThemeStyles(theme);

  // Tính toán chỉ số hàng ngày dựa trên Ngày sinh
  const insights = useMemo(() => {
    // Fallback nếu chưa có ngày sinh (mặc định lấy ngày 1/1)
    const day = userProfile.dob?.day || "01";
    const month = userProfile.dob?.month || "01";

    const luckyNumber = getDailyNumber(day, month);
    const attributes = getMysticAttributes(luckyNumber);

    return {
      luckyNumber:
        luckyNumber < 10 ? `0${luckyNumber}` : luckyNumber.toString(),
      luckyColor: attributes.color,
      goldenHour: attributes.hour,
    };
  }, [userProfile.dob]);

  const items = [
    {
      label: t("home.insight_number"),
      val: insights.luckyNumber,
      color: isDark ? "text-emerald-300" : "text-emerald-600",
      icon: <Zap size={14} />,
    },
    {
      label: t("home.insight_color"),
      val: t(`colors.${insights.luckyColor}`, insights.luckyColor),
      color: isDark ? "text-purple-300" : "text-purple-600",
      icon: <Sparkles size={14} />,
    },
    {
      label: t("home.insight_hour"),
      val: insights.goldenHour,
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
