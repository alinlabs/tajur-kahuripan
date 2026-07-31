import React, { useState } from "react";
import MainPackages from "./components/PaketList";
import { TourismData, MainPackage } from "../../types";
import DetailDrawer from "../../components/DetailDrawer";
import { motion } from "motion/react";

interface SectionPaketProps {
  data: TourismData;
  onOpenPlanner: (id?: string) => void;
}

export default function SectionPaket({ data, onOpenPlanner }: SectionPaketProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<MainPackage | null>(null);

  const handleOpenDetail = (item: MainPackage) => {
    setDrawerItem(item);
    setDrawerOpen(true);
  };

  const handleBookFromDrawer = () => {
    setDrawerOpen(false);
    if (drawerItem) {
      onOpenPlanner(drawerItem.id);
    }
  };

  return (
    <section id="beranda" className="pt-6 md:pt-10 pb-0 md:pb-6 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-4 md:mb-6 px-6 md:px-0"
        >
          <h2 className="font-serif text-2xl md:text-5xl text-luxury-green-dark mb-0.5 md:mb-1 font-bold">Paket Wisata</h2>
          <p className="text-stone-500 max-w-md md:max-w-2xl mx-auto font-poppins text-xs min-[400px]:text-sm md:text-lg leading-relaxed line-clamp-1 px-4 md:px-0">
            Pengalaman terbaik di Kampung Wisata Tajur Kahuripan untuk kenangan tak terlupakan.
          </p>
        </motion.div>
        <MainPackages packages={data.main_packages} onOpenDetail={handleOpenDetail} />
      </div>

      <DetailDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        item={drawerItem}
        type="package"
        onBook={handleBookFromDrawer}
      />
    </section>
  );
}
