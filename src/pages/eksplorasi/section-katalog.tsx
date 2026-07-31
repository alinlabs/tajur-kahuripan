import React, { useState } from "react";
import PaketList from "./components/PaketList";
import AtraksiList from "./components/AtraksiList";
import AkomodasiList from "./components/AkomodasiList";
import DetailDrawer from "../../components/DetailDrawer";
import { TourismData, MainPackage, OptionalAttraction, Accommodation } from "../../types";
import { motion, AnimatePresence } from "motion/react";

interface SectionKatalogProps {
  data: TourismData;
  onOpenPlanner: (id?: string) => void;
}

type TabType = "paket" | "atraksi" | "akomodasi";

export default function SectionKatalog({ data, onOpenPlanner }: SectionKatalogProps) {
  const [activeTab, setActiveTab] = useState<TabType>("paket");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<MainPackage | OptionalAttraction | Accommodation | null>(null);
  const [drawerType, setDrawerType] = useState<"package" | "attraction" | "accommodation" | null>(null);

  const handleOpenDetail = (item: any, type: "package" | "attraction" | "accommodation") => {
    setDrawerItem(item);
    setDrawerType(type);
    setDrawerOpen(true);
  };

  const handleBookFromDrawer = () => {
    setDrawerOpen(false);
    if (drawerType === "package" && drawerItem) {
      onOpenPlanner(drawerItem.id);
    } else {
      onOpenPlanner();
    }
  };

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: "paket", label: "Paket Wisata", count: data.main_packages?.length },
    { id: "atraksi", label: "Atraksi Ekstra", count: data.optional_attractions?.length },
    { id: "akomodasi", label: "Akomodasi", count: data.accommodations?.length }
  ];

  return (
    <section id="katalog" className="bg-white py-6 md:py-12 relative">
      {/* Navigation Tabs */}
      <div className="pt-2 md:pt-4 pb-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-6 md:mb-10"
          >
            <span className="text-xs font-mono tracking-widest text-luxury-gold-dark uppercase font-semibold block mb-2">
              Katalog Wisata Tajur
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-green-dark font-bold">
              Pilihan Eksplorasi Terbaik
            </h2>
          </motion.div>
          
          <div className="flex justify-center w-full overflow-x-auto hide-scrollbar mb-2">
            <div className="inline-flex bg-stone-100/90 border border-stone-200/80 rounded-full p-1.5 shadow-inner min-w-max">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-5 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap flex items-center gap-2 outline-none select-none ${
                      isActive
                        ? "text-white font-bold"
                        : "text-stone-600 hover:text-luxury-green-dark"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="katalogActiveTab"
                        className="absolute inset-0 bg-luxury-green-dark rounded-full shadow-md"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className={`relative z-10 text-[10px] md:text-xs px-2 py-0.5 rounded-full font-mono transition-colors ${
                        isActive ? "bg-white/20 text-white" : "bg-stone-200 text-stone-600"
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Content */}
      <div className="w-full max-w-7xl mx-auto px-0 md:px-12 relative mb-6 md:mb-12">
        <div className="w-full relative overflow-hidden md:rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {activeTab === "paket" && (
                <PaketList packages={data.main_packages} onOpenDetail={(pkg) => handleOpenDetail(pkg, "package")} />
              )}
              {activeTab === "atraksi" && (
                <AtraksiList attractions={data.optional_attractions} onOpenDetail={(att) => handleOpenDetail(att, "attraction")} />
              )}
              {activeTab === "akomodasi" && (
                <AkomodasiList accommodations={data.accommodations} onOpenDetail={(acc) => handleOpenDetail(acc, "accommodation")} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <DetailDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        item={drawerItem}
        type={drawerType}
        onBook={handleBookFromDrawer}
      />
    </section>
  );
}

