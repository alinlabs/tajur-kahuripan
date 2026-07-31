import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Users, Map } from "lucide-react";
import { MainPackage, OptionalAttraction, Accommodation } from "../types";
import { getDriveResponsiveProps } from "../utils/imageUtils";

type DrawerItem = MainPackage | OptionalAttraction | Accommodation | null;

interface DetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: DrawerItem;
  type: "package" | "attraction" | "accommodation" | null;
  onBook: () => void;
}

export default function DetailDrawer({ isOpen, onClose, item, type, onBook }: DetailDrawerProps) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveSlide(0);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0;
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, item]);

  const getSlideImages = () => {
    if (!item || !type) return [];
    if (type === "package") {
      let imgs: string[] = [];
      if (item.id === "saba-budaya") {
        imgs = [
          "https://drive.google.com/thumbnail?id=1eZGaJEroDDK_0119C5d71QZ4AO5L7hnR&sz=w250",
          "https://drive.google.com/thumbnail?id=1fL0bMiZgSkRz3wP1SCVr94opR7UJz_rg&sz=w250",
          "https://drive.google.com/thumbnail?id=19mXPyiXFp378ANSTkRUj70M6d9UjSiqZ&sz=w250"
        ];
      } else if (item.id === "ulin-pelemburan") {
        imgs = [
          "https://drive.google.com/thumbnail?id=1BU8OqHhlcmnbds7A5Iyvn9-cxuwpk7aI&sz=w250",
          "https://drive.google.com/thumbnail?id=1CRV5NGSjWuqruCGWNJGvJhXvdEF-p88m&sz=w250",
          "https://drive.google.com/thumbnail?id=1fQABOcINMbtWxxykMdBNhCUOwZdXWLvl&sz=w250",
          "https://drive.google.com/thumbnail?id=1SVRI-NoD2pmjgFiPFymOm-X10iILW9gA&sz=w250",
          "https://drive.google.com/thumbnail?id=1Nh3IXddB-2mXSHwKep4-UduTWSrI5HEV&sz=w250"
        ];
      } else {
        imgs = [item.image_url];
      }
      return [...imgs];
    }
    if (type === "attraction") {
      const ATTRACTION_SLIDE_IMAGES: Record<string, string[]> = {
        "bajak-sawah": [
          "https://drive.google.com/thumbnail?id=19Vi5gk1cRn8XwzJqFeMngcPYdDVOWQ-0&sz=w250",
          "https://drive.google.com/thumbnail?id=1v4LGzh76pMVz6sXhVD7-Q2M1W-cFJA5c&sz=w250",
          "https://drive.google.com/thumbnail?id=1ZKxr9x2LhypcNM1aC79tFAntPdQh-tsD&sz=w250",
          "https://drive.google.com/thumbnail?id=1_nUA5tX3JYBAArv5XnAoRP1nZtdj4WVV&sz=w250",
          "https://drive.google.com/thumbnail?id=1FU-HD-l-v4uWM8LHam41O-ILqM-WEdN5&sz=w250",
          "https://drive.google.com/thumbnail?id=1JQ6-lJvz2zpdedHQAIdBho06OaF3YJz2&sz=w250",
          "https://drive.google.com/thumbnail?id=1fT7-oXWfzH-iM5Dva_39gwMvHCt1ZsP2&sz=w250"
        ],
        "ngagubyag": [
          "https://drive.google.com/thumbnail?id=1qX1tSA8R_A_HsUV2EK92lNCsVikMEcW5&sz=w250",
          "https://drive.google.com/thumbnail?id=1zT8NdKHgPGJlPxyYdGW2dWXyTwrhL5fc&sz=w250",
          "https://drive.google.com/thumbnail?id=1aD9Yn4DbXRqJM9Ku7eWBV39zYICKrYF1&sz=w250",
          "https://drive.google.com/thumbnail?id=1Xw12A7UCtUQ0-DmwOQSyxcaYiL_xjfqb&sz=w250"
        ],
        "tutunggulan": [
          "https://drive.google.com/thumbnail?id=1-dA5Zzfajp1S3aOVsxC-9XUEQ1dHzQC7&sz=w250",
          "https://drive.google.com/thumbnail?id=1JKJgtMdjhEfKKXBYRcK9tEdMsMHPqEFn&sz=w250",
          "https://drive.google.com/thumbnail?id=1bqA13ZXrftb4G202vAP7Q_nWQjXtHDhY&sz=w250",
          "https://drive.google.com/thumbnail?id=18UfJkqJ_aJa8GwlJrT5rwKSwf-G4ECPd&sz=w250",
          "https://drive.google.com/thumbnail?id=1w_Xx3bBZK2PqxzhWAJjcdpBVFfFMaRrH&sz=w250",
          "https://drive.google.com/thumbnail?id=1nMs2kqii7gTrnsnWAy8YeNQiCp1oSa-g&sz=w250",
          "https://drive.google.com/thumbnail?id=1XY-8WkRYvasP6lbUid4SUXgBTlFzsyuv&sz=w250",
          "https://drive.google.com/thumbnail?id=1HRCBbYMJzn8XmYNHC99HN4pPBcQF_IqG&sz=w250",
          "https://drive.google.com/thumbnail?id=1jvfuJo3XwbRR3fh-Zqzq_lxpEcJsKZ4K&sz=w250",
          "https://drive.google.com/thumbnail?id=1VsMQ4TgBlY2TueDf9GyHPKRZkFDf6rVN&sz=w250",
          "https://drive.google.com/thumbnail?id=12wJ19V6D3IT9w_AODW1ygsUa6GufgP-K&sz=w250"
        ],
        "gula-aren": [
          "https://drive.google.com/thumbnail?id=1zEdQ-gFDEmgiC5Xp-GhXiB_MBl-VYovb&sz=w250",
          "https://drive.google.com/thumbnail?id=1KBro8QM6wfQ5CtD745PwkdCsPntmjeNM&sz=w250",
          "https://drive.google.com/thumbnail?id=1ZabG9jU3qR-o9iBR0y4-scL8zY0QMSsj&sz=w250"
        ],
        "anyaman-bambu": [
          "https://drive.google.com/thumbnail?id=1vbvCn2h7Z1JJ48remzBx_fFVm451O_XO&sz=w250",
          "https://drive.google.com/thumbnail?id=1Kk1qPvpIG6FQX1t5aqpJC2W0pmN6xFpY&sz=w250",
          "https://drive.google.com/thumbnail?id=1mlIjcg_ctZZ_O2kcpvFqDyJklATot9CK&sz=w250"
        ]
      };
      const imgs = ATTRACTION_SLIDE_IMAGES[item.id] || [item.image_url];
      return [...imgs];
    }
    if (type === "accommodation") {
      const images = [
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
      // Note: DetailDrawer getSlideImages is called on render, so to avoid re-shuffling on scroll, we rely on the component state if we want to shuffle, or we just let it be random on open.
      return [...images];
    }
    return [item.image_url];
  };

  const slideImages = React.useMemo(() => getSlideImages(), [item?.id, type, isMobile]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.clientWidth;
    if (width === 0) return;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== activeSlide && newIndex >= 0 && newIndex < slideImages.length) {
      setActiveSlide(newIndex);
    }
  };

  const handleIndicatorClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveSlide(index);
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * index, behavior: "smooth" });
    }
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  if (!item || !type) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-luxury-charcoal/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            
            
            
            className="fixed bottom-0 left-0 right-0 z-50 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-full md:max-w-2xl md:rounded-3xl bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-2xl flex flex-col h-[calc(100dvh-80px)] md:h-auto mt-16 md:mt-0 md:max-h-[85vh] overflow-hidden"
          >

            {/* Header Image */}
            <div className="relative w-full shrink-0 min-h-0" style={{ aspectRatio: "16/9" }}>
              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory overscroll-x-contain scroll-smooth [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {slideImages.map((img, idx) => (
                  <img loading="lazy" decoding="async"
                    key={idx}
                    {...getDriveResponsiveProps(img)}
                    alt={`${item.title} - ${idx + 1}`}
                    className="w-full min-w-full h-full object-cover shrink-0 snap-center snap-always"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent pointer-events-none" />
              
              {/* Slide Indicators */}
              {slideImages.length > 1 && (
                <div className="absolute top-4 left-4 z-20 flex gap-1 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5 pointer-events-auto">
                  {slideImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => handleIndicatorClick(e, idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        activeSlide === idx ? "bg-[#C5A859] w-3.5" : "bg-white/40 hover:bg-white/70"
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-6 right-6">
                <h3 className="font-poppins text-lg text-white font-bold leading-tight">
                  {item.title.replace(/^Paket\s+/i, '')}
                </h3>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-6 md:p-8 flex-1 space-y-8 bg-[white]">
              <div>
                <h4 className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase mb-3 font-semibold">
                  Ketentuan
                </h4>
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase mb-1">Minimum Order</span>
                    <span className="font-poppins text-base font-semibold text-luxury-charcoal">
                      {item.min_pax} Pax
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase mb-1">Harga</span>
                    <span className="font-poppins text-base font-semibold text-luxury-green-dark">
                      {formatIDR(item.base_price)} <span className="text-xs font-sans font-normal text-stone-500">/ {item.pricing_type === 'per_pax' ? 'Pax' : item.pricing_type === 'per_night' ? 'Malam' : 'Grup'}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase mb-3 font-semibold">
                  Deskripsi
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {type === 'package' && (item as MainPackage).routes && (
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase mb-4 font-semibold flex items-center gap-2">
                    <Map className="w-4 h-4" /> Rute & Aktivitas
                  </h4>
                  <div className="space-y-4">
                    {(item as MainPackage).routes?.map((route, i) => (
                      <div key={i} className="pl-4 border-l-2 border-luxury-gold/30 relative">
                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-luxury-gold" />
                        <h5 className="text-sm font-semibold text-luxury-green-dark mb-1">{route.name}</h5>
                        <ul className="space-y-1">
                          {route.activities.map((act, j) => (
                            <li key={j} className="text-xs text-stone-500 flex items-start gap-2">
                              <span className="text-luxury-gold/50 mt-0.5">•</span>
                              {act}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase mb-3 font-semibold">
                  Termasuk
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-luxury-green shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {type === 'accommodation' && (item as Accommodation).general_facilities && (
                <div>
                  <h4 className="text-[10px] font-mono tracking-widest text-luxury-gold-dark uppercase mb-3 font-semibold">
                    Fasilitas Umum Kampung
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(item as Accommodation).general_facilities.map((fac, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-stone-600">
                        <span className="text-luxury-gold shrink-0 mt-0.5">•</span>
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Footer */}
            <div className="p-4 md:p-6 border-t border-stone-200/60 bg-[white] shrink-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBook}
                className="w-full bg-luxury-green-dark text-white font-medium py-3.5 rounded-2xl hover:bg-luxury-green transition-colors shadow-lg shadow-stone-200/50 text-sm tracking-wide"
              >
                Pilih & Rencanakan Trip
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
