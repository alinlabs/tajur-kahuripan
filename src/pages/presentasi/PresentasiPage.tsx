import React, { useState, useEffect } from "react";
import { getSlidesList } from "./slidesData";
import { PresentasiHeader } from "./PresentasiHeader";
import { PresentasiFooter } from "./PresentasiFooter";
import { PresentasiLayout } from "./PresentasiLayout";
import { TabKemudahan } from "./types";

export default function PresentasiPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mocks/State for Interactive Simulator
  const [simPackage, setSimPackage] = useState("saba-budaya");
  const [simPax, setSimPax] = useState(35);
  const [simDate, setSimDate] = useState("2026-08-15");
  const [simHomestay, setSimHomestay] = useState(true);
  const [simAttractions, setSimAttractions] = useState<string[]>(["tutunggulan", "tenun"]);
  const [activeTabKemudahan, setActiveTabKemudahan] = useState<TabKemudahan>("pengunjung");

  // Format simulator message helper
  const getFormattedWAMessage = () => {
    const pkgName = simPackage === "saba-budaya" ? "Saba Budaya" : "Ulin Pelemburan";

    const formattedDate = new Date(simDate).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    return `*RESERVASI KAMPUNG WISATA TAJUR KAHURIPAN*
====================================
Sampurasun Admin Tajur Kahuripan, saya ingin memesan rencana kunjungan rombongan:

*Detail Rombongan:*
• Nama / Instansi: Rombongan Studi Banding
• Rencana Tanggal Kunjungan: ${formattedDate}
• Jumlah Anggota Peserta: ${simPax} Orang

*Paket & Fasilitas Terpilih:*
• Paket Utama: ${pkgName}
• Penginapan Homestay Warga: ${simHomestay ? "Ya" : "Tidak"}${simAttractions.includes("tutunggulan") ? `\n• Seni Tradisional Tutunggulan: Ya` : ""}${simAttractions.includes("tenun") ? `\n• Edukasi Tenun Ikat Khas Purwakarta: Ya` : ""}

Mohon konfirmasi ketersediaan kuota rombongan kami pada tanggal tersebut. Hatur nuhun!`;
  };

  const slides = getSlidesList({
    activeTabKemudahan,
    setActiveTabKemudahan,
    simPackage,
    setSimPackage,
    simPax,
    setSimPax,
    simDate,
    setSimDate,
    simHomestay,
    setSimHomestay,
    simAttractions,
    setSimAttractions,
    getFormattedWAMessage
  });

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, slides.length]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-stone-100 text-stone-800 flex flex-col justify-between select-none font-poppins">
      <PresentasiHeader 
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      <PresentasiLayout 
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        showNotes={showNotes}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />

      <PresentasiFooter />
    </div>
  );
}
