import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  MessageSquare, 
  Wifi, 
  Battery, 
  Signal, 
  Smartphone, 
  RefreshCw, 
  ExternalLink,
  Globe,
  Sparkles
} from "lucide-react";
import { Slide } from "./types";

interface PresentasiLayoutProps {
  slides: Slide[];
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  showNotes: boolean;
  prevSlide: () => void;
  nextSlide: () => void;
  children?: React.ReactNode; // Optional additional nested items
}

export const PresentasiLayout: React.FC<PresentasiLayoutProps> = ({
  slides,
  currentSlide,
  setCurrentSlide,
  showNotes,
  prevSlide,
  nextSlide
}) => {
  const slide = slides[currentSlide];

  // Local state for interactive smartphone mockup
  const [iframeUrl, setIframeUrl] = useState("/");
  const [timeStr, setTimeStr] = useState("08:15");
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setTimeStr(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!slide) return null;

  return (
    <div className="flex-1 w-full flex items-center justify-center p-3 md:p-5 min-h-0 overflow-hidden">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch min-h-0">
      
      {/* Slides Content Container */}
      <div 
        id="slide-container"
        className={`transition-all duration-300 flex flex-col justify-between ${
          showNotes ? "lg:col-span-8" : "lg:col-span-12"
        } bg-white rounded-3xl p-6 md:p-8 shadow-md h-full min-h-0 relative overflow-hidden`}
      >
        {/* Background subtle decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-full blur-3xl -z-10 pointer-events-none opacity-50"></div>
        
        {/* Slide Heading & Subheading */}
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-poppins font-bold text-luxury-green-dark">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-[11px] md:text-xs text-stone-400 font-light mt-0.5">
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Slide Body */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden py-1 justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="h-full flex flex-col justify-center min-h-0"
            >
              {slide.content}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls Bar */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <button 
            id="btn-prev-slide"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-4 py-2 bg-stone-50 hover:bg-stone-100 rounded-xl text-xs font-mono text-stone-600 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Pagination dots */}
          <div className="hidden md:flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                id={`btn-goto-slide-${idx + 1}`}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlide 
                    ? "bg-[#8DB754] w-6" 
                    : "bg-stone-200 hover:bg-stone-300"
                }`}
                title={`Ke Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            id="btn-next-slide"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 bg-luxury-green-dark hover:bg-[#2c402e] text-white rounded-xl text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Mobile Simulator (Sidebar) */}
      {showNotes && (
        <div 
          id="mobile-simulator-sidebar"
          className="lg:col-span-4 flex flex-col justify-center items-center h-full min-h-0 select-none"
        >
          {/* High-Fidelity Smartphone Shell */}
          <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[290px] md:max-w-[310px] h-full max-h-[500px] sm:max-h-[550px] md:max-h-[580px] lg:max-h-[680px] xl:max-h-[750px] bg-stone-950 rounded-[48px] p-3 shadow-2xl ring-[12px] ring-stone-900 flex flex-col overflow-hidden transition-all duration-300">
            
            {/* Dynamic Island / Camera Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900/90 ml-auto mr-4"></div>
            </div>

            {/* Home Indicator Bar (Apple Style Bottom Line) */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-stone-600 rounded-full z-30 pointer-events-none"></div>

            {/* Status Bar inside screen */}
            <div className="w-full h-8 px-5 bg-[#faf8f5] flex items-center justify-between text-[9px] font-mono text-stone-600 z-20 shrink-0 font-bold select-none pt-3 pb-1">
              <span className="font-sans font-extrabold">{timeStr}</span>
              <div className="flex items-center gap-1.5">
                <Signal className="w-2.5 h-2.5" />
                <Wifi className="w-2.5 h-2.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Web Browser Frame Address Bar Mock */}
            <div className="w-full bg-[#f1eff0] px-3.5 py-1.5 flex items-center justify-between gap-1.5 z-20 shrink-0 select-none border-b border-stone-200/50">
              <div className="flex-1 bg-white px-2.5 py-1 rounded-lg text-[8.5px] font-mono text-stone-400 truncate flex items-center gap-1">
                <Globe className="w-2.5 h-2.5 text-stone-400" />
                <span>kampungtajurkahuripan.com{iframeUrl}</span>
              </div>
              <button
                onClick={() => setIframeKey(k => k + 1)}
                className="p-1 hover:bg-stone-200 rounded text-stone-500 active:scale-95 transition-transform"
                title="Segarkan Halaman"
              >
                <RefreshCw className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Live Iframe Container */}
            <div className="w-full flex-1 bg-white overflow-hidden rounded-b-[36px] relative">
              <iframe
                key={iframeKey}
                src={`${window.location.origin}${iframeUrl}${iframeUrl.includes('?') ? '&' : '?'}noSplash=true`}
                title="Website Live Demo"
                className="w-full h-full border-none select-text"
                onLoad={(e) => {
                  try {
                    const iframeWindow = (e.target as HTMLIFrameElement).contentWindow;
                    if (iframeWindow) {
                      const pathname = iframeWindow.location.pathname;
                      if (pathname !== "blank" && pathname !== iframeUrl) {
                        setIframeUrl(pathname);
                      }
                    }
                  } catch (err) {
                    // Ignore errors
                  }
                }}
              />
            </div>

          </div>

          {/* Quick Floating Tab Bar under the phone */}
          <div className="mt-3.5 flex items-center gap-1 bg-stone-200/80 p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setIframeUrl("/")}
              className={`px-3 py-1 rounded-lg text-[9px] font-mono font-bold transition-all ${
                iframeUrl === "/" 
                  ? "bg-white text-luxury-green-dark shadow-sm" 
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setIframeUrl("/eksplorasi")}
              className={`px-3 py-1 rounded-lg text-[9px] font-mono font-bold transition-all ${
                iframeUrl === "/eksplorasi" 
                  ? "bg-white text-luxury-green-dark shadow-sm" 
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Eksplorasi
            </button>
            <button
              onClick={() => setIframeUrl("/rencana")}
              className={`px-3 py-1 rounded-lg text-[9px] font-mono font-bold transition-all ${
                iframeUrl === "/rencana" 
                  ? "bg-white text-luxury-green-dark shadow-sm" 
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              Pemesanan
            </button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};
