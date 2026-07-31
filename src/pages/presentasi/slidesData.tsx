import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Laptop, 
  Smartphone, 
  CheckCircle, 
  Compass, 
  Layers, 
  MapPin, 
  Info,
  Share2,
  TrendingUp,
  Award,
  BookOpen,
  CloudLightning,
  Check,
  FolderCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  MessageSquare,
  ShoppingBag,
  CreditCard,
  Rocket,
  CheckSquare,
  Newspaper,
  Megaphone,
  Database
} from "lucide-react";
import { Slide, TabKemudahan } from "./types";
import { SlideInteractiveTabs } from "./components/SlideInteractiveTabs";
import { SlideSimulator } from "./components/SlideSimulator";
import { SlideMap } from "./components/SlideMap";

interface SlidesDataParams {
  activeTabKemudahan: TabKemudahan;
  setActiveTabKemudahan: (tab: TabKemudahan) => void;
  
  // Simulator states
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

export const getSlidesList = (params: SlidesDataParams): Slide[] => {
  return [
    {
      id: 1,
      category: "Pembukaan & Identitas",
      title: "Identitas Digital Kampung Wisata Tajur",
      subtitle: "Menyajikan keselarasan budaya Sunda klasik dalam balutan teknologi web modern",
      content: (
        <div className="flex flex-col md:flex-row items-center gap-8 py-4 h-full justify-center">
          {/* Left Side: Circular Logo Wrapper with custom animations */}
          <div className="relative w-44 h-44 md:w-56 md:h-56 flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#8DB754]/5 animate-pulse"></div>
            <div className="absolute inset-4 bg-[#fbfbf9] p-4 rounded-full flex items-center justify-center shadow-md">
              <img 
                src="/gambar/logo-color.png" 
                alt="Logo Desa" 
                className="w-28 h-28 md:w-36 md:h-36 object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Live badge overlay */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              SITUS AKTIF
            </span>
          </div>

          {/* Right Side: Bento Pitch Highlights */}
          <div className="space-y-4 max-w-lg text-left">
            <div>
              <span className="text-[9px] font-mono text-luxury-gold uppercase font-bold tracking-widest bg-amber-50 px-2 py-0.5 rounded shadow-sm">PLATFORM RESMI</span>
              <h3 className="font-poppins text-2xl text-luxury-green-dark mt-1 font-bold">Gerbang Digital Desa Tajur</h3>
            </div>
            <p className="text-[11.5px] text-stone-500 leading-relaxed font-light">
              Website ini khusus dirancang sebagai pusat reservasi resmi satu pintu. Calon pengunjung dapat mempelajari sejarah, memproyeksikan biaya, dan memesan liburan instan secara mandiri.
            </p>
            
            {/* Bento list of tags */}
            <div className="grid grid-cols-3 gap-3.5 text-center text-xs font-mono">
              <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-100">
                <span className="block font-bold text-luxury-green-dark mb-1">ESTETIK</span>
                <span className="text-stone-500 text-[10.5px]">Julang Ngapak</span>
              </div>
              <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-100">
                <span className="block font-bold text-luxury-green-dark mb-1">RINGAN</span>
                <span className="text-stone-500 text-[10.5px]">Akses HP Cepat</span>
              </div>
              <div className="p-3 bg-white rounded-2xl shadow-md border border-stone-100">
                <span className="block font-bold text-luxury-green-dark mb-1">TRANSPARAN</span>
                <span className="text-stone-500 text-[10.5px]">Hitung Instan</span>
              </div>
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Selamat pagi/siang bapak dan ibu pengurus sekalian. Hari ini kami sangat gembira bisa memperlihatkan hasil kerja pembuatan website Kampung Wisata Budaya Tajur Kahuripan yang baru. Website ini dibuat agar desa kita terlihat sangat modern, menarik, dan tentunya memudahkan rombongan sekolah atau kantor untuk mendaftar langsung lewat WhatsApp."
    },
    {
      id: 2,
      category: "Tujuan Strategis",
      title: "3 Pilar Utama Pengembangan Ekonomi Kreatif",
      subtitle: "Bagaimana website baru ini meningkatkan keunggulan kompetitif desa",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-2 h-full items-stretch">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-lg transition-all border border-stone-100">
            <div className="space-y-3.5">
              <div className="w-10 h-10 bg-[#8DB754]/10 rounded-xl flex items-center justify-center text-[#8DB754]">
                <Compass className="w-5.5 h-5.5" />
              </div>
              <h4 className="font-poppins text-[15px] text-luxury-green-dark font-bold leading-snug">1. Representasi Budaya Luhur</h4>
              <p className="text-[12.5px] text-stone-500 font-light leading-relaxed">
                Menyajikan lanskap visual rumah panggung Julang Ngapak, tradisi menenun ikat khas, serta ketenangan alam pegunungan secara profesional.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-50 flex items-center justify-between text-[9.5px] font-mono">
              <span className="text-stone-400 font-medium">TARGET UTAMA</span>
              <span className="text-luxury-gold font-bold">JANGKAUAN LUAS</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-lg transition-all border border-stone-100">
            <div className="space-y-3.5">
              <div className="w-10 h-10 bg-[#8DB754]/10 rounded-xl flex items-center justify-center text-[#8DB754]">
                <Layers className="w-5.5 h-5.5" />
              </div>
              <h4 className="font-poppins text-[15px] text-luxury-green-dark font-bold leading-snug">2. Penjelasan Paket Terpadu</h4>
              <p className="text-[12.5px] text-stone-500 font-light leading-relaxed">
                Menyampilkan menu kegiatan wisata Saba Budaya & Ulin Pelemburan dengan detil fasilitas kuliner, oleh-oleh, dan edukasi adat secara komprehensif.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-50 flex items-center justify-between text-[9.5px] font-mono">
              <span className="text-stone-400 font-medium">SISTEM DATA</span>
              <span className="text-emerald-700 font-bold">ANTI-BINGUNG</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-lg transition-all border border-stone-100">
            <div className="space-y-3.5">
              <div className="w-10 h-10 bg-[#8DB754]/10 rounded-xl flex items-center justify-center text-[#8DB754]">
                <MapPin className="w-5.5 h-5.5" />
              </div>
              <h4 className="font-poppins text-[15px] text-luxury-green-dark font-bold leading-snug">3. Navigasi Rombongan Presisi</h4>
              <p className="text-[12.5px] text-stone-500 font-light leading-relaxed">
                Menghubungkan maps interaktif and instruksi rute bus pariwisata besar agar rombongan sampai ke gerbang utama tanpa tersesat.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-50 flex items-center justify-between text-[9.5px] font-mono">
              <span className="text-stone-400 font-medium">INTEGRASI GPS</span>
              <span className="text-blue-700 font-bold">100% AKURAT</span>
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Ada 3 tujuan utama mengapa kita membangun website ini. Pertama, untuk mengenalkan keunikan budaya kita, seperti rumah adat panggung Julang Ngapak dan kerajinan tenun ikat Purwakarta. Kedua, memaparkan secara jujur apa saja kegiatan dan harga paket wisata kita agar tamu tidak ragu-ragu. Ketiga, memberikan peta petunjuk jalan yang pas agar rombongan bus wisata tidak tersesat saat menuju kemari."
    },
    {
      id: 3,
      category: "Kelebihan Platform",
      title: "Solusi Cerdas untuk Wisatawan & Pengelola",
      subtitle: "Mendekatkan pelayanan kepada pengunjung sembari mempermudah koordinasi penjadwalan rombongan",
      content: (
        <SlideInteractiveTabs 
          activeTab={params.activeTabKemudahan} 
          setActiveTab={params.setActiveTabKemudahan} 
        />
      ),
      speakerNotes: "Website ini sangat ramah untuk kedua pihak. Dari sisi wisatawan, mereka bisa melakukan pemesanan langsung secara mandiri dengan sangat mudah dan cepat tanpa kebingungan. Dari sisi kita selaku pengelola desa, format pesanan WhatsApp yang masuk akan sangat rapi dan detail sehingga konfirmasi jadwal bisa langsung dilakukan dengan mudah. Dan yang paling penting: ini 100% gratis tanpa biaya bulanan sewa server!"
    },
    {
      id: 4,
      category: "Integrasi Peta",
      title: "Desain Google Maps Khas Kampung Tajur",
      subtitle: "Penyesuaian visual peta interaktif menggunakan simbol identitas asli desa",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-full py-2">
          {/* Left panel */}
          <div className="md:col-span-5 flex flex-col justify-between h-full py-1">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded font-bold uppercase tracking-wider shadow-sm">
                  PENUNJUK KHUSUS (CUSTOM PIN)
                </span>
                <h3 className="font-poppins text-lg text-luxury-green-dark mt-2 font-bold leading-snug">Visual Peta yang Beridentitas</h3>
              </div>
              <p className="text-[12.5px] text-stone-500 leading-relaxed font-light">
                Peta pada website terhubung langsung dengan satelit Google Maps, namun penunjuk lokasi (pin merah standar) telah kami ganti menggunakan logo asli berwarna desa agar terlihat anggun dan profesional.
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-md space-y-3 text-xs border border-stone-100 mt-4">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8DB754] shrink-0" />
                <span className="text-stone-600 font-light"><strong className="font-semibold text-stone-800">Interaktif:</strong> Bisa digeser & dizoom langsung di HP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8DB754] shrink-0" />
                <span className="text-stone-600 font-light"><strong className="font-semibold text-stone-800">Skema Alami:</strong> Warna asri sungai & sawah menonjol</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#8DB754] shrink-0" />
                <span className="text-stone-600 font-light"><strong className="font-semibold text-stone-800">Tombol Navigasi:</strong> Sekali klik, rute jalan langsung terbuka</span>
              </div>
            </div>
          </div>

          {/* Right map mockup */}
          <div className="md:col-span-7 flex items-stretch h-full">
            <SlideMap />
          </div>
        </div>
      ),
      speakerNotes: "Pada peta lokasi, kami telah mengganti jarum penunjuk standar yang biasanya berwarna biru biasa menjadi logo resmi Kampung Tajur Kahuripan. Ukurannya disesuaikan agar pas menunjuk ke arah gerbang masuk desa. Petanya juga dibuat berwarna alami agar enak dilihat dan jalan-jalan sekitar desa tampak sangat jelas bagi pengunjung."
    },
    {
      id: 5,
      category: "Demonstrasi",
      title: "Pemesanan Langsung & Praktis via WhatsApp",
      subtitle: "Format pesan otomatis terstruktur rapi untuk mempermudah konfirmasi dan penjadwalan rombongan",
      content: (
        <SlideSimulator 
          simPackage={params.simPackage}
          setSimPackage={params.setSimPackage}
          simPax={params.simPax}
          setSimPax={params.setSimPax}
          simDate={params.simDate}
          setSimDate={params.setSimDate}
          simHomestay={params.simHomestay}
          setSimHomestay={params.setSimHomestay}
          simAttractions={params.simAttractions}
          setSimAttractions={params.setSimAttractions}
          getFormattedWAMessage={params.getFormattedWAMessage}
        />
      ),
      speakerNotes: "Pada halaman ini, kami menjelaskan tentang sistem pemesanan langsung via WhatsApp. Pengunjung tidak perlu bingung menghitung biaya atau mengestimasi anggaran secara manual. Cukup dengan mengisi data dasar rombongan mereka di website, sistem kami secara otomatis menyusun format pesan reservasi yang sangat rapi, sopan, dan terstruktur di sebelah kanan. Pengunjung kemudian dapat mengirimkannya langsung ke nomor WhatsApp resmi pengelola desa hanya dengan sekali klik."
    },
    {
      id: 6,
      category: "Keandalan Sistem",
      title: "Sistem Anti-Error & Optimalisasi Media Sosial",
      subtitle: "Menjaga stabilitas akses and memberikan impresi visual tautan yang menawan",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-full py-1">
          {/* Simulated Code Panel */}
          <div className="md:col-span-6 bg-white border border-stone-200/80 rounded-2xl shadow-md p-3.5 flex flex-col justify-between text-stone-800">
            <div>
              {/* IDE Header tabs */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block"></span>
                  <span className="text-[9px] font-mono text-stone-400 ml-2">vercel.json</span>
                </div>
                <span className="text-[8px] font-mono text-stone-400">JSON INTEGRASI</span>
              </div>
              
              <p className="text-[10px] text-stone-500 mb-2 font-light leading-relaxed">
                Penyetelan aturan pengalihan rute (rewrites) demi meniadakan halaman rusak (404 Page Not Found) saat tombol kembali diklik:
              </p>

              <code className="text-[10px] font-mono text-[#2c402e] block bg-stone-50 p-3 rounded-lg overflow-x-auto whitespace-pre leading-relaxed border border-stone-100 shadow-inner">
{`{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}`}
              </code>
            </div>

            <div className="flex items-center justify-between text-[8px] font-mono text-stone-400 pt-2 border-t border-stone-100/50 mt-2">
              <span className="text-emerald-700 font-bold">STATUS: COMPILED GREEN</span>
              <span>100% RELIABILITY</span>
            </div>
          </div>

          {/* Right Info panels */}
          <div className="md:col-span-6 flex flex-col justify-between gap-4 h-full">
            {/* Speed card */}
            <div className="p-5 bg-white rounded-xl flex flex-col justify-center gap-3.5 shadow-md border border-stone-100/30 flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-700 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-poppins text-sm font-bold text-luxury-green-dark">Stabilitas Server & Gembok HTTPS</h4>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Semua jalur pertukaran data dilindungi protokol SSL aman, dan gambar beresolusi tinggi otomatis dikompres demi akses instan tanpa buffering di jaringan seluler lambat.
              </p>
            </div>

            {/* Link Preview Card */}
            <div className="p-5 bg-white rounded-xl flex flex-col justify-center gap-3.5 shadow-md border border-stone-100/30 flex-1">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-700 shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <h4 className="font-poppins text-sm font-bold text-blue-900">Impresi Menarik saat Link Dibagikan</h4>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Ketika alamat website dikirim via WhatsApp atau Facebook, cuplikan visual gerbang Kampung Tajur yang asri dan deskripsi profesional langsung muncul otomatis meningkatkan ketertarikan calon tamu.
              </p>
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Bapak dan Ibu tidak perlu khawatir website ini akan sering macet atau lambat. Kami telah memasang sistem pengaman gratis agar website selalu bisa diakses 24 jam. Kami juga menyetel agar jika link website dibagikan ke WhatsApp atau Facebook, gambarnya akan muncul secara otomatis dengan rapi, sehingga promosi pariwisata kita terlihat sangat profesional."
    },
    {
      id: 7,
      category: "Sinergi Ke Depan",
      title: "Rencana Aksi & Pemeliharaan Situs Wisata",
      subtitle: "Panduan pembagian peran operasional pengelola desa dan pemeliharaan teknis berkala",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-full py-1">
          {/* Immediate Steps Column */}
          <div className="md:col-span-6 bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between border border-stone-100">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2.5 py-1 rounded font-bold uppercase tracking-wider shadow-sm">
                  OPERASIONAL & PROMOSI DESA
                </span>
                <h3 className="font-poppins text-[15px] text-luxury-green-dark mt-2 font-bold">Tugas Mandiri Pengelola</h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-700 text-[11.5px]">Broadcast Link Website Berkala</h5>
                    <p className="text-[10.5px] text-stone-500 font-light leading-relaxed mt-0.5">
                      Menyebarkan tautan website secara berkala via WhatsApp untuk meningkatkan traffic pengunjung dan mempercepat indeks situs di Google (SEO).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-700 text-[11.5px]">Kampanye Iklan Google Ads</h5>
                    <p className="text-[10.5px] text-stone-500 font-light leading-relaxed mt-0.5">
                      Menayangkan iklan berbayar di pencarian Google untuk menjangkau kelompok rombongan wisata (sekolah, kantor, keluarga) secara instan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-700 text-[11.5px]">Pembuatan Konten Medsos & Link Bio</h5>
                    <p className="text-[10.5px] text-stone-500 font-light leading-relaxed mt-0.5">
                      Memposting video kreatif di TikTok & Instagram Reels secara rutin dengan menaruh link website di bio untuk menarik minat kunjungan langsung.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-amber-50/60 rounded-xl text-[10px] text-amber-800 font-light mt-3 border border-amber-100/50">
              *Tugas Pokdarwis:* Memastikan kesiapan operasional di lapangan saat rombongan tamu berkunjung.
            </div>
          </div>

          {/* Routine Operations Column */}
          <div className="md:col-span-6 bg-white p-5 rounded-2xl shadow-md flex flex-col justify-between border border-stone-100">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded font-bold uppercase tracking-wider shadow-sm">
                  KOLABORASI TEKNIS BERSAMA DEVELOPER
                </span>
                <h3 className="font-poppins text-[15px] text-luxury-green-dark mt-2 font-bold">Pemeliharaan Berkala Website</h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-700 text-[11.5px]">Pembaruan Foto & Harga Paket Baru</h5>
                    <p className="text-[10.5px] text-stone-500 font-light leading-relaxed mt-0.5">
                      Berkoordinasi dengan developer untuk mengupdate dokumentasi foto kegiatan terbaru, testimoni, dan penyesuaian tarif paket musiman.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-700 text-[11.5px]">Pembaruan / Perpanjangan Sewa Domain</h5>
                    <p className="text-[10.5px] text-stone-500 font-light leading-relaxed mt-0.5">
                      Menyiapkan anggaran kas tahunan untuk melakukan perpanjangan alamat domain (.com / .id) bersama developer agar situs selalu aktif online.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-stone-700 text-[11.5px]">Pemantauan Statistik Pengunjung (SEO)</h5>
                    <p className="text-[10.5px] text-stone-500 font-light leading-relaxed mt-0.5">
                      Developer membantu menganalisis statistik pengunjung website secara berkala untuk terus meningkatkan peringkat pencarian promosi wisata.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl text-[10px] text-emerald-800 font-light mt-3 border border-emerald-100/50">
              *Tugas Developer & Pengelola:* Menjamin sistem tetap prima, aman dari error, dan relevan sepanjang tahun.
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Pada lembar rencana aksi ini, kami membagi peran menjadi dua pilar penting. Pertama adalah tugas operasional harian yang dipegang mandiri oleh pengelola Pokdarwis, seperti broadcast link website berkala di WhatsApp, kampanye Google Ads, serta pembuatan konten medsos kreatif dengan link bio. Kedua adalah kolaborasi teknis berkala bersama developer, seperti update foto kegiatan dan daftar harga paket baru secara rutin, perpanjangan sewa domain tahunan agar website tidak mati, serta analisis statistik pengunjung untuk optimasi promosi digital."
    },
    {
      id: 8,
      category: "Pengembangan",
      title: "Rekomendasi Rencana Upgrade Selanjutnya",
      subtitle: "Peluang adopsi fitur teknologi digital lanjutan untuk kemajuan desa wisata di masa mendatang",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch h-full py-1">
          {/* Main Info Left */}
          <div className="md:col-span-4 bg-stone-50 p-5 rounded-2xl flex flex-col justify-between border border-stone-200/50">
            <div>
              <span className="text-[10px] font-mono text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded font-bold uppercase tracking-wider shadow-sm">
                TRANSFORMASI DIGITAL
              </span>
              <h3 className="font-poppins text-lg text-luxury-green-dark mt-2.5 font-bold leading-snug">Peta Jalan Inovasi Berkelanjutan</h3>
              <p className="text-[11px] text-stone-500 mt-2 font-light leading-relaxed">
                Rekomendasi fitur tambahan yang dapat diintegrasikan secara berkala pada pengembangan fase berikutnya untuk mengoptimalkan potensi desa.
              </p>
            </div>

            <div className="p-3.5 bg-[#8DB754]/10 rounded-xl border border-[#8DB754]/20 text-[10px] text-stone-600 font-light leading-relaxed">
              <span className="font-bold text-luxury-green-dark block mb-0.5">💡 Skala Prioritas</span>
              Inovasi ini dapat diterapkan secara bertahap sesuai kesiapan SDM pengelola dan pertumbuhan jumlah kunjungan rombongan.
            </div>
          </div>

          {/* Grid Cards Right - Scrollable for more cards */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] md:max-h-[420px] lg:max-h-[520px] xl:max-h-[640px] overflow-y-auto pr-1.5 scrollbar-thin">
            {/* Card 1 */}
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="font-poppins text-[11px] font-bold text-stone-800 mt-2">Realtime Database & Admin Panel</h4>
                <p className="text-[10px] text-stone-500 font-light leading-relaxed mt-1">
                  Sistem basis data terpusat dan dashboard admin khusus pengelola untuk memperbarui info paket wisata, mengedit harga, dan memantau pesanan masuk secara langsung.
                </p>
              </div>
              <span className="text-[8px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-mono font-bold self-start mt-2">FASE 1</span>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h4 className="font-poppins text-[11px] font-bold text-stone-800 mt-2">Direktori Produk UMKM Desa</h4>
                <p className="text-[10px] text-stone-500 font-light leading-relaxed mt-1">
                  Katalog online yang memajang produk lokal warga seperti tenun ikat khas Tajur, gula aren, beras organik, dan hasil kerajinan bambu.
                </p>
              </div>
              <span className="text-[8px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-mono font-bold self-start mt-2">FASE 1</span>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                  <CreditCard className="w-4 h-4" />
                </div>
                <h4 className="font-poppins text-[11px] font-bold text-stone-800 mt-2">Pemesanan & Pembayaran Online</h4>
                <p className="text-[10px] text-stone-500 font-light leading-relaxed mt-1">
                  Integrasi gerbang pembayaran (Payment Gateway) yang aman untuk pembayaran DP instan lewat QRIS, dompet digital, atau transfer bank.
                </p>
              </div>
              <span className="text-[8px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold self-start mt-2">FASE 2</span>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
                  <Rocket className="w-4 h-4" />
                </div>
                <h4 className="font-poppins text-[11px] font-bold text-stone-800 mt-2">Fitur Review & Galeri Interaktif</h4>
                <p className="text-[10px] text-stone-500 font-light leading-relaxed mt-1">
                  Halaman testimoni langsung dari wisatawan pasca-kunjungan dan visualisasi panorama 360° keindahan alam Kampung Wisata Tajur.
                </p>
              </div>
              <span className="text-[8px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-mono font-bold self-start mt-2">FASE 2</span>
            </div>

            {/* Card 5 */}
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                  <Newspaper className="w-4 h-4" />
                </div>
                <h4 className="font-poppins text-[11px] font-bold text-stone-800 mt-2">Website Berita Kampung Tajur</h4>
                <p className="text-[10px] text-stone-500 font-light leading-relaxed mt-1">
                  Portal berita lokal untuk menyajikan agenda adat mingguan, liputan festival budaya musiman, serta transparansi kegiatan desa bagi publik luas.
                </p>
              </div>
              <span className="text-[8px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-mono font-bold self-start mt-2">FASE 3</span>
            </div>

            {/* Card 6 */}
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shadow-sm">
                  <Megaphone className="w-4 h-4" />
                </div>
                <h4 className="font-poppins text-[11px] font-bold text-stone-800 mt-2">Sistem WhatsApp Broadcaster</h4>
                <p className="text-[10px] text-stone-500 font-light leading-relaxed mt-1">
                  Pengiriman info promosi, paket musiman, atau konfirmasi massal secara instan sekali klik langsung ke nomor kontak ratusan calon pengunjung.
                </p>
              </div>
              <span className="text-[8px] text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-mono font-bold self-start mt-2">FASE 3</span>
            </div>
          </div>
        </div>
      ),
      speakerNotes: "Setelah merencanakan aksi operasional dasar, kami juga menyusun rekomendasi pengembangan jangka panjang untuk peningkatan website pariwisata Tajur Kahuripan ini. Rekomendasinya terbagi menjadi beberapa fase. Pertama adalah integrasi Realtime Database & Admin Panel untuk memudahkan pengeditan data paket wisata secara mandiri oleh pengelola, serta direktori khusus untuk mempromosikan UMKM produk lokal warga desa seperti kain tenun ikat dan oleh-oleh khas. Fase berikutnya adalah sistem pembayaran online langsung via QRIS atau transfer otomatis untuk tanda jadi reservasi, serta galeri interaktif panorama 360 derajat. Fase ketiga mencakup portal website berita lokal Kampung Tajur dan sistem WhatsApp Broadcaster untuk mempermudah penyebaran informasi promosi secara massal kepada calon pengunjung."
    },
    {
      id: 9,
      category: "Selesai",
      title: "Penutup & Apresiasi Terhangat",
      subtitle: "Membangun sinergi berkelanjutan demi kesejahteraan pariwisata masyarakat adat Tajur",
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full max-w-2xl mx-auto py-4">
          <div className="w-20 h-20 rounded-full bg-[#8DB754]/10 text-[#8DB754] flex items-center justify-center text-4xl shadow-md mb-5 animate-pulse">
            🌿
          </div>
          
          <span className="text-[11px] font-mono text-luxury-gold uppercase tracking-widest font-bold bg-luxury-green-dark/5 px-3 py-1 rounded">
            SINERGI DESA ADAT DIGITAL
          </span>
          
          <h2 className="font-serif text-3xl text-luxury-green-dark mt-3.5 font-bold">Sampurasun, Hatur Nuhun!</h2>
          
          <div className="w-16 h-1 bg-luxury-gold my-4 rounded-full"></div>
          
          <p className="text-sm md:text-base text-stone-600 font-light italic leading-relaxed max-w-lg">
            "Maju Desana, Lestari Budayana, Sejahtera Masyarakatna."
          </p>
          
          <p className="text-xs text-stone-500 mt-4 leading-relaxed font-light max-w-md">
            Terima kasih yang sebesar-besarnya atas kepercayaan luar biasa dari segenap sesepuh, tokoh masyarakat, dan seluruh pengelola Kampung Wisata Tajur Kahuripan.
          </p>

          <div className="flex gap-4 w-full max-w-sm mt-8">
            <Link 
              id="link-btn-back-home"
              to="/" 
              className="flex-1 text-center py-3 bg-[#8DB754] hover:bg-[#8DB754]/95 text-white rounded-xl text-xs font-mono transition-colors shadow-md font-bold"
            >
              Beranda Utama
            </Link>
            <Link 
              id="link-btn-back-explore"
              to="/eksplorasi" 
              className="flex-1 text-center py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-mono transition-colors font-bold shadow-sm"
            >
              Brosur Paket
            </Link>
          </div>
          
          <span className="text-[9px] font-mono text-stone-400 mt-8 tracking-wider">
            KAMPUNG WISATA TAJUR KAHURIPAN &copy; 2026
          </span>
        </div>
      ),
      speakerNotes: "Sebagai penutup presentasi, kami ingin menyampaikan rasa terima kasih dan apresiasi yang setinggi-tingginya kepada sesepuh adat dan seluruh pengelola Kampung Wisata Tajur Kahuripan atas sinergi yang luar biasa ini. Kami berharap dengan hadirnya website ini, pariwisata Tajur bisa semakin maju, mandiri, namun budayanya tetap lestari, dan memberikan manfaat ekonomi nyata untuk warga desa. Hatur nuhun, terima kasih banyak!"
    }
  ];
};

