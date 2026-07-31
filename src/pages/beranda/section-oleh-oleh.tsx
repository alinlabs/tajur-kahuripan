import React from "react";
import { getDriveResponsiveProps } from "../../utils/imageUtils";
import { motion } from "motion/react";

export default function SectionOlehOleh() {
  const items = [
    {
      id: "oleh-1",
      title: "Gula Aren Asli",
      subtitle: "Khas Tajur Kahuripan",
      description: "Diolah secara tradisional dari nira pohon aren murni tanpa bahan pengawet.",
      image: "https://drive.google.com/thumbnail?id=1zEdQ-gFDEmgiC5Xp-GhXiB_MBl-VYovb&sz=w800",
      rotation: "-rotate-1 md:-rotate-2",
    },
    {
      id: "oleh-2",
      title: "Kerajinan Khas",
      subtitle: "Olahan Bambu & Kayu",
      description: "Hasil karya seni kriya unik buatan tangan para pengrajin lokal warga desa.",
      image: "https://drive.google.com/thumbnail?id=1IhEVqAymqtIFvugnMUNaTfJXzjZV50pS&sz=w800",
      rotation: "rotate-1 md:rotate-2",
    }
  ];

  return (
    <section className="py-8 md:py-14 bg-[#FAFAF9] border-t border-stone-200/50 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-6 md:mb-10">
          <span className="text-xs font-mono tracking-widest text-luxury-gold-dark uppercase font-semibold block mb-2">
            Produk Lokal Warga
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-luxury-green-dark font-bold">
            Oleh - Oleh Khas Desa
          </h2>
          <p className="text-stone-500 font-poppins text-xs md:text-sm mt-1 max-w-xl mx-auto">
            Cinderamata & produk olahan lokal autentik hasil karya masyarakat Tajur Kahuripan
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3.5 md:gap-8 lg:gap-10 max-w-5xl lg:max-w-6xl mx-auto px-1 py-2">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              whileTap={{ scale: 0.97 }}
              className={`transform ${item.rotation} bg-white rounded-2xl md:rounded-3xl p-2.5 md:p-6 shadow-sm hover:shadow-xl border border-stone-200/80 flex flex-col transition-all duration-300 cursor-pointer`}
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden bg-stone-100 mb-2 md:mb-5">
                <img
                  {...getDriveResponsiveProps(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div className="px-1 pb-1 text-center md:text-left">
                <h3 className="font-poppins text-xs md:text-xl font-bold text-stone-800 line-clamp-1">
                  {item.title}
                </h3>
                <p className="font-poppins text-[10px] md:text-sm text-luxury-gold-dark font-semibold mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
                <p className="hidden md:block font-poppins text-sm text-stone-500 mt-2.5 leading-relaxed line-clamp-2 font-light">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
