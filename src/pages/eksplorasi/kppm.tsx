import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Award, GraduationCap, ArrowUpRight, Compass, Leaf, Users, BookOpen } from "lucide-react";
import { getDriveResponsiveProps } from "../../utils/imageUtils";

const IMAGES_BAJAK_SAWAH = [
  "https://drive.google.com/thumbnail?id=19Vi5gk1cRn8XwzJqFeMngcPYdDVOWQ-0&sz=w250",
  "https://drive.google.com/thumbnail?id=1v4LGzh76pMVz6sXhVD7-Q2M1W-cFJA5c&sz=w250",
  "https://drive.google.com/thumbnail?id=1ZKxr9x2LhypcNM1aC79tFAntPdQh-tsD&sz=w250",
  "https://drive.google.com/thumbnail?id=1_nUA5tX3JYBAArv5XnAoRP1nZtdj4WVV&sz=w250",
  "https://drive.google.com/thumbnail?id=1FU-HD-l-v4uWM8LHam41O-ILqM-WEdN5&sz=w250",
  "https://drive.google.com/thumbnail?id=1JQ6-lJvz2zpdedHQAIdBho06OaF3YJz2&sz=w250",
  "https://drive.google.com/thumbnail?id=1fT7-oXWfzH-iM5Dva_39gwMvHCt1ZsP2&sz=w250"
];

const IMAGES_KAULINAN_AIR = [
  "https://drive.google.com/thumbnail?id=1eZGaJEroDDK_0119C5d71QZ4AO5L7hnR&sz=w250",
  "https://drive.google.com/thumbnail?id=1fL0bMiZgSkRz3wP1SCVr94opR7UJz_rg&sz=w250",
  "https://drive.google.com/thumbnail?id=19mXPyiXFp378ANSTkRUj70M6d9UjSiqZ&sz=w250"
];

const IMAGES_NGAGUBYAG = [
  "https://drive.google.com/thumbnail?id=1qX1tSA8R_A_HsUV2EK92lNCsVikMEcW5&sz=w250",
  "https://drive.google.com/thumbnail?id=1zT8NdKHgPGJlPxyYdGW2dWXyTwrhL5fc&sz=w250",
  "https://drive.google.com/thumbnail?id=1aD9Yn4DbXRqJM9Ku7eWBV39zYICKrYF1&sz=w250",
  "https://drive.google.com/thumbnail?id=1Xw12A7UCtUQ0-DmwOQSyxcaYiL_xjfqb&sz=w250"
];

const IMAGES_ANYAMAN_BAMBU = [
  "https://drive.google.com/thumbnail?id=1vbvCn2h7Z1JJ48remzBx_fFVm451O_XO&sz=w250",
  "https://drive.google.com/thumbnail?id=1Kk1qPvpIG6FQX1t5aqpJC2W0pmN6xFpY&sz=w250",
  "https://drive.google.com/thumbnail?id=1mlIjcg_ctZZ_O2kcpvFqDyJklATot9CK&sz=w250"
];

const IMAGES_JELAJAH_DESA = [
  "https://drive.google.com/thumbnail?id=1BU8OqHhlcmnbds7A5Iyvn9-cxuwpk7aI&sz=w250",
  "https://drive.google.com/thumbnail?id=1CRV5NGSjWuqruCGWNJGvJhXvdEF-p88m&sz=w250",
  "https://drive.google.com/thumbnail?id=1fQABOcINMbtWxxykMdBNhCUOwZdXWLvl&sz=w250",
  "https://drive.google.com/thumbnail?id=1SVRI-NoD2pmjgFiPFymOm-X10iILW9gA&sz=w250",
  "https://drive.google.com/thumbnail?id=1Nh3IXddB-2mXSHwKep4-UduTWSrI5HEV&sz=w250"
];

const IMAGES_TUTUNGGULAN = [
  "https://drive.google.com/thumbnail?id=1-dA5Zzfajp1S3aOVsxC-9XUEQ1dHzQC7&sz=w250",
  "https://drive.google.com/thumbnail?id=1jvfuJo3XwbRR3fh-Zqzq_lxpEcJsKZ4K&sz=w250",
  "https://drive.google.com/thumbnail?id=1VsMQ4TgBlY2TueDf9GyHPKRZkFDf6rVN&sz=w250",
  "https://drive.google.com/thumbnail?id=12wJ19V6D3IT9w_AODW1ygsUa6GufgP-K&sz=w250"
];

const IMAGES_RANDOM = [
  "https://drive.google.com/thumbnail?id=12FXVbexHFR7JBHpL5TLRG7qTLONdwXkJ&sz=w250",
  "https://drive.google.com/thumbnail?id=1jBdJMMkf8BP6En8gOT446IVxbzR5y_PA&sz=w250",
  "https://drive.google.com/thumbnail?id=1sd6iLocJqIkFuUL9JBh9mHRUeELpvAWN&sz=w250",
  "https://drive.google.com/thumbnail?id=1A_mrkTbbLwBRGfvkiiMvTNiwd-2qNG2l&sz=w250",
  "https://drive.google.com/thumbnail?id=1cTqji0xelEGondckDCwWJ5WcDBV6LlEm&sz=w250",
  "https://drive.google.com/thumbnail?id=1Aadh5y-FnIeCm8CIdorF66IDN4lhx3iG&sz=w250",
  "https://drive.google.com/thumbnail?id=1od_3ynrLa_1pTllWO66adObTBgnUCt5u&sz=w250",
  "https://drive.google.com/thumbnail?id=1gqxCRHtpjvzMERnXIIEe5PI9PbM-W5h2&sz=w250",
  "https://drive.google.com/thumbnail?id=1LKAfuoodDaE_zfjt49VanMnuaPOdmiCe&sz=w250",
  "https://drive.google.com/thumbnail?id=1xuuTlLsxusG3j_r3lLV2JU6QEjL0WE_V&sz=w250",
  "https://drive.google.com/thumbnail?id=1CSsaHDOQQjUtH62Ivdt5eqI8PGEjNuUa&sz=w250",
  "https://drive.google.com/thumbnail?id=1gplZKE1Gzqy7nP-FnB0cLBRC7QfYpbiD&sz=w250",
  "https://drive.google.com/thumbnail?id=1DBSln4hRfBxDK9sh6V2ojPrltYUmKsGK&sz=w250",
  "https://drive.google.com/thumbnail?id=1GK8QHXsByGw-hlmxgWtkXtNJ24sPOOm6&sz=w250",
  "https://drive.google.com/thumbnail?id=1yClf0QinZHZ3hNZAKeVhjx_stYEzio__&sz=w250",
  "https://drive.google.com/thumbnail?id=1_KFxCPMI-A92hNOUSSSEfwUWBd3JrX6u&sz=w250",
  "https://drive.google.com/thumbnail?id=1AxHwnPjoQGhe7hYL_XU9D4VJIVSPNPxO&sz=w250",
  "https://drive.google.com/thumbnail?id=1l61PBsaG1BUehrKasIqnm4vj7MNCe3Zv&sz=w250"
];

const IMAGES_MUSIK = [
  "https://drive.google.com/thumbnail?id=1JKJgtMdjhEfKKXBYRcK9tEdMsMHPqEFn&sz=w250",
  "https://drive.google.com/thumbnail?id=1bqA13ZXrftb4G202vAP7Q_nWQjXtHDhY&sz=w250",
  "https://drive.google.com/thumbnail?id=18UfJkqJ_aJa8GwlJrT5rwKSwf-G4ECPd&sz=w250",
  "https://drive.google.com/thumbnail?id=1w_Xx3bBZK2PqxzhWAJjcdpBVFfFMaRrH&sz=w250",
  "https://drive.google.com/thumbnail?id=1nMs2kqii7gTrnsnWAy8YeNQiCp1oSa-g&sz=w250",
  "https://drive.google.com/thumbnail?id=1XY-8WkRYvasP6lbUid4SUXgBTlFzsyuv&sz=w250",
  "https://drive.google.com/thumbnail?id=1HRCBbYMJzn8XmYNHC99HN4pPBcQF_IqG&sz=w250"
];

const IMAGES_API_UNGGUN = [
  "https://drive.google.com/thumbnail?id=1USqBAcEsGLIkLdsD8AR8SURbuaFY4oB3&sz=w250"
];

const IMAGES_GULA_AREN = [
  "https://drive.google.com/thumbnail?id=1zEdQ-gFDEmgiC5Xp-GhXiB_MBl-VYovb&sz=w250",
  "https://drive.google.com/thumbnail?id=1KBro8QM6wfQ5CtD745PwkdCsPntmjeNM&sz=w250",
  "https://drive.google.com/thumbnail?id=1ZabG9jU3qR-o9iBR0y4-scL8zY0QMSsj&sz=w250"
];

const COLLAGE_IMAGES = [
  ...IMAGES_BAJAK_SAWAH,
  ...IMAGES_KAULINAN_AIR,
  ...IMAGES_NGAGUBYAG,
  ...IMAGES_ANYAMAN_BAMBU,
  ...IMAGES_JELAJAH_DESA,
  ...IMAGES_TUTUNGGULAN,
  ...IMAGES_GULA_AREN,
  ...IMAGES_RANDOM,
  ...IMAGES_MUSIK,
  ...IMAGES_API_UNGGUN
];

export default function Kppm() {
  const [isKppmOpen, setIsKppmOpen] = useState(false);

  useEffect(() => {
    if (isKppmOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isKppmOpen]);

  // Duplicate the list of images to ensure a perfectly seamless infinite scroll loop
  const duplicatedImages = useMemo(() => {
    const shuffled = [...COLLAGE_IMAGES].sort(() => Math.random() - 0.5);
    return [...shuffled, ...shuffled];
  }, []);

  return (
    <section id="kppm" className="py-16 bg-luxury-beige-dark border-t border-luxury-gold/10 overflow-hidden relative">
      {/* Subtle Background Graphics */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-luxury-green/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-6 md:px-12 text-center md:mb-10 relative z-10"
      >
        {/* Category Label */}
        <span className="text-[11px] font-mono tracking-[0.2em] text-luxury-gold-dark uppercase font-semibold block mb-3">
          Sinergi Inovasi Digital
        </span>

        {/* Title */}
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-luxury-green-dark mb-4 tracking-tight leading-tight">
          <span className="block md:inline-block">KPPM STIE WIKARA</span>
          <span className="block md:mt-1">DESA PASANGGRAHAN 2026</span>
        </h2>

        {/* Short Description */}
        <p className="text-sm md:text-base text-luxury-charcoal/75 max-w-3xl mx-auto leading-relaxed">
          Wujud nyata program kuliah praktik pengabdian masyarakat mahasiswa STIE Wibawa Karta Raharja di Desa Pasanggrahan 2026
        </p>
      </motion.div>

      {/* Smooth, Infinitely Looping Collage Carousel (Right to Left) */}
      <div className="relative w-full overflow-hidden py-4 my-2 md:my-0 select-none pointer-events-none md:pointer-events-auto">
        {/* Vignette Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-luxury-beige-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-luxury-beige-dark to-transparent z-10 pointer-events-none" />

        {/* The Marquee Row */}
        <div className="animate-marquee flex gap-4 md:gap-6">
          {duplicatedImages.map((src, idx) => (
            <div
              key={idx}
              className="w-48 h-32 md:w-72 md:h-48 rounded-2xl overflow-hidden shrink-0 shadow-md border border-luxury-gold/5 transition-transform duration-500 hover:scale-[1.03] hover:shadow-lg"
            >
              <img decoding="async"
                {...getDriveResponsiveProps(src)}
                alt={`Kampung Tajur Collage ${idx}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center mt-6 md:mt-10 relative z-10">
        {/* Details CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsKppmOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-luxury-green-dark hover:bg-luxury-green text-white font-mono uppercase tracking-widest text-[11px] font-bold rounded-full shadow-md transition-all cursor-pointer"
        >
          <span>Informasi Seputar Desa</span>
          <ArrowUpRight className="w-4 h-4 text-luxury-gold-light" />
        </motion.button>
      </div>

      {/* Modal Popup Details */}
      <AnimatePresence>
        {isKppmOpen && (
          <div className="fixed inset-0 z-50 flex items-center md:items-center items-end justify-center md:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsKppmOpen(false)}
              className="absolute inset-0 bg-luxury-charcoal/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 100 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl h-[85vh] md:h-auto flex flex-col bg-luxury-beige-dark border border-luxury-gold/30 rounded-t-3xl md:rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden text-left"
            >
              {/* Decorative Subtle Background Graphics */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-luxury-gold/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-36 h-36 bg-luxury-green/10 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsKppmOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer z-20"
                aria-label="Tutup Detail"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Info */}
              <div className="flex items-center gap-3.5 mb-5 pr-8 border-b border-luxury-gold/15 pb-4">
                <div className="p-3 bg-luxury-green-dark/10 rounded-2xl text-luxury-green-dark shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase block mb-0.5">
                    SEJARAH DESA
                  </span>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-luxury-green-dark leading-snug">
                    Ringkasan Sejarah Kampung Tajur Kahuripan
                  </h3>
                </div>
              </div>

              {/* Content body */}
              <div className="space-y-4 font-sans text-sm text-luxury-charcoal/85 leading-relaxed overflow-y-auto flex-1 md:flex-none md:max-h-[60vh] pr-2 custom-scrollbar">
                
                <p className="bg-white/60 border border-luxury-gold/15 p-4 rounded-2xl text-xs md:text-sm leading-relaxed text-stone-700">
                  Kampung Tajur Kahuripan berada di Desa Pasanggrahan, Kecamatan Bojong, Kabupaten Purwakarta, di kaki Gunung Burangrang pada ketinggian sekitar 800 mdpl dengan suhu rata-rata 25°C. Menurut cerita masyarakat, kampung ini telah ada sejak sekitar tahun 1600-an pada masa kolonial Belanda. Salah satu tokoh pentingnya adalah Eyang Pandita, seorang ulama yang datang bersama rombongan Kerajaan Mataram untuk menyebarkan agama Islam. Makam beliau hingga kini berada di Kampung Tajur.
                </p>

                <p className="bg-white/60 border border-luxury-gold/15 p-4 rounded-2xl text-xs md:text-sm leading-relaxed text-stone-700">
                  Desa Pasanggrahan telah dikenal sebagai lokasi kegiatan Latihan Dasar Kepemimpinan Siswa (LDKS) sejak tahun 1981. Seiring waktu, banyak lembaga pendidikan dari Jakarta dan sekitarnya berkunjung ke wilayah ini. Pada tahun 2004–2005, atas usulan Kepala Desa Alm. Roib Sobari dan dukungan Wakil Bupati Purwakarta H. Dedi Mulyadi, Kampung Tajur ditata menjadi destinasi wisata berbasis budaya dan lingkungan dengan nama Kampung Kahuripan.
                </p>

                <p className="bg-white/60 border border-luxury-gold/15 p-4 rounded-2xl text-xs md:text-sm leading-relaxed text-stone-700">
                  Kampung Tajur memiliki sekitar 43 rumah panggung bergaya arsitektur Sunda Julang Ngapak yang dicat hitam putih sebagai ciri khasnya. Wisatawan dapat menikmati konsep homestay di rumah warga serta mengikuti aktivitas sehari-hari masyarakat. Kampung ini juga dikenal sebagai wisata berbasis masyarakat (Community-Based Ecotourism) yang mengedepankan pelestarian budaya, lingkungan, dan kearifan lokal.
                </p>

                <p className="bg-white/60 border border-luxury-gold/15 p-4 rounded-2xl text-xs md:text-sm leading-relaxed text-stone-700">
                  Secara administratif Kampung Tajur berada di Desa Pasanggrahan yang memiliki luas wilayah sekitar 724,751 hektare dan telah tercantum dalam RIPPARPROV Jawa Barat 2015–2025 sebagai bagian dari kawasan pengembangan wisata. Meskipun belum berstatus resmi sebagai Desa Wisata, Kampung Tajur telah terdaftar sebagai salah satu objek wisata Kabupaten Purwakarta.
                </p>

                {/* Slogan Kampung Tajur Kahuripan */}
                <div className="bg-luxury-green-dark/10 border border-luxury-green-dark/20 p-5 rounded-2xl">
                  <h4 className="font-serif font-bold text-luxury-green-dark mb-3 text-xs uppercase tracking-widest flex items-center gap-2">
                    <Compass className="w-4 h-4 text-luxury-gold-dark" />
                    Slogan Kampung Tajur Kahuripan
                  </h4>
                  <ul className="space-y-1.5 text-xs md:text-sm font-serif italic text-luxury-green-dark">
                    <li className="flex items-center gap-2">
                      <span className="text-luxury-gold font-bold">•</span>
                      <span>Niiskeun Hate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-luxury-gold font-bold">•</span>
                      <span>Niiskeun Fikir</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-luxury-gold font-bold">•</span>
                      <span>Mulang Ka Lembur</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-luxury-gold font-bold">•</span>
                      <span>Lembur Kuring, Lembur Kahuripan</span>
                    </li>
                  </ul>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
