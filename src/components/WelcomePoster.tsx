import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { getDriveResponsiveProps } from "../utils/imageUtils";

const IMAGES = [
  "https://drive.google.com/thumbnail?id=19Vi5gk1cRn8XwzJqFeMngcPYdDVOWQ-0&sz=w250",
  "https://drive.google.com/thumbnail?id=1qX1tSA8R_A_HsUV2EK92lNCsVikMEcW5&sz=w250",
  "https://drive.google.com/thumbnail?id=1-dA5Zzfajp1S3aOVsxC-9XUEQ1dHzQC7&sz=w250",
  "https://drive.google.com/thumbnail?id=1eZGaJEroDDK_0119C5d71QZ4AO5L7hnR&sz=w250"
];

export default function WelcomePoster() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Check if user has chosen not to show again
    const hasHidden = localStorage.getItem("hide_welcome_poster");
    if (!hasHidden) {
      const randomIndex = Math.floor(Math.random() * IMAGES.length);
      setSelectedImage(IMAGES[randomIndex]);
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (dontShowAgain) {
      localStorage.setItem("hide_welcome_poster", "true");
    }
    setIsOpen(false);
  };

  const toggleCheckbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDontShowAgain(prev => !prev);
  };

  if (!isOpen || !selectedImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Content container centering for desktop / aligning bottom for mobile */}
        <div className="fixed inset-0 flex items-end justify-center md:items-center p-0 md:p-6 pointer-events-none">
          <motion.div
            initial={isMobile ? { y: "100%", opacity: 0.8 } : { scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={isMobile ? { y: "100%", opacity: 0 } : { scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className={`pointer-events-auto relative bg-luxury-green-dark overflow-hidden flex flex-col ${
              isMobile 
                ? "w-full rounded-t-3xl" 
                : "w-[400px] max-w-full rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            }`}
          >
            <div className="relative aspect-[4/5] w-full" onClick={handleClose}>
              {/* Poster Image */}
              <img loading="lazy" decoding="async"
                {...getDriveResponsiveProps(selectedImage)}
                alt="Welcome Poster"
                className="w-full h-full object-cover select-none pointer-events-none cursor-pointer"
                draggable={false}
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle Gradient Shadow Overlay at Top for Close Icon visibility */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
              
              {/* Subtle Gradient Shadow Overlay at Bottom for Checkbox visibility */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              
              {/* Minimalist close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white/90 hover:bg-black/50 hover:text-white flex items-center justify-center transition-colors shadow-lg"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Checkbox Area Inside Image */}
              <div className="absolute bottom-4 left-4 z-10" onClick={(e) => e.stopPropagation()}>
                <label 
                  className="flex items-center gap-2 cursor-pointer group px-3 py-1.5 rounded-full border border-white/40 hover:border-white/80 transition-colors"
                  onClick={toggleCheckbox}
                >
                  <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                    dontShowAgain ? 'bg-luxury-gold border-luxury-gold' : 'border-white/70 group-hover:border-white'
                  }`}>
                    {dontShowAgain && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-xs font-sans text-white/90 select-none">
                    Jangan tampilkan lagi
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
