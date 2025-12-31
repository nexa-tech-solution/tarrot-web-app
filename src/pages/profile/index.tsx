import React, { useMemo } from "react";
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

// --- SUB-COMPONENT: BACKGROUND ---
const MysticalBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-30 animate-pulse-slow"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?q=80&w=3872&auto=format&fit=crop')",
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
  const navigate = useNavigate();
  const { userProfile, journal, toggleTheme, theme } = useAppStore();
  const isDark = theme === "dark";

  // Dummy stats logic (có thể thay bằng logic thật sau này)
  const stats = [
    {
      label: "Chuỗi ngày",
      val: "3", // Ví dụ hardcode, sau này tính từ lastLogin
      icon: <Zap size={16} />,
      color: "text-amber-400",
    },
    {
      label: "Tổng trải bài",
      val: journal.length, // Lấy từ dữ liệu thật
      icon: <BookOpen size={16} />,
      color: "text-purple-400",
    },
    {
      label: "Bộ bài",
      val: "1",
      icon: <Heart size={16} />,
      color: "text-rose-400",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col font-sans bg-[#090514] text-white overflow-x-hidden pb-[100px] md:pb-0">
      <MysticalBackground />

      <div className="relative z-10 flex flex-col h-full animate-fade-in max-w-6xl mx-auto w-full px-6 md:px-10">
        {/* --- HEADER PROFILE CARD --- */}
        <div className="pt-12 md:pt-16 pb-8 flex justify-center">
          <div className="w-full md:max-w-[450px] relative group">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative rounded-[1.8rem] bg-[#13131a] border border-white/10 p-6 md:p-8 overflow-hidden">
              {/* Decor elements */}
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

              {/* Profile Info */}
              <div className="flex items-center gap-5 relative z-10 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-br from-indigo-400 to-purple-400 shadow-xl relative z-10">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`}
                      alt="User"
                      className="w-full h-full rounded-full bg-[#090514]"
                    />
                  </div>
                  {/* Pro Badge */}
                  <div className="absolute -bottom-2 -right-1 z-20 bg-gradient-to-r from-amber-300 to-amber-500 text-[#090514] text-[10px] font-bold px-3 py-1 rounded-full border border-[#13131a] shadow-lg">
                    SEEKER
                  </div>
                  {/* Glow behind avatar */}
                  <div className="absolute inset-0 bg-indigo-400 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
                </div>

                <div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-1">
                    {userProfile.name}
                  </h2>
                  <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold border border-indigo-500/30 px-2 py-1 rounded-md inline-block bg-indigo-500/10">
                    Thành viên từ 2025
                  </p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dashed border-white/10">
                <div>
                  <div className="text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1 font-bold">
                    Cung Hoàng Đạo
                  </div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Moon size={14} className="text-amber-200" />
                    {userProfile.zodiac || "Chưa cập nhật"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1 font-bold">
                    Thần số học
                  </div>
                  <div className="text-sm font-bold text-white flex items-center justify-end gap-2">
                    Số {userProfile.lifePathNumber || "?"}
                    <Crown size={14} className="text-amber-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="md:grid md:grid-cols-12 md:gap-10 pb-8">
          {/* LEFT COL: Stats & Badges */}
          {/* <div className="md:col-span-7 space-y-8">
            <section>
              <h3 className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4 pl-1">
                <Zap size={14} /> Thống kê hành trình
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <StatCard
                    key={i}
                    icon={stat.icon}
                    label={stat.label}
                    value={stat.val}
                    colorClass={stat.color}
                  />
                ))}
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4 pl-1">
                <Award size={14} /> Bộ sưu tập huy hiệu
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <BadgeItem
                  icon={<Award size={24} />}
                  label="Người mới"
                  color="text-amber-400"
                  bg="bg-amber-400/10"
                />
                <BadgeItem
                  icon={<Star size={24} />}
                  label="Kiên trì 3 ngày"
                  color="text-indigo-400"
                  bg="bg-indigo-400/10"
                />
                <BadgeItem
                  icon={<Shield size={24} />}
                  label="Nhà thông thái"
                  color="text-emerald-400"
                  bg="bg-emerald-400/10"
                />
              </div>
            </section>
          </div> */}

          {/* RIGHT COL: Settings */}
          <div className="md:col-span-5 md:mt-0">
            <h3 className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4 pl-1">
              Cài đặt & Tài khoản
            </h3>

            {/* <div className="bg-[#1a1a24]/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
              <SettingRow
                icon={<User />}
                label="Thông tin cá nhân"
                action={() => {}}
              />
              <SettingRow
                icon={isDark ? <Sun /> : <Moon />}
                label="Giao diện"
                badge={isDark ? "Tối" : "Sáng"}
                action={toggleTheme}
              />
              <SettingRow
                icon={<Globe />}
                label="Ngôn ngữ"
                badge="Tiếng Việt"
                action={() => {}}
              />
            </div> */}

            <div className="mt-6 bg-[#1a1a24]/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md mb-8">
              {/* <SettingRow
                icon={<Trash2 />}
                label="Xóa dữ liệu cá nhân"
                action={() => {
                  if (
                    window.confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu?")
                  ) {
                    // Logic clear store here
                    localStorage.clear();
                    window.location.reload();
                  }
                }}
                isDestructive={true}
              /> */}
              <SettingRow
                icon={<LogOut />}
                label="Đăng xuất"
                action={() => navigate("/")}
              />
            </div>

            <div className="text-center text-[10px] text-white/20 uppercase tracking-widest">
              Phiên bản 1.0.0 (Beta)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
