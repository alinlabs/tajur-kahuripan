import React from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from "motion/react";
import { MapPin, ExternalLink } from "lucide-react";

const customIcon = new L.Icon({
    iconUrl: '/gambar/point_maps.png',
    iconSize: [56, 72],
    iconAnchor: [28, 72],
    popupAnchor: [0, -72]
});

export default function SectionMaps() {
  const position: [number, number] = [-6.7275418, 107.5299915];

  return (
    <section className="py-8 md:py-12 bg-[#FAFAF9] border-t border-stone-200 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="text-center mb-4 md:mb-6 px-6 md:px-0">
          <h2 className="font-serif text-2xl md:text-5xl text-luxury-green-dark mb-0.5 md:mb-1 font-bold">Lokasi Kami</h2>
          <p className="text-stone-500 max-w-md md:max-w-2xl mx-auto font-poppins text-xs min-[400px]:text-sm md:text-lg leading-relaxed line-clamp-1 px-4 md:px-0">
            Temukan ketenangan di Kampung Wisata Tajur Kahuripan yang asri dan damai.
          </p>
        </div>

        {/* Map Leaflet with 4:3 aspect ratio on mobile, 3:1 on desktop */}
        <div className="flex justify-center">
          <motion.a 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href="https://maps.app.goo.gl/orr5CWUWhpNLknKQ8"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full aspect-[4/3] md:aspect-[3/1] rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-stone-200 group block transition-all duration-300"
          >
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>
            
            {/* Interactive Floating Badge */}
            <div className="absolute bottom-4 right-4 z-30 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-stone-200 flex items-center gap-2 text-stone-800 text-xs font-poppins group-hover:bg-luxury-green-dark group-hover:text-white transition-all duration-300">
              <MapPin className="w-3.5 h-3.5 text-[#C5A859]" />
              <span className="font-medium">Buka Petunjuk Arah</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </div>

            <div className="absolute inset-0 pointer-events-none z-10">
              <MapContainer 
                center={position} 
                zoom={15} 
                scrollWheelZoom={false} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                attributionControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <Marker position={position} icon={customIcon} />
              </MapContainer>
            </div>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
