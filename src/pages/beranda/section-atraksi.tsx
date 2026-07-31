import React, { useState } from "react";
import Attractions from "./components/AtraksiList";
import DetailDrawer from "../../components/DetailDrawer";
import { TourismData, OptionalAttraction } from "../../types";
import { motion } from "motion/react";

interface SectionAtraksiProps {
  data: TourismData;
  onOpenPlanner: (id?: string) => void;
}

export default function SectionAtraksi({ data, onOpenPlanner }: SectionAtraksiProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerItem, setDrawerItem] = useState<OptionalAttraction | null>(null);

  const handleOpenDetail = (item: OptionalAttraction) => {
    setDrawerItem(item);
    setDrawerOpen(true);
  };

  const handleBookFromDrawer = () => {
    setDrawerOpen(false);
    onOpenPlanner();
  };

  return (
    <section className="pt-6 pb-6 md:py-8 bg-[#FAFAF9] border-t border-luxury-sand/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-4 md:mb-6 px-6 md:px-0"
          >
            <h3 className="font-serif text-2xl md:text-5xl text-luxury-green-dark mb-0.5 md:mb-1 font-bold">Atraksi Ekstra</h3>
            <p className="text-stone-500 max-w-md md:max-w-2xl mx-auto font-poppins text-xs min-[400px]:text-sm md:text-lg leading-relaxed line-clamp-1 px-4 md:px-0">Pengalaman tambahan untuk melengkapi wisata Anda</p>
          </motion.div>
          <Attractions attractions={data.optional_attractions} onOpenDetail={handleOpenDetail} />
        </div>
      </div>
      
      <DetailDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        item={drawerItem}
        type="attraction"
        onBook={handleBookFromDrawer}
      />
    </section>
  );
}
