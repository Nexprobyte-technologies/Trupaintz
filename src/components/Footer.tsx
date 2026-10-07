import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND_INFO, SERVICES_DATA } from '../data/mockData';
import { 
  Instagram, 
  ArrowUpRight, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowUp,
  Sparkles,
  ChevronRight,
  Clock,
  Compass,
  MessageCircle,
  Award,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [catalogEmail, setCatalogEmail] = useState('');
  const [catalogSent, setCatalogSent] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCatalogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catalogEmail.trim()) return;
    setCatalogSent(true);
    setTimeout(() => {
      setCatalogEmail('');
      setCatalogSent(false);
    }, 4000);
  };

  return (
    <footer className="relative border-t border-amber-900/15 bg-gradient-to-b from-[#F5F0E6] via-[#FAF7F2] to-[#EFE9DD] text-neutral-800 overflow-hidden">
      
      {/* 1. Architectural Gold Marquee Ticker */}
      <div className="border-b border-amber-900/10 bg-amber-500/10 py-3 overflow-hidden">
        <div className="flex w-max animate-marquee space-x-8 text-xs font-semibold uppercase tracking-widest text-amber-900">
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            Artisanal Italian Finishes
          </span>
          <span className="text-amber-500">✦</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
            10-Year Adhesion Warranty
          </span>
          <span className="text-amber-500">✦</span>
          <span className="flex items-center gap-2">
            <Award className="h-3.5 w-3.5 text-amber-600" />
            0% Dust Mechanized HEPA Sanding
          </span>
          <span className="text-amber-500">✦</span>
          <span className="flex items-center gap-2">
            <Compass className="h-3.5 w-3.5 text-amber-600" />
            Turnkey Architectural Precision
          </span>
          <span className="text-amber-500">✦</span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            450+ Living Spaces Crafted
          </span>
          <span className="text-amber-500">✦</span>
          <span className="flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-amber-600" />
            Bengaluru &amp; Chennai Regional Coverage
          </span>
          <span className="text-amber-500">✦</span>
          
          {/* Duplicate set for seamless continuous marquee loop */}
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            Artisanal Italian Finishes
          </span>
          <span className="text-amber-500">✦</span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
            10-Year Adhesion Warranty
          </span>
          <span className="text-amber-500">✦</span>
          <span className="flex items-center gap-2">
            <Award className="h-3.5 w-3.5 text-amber-600" />
            0% Dust Mechanized HEPA Sanding
          </span>
          <span className="text-amber-500">✦</span>
          <span className="flex items-center gap-2">
            <Compass className="h-3.5 w-3.5 text-amber-600" />
            Turnkey Architectural Precision
          </span>
        </div>
      </div>

      {/* 2. Top Interactive Consultation & Lookbook Banner */}
      <div className="mx-auto max-w-screen-2xl w-full px-4 pt-12 pb-8 sm:px-6 lg:px-10 xl:px-12">
        <div className="relative rounded-3xl border border-amber-900/15 bg-white/90 backdrop-blur-md p-6 sm:p-10 shadow-lg shadow-amber-900/5 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Complimentary Design Swatch Box</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
              Experience Authentic Italian Finishes in Your Home
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Receive our curated 2026 Material Catalog or request physical Venetian stucco sample swatches for your site consultation.
            </p>
          </div>

          <div className="w-full lg:w-auto shrink-0">
            {catalogSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-xs font-semibold shadow-xs">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Catalog requested! Our concierge will email you the digital catalog promptly.</span>
              </div>
            ) : (
              <form onSubmit={handleCatalogSubmit} className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email for 2026 Catalog"
                  value={catalogEmail}
                  onChange={(e) => setCatalogEmail(e.target.value)}
                  className="w-full sm:w-80 rounded-xl border border-neutral-300 bg-neutral-50/80 px-4 py-3 text-xs text-neutral-900 focus:border-amber-600 focus:bg-white focus:outline-none shadow-xs"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-premium rounded-xl bg-amber-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-amber-500 transition-all shrink-0"
                >
                  Request Catalog
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* 3. Main Footer Columns */}
      <div className="mx-auto max-w-screen-2xl w-full px-4 py-10 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-amber-900/15">
          
          {/* Column 1: Brand Atelier Identity */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="group inline-flex items-center gap-3">
              {/* Gold "TP" Badge */}
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white font-serif font-bold text-lg shadow-md ring-2 ring-amber-400/40 transition-transform duration-300 group-hover:scale-105">
                TP
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-tight text-neutral-950 group-hover:text-amber-700 transition-colors">
                  TruPaintz &amp; Interiors
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold">
                  Artisanal Architecture &amp; Finishes
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-neutral-600 max-w-sm">
              South India's premier studio for hand-troweled Italian stuccos, dustless mechanized painting, bespoke modular joinery, and complete turnkey interior architecture.
            </p>

            {/* Live Studio Status Beacon */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-amber-900/10 shadow-xs text-xs text-neutral-700 w-fit">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-neutral-900">Experience Centre Open:</span>
              <span className="text-neutral-500">Mon – Sat (9AM – 8PM)</span>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-800 hover:border-amber-500 hover:text-amber-800 transition-all shadow-xs group"
              >
                <Instagram className="h-4 w-4 text-pink-600 group-hover:scale-110 transition-transform" />
                <span>{BRAND_INFO.instagramHandle}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-amber-600" />
              </a>
            </div>
          </div>

          {/* Column 2: All 10 Signature Interior Solutions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-amber-900/10 pb-2 flex items-center justify-between">
              <span>Our 10 Services</span>
              <span className="text-[10px] text-amber-700 font-sans font-semibold">Complete Solutions</span>
            </h4>
            <ul className="grid grid-cols-1 gap-1.5 text-xs">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <Link
                    to="/services"
                    className="group flex items-center justify-between py-1 text-neutral-600 hover:text-amber-800 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-amber-600/80">
                        {srv.num}
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {srv.title}
                      </span>
                    </span>
                    <ChevronRight className="h-3 w-3 text-neutral-300 group-hover:text-amber-600 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Dynamic Studio Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-amber-900/10 pb-2">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <Link to="/" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600">·</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600">·</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600">·</span>
                  <span>Realized Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600">·</span>
                  <span>Design Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/visualizer" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600">·</span>
                  <span>3D Material Studio</span>
                </Link>
              </li>
              <li>
                <Link to="/estimator" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600">·</span>
                  <span>Cost Estimator</span>
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600">·</span>
                  <span>Homeowner Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-800 transition-colors flex items-center gap-1.5">
                  <span className="text-amber-600">·</span>
                  <span>Contact &amp; Swatches</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Coordinates & Concierge Actions */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-neutral-950 border-b border-amber-900/10 pb-2">
              Studio Coordinates
            </h4>
            
            <div className="space-y-3 text-xs text-neutral-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{BRAND_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-700 shrink-0" />
                <a href={`tel:${BRAND_INFO.phone}`} className="font-mono text-neutral-800 hover:text-amber-700 font-semibold transition-colors">
                  {BRAND_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-700 shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="font-mono text-neutral-800 hover:text-amber-700 font-semibold transition-colors">
                  {BRAND_INFO.email}
                </a>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 space-y-2">
              <a
                href={`https://wa.me/919845271829?text=${encodeURIComponent('Hi TruPaintz & Interiors! I would like to schedule an interior design consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500 transition-all text-center"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to="/estimator"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-amber-700/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-500/20 transition-all text-center"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-700" />
                <span>Calculate Project Cost</span>
              </Link>
            </div>
          </div>

        </div>

        {/* 4. Sub-Footer Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} TruPaintz &amp; Interiors. All rights reserved.</p>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="flex items-center gap-1.5 text-neutral-700 font-medium">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span>10-Year Adhesion &amp; Anti-Peel Warranty</span>
            </span>
          </div>

          {/* Interactive Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 hover:border-amber-500 hover:text-amber-800 hover:shadow-sm transition-all"
            aria-label="Back to Top of Page"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5 text-amber-600 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

    </footer>
  );
};
