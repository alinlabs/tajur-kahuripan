import React from "react";
import { Accommodation as AccommodationType } from "../../../types";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDriveResponsiveProps } from "../../../utils/imageUtils";

interface AccommodationProps {
  accommodations: AccommodationType[];
  onOpenDetail: (acc: AccommodationType) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 25 } }
};

const INITIAL_IMAGES = [
  "https://drive.google.com/thumbnail?id=1hhFKSmRNzfoJFcTRGxN1pbv5dFlGckoJ&sz=w250",
  "https://drive.google.com/thumbnail?id=1hqvK2nKE7AFRO4gbkwNcZqRiM49pwJdQ&sz=w250",
  "https://drive.google.com/thumbnail?id=1-r4dl8cb5kyZxZj1-BgpK-6GTXGIrax1&sz=w250",
  "https://drive.google.com/thumbnail?id=1diVDyIMTgU6319_OXplfHpiERky24SLG&sz=w250",
  "https://drive.google.com/thumbnail?id=1yEZvAjNmxxlm-nnjweYze2a9a5VpULQf&sz=w250",
  "https://drive.google.com/thumbnail?id=1jEFlx4P84md6tw9KCVV0v9AZ8oF5lIU5&sz=w250",
  "https://drive.google.com/thumbnail?id=1dsjvS3hSAkowxpHppw-67J6qAeor779_&sz=w250",
  "https://drive.google.com/thumbnail?id=1qqwFW3AXkGeYTUIsOmMVC_S8cg4Z_e_i&sz=w250",
  "https://drive.google.com/thumbnail?id=1Lej8CjS6TWAmItN5Zz9Qrc9Qi08l1f9q&sz=w250",
  "https://drive.google.com/thumbnail?id=1x8o07CUR5TvP8u7LKSKoYMDAFCfCQinQ&sz=w250"
];

export default function Accommodation({ accommodations, onOpenDetail }: AccommodationProps) {
  const homestay = accommodations.find(a => a.id === "homestay");
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [slideImages, setSlideImages] = React.useState<string[]>([]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Shuffle images on mount
    const shuffled = [...INITIAL_IMAGES];
    setSlideImages(shuffled);
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = scrollContainerRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== activeSlide) {
      setActiveSlide(newIndex);
    }
  };

  const handleIndicatorClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setActiveSlide(index);
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    onOpenDetail(homestay!);
  };

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  if (!homestay) return null;

  return (
    <motion.div 
      className="w-full"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-white/60 backdrop-blur-xl shadow-md md:shadow-lg md:shadow-stone-200/50 transition-all duration-300 border border-stone-200/60 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="aspect-[4/3] md:aspect-[21/9] relative overflow-hidden">
          {/* Images Sliding Container with Smooth Swipe Gestures (Native Scroll Snap) */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory overscroll-x-contain scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {slideImages.map((img, idx) => (
              <img loading="lazy" decoding="async"
                key={idx}
                {...getDriveResponsiveProps(img)}
                alt={`${homestay.title} - ${idx + 1}`}
                className="w-full min-w-full h-full object-cover shrink-0 snap-center snap-always pointer-events-none"
                referrerPolicy="no-referrer"
                draggable={false}
              />
            ))}
          </div>

          {/* Soft top-down gradient for indicators readability & atmosphere */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

          {/* Rich bottom-up gradient for bottom text readability */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-stone-950/95 via-stone-900/40 to-transparent pointer-events-none" />

          {/* Text & Action content overlay */}
          <div className="absolute bottom-5 md:bottom-10 left-5 md:left-10 right-5 md:right-10 flex flex-row items-end justify-between z-10 pointer-events-none">
            <div className="max-w-xl text-left">
              <h3 className="font-poppins text-base min-[375px]:text-lg md:text-4xl text-white font-bold mb-1.5 md:mb-2 truncate">{homestay.title}</h3>
              <div className="pointer-events-auto">
                <span className="font-poppins text-lg md:text-2xl font-bold text-white block">
                  {formatIDR(homestay.base_price)} <span className="text-xs md:text-sm font-sans text-stone-200 font-normal">/ malam</span>
                </span>
              </div>
            </div>
            
            {/* Indicators at Bottom Right */}
            <div className="flex gap-1 bg-black/20 px-1.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10 pointer-events-auto mb-1">
              {slideImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleIndicatorClick(e, idx)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeSlide === idx ? "bg-white w-3" : "bg-white/30 hover:bg-white/70 w-1"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

