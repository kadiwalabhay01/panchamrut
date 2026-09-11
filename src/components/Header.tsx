import { useState } from "react";
import logo from "@/assets/logo.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // <header className="relative w-full z-40 bg-[#895220] border-b border-gold/10 py-3.5 sm:py-4">
    <header className="absolute top-0 left-0 z-40 w-full bg-[#895220]/65 backdrop-blur-[4px] py-2 sm:py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a href="./" className="flex items-center gap-3 group select-none">
          <img
            src={logo}
            alt="Panchamrut Logo"
            className="h-12 w-32 sm:h-16 sm:w-40 object-contain transition-transform duration-1000 group-hover:scale-103"
          />
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <a
            href="#culture"
            className="text-[10px] sm:text-[13px] uppercase tracking-[0.18em] transition-colors duration-300 font-medium"
          >
            Blogs
          </a>
          <a
            href="#visit"
            className="text-[10px] sm:text-[13px] uppercase tracking-[0.18em] transition-colors duration-300 font-medium"
          >
            Contact Us
          </a>
        </nav>

        {/* Right: Reserve Retreat Button */}
        <div className="hidden sm:flex items-center">
          <a
            href="#visit"
            className="border border-[#EFDB6F] text-[#EFDB6F] hover:bg-gold hover:text-[#0b2419] px-5 py-2 sm:px-6 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-[2px] cursor-pointer"
          >
            Reserve Retreat
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 text-gold focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gold transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gold transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gold transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#895220]/65 border-t border-gold/15 px-6 py-5 flex flex-col gap-4 shadow-xl animate-fadeIn">
          <a
            href="#culture"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.18em] text-ivory/90 hover:text-gold transition-colors py-1"
          >
            Blogs
          </a>
          <a
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-[0.18em] text-ivory/90 hover:text-gold transition-colors py-1"
          >
            Contact Us
          </a>
          <div className="pt-2">
            <a
              href="#visit"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block w-full text-center border border-gold text-gold hover:bg-gold hover:text-[#0b2419] py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-[2px]"
            >
              Reserve Retreat
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
