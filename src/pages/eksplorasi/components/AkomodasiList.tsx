import React from "react";
import { Accommodation as AccommodationType } from "../../../types";
import { motion } from "motion/react";
import { getDriveResponsiveProps } from "../../../utils/imageUtils";

interface AccommodationProps {
  accommodations: AccommodationType[];
  onOpenDetail: (acc: AccommodationType) => void;
}

const INITIAL_IMAGES = [
  "https://drive.google.com/thumbnail?id=1hhFKSmRNzfoJFcTRGxN1pbv5dFlGckoJ&sz=w250",
  "https://drive.google.com/thumbnail?id=1hqvK2nKE7AFRO4gbkwNcZqRiM49pwJdQ&sz=w250",
  "https://drive.google.com/thumbnail?id=1-r4dl8cb5kyZxZj1-BgpK-6GTXGIrax1&sz=w250",
  "https://drive.google.com/thumbnail?id=1diVDyIMTgU6319_OXplfHpiERky24SLG&sz=w250",
  "https://drive.google.com/thumbnail?id=1yEZvAjNmxxlm-nnjweYze2a9a5VpULQf&sz=w250",
  "https://drive.google.com/thumbnail?id=1jEFlx4P84md6tw9KCVV0v9AZ8oF5lIU5&sz=w250",
  "https://drive.google.com/thumbnail?id=1dsjvS3hSAkowxpHppw-67J6qAeor779_&sz=w250",
  "https://drive.google.com/thumbnail?id=1qqwFW3AXkGeYTUIsOmMVC_S8cg4Z_e_i&sz=w250",
  "https://drive.google.com/thumbnail?id=1Lej8CjS6TWAmItN5Zz9Qrc9Qi08l1f9q&sz=w250",
  "https://drive.google.com/thumbnail?id=1x8o07CUR5TvP8u7LKSKoYMDAFCfCQinQ&sz=w250",
  "https://drive.google.com/thumbnail?id=1zl_QmjpBxkaNms4WiDbenDgGFvU9eIPD&sz=w250",
  "https://drive.google.com/thumbnail?id=1ZOVyiRTu8qGkyGWQZrca0Xr_qFMNPqHp&sz=w250",
  "https://drive.google.com/thumbnail?id=1VKvHdl19gPsVnj4T7eLQt5SZSZJBqy5M&sz=w250",
  "https://drive.google.com/thumbnail?id=1ESJsu2YWosDp4_E9QSy2-lWYnrvsBtR_&sz=w250"
];

export default function AkomodasiList({ accommodations, onOpenDetail }: AccommodationProps) {
  const [randomImages, setRandomImages] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const images: Record<string, string> = {};
    accommodations.forEach(acc => {
      images[acc.id] = INITIAL_IMAGES[0];
    });
    setRandomImages(images);
  }, [accommodations]);

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
        {accommodations.map((acc) => (
          <motion.div
            key={acc.id}
            whileTap={{ scale: 0.99 }}
            className="w-full shrink-0 snap-center relative group cursor-pointer overflow-hidden bg-black"
            onClick={() => onOpenDetail(acc)}
          >
            <img loading="lazy" decoding="async"
              {...getDriveResponsiveProps(randomImages[acc.id] || acc.image_url)}
              alt={acc.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
              referrerPolicy="no-referrer"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-10 lg:p-12 w-full">
              <h3 className="font-serif text-xl md:text-4xl lg:text-5xl font-bold text-white mt-2 md:mt-0 drop-shadow-lg group-hover:text-luxury-gold-light transition-colors">
                {acc.title}
              </h3>
              
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[10px] md:text-xs font-mono tracking-widest text-[#d4b895] uppercase block mb-1 drop-shadow">Mulai Dari</span>
                  <div className="text-white text-base md:text-2xl font-bold tracking-wide drop-shadow-sm">
                    {formatIDR(acc.base_price)} <span className="text-white/80 font-normal text-xs md:text-base">/ malam</span>
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
