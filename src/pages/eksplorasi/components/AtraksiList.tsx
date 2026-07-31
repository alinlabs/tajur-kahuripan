import React from "react";
import { OptionalAttraction } from "../../../types";
import { motion } from "motion/react";
import { getDriveResponsiveProps } from "../../../utils/imageUtils";

interface AttractionsProps {
  attractions: OptionalAttraction[];
  onOpenDetail: (att: OptionalAttraction) => void;
}

export default function AtraksiList({ attractions, onOpenDetail }: AttractionsProps) {
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar">
      <div className="flex flex-row w-full aspect-[4/3] md:aspect-[3/1] md:h-auto min-h-[300px] md:min-h-0">
        {attractions.map((att) => (
          <motion.div
            key={att.id}
            whileTap={{ scale: 0.99 }}
            className="w-full shrink-0 snap-center relative group cursor-pointer overflow-hidden bg-black"
            onClick={() => onOpenDetail(att)}
          >
            <img loading="lazy" decoding="async"
              {...getDriveResponsiveProps(att.image_url)}
              alt={att.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
              referrerPolicy="no-referrer"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-10 lg:p-12 w-full">
              <h3 className="font-serif text-xl md:text-4xl lg:text-5xl font-bold text-white mt-2 md:mt-0 drop-shadow-lg group-hover:text-luxury-gold-light transition-colors">
                {att.title}
              </h3>
              
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] md:text-xs font-mono tracking-widest text-[#d4b895] uppercase block mb-1 drop-shadow">Harga Tiket</span>
                  <div className="text-white text-base md:text-2xl font-bold tracking-wide drop-shadow-sm">
                    {formatIDR(att.base_price)} <span className="text-white/80 font-normal text-xs md:text-base">/ {att.pricing_type === 'per_pax' ? 'orang' : 'grup'}</span>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 md:px-6 md:py-3 bg-[#d4b895] hover:bg-[#c2a683] text-stone-900 rounded-full transition-colors text-[10px] md:text-sm font-bold shadow-lg"
                >
                  Lihat Detail
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

