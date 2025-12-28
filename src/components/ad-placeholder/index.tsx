import { getThemeStyles } from "@/themes/index.theme";
import { useAppStore } from "@/zustand/index.zustand";
import { ExternalLink } from "lucide-react";
const AdPlaceholder: React.FC = () => {
  const theme = useAppStore((state) => state.theme);
  const isDark = theme === "dark";
  const s = getThemeStyles(theme);
  return (
    <div
      className={`w-full h-16 ${
        isDark
          ? "bg-slate-900/40 border-white/5"
          : "bg-white/60 border-stone-200"
      } border border-dashed rounded-xl flex items-center justify-between px-6 my-6 relative overflow-hidden group cursor-pointer transition-colors hover:border-amber-500/30`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-amber-500/10 px-2 py-1 rounded text-amber-500 font-bold text-[9px] border border-amber-500/20 tracking-wider">
          SPONSORED
        </div>
        <span className={`${s.text} text-xs font-medium tracking-wide`}>
          ✨ Bộ sưu tập đá phong thủy cao cấp
        </span>
      </div>
      <ExternalLink
        className={`w-3 h-3 ${s.textSub} group-hover:text-amber-500 transition-colors`}
      />
    </div>
  );
};

export default AdPlaceholder;
