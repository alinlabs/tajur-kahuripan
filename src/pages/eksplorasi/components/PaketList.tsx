import React, { useState, useEffect } from "react";
import { MainPackage } from "../../../types";
import { motion, AnimatePresence } from "motion/react";
import { getDriveResponsiveProps } from "../../../utils/imageUtils";

interface MainPackagesProps {
  packages: MainPackage[];
  onOpenDetail: (pkg: MainPackage) => void;
}

const PACKAGE_SLIDE_IMAGES: Record<string, string[]> = {
  "saba-budaya": [
    "https://drive.google.com/thumbnail?id=1eZGaJEroDDK_0119C5d71QZ4AO5L7hnR&sz=w250",
    "https://drive.google.com/thumbnail?id=1fL0bMiZgSkRz3wP1SCVr94opR7UJz_rg&sz=w250",
    "https://drive.google.com/thumbnail?id=19mXPyiXFp378ANSTkRUj70M6d9UjSiqZ&sz=w250"
  ],
  "ulin-pelemburan": [
    "https://drive.google.com/thumbnail?id=1BU8OqHhlcmnbds7A5Iyvn9-cxuwpk7aI&sz=w250",
    "https://drive.google.com/thumbnail?id=1CRV5NGSjWuqruCGWNJGvJhXvdEF-p88m&sz=w250",
    "https://drive.google.com/thumbnail?id=1fQABOcINMbtWxxykMdBNhCUOwZdXWLvl&sz=w250",
    "https://drive.google.com/thumbnail?id=1SVRI-NoD2pmjgFiPFymOm-X10iILW9gA&sz=w250",
    "https://drive.google.com/thumbnail?id=1Nh3IXddB-2mXSHwKep4-UduTWSrI5HEV&sz=w250"
  ]
};

function PackageItem({ pkg, onOpenDetail }: { pkg: MainPackage; onOpenDetail: (pkg: MainPackage) => void; key?: string }) {
  const images = PACKAGE_SLIDE_IMAGES[pkg.id] || [pkg.image_url];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div
      className="w-full relative group cursor-pointer overflow-hidden rounded-3xl bg-stone-900 h-[380px] md:h-[420px] shadow-lg"
      onClick={() => onOpenDetail(pkg)}
    >
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[currentImageIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            loading="lazy" decoding="async"
            {...getDriveResponsiveProps(images[currentImageIndex])}
            alt={pkg.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
            referrerPolicy="no-referrer"
            draggable={false}
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 w-full pointer-events-none">
        <div className="pointer-events-auto">
          <h3 className="font-poppins text-xl md:text-2xl font-bold text-white uppercase tracking-wider drop-shadow-md">
            {pkg.title.replace(/^Paket\s+/i, '')}
          </h3>
        </div>
        
        <div className="flex items-center justify-between pointer-events-auto">
          <div>
            <span className="text-[10px] md:text-xs font-poppins text-white/80 block mb-0.5 drop-shadow-sm">Mulai Dari</span>
            <span className="font-poppins text-base md:text-xl font-bold text-white drop-shadow-md">
              {formatIDR(pkg.base_price)}
              <span className="text-xs font-normal text-white/80"> / {pkg.pricing_type === 'per_pax' ? 'pax' : 'grup'}</span>
            </span>
          </div>
          <button className="text-xs md:text-sm font-semibold text-white hover:text-white/80 transition-colors drop-shadow-sm">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PaketList({ packages, onOpenDetail }: MainPackagesProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
        {packages.map((pkg) => (
          <PackageItem key={pkg.id} pkg={pkg} onOpenDetail={onOpenDetail} />
        ))}
      </div>
    </div>
  );
}
