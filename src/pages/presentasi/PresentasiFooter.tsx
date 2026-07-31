import React from "react";
import { Link } from "react-router-dom";

export const PresentasiFooter: React.FC = () => {
  return (
    <footer className="bg-white px-6 py-3 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-stone-400 gap-2 shadow-inner">
      <div>
        &copy; 2026 Kampung Wisata Budaya Tajur Kahuripan. All Rights Reserved.
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Sistem Website Sudah Aktif Secara Online
        </span>
        <div className="w-px h-3 bg-stone-100"></div>
        <Link to="/" className="hover:text-luxury-green-dark transition-colors font-bold text-[#8DB754]">
          Kembali ke Beranda Utama &rarr;
        </Link>
      </div>
    </footer>
  );
};
