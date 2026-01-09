import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Calendar,
  User,
  Sparkles,
  Mars,
  Venus,
  HelpCircle,
} from "lucide-react";

// Assets & Store
import Icon from "@/assets/icon.png";
import { useAppStore } from "@/zustand/index.zustand";
import { getThemeStyles } from "@/themes/index.theme";
import { useTranslation } from "react-i18next";

// --- SUB-COMPONENT: BACKGROUND ---
const MysticalBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#090514]">
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-[#090514] to-[#090514]" />
    <div
      className="absolute top-0 left-0 w-full h-full opacity-30"
      style={{
        backgroundImage:
          "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
  </div>
);

// --- MAIN COMPONENT ---
const OnboardingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme, userProfile, updateUserProfile } = useAppStore();
  const s = getThemeStyles(theme);

  // 1. Local State
  const [name, setName] = useState(userProfile.name || "");
  const [dob, setDob] = useState(
    userProfile.dob || { day: "", month: "", year: "" }
  );
  // Thêm state gender (mặc định lấy từ store hoặc 'male')
  const [gender, setGender] = useState<"male" | "female" | "other">(
    userProfile.gender || "male"
  );
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (field: "day" | "month" | "year", value: string) => {
    if (!/^\d*$/.test(value)) return;
    if ((field === "day" || field === "month") && value.length > 2) return;
    if (field === "year" && value.length > 4) return;

    setDob((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleStart = () => {
    if (!name.trim()) {
      setError(t("onboarding.error_name"));
      return;
    }
    if (!dob.day || !dob.month || !dob.year) {
      setError(t("onboarding.err_dob"));
      return;
    }

    const d = parseInt(dob.day);
    const m = parseInt(dob.month);
    const y = parseInt(dob.year);
    if (d > 31 || m > 12 || y < 1900 || y > new Date().getFullYear()) {
      setError(t("onboarding.err_invalid_dob"));
      return;
    }

    // 2. Lưu profile đầy đủ (bao gồm gender)
    updateUserProfile({
      name: name.trim(),
      dob: { day: dob.day, month: dob.month, year: dob.year },
      gender: gender,
    });

    navigate("/main/home");
  };

  // Cấu hình lựa chọn giới tính
  const genderOptions = [
    { id: "male", label: t("onboarding.gender_male"), icon: Mars },
    { id: "female", label: t("onboarding.gender_female"), icon: Venus },
    { id: "other", label: t("onboarding.gender_other"), icon: HelpCircle },
  ];

  return (
    <div className="relative z-50 flex flex-col h-screen animate-fade-in p-6 md:max-w-2xl md:mx-auto md:justify-center overflow-hidden font-sans text-white">
      <MysticalBackground />

      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {/* Logo & Title */}
        <div className="text-center md:text-left animate-fade-in-down">
          <div className="relative w-20 h-20 mx-auto md:mx-0 mb-6 group">
            <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <img
              src={Icon}
              className="relative w-full h-full object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500"
              alt="App Icon"
            />
          </div>

          <h1
            className={`text-3xl md:text-4xl font-serif font-bold ${s.text} mb-3 leading-tight`}
          >
            {t("onboarding.welcome_title")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-amber-200">
              {t("onboarding.app_name")}
            </span>
          </h1>
          <p
            className={`${s.textSub} text-xs md:text-sm mb-8 max-w-md leading-relaxed mx-auto md:mx-0 opacity-80`}
          >
            {t("onboarding.welcome_desc")}
          </p>
        </div>

        {/* Form Section */}
        <div className="space-y-5 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl animate-fade-in-up">
          {/* Row 1: Name & DOB */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Name Input */}
            <div>
              <label
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-2`}
              >
                <User size={12} /> {t("onboarding.label_name")}
              </label>
              <div
                className={`flex items-center gap-3 p-3 rounded-xl border ${s.cardBorder} bg-[#090514]/50 focus-within:border-indigo-400 transition-colors`}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                  className={`bg-transparent outline-none flex-1 ${s.text} text-sm font-medium placeholder:text-white/20`}
                  placeholder={t("onboarding.placeholder_name")}
                />
              </div>
            </div>

            {/* DOB Input */}
            <div>
              <label
                className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-2`}
              >
                <Calendar size={12} /> {t("onboarding.label_dob")}
              </label>
              <div
                className={`flex items-center gap-2 p-3 rounded-xl border ${s.cardBorder} bg-[#090514]/50 focus-within:border-indigo-400 transition-colors`}
              >
                <input
                  type="text"
                  value={dob.day}
                  onChange={(e) => handleDateChange("day", e.target.value)}
                  placeholder="DD"
                  className={`w-1/3 bg-transparent outline-none ${s.text} text-sm font-medium text-center placeholder:text-white/20`}
                />
                <span className="text-white/20">/</span>
                <input
                  type="text"
                  value={dob.month}
                  onChange={(e) => handleDateChange("month", e.target.value)}
                  placeholder="MM"
                  className={`w-1/3 bg-transparent outline-none ${s.text} text-sm font-medium text-center placeholder:text-white/20`}
                />
                <span className="text-white/20">/</span>
                <input
                  type="text"
                  value={dob.year}
                  onChange={(e) => handleDateChange("year", e.target.value)}
                  placeholder="YYYY"
                  className={`w-1/3 bg-transparent outline-none ${s.text} text-sm font-medium text-center placeholder:text-white/20`}
                />
              </div>
            </div>
          </div>

          {/* Row 2: Gender Selection */}
          <div>
            <label
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-2`}
            >
              <Sparkles size={12} /> {t("onboarding.label_gender")}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {genderOptions.map((opt) => {
                const isSelected = gender === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setGender(opt.id as any)}
                    className={`
                      flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition-all duration-300
                      ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-400 text-white shadow-lg scale-[1.02]"
                          : "bg-[#090514]/50 border-white/10 text-white/50 hover:bg-white/5 hover:text-white/80"
                      }
                    `}
                  >
                    <opt.icon
                      size={18}
                      className={isSelected ? "text-amber-200" : ""}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-center text-red-400 text-xs font-bold animate-pulse">
            * {error}
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-auto md:mt-12 relative z-20 pb-4">
        <button
          onClick={handleStart}
          className="w-full md:w-auto md:px-12 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm uppercase tracking-widest shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)] active:scale-95 transition-all flex items-center justify-center gap-3 group hover:brightness-110"
        >
          <span>{t("onboarding.btn_start")}</span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default OnboardingPage;
