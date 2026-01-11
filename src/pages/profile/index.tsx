import React from "react";
import { useAppStore } from "@/zustand/index.zustand";
import {
  Award,
  BookOpen,
  ChevronRight,
  Crown,
  Globe,
  Heart,
  LogOut,
  Moon,
  Shield,
  Star,
  Sun,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";

// 1. Import i18n
import { useTranslation } from "react-i18next";

// --- SUB-COMPONENT: BACKGROUND ---
const MysticalBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-30 animate-pulse-slow"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/originals/64/56/a1/6456a1ea21f4f08401a4a18b58a3c199.gif')",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#090514] via-[#13131f]/90 to-[#090514]" />
  </div>
);

// --- SUB-COMPONENT: STAT CARD ---
const StatCard = ({
  icon,
  label,
  value,
  colorClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  colorClass: string;
}) => (
  <div className="bg-[#1a1a24]/60 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-lg hover:-translate-y-1 hover:border-white/20 transition-all group">
    <div className={`flex items-center gap-1.5 mb-2 opacity-80 ${colorClass}`}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200/70 group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
    <div className="text-2xl font-serif font-bold text-white drop-shadow-sm group-hover:scale-110 transition-transform">
      {value}
    </div>
  </div>
);

// --- SUB-COMPONENT: BADGE ITEM ---
const BadgeItem = ({
  icon,
  label,
  color,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  bg: string;
}) => (
  <div className="aspect-square bg-[#1a1a24]/60 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors group cursor-pointer relative overflow-hidden">
    <div
      className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-br ${color.replace(
        "text-",
        "from-"
      )} to-transparent`}
    ></div>
    <div
      className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center ${color} group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}
    >
      {icon}
    </div>
    <span className="text-[10px] font-bold text-indigo-100 text-center px-2 z-10">
      {label}
    </span>
  </div>
);

// --- SUB-COMPONENT: SETTING ROW ---
const SettingRow = ({
  icon,
  label,
  badge,
  action,
  isDestructive = false,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  action: () => void;
  isDestructive?: boolean;
}) => (
  <div
    onClick={action}
    className={`flex items-center justify-between p-5 border-b border-white/5 last:border-0 cursor-pointer transition-colors group ${
      isDestructive ? "hover:bg-red-500/10" : "hover:bg-white/5"
    }`}
  >
    <div
      className={`flex items-center gap-4 text-sm font-medium transition-colors ${
        isDestructive
          ? "text-red-400 group-hover:text-red-300"
          : "text-indigo-200/80 group-hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-3">
      {badge && (
        <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-md font-bold text-indigo-300">
          {badge}
        </span>
      )}
      {!isDestructive && (
        <ChevronRight
          size={16}
          className="text-white/20 group-hover:text-white/60 transition-colors"
        />
      )}
    </div>
  </div>
);

// --- MAIN COMPONENT ---
const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation(); // 2. Init hook
  const navigate = useNavigate();
  const { userProfile } = useAppStore();

  // Hàm chuyển đổi ngôn ngữ
  const toggleLanguage = () => {
    const newLang = i18n.language === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLang);
  };
  console.log(userProfile);
  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-[#090514] text-white overflow-x-hidden pb-[100px] md:pb-0">
      <MysticalBackground />

      <div className="relative z-10 flex flex-col h-full animate-fade-in max-w-6xl mx-auto w-full px-6 md:px-10">
        {/* --- HEADER PROFILE CARD --- */}
        <div className="pt-12 md:pt-16 pb-8 flex justify-center">
          <div className="w-full md:max-w-[450px] relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative rounded-[1.8rem] bg-[#13131a] border border-white/10 p-6 md:p-8 overflow-hidden">
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

              <div className="flex items-center gap-5 relative z-10 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-indigo-400 to-purple-400 shadow-xl relative z-10">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`}
                      alt="User"
                      className="w-full h-full rounded-full bg-[#090514]"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-1 z-20 bg-gradient-to-r from-amber-300 to-amber-500 text-[#090514] text-[10px] font-bold px-3 py-1 rounded-full border border-[#13131a] shadow-lg">
                    {t("profile.seeker_badge")}
                  </div>
                  <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-1">
                    {userProfile.name}
                  </h2>
                  <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold border border-indigo-500/30 px-2 py-1 rounded-md inline-block bg-indigo-500/10">
                    {t("profile.member_since")} 2025
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dashed border-white/10">
                <div>
                  <div className="text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1 font-bold">
                    {t("profile.zodiac")}
                  </div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Moon size={14} className="text-amber-200" />
                    {userProfile.zodiac
                      ? t(`zodiac.${userProfile.zodiac}`)
                      : t("profile.not_updated")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1 font-bold">
                    {t("profile.lifepath")}
                  </div>
                  <div className="text-sm font-bold text-white flex items-center justify-end gap-2">
                    {t("profile.lifepath").split(" ")[0]}{" "}
                    {userProfile.lifePathNumber || "?"}{" "}
                    {/* Rút gọn chữ Số/No nếu cần */}
                    <Crown size={14} className="text-amber-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="md:grid md:grid-cols-12 md:gap-10 pb-8">
          <div className="md:col-span-5 md:mt-0">
            <h3 className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4 pl-1">
              {t("profile.settings_title")}
            </h3>

            <div className="bg-[#1a1a24]/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
              {/* <SettingRow
                icon={<User />}
                label={t("profile.menu_info")}
                action={() => {}}
              /> */}
              {/* 
              <SettingRow
                icon={isDark ? <Sun /> : <Moon />}
                label={t("profile.menu_theme")}
                badge={
                  isDark ? t("profile.theme_dark") : t("profile.theme_light")
                }
                action={toggleTheme}
              /> */}

              {/* <SettingRow
                icon={<Globe />}
                label={t("profile.menu_language")}
                badge={
                  i18n.language === "vi"
                    ? t("profile.lang_vi")
                    : t("profile.lang_en")
                }
                action={toggleLanguage}
              /> */}
              <SettingRow
                icon={<LogOut />}
                label={t("profile.menu_logout")}
                action={() => navigate("/")}
              />
            </div>

            <div className="text-center text-[10px] text-white/20 uppercase tracking-widest">
              {t("profile.version")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
