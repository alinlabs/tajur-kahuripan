import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import BottomActionBar from "./components/BottomActionBar";
import AudioPlayer from "./components/AudioPlayer";
import SplashScreen from "./components/SplashScreen";
import { useTourismData } from "./hooks/useTourismData";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import RencanaPage from "./pages/RencanaPage";
import Presentasi from "./pages/Presentasi";
import Panduan from "./pages/Panduan";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#faf8f5] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-2 border-luxury-gold/30 border-t-luxury-gold rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="font-serif text-2xl text-luxury-green-dark mb-2">Menyiapkan Pengalaman</h2>
        <p className="text-sm font-poppins tracking-widest text-luxury-gold uppercase">Mohon Tunggu</p>
      </motion.div>
    </div>
  );
}

function AppContent() {
  const { data, isLoading, error } = useTourismData();
  const [showSplash, setShowSplash] = useState(() => {
    const isNoSplash = new URLSearchParams(window.location.search).get('noSplash') === 'true';
    if (isNoSplash) return false;
    return !sessionStorage.getItem("has_seen_splash");
  });
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOpenPlanner = (packageId: string = "") => {
    if (packageId) {
      navigate(`/rencana?packageId=${packageId}`);
    } else {
      navigate("/rencana");
    }
  };

  const isHome = location.pathname === "/";
  const isPresentasi = location.pathname === "/presentasi";
  const isPanduan = location.pathname === "/panduan";

  if (isPresentasi) {
    return <Presentasi />;
  }

  // If loading is done, but splash is still visible, we let the splash screen display.
  // If splash is done but loading is still active, show loading screen.
  if (isLoading && !showSplash) {
    return <LoadingScreen />;
  }

  if (error || (!data && !isLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] text-luxury-charcoal">
        <p className="text-xl font-serif text-red-800">Gagal memuat data: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#faf8f5] min-h-screen text-luxury-charcoal selection:bg-luxury-gold selection:text-luxury-green-dark relative">
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash-screen" onComplete={() => {
            setShowSplash(false);
            sessionStorage.setItem("has_seen_splash", "true");
          }} />
        )}
      </AnimatePresence>
      
      {data && (
        <>
          {!isPanduan && <Navbar onOpenBooking={() => handleOpenPlanner("")} />}
          
          <main className="min-h-screen">
             <Routes>
               <Route path="/" element={<Home data={data} onExplore={() => navigate("/eksplorasi")} onOpenPlanner={handleOpenPlanner} />} />
               <Route path="/eksplorasi" element={<Explore data={data} onOpenPlanner={handleOpenPlanner} />} />
               <Route path="/rencana" element={<RencanaPage data={data} />} />
               <Route path="/pemesanan" element={<RencanaPage data={data} />} />
               <Route path="/panduan" element={<Panduan />} />
               <Route path="/tentang" element={<Navigate to="/eksplorasi" replace />} />
             </Routes>
          </main>

          {!isPanduan && <Footer />}
          {isHome && <FloatingWhatsAppButton />}
          <AudioPlayer />
          {!isPanduan && <BottomActionBar onOpenPlanner={() => handleOpenPlanner("")} />}
        </>
      )}
    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
