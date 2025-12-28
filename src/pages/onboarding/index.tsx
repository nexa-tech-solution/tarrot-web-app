import { getThemeStyles } from "@/themes/index.theme";
import { useAppStore } from "@/zustand/index.zustand";
import { ArrowRight, Calendar, Sparkles, User } from "lucide-react";
import { useNavigate } from "react-router";

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, userProfile, updateUserProfile } = useAppStore();

  const s = getThemeStyles(theme);
  return (
    <div className="relative z-50 flex flex-col h-screen animate-fade-in p-3 md:max-w-2xl md:mx-auto md:justify-center">
      <div className="flex-1 flex flex-col justify-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-8 mx-auto md:mx-0">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1
          className={`text-4xl md:text-5xl font-serif font-bold ${s.text} mb-4 leading-tight`}
        >
          Chào mừng đến với <br />{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Mystic Tarot
          </span>
        </h1>
        <p
          className={`${s.textSub} text-sm md:text-base mb-10 max-w-md leading-relaxed`}
        >
          Hành trình khám phá bản thân bắt đầu từ đây.
        </p>

        <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          <div>
            <label
              className={`text-[10px] font-bold uppercase tracking-widest ${s.textSub} mb-2 block`}
            >
              Tên hiển thị
            </label>
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border ${s.cardBorder} ${s.inputBg}`}
            >
              <User size={18} className={s.textSub} />
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => updateUserProfile({ name: e.target.value })}
                className={`bg-transparent outline-none flex-1 ${s.text} font-medium placeholder-opacity-30`}
                placeholder="Nhập tên..."
              />
            </div>
          </div>
          <div>
            <label
              className={`text-[10px] font-bold uppercase tracking-widest ${s.textSub} mb-2 block`}
            >
              Ngày sinh
            </label>
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border ${s.cardBorder} ${s.inputBg}`}
            >
              <Calendar size={18} className={s.textSub} />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="DD"
                  className={`w-1/3 bg-transparent outline-none ${s.text} font-medium text-center`}
                />
                <span className={s.textSub}>/</span>
                <input
                  type="text"
                  placeholder="MM"
                  className={`w-1/3 bg-transparent outline-none ${s.text} font-medium text-center`}
                />
                <span className={s.textSub}>/</span>
                <input
                  type="text"
                  placeholder="YYYY"
                  className={`w-1/3 bg-transparent outline-none ${s.text} font-medium text-center`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-auto md:mt-12">
        <button
          onClick={() => navigate("main/home")}
          className="w-full md:w-auto md:px-12 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 group"
        >
          Bắt đầu hành trình{" "}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default OnboardingPage;
