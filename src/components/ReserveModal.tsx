import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";
import retreatArchImg from "@/assets/retreat-courtyard.jpg";
import { stopLenis, startLenis } from "./panchamrut/useCinematicScroll";

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReserveModal({ isOpen, onClose }: ReserveModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bookingDate: "",
    timeSlot: "Lunch (12:30 PM - 03:30 PM)",
    guests: "2 Guests",
    tablePreference: "Courtyard Heritage Table",
    specialRequests: "",
  });

  // Handle ESC key press and freeze background website scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      stopLenis();
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      startLenis();
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Dark Blur Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-md transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-5xl bg-[#FAF8F5] text-[#2D241E] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 border border-[#E8E2D5] max-h-[92vh] flex flex-col lg:flex-row animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Reservation Modal"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-[#5C3616] transition-all hover:scale-110 shadow-md cursor-pointer border border-[#E5DEC9]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Aesthetic Atmospheric Image & Editorial Text */}
        <div className="relative hidden lg:block lg:w-5/12 shrink-0 select-none">
          <img
            src={retreatArchImg}
            alt="Panchamrut Sanctuary Arch Courtyard"
            className="w-full h-full object-cover min-h-[580px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top Left Tag */}
          <div className="absolute top-8 left-8 text-[10px] tracking-[0.25em] text-ivory/90 uppercase font-medium">
            <span className="block">REST</span>
            <span className="block">RECONNECT</span>
            <span className="block">REJUVENATE</span>
            <span className="block w-6 h-px bg-ivory/60 mt-2" />
          </div>

          {/* Bottom Left Copy */}
          <div className="absolute bottom-8 left-8 right-8 text-ivory">
            <p className="font-display text-2xl font-light italic leading-snug">
              &ldquo;A more meaningful culinary & wellness stay awaits.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ivory/75">
              <span>NATURE</span>
              <span>•</span>
              <span>PEOPLE</span>
              <span>•</span>
              <span>POSSIBILITIES</span>
            </div>
          </div>
        </div>

        {/* Right Side: Table / Retreat Booking Form */}
        <div className="w-full lg:w-7/12 p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[90vh] custom-thin-scrollbar overscroll-contain">
          {/* Header Typography matching reference */}
          <div className="mb-6">

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] leading-[1.05] text-[#2D241E] font-normal">
              Reserve <br />
              <span className="italic font-serif font-light text-[#895220]">Your Retreat</span>
            </h2>

          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#895220] text-gold flex items-center justify-center shadow-lg">
                <CheckCircle className="w-7 h-7 text-[#EFDB6F]" />
              </div>
              <h3 className="font-display text-2xl text-[#895220]">Reservation Requested</h3>
              <p className="text-xs sm:text-sm text-[#5C5245] max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="font-medium">{formData.fullName || "Guest"}</strong>. We have saved your reservation for <strong>{formData.guests}</strong> on <strong>{formData.bookingDate || "selected date"}</strong>. Our concierge will confirm your booking via phone/email shortly.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="rounded-none bg-[#3E4738] hover:bg-[#2C3427] text-white px-8 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5 text-xs sm:text-sm">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-serif text-[#443B33] font-medium">
                  Full Name <span className="text-[#C86432]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-[#F2EDE4] border border-[#E0D7C8] rounded-md px-3.5 py-2.5 text-[#2D241E] placeholder-[#9E9486] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-serif text-[#443B33] font-medium">
                    Email Address <span className="text-[#C86432]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F2EDE4] border border-[#E0D7C8] rounded-md px-3.5 py-2.5 text-[#2D241E] placeholder-[#9E9486] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-serif text-[#443B33] font-medium">
                    Phone Number <span className="text-[#C86432]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F2EDE4] border border-[#E0D7C8] rounded-md px-3.5 py-2.5 text-[#2D241E] placeholder-[#9E9486] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all"
                  />
                </div>
              </div>

              {/* Booking Date & Preferred Time */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-serif text-[#443B33] font-medium">
                    Reservation Date <span className="text-[#C86432]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={formData.bookingDate}
                      onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                      className="w-full bg-[#F2EDE4] border border-[#E0D7C8] rounded-md px-3.5 py-2.5 text-[#2D241E] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-serif text-[#443B33] font-medium">
                    Dining / Session Slot <span className="text-[#C86432]">*</span>
                  </label>
                  <select
                    required
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full bg-[#F2EDE4] border border-[#E0D7C8] rounded-md px-3.5 py-2.5 text-[#2D241E] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all cursor-pointer"
                  >
                    <option value="Morning Tiffin (08:00 AM - 11:30 AM)">Morning Tiffin (08:00 AM - 11:30 AM)</option>
                    <option value="Lunch (12:30 PM - 03:30 PM)">Lunch (12:30 PM - 03:30 PM)</option>
                    <option value="Evening Filter Coffee & Snacks (04:30 PM - 06:30 PM)">Evening Filter Coffee (04:30 PM - 06:30 PM)</option>
                    <option value="Dinner Feast (07:30 PM - 10:30 PM)">Dinner Feast (07:30 PM - 10:30 PM)</option>
                    <option value="Full Day Wellness & Dining Stay">Full Day Wellness & Dining Stay</option>
                  </select>
                </div>
              </div>

              {/* Number of Guests & Table Preference */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-serif text-[#443B33] font-medium">
                    Number of Guests <span className="text-[#C86432]">*</span>
                  </label>
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#F2EDE4] border border-[#E0D7C8] rounded-md px-3.5 py-2.5 text-[#2D241E] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all cursor-pointer"
                  >
                    <option value="1 Guest (Solo Table)">1 Guest (Solo Table)</option>
                    <option value="2 Guests (Intimate Dining)">2 Guests (Intimate Dining)</option>
                    <option value="3 to 4 Guests (Family Table)">3 to 4 Guests (Family Table)</option>
                    <option value="5 to 8 Guests (Traditional Group Feast)">5 to 8 Guests (Traditional Group Feast)</option>
                    <option value="8+ Guests (Private Dining Hall)">8+ Guests (Private Dining Hall)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-serif text-[#443B33] font-medium">
                    Table / Room Preference <span className="text-[#C86432]">*</span>
                  </label>
                  <select
                    required
                    value={formData.tablePreference}
                    onChange={(e) => setFormData({ ...formData, tablePreference: e.target.value })}
                    className="w-full bg-[#F2EDE4] border border-[#E0D7C8] rounded-md px-3.5 py-2.5 text-[#2D241E] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all cursor-pointer"
                  >
                    <option value="Courtyard Heritage Table">Courtyard Heritage Table</option>
                    <option value="Traditional Banana Leaf Hall">Traditional Banana Leaf Hall</option>
                    <option value="Quiet Alcove / Private Lounge">Quiet Alcove / Private Lounge</option>
                    <option value="Ayurvedic Wellness Dining Retreat">Ayurvedic Wellness Dining Retreat</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-serif text-[#443B33] font-medium">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Let us know if you have dietary preferences, celebration notes, or accessibility needs..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-[#F2EDE4] border border-[#E0D7C8] rounded-md px-3.5 py-2 text-[#2D241E] placeholder-[#9E9486] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all leading-relaxed resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 rounded-none bg-[#3E4738] hover:bg-[#2C3427] text-white py-3.5 px-6 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>REQUEST RESERVATION</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReserveModal;
