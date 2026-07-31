import React from "react";
import { Sliders, Send, MessageSquare, ShieldCheck } from "lucide-react";

interface SlideSimulatorProps {
  simPackage: string;
  setSimPackage: (value: string) => void;
  simPax: number;
  setSimPax: (value: number) => void;
  simDate: string;
  setSimDate: (value: string) => void;
  simHomestay: boolean;
  setSimHomestay: (value: boolean) => void;
  simAttractions: string[];
  setSimAttractions: (value: string[]) => void;
  getFormattedWAMessage: () => string;
}

export const SlideSimulator: React.FC<SlideSimulatorProps> = ({
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
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-full py-1 font-inter">
      {/* Explanation Panel (Left side) */}
      <div className="md:col-span-6 bg-white p-4 sm:p-5 rounded-2xl shadow-md flex flex-col justify-between gap-4 border border-stone-100">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-inter text-xs text-luxury-gold uppercase font-bold flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Alur Kerja Pemesanan Langsung
            </h4>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-inter px-2.5 py-1 rounded-full font-bold shadow-sm">
              SISTEM RESERVASI WA
            </span>
          </div>

          <div className="space-y-4 text-stone-800">
            <div>
              <h3 className="font-inter text-base text-luxury-green-dark font-bold leading-snug">Pemesanan Instan, Lebih Cepat & Mudah</h3>
              <p className="text-xs text-stone-500 font-light mt-1.5 leading-relaxed">
                Menyederhanakan proses pemesanan dengan menghubungkan rombongan wisatawan secara langsung ke WhatsApp pengelola resmi pariwisata Tajur Kahuripan.
              </p>
            </div>

            <div className="space-y-3.5 pt-1.5">
              {/* Step 1 */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-[#8DB754]/10 text-[#8DB754] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-800">Pengisian Detail Sederhana</h5>
                  <p className="text-xs text-stone-500 font-light leading-relaxed mt-0.5">
                    Pengunjung cukup memasukkan nama rombongan, memilih rencana tanggal kunjungan, serta memilih paket pariwisata dan akomodasi opsional di halaman Pemesanan.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-[#8DB754]/10 text-[#8DB754] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-800">Penyusunan Format Pesan</h5>
                  <p className="text-xs text-stone-500 font-light leading-relaxed mt-0.5">
                    Sistem otomatis menyusun pesan teks format pemesanan yang rapi, lengkap, dan berisikan semua detail kunjungan secara real-time.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-[#8DB754]/10 text-[#8DB754] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-800">Kirim Langsung ke Pengelola</h5>
                  <p className="text-xs text-stone-500 font-light leading-relaxed mt-0.5">
                    Dengan mengeklik tombol pemesanan, pengunjung langsung diarahkan ke chat WhatsApp pengelola resmi desa dengan teks yang telah tersusun rapi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Booking Info Widget */}
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2.5">
          <div className="p-1.5 bg-emerald-500/10 rounded-lg text-emerald-700 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-emerald-900 font-bold leading-tight">Keamanan Data & Tanpa Perantara</p>
            <p className="text-[10px] text-emerald-700 font-light mt-0.5 leading-normal">
              Informasi pesanan dikirimkan secara langsung tanpa disimpan di database pihak ketiga mana pun, menjamin privasi penuh bagi rombongan wisatawan.
            </p>
          </div>
        </div>
      </div>

      {/* Result Message Preview (Mock Smartphone screen) */}
      <div className="md:col-span-6 bg-[#eae4da] p-3.5 rounded-3xl shadow-lg flex flex-col justify-between h-full min-h-[360px] sm:min-h-[420px] overflow-hidden relative border border-stone-200/40 font-inter">
        {/* Mock WA Header */}
        <div className="bg-[#075e54] text-white p-3 rounded-t-2xl absolute top-0 left-0 right-0 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-stone-100 overflow-hidden flex items-center justify-center shrink-0">
              <img src="/gambar/logo-color.png" alt="Admin" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h5 className="font-bold text-xs flex items-center gap-1">
                Tajur Kahuripan
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
              </h5>
              <span className="text-[9px] opacity-80 font-inter block">Online • Siap Melayani</span>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded bg-[#128c7e] text-[9px] font-inter font-bold uppercase tracking-wider">
            WHATSAPP
          </div>
        </div>

        {/* WA Chat Body with a realistic bubble and layout */}
        <div className="flex-1 overflow-y-auto px-1 pt-14 pb-2 text-xs space-y-3 font-inter">
          <div className="flex justify-end">
            <div className="bg-[#e2f9cb] p-3 rounded-2xl shadow-sm text-stone-800 max-w-[98%] sm:max-w-[95%] leading-relaxed whitespace-pre-line relative text-xs">
              {getFormattedWAMessage()}
              
              {/* WhatsApp message metadata badge inside bubble */}
              <div className="text-right text-[9px] text-stone-500 mt-1.5 flex justify-end items-center gap-1 font-inter">
                <span>Baru saja</span>
                <span className="text-blue-500 font-bold">&#10004;&#10004;</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Send input bar */}
        <div className="bg-[#f0f0f0] p-2 rounded-b-2xl flex items-center gap-2 z-10">
          <div className="flex-1 bg-white px-3 py-2 rounded-full text-xs text-stone-400 font-inter truncate">
            Pesan otomatis siap dikirim...
          </div>
          <button 
            id="btn-simulate-wa-send"
            onClick={() => {
              const win = window.open(`https://wa.me/6281383172489?text=${encodeURIComponent(getFormattedWAMessage())}`, "_blank");
              if (win) win.focus();
            }}
            className="w-9 h-9 rounded-full bg-[#00a884] text-white flex items-center justify-center hover:bg-[#008f72] transition-colors shadow-sm shrink-0 active:scale-95"
            title="Kirim pesan langsung ke WhatsApp pengelola"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
