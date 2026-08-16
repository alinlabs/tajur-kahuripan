import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, Users, Building, MessageCircle, CheckCircle2, Check, 
  Plus, Minus, Receipt, ArrowRight, Home as HomeIcon,
  Compass, Info, ChevronRight
} from "lucide-react";
import { TourismData } from "../types";
import { getDriveResponsiveProps } from "../utils/imageUtils";

interface RencanaPageProps {
  data: TourismData;
}

export default function RencanaPage({ data }: RencanaPageProps) {
  const [searchParams] = useSearchParams();
  const paramPackageId = searchParams.get("packageId");

  const [name, setName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [pax, setPax] = useState<number>(30);
  const [selectedPackages, setSelectedPackages] = useState<string[]>(() => {
    if (paramPackageId) {
      return [paramPackageId];
    }
    return [];
  });
  const [needHomestay, setNeedHomestay] = useState(false);
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  const firstHomestay = data.accommodations[0];

  const handlePackageToggle = (id: string) => {
    if (selectedPackages.includes(id)) {
      setSelectedPackages(selectedPackages.filter((item) => item !== id));
    } else {
      setSelectedPackages([...selectedPackages, id]);
    }
  };

  const handleAttractionToggle = (id: string) => {
    if (selectedAttractions.includes(id)) {
      setSelectedAttractions(selectedAttractions.filter(item => item !== id));
    } else {
      setSelectedAttractions([...selectedAttractions, id]);
    }
  };

  // Quick Date Presets
  const setQuickDate = (daysAhead: number) => {
    const target = new Date();
    target.setDate(target.getDate() + daysAhead);
    const dateStr = target.toISOString().split("T")[0];
    setVisitDate(dateStr);
  };

  const neededHouses = Math.ceil(pax / 4);

  // Price Calculation
  const calculation = useMemo(() => {
    let pkgCost = 0;
    selectedPackages.forEach((id) => {
      const pkg = data.main_packages.find((p) => p.id === id);
      if (pkg) {
        pkgCost += pkg.pricing_type === "per_pax" ? pax * pkg.base_price : pkg.base_price;
      }
    });

    let homestayCost = 0;
    if (needHomestay && firstHomestay) {
      homestayCost = neededHouses * firstHomestay.base_price;
    }

    let attrCost = 0;
    selectedAttractions.forEach(id => {
      const att = data.optional_attractions.find(a => a.id === id);
      if (att) {
        attrCost += att.pricing_type === "per_pax" ? pax * att.base_price : att.base_price;
      }
    });

    const total = pkgCost + homestayCost + attrCost;
    const costPerPax = pax > 0 ? Math.round(total / pax) : 0;

    return {
      pkgCost,
      homestayCost,
      attrCost,
      total,
      costPerPax
    };
  }, [selectedPackages, needHomestay, firstHomestay, selectedAttractions, pax, data, neededHouses]);

  const getMessageText = () => {
    let formattedDate = "-";
    if (visitDate) {
      const parts = visitDate.split("-");
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        formattedDate = d.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }
    }

    const selectedPkgObjs = data.main_packages.filter(p => selectedPackages.includes(p.id));
    const homestayTotalCost = neededHouses * (firstHomestay?.base_price || 350000);

    const attractionObjs = selectedAttractions
      .map(id => data.optional_attractions.find(a => a.id === id))
      .filter((a): a is NonNullable<typeof a> => Boolean(a));

    const pkgSection = selectedPkgObjs.length > 0 
      ? selectedPkgObjs.map(p => `• ${p.title}`).join("\n") 
      : "• Tidak memilih paket utama (Opsional/Bebas)";

    const attrSection = attractionObjs.length > 0
      ? `\n*Kegiatan Tambahan:*\n${attractionObjs.map(a => `• ${a.title}`).join("\n")}`
      : "";

    return `*Rencana Kunjungan Wisata Kampung Adat Tajur*

*Detail Rombongan:*
• Nama / Instansi: ${name || "-"}
• Tanggal Kunjungan: ${formattedDate}
• Jumlah Peserta: ${pax} Orang

*Paket & Fasilitas Terpilih:*
*Paket Utama:*
${pkgSection}

*Penginapan Homestay Warga:*
• ${needHomestay ? `Ya (${neededHouses} Rumah Adat - Kapasitas 4 orang/rumah)` : "Tidak Perlu"}
${attrSection}

*Rincian Estimasi Biaya:*
• Paket Utama: ${formatIDR(calculation.pkgCost)}
• Penginapan (${needHomestay ? neededHouses : 0} Rumah): ${formatIDR(calculation.homestayCost)}
• Kegiatan Tambahan: ${formatIDR(calculation.attrCost)}
───────────────
*TOTAL ESTIMASI:* ${formatIDR(calculation.total)}
*ESTIMASI PER PAX:* ± ${formatIDR(calculation.costPerPax)} / orang

Sampurasun Admin Tajur Kahuripan, mohon konfirmasi ketersediaan kuota rombongan kami pada tanggal tersebut. Hatur nuhun.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !visitDate || pax < 1) return;
    
    setIsSuccess(true);
    
    const text = getMessageText();
    const encodedMessage = encodeURIComponent(text);
    const waUrl = `https://wa.me/6281383172489?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(waUrl, "_blank");
      setIsSuccess(false);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pt-20 md:pt-28 pb-44 md:pb-28 bg-[#FAF8F5] overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Title */}
        <div className="text-center mb-8 md:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-5xl font-sans font-bold text-luxury-green-dark mt-1 mb-3 tracking-tight"
          >
            Rencana Wisata
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-stone-500 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-poppins"
          >
            Rencanakan agenda kunjungan rombongan Anda dengan mudah. Estimasi biaya terhitung otomatis dan siap dipesan langsung via WhatsApp.
          </motion.p>
        </div>

        {/* Single Column Form Layout */}
        <div className="max-w-3xl mx-auto">
          
          {/* Form Controls */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Card 1: Informasional Peserta & Tanggal */}
              <div className="space-y-2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200/80 space-y-5"
                >
                  {/* Nama / Instansi */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 mb-2 font-bold font-sans">
                      Nama Pemesan / Instansi <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: PT. Makmur Jaya / Kunjungan Sekolah"
                        className="w-full pl-12 pr-4 py-3.5 bg-stone-50/80 border border-stone-200 rounded-2xl outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all text-sm text-stone-800 placeholder:text-stone-400 font-poppins"
                      />
                    </div>
                  </div>

                  {/* Tanggal & Presets */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-600 font-bold font-sans mb-2">
                      Tanggal Kunjungan <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
                      <input
                        type="date"
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-stone-50/80 border border-stone-200 rounded-2xl outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all text-sm text-stone-800 font-sans"
                      />
                    </div>
                  </div>

                  {/* Jumlah Peserta with Stepper & Quick Pills */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs uppercase tracking-wider text-stone-600 font-bold font-sans">
                        Jumlah Peserta (Pax) <span className="text-red-500">*</span>
                      </label>
                      <span className="text-xs text-luxury-gold-dark font-bold font-poppins">
                        {pax} Orang Peserta
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative flex items-center">
                        <Users className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
                        <input
                          type="number"
                          required
                          min="1"
                          value={pax}
                          onChange={(e) => setPax(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full pl-12 pr-20 py-3.5 bg-stone-50/80 border border-stone-200 rounded-2xl outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all text-sm text-stone-800 font-poppins font-bold"
                        />
                        <div className="absolute right-2 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setPax(Math.max(1, pax - 5))}
                            className="p-2 rounded-xl bg-white hover:bg-stone-200 border border-stone-200 text-stone-600 transition-all active:scale-90"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setPax(pax + 5)}
                            className="p-2 rounded-xl bg-white hover:bg-stone-200 border border-stone-200 text-stone-600 transition-all active:scale-90"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Pax Selection Pills */}
                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-3">
                      {[15, 30, 50, 100].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setPax(num)}
                          className={`py-1 px-1 sm:px-2.5 rounded-full text-[11px] sm:text-xs font-poppins text-center w-full transition-all cursor-pointer ${
                            pax === num 
                              ? "bg-luxury-green-dark text-white font-bold shadow-sm" 
                              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                          }`}
                        >
                          {num} Pax
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Card 2: Pilih Paket Utama */}
              <div className="space-y-3">
                <div className="px-1">
                  <h3 className="font-sans font-bold text-base md:text-lg text-stone-800">
                    Pilih Paket Utama
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {data.main_packages.map((pkg, idx) => {
                    const isSelected = selectedPackages.includes(pkg.id);
                    return (
                      <motion.button
                        key={pkg.id}
                        type="button"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * idx }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePackageToggle(pkg.id)}
                        className={`group relative rounded-2xl md:rounded-3xl border text-left transition-all flex flex-col justify-between cursor-pointer outline-none bg-white overflow-hidden ${
                          isSelected
                            ? "border-[#91BA5A] bg-[#91BA5A]/5 ring-2 ring-[#91BA5A]/30 shadow-md"
                            : "border-stone-200 hover:border-stone-300 hover:shadow-md"
                        }`}
                      >
                        <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden shrink-0">
                          <img
                            loading="lazy" decoding="async"
                            {...getDriveResponsiveProps(pkg.image_url)}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm ${
                            isSelected ? "bg-[#91BA5A] border-[#91BA5A] text-white scale-110" : "bg-white/90 border-stone-300 text-transparent"
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2 w-full">
                          <div>
                            <h4 className="font-sans font-bold text-xs sm:text-sm md:text-base text-stone-800 line-clamp-2 leading-snug">
                              {pkg.title}
                            </h4>
                          </div>

                          <div className="flex items-center justify-between w-full mt-auto">
                            <span className="font-poppins text-xs sm:text-sm font-bold text-stone-900">
                              {formatIDR(pkg.base_price)}
                              <span className="text-[10px] text-stone-400 font-normal ml-0.5">
                                /{pkg.pricing_type === 'per_pax' ? 'pax' : 'grup'}
                              </span>
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Card 3: Kegiatan Tambahan Per Pax */}
              <div className="space-y-3">
                <div className="px-1">
                  <h3 className="font-sans font-bold text-base md:text-lg text-stone-800">
                    Kegiatan Tambahan Per Pax
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {data.optional_attractions
                    .filter((att) => att.pricing_type === "per_pax")
                    .map((att, idx) => {
                      const isSelected = selectedAttractions.includes(att.id);
                      return (
                        <motion.button
                          key={att.id}
                          type="button"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * idx }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAttractionToggle(att.id)}
                          className={`group relative rounded-2xl md:rounded-3xl border text-left transition-all flex flex-col justify-between cursor-pointer outline-none bg-white overflow-hidden ${
                            isSelected
                              ? "border-[#91BA5A] bg-[#91BA5A]/5 ring-2 ring-[#91BA5A]/30 shadow-md"
                              : "border-stone-200 hover:border-stone-300 hover:shadow-md"
                          }`}
                        >
                          <div className="relative w-full aspect-[4/3] bg-stone-100 overflow-hidden shrink-0">
                            <img
                              loading="lazy" decoding="async"
                              {...getDriveResponsiveProps(att.image_url)}
                              alt={att.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm ${
                              isSelected ? "bg-[#91BA5A] border-[#91BA5A] text-white scale-110" : "bg-white/90 border-stone-300 text-transparent"
                            }`}>
                              <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
                            </div>
                          </div>

                          <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2 w-full">
                            <div>
                              <h4 className="font-sans font-bold text-xs sm:text-sm md:text-base text-stone-800 line-clamp-2 leading-snug">
                                {att.title}
                              </h4>
                            </div>

                            <div className="flex items-center justify-between w-full mt-auto">
                              <span className="font-poppins text-xs sm:text-sm font-bold text-stone-900">
                                +{formatIDR(att.base_price)}
                                <span className="text-[10px] text-stone-400 font-normal ml-0.5">/pax</span>
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                </div>
              </div>

              {/* Card 4: Kegiatan Tambahan Per Group */}
              <div className="space-y-3">
                <div className="px-1">
                  <h3 className="font-sans font-bold text-base md:text-lg text-stone-800">
                    Kegiatan Tambahan Per Group
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {data.optional_attractions
                    .filter((att) => att.pricing_type === "per_group")
                    .map((att, idx) => {
                      const isSelected = selectedAttractions.includes(att.id);
                      const isFullWidth = att.id === "bajak-sawah" || att.title.toLowerCase().includes("bajak");
                      return (
                        <motion.button
                          key={att.id}
                          type="button"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * idx }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAttractionToggle(att.id)}
                          className={`group relative rounded-2xl md:rounded-3xl border text-left transition-all flex flex-col justify-between cursor-pointer outline-none bg-white overflow-hidden ${
                            isFullWidth ? "col-span-2" : ""
                          } ${
                            isSelected
                              ? "border-[#91BA5A] bg-[#91BA5A]/5 ring-2 ring-[#91BA5A]/30 shadow-md"
                              : "border-stone-200 hover:border-stone-300 hover:shadow-md"
                          }`}
                        >
                          <div className={`relative w-full ${isFullWidth ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[4/3]"} bg-stone-100 overflow-hidden shrink-0`}>
                            <img
                              loading="lazy" decoding="async"
                              {...getDriveResponsiveProps(att.image_url)}
                              alt={att.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm ${
                              isSelected ? "bg-[#91BA5A] border-[#91BA5A] text-white scale-110" : "bg-white/90 border-stone-300 text-transparent"
                            }`}>
                              <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
                            </div>
                          </div>

                          <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2 w-full">
                            <div>
                              <h4 className="font-sans font-bold text-xs sm:text-sm md:text-base text-stone-800 line-clamp-2 leading-snug">
                                {att.title}
                              </h4>
                            </div>

                            <div className="flex items-center justify-between w-full mt-auto">
                              <span className="font-poppins text-xs sm:text-sm font-bold text-stone-900">
                                +{formatIDR(att.base_price)}
                                <span className="text-[10px] text-stone-400 font-normal ml-0.5">/grup</span>
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                </div>
              </div>

              {/* Card 5: Akomodasi & Penginapan */}
              <div className="space-y-3">
                <div className="px-1">
                  <h3 className="font-sans font-bold text-base md:text-lg text-stone-800">
                    Akomodasi & Penginapan
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {data.accommodations.map((acc, idx) => {
                    const isSelected = needHomestay;
                    return (
                      <motion.button
                        key={acc.id}
                        type="button"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * idx }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setNeedHomestay(!needHomestay)}
                        className={`group relative rounded-2xl md:rounded-3xl border text-left transition-all flex flex-col justify-between cursor-pointer outline-none bg-white overflow-hidden ${
                          isSelected
                            ? "border-[#91BA5A] bg-[#91BA5A]/5 ring-2 ring-[#91BA5A]/30 shadow-md"
                            : "border-stone-200 hover:border-stone-300 hover:shadow-md"
                        }`}
                      >
                        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-stone-100 overflow-hidden shrink-0">
                          <img
                            loading="lazy" decoding="async"
                            {...getDriveResponsiveProps(acc.image_url)}
                            alt={acc.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm ${
                            isSelected ? "bg-[#91BA5A] border-[#91BA5A] text-white scale-110" : "bg-white/90 border-stone-300 text-transparent"
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3] text-white" />
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2 w-full">
                          <div>
                            <h4 className="font-sans font-bold text-xs sm:text-sm md:text-base text-stone-800 line-clamp-2 leading-snug">
                              {acc.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-stone-500 font-poppins mt-1">
                              Kapasitas 4 orang / rumah adat ({pax} peserta = <span className="font-semibold text-stone-700">{neededHouses} rumah</span>)
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full mt-auto pt-1 gap-1">
                            <span className="font-poppins text-xs sm:text-sm font-bold text-stone-900">
                              +{formatIDR(acc.base_price)}
                              <span className="text-[10px] text-stone-400 font-normal ml-0.5">/ rumah / malam</span>
                            </span>
                            {isSelected && (
                              <span className="text-[11px] sm:text-xs font-bold text-[#91BA5A] font-poppins">
                                Total ({neededHouses} Rumah): {formatIDR(neededHouses * acc.base_price)}/malam
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>



            </form>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar for Rencana Page */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] px-4 py-3 pb-safe">
        <div className="max-w-2xl mx-auto flex flex-col gap-2.5">
          {/* Info Line: Estimasi Peserta, Total Nominal & Estimasi Per Orang */}
          <div className="flex items-start justify-between text-xs sm:text-sm font-poppins px-1 gap-2">
            <div className="flex items-center gap-1.5 text-stone-600">
              <span className="font-medium text-stone-500">Estimasi Peserta:</span>
              <span className="bg-amber-50 text-luxury-green-dark px-2.5 py-0.5 rounded-full font-bold border border-luxury-gold/30">
                {pax} Pax
              </span>
            </div>

            <div className="flex flex-col items-end gap-0.5 text-right">
              <div className="flex items-center gap-1.5">
                <span className="text-stone-500 font-medium">Total Nominal:</span>
                <span className="font-sans font-bold text-base sm:text-lg text-luxury-green-dark">
                  {formatIDR(calculation.total)}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-stone-600 font-medium">
                Estimasi per orang: <span className="font-bold text-stone-900">{formatIDR(calculation.costPerPax)}</span> / pax
              </div>
            </div>
          </div>

          {/* Action Button: WhatsApp Order */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleSubmit}
            disabled={isSuccess || !name || !visitDate || pax < 1}
            className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] active:bg-[#128C7E] text-white font-bold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-md shadow-[#25D366]/20 text-xs sm:text-sm md:text-base uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 animate-bounce" />
                <span>Membuka WhatsApp...</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Pesan Sekarang via WhatsApp</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

    </motion.div>
  );
}

