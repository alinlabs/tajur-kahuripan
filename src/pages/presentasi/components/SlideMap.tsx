import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

// Use the exact custom icon from Home maps
const customIcon = new L.Icon({
  iconUrl: "/gambar/point_maps.png",
  iconSize: [48, 62],
  iconAnchor: [24, 62],
  popupAnchor: [0, -62],
});

export const SlideMap: React.FC = () => {
  const position: [number, number] = [-6.7275418, 107.5299915];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-stone-100 shadow-lg p-1.5 h-full min-h-[350px] w-full group">
      {/* Real Interactive Leaflet Map */}
      <div className="w-full h-full rounded-xl overflow-hidden relative z-10">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
          <Marker position={position} icon={customIcon} />
        </MapContainer>
      </div>

      {/* Floating Sparkles Badge to indicate it's interative */}
      <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 rounded-lg shadow-md text-[9px] font-mono flex items-center gap-1 z-20 pointer-events-none">
        <Sparkles className="w-3 h-3 text-[#8DB754] animate-pulse" />
        <span>MAPS AKTIF (BISA DIGESER)</span>
      </div>

      {/* Status Indicator overlay */}
      <div className="absolute bottom-3 left-3 bg-white/95 px-2.5 py-1 rounded-lg shadow-md text-[9px] font-mono flex items-center gap-1.5 z-20 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>TITIK GERBANG DESA TERDAFTAR</span>
      </div>
    </div>
  );
};
