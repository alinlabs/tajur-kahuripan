import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isRencana = location.pathname === "/rencana" || location.pathname === "/pemesanan";

  return (
    <footer className={`${isRencana ? "hidden md:block" : ""} bg-luxury-charcoal text-white/70 pt-12 pb-32 md:pt-16 md:pb-16 border-t border-luxury-gold/10 relative overflow-hidden`}>
      
      {/* Absolute Decorative Blur Pattern */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-luxury-gold/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Footer Content */}
        <div className="pb-10 border-b border-white/5">
          
          {/* Brand & Info Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img loading="lazy" decoding="async"
                  src="/gambar/logo-white.png"
                  alt="Logo Tajur Kahuripan"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <span className="font-serif text-lg font-bold text-white tracking-wide block leading-none">
                  Tajur Kahuripan
                </span>
                <span className="text-[9px] font-mono tracking-widest text-luxury-gold uppercase block mt-1">
                  Kampung Wisata Budaya
                </span>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed font-light max-w-sm md:mx-0 mx-auto">
              Ekowisata dan cagar budaya Sunda di mana keindahan alam menyatu harmonis dengan kelestarian tradisi lokal.
            </p>

            {/* Social & Contact Media Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
              <a 
                href="https://www.instagram.com/desawisatakampungtajur/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#8DB754]/20 hover:border-[#8DB754] hover:scale-105 transition-all duration-300"
                title="Instagram @desawisatakampungtajur"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@kampung_tajur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#8DB754]/20 hover:border-[#8DB754] hover:scale-105 transition-all duration-300"
                title="TikTok @kampung_tajur"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.72-.01 2.92 0 5.84-.02 8.75-.04 1.17-.45 2.35-1.21 3.26-.77.94-1.89 1.54-3.09 1.73-1.51.26-3.14-.07-4.42-.9-.15-.1-.28-.21-.41-.32-1.3-1.09-2.03-2.71-2.07-4.41-.04-1.61.59-3.26 1.74-4.38 1.14-1.13 2.76-1.72 4.36-1.63.14.01.27.03.4.05v4.13c-.87-.36-1.9-.22-2.6.4-.64.55-.91 1.43-.76 2.24.12.78.75 1.45 1.53 1.61.85.18 1.81-.14 2.29-.89.2-.31.28-.68.29-1.04-.01-4.07-.02-8.14-.02-12.21z"/>
                </svg>
              </a>
              <a 
                href="https://maps.app.goo.gl/orr5CWUWhpNLknKQ8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#8DB754]/20 hover:border-[#8DB754] hover:scale-105 transition-all duration-300"
                title="Lokasi Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a 
                href="https://wa.me/6281383172489" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#8DB754]/20 hover:border-[#8DB754] hover:scale-105 transition-all duration-300"
                title="WhatsApp Hubungi Kami"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.453L0 24zm6.59-4.846c1.6.95 3.141 1.451 4.797 1.452 5.403 0 9.8-4.382 9.802-9.764.002-2.607-1.012-5.059-2.859-6.908C16.48 2.086 14.033.85 11.428.85 6.027.85 1.63 5.232 1.627 10.614c-.001 1.701.453 3.36 1.31 4.814l-.99 3.616 3.71-.973zm11.233-7.592c-.3-.15-1.771-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.174-.176.2-.351.224-.652.074-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.628-.926-2.226-.243-.582-.49-.5-.677-.51-.175-.008-.376-.01-.576-.01-.2 0-.526.075-.802.375-.276.3-1.052 1.025-1.052 2.5 0 1.475 1.077 2.9 1.227 3.1.15.2 2.118 3.235 5.132 4.537.717.31 1.277.494 1.713.633.72.23 1.375.197 1.892.12.576-.087 1.771-.725 2.021-1.425.25-.7.25-1.3 1.175-1.425.075-.013.15-.075.075-.225z"/>
                </svg>
              </a>
              <a 
                href="mailto:info@kampungtajurkahuripan.com" 
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#8DB754]/20 hover:border-[#8DB754] hover:scale-105 transition-all duration-300"
                title="Email info@kampungtajurkahuripan.com"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="tel:+6281383172489" 
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#8DB754]/20 hover:border-[#8DB754] hover:scale-105 transition-all duration-300"
                title="Telepon +62 813-8317-2489"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Jam Operasional & Check-In */}
            <p className="text-xs text-white/50 leading-relaxed font-light md:mx-0 mx-auto pt-1">
              Jam Operasional: <span className="text-white/70 font-medium">Buka Setiap Hari (24 Jam)</span> &bull; Waktu Check-In Homestay: <span className="text-white/70 font-medium">14:00 WIB</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/35 font-light">
          <p>© 2026 KPPM STIE WIKARA Desa Pasanggrahan.</p>
          <p className="font-mono tracking-wider">Hatur Nuhun, Sampurasun!</p>
        </div>

      </div>
    </footer>
  );
}

