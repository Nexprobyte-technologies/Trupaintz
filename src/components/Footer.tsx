import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_INFO } from '../data/mockData';
import { Instagram, ShieldCheck, Phone, Mail, MapPin, Award, Star } from 'lucide-react';

export const Footer: React.FC = () => (
  <footer className="relative bg-[#0C0A07] text-neutral-400 overflow-hidden">

    {/* Top gold line */}
    <div className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

    {/* Ambient glow */}
    <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[100px] opacity-10"
      style={{ background: 'radial-gradient(ellipse, #d97706 0%, transparent 70%)' }} />

    <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-9">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">

        {/* 1. Brand & Contact */}
        <div className="md:col-span-5 lg:col-span-4 space-y-4">
          <Link to="/" className="group inline-flex items-center gap-3">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white shadow-md p-1.5 shrink-0 transition-transform group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="TruPaintz & Interiors" 
                className="h-full w-full object-contain" 
              />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-tight tracking-tight">
                TruPaintz &amp; Interiors
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/80 font-semibold mt-0.5">
                Artisanal Architecture &amp; Finishes
              </p>
            </div>
          </Link>

          <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 max-w-sm">
            {BRAND_INFO.tagline} — UPVC Windows &amp; Doors, Dustless Painting, Curtains, Blinds, Wallpapers, Wooden Flooring, False Ceilings, Mosquito Nets, Louvers &amp; Artificial Grass.
          </p>

          {/* Contact Details */}
          <div className="space-y-2 pt-1 text-xs sm:text-sm text-neutral-400">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-amber-500/80 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <div>{BRAND_INFO.address}</div>
                <div className="text-neutral-500 text-xs">{BRAND_INFO.address2}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-amber-500/80 shrink-0" />
              <div className="flex items-center gap-3 font-mono text-xs">
                <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-amber-400 transition-colors">
                  {BRAND_INFO.phone}
                </a>
                <span className="text-neutral-600">·</span>
                <a href={`tel:${BRAND_INFO.phone2}`} className="hover:text-amber-400 transition-colors">
                  {BRAND_INFO.phone2}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-500/80 shrink-0" />
              <a href={`mailto:${BRAND_INFO.email}`} className="font-mono text-xs hover:text-amber-400 transition-colors">
                {BRAND_INFO.email}
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="pt-1">
            <a 
              href={BRAND_INFO.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
            >
              <Instagram className="h-3.5 w-3.5 text-pink-500" />
              <span>{BRAND_INFO.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* 2. Authorized Materials & Quality Standard (Replaces redundant services/pages) */}
        <div className="md:col-span-4 lg:col-span-5 space-y-3.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-amber-500" />
            <h5 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-500/90">
              Authorized Material Standards &amp; Brands
            </h5>
          </div>
          
          <p className="text-xs text-neutral-400 leading-relaxed">
            All turnkey installations are executed using factory-certified OEM materials backed by comprehensive warranties:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <div className="font-semibold text-white">Asian Paints &amp; Birla</div>
              <div className="text-[11px] text-neutral-400">Dustless mechanized system</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <div className="font-semibold text-white">EITI &amp; BADYEE UPVC</div>
              <div className="text-[11px] text-neutral-400">2.5mm / 2.0mm machine welded</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <div className="font-semibold text-white">Saint-Gobain Mesh</div>
              <div className="text-[11px] text-neutral-400">Genuine Netlon insect proofing</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
              <div className="font-semibold text-white">Action Tesa &amp; Surya</div>
              <div className="text-[11px] text-neutral-400">AC3 / AC4 / AC5 wooden floors</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-400">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-amber-300">
              <Award className="h-3 w-3" />
              15–20 Yr UPVC Warranty
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 text-amber-300">
              <Star className="h-3 w-3" />
              10-Yr Floor &amp; Ceiling Warranty
            </span>
          </div>
        </div>

        {/* 3. Studio Hours & Quick Action */}
        <div className="md:col-span-3 lg:col-span-3 space-y-3.5">
          <h5 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-500/90">
            Studio &amp; Consultations
          </h5>

          {/* Live status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs text-neutral-300 font-medium">Open Mon–Sat · 9AM–8PM</span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed">
            Free site inspection &amp; digital moisture check across Coimbatore, Karamadai &amp; Bengaluru regions.
          </p>

          {/* Quick Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/estimator"
              className="w-full text-center rounded-xl bg-amber-600 hover:bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all"
            >
              Instant Cost Estimator →
            </Link>
            <Link
              to="/contact"
              className="w-full text-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-medium text-neutral-200 transition-all"
            >
              Book Site Visit
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-7 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} TruPaintz &amp; Interiors. All rights reserved.</p>
        <p className="text-[11px] text-neutral-500">
          Precision Engineering · Non-Destructive Digital Moisture Inspection · Dustless HEPA Workflows
        </p>
      </div>
    </div>

  </footer>
);
