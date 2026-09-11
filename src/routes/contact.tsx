import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import contactInteriorImg from "@/assets/contact-interior.jpg";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Panchamrut Sanctuary" },
      {
        name: "description",
        content:
          "Connect with the Panchamrut concierge team for personalized reservations, wellness retreats, or holistic queries.",
      },
    ],
  }),
  component: ContactPage,
});

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryNature: "Wellness Retreat Reservations",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="">
      {/* Main Navigation Header */}
      <Header />
      <div className="min-h-screen bg-[#FBF9F4] text-[#895220] flex flex-col selection:bg-[#895220] selection:text-white">
        <main className="flex-1 py-10 sm:py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-12 sm:space-y-14 md:space-y-16">
            {/* ─── 1. Top Hero Section ─── */}
            <section className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Headline & Introduction */}
              <div className="lg:col-span-6 flex flex-col items-start space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#E4DCD0] bg-[#F5F1E8] text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A6B58]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C86432]" />
                  Atithi Devo Bhava
                </div>

                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[58px] leading-[1.08] text-[#895220] font-normal tracking-tight max-w-2xl">
                  Lorem ipsum dolor sit amet consectetur.
                </h1>

                <p className="text-xs sm:text-sm md:text-base leading-relaxed text-[#5C5245] max-w-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
                </p>
              </div>

              {/* Right: Sanctuary Photography (Luxury South Indian Restaurant Interior with zero people) */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[624px] aspect-[624/400] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E9E4DB] group select-none">
                  <img
                    src={contactInteriorImg}
                    alt="Luxury South Indian fine dining heritage restaurant interior"
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </section>

            {/* ─── 2. Two-Column Contact & Inquiry Cards ─── */}
            <section className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Card: The Sanctuary details (#895220 Warm Coffee Brown) */}
              <div className="lg:col-span-5 bg-[#5C3616] text-ivory rounded-2xl sm:rounded-3xl p-7 sm:p-9 shadow-xl flex flex-col justify-between space-y-8">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl text-[#FBF9F4] font-normal tracking-wide">
                    The Sanctuary details
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-ivory/80 leading-relaxed">
                    Reach our guest hospitality concierge team directly for personalized reservations or generic questions.
                  </p>

                  {/* Contact Items */}
                  <div className="mt-8 space-y-6">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/10 text-[#EFDB6F] shrink-0 mt-0.5">
                        <Phone className="w-4 h-4 text-[#EFDB6F]" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-medium">
                          Telephone
                        </span>
                        <a
                          href="tel:+919310185019"
                          className="text-xs sm:text-sm text-ivory/95 hover:text-[#EFDB6F] transition-colors font-medium mt-0.5 inline-block"
                        >
                          +91 93 1018 5019
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/10 text-[#EFDB6F] shrink-0 mt-0.5">
                        <Mail className="w-4 h-4 text-[#EFDB6F]" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-medium">
                          Electronic Mail
                        </span>
                        <a
                          href="mailto:contact@thepanchamrut.com"
                          className="text-xs sm:text-sm text-ivory/95 hover:text-[#EFDB6F] transition-colors font-medium mt-0.5 inline-block break-all"
                        >
                          contact@thepanchamrut.com
                        </a>
                      </div>
                    </div>

                    {/* Main Sanctuary Location */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/10 text-[#EFDB6F] shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4 text-[#EFDB6F]" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-medium">
                          Main Sanctuary
                        </span>
                        <p className="text-xs sm:text-sm text-ivory/95 font-medium mt-0.5 leading-relaxed">
                          Second Floor, Central 50, Sector 52, Noida, UP – 201301, India
                        </p>
                      </div>
                    </div>

                    {/* Concierge Hours */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-white/10 text-[#EFDB6F] shrink-0 mt-0.5">
                        <Clock className="w-4 h-4 text-[#EFDB6F]" />
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-medium">
                          Concierge Hours
                        </span>
                        <p className="text-xs sm:text-sm text-ivory/95 font-medium mt-0.5">
                          Daily, 08:00 AM – 08:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Social Links */}
                <div className="pt-6 border-t border-white/15">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-ivory/60 font-medium mb-3">
                    Connect with our space
                  </span>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-ivory/90">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#EFDB6F] transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://pinterest.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#EFDB6F] transition-colors"
                    >
                      Pinterest
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#EFDB6F] transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#EFDB6F] transition-colors"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Card: Begin an Inquiry (Light Form Card) */}
              <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E9E4DB] rounded-2xl sm:rounded-3xl p-7 sm:p-9 shadow-lg">
                <h2 className="font-display text-2xl sm:text-3xl text-[#895220] font-normal tracking-wide">
                  Begin an Inquiry
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#706556] leading-relaxed">
                  Share your details with our team. We will reflect on your message and respond within 24 business hours.
                </p>

                {submitted ? (
                  <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#F0EBE1] border border-[#DFD7CB] text-center space-y-3 animate-fadeIn">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#895220] text-gold flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-[#EFDB6F]" />
                    </div>
                    <h3 className="font-display text-2xl text-[#895220]">Inquiry Received</h3>
                    <p className="text-xs sm:text-sm text-[#5C5245] max-w-md mx-auto leading-relaxed">
                      Thank you, {formData.firstName || "valued guest"}. Our hospitality concierge has received your note and will reach out to you within 24 business hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          inquiryNature: "Wellness Retreat Reservations",
                          message: "",
                        });
                      }}
                      className="mt-4 inline-block text-xs uppercase tracking-[0.18em] font-semibold text-[#895220] underline hover:text-[#C86432] transition-colors"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Name Fields */}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#5A5044]">
                          First Name <span className="text-[#C86432]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Aarav"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full bg-white border border-[#E2DDD5] rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-[#895220] placeholder-[#ABA295] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#5A5044]">
                          Last Name <span className="text-[#C86432]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Sharma"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full bg-white border border-[#E2DDD5] rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-[#895220] placeholder-[#ABA295] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Phone Fields */}
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#5A5044]">
                          Email Address <span className="text-[#C86432]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g., aarav@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-[#E2DDD5] rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-[#895220] placeholder-[#ABA295] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#5A5044]">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g., +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white border border-[#E2DDD5] rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-[#895220] placeholder-[#ABA295] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all"
                        />
                      </div>
                    </div>

                    {/* Nature of Inquiry */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#5A5044]">
                        Nature of Inquiry <span className="text-[#C86432]">*</span>
                      </label>
                      <select
                        required
                        value={formData.inquiryNature}
                        onChange={(e) => setFormData({ ...formData, inquiryNature: e.target.value })}
                        className="w-full bg-white border border-[#E2DDD5] rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-[#895220] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all cursor-pointer"
                      >
                        <option value="Wellness Retreat Reservations">Wellness Retreat Reservations</option>
                        <option value="Apothecary & Holistic Remedies">Apothecary & Holistic Remedies</option>
                        <option value="Private Dining & Culinary Events">Private Dining & Culinary Events</option>
                        <option value="General Concierge Inquiry">General Concierge Inquiry</option>
                      </select>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-semibold text-[#5A5044]">
                        Your Message <span className="text-[#C86432]">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="I would love to learn more about the 7-day Ayurvedic detox program planned for next October..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-[#E2DDD5] rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-[#895220] placeholder-[#ABA295] focus:outline-none focus:border-[#895220] focus:ring-1 focus:ring-[#895220] transition-all leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md bg-[#895220] hover:bg-[#5C3616] text-white px-7 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                      >
                        Submit Inquiry
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>

            {/* ─── 3. Bottom Quote Section ─── */}
            <section className="text-center space-y-6 pt-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E4DCD0] bg-[#F5F1E8] text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A6B58]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C86432]" />
                Welcoming Your Presence
              </div>

              <blockquote className="font-display text-3xl sm:text-4xl lg:text-[42px] leading-snug text-[#895220] font-normal max-w-3xl mx-auto px-4">
                &ldquo;Quietude is the luxury of the modern soul. Let us make room for your stillness.&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.24em] text-[#8C7E6D] font-medium">
                <span className="h-px w-8 sm:w-16 bg-[#D8D0C3]" />
                Panchamrut Concierge Team
                <span className="h-px w-8 sm:w-16 bg-[#D8D0C3]" />
              </div>
            </section>
          </div>
        </main>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
