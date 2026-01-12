import React, { useState } from "react";
import { Info } from "lucide-react";
import type { TarrotCard } from "@/data/tarrot.data";

interface Props {
  card: TarrotCard;
}

const CardItem: React.FC<Props> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group perspective-1000 h-72 md:h-80 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Face (Visual) */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl relative bg-slate-900">
            <img
              src={card.image}
              alt={card.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
              <h5 className="text-white font-serif font-bold text-base md:text-lg mb-1 leading-tight">
                {card.name}
              </h5>
              <div className="flex gap-1 flex-wrap">
                {card.keywords.slice(0, 2).map((kw) => (
                  <span
                    key={kw}
                    className="text-[7px] md:text-[8px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-400/10"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 opacity-60">
              <Info size={10} className="text-white" />
            </div>
          </div>
        </div>

        {/* Back Face (Details) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full w-full rounded-2xl bg-slate-900 border border-indigo-500/30 p-4 md:p-5 flex flex-col shadow-2xl">
            <h5 className="text-indigo-300 font-serif font-bold text-sm md:text-base mb-2 border-b border-indigo-500/10 pb-2">
              {card.name}
            </h5>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
              <div>
                <p className="text-[8px] md:text-[9px] uppercase font-bold text-slate-500 tracking-widest mb-1">
                  Ý nghĩa
                </p>
                <p className="text-[11px] md:text-xs text-slate-300 leading-relaxed italic">
                  "{card.meaning.overview}"
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <div className="bg-white/5 p-2 rounded-lg">
                  <p className="text-[8px] uppercase font-bold text-amber-300/60 mb-1">
                    Tình Yêu
                  </p>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {card.meaning.love}
                  </p>
                </div>
                <div className="bg-white/5 p-2 rounded-lg">
                  <p className="text-[8px] uppercase font-bold text-indigo-300/60 mb-1">
                    Công Việc
                  </p>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    {card.meaning.career}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-[8px] text-slate-600 font-bold uppercase tracking-widest">
              Chạm để lật
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
