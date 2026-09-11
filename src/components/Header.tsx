import { useState } from "react";
import logo from "@/assets/logo.png";
import { ReserveModal } from "./ReserveModal";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  return (
    <>
      <header className="relative w-full z-40 bg-[#895220]/65 backdrop-blur-[4px] py-2 sm:py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <a href="/" className="flex items-center gap-3 group select-none">
            <img
              src={logo}
              alt="Panchamrut Logo"
              className="h-12 w-32 sm:h-16 sm:w-40 object-contain transition-transform duration-1000 group-hover:scale-103"
            />
          </a>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            <a
              href="/stories"
              className="text-[10px] sm:text-[13px] uppercase hover:text-gold tracking-[0.18em] transition-colors duration-300 font-medium"
            >
              Stories
            </a>
            <a
              href="/menu"
              className="text-[10px] sm:text-[13px] uppercase hover:text-gold tracking-[0.18em] transition-colors duration-300 font-medium"
            >
              Menu
            </a>
            <a
              href="/contact"
              className="text-[10px] sm:text-[13px] uppercase hover:text-gold tracking-[0.18em] transition-colors duration-300 font-medium"
            >
              Contact Us
            </a>
          </nav>

          {/* Right: Reserve Retreat Anchor Button */}
          <div className="hidden sm:flex items-center">
            <a
              href="#reserve"
              onClick={(e) => {
                e.preventDefault();
                setIsReserveModalOpen(true);
              }}
              className="border border-[#EFDB6F] text-[#EFDB6F] hover:bg-gold hover:text-[#5C3616] px-5 py-2 sm:px-6 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-[2px] cursor-pointer inline-block"
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

        {/* Mobile Dropdown Menu (Floating Overlay) */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full md:hidden bg-[#5C3616] border-t border-gold/15 px-6 py-5 flex flex-col gap-4 shadow-xl animate-fadeIn z-50">
            <a
              href="/stories"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-[0.18em] text-ivory/90 hover:text-gold transition-colors py-1"
            >
              Stories
            </a>
            <a
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-[0.18em] text-ivory/90 hover:text-gold transition-colors py-1"
            >
              Menu
            </a>
            <a
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase tracking-[0.18em] text-ivory/90 hover:text-gold transition-colors py-1"
            >
              Contact Us
            </a>
            <div className="pt-2">
              <a
                href="#reserve"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  setIsReserveModalOpen(true);
                }}
                className="inline-block w-full text-center border border-gold text-gold hover:bg-gold hover:text-[#5C3616] py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-all rounded-[2px] cursor-pointer"
              >
                Reserve Retreat
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Reservation Popup Dialog */}
      <ReserveModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </>
  );
}

export default Header;
