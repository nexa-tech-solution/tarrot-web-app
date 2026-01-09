import React, { useMemo } from "react";
import { getThemeStyles } from "@/themes/index.theme";
import { useAppStore } from "@/zustand/index.zustand";
import { Moon } from "lucide-react";
import { getMoonPhaseData } from "@/utils/mysticHelper"; // Import file tiện ích vừa tạo
import { useTranslation } from "react-i18next";

const MoonWidget: React.FC = () => {
  const theme = useAppStore((state) => state.theme);
  const isDark = theme === "dark";
  const s = getThemeStyles(theme);
  const { t } = useTranslation();
  // Tính toán dữ liệu mặt trăng (Dùng useMemo để không tính lại mỗi lần render nếu không cần thiết)
  const { moonAge, phaseKey, currentMonth } = useMemo(
    () => getMoonPhaseData(),
    []
  );

  return (
    <div
      className={`w-full ${s.cardBg} border ${s.cardBorder} rounded-2xl py-6 px-3 flex items-center justify-between backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:shadow-lg group`}
    >
      <div
        className={`absolute top-0 right-0 w-48 h-48 ${
          isDark ? "bg-indigo-500/5" : "bg-indigo-300/10"
        } rounded-full blur-3xl -translate-y-1/2 translate-x-1/3`}
      ></div>
      <div className="flex items-center gap-5 relative z-10">
        <div
          className={`w-14 h-14 rounded-full border ${
            isDark
              ? "border-white/10 bg-[#0a0a0f]"
              : "border-stone-100 bg-white"
          } flex items-center justify-center shadow-2xl`}
        >
          <Moon
            className={`w-6 h-6 ${
              isDark ? "text-indigo-200" : "text-indigo-600"
            }`}
            strokeWidth={1.5}
          />
        </div>
        <div className="flex flex-col max-w-[60%]">
          <h4 className={`${s.text} font-serif font-bold text-lg`}>
            {t("moon.label_phase")}: {t(`moon.phases.${phaseKey}`)}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? "bg-amber-400" : "bg-indigo-500"
              }`}
            ></span>
            <p
              className={`${s.textSub} text-[10px] uppercase tracking-widest font-medium`}
            >
              {t("moon.label_phase")}: {t(`moon.advices.${phaseKey}`)}
            </p>
          </div>
        </div>
      </div>
      <div className="text-right text-nowrap relative z-10">
        <div className={`text-3xl font-serif font-medium ${s.text}`}>
          {moonAge}
        </div>
        <div
          className={`text-[10px] ${s.textSub} uppercase tracking-widest font-bold`}
        >
          {t("moon.month_prefix")} {currentMonth}
        </div>
      </div>
    </div>
  );
};

export default MoonWidget;
