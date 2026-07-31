import React from "react";
import { MainPackage } from "../../../types";
import { motion } from "motion/react";
import { getDriveResponsiveProps } from "../../../utils/imageUtils";

interface MainPackagesProps {
  packages: MainPackage[];
  onOpenDetail: (pkg: MainPackage) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 25 } }
};


const MOBILE_PACKAGE_SLIDE_IMAGES: Record<string, string[]> = {
  "saba-budaya": [
    "https://drive.google.com/thumbnail?id=1eZGaJEroDDK_0119C5d71QZ4AO5L7hnR&sz=w250",
    "https://drive.google.com/thumbnail?id=1fL0bMiZgSkRz3wP1SCVr94opR7UJz_rg&sz=w250",
    "https://drive.google.com/thumbnail?id=19mXPyiXFp378ANSTkRUj70M6d9UjSiqZ&sz=w250"
  ],
  "ulin-pelemburan": [
    "https://drive.google.com/thumbnail?id=1BU8OqHhlcmnbds7A5Iyvn9-cxuwpk7aI&sz=w250",
    "https://drive.google.com/thumbnail?id=1CRV5NGSjWuqruCGWNJGvJhXvdEF-p88m&sz=w250",
    "https://drive.google.com/thumbnail?id=1fQABOcINMbtWxxykMdBNhCUOwZdXWLvl&sz=w250",
    "https://drive.google.com/thumbnail?id=1SVRI-NoD2pmjgFiPFymOm-X10iILW9gA&sz=w250",
    "https://drive.google.com/thumbnail?id=1Nh3IXddB-2mXSHwKep4-UduTWSrI5HEV&sz=w250"
  ]
};

const DESKTOP_PACKAGE_SLIDE_IMAGES: Record<string, string[]> = {
  "saba-budaya": [
    "https://drive.google.com/thumbnail?id=1eZGaJEroDDK_0119C5d71QZ4AO5L7hnR&sz=w250",
    "https://drive.google.com/thumbnail?id=1fL0bMiZgSkRz3wP1SCVr94opR7UJz_rg&sz=w250",
    "https://drive.google.com/thumbnail?id=19mXPyiXFp378ANSTkRUj70M6d9UjSiqZ&sz=w250"
  ],
  "ulin-pelemburan": [
    "https://drive.google.com/thumbnail?id=1BU8OqHhlcmnbds7A5Iyvn9-cxuwpk7aI&sz=w250",
    "https://drive.google.com/thumbnail?id=1CRV5NGSjWuqruCGWNJGvJhXvdEF-p88m&sz=w250",
    "https://drive.google.com/thumbnail?id=1fQABOcINMbtWxxykMdBNhCUOwZdXWLvl&sz=w250",
    "https://drive.google.com/thumbnail?id=1SVRI-NoD2pmjgFiPFymOm-X10iILW9gA&sz=w250",
    "https://drive.google.com/thumbnail?id=1Nh3IXddB-2mXSHwKep4-UduTWSrI5HEV&sz=w250"
  ]
};

function MobilePackageSlider({ pkg, activeTab, setActiveTab, cleanTitle, formatIDR }: {
  pkg: MainPackage;
  activeTab: string;
  setActiveTab: (tab: "lengkap" | "hemat") => void;
  cleanTitle: (title: string) => string;
  formatIDR: (num: number) => string;
}) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const images = React.useMemo(() => {
    const list = MOBILE_PACKAGE_SLIDE_IMAGES[pkg.id] || [pkg.image_url];
    return [...list];
  }, [pkg.id, pkg.image_url]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== activeSlide) {
      setActiveSlide(newIndex);
    }
  };

  const handleIndicatorClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveSlide(index);
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
    }
  };

  return (
    <div className="md:hidden relative w-full pt-4">
      {/* Floating Tabs overlapping top edge of card image */}
      <div className="absolute top-0 left-0 right-0 flex justify-center z-30 pointer-events-auto">
        <div className="flex items-center justify-center p-1 bg-white/95 backdrop-blur-md rounded-full max-w-[280px] mx-auto border border-stone-200/80 shadow-md">
          <button
            onClick={(e) => { e.stopPropagation(); setActiveTab("lengkap"); }}
            className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === "lengkap"
                ? "bg-luxury-green-dark text-white shadow-sm"
                : "text-stone-600 hover:text-luxury-green-dark"
            }`}
          >
            Paket Lengkap
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActiveTab("hemat"); }}
            className={`px-5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
              activeTab === "hemat"
                ? "bg-luxury-green-dark text-white shadow-sm"
                : "text-stone-600 hover:text-luxury-green-dark"
            }`}
          >
            Paket Hemat
          </button>
        </div>
      </div>

      {/* Card Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-md">
        {/* Sliding Images */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory overscroll-x-contain scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, idx) => (
            <img loading="lazy" decoding="async"
              key={idx}
              {...getDriveResponsiveProps(img)}
              alt={pkg.title}
              className="w-full min-w-full h-full object-cover shrink-0 snap-center snap-always pointer-events-none transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
              draggable={false}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

        <div className="absolute inset-0 px-5 pb-3 flex flex-col justify-end text-left text-white z-20 pointer-events-none">
          <h3 className="font-poppins text-lg font-bold text-white mb-2 leading-snug drop-shadow-sm">
            {cleanTitle(pkg.title)}
          </h3>
          
          <div className="flex items-center justify-between pointer-events-auto w-full">
            <div className="flex items-center gap-3">
              <div className="text-left">
                <span className="font-poppins text-[15px] font-bold text-white">
                  {formatIDR(pkg.base_price)}
                  <span className="text-[10px] font-normal text-white/70 ml-1">/ {pkg.pricing_type === 'per_pax' ? 'pax' : 'paket'}</span>
                </span>
              </div>
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-1 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm border border-white/5">
                {images.map((_, idx) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopPackageSlider({ pkg, cleanTitle, formatIDR, onOpenDetail }: {
  pkg: MainPackage;
  cleanTitle: (title: string) => string;
  formatIDR: (num: number) => string;
  onOpenDetail: (pkg: MainPackage) => void;
}) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const images = React.useMemo(() => {
    const list = DESKTOP_PACKAGE_SLIDE_IMAGES[pkg.id] || [pkg.image_url];
    return [...list];
  }, [pkg.id, pkg.image_url]);

  const handleIndicatorClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveSlide(index);
  };

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-3xl" onClick={() => onOpenDetail(pkg)}>
      {/* Background Images with Fade transition */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: activeSlide === idx ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            {...getDriveResponsiveProps(img)}
            alt={`${pkg.title} slide ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Slide Indicators on Desktop */}
      {images.length > 1 && (
        <div className="absolute top-5 right-5 z-20 flex gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 pointer-events-auto">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleIndicatorClick(e, idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx ? "bg-[#C5A859] w-4" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Content overlay */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between items-start text-left pointer-events-none">
        <div className="w-full pr-16 md:pr-24 pointer-events-auto">
          <h3 className="font-poppins text-xl md:text-2xl font-bold text-white uppercase tracking-wider drop-shadow-md">
            {cleanTitle(pkg.title)}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-4 w-full pointer-events-auto">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-white/80 uppercase block mb-0.5 drop-shadow-sm">Mulai Dari</span>
            <span className="font-poppins text-base md:text-lg font-bold text-white drop-shadow-md">
              {formatIDR(pkg.base_price)}
              <span className="text-xs font-normal text-white/80"> / {pkg.pricing_type === 'per_pax' ? 'pax' : 'grup'}</span>
            </span>
          </div>
          <button className="text-xs md:text-sm font-semibold text-white hover:text-white/80 transition-colors drop-shadow-sm">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MainPackages({ packages, onOpenDetail }: MainPackagesProps) {
  const [activeTab, setActiveTab] = React.useState<"lengkap" | "hemat">("lengkap");

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const cleanTitle = (title: string) => {
    return title.replace(/paket/gi, "").trim();
  };

  const shouldShowOnMobile = (pkgId: string) => {
    if (activeTab === "lengkap" && pkgId === "saba-budaya") return true;
    if (activeTab === "hemat" && pkgId === "ulin-pelemburan") return true;
    return false;
  };

  return (
    <div className="w-full">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {packages.map((pkg) => {
          const showMobile = shouldShowOnMobile(pkg.id);
          return (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              className={`group relative overflow-hidden cursor-pointer w-full ${
                showMobile ? "block" : "hidden md:block"
              } md:rounded-3xl md:shadow-lg md:shadow-stone-200/50`}
              onClick={() => onOpenDetail(pkg)}
            >
              <MobilePackageSlider pkg={pkg} activeTab={activeTab} setActiveTab={setActiveTab} cleanTitle={cleanTitle} formatIDR={formatIDR} />
              
              {/* DESKTOP ONLY: 2 cards in 1 row */}
              <div className="hidden md:block w-full">
                <DesktopPackageSlider pkg={pkg} cleanTitle={cleanTitle} formatIDR={formatIDR} onOpenDetail={onOpenDetail} />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
