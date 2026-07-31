import React from "react";
import { motion } from "motion/react";
import { 
  Smartphone, 
  Laptop, 
  Sliders, 
  DollarSign, 
  Zap, 
  MessageSquare, 
  Workflow, 
  FileText, 
  ShieldCheck,
  Star,
  Compass,
  CheckCircle2
} from "lucide-react";
import { TabKemudahan } from "../types";

interface SlideInteractiveTabsProps {
  activeTab: TabKemudahan;
  setActiveTab: (tab: TabKemudahan) => void;
}

export const SlideInteractiveTabs: React.FC<SlideInteractiveTabsProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <div className="flex flex-col justify-between h-full py-1 font-inter">
      {/* Custom Switch Tab */}
      <div className="flex justify-center mb-5">
        <div className="bg-stone-100 p-1 rounded-2xl flex flex-col sm:flex-row items-center gap-1 shadow-inner w-full sm:w-auto">
          <button
            id="tab-btn-pengunjung"
            onClick={() => setActiveTab("pengunjung")}
            className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl text-xs font-inter font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "pengunjung"
                ? "bg-white text-luxury-green-dark shadow-md"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <Smartphone className="w-4 h-4 text-[#8DB754] shrink-0" />
            <span>Untuk Pengunjung (Tamu Wisata)</span>
          </button>
          <button
            id="tab-btn-pengelola"
            onClick={() => setActiveTab("pengelola")}
            className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl text-xs font-inter font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === "pengelola"
                ? "bg-white text-emerald-800 shadow-md"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <Laptop className="w-4 h-4 text-[#8DB754] shrink-0" />
            <span>Untuk Pengelola (Pokdarwis & BPSPAMS)</span>
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="flex-1">
        {activeTab === "pengunjung" ? (
          <motion.div 
            key="pengunjung-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Card 1 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-[#8DB754]/10 rounded-lg flex items-center justify-center text-[#8DB754]">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-inter bg-amber-50 text-amber-800 font-bold uppercase tracking-wider">
                    Bebas Atur
                  </span>
                </div>
                <h4 className="font-inter text-sm font-bold text-luxury-green-dark mb-1">
                  Pemesanan Mandiri
                </h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Bebas memilih jenis paket utama, tanggal, homestay warga, dan atraksi tambahan. Pesan disusun rapi otomatis tanpa ribet.
                </p>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-inter px-2 py-0.5 bg-stone-100 text-stone-600 rounded">100% Fleksibel</span>
                <span className="text-[10px] font-inter px-2 py-0.5 bg-stone-100 text-stone-600 rounded">Pesan Instan</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-[#8DB754]/10 rounded-lg flex items-center justify-center text-[#8DB754]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-inter bg-emerald-50 text-emerald-800 font-bold uppercase tracking-wider">
                    Praktis & Cepat
                  </span>
                </div>
                <h4 className="font-inter text-sm font-bold text-luxury-green-dark mb-1">
                  Proses Cepat & Mudah
                </h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Tidak ada kalkulasi rumit yang membingungkan. Cukup kirim naskah reservasi otomatis langsung ke WhatsApp pengelola resmi.
                </p>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-inter px-2 py-0.5 bg-stone-100 text-stone-600 rounded">Langsung WA</span>
                <span className="text-[10px] font-inter px-2 py-0.5 bg-stone-100 text-stone-600 rounded">Terpercaya</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-[#8DB754]/10 rounded-lg flex items-center justify-center text-[#8DB754]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-inter bg-blue-50 text-blue-800 font-bold uppercase tracking-wider">
                    Ultra Ringan
                  </span>
                </div>
                <h4 className="font-inter text-sm font-bold text-luxury-green-dark mb-1">
                  Akses Cepat di Pelosok
                </h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Situs sangat ringan dan dioptimalkan secara teknis untuk daerah minim sinyal, memastikan halaman terisi dalam sekejap di HP.
                </p>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-inter px-2 py-0.5 bg-stone-100 text-stone-600 rounded">Hemat Kuota</span>
                <span className="text-[10px] font-inter px-2 py-0.5 bg-stone-100 text-stone-600 rounded">Ramah Mobile</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-[#8DB754]/10 rounded-lg flex items-center justify-center text-[#8DB754]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-inter bg-purple-50 text-purple-800 font-bold uppercase tracking-wider">
                    Instant Chat
                  </span>
                </div>
                <h4 className="font-inter text-sm font-bold text-luxury-green-dark mb-1">
                  Pesan via WhatsApp
                </h4>
                <p className="text-xs text-stone-500 font-light leading-relaxed">
                  Tanpa perlu membuat akun, kata sandi, atau email pendaftaran. Klik tombol, rincian perjalanan langsung terkirim ke WhatsApp pengelola.
                </p>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-inter px-2 py-0.5 bg-stone-100 text-stone-600 rounded">Tanpa Registrasi</span>
                <span className="text-[10px] font-inter px-2 py-0.5 bg-stone-100 text-stone-600 rounded">1-Klik Reservasi</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="pengelola-tab"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Card 1 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-inter bg-emerald-100 text-emerald-900 font-bold uppercase tracking-wider">
                    Praktis
                  </span>
                </div>
                <h4 className="font-inter text-sm font-bold text-emerald-900 mb-1">
                  Format Pesanan WhatsApp Rapi
                </h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Pesan masuk sudah berisi nama paket, jumlah tamu, tanggal, tambahan akomodasi, dan total harga. Tinggal konfirmasi ketersediaan saja!
                </p>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-inter px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">Langsung Proses</span>
                <span className="text-[10px] font-inter px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">Sangat Jelas</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-inter bg-amber-100 text-amber-900 font-bold uppercase tracking-wider">
                    Hemat Kas
                  </span>
                </div>
                <h4 className="font-inter text-sm font-bold text-emerald-900 mb-1">
                  Nol Rupiah Biaya Bulanan
                </h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Situs ini berjalan di atas infrastruktur awan gratis tanpa tagihan server bulanan, tidak menguras kas Pokdarwis atau BPSPAMS.
                </p>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-inter px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">Selamanya Gratis</span>
                <span className="text-[10px] font-inter px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">Tanpa Maintenance</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-inter bg-blue-100 text-blue-900 font-bold uppercase tracking-wider">
                    Satu Akses
                  </span>
                </div>
                <h4 className="font-inter text-sm font-bold text-emerald-900 mb-1">
                  Kemudahan Edit Data Tunggal
                </h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Perubahan harga, syarat minimal rombongan, atau deskripsi homestay dikelola di satu file konfigurasi utama untuk seluruh situs.
                </p>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-inter px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">Sinkronisasi Penuh</span>
                <span className="text-[10px] font-inter px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">Bebas Ribet</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-800">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-inter bg-purple-100 text-purple-900 font-bold uppercase tracking-wider">
                    Uang Utuh
                  </span>
                </div>
                <h4 className="font-inter text-sm font-bold text-emerald-900 mb-1">
                  Tanpa Potongan Komisi Aplikasi
                </h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Karena menggunakan jalur WhatsApp langsung ke nomor pengelola resmi desa, uang pembayaran 100% utuh masuk ke kas masyarakat.
                </p>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap">
                <span className="text-[10px] font-inter px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">Hasil Hak Warga</span>
                <span className="text-[10px] font-inter px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded">Bebas Potongan</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
