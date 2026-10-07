import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_INFO, SERVICES_DATA } from '../data/mockData';
import { Instagram, ShieldCheck, Phone, Mail, MapPin, Sparkles, Award, Star, Globe } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
];

export const Footer: React.FC = () => (
  <footer className="relative bg-[#0C0A07] text-neutral-400 overflow-hidden">

    {/* Top gold line */}
    <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

    {/* Ambient glow */}
    <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[100px] opacity-10"
      style={{ background: 'radial-gradient(ellipse, #d97706 0%, transparent 70%)' }} />

    <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Brand */}
        <div className="md:col-span-4 space-y-5">
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 text-white font-serif font-bold text-lg shadow-lg ring-1 ring-amber-400/20 transition-transform group-hover:scale-105">
              TP
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-tight tracking-tight">
                TruPaintz &amp; Interiors
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-amber-500/70 font-semibold mt-0.5">
                Artisanal Architecture &amp; Finishes
              </p>
            </div>
          </Link>

          <p className="text-sm leading-relaxed text-neutral-500 max-w-xs">
            {BRAND_INFO.tagline} — UPVC Windows &amp; Doors, Dustless Painting, Curtains, Blinds, Wallpapers, Wooden Flooring, False Ceiling, Mosquito Nets, Louvers &amp; Artificial Grass.
          </p>

          {/* Contact */}
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-amber-600/60 shrink-0 mt-0.5" />
              <div className="text-sm text-neutral-500 leading-relaxed space-y-1">
                <div>{BRAND_INFO.address}</div>
                <div>{BRAND_INFO.address2}</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-amber-600/60 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <a href={`tel:${BRAND_INFO.phone}`} className="text-sm font-mono text-neutral-400 hover:text-amber-400 transition-colors">
                  {BRAND_INFO.phone}
                </a>
                <a href={`tel:${BRAND_INFO.phone2}`} className="text-sm font-mono text-neutral-400 hover:text-amber-400 transition-colors">
                  {BRAND_INFO.phone2}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-amber-600/60 shrink-0" />
              <a href={`mailto:${BRAND_INFO.email}`} className="text-sm font-mono text-neutral-400 hover:text-amber-400 transition-colors">
                {BRAND_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe className="h-4 w-4 text-amber-600/60 shrink-0" />
              <a href={`https://${BRAND_INFO.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-mono text-neutral-400 hover:text-amber-400 transition-colors">
                {BRAND_INFO.website}
              </a>
            </div>
          </div>

          {/* Social */}
          <a href={BRAND_INFO.instagramUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 text-sm text-neutral-500 hover:text-amber-400 hover:border-amber-500/30 transition-all">
            <Instagram className="h-4 w-4 text-pink-500" />
            {BRAND_INFO.instagramHandle}
          </a>
        </div>

        {/* Services */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-500/80">Our Services</h5>
          <ul className="grid grid-cols-2 gap-y-2 gap-x-3">
            {SERVICES_DATA.map((srv) => (
              <li key={srv.id}>
                <Link to="/services" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-400 transition-colors group">
                  <span className="font-mono text-[11px] text-amber-600/50">{srv.num}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">{srv.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="md:col-span-2 space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-500/80">Pages</h5>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-2.5">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-sm text-neutral-500 hover:text-amber-400 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio Info — replaces Connect */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-[0.18em] text-amber-500/80">Studio</h5>

          {/* Live status */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm text-neutral-400 font-medium">Open Mon–Sat · 9AM–8PM</span>
          </div>

          {/* Studio tagline */}
          <p className="text-sm leading-relaxed text-neutral-600 italic">
            "Crafting spaces where architecture meets artistry — one hand-troweled finish at a time."
          </p>

          {/* Trust badges */}
          <div className="flex flex-col gap-2 pt-1">
            <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
              <ShieldCheck className="h-4 w-4 text-amber-500/70" />
              10-Year Adhesion &amp; Anti-Peel Warranty
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
              <Star className="h-4 w-4 text-amber-500/70" />
              4.9 ★ Rated · 450+ Projects Delivered
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
              <Award className="h-4 w-4 text-amber-500/70" />
              HEPA Dustless · Zero-VOC Italian Stucco
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-neutral-500">
              <Sparkles className="h-4 w-4 text-amber-500/70" />
              Coimbatore &amp; Surrounding Areas
            </span>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center">
        <p className="text-sm text-neutral-700">
          © {new Date().getFullYear()} TruPaintz and Interiors. All rights reserved.
        </p>
      </div>
    </div>

  </footer>
);
