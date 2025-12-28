import { getThemeStyles } from "@/themes/index.theme";
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

const ProfilePage: React.FC = () => {
  const { theme, userProfile, toggleTheme } = useAppStore(); // Use stable state reference
  const isDark = theme === "dark";
  const s = getThemeStyles(theme);
  return (
    <div className="flex flex-col h-full animate-fade-in pb-[80px] md:pb-0 max-w-6xl mx-auto w-full px-6">
      <div
        className={`pt-12 md:pt-10 px-6 pb-6 text-center ${
          isDark
            ? "bg-gradient-to-b from-indigo-900/10 to-transparent"
            : "bg-gradient-to-b from-indigo-100/30 to-transparent"
        }`}
      >
        <div
          className={`mx-auto w-full max-w-[340px] md:max-w-[400px] aspect-[1.6] rounded-3xl ${
            isDark
              ? "bg-[#1a1a24] border-white/10"
              : "bg-white border-stone-200"
          } border p-6 flex flex-col justify-between shadow-2xl mb-8 relative overflow-hidden group hover:rotate-1 transition-transform duration-500`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-tr ${
              isDark
                ? "from-indigo-500/10 via-purple-500/10 to-amber-500/10"
                : "from-indigo-100/50 via-purple-100/50 to-amber-100/50"
            } opacity-50`}
          ></div>
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px]"></div>
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-indigo-400 to-purple-400 relative shadow-lg">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`}
                  alt="User"
                  className="w-full h-full rounded-full bg-slate-900 border-2 border-slate-900"
                />
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-300 to-amber-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full border border-white shadow-sm">
                  PRO
                </div>
              </div>
              <div className="text-left">
                <h3 className={`text-base font-serif font-bold ${s.text}`}>
                  {userProfile.name}
                </h3>
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-bold mt-1">
                  Thành viên từ 2024
                </p>
              </div>
            </div>
            <Crown
              className="w-6 h-6 text-amber-400 drop-shadow-md"
              fill="currentColor"
              fillOpacity={0.2}
            />
          </div>
          <div className="flex justify-between items-end z-10 border-t border-dashed border-white/10 pt-4 mt-4">
            <div className="text-left">
              <div
                className={`text-[9px] ${s.textSub} uppercase tracking-widest mb-1`}
              >
                Cung Hoàng Đạo
              </div>
              <div
                className={`text-sm font-bold ${s.text} flex items-center gap-1`}
              >
                {userProfile.zodiac}{" "}
                <Moon size={12} className="text-indigo-400" />
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-[9px] ${s.textSub} uppercase tracking-widest mb-1`}
              >
                Thần số học
              </div>
              <div className={`text-sm font-bold ${s.text}`}>
                Số {userProfile.lifePathNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:grid md:grid-cols-12 md:gap-10 pb-8">
        <div className="md:col-span-7 space-y-8">
          <div>
            <h3
              className={`text-xs font-bold ${s.sectionTitle} uppercase tracking-widest mb-4 pl-1`}
            >
              Thống kê
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Ngày liên tục",
                  val: "12",
                  icon: <Zap size={16} className="text-amber-500" />,
                },
                {
                  label: "Tổng số bài",
                  val: "48",
                  icon: <BookOpen size={16} className="text-purple-500" />,
                },
                {
                  label: "Bộ bài",
                  val: "1",
                  icon: <Heart size={16} className="text-rose-500" />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`${s.cardBg} border ${s.cardBorder} rounded-2xl p-4 flex flex-col items-center justify-center backdrop-blur-md shadow-sm hover:-translate-y-1 transition-transform`}
                >
                  <div className="flex items-center gap-1.5 mb-1 opacity-80">
                    {stat.icon}{" "}
                    <span className={`text-[9px] ${s.textSub} uppercase`}>
                      {stat.label}
                    </span>
                  </div>
                  <div className={`text-xl font-serif font-bold ${s.text}`}>
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3
              className={`text-xs font-bold ${s.sectionTitle} uppercase tracking-widest mb-4 pl-1`}
            >
              Bộ sưu tập huy hiệu
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  icon: <Award size={20} />,
                  color: "text-amber-400",
                  bg: "bg-amber-400/10",
                  label: "Người mới",
                },
                {
                  icon: <Star size={20} />,
                  color: "text-indigo-400",
                  bg: "bg-indigo-400/10",
                  label: "Kiên trì 7 ngày",
                },
                {
                  icon: <Shield size={20} />,
                  color: "text-emerald-400",
                  bg: "bg-emerald-400/10",
                  label: "Nhà thông thái",
                },
              ].map((badge, i) => (
                <div
                  key={i}
                  className={`aspect-square ${s.cardBg} border ${s.cardBorder} rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/5 transition-colors group cursor-pointer`}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${badge.bg} flex items-center justify-center ${badge.color} group-hover:scale-110 transition-transform`}
                  >
                    {badge.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold ${s.text} text-center px-2`}
                  >
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-5 mt-8 md:mt-0">
          <h3
            className={`text-xs font-bold ${s.sectionTitle} uppercase tracking-widest mb-4 pl-2`}
          >
            Cài đặt
          </h3>
          <div
            className={`${s.cardBg} border ${s.cardBorder} rounded-3xl overflow-hidden backdrop-blur-sm`}
          >
            {[
              {
                icon: <User size={18} />,
                label: "Thông tin cá nhân",
                action: () => {},
              },
              // {
              //   icon: isDark ? <Sun size={18} /> : <Moon size={18} />,
              //   label: "Giao diện",
              //   badge: isDark ? "Tối" : "Sáng",
              //   action: toggleTheme,
              // },
              {
                icon: <Globe size={18} />,
                label: "Ngôn ngữ",
                badge: "Tiếng Việt",
                action: () => {},
              },
            ].map((item, i) => (
              <div
                key={i}
                onClick={item.action}
                className={`flex items-center justify-between p-5 border-b ${s.cardBorder} hover:bg-white/5 cursor-pointer transition-colors group`}
              >
                <div
                  className={`flex items-center gap-4 ${s.textSub} group-hover:${s.text}`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {item.badge && (
                    <span
                      className={`text-[10px] ${
                        isDark ? "bg-white/10" : "bg-stone-200"
                      } px-2.5 py-1 rounded-md font-bold ${s.textSub}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    size={16}
                    className={isDark ? "text-slate-600" : "text-stone-300"}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className={`mt-6 ${s.cardBg} border ${s.cardBorder} rounded-3xl overflow-hidden backdrop-blur-sm mb-6`}
          >
            <div
              className={`flex items-center justify-between p-5 border-b ${s.cardBorder} hover:bg-red-500/5 cursor-pointer transition-colors group`}
            >
              <div className="flex items-center gap-4 text-red-500">
                <Trash2 size={18} />
                <span className="text-sm font-medium">Xóa dữ liệu</span>
              </div>
            </div>
            <div
              className={`flex items-center justify-between p-5 hover:bg-white/5 cursor-pointer transition-colors group`}
            >
              <div
                className={`flex items-center gap-4 ${s.textSub} group-hover:${s.text}`}
              >
                <LogOut size={18} />
                <span className="text-sm font-medium">Đăng xuất</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
