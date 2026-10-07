import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Ruler, 
  Star, 
  ChevronRight, 
  Paintbrush, 
  Eye, 
  Calculator, 
  CheckCircle2, 
  Instagram,
  Compass, 
  Layers, 
  Phone,
  PhoneCall,
  Clock,
  Award
} from 'lucide-react';
import { BRAND_INFO, SERVICES_DATA, PROJECTS_DATA } from '../data/mockData';
import { useReviews } from '../context/ReviewsContext';

interface HeroSlide {
  id: number;
  number: string;
  category: string;
  title: string;
  highlightText: string;
  description: string;
  image: string;
  locationBadge: string;
  finishType: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    number: '01',
    category: 'Artisanal Italian Finishes & Living Spaces',
    title: 'Artisanal Italian Finishes & ',
    highlightText: 'Turnkey Luxury Interiors',
    description: 'We combine hand-troweled Venetian stuccos and mechanized dustless painting with bespoke modular joinery. Engineered for homeowners who value enduring architectural distinction.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
    locationBadge: 'The Solarium Penthouse · Indiranagar',
    finishType: 'Italian Roman Stucco',
    primaryCtaText: 'Calculate Instant Estimate',
    primaryCtaLink: '/estimator',
    secondaryCtaText: 'Explore Portfolio',
    secondaryCtaLink: '/projects',
  },
  {
    id: 1,
    number: '02',
    category: 'Creative Architecture & Spatial Design',
    title: 'Discover the Beauty of ',
    highlightText: 'Modern Architecture',
    description: 'From 2D spatial floorplans to photorealistic 3D schematics and structural executions, our architects shape harmonic environments that blend light, geometry, and enduring luxury.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    locationBadge: 'The Glass Pavilion · Sadashivanagar',
    finishType: 'Turnkey Architectural Remodeling',
    primaryCtaText: 'Explore All 10 Services',
    primaryCtaLink: '/services',
    secondaryCtaText: 'View Design Gallery',
    secondaryCtaLink: '/gallery',
  },
  {
    id: 2,
    number: '03',
    category: 'Master Bedroom Sanctuaries & Headboards',
    title: 'Bespoke Headboards, Sleep & ',
    highlightText: 'Designer Wallpapers',
    description: 'Wall-to-wall acoustic velvet elevations, 100% natural organic latex mattresses, and hand-selected European textured wallcoverings created for restorative rest and tactile warmth.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1920&q=85',
    locationBadge: 'Japandi Sanctuary · Lavelle Road',
    finishType: 'Custom Fluted Headboards & Wallcoverings',
    primaryCtaText: 'Browse Headboards & Beds',
    primaryCtaLink: '/gallery',
    secondaryCtaText: 'Cost Breakdown',
    secondaryCtaLink: '/estimator',
  },
  {
    id: 3,
    number: '04',
    category: 'Curtains, Motorized Blinds & Wool Rug Couture',
    title: 'Bespoke Drapery, Smart Blinds & ',
    highlightText: 'Artisan Wool Rugs',
    description: 'Motorized whisper-quiet Zebra blinds, Belgian washed linen drapery, and hand-tufted New Zealand wool rugs woven to your exact architectural room dimensions.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85',
    locationBadge: 'Aura Residence · Chinnamathampalayam',
    finishType: 'Smart Blinds, Belgian Linens & Custom Rugs',
    primaryCtaText: 'Launch 3D Studio',
    primaryCtaLink: '/visualizer',
    secondaryCtaText: 'Explore All Solutions',
    secondaryCtaLink: '/services',
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { reviews, averageRating, totalReviews } = useReviews();

  // 5-Second Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animProgressKey, setAnimProgressKey] = useState(0);

  // Quick Callback Form State (inspired by Global Ethos)
  const [cbName, setCbName] = useState('');
  const [cbPhone, setCbPhone] = useState('');
  const [cbService, setCbService] = useState('Interior Design');
  const [cbSubmitted, setCbSubmitted] = useState(false);

  // Quick Estimator State on Home Page
  const [homeSqft, setHomeSqft] = useState(1500);
  const [homeService, setHomeService] = useState('Italian Stucco');

  const estimatedMin = Math.round(homeSqft * (homeService === 'Italian Stucco' ? 75 : homeService === 'Modular Kitchen' ? 95 : 45));
  const estimatedMax = Math.round(estimatedMin * 1.25);

  // 5-Second Auto Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setAnimProgressKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAnimProgressKey((prev) => prev + 1);
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cbName.trim() || !cbPhone.trim()) return;
    setCbSubmitted(true);
    setTimeout(() => {
      setCbName('');
      setCbPhone('');
      setCbSubmitted(false);
    }, 5000);
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Global Ethos Inspired 5-Second Auto-Advancing Hero Carousel */}
      <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
        {/* Subtle Ambient Light Glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(217,119,6,0.3) 0%, rgba(180,83,9,0.1) 50%, transparent 80%)',
          }}
        />

        <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
          
          {/* Top Verification Kicker */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 text-xs text-neutral-600">
            <span className="font-semibold text-amber-800 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
              Artisanal Studio
            </span>
            <span aria-hidden="true" className="text-neutral-400">·</span>
            <a
              href={BRAND_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-neutral-800 hover:text-amber-700 underline-offset-4 hover:underline transition-colors"
            >
              <Instagram className="h-3.5 w-3.5 text-pink-600" />
              <span>{BRAND_INFO.instagramHandle}</span>
            </a>
            <span aria-hidden="true" className="hidden sm:inline text-neutral-400">·</span>
            <span className="text-neutral-500 hidden sm:inline">Bespoke Italian Plasters &amp; Turnkey Interiors</span>
          </div>

          {/* Hero Main Presentation Card */}
          <div className="relative rounded-3xl overflow-hidden border border-amber-900/15 bg-white shadow-2xl">
            
            {/* Visual Carousel Backdrop & Image Layers */}
            <div className="relative h-[480px] sm:h-[540px] lg:h-[620px] w-full overflow-hidden bg-neutral-900">
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                      idx === currentSlide ? 'scale-105' : 'scale-100'
                    }`}
                  />
                  {/* Balanced Cinematic Overlays for Crystal Clear Photography + High Readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/75 via-neutral-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/65 via-transparent to-neutral-950/20" />
                </div>
              ))}

              {/* Slide Content Overlay */}
              <div className="relative z-20 h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14">
                
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <div 
                    key={`kicker-${currentSlide}`}
                    className="animate-slide-text inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 px-3.5 py-1.5 text-xs font-semibold text-amber-300 shadow-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                    <span>{activeSlideData.category}</span>
                  </div>


                </div>

                {/* Central Typography Block (Re-keyed for fluid slide animations) */}
                <div 
                  key={`content-${currentSlide}`} 
                  className="animate-slide-text max-w-3xl space-y-4 sm:space-y-6 my-auto pt-4 pb-2"
                >
                  <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-sm">
                    {activeSlideData.title}
                    <span className="text-amber-400 font-extrabold underline decoration-amber-500/40 underline-offset-8">
                      {activeSlideData.highlightText}
                    </span>
                    .
                  </h1>

                  <p className="text-sm sm:text-lg leading-relaxed text-neutral-200 max-w-2xl drop-shadow-xs">
                    {activeSlideData.description}
                  </p>

                  {/* Primary & Secondary Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      to={activeSlideData.primaryCtaLink}
                      className="btn-premium inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-neutral-950 shadow-xl shadow-amber-500/25 hover:bg-amber-400 transition-all text-center"
                    >
                      <span>{activeSlideData.primaryCtaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to={activeSlideData.secondaryCtaLink}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/15 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-white hover:bg-white/25 transition-all text-center shadow-sm"
                    >
                      <Eye className="h-4 w-4 text-amber-300" />
                      <span>{activeSlideData.secondaryCtaText}</span>
                    </Link>

                    <Link
                      to="/visualizer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-amber-900/30 backdrop-blur-md px-5 py-3.5 text-sm font-medium text-amber-200 hover:bg-amber-900/50 transition-all text-center"
                    >
                      <Sparkles className="h-4 w-4 text-amber-300" />
                      <span>3D Studio</span>
                    </Link>
                  </div>
                </div>

                {/* Bottom Navigation & Live 5s Progress Bar */}
                <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  
                  {/* Floating Architectural Location Pill */}
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-white">{activeSlideData.locationBadge}</span>
                    <span className="hidden sm:inline text-neutral-400">·</span>
                    <span className="hidden sm:inline text-amber-300">{activeSlideData.finishType}</span>
                  </div>

                  {/* 4 Interactive Slide Tabs with 5s Progress Bars */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full sm:w-auto">
                    {HERO_SLIDES.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        className={`text-left group relative p-1.5 sm:px-3 sm:py-2 rounded-lg transition-all ${
                          idx === currentSlide
                            ? 'bg-white/20 backdrop-blur-md border border-white/30 text-white'
                            : 'bg-black/20 hover:bg-white/10 text-neutral-400 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1">
                          <span>{slide.number}</span>
                          <span className="hidden md:inline text-[10px] font-sans font-normal opacity-80 truncate max-w-[80px]">
                            {idx === 0 ? 'Living' : idx === 1 ? 'Architecture' : idx === 2 ? 'Bedrooms' : 'Drapery'}
                          </span>
                        </div>
                        {/* Progress Bar Track */}
                        <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                          {idx === currentSlide && (
                            <div
                              key={`bar-${animProgressKey}`}
                              className="h-full bg-amber-400 rounded-full animate-progress-5s"
                            />
                          )}
                          {idx < currentSlide && (
                            <div className="h-full bg-amber-400/60 rounded-full w-full" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                </div>

              </div>

              {/* Prominent Full-Width 5-Second Carousel Progress Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/25 z-30 overflow-hidden">
                <div
                  key={`hero-progress-line-${currentSlide}-${animProgressKey}`}
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 animate-progress-5s"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Global Ethos Inspired Quick Call Back & Architecture Highlight Bar */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Quick Call Back Request (Like Global Ethos "Your Dream Interiors, Just a Form Away") */}
          <div className="lg:col-span-7 rounded-3xl border border-amber-900/15 bg-gradient-to-br from-white via-amber-50/40 to-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/25">
                  <PhoneCall className="h-3.5 w-3.5" />
                  <span>Request a Call Back</span>
                </span>
                <span className="text-xs text-neutral-500 font-medium">Free Architectural Advisory</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
                Your Dream Interiors, Just a Form Away
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Connect with our senior design director. We will review your floorplan, discuss customized finishes, and schedule a physical swatch visit.
              </p>

              {cbSubmitted ? (
                <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Call Request Received!</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Our lead architectural designer will call you shortly on your provided number.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={cbName}
                      onChange={(e) => setCbName(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9845X XXXXX"
                      value={cbPhone}
                      onChange={(e) => setCbPhone(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">Service Needed</label>
                    <select
                      value={cbService}
                      onChange={(e) => setCbService(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-xs text-neutral-900 focus:border-amber-600 focus:outline-none shadow-xs"
                    >
                      <option value="Interior Design">Interior Design (2D/3D)</option>
                      <option value="Flooring">Flooring & Marble</option>
                      <option value="Curtains">Curtains & Sheers</option>
                      <option value="Blinds">Motorized Blinds</option>
                      <option value="Wallpapers">European Wallpapers</option>
                      <option value="Rugs">Hand-Tufted Rugs</option>
                      <option value="Mattress">Orthopedic Mattress</option>
                      <option value="Headboards">Custom Headboards</option>
                      <option value="Furnitures">Bespoke Furniture</option>
                      <option value="Architecture">Creative Architecture</option>
                      <option value="Italian Stucco">Italian Stucco Finishes</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3 pt-1 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto btn-premium rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-500 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Get a Call Back Now</span>
                    </button>
                    <a
                      href={`https://wa.me/919677708535?text=${encodeURIComponent('Hi TruPaintz and Interiors team! I would like to schedule a call back for my project.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors text-center"
                    >
                      Or Chat Directly on WhatsApp →
                    </a>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-between text-[11px] text-neutral-500 gap-2">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                Response within 15 mins during studio hours (9am - 8pm)
              </span>
              <span className="font-medium text-neutral-700">Bengaluru &amp; Chennai Regional Coverage</span>
            </div>
          </div>

          {/* Right: Key Verified Metrics Display */}
          <div className="lg:col-span-5 rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Proven Studio Heritage</span>
              <h3 className="mt-1 font-display text-2xl font-bold text-neutral-950">
                Where Ideas Take Shape, and Design Tells a Story
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600">
                Be it your home, penthouse, or executive workspace — our numbers reflect rigorous quality standards.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-center">
                <span className="font-display text-3xl font-extrabold text-neutral-950 block">450+</span>
                <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider mt-0.5 block">Spaces Crafted</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-center">
                <span className="font-display text-3xl font-extrabold text-neutral-950 block">10 Yrs</span>
                <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider mt-0.5 block">Adhesion Warranty</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-center">
                <span className="font-display text-3xl font-extrabold text-neutral-950 block">0% Dust</span>
                <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider mt-0.5 block">Mechanized HEPA</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-center">
                <span className="font-display text-3xl font-extrabold text-amber-600 block">4.9 ★</span>
                <span className="text-[11px] font-medium text-neutral-600 uppercase tracking-wider mt-0.5 block">Verified Rating</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-600">Rated {averageRating} / 5.0 across {totalReviews}+ projects</span>
              <Link to="/reviews" className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                <span>View Ratings</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Global Ethos Pillars: "Discover the Beauty of Modern Architecture" */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-3xl mx-auto pb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <Compass className="h-3.5 w-3.5" />
            <span>Architectural Philosophy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950">
            Discover the Beauty of Modern Architecture
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            From preliminary concepts to turnkey handovers, we deliver architectural and interior solutions built with uncompromising care and European precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 01 */}
          <div className="ethos-card rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl font-bold text-amber-600/70 group-hover:text-amber-600 transition-colors">
                  01
                </span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Compass className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-neutral-950 group-hover:text-amber-700 transition-colors">
                Creative Architecture
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Tell us your dream, and we will make it real! Our designs cover everything from overall architectural massing to micro-elevation details, turning your ideas into beautiful spaces with skill and creativity.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-500">2D &amp; 3D Spatial Layouts</span>
              <Link to="/services" className="font-semibold text-amber-700 group-hover:underline flex items-center gap-1">
                Explore <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="ethos-card rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl font-bold text-amber-600/70 group-hover:text-amber-600 transition-colors">
                  02
                </span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-neutral-950 group-hover:text-amber-700 transition-colors">
                Creative Interior Solutions
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Bring your space to life! Our handcrafted finishes and curated furnishings create stylish, comfortable interiors that match your personality and make every single corner feel special.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-500">Italian Stucco &amp; Joinery</span>
              <Link to="/gallery" className="font-semibold text-amber-700 group-hover:underline flex items-center gap-1">
                Gallery <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="ethos-card rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl font-bold text-amber-600/70 group-hover:text-amber-600 transition-colors">
                  03
                </span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Ruler className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-neutral-950 group-hover:text-amber-700 transition-colors">
                Consulting Services
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Think of us as your design guides! We offer smart advice to make your project shine with creativity, realistic budget planning, physical swatches, and the right engineering solutions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-500">Material Swatch Visits</span>
              <Link to="/estimator" className="font-semibold text-amber-700 group-hover:underline flex items-center gap-1">
                Estimator <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 04 */}
          <div className="ethos-card rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-3xl font-bold text-amber-600/70 group-hover:text-amber-600 transition-colors">
                  04
                </span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-neutral-950 group-hover:text-amber-700 transition-colors">
                Project Execution
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We take care of everything! TruPaintz ensures your project runs smoothly, stays on budget, and eliminates stress through mechanized dustless equipment and dedicated site supervisors.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-500">10-Year Warranty</span>
              <Link to="/contact" className="font-semibold text-amber-700 group-hover:underline flex items-center gap-1">
                Contact <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Global Ethos Pillars of Craftsmanship ("Where Ideas Take Shape, and Design Tells a Story") */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
                <Award className="h-3.5 w-3.5" />
                <span>Unrivaled Craftsmanship</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Where Ideas Take Shape, and Design Tells a Story
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Be it your private residence, penthouse, or executive commercial site — we are here to turn your architectural vision into reality. And when it comes to results, our craftsmanship speaks for itself.
              </p>
              
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to="/about"
                  className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-amber-500 transition-colors"
                >
                  <span>More About Us</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 hover:text-amber-700 transition-colors"
                >
                  <span>View All Categories</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 4 Architectural Core Values Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-xs text-amber-600 shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-neutral-950">Latest Technologies</h4>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    Interactive 3D Studio, digital surface moisture analysis, and mechanized HEPA dust-free sanding machines.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-xs text-amber-600 shrink-0">
                  <Paintbrush className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-neutral-950">Expert Craftsmanship</h4>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    Generational trowel masters trained in authentic Italian Marmorino, Grassello, and seamless microcement.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-xs text-amber-600 shrink-0">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-neutral-950">High-Quality Designs</h4>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    Curated Belgian linens, natural oak veneers, GOLS-certified latex, and European imported wallcoverings.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white border border-neutral-200 shadow-xs text-amber-600 shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-neutral-950">Residential &amp; Commercial</h4>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    Proven track record across luxury villas, duplexes, bespoke boutique studios, and flagship retail showrooms.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Complete Range of Interior Design Solutions (The 10 Numbered Services Grid from Global Ethos) */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200/80">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full Portfolio Spectrum</span>
            </div>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-neutral-950">
              Discover Our Complete Range of Interior Design Solutions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-2xl">
              We turn ideas into real spaces. Explore all 10 specialized architectural and bespoke interior categories, built with care and precision.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-300 rounded-xl px-3.5 py-2 bg-white shadow-xs"
            >
              <span>Design Gallery (All Categories)</span>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
            >
              <span>View All 10 Services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 10 Services Interactive Responsive Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="ethos-card rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-xs flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-3 bg-neutral-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover img-hover-zoom"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-mono font-bold text-amber-300">
                    {service.num}
                  </span>
                </div>
                
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                  {service.highlightTag}
                </span>

                <h3 className="font-display text-base font-bold text-neutral-950 group-hover:text-amber-700 transition-colors mt-0.5">
                  {service.title}
                </h3>

                <p className="mt-1.5 text-[11px] text-neutral-600 line-clamp-2 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <Link
                  to="/services"
                  className="font-semibold text-amber-700 hover:text-amber-600 flex items-center gap-1"
                >
                  <span>Explore</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
                <Link
                  to={`/gallery?category=${encodeURIComponent(service.title)}`}
                  className="text-[10px] text-neutral-500 hover:text-neutral-800"
                >
                  Photos →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Featured Living Space Transformations */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200/80">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Eye className="h-3.5 w-3.5" />
              <span>Realized Projects</span>
            </div>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-neutral-950">
              Selected Living Space Transformations
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
          >
            <span>View Full Portfolio Gallery</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS_DATA.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="card-hover-lift rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm flex flex-col group"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover img-hover-zoom"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  {proj.categoryLabel}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-neutral-500 mb-1">
                    {proj.location} · {proj.duration}
                  </div>
                  <h3 className="font-display text-lg font-bold text-neutral-950 group-hover:text-amber-700 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {proj.scope}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="font-mono text-xs text-neutral-500">{proj.sqft} sq.ft</span>
                  <Link
                    to="/projects"
                    className="text-xs font-semibold text-amber-700 hover:text-amber-600 flex items-center gap-1"
                  >
                    <span>View Project</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Interactive Quick Estimator & 3D Studio Banner */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quick Estimator Card */}
          <div className="lg:col-span-7 rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
                <Calculator className="h-4 w-4" />
                <span>Instant Cost Calculator</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
                Plan Your Renovation Budget
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600">
                Get an instant realistic estimate based on surface area and finish tier.
              </p>

              {/* Controls */}
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-neutral-800 mb-1">
                    <span>Floor / Carpet Area:</span>
                    <span className="font-mono text-amber-700">{homeSqft} sq.ft</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={5000}
                    step={100}
                    value={homeSqft}
                    onChange={(e) => setHomeSqft(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                    <span>500 sq.ft</span>
                    <span>2,500 sq.ft</span>
                    <span>5,000 sq.ft</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1.5">
                    Finish Scope:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Premium Painting', 'Italian Stucco', 'Modular Kitchen'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setHomeService(type)}
                        className={`py-2 px-2 rounded-xl border text-xs font-medium transition-all text-center ${
                          homeService === type
                            ? 'border-amber-600 bg-amber-500/15 text-amber-800 font-semibold shadow-sm'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimate Calculation Result */}
              <div className="mt-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Estimated Investment Range
                  </span>
                  <span className="font-display text-2xl font-bold text-neutral-950">
                    ₹{estimatedMin.toLocaleString()} – ₹{estimatedMax.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-500 block mt-0.5">
                    Includes material, mechanized sanding &amp; artisan application
                  </span>
                </div>
                <Link
                  to={`/estimator?sqft=${homeSqft}&service=${encodeURIComponent(homeService)}`}
                  className="rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shrink-0"
                >
                  Full Itemized Breakdown →
                </Link>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-neutral-500">
              * Final quote confirmed after non-destructive digital moisture inspection on site.
            </p>
          </div>

          {/* 3D Visualizer Teaser Banner */}
          <div className="lg:col-span-5 rounded-3xl border border-neutral-800 bg-neutral-950 text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <Sparkles className="h-4 w-4" />
                <span>3D Interactive Studio</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Simulate Italian Stuccos Before Execution
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Test hand-troweled Venetian plasters, warm travertine tones, and lighting atmospheres on photorealistic room walls in real time.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-neutral-800 text-amber-300 border border-neutral-700">
                  Imperial Roman Stucco
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 border border-neutral-700">
                  Champagne Dune
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 border border-neutral-700">
                  Obsidian Matte
                </span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between relative z-10">
              <span className="text-xs text-neutral-400">WebGL Real-time Engine</span>
              <Link
                to="/visualizer"
                className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-neutral-950 hover:bg-amber-400 transition-all shadow-md"
              >
                <span>Launch 3D Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Testimonials Highlight */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200/80">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>Verified Homeowner Feedback</span>
            </div>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-neutral-950">
              Rated {averageRating} / 5.0 Across {totalReviews}+ Projects
            </h2>
          </div>
          <Link
            to="/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
          >
            <span>Read All Reviews</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.slice(0, 2).map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Verified Inspection
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-neutral-950">
                  "{rev.title}"
                </h4>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span className="font-semibold text-neutral-900">{rev.clientName}</span>
                <span>{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Bottom Call to Action Banner */}
      <section className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="rounded-3xl border border-amber-900/15 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to elevate your home with master finishes?
            </h2>
            <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
              Book a complimentary on-site visit. Our architectural specialists arrive with physical Italian plaster swatches and digital substrate moisture testing equipment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="rounded-xl bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-amber-900 shadow-md hover:bg-neutral-100 transition-colors"
            >
              Schedule Studio Consultation
            </Link>
            <a
              href={`https://wa.me/919677708535?text=${encodeURIComponent('Hi TruPaintz and Interiors team! I would like to schedule an architectural consultation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/40 bg-white/10 backdrop-blur-md px-5 py-3.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
