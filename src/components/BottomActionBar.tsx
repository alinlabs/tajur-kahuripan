import React, { useState, useEffect } from "react";
import { Compass, Home, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BottomActionBarProps {
  onOpenPlanner: () => void;
}

export default function BottomActionBar({ onOpenPlanner }: BottomActionBarProps) {
  const location = useLocation();

  const isRencana = location.pathname === "/rencana" || location.pathname === "/pemesanan";
  if (isRencana) return null;

  const navItems = [
    { id: "/eksplorasi", name: "Eksplorasi", icon: <Compass className="w-5 h-5" /> },
    { id: "/", name: "Beranda", icon: <Home className="w-5 h-5" /> },
    { id: "/rencana", name: "Pemesanan", icon: <Calendar className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-stone-200 pb-safe">
      <div className="flex justify-around items-center px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.id;
          const isBeranda = item.id === "/";
          
          return (
          <Link
            key={item.id}
            to={item.id}
            className={`relative flex flex-col items-center justify-end w-16 h-14 transition-colors ${
              isActive 
                ? "text-luxury-green-dark" 
                : "text-luxury-charcoal/40 hover:text-luxury-green-dark/70"
            }`}
          >
            <div
              className={`absolute transition-all duration-300 flex items-center justify-center ${
                isBeranda
                  ? `-top-6 w-12 h-12 rounded-full border-[3.5px] border-white bg-luxury-green-dark text-white shadow-[0_4px_10px_rgba(31,63,35,0.3)]`
                  : `top-2 bg-transparent text-current w-auto h-auto ${isActive ? "text-luxury-green-dark" : ""}`
              }`}
            >
              {item.icon}
            </div>
            <span 
              className={`absolute bottom-1 text-[10px] font-medium tracking-wide transition-all duration-300 ${
                isActive ? "font-bold" : ""
              }`}
            >
              {item.name}
            </span>
          </Link>
          );
        })}
      </div>
    </div>
  );
}
