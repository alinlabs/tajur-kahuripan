import { useMemo } from "react";
import { Sparkles, Compass, Leaf } from "lucide-react";
import { getDriveResponsiveProps } from "../../utils/imageUtils";
import { motion } from "motion/react";

const FEATURED_IMAGE = "https://drive.google.com/thumbnail?id=1lUgVDOeGxRGDlPGuo4lBFh8LeR6Hv4Us&sz=w1000";

const VIDEOS = [
  "https://cdn.pixabay.com/video/2023/09/09/179700-862597199_tiny.mp4",
  "https://cdn.pixabay.com/video/2022/12/16/143230-781991221_tiny.mp4",
  "https://cdn.pixabay.com/video/2023/08/09/175361-853243452_tiny.mp4",
  "https://cdn.pixabay.com/video/2023/05/18/163560-828200792_tiny.mp4",
];

export default function Tentang() {
  const randomVideo = useMemo(() => {
    return VIDEOS[0];
  }, []);

  const values = [
    {
      icon: <Leaf className="w-5 h-5 text-luxury-gold" />,
      title: "Harmoni Ekologis",
      desc: "Menjaga keasrian alam di kaki perbukitan hijau, membatasi polusi modern demi kelestarian masa depan."
    },
    {
      icon: <Compass className="w-5 h-5 text-luxury-gold" />,
      title: "Kearifan Budaya",
      desc: "Pelestarian tradisi sastra lisan, arsitektur panggung kayu, kriya anyaman bambu, dan kuliner tradisional."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-luxury-gold" />,
      title: "Edukasi Inklusif",
      desc: "Membuka wawasan bagi generasi muda dan perkotaan melalui kurikulum petualangan adat yang edukatif."
    }
  ];

  return (
    <section id="tentang" className="pt-12 pb-6 md:py-16 bg-luxury-beige relative overflow-hidden">
      {/* Background Video on Mobile */}
      <div className="md:hidden absolute top-0 left-0 right-0 w-full aspect-[4/5] overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          src={randomVideo}
          className="w-full h-full object-cover animate-fade-in"
        />
        {/* Soft gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-beige via-luxury-beige/65 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-white/90 via-white/30 to-transparent pointer-events-none" />
      </div>

      {/* Decorative Subtle Background Text */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-5 font-serif text-[10vw] font-bold text-luxury-green leading-none hidden md:block select-none">
        SAJATI
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="space-y-8">
          
          {/* Main Content */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div>
                <span className="text-xs font-mono tracking-widest text-luxury-green-dark uppercase block mb-3 font-semibold">
                  Filosofi & Budaya
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-luxury-green-dark tracking-tight leading-tight">
                  Bumi Pasundan <br />
                  Yang Autentik
                </h2>
              </div>

              <div className="w-16 h-[2px] bg-luxury-gold" />

              <p className="text-sm md:text-base text-luxury-charcoal/90 leading-relaxed font-light line-clamp-3 md:line-clamp-none">
                Nikmati keasrian alam pedesaan dan selami kearifan lokal Sunda yang autentik. Kami menghadirkan berbagai pilihan aktivitas budaya, edukasi, dan petualangan yang inklusif untuk semua kalangan.
              </p>
            </motion.div>

            {/* Featured Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="aspect-[16/9] md:aspect-[3/1] w-full overflow-hidden rounded-2xl shadow-lg border border-luxury-gold/10 relative group cursor-pointer"
            >
              <img
                loading="lazy" decoding="async"
                {...getDriveResponsiveProps(FEATURED_IMAGE)}
                alt="Lanskap Kampung Budaya Tajur"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm text-luxury-charcoal/70 leading-relaxed italic border-l-2 border-luxury-gold pl-4 py-2 bg-stone-100/40 rounded-r-xl pr-4 shadow-sm"
            >
              "Kampung Wisata Tajur Kahuripan adalah tempat di mana kehidupan bergerak selaras dengan ayunan alu penumbuk padi, gemericik air wahangan, dan petuah bijak para tetua adat."
            </motion.p>
          </div>

          {/* Quick Values / Pillars */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 -mx-6 px-6 pb-4 md:grid md:grid-cols-3 md:gap-6 md:px-0 md:pb-0 md:overflow-visible scrollbar-none">
            {values.map((v, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="w-[calc(100vw-3rem)] md:w-full shrink-0 md:shrink-1 snap-center flex flex-col gap-3 p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-luxury-gold/10 hover:border-luxury-gold/30 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-luxury-green-dark/5 flex items-center justify-center shrink-0 w-fit">
                    {v.icon}
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-luxury-green-dark leading-tight">{v.title}</h4>
                </div>
                <p className="text-xs text-luxury-charcoal/70 mt-1 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

