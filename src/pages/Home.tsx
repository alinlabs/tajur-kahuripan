import React from "react";
import { TourismData } from "../types";
import { motion } from "motion/react";

import Hero from "./beranda/hero";
import BannerPromo from "./beranda/BannerPromo";
import SectionPaket from "./beranda/section-paket";
import SectionOlehOleh from "./beranda/section-oleh-oleh";
import SectionAtraksi from "./beranda/section-atraksi";
import SectionAkomodasi from "./beranda/section-akomodasi";
import SectionMaps from "./beranda/section-maps";

interface HomeProps {
  data: TourismData;
  onExplore: () => void;
  onOpenPlanner: (id?: string) => void;
}

export default function Home({ data, onExplore, onOpenPlanner }: HomeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-x-clip"
    >
      <Hero onExplore={onExplore} data={data} />
      <BannerPromo />
      <SectionPaket data={data} onOpenPlanner={onOpenPlanner} />
      <SectionOlehOleh />
      <SectionAtraksi data={data} onOpenPlanner={onOpenPlanner} />
      <SectionAkomodasi data={data} onOpenPlanner={onOpenPlanner} />
      <SectionMaps />
    </motion.div>
  );
}



