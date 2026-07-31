import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Presentation, Eye, EyeOff, Laptop } from "lucide-react";

interface PresentasiHeaderProps {
  showNotes: boolean;
  setShowNotes: (value: boolean) => void;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const PresentasiHeader: React.FC<PresentasiHeaderProps> = ({
  showNotes,
  setShowNotes,
  isFullscreen,
  toggleFullscreen
}) => {
  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <Link 
          to="/" 
          id="btn-back-to-home"
          className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors shadow-sm"
          title="Kembali ke Beranda"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Presentation className="w-4 h-4 text-[#8DB754]" />
            <h1 className="font-poppins text-sm font-bold text-luxury-green-dark">Presentasi Website Kampung Wisata</h1>
          </div>
          <p className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">Kampung Wisata Budaya Tajur Kahuripan</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Toggle Speaker Notes */}
        <button 
          id="btn-toggle-speaker-notes"
          onClick={() => setShowNotes(!showNotes)}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm ${
            showNotes 
              ? "bg-emerald-50 text-emerald-800 font-bold" 
              : "bg-white hover:bg-stone-50 text-stone-600"
          }`}
        >
          {showNotes ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>Simulasi HP {showNotes ? "(Aktif)" : "(Sembunyi)"}</span>
        </button>

        {/* Fullscreen Mode */}
        <button 
          id="btn-toggle-fullscreen"
          onClick={toggleFullscreen}
          className="px-3 py-1.5 bg-white hover:bg-stone-50 rounded-lg text-xs font-mono text-stone-600 flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>{isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}</span>
        </button>
      </div>
    </header>
  );
};
