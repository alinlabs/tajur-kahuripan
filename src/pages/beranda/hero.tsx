import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowRight, Search, X, ArrowLeft, Sparkles, MapPin, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { TourismData, MainPackage, OptionalAttraction, Accommodation } from "../../types";
import DetailDrawer from "../../components/DetailDrawer";
import { getDriveResponsiveProps } from "../../utils/imageUtils";

const VIDEOS = [
  "https://cdn.pixabay.com/video/2023/09/09/179700-862597199_tiny.mp4",
  "https://cdn.pixabay.com/video/2022/12/16/143230-781991221_tiny.mp4",
  "https://cdn.pixabay.com/video/2023/08/09/175361-853243452_tiny.mp4",
  "https://cdn.pixabay.com/video/2023/05/18/163560-828200792_tiny.mp4",
];

interface HeroProps {
  onExplore: () => void;
  data?: TourismData;
}

export default function Hero({ onExplore, data }: HeroProps) {
  const [videoIndex, setVideoIndex] = useState(() => Math.floor(Math.random() * VIDEOS.length));
  const currentVideo = VIDEOS[videoIndex];

  const handleVideoEnded = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % VIDEOS.length);
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSearchItem, setSelectedSearchItem] = useState<MainPackage | OptionalAttraction | Accommodation | null>(null);
  const [selectedSearchType, setSelectedSearchType] = useState<"package" | "attraction" | "accommodation" | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsTextVisible(true);
      window.dispatchEvent(new CustomEvent("heroTextVisibilityChange", { detail: true }));
      return;
    }

    let timeout: NodeJS.Timeout;
    
    const cycleVisibility = () => {
      setIsTextVisible(true);
      window.dispatchEvent(new CustomEvent("heroTextVisibilityChange", { detail: true }));
      
      timeout = setTimeout(() => {
        setIsTextVisible(false);
        window.dispatchEvent(new CustomEvent("heroTextVisibilityChange", { detail: false }));
        
        timeout = setTimeout(cycleVisibility, 7000); // hidden for 7s
      }, 7000); // visible for 7s
    };
    
    cycleVisibility();

    return () => clearTimeout(timeout);
  }, [isMobile]);

  const QUICK_TAGS = [
    { label: "Saba Budaya", query: "saba" },
    { label: "Edukasi Tani", query: "tani" },
    { label: "Tenun Ikat", query: "tenun" },
    { label: "Homestay", query: "homestay" },
    { label: "Kuliner Sunda", query: "kuliner" }
  ];

  // Search Logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !data) return { packages: [], attractions: [], accommodations: [] };
    const queryTerms = searchQuery.toLowerCase().split(/\s+/).filter(t => t.length > 0);

    const matchTerms = (text: string) => {
      const lowerText = text.toLowerCase();
      return queryTerms.every(term => lowerText.includes(term));
    };

    const matchArray = (arr?: string[]) => {
      if (!arr) return false;
      const joined = arr.join(" ").toLowerCase();
      return queryTerms.every(term => joined.includes(term));
    };

    const matchedPackages = (data.main_packages || []).filter(
      (pkg) =>
        matchTerms(pkg.title) ||
        matchTerms(pkg.description) ||
        matchArray(pkg.includes) ||
        matchTerms(pkg.recreation || "") ||
        matchArray(pkg.routes?.map(r => r.name + " " + r.activities.join(" ")))
    );

    const matchedAttractions = (data.optional_attractions || []).filter(
      (att) =>
        matchTerms(att.title) ||
        matchTerms(att.description) ||
        matchArray(att.includes)
    );

    const matchedAccommodations = (data.accommodations || []).filter(
      (acc) =>
        matchTerms(acc.title) ||
        matchTerms(acc.description) ||
        matchArray(acc.includes) ||
        matchArray(acc.general_facilities) ||
        matchTerms(acc.signature_menu || "")
    );

    return {
      packages: matchedPackages,
      attractions: matchedAttractions,
      accommodations: matchedAccommodations
    };
  }, [searchQuery, data]);

  const hasResults = useMemo(() => {
    return (
      searchResults.packages.length > 0 ||
      searchResults.attractions.length > 0 ||
      searchResults.accommodations.length > 0
    );
  }, [searchResults]);

  const handleOpenItem = (item: any, type: "package" | "attraction" | "accommodation") => {
    setSelectedSearchItem(item);
    setSelectedSearchType(type);
    setIsDrawerOpen(true);
    setIsDropdownOpen(false);
  };

  const renderSearchBox = (isMobileVersion: boolean) => {
    return (
      <div className="relative w-full max-w-md mx-auto pointer-events-auto z-40">
        {/* Input Bar */}
        <div 
          className={`relative flex items-center bg-white/95 hover:bg-white focus-within:bg-white text-stone-800 rounded-full ${
            isMobileVersion ? 'py-3 px-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]' : 'py-3 px-5 shadow-2xl'
          } border border-stone-200/80 hover:border-luxury-gold/50 focus-within:border-luxury-gold transition-all duration-300 text-left`}
        >
          <Search className="w-4 h-4 text-luxury-gold-dark shrink-0 mr-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isDropdownOpen) setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder={isMobileVersion ? "Cari pengalaman seru di Tajur..." : "Cari paket wisata, atraksi, atau homestay..."}
            className="w-full bg-transparent text-xs md:text-sm text-stone-800 placeholder-stone-400 focus:outline-none font-sans"
          />
          {searchQuery ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSearchQuery("");
              }}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-full ml-1"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            !isMobileVersion && (
              <span className="text-[10px] bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full font-mono shrink-0">
                Cari
              </span>
            )
          )}
        </div>

        {/* Floating Custom Popup Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <>
              {/* Click outside backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Popup Dropdown Container */}
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[360px] md:max-h-[420px] flex flex-col text-left text-stone-800"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-stone-50 border-b border-stone-100 shrink-0">
                  <span className="text-[11px] font-mono text-stone-500 font-medium">
                    {searchQuery.trim() ? `Hasil Pencarian (${searchResults.packages.length + searchResults.attractions.length + searchResults.accommodations.length})` : "Rekomendasi Pencarian"}
                  </span>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="text-stone-400 hover:text-stone-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Dropdown Items List */}
                <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
                  {!searchQuery.trim() ? (
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block">
                        Pencarian Populer
                      </span>
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {QUICK_TAGS.map((tag) => (
                          <button
                            key={tag.label}
                            onClick={() => {
                              setSearchQuery(tag.query);
                              setIsDropdownOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-amber-50 hover:border-luxury-gold/50 border border-stone-200/80 text-stone-700 text-xs font-sans transition-all duration-200 flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-luxury-gold-dark" />
                            <span>{tag.label}</span>
                          </button>
                        ))}
                      </div>

                      {data && (
                        <div className="pt-2 space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold block">
                            Rekomendasi Utama
                          </span>
                          <div className="space-y-2">
                            {data.main_packages?.slice(0, 3).map((pkg) => (
                              <div
                                key={pkg.id}
                                onClick={() => handleOpenItem(pkg, "package")}
                                className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50/80 hover:bg-amber-50/60 border border-stone-200/60 hover:border-luxury-gold/50 cursor-pointer transition-all duration-200 group"
                              >
                                <div className="w-11 h-11 rounded-lg bg-stone-200 overflow-hidden shrink-0">
                                  <img loading="lazy" decoding="async" {...getDriveResponsiveProps(pkg.image_url)} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-xs font-bold text-stone-800 group-hover:text-luxury-green-dark truncate">{pkg.title}</h4>
                                  <p className="text-[10px] text-stone-500 line-clamp-1">{pkg.description}</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-stone-400 -rotate-90 group-hover:text-luxury-gold shrink-0" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Search Matches */
                    <div className="space-y-4">
                      {!hasResults ? (
                        <div className="py-8 text-center space-y-2">
                          <Search className="w-6 h-6 text-stone-300 mx-auto" />
                          <p className="text-xs font-semibold text-stone-600">Tidak ada hasil untuk "{searchQuery}"</p>
                          <p className="text-[11px] text-stone-400">Coba kata kunci lain seperti "saba", "tenun", "homestay".</p>
                        </div>
                      ) : (
                        <>
                          {/* Packages */}
                          {searchResults.packages.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-luxury-gold-dark font-bold block flex items-center gap-1">
                                <Compass className="w-3 h-3" /> Paket Wisata ({searchResults.packages.length})
                              </span>
                              {searchResults.packages.map((pkg) => (
                                <div
                                  key={pkg.id}
                                  onClick={() => handleOpenItem(pkg, "package")}
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/60 hover:border-luxury-gold/50 cursor-pointer transition-all duration-200 group"
                                >
                                  <div className="w-11 h-11 rounded-lg bg-stone-200 overflow-hidden shrink-0">
                                    <img loading="lazy" decoding="async" {...getDriveResponsiveProps(pkg.image_url)} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-stone-800 group-hover:text-luxury-green-dark truncate">{pkg.title}</h4>
                                    <p className="text-[10px] text-stone-500 line-clamp-1">{pkg.description}</p>
                                  </div>
                                  <ChevronDown className="w-4 h-4 text-stone-400 -rotate-90 group-hover:text-luxury-gold shrink-0" />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Attractions */}
                          {searchResults.attractions.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-luxury-gold-dark font-bold block flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> Atraksi Desa ({searchResults.attractions.length})
                              </span>
                              {searchResults.attractions.map((att) => (
                                <div
                                  key={att.id}
                                  onClick={() => handleOpenItem(att, "attraction")}
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/60 hover:border-luxury-gold/50 cursor-pointer transition-all duration-200 group"
                                >
                                  <div className="w-11 h-11 rounded-lg bg-stone-200 overflow-hidden shrink-0">
                                    <img loading="lazy" decoding="async" {...getDriveResponsiveProps(att.image_url)} alt={att.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-stone-800 group-hover:text-luxury-green-dark truncate">{att.title}</h4>
                                    <p className="text-[10px] text-stone-500 line-clamp-1">{att.description}</p>
                                  </div>
                                  <ChevronDown className="w-4 h-4 text-stone-400 -rotate-90 group-hover:text-luxury-gold shrink-0" />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Accommodations */}
                          {searchResults.accommodations.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-luxury-gold-dark font-bold block flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Akomodasi ({searchResults.accommodations.length})
                              </span>
                              {searchResults.accommodations.map((acc) => (
                                <div
                                  key={acc.id}
                                  onClick={() => handleOpenItem(acc, "accommodation")}
                                  className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/60 hover:border-luxury-gold/50 cursor-pointer transition-all duration-200 group"
                                >
                                  <div className="w-11 h-11 rounded-lg bg-stone-200 overflow-hidden shrink-0">
                                    <img loading="lazy" decoding="async" {...getDriveResponsiveProps(acc.image_url)} alt={acc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-stone-800 group-hover:text-luxury-green-dark truncate">{acc.title}</h4>
                                    <p className="text-[10px] text-stone-500 line-clamp-1">{acc.description}</p>
                                  </div>
                                  <ChevronDown className="w-4 h-4 text-stone-400 -rotate-90 group-hover:text-luxury-gold shrink-0" />
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section
      id="explore"
      className="relative w-full aspect-[4/3] md:aspect-[3/1] md:h-auto flex items-center justify-center bg-luxury-green-dark overflow-visible z-30"
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1, opacity: 0, filter: "blur(10px)" }}
          animate={{ 
            scale: [1, 1.03, 1], 
            opacity: 0.8, 
            filter: "blur(0px)" 
          }}
          transition={{ 
            opacity: { duration: 1.0 },
            filter: { duration: 1.5, ease: "easeOut" },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-full h-full"
        >
          <video
            autoPlay
            muted
            playsInline
            src={currentVideo}
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Layered Gradient Overlays for Soft Ambient Depth */}
        <div className={`absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-stone-900/60 pointer-events-none transition-opacity duration-1000 ${(!isMobile || isTextVisible) ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-0 bg-radial-gradient from-transparent to-stone-900/50 pointer-events-none transition-opacity duration-1000 ${(!isMobile || isTextVisible) ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full pt-12 md:pt-0">
        <motion.div
          key="hero-text-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: isTextVisible ? 1 : 0, y: isTextVisible ? 0 : 10 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center pointer-events-none md:pointer-events-auto"
        >
          {/* Main Title wrapper */}
          <h1 className="font-serif text-[7.5vw] min-[400px]:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-3xl pointer-events-auto drop-shadow-lg">
            <span className="block whitespace-nowrap">Kampung Wisata</span>
            <span className="block whitespace-nowrap text-white font-light font-serif mt-1 md:mt-1.5">Tajur Kahuripan</span>
          </h1>
          {/* Short description */}
          <p className="hidden md:block text-white/90 font-sans text-sm md:text-base max-w-2xl leading-relaxed font-light mt-3 md:mt-4 px-2 md:px-0 pointer-events-auto line-clamp-2 drop-shadow-sm">
            Nikmati keasrian alam pedesaan dan selami kearifan lokal Sunda yang autentik. Tempat di mana tradisi leluhur berselaras indah dengan keindahan alam yang lestari.
          </p>

          {/* Interactive Desktop Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden md:block mt-6 w-full max-w-md pointer-events-auto"
          >
            {renderSearchBox(false)}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Searchbar on Mobile (Centered Bottom overlay) */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 md:hidden w-full px-6 flex justify-center">
        <div className="w-full max-w-md">
          {renderSearchBox(true)}
        </div>
      </div>

      {/* Embedded DetailDrawer for direct search interaction booking */}
      <DetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        item={selectedSearchItem}
        type={selectedSearchType}
        onBook={() => {
          setIsDrawerOpen(false);
          setIsDropdownOpen(false);
          onExplore();
        }}
      />
    </section>
  );
}

