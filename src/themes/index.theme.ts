import type { ThemeMode, ThemeStyles } from "@/types/index.type";

export const getThemeStyles = (mode: ThemeMode): ThemeStyles => ({
  bg: mode === "dark" ? "bg-[#0a0a0f]" : "bg-[#f8f7f5]", // Darker black / Creamy stone
  text: mode === "dark" ? "text-indigo-50" : "text-stone-800",
  textSub: mode === "dark" ? "text-indigo-300/60" : "text-stone-500",
  cardBg: mode === "dark" ? "bg-[#151520]/80" : "bg-white/80",
  cardBorder: mode === "dark" ? "border-white/5" : "border-stone-200",
  navBg: mode === "dark" ? "bg-[#0f0f15]/90" : "bg-white/90",
  navTextActive: mode === "dark" ? "text-amber-200" : "text-indigo-600",
  navTextInactive: mode === "dark" ? "text-indigo-400/50" : "text-stone-400",
  sectionTitle: mode === "dark" ? "text-indigo-200/50" : "text-stone-400",
  inputBg: mode === "dark" ? "bg-[#151520]" : "bg-stone-50",
  accentGradient:
    mode === "dark"
      ? "from-indigo-500 via-purple-500 to-indigo-500"
      : "from-indigo-400 via-purple-400 to-indigo-400",
  sidebarBorder:
    mode === "dark" ? "border-r border-white/5" : "border-r border-stone-200",
});
