import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { getDriveResponsiveProps } from "../../utils/imageUtils";

const BANNER_IMAGES = [
  "/gambar/banner1.webp",
  "/gambar/banner2.webp",
  "/gambar/banner3.webp",
  "/gambar/banner4.webp"
];

export default function BannerPromo() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const children = container.children;
    if (children && children[index]) {
      const element = children[index] as HTMLElement;
      container.scrollTo({
        left: element.offsetLeft - 24, // aligns with px-6 (24px) padding
        behavior: "smooth"
      });
      setCurrentSlide(index);
    }
  };

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(() => {
      const nextSlide = (currentSlide + 1) % BANNER_IMAGES.length;
      scrollToSlide(nextSlide);
    }, 5000); // Auto scroll every 5 seconds
    return () => clearInterval(timer);
  }, [currentSlide, isMobile]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    const index = Math.round(scrollLeft / (width * 0.75 + 16));
    if (index >= 0 && index < BANNER_IMAGES.length && index !== currentSlide) {
      setCurrentSlide(index);
    }
  };

  // Only display on mobile screen sizes, or keep it responsive. The user explicitly designed it for mobile flow under search bar
  if (!isMobile) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-visible pt-12 pb-3 bg-[#FAFAF9]"
    >
      <div className="relative w-full overflow-visible">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto px-6 snap-x snap-mandatory scrollbar-hide py-1 touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {BANNER_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.98 }}
              className="w-[78vw] aspect-[16/9] shrink-0 snap-center shadow-md rounded-2xl overflow-hidden"
            >
              <img loading="lazy" decoding="async"
                {...getDriveResponsiveProps(img)}
                alt={`Keindahan Tajur ${idx + 1}`}
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator Dots Underneath */}
        <div className="flex justify-center gap-1.5 mt-3">
          {BANNER_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-luxury-gold w-5" : "bg-stone-300 w-1.5"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </motion.div>
  );
}
