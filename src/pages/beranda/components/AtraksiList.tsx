import React, { useRef } from "react";
import { OptionalAttraction } from "../../../types";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { getDriveResponsiveProps } from "../../../utils/imageUtils";

interface AttractionsProps {
  attractions: OptionalAttraction[];
  onOpenDetail: (att: OptionalAttraction) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 25 } }
};


const ATTRACTION_SLIDE_IMAGES: Record<string, string[]> = {
  "bajak-sawah": [
    "https://drive.google.com/thumbnail?id=19Vi5gk1cRn8XwzJqFeMngcPYdDVOWQ-0&sz=w250",
    "https://drive.google.com/thumbnail?id=1v4LGzh76pMVz6sXhVD7-Q2M1W-cFJA5c&sz=w250",
    "https://drive.google.com/thumbnail?id=1ZKxr9x2LhypcNM1aC79tFAntPdQh-tsD&sz=w250",
    "https://drive.google.com/thumbnail?id=1_nUA5tX3JYBAArv5XnAoRP1nZtdj4WVV&sz=w250",
    "https://drive.google.com/thumbnail?id=1FU-HD-l-v4uWM8LHam41O-ILqM-WEdN5&sz=w250",
    "https://drive.google.com/thumbnail?id=1JQ6-lJvz2zpdedHQAIdBho06OaF3YJz2&sz=w250",
    "https://drive.google.com/thumbnail?id=1fT7-oXWfzH-iM5Dva_39gwMvHCt1ZsP2&sz=w250"
  ],
  "ngagubyag": [
    "https://drive.google.com/thumbnail?id=1qX1tSA8R_A_HsUV2EK92lNCsVikMEcW5&sz=w250",
    "https://drive.google.com/thumbnail?id=1zT8NdKHgPGJlPxyYdGW2dWXyTwrhL5fc&sz=w250",
    "https://drive.google.com/thumbnail?id=1aD9Yn4DbXRqJM9Ku7eWBV39zYICKrYF1&sz=w250",
    "https://drive.google.com/thumbnail?id=1Xw12A7UCtUQ0-DmwOQSyxcaYiL_xjfqb&sz=w250"
  ],
  "tutunggulan": [
    "https://drive.google.com/thumbnail?id=1-dA5Zzfajp1S3aOVsxC-9XUEQ1dHzQC7&sz=w250",
    "https://drive.google.com/thumbnail?id=1JKJgtMdjhEfKKXBYRcK9tEdMsMHPqEFn&sz=w250",
    "https://drive.google.com/thumbnail?id=1bqA13ZXrftb4G202vAP7Q_nWQjXtHDhY&sz=w250",
    "https://drive.google.com/thumbnail?id=18UfJkqJ_aJa8GwlJrT5rwKSwf-G4ECPd&sz=w250",
    "https://drive.google.com/thumbnail?id=1w_Xx3bBZK2PqxzhWAJjcdpBVFfFMaRrH&sz=w250",
    "https://drive.google.com/thumbnail?id=1nMs2kqii7gTrnsnWAy8YeNQiCp1oSa-g&sz=w250",
    "https://drive.google.com/thumbnail?id=1XY-8WkRYvasP6lbUid4SUXgBTlFzsyuv&sz=w250",
    "https://drive.google.com/thumbnail?id=1HRCBbYMJzn8XmYNHC99HN4pPBcQF_IqG&sz=w250",
    "https://drive.google.com/thumbnail?id=1jvfuJo3XwbRR3fh-Zqzq_lxpEcJsKZ4K&sz=w250",
    "https://drive.google.com/thumbnail?id=1VsMQ4TgBlY2TueDf9GyHPKRZkFDf6rVN&sz=w250",
    "https://drive.google.com/thumbnail?id=12wJ19V6D3IT9w_AODW1ygsUa6GufgP-K&sz=w250"
  ],
  "gula-aren": [
    "https://drive.google.com/thumbnail?id=1zEdQ-gFDEmgiC5Xp-GhXiB_MBl-VYovb&sz=w250",
    "https://drive.google.com/thumbnail?id=1KBro8QM6wfQ5CtD745PwkdCsPntmjeNM&sz=w250",
    "https://drive.google.com/thumbnail?id=1ZabG9jU3qR-o9iBR0y4-scL8zY0QMSsj&sz=w250"
  ],
  "anyaman-bambu": [
    "https://drive.google.com/thumbnail?id=1vbvCn2h7Z1JJ48remzBx_fFVm451O_XO&sz=w250",
    "https://drive.google.com/thumbnail?id=1Kk1qPvpIG6FQX1t5aqpJC2W0pmN6xFpY&sz=w250",
    "https://drive.google.com/thumbnail?id=1mlIjcg_ctZZ_O2kcpvFqDyJklATot9CK&sz=w250"
  ]
};

function MobileAttractionCard({ att, onOpenDetail }: { att: OptionalAttraction; onOpenDetail: (att: OptionalAttraction) => void; key?: string }) {
  const images = ATTRACTION_SLIDE_IMAGES[att.id] || [att.image_url];
  const coverImage = React.useMemo(() => {
    return images[0];
  }, [images]);

  return (
    <motion.div
      variants={itemVariants}
      onClick={() => onOpenDetail(att)}
      className="group cursor-pointer w-full"
    >
      <div
        className="relative overflow-hidden w-full aspect-[21/9]"
      >
        <img loading="lazy" decoding="async"
          {...getDriveResponsiveProps(coverImage)}
          alt={att.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          draggable={false}
        />

        {/* Dark overlay to ensure text is fully readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent transition-opacity duration-300 pointer-events-none" />

        {/* Text inside the image (bottom left) */}
        <div className="absolute inset-0 flex flex-col justify-end text-left text-white z-10 p-4 px-5 pointer-events-none pb-3">
          <h3 className="font-poppins font-bold text-white leading-tight drop-shadow-md text-[15px] mb-0.5">
            {att.title}
          </h3>
          <p className="text-[10px] min-[375px]:text-[11px] text-white/80 line-clamp-1 leading-normal max-w-[95%] drop-shadow-sm">
            {att.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function AttractionCard({ att, className, onOpenDetail, formatIDR }: { att: OptionalAttraction; className?: string; onOpenDetail: (att: OptionalAttraction) => void; formatIDR: (num: number) => string; key?: string }) {
  const images = ATTRACTION_SLIDE_IMAGES[att.id] || [att.image_url];
  const coverImage = React.useMemo(() => {
    return images[0];
  }, [images]);

  return (
    <motion.div
      variants={itemVariants}
      onClick={() => onOpenDetail(att)}
      className={`group relative aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg shadow-stone-200/40 cursor-pointer flex flex-col ${className || ""}`}
    >
      <motion.img
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8 }}
        src={coverImage}
        alt={att.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        referrerPolicy="no-referrer"
      />
      {/* Dark overlay to ensure text is fully readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent transition-opacity duration-300" />

      {/* Text inside the image */}
      <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-end text-left text-white z-10">
        <h3 className="font-poppins text-sm md:text-base lg:text-lg font-bold text-white leading-snug drop-shadow-md group-hover:text-luxury-gold-light transition-colors">
          {att.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function Attractions({ attractions, onOpenDetail }: AttractionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Ensure specific order for both mobile and desktop
  const orderedAttractions = React.useMemo(() => {
    const order = [
      "bajak-sawah",
      "ngagubyag",
      "tutunggulan",
      "gula-aren",
      "anyaman-bambu"
    ];
    
    return [...attractions].sort((a, b) => {
      const indexA = order.indexOf(a.id);
      const indexB = order.indexOf(b.id);
      // If an item is not in the order array, put it at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }, [attractions]);

  return (
    <div className="relative w-full">
      {/* Mobile/Tablet view (Vertical layout with 21:9 cards) */}
      <div className="md:hidden -mx-6">
        <motion.div 
          className="flex flex-col gap-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {orderedAttractions.map((att) => (
            <MobileAttractionCard 
              key={att.id} 
              att={att} 
              onOpenDetail={onOpenDetail} 
            />
          ))}
        </motion.div>
      </div>

      {/* Desktop view (5 items in 1 row with 3:4 aspect ratio) */}
      <motion.div 
        className="hidden md:grid md:grid-cols-5 gap-3 lg:gap-5 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {orderedAttractions.slice(0, 5).map((att) => (
          <AttractionCard key={att.id} att={att} className="w-full" onOpenDetail={onOpenDetail} formatIDR={formatIDR} />
        ))}
      </motion.div>
      
      {/* CSS to hide scrollbar for webkit */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </div>
  );
}
