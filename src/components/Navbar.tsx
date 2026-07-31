import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeroTextVisible, setIsHeroTextVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleHeroTextVisibility = (e: any) => {
      setIsHeroTextVisible(e.detail);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("heroTextVisibilityChange", handleHeroTextVisibility);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("heroTextVisibilityChange", handleHeroTextVisibility);
    };
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Eksplorasi", href: "/eksplorasi" },
    { name: "Pemesanan", href: "/rencana" },
  ];

  const isHome = location.pathname === '/';
  const isRencana = location.pathname === '/rencana' || location.pathname === '/pemesanan';
  
  // Keep logo visible on mobile at all times
  const hideLogoOnMobile = false;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
          isScrolled || !isHome
            ? "bg-white py-4 shadow-sm border-stone-200 rounded-b-2xl md:rounded-none"
            : "bg-transparent py-6 border-transparent rounded-b-none"
        }`}
        id="main-navigation"
      >
        {/* Gradient for Home Top - Fade in/out smoothly */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-black/60 to-transparent transition-opacity duration-500 pointer-events-none ${
            !isHome || isScrolled ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        <div className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500`}>
          {/* Logo Brand / Back Button */}
          {isRencana ? (
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group transition-all hover:opacity-85 cursor-pointer"
              title="Kembali ke Beranda"
            >
              <div className="p-2 rounded-xl bg-stone-100 group-hover:bg-luxury-green-dark group-hover:text-white text-stone-700 transition-colors border border-stone-200/80 shrink-0">
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col py-0.5">
                <span className="font-serif font-bold text-sm sm:text-base text-luxury-green-dark leading-tight">
                  Pemesanan
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans text-stone-500 font-medium leading-none">
                  Tajur Kahuripan
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/" className={`flex items-center gap-2.5 group transition-opacity duration-500 ${hideLogoOnMobile ? 'opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto' : 'opacity-100'}`}>
              <img 
                src={isScrolled || !isHome ? "/gambar/logo-color.png" : "/gambar/logo-white.png"} 
                alt="Logo Tajur Kahuripan" 
                className="h-9 md:h-12 w-auto object-contain"
                referrerPolicy="no-referrer" 
              />
            </Link>
          )}

          {/* Mobile Maps Button */}
          <div className="lg:hidden flex items-center">
            <a 
              href="https://maps.app.goo.gl/orr5CWUWhpNLknKQ8"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-mono tracking-wider font-bold uppercase transition-colors duration-300 ${
                isScrolled || !isHome
                  ? "text-[#8DB754] hover:text-luxury-green-dark"
                  : "text-white hover:text-luxury-gold"
              }`}
            >
              Kunjungi
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-mono uppercase text-xs tracking-wider transition-colors duration-300 ${
                  location.pathname === link.href 
                    ? (isScrolled || !isHome ? 'text-luxury-green-dark font-bold' : 'text-luxury-gold font-bold')
                    : (isScrolled || !isHome ? 'text-luxury-charcoal/70 hover:text-luxury-green-dark' : 'text-white/80 hover:text-luxury-gold')
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="https://maps.app.goo.gl/orr5CWUWhpNLknKQ8"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-mono uppercase tracking-widest text-xs font-bold transition-colors duration-300 cursor-pointer inline-block ${
                isScrolled || !isHome 
                  ? 'text-[#8DB754] hover:text-luxury-green-dark' 
                  : 'text-white hover:text-luxury-gold'
              }`}
              id="cta-book-now-desktop"
            >
              Kunjungi
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu (Removed toggle, but keeping state in case it's triggered elsewhere, though it's not) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-luxury-green-dark/98 backdrop-blur-lg flex flex-col justify-center items-center p-8 lg:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`hover:text-luxury-gold font-serif text-2xl tracking-wide transition-colors duration-300 ${location.pathname === link.href ? 'text-luxury-gold' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="mt-6 px-8 py-3 rounded-full bg-luxury-gold text-luxury-green-dark hover:bg-luxury-gold-dark font-mono uppercase tracking-widest text-xs transition-all duration-300"
                id="cta-book-now-mobile"
              >
                Reservasi Sekarang
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
