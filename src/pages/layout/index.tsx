import { getThemeStyles } from "@/themes/index.theme";
import { useAppStore } from "@/zustand/index.zustand";
import { Outlet } from "react-router";

const Layout = () => {
  const { theme } = useAppStore(); // Use stable state reference
  const s = getThemeStyles(theme);
  const isDark = theme === "dark";
  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-black" : "bg-[#f0f0f2]"
      } flex items-center justify-center font-sans overflow-hidden transition-colors duration-1000`}
    >
      <div
        className={`
        relative w-full h-full 
        md:w-full md:h-screen md:rounded-0 md:border-0 md:flex md:flex-row
        max-w-[390px] h-[844px] md:max-w-none md:max-h-none
        ${s.bg}
        shadow-2xl md:shadow-none overflow-hidden flex flex-col transition-all duration-700
      `}
      >
        {/* Backgrounds */}
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f0f13] via-[#050508] to-[#000000] opacity-100 transition-opacity duration-1000"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 mix-blend-screen">
              <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[url('https://raw.githubusercontent.com/daniel-friyia/react-native-tarot/master/assets/fog.png')] bg-repeat opacity-20 animate-fog-flow"></div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-[#f8f7f5] transition-opacity duration-1000">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-60"></div>
          </div>
        )}
        <Outlet />
      </div>
      <style>{`
        .perspective-container { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .animate-fog-flow { animation: fog-flow 30s linear infinite; }
        @keyframes fog-flow { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, -50%, 0); } }
        @keyframes twinkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1); } }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 15px rgba(99,102,241,0.2); } 50% { box-shadow: 0 0 30px rgba(99,102,241,0.4); } }
        .animate-pulse-glow { animation: pulse-glow 2s infinite; }
        @keyframes shuffle { 0% { transform: translateX(0) scale(1); } 25% { transform: translateX(-15px) rotate(-5deg); } 75% { transform: translateX(-8px) rotate(-3deg); } 100% { transform: translateX(0) scale(1); } }
        .animate-shuffle { animation: shuffle 0.5s ease-in-out infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(150, 150, 150, 0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(150, 150, 150, 0.4); }
      `}</style>
    </div>
  );
};
export default Layout;
