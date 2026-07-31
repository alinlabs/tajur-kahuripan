import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingWhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let timerId: NodeJS.Timeout;

    const runCycle = () => {
      if (!isMounted) return;

      // 1. Munculkan tombol dari kanan
      setIsVisible(true);

      // 2. Tampilkan badge "Hubungi Sekarang" sebentar setelah tombol masuk
      timerId = setTimeout(() => {
        if (!isMounted) return;
        setShowBadge(true);

        // 3. Sembunyikan badge setelah 4 detik
        timerId = setTimeout(() => {
          if (!isMounted) return;
          setShowBadge(false);

          // 4. Biarkan tombol maskot saja bertahan 3 detik sebelum hilang
          timerId = setTimeout(() => {
            if (!isMounted) return;
            setIsVisible(false); // Geser & keluar ke kanan (layar bersih)

            // 5. Layar bersih tanpa floating button selama 12 detik, lalu ulang siklus
            timerId = setTimeout(() => {
              if (isMounted) runCycle();
            }, 12000);

          }, 3000);

        }, 4000);

      }, 500);
    };

    // Tampil pertama kali 3 detik setelah halaman dimuat
    timerId = setTimeout(runCycle, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, []);

  const handleOpenWA = () => {
    window.open("https://wa.me/6281383172489?text=Sampurasun%20Admin%20Tajur%20Kahuripan%2C%20saya%20ingin%20bertanya%20mengenai%20paket%20wisata...", "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Mobile Bottom Shadow Gradient - Smooth, soft/doft, and dynamically animated */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-black/40 via-black/15 to-transparent pointer-events-none z-30 backdrop-blur-[0.5px]"
          />

          {/* Floating Container (Smooth fluid slide in/out from right) */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              damping: 24, 
              stiffness: 180, 
              mass: 0.8 
            }}
            className="fixed bottom-[6.5rem] md:bottom-10 right-6 z-40 flex items-end pointer-events-auto"
          >
            {/* Tooltip / Badge Area */}
            <AnimatePresence>
              {showBadge && (
                <motion.div
                  initial={{ opacity: 0, x: 15, scale: 0.85 }}
                  animate={{ opacity: 1, x: -8, scale: 1 }}
                  exit={{ opacity: 0, x: 15, scale: 0.85 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-end pb-2 pointer-events-none drop-shadow-md z-0"
                >
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl rounded-br-none shadow-xl border border-luxury-gold/20 text-sm font-poppins font-medium text-luxury-green-dark">
                    Hubungi Sekarang
                  </div>
                  <span className="text-[10px] text-white/95 font-poppins tracking-widest mt-1 pr-1 font-light uppercase drop-shadow">
                    Ujang Tajur
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main floating button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleOpenWA}
              className="w-16 h-16 flex items-center justify-center cursor-pointer group relative select-none z-10 filter drop-shadow-lg"
              id="floating-wa-trigger"
              aria-label="Hubungi via WhatsApp"
            >
              <img 
                src="/gambar/maskot.png" 
                alt="Chat Admin" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
