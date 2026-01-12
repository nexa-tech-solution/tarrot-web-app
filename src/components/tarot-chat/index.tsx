import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  RefreshCw,
  BrainCircuit,
  PlayCircle,
  Lock,
  Quote,
  Star,
  Compass,
  ArrowLeft,
  Gift, // Icon quà tặng cho lượt free
} from "lucide-react";
import type { ReadingSession } from "@/types/index.type";
import { getRandomCards, type TarrotCard } from "@/data/tarrot.data";
import { getTarotInterpretation } from "@/utils/geminiHelper";
import CardItem from "../card-item";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import i18n from "@/language";

// Tên key lưu trong LocalStorage
const STORAGE_KEY = "tarot_daily_usage";

const TarotChat: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState(-1);
  const [session, setSession] = useState<ReadingSession>({
    question: "",
    selectedCards: [],
    interpretation: "",
    status: "asking",
  });
  const [inputText, setInputText] = useState("");
  const [drawnIndices, setDrawnIndices] = useState<number[]>([]);
  const [adProgress, setAdProgress] = useState(0);
  const [isFreeTurn, setIsFreeTurn] = useState(false); // State để check xem có đang free không

  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- LOGIC KIỂM TRA LƯỢT MIỄN PHÍ ---
  const checkDailyFreeTurn = () => {
    try {
      const today = new Date().toDateString(); // Lấy ngày hiện tại (VD: Mon Jan 06 2026)
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data) return true; // Chưa có dữ liệu -> Là lần đầu -> Free

      const parsed = JSON.parse(data);
      if (parsed.date !== today) return true; // Dữ liệu cũ (ngày khác) -> Reset -> Free

      // Nếu đã có dữ liệu ngày hôm nay, kiểm tra số lượt (ở đây < 1 là còn free)
      return parsed.count < 1;
    } catch (e) {
      return true; // Lỗi đọc storage thì cho free luôn để tránh bug
    }
  };

  const incrementDailyUsage = () => {
    const today = new Date().toDateString();
    const data = localStorage.getItem(STORAGE_KEY);
    let count = 0;

    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.date === today) {
        count = parsed.count;
      }
    }

    // Lưu lại: Ngày hôm nay, số lượt cũ + 1
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: today, count: count + 1 })
    );
    // Cập nhật lại state UI
    setIsFreeTurn(false);
  };
  // -------------------------------------

  // Kiểm tra trạng thái Free khi component mount
  useEffect(() => {
    setIsFreeTurn(checkDailyFreeTurn());
  }, []);

  const scrollToBottom = () => {
    if (session.status === "interpreting" || session.status === "finished") {
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.status, session.interpretation]);

  const handleStartShuffle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setSession((prev) => ({
      ...prev,
      question: inputText,
      status: "shuffling",
    }));

    setTimeout(() => {
      setSession((prev) => ({ ...prev, status: "drawing" }));
    }, 1500);
  };

  const drawCard = (index: number) => {
    if (drawnIndices.length >= 3 || drawnIndices.includes(index)) return;

    const newDrawn = [...drawnIndices, index];
    setDrawnIndices(newDrawn);

    if (newDrawn.length === 3) {
      // Logic xử lý khi rút đủ 3 lá
      setTimeout(() => {
        const canSkipAd = checkDailyFreeTurn();

        if (canSkipAd) {
          // NẾU ĐƯỢC FREE: Chạy thẳng vào giải bài, không qua quảng cáo
          handleReadingStart(true);
        } else {
          // NẾU KHÔNG FREE: Chuyển sang màn hình xem quảng cáo
          setSession((prev) => ({ ...prev, status: "watching_ad" }));
        }
      }, 600);
    }
  };

  // Hàm xử lý chung để bắt đầu giải bài (gọi khi Free hoặc khi xem xong Ads)
  const handleReadingStart = (isFree: boolean) => {
    const actualCards = getRandomCards(3);
    setSession((prev) => ({
      ...prev,
      selectedCards: actualCards,
      status: "interpreting",
    }));

    interpretReading(actualCards);

    // Luôn tăng biến đếm lượt sử dụng (để lần sau tính phí)
    incrementDailyUsage();
  };

  const startAd = () => {
    //@ts-expect-error no check
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "SHOW_REWARDED",
      })
    );
  };

  const startProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setAdProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        handleAdComplete();
      }
    }, 40);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAdComplete = () => {
    // Xem quảng cáo xong -> Gọi hàm bắt đầu giải bài (tham số false vì không phải free skip)
    handleReadingStart(false);
  };

  const interpretReading = async (cards: TarrotCard[]) => {
    const result = await getTarotInterpretation(
      session.question,
      cards,
      i18n.language.startsWith("vi") ? "vi" : "en"
    );
    setSession((prev) => ({
      ...prev,
      interpretation: result,
      status: "finished",
    }));
  };

  const resetSession = () => {
    // Kiểm tra lại xem sau lượt vừa rồi thì còn được free không (thường là không)
    setIsFreeTurn(checkDailyFreeTurn());

    setSession({
      question: "",
      selectedCards: [],
      interpretation: "",
      status: "asking",
    });
    setDrawnIndices([]);
    setAdProgress(0);
    setInputText("");
  };

  useEffect(() => {
    if (status === 1) {
      startProgress();
      setStatus(-1);
      return;
    }
  }, [status]);

  useEffect(() => {
    const handleNativeMessage = (event: any) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "LOAD_ADS_COMPLETE") {
          setStatus(1);
        }
        if (data.type === "READY_LOAD_ADS") {
          setStatus(0);
        }
        if (data.type === "NOT_READY_LOAD_ADS") {
          setStatus(-1);
        }
      } catch (err) {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener("message", handleNativeMessage);
    document.addEventListener("message", handleNativeMessage);

    return () => {
      window.removeEventListener("message", handleNativeMessage);
      document.removeEventListener("message", handleNativeMessage);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-12 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <button
          onClick={handleBack}
          className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300 shadow-lg z-50"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-center flex-1 animate-fade-in mr-10">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-[7px] md:text-[10px] uppercase tracking-[0.3em] font-bold mb-1">
            <Star size={10} className="text-amber-400 animate-pulse" />
            <span>{t("chat.disclaimer")}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300">
            Mystic Tarot
          </h1>
        </div>
      </div>

      <div className="flex-1 bg-[#0f0f13]/60 border border-white/10 rounded-2xl backdrop-blur-2xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(79,70,229,0.1)] relative">
        <div className="flex-1 p-2 overflow-y-auto custom-scrollbar">
          {session.status === "asking" && (
            <div className="h-full flex flex-col items-center justify-center space-y-8 animate-fade-in text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse" />
                <div className="relative w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-full flex items-center justify-center border border-indigo-500/30 animate-float">
                  <Compass size={40} className="text-indigo-400" />
                </div>
                {/* HIỂN THỊ TRẠNG THÁI MIỄN PHÍ */}
                {isFreeTurn && (
                  <div className="absolute top-4 -right-24 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                    <Gift size={10} />
                    <span>{t("chat.free_tag")}</span>
                  </div>
                )}
              </div>
              <div className="max-w-md">
                <h2 className="text-xl md:text-2xl font-serif font-semibold mb-3 text-white">
                  {t("chat.welcome_title")}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed px-6">
                  {t("chat.welcome_desc")}
                </p>
              </div>
              <form
                onSubmit={handleStartShuffle}
                className="w-full max-w-md relative px-4"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t("chat.input_placeholder")}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm placeholder:text-gray-400 text-white"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-6 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white px-4 rounded-xl transition-all shadow-lg"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          )}

          {session.status === "shuffling" && (
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              <div className="relative w-28 h-40">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-xl animate-ping opacity-20" />
                <div className="w-full h-full bg-gradient-to-br from-indigo-950 to-black rounded-xl border border-indigo-500/40 flex items-center justify-center">
                  <RefreshCw
                    size={40}
                    className="text-indigo-400 animate-spin"
                  />
                </div>
              </div>
              <p className="text-indigo-300 font-serif italic text-sm tracking-widest animate-pulse">
                {t("chat.connecting")}
              </p>
            </div>
          )}

          {session.status === "drawing" && (
            <div className="h-full flex flex-col items-center animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-lg md:text-xl font-serif text-white mb-2">
                  {t("chat.pick_cards")}
                </h3>
                <div className="flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < drawnIndices.length
                          ? "bg-indigo-400"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3 w-full max-w-2xl">
                {Array.from({ length: 16 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => drawCard(i)}
                    disabled={
                      drawnIndices.includes(i) || drawnIndices.length >= 3
                    }
                    className={`
                      aspect-[2/3] rounded-lg border transition-all duration-500 transform
                      ${
                        drawnIndices.includes(i)
                          ? "opacity-0 translate-y-[-100px] scale-0"
                          : "bg-gradient-to-br from-slate-900 via-[#1a1a24] to-black border-white/5 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      }
                    `}
                  >
                    <div className="flex items-center justify-center h-full text-white/5">
                      <Star size={18} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {session.status === "watching_ad" && (
            <div className="h-full flex flex-col items-center justify-center space-y-8 animate-fade-in text-center p-6">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-10" />
                <div className="w-20 h-20 bg-amber-500/10 rounded-3xl flex items-center justify-center border border-amber-500/20 rotate-12">
                  <Lock size={32} className="text-amber-400 -rotate-12" />
                </div>
              </div>
              <div className="max-w-xs">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-200 mb-3">
                  {t("chat.ad_title")}
                </h3>
                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  {t("chat.ad_desc")}
                </p>

                {adProgress === 0 ? (
                  <button
                    onClick={startAd}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 transform active:scale-95"
                  >
                    <PlayCircle size={20} />
                    {t("chat.ad_btn")}
                  </button>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-100 ease-linear"
                        style={{ width: `${adProgress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-bold">
                      {t("chat.ad_loading")} {adProgress}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {(session.status === "interpreting" ||
            session.status === "finished") && (
            <div className="max-w-2xl mx-auto space-y-12 animate-fade-in-up">
              {/* Question Banner */}
              <div className="relative p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 text-center overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Quote size={40} />
                </div>
                <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-[0.3em] block mb-2">
                  {t("chat.your_question")}
                </span>
                <p className="text-lg md:text-xl font-serif text-white/90 italic">
                  "{session.question}"
                </p>
              </div>

              {/* Spread Results */}
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {session.selectedCards.map((card, i) => (
                    <div key={card.id} className="relative group">
                      <div className="text-center mb-4">
                        <span
                          className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                            i === 0
                              ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-300"
                              : i === 1
                              ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                              : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                          } uppercase tracking-widest`}
                        >
                          {i === 0
                            ? t("chat.past")
                            : i === 1
                            ? t("chat.present")
                            : t("chat.future")}
                        </span>
                      </div>
                      <CardItem card={card} />
                    </div>
                  ))}
                </div>

                {/* Interpretation Section */}
                <div className="relative">
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-white/0 to-indigo-500/50" />

                  <div className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                    <div className="p-6 md:p-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-inner">
                          <BrainCircuit size={24} className="text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-serif text-xl font-bold text-white">
                            {t("chat.result_title")}
                          </h4>
                          <span className="text-[10px] text-indigo-500 uppercase tracking-widest font-bold">
                            {t("chat.result_by")}
                          </span>
                        </div>
                      </div>

                      {session.status === "interpreting" ? (
                        <div className="space-y-6">
                          <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                          <div className="h-4 bg-white/5 rounded-full w-5/6 animate-pulse" />
                          <div className="h-4 bg-white/5 rounded-full w-4/6 animate-pulse" />
                          <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                        </div>
                      ) : (
                        <div className="space-y-8">
                          {session.interpretation
                            .split("\n")
                            .map((line, idx) => {
                              if (!line.trim()) return null;
                              const isSummary =
                                line.includes("Lời khuyên tổng kết") ||
                                line.includes("Thông điệp cuối cùng");
                              return (
                                <p
                                  key={idx}
                                  className={`leading-relaxed transition-all duration-700 ${
                                    isSummary
                                      ? "p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-100 font-medium italic text-lg"
                                      : "text-slate-300 text-sm md:text-base"
                                  }`}
                                >
                                  {line}
                                </p>
                              );
                            })}
                        </div>
                      )}
                    </div>

                    {session.status === "finished" && (
                      <div className="bg-white/[0.02] p-6 border-t border-white/5 flex flex-col items-center gap-4">
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                          {t("chat.finished")}
                        </p>
                        <button
                          onClick={resetSession}
                          className="flex items-center gap-2 bg-white text-black hover:bg-indigo-50 px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                          <RefreshCw size={16} />
                          {t("chat.new_reading")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} className="h-10" />
        </div>

        <div className="bg-black/40 p-3 border-t border-white/5 text-center">
          <p className="text-[8px] md:text-[9px] text-slate-600 font-bold tracking-[0.2em] uppercase">
            © Mystic Oracle • AI Guidance
          </p>
        </div>
      </div>
    </div>
  );
};

export default TarotChat;
