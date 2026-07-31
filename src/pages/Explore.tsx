import React from "react";
import { TourismData } from "../types";
import { motion } from "motion/react";
import Tentang from "./eksplorasi/tentang";
import SectionKatalog from "./eksplorasi/section-katalog";
import Kppm from "./eksplorasi/kppm";

interface ExploreProps {
  data: TourismData;
  onOpenPlanner: (id?: string) => void;
}

export default function Explore({ data, onOpenPlanner }: ExploreProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen pt-14 md:pt-20 bg-white relative overflow-hidden"
    >
      {/* Section 1: Tentang (Filosofi & Adat) */}
      <Tentang />

      {/* Section 2: Katalog (Paket Wisata, Atraksi, Akomodasi) */}
      <SectionKatalog data={data} onOpenPlanner={onOpenPlanner} />

      {/* Section 3: KPPM (Sinergi Digital, Deskripsi & Auto Scroll Collage) */}
      <Kppm />
    </motion.div>
  );
}

