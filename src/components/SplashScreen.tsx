import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface SplashScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"initial" | "shrink" | "done">("initial");

  useEffect(() => {
    // 1. Initial green animation takes 2 seconds (0s - 2s).
    // 2. Hold green background for 2 seconds (2s - 4s).
    // Thus, start shrink at exactly 4000ms.
    const startShrinkTimer = setTimeout(() => {
      setPhase("shrink");
    }, 4000);

    // 3. Shrink animation takes 1 second (4s - 5s).
    // 4. Hold colored logo for 3 seconds (5s - 8s).
    // Thus, trigger onComplete at exactly 8000ms.
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 8000);

    return () => {
      clearTimeout(startShrinkTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[999] bg-[#faf8f5] flex items-center justify-center overflow-hidden select-none">
      {/* UNDER LAYER (The target state: White/Tan background, Colored Logo, Green Text) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#faf8f5]">
        <div className="flex flex-col items-center text-center px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
          >
            <img
              src="/gambar/logo-color.png"
              alt="Logo Tajur Kahuripan"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>

      {/* TOP OVERLAY LAYER (The initial state: Green background #1F3F23, White Logo, White Text) */}
      <motion.div
        animate={{
          clipPath: phase === "shrink" 
            ? "circle(0% at 50% 50%)" 
            : "circle(150% at 50% 50%)"
        }}
        transition={{
          duration: 1.0, // Menciut 1 detik
          ease: [0.76, 0, 0.24, 1] // Custom cubic-bezier for a beautiful premium organic shrink
        }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-[#1F3F23]"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.0, ease: "easeOut" }} // Animasi awal di hijau kan selama 2 detik
          className="flex flex-col items-center text-center px-6"
        >
          <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center">
            <img
              src="/gambar/logo-white.png"
              alt="Logo Tajur Kahuripan Putih"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
