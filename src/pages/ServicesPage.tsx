import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Award,
  Zap,
  Phone,
  Ruler,
  Layers,
  ChevronRight,
  Shield,
  Clock,
  Paintbrush,
  Maximize2,
  Check,
  X,
  Wrench
} from 'lucide-react';
import { CATALOGUE_CATEGORIES } from '../data/catalogueData';
import { BRAND_INFO } from '../data/mockData';

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('upvc');
  const [quoteService, setQuoteService] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-6 sm:pt-8 lg:pt-9 pb-12 sm:pb-16 space-y-12 sm:space-y-16">
      
      {/* 1. HERO SECTION (Preserving existing elegance & typography) */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span className="uppercase tracking-widest font-bold">OUR SERVICES &amp; PRODUCTS CATALOGUE</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 [text-wrap:balance]">
          Complete Interior, Exterior &amp; Architectural Solutions
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
          From heavy-gauge UPVC window profiles and dustless home painting to designer curtains, AC-rated wooden floors, false ceilings, and artificial grass — engineered with uncompromised craftsmanship.
        </p>
      </div>

      {/* 2. STICKY / HORIZONTAL QUICK JUMP NAV BAR */}
      <div className="sticky top-16 sm:top-20 z-40 -mx-4 sm:-mx-6 lg:-mx-10 xl:-mx-12 px-4 sm:px-6 lg:px-10 xl:px-12 py-3 bg-[#FAF7F2]/95 backdrop-blur-md border-y border-amber-900/10 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 shrink-0 hidden md:inline mr-2">
            Categories:
          </span>
          {CATALOGUE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-600'
                  : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-200/90'
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">{cat.num}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. DETAILED PREMIUM SERVICE CATALOGUE SECTIONS */}
      <div className="space-y-24">

        {/* ---------------- 1. UPVC WINDOWS & DOORS ---------------- */}
        <section id="upvc" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">01</span>
                <span>ARCHITECTURAL PROFILES &amp; SYSTEMS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                UPVC Windows &amp; Doors
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Certified EITI 2.5mm and BADYEE 2mm heavy-gauge profile systems engineered for maximum acoustic insulation, dustproofing, and thermal performance.
              </p>
            </div>
            <Link
              to="/estimator?service=UPVC%20Windows%20%26%20Doors"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Large Hero Card with Badges */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-md group">
            <div className="aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=80"
                alt="Luxury UPVC Windows & Doors Installation"
                className="w-full h-full object-cover img-hover-zoom brightness-90 group-hover:brightness-95 transition-all duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-neutral-950 text-xs font-bold uppercase tracking-wider">
                  15–20 Years Warranty
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold">
                  4mm Glass Standard
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold">
                  Machine Welding
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold">
                  EPDM Gasket Sealing
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold">
                  Premium Hardware
                </span>
              </div>
            </div>
          </div>

          {/* Window Types Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
              Window Types &amp; Operating Configurations:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {[
                { name: 'Open Windows', desc: 'Hinged outward/inward casement with multi-point lock' },
                { name: 'Sliding Windows', desc: 'Smooth gliding 2-track & 3-track sliding sashes' },
                { name: 'Fixed Windows', desc: 'Panoramic picture glass for unobstructed natural light' },
                { name: 'Top Open Windows', desc: 'Awning top-hung ventilators for bathrooms & kitchens' },
                { name: 'Lower Windows', desc: 'Integrated architectural louvers for continuous airflow' },
                { name: 'Touch Lock Sliding', desc: 'One-touch push-to-lock safety handles with child safety' },
              ].map((win, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:border-amber-400 hover:shadow-sm transition-all flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] font-bold text-amber-700">0{i+1}.</span>
                    <h4 className="font-bold text-sm text-neutral-900">{win.name}</h4>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">{win.desc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center text-[10px] font-semibold text-emerald-700">
                    <Check className="h-3 w-3 mr-1 text-emerald-600" />
                    <span>EPDM Gasket Fitted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Netlon Doors Sub-Section inside UPVC */}
          <div className="rounded-3xl border border-amber-900/15 bg-amber-50/40 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">INTEGRATED INSECT PROTECTION</span>
                <h4 className="font-display text-xl font-bold text-neutral-950">Netlon Doors for UPVC Frames</h4>
              </div>
              <span className="text-xs text-neutral-500 font-mono">Custom Built to Exact Aperture</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { type: 'Magnet Type', price: '₹300 / sq.ft', badge: 'Magnetic Snap Seal', desc: 'Effortless touch magnetic latch for seamless auto-close.' },
                { type: 'Normal Lock', price: '₹250 / sq.ft', badge: 'Keyed Latch Handle', desc: 'Sturdy hinged frame with ergonomic lock mechanism.' },
                { type: 'Pleated', price: '₹300 / sq.ft', badge: 'Accordion Zig-Zag', desc: 'Barrier-free retractable mesh for large sliding patio doors.' },
                { type: 'Velcro Stapler Stitch', price: '₹45 – ₹60 / sq.ft', badge: 'Economical Screen', desc: 'Double-stitched high-strength velcro mesh for window rebates.' },
              ].map((net, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">{net.badge}</span>
                    <h5 className="font-bold text-sm text-neutral-900">{net.type}</h5>
                    <p className="text-[11px] text-neutral-600">{net.desc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-700">{net.price}</span>
                    <Link to="/estimator?service=UPVC%20Windows%20%26%20Doors" className="text-[11px] font-semibold text-amber-700 hover:underline">
                      Quote →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ---------------- 2. PAINTING ---------------- */}
        <section id="painting" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">02</span>
                <span>MECHANIZED DUSTLESS FINISHES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Interior &amp; Exterior Painting
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Certified paint application systems with Asian Paints and Birla Paints. Dust-free vacuum HEPA sanding and multi-year written warranty certificates.
              </p>
            </div>
            <Link
              to="/estimator?service=Painting"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <Paintbrush className="h-3.5 w-3.5" />
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Two Distinct High-End Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* INTERIOR PAINTING CARD */}
            <div className="rounded-3xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm flex flex-col justify-between group">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                    alt="Interior Luxury Home Painting"
                    className="w-full h-full object-cover img-hover-zoom"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-neutral-950/85 backdrop-blur-md text-amber-300 font-mono text-xs font-bold">
                      INTERIOR
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-neutral-800 text-[10px] font-bold uppercase tracking-wider">
                      Asian Paints · Birla Paints
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl font-bold text-neutral-950">
                      Interior Painting Packages
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Mechanized dustless sanding, primer sealing, putty skimming, and 2 luxury top coats with washable stain-resistant sheen.
                    </p>
                  </div>

                  {/* 3 Warranty Tiers */}
                  <div className="space-y-3">
                    {[
                      { period: '3 Year Warranty', price: '₹22 / sq.ft', tag: 'Standard Premium', details: 'Emulsion silk finish with moisture barrier' },
                      { period: '7 Year Warranty', price: '₹28 / sq.ft', tag: 'Luxury Royale', details: 'High-scrub Teflon surface protection coating' },
                      { period: '10 Year Warranty', price: '₹32 / sq.ft', tag: 'Elite Velvet Sheen', details: 'Anti-bacterial, crack-bridging Italian base coat' },
                    ].map((tier, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-neutral-900">{tier.period}</span>
                            <span className="text-[10px] font-semibold bg-white text-neutral-600 px-2 py-0.5 rounded border border-neutral-200">
                              {tier.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500">{tier.details}</p>
                        </div>
                        <span className="font-mono text-sm sm:text-base font-bold text-amber-800 shrink-0">
                          {tier.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500">Dustless 99% Clean Handover</span>
                <Link
                  to="/estimator?service=Interior%20Painting"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  <span>Interior Estimate</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* EXTERIOR PAINTING CARD */}
            <div className="rounded-3xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm flex flex-col justify-between group">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                    alt="Exterior Villa Painting Architecture"
                    className="w-full h-full object-cover img-hover-zoom"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-neutral-950/85 backdrop-blur-md text-amber-300 font-mono text-xs font-bold">
                      EXTERIOR
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-neutral-800 text-[10px] font-bold uppercase tracking-wider">
                      Weather-Proof Shields
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl font-bold text-neutral-950">
                      Exterior Painting Packages
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      High-pressure wall pressure washing, elastomeric crack filling, anti-algae silicone priming, and weather-defense coatings.
                    </p>
                  </div>

                  {/* 3 Warranty Tiers */}
                  <div className="space-y-3">
                    {[
                      { period: '3 Year Warranty', price: '₹25 / sq.ft', tag: 'Weather Shield', details: 'UV protection & rain-resistant exterior coat' },
                      { period: '7 Year Warranty', price: '₹32 / sq.ft', tag: 'Apex Ultima Class', details: 'Anti-fungal, dust-pickup resistant formulation' },
                      { period: '10 Year Warranty', price: '₹38 / sq.ft', tag: 'Hydro-Shield Armour', details: 'Nano-silicone water repellent & heat reflective' },
                    ].map((tier, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-neutral-900">{tier.period}</span>
                            <span className="text-[10px] font-semibold bg-white text-neutral-600 px-2 py-0.5 rounded border border-neutral-200">
                              {tier.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-500">{tier.details}</p>
                        </div>
                        <span className="font-mono text-sm sm:text-base font-bold text-amber-800 shrink-0">
                          {tier.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500">10-Year Weather-Defense</span>
                <Link
                  to="/estimator?service=Exterior%20Painting"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                >
                  <span>Exterior Estimate</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </section>


        {/* ---------------- 3. CURTAINS ---------------- */}
        <section id="curtains" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">03</span>
                <span>BESPOKE WINDOW TREATMENTS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Curtains &amp; Designer Drapery
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Curated designer fabric collections crafted with wave-fold silent tracks, sheer day filtration, thermal blackout velvets, and precision hardware.
              </p>
            </div>
            <Link
              to="/estimator?service=Curtains"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Clean Subcategory Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Collection 1: Curtains Avenue */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
                    alt="Curtains Avenue Collection"
                    className="w-full h-full object-cover img-hover-zoom"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">PREMIUM SERIES</span>
                  <h3 className="font-display text-xl font-bold text-neutral-950">Curtains Avenue</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'Admire Main',
                    'Admire Sheer',
                    'Sunrise',
                    'Block Out',
                    'Stardust',
                    'Elements',
                    'Iconic',
                  ].map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500">Fabric Swatches Available</span>
                <span className="font-semibold text-amber-700">Enquire for Price</span>
              </div>
            </div>

            {/* Collection 2: MBF Collection */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                    alt="MBF Collection Curtains"
                    className="w-full h-full object-cover img-hover-zoom"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">CONTEMPORARY WEAVES</span>
                  <h3 className="font-display text-xl font-bold text-neutral-950">MBF Collection</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Sushi', 'Jersey', 'Pastle', 'Cinkam'].map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500">Modern Textures</span>
                <span className="font-semibold text-amber-700">Enquire for Price</span>
              </div>
            </div>

            {/* Collection 3: BD Balaji Décor */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-44 rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80"
                    alt="BD Balaji Décor Curtains"
                    className="w-full h-full object-cover img-hover-zoom"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">EMBOSSED LUXURY</span>
                  <h3 className="font-display text-xl font-bold text-neutral-950">BD Balaji Décor</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Marvel', 'Exotic', 'Nitro', 'IPL', '3D Embose'].map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500">Heavy Weight Drapery</span>
                <span className="font-semibold text-amber-700">Enquire for Price</span>
              </div>
            </div>

            {/* Hardware & Accessories */}
            <div className="rounded-3xl border border-amber-900/15 bg-amber-50/50 p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">HARDWARE &amp; FITTINGS</span>
                  <h3 className="font-display text-xl font-bold text-neutral-950">Accessories &amp; Tracks</h3>
                  <p className="text-xs text-neutral-600">
                    High-gauge silent sliding rails, architectural brackets, and custom stitching finishes.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[
                    'Rod (Heavy Gauge)',
                    'Support Brackets',
                    'End Cap',
                    'Clamp',
                    'Wall Bracket',
                    'Finials (Designer)',
                    'Stitching Service',
                    'Measurement (Free)',
                  ].map((acc, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-white border border-neutral-200/90 text-[11px] font-semibold text-neutral-800 flex items-center gap-1.5">
                      <Check className="h-3 w-3 text-amber-600 shrink-0" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between text-xs">
                <span className="text-neutral-600">Full Fitting Protocol</span>
                <Link to="/contact" className="font-bold text-amber-800 hover:underline">
                  Free Site Visit →
                </Link>
              </div>
            </div>

          </div>
        </section>


        {/* ---------------- 4. BLINDS ---------------- */}
        <section id="blinds" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">04</span>
                <span>LIGHT FILTRATION &amp; SMART SHADING</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Window Blinds &amp; Shades
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Motorized remote &amp; manual roller screens, day-and-night Zebra dual layers, natural timber louvers, and commercial PVC blinds.
              </p>
            </div>
            <Link
              to="/estimator?service=Blinds"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Visual Cards with Hover Effects */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {[
              { title: 'Roller Blinds', desc: 'UV solar block & blackout fabrics', tag: 'Blackout / Sheer' },
              { title: 'Zebra Blinds', desc: 'Dual-layer day and night light adjust', tag: 'Dual Layer' },
              { title: 'Décor Blinds', desc: 'Designer woven tactile textures', tag: 'Textured' },
              { title: 'Bamboo Blinds', desc: '100% natural organic woven timber', tag: 'Natural Wood' },
              { title: 'Vertical Blinds', desc: 'Full ceiling-to-floor balcony louvers', tag: 'Floor to Ceiling' },
              { title: 'PVC Blinds', desc: '100% waterproof for kitchens & bath', tag: 'Water Resistant' },
              { title: 'Venetian Blinds', desc: 'Precision tilt aluminum & wood slats', tag: 'Slatted Tilt' },
            ].map((blind, i) => (
              <div
                key={i}
                className="group card-hover-lift p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                    {blind.tag}
                  </span>
                  <h4 className="font-bold text-sm text-neutral-950 group-hover:text-amber-700 transition-colors">
                    {blind.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    {blind.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">Custom Cut</span>
                  <span className="font-semibold text-amber-700 group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Fitting & Transport Charges Banner */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-600/10 flex items-center justify-center text-amber-700 shrink-0">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-neutral-900 block">Transparent Installation &amp; Transit:</span>
                <span className="text-neutral-600">
                  Fitting Charges &amp; Safe Transport Charges are itemized transparently in every on-site quotation.
                </span>
              </div>
            </div>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-xl bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors shrink-0"
            >
              Request Blinds Measurement
            </Link>
          </div>
        </section>


        {/* ---------------- 5. WALLPAPERS ---------------- */}
        <section id="wallpapers" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">05</span>
                <span>IMPORTED VINYL WALLCOVERINGS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Designer Wallpapers &amp; Murals
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Heavy-grade vinyl coated rolls engineered for 10-year durability, seamless geometric alignments, and tailored panoramic murals.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to="/projects"
                className="px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors"
              >
                Explore Designs
              </Link>
              <Link
                to="/estimator?service=Wallpapers"
                className="btn-premium rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Hero Banner with Feature Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-neutral-200 aspect-[4/3] bg-neutral-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80"
                alt="Designer Wallpaper Accent Elevation"
                className="w-full h-full object-cover img-hover-zoom"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-amber-300">
                Standard 57 sq.ft / Roll
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {/* Wallpaper Highlights Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Vinyl Coating', desc: '100% Washable & Scratch-Proof' },
                  { label: '10 Year Info', desc: 'Long-term peel & fade resistance' },
                  { label: '57 sq.ft / Roll', desc: 'Standard European roll size' },
                  { label: 'Multiple Designs', desc: 'Over 1,200+ catalogs in studio' },
                ].map((hl, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-900/15 space-y-1">
                    <span className="text-xs font-bold text-amber-950 block">{hl.label}</span>
                    <span className="text-[11px] text-neutral-600 leading-tight block">{hl.desc}</span>
                  </div>
                ))}
              </div>

              {/* Wallpaper Collections Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block">
                  Featured Catalogues &amp; Collections:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    'Tattva Opel',
                    'Ombre',
                    'Self Textured',
                    'Truffle',
                    'Style',
                    'Temptation',
                    'Fabtec',
                    'Customized Wallpapers',
                  ].map((coll, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 shadow-xs flex items-center justify-between"
                    >
                      <span>{coll}</span>
                      <span className="text-amber-600 text-[10px]">★</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ---------------- 6. WOODEN FLOORING ---------------- */}
        <section id="wooden-flooring" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">06</span>
                <span>EUROPEAN AC-RATED TIMBER SURFACES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Wooden Flooring &amp; Waterproof Planks
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Certified Action Tesa and Surya laminate flooring systems with multi-year warranties, plus high-performance SPC vinyl and VOX European planks.
              </p>
            </div>
            <Link
              to="/estimator?service=Wooden%20Flooring"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Action Tesa vs Surya Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* ACTION TESA Brand Section (Col Span 6) */}
            <div className="lg:col-span-6 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">PREMIER BRAND</span>
                    <h3 className="font-display text-2xl font-bold text-neutral-950">ACTION TESA</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                    Up to 20-Yr Warranty
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { grade: 'AC3 Grade', price: '₹140 / sq.ft', war: '10 Years Warranty', ideal: 'Residential Living & Bedrooms' },
                    { grade: 'AC4 Grade', price: '₹150 / sq.ft', war: '15 Years Warranty', ideal: 'Heavy Footfall & Formal Lounges' },
                    { grade: 'AC5 Grade', price: '₹160 / sq.ft', war: '20 Years Warranty', ideal: 'Commercial & High Traffic Spaces' },
                  ].map((g, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-neutral-900">{g.grade}</span>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {g.war}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{g.ideal}</p>
                      </div>
                      <span className="font-mono text-base font-bold text-neutral-950 shrink-0">
                        {g.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Accessories */}
                <div className="p-3.5 rounded-2xl bg-neutral-100/70 text-xs space-y-1.5">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider block text-[10px]">
                    Accessories &amp; Execution:
                  </span>
                  <div className="flex flex-wrap gap-2 text-neutral-700">
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-neutral-200">Skirting</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-neutral-200">T-Profile</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-neutral-200">Reducer</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-neutral-200 font-bold text-amber-800">Flooring Laying Included</span>
                  </div>
                </div>
              </div>

              <Link
                to="/estimator?service=Wooden%20Flooring"
                className="w-full text-center py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
              >
                Quote Action Tesa →
              </Link>
            </div>

            {/* SURYA Brand Section (Col Span 6) */}
            <div className="lg:col-span-6 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">RELIABLE GERMAN TECHNOLOGY</span>
                    <h3 className="font-display text-2xl font-bold text-neutral-950">SURYA</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold">
                    High Resilience
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { grade: 'AC3 Grade', price: '₹150 / sq.ft', war: 'Standard Warranty', ideal: 'Cozy Living Rooms & Bed Chambers' },
                    { grade: 'AC4 Grade', price: '₹160 / sq.ft', war: 'Commercial Grade', ideal: 'Heavy Domestic & Executive Foyers' },
                  ].map((g, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-neutral-900">{g.grade}</span>
                          <span className="text-[11px] font-semibold text-neutral-600 bg-white px-2 py-0.5 rounded border border-neutral-200">
                            {g.war}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{g.ideal}</p>
                      </div>
                      <span className="font-mono text-base font-bold text-neutral-950 shrink-0">
                        {g.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Accessories */}
                <div className="p-3.5 rounded-2xl bg-neutral-100/70 text-xs space-y-1.5">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider block text-[10px]">
                    Accessories &amp; Laying:
                  </span>
                  <div className="flex flex-wrap gap-2 text-neutral-700">
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-neutral-200">Skirting Profiles</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-neutral-200">Transition Trims</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-neutral-200 font-bold text-amber-800">Flooring Laying</span>
                  </div>
                </div>
              </div>

              <Link
                to="/estimator?service=Wooden%20Flooring"
                className="w-full text-center py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors"
              >
                Quote Surya Flooring →
              </Link>
            </div>

          </div>

          {/* Also Showcase: Vinyl Flooring, VOX & Ceiling Options */}
          <div className="rounded-3xl border border-amber-900/15 bg-amber-50/50 p-6 sm:p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              ADDITIONAL SPECIALTY SURFACES
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1.5">
                <h4 className="font-bold text-sm text-neutral-950">Vinyl Flooring (SPC Planks)</h4>
                <p className="text-xs text-neutral-600">
                  100% waterproof stone plastic composite click flooring with acoustic pad. Ideal for wet areas and kitchens.
                </p>
                <span className="inline-block font-mono text-xs font-semibold text-emerald-700 pt-1">
                  Enquire for Price
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1.5">
                <h4 className="font-bold text-sm text-neutral-950">VOX Flooring</h4>
                <p className="text-xs text-neutral-600">
                  European polymer planks with authentic tactile woodgrain texture and high impact scratch resistance.
                </p>
                <span className="inline-block font-mono text-xs font-semibold text-emerald-700 pt-1">
                  Enquire for Price
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1.5">
                <h4 className="font-bold text-sm text-neutral-950">Ceiling Paneling Options</h4>
                <p className="text-xs text-neutral-600">
                  Coordinated wooden slat false ceiling overlays that harmonize seamlessly with your floor palette.
                </p>
                <span className="inline-block font-mono text-xs font-semibold text-emerald-700 pt-1">
                  Enquire for Price
                </span>
              </div>
            </div>
          </div>
        </section>


        {/* ---------------- 7. FALSE CEILING ---------------- */}
        <section id="false-ceiling" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">07</span>
                <span>ARCHITECTURAL CEILINGS &amp; COVES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                False Ceiling Architecture
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Monolithic Gypsum, acoustic Grid, waterproof PVC, European VOX, and solid Wooden ceilings built with certified Saint-Gobain &amp; USG Boral channels.
              </p>
            </div>
            <Link
              to="/estimator?service=False%20Ceiling"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Request Ceiling Estimate</span>
            </Link>
          </div>

          {/* Brands & Pricing Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-bold uppercase tracking-wider">
                  COMMERCIAL / OFFICE
                </span>
                <h3 className="font-display text-xl font-bold text-neutral-950">Grid Ceiling</h3>
                <p className="text-xs text-neutral-500">
                  Mineral fiber modular ceiling grid tiles for acoustic absorption and easy electrical plenum access.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100">
                <span className="font-mono text-xl font-bold text-neutral-900 block">₹75 – ₹95</span>
                <span className="text-[11px] text-neutral-500 font-mono">per sq.ft</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[10px] font-bold uppercase tracking-wider border border-sky-200">
                  MOISTURE RESISTANT
                </span>
                <h3 className="font-display text-xl font-bold text-neutral-950">PVC Ceiling</h3>
                <p className="text-xs text-neutral-500">
                  Lightweight, washable, anti-termite and zero-maintenance ceiling panels for balconies, ports and verandas.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100">
                <span className="font-mono text-xl font-bold text-neutral-900 block">₹130 – ₹180</span>
                <span className="text-[11px] text-neutral-500 font-mono">per sq.ft</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                  EUROPEAN LUXURY
                </span>
                <h3 className="font-display text-xl font-bold text-neutral-950">VOX Ceiling</h3>
                <p className="text-xs text-neutral-500">
                  Ultra-premium decorative composite ceilings with realistic wood finishes, zero sagging, and acoustic comfort.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100">
                <span className="font-mono text-xl font-bold text-neutral-900 block">₹280 – ₹300</span>
                <span className="text-[11px] text-neutral-500 font-mono">per sq.ft</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                  BESPOKE CRAFTSMANSHIP
                </span>
                <h3 className="font-display text-xl font-bold text-neutral-950">Wooden Ceiling</h3>
                <p className="text-xs text-neutral-500">
                  Solid natural teakwood &amp; fluted oak timber slats with integrated concealed LED cove tracks.
                </p>
              </div>
              <div className="pt-3 border-t border-neutral-100">
                <span className="font-mono text-xl font-bold text-neutral-900 block">₹450 – ₹850</span>
                <span className="text-[11px] text-neutral-500 font-mono">per sq.ft</span>
              </div>
            </div>

          </div>

          {/* Additional Types: Gypsum Board, Exterior, POP */}
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-neutral-900 text-sm">Certified Channel Partners:</span>
                <span className="px-2.5 py-1 rounded bg-white font-bold text-amber-800 border border-neutral-200">Saint-Gobain Gyproc</span>
                <span className="px-2.5 py-1 rounded bg-white font-bold text-neutral-800 border border-neutral-200">USG Boral</span>
              </div>
              <p className="text-neutral-600">
                Also undertaking turnkey **Gypsum Board**, **Exterior Ceiling**, and **Plaster of Paris (POP)** decorative moldings — customized according to your lighting design.
              </p>
            </div>
            <Link
              to="/estimator?service=False%20Ceiling"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
            >
              Request Ceiling Estimate →
            </Link>
          </div>
        </section>


        {/* ---------------- 8. NETLON / MOSQUITO NETS ---------------- */}
        <section id="mosquito-nets" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">08</span>
                <span>INSECT PROTECTION SYSTEMS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Netlon / Mosquito Nets
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                100% insect and dengue mosquito defense for windows and doors using genuine Saint-Gobain high-tensile fiberglass mesh.
              </p>
            </div>
            <Link
              to="/estimator?service=Netlon%20%2F%20Mosquito%20Nets"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Get a Quote</span>
            </Link>
          </div>

          {/* Pricing Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { type: 'Magnet Type', price: '₹300', unit: '/ sq.ft', tag: 'Windows & Doors', desc: 'Magnetic perimeter strip for effortless open & snap-close seal' },
              { type: 'Pleated', price: '₹300', unit: '/ sq.ft', tag: 'Balconies & Sliders', desc: 'Smooth horizontal accordion sliding mesh with low-profile bottom guide' },
              { type: 'Normal Lock', price: '₹250', unit: '/ sq.ft', tag: 'Hinged Doors', desc: 'Heavy-duty aluminium door frame equipped with mechanical lock & handle' },
              { type: 'Velcro Stapler Stitched', price: '₹45', unit: '/ sq.ft', tag: 'Budget Friendly', desc: 'High-strength stitched velcro border screen for wooden and aluminium window frames' },
              { type: 'Saint-Gobain Mesh', price: '₹55 – ₹62', unit: '/ sq.ft', tag: 'Genuine Mesh', desc: '100% authentic Saint-Gobain fiberglass mesh roll with anti-tear coating' },
            ].map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <h4 className="font-bold text-sm text-neutral-950 font-display">{item.type}</h4>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100">
                  <span className="font-mono text-lg font-bold text-emerald-700 block">{item.price}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">{item.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Benefit Points Checklist */}
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-900/15 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-950">
              Why Homeowners Trust Our Mosquito Nets:
            </span>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                100% Insect Protection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Easy &amp; Silent Operation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Clean Architectural Finish
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Suitable for Windows &amp; Doors
              </span>
            </div>
          </div>
        </section>


        {/* ---------------- 9. LOUVERS ---------------- */}
        <section id="louvers" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">09</span>
                <span>DECORATIVE WALL PANELS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Architectural Wall Louvers
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Shore Louvers and Charcoal Louvers fabricated on 16mm commercial plywood with scratch-resistant premium lamination for media elevations.
              </p>
            </div>
            <Link
              to="/estimator?service=Louvers"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Get a Quote</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-neutral-200 aspect-[4/3] bg-neutral-100 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80"
                alt="Architectural Charcoal Wall Louvers"
                className="w-full h-full object-cover img-hover-zoom"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-amber-300">
                16mm Commercial Plywood Core
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Product 1: 8" × 8 ft */}
                <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Standard Height
                    </span>
                    <span className="font-mono text-base font-bold text-neutral-900">₹850 – ₹1,150</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-950">
                    8" × 8 ft Louver Panel
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Precision fluted panel ideal for living room consoles, bed backdrops, and accent divider walls.
                  </p>
                  <div className="pt-2 text-[11px] font-semibold text-neutral-700 space-y-1">
                    <div>• Profiles: Shore Louvers &amp; Charcoal Louvers</div>
                    <div>• Finish: Premium Scratch-Resistant Lamination</div>
                  </div>
                </div>

                {/* Product 2: 8" × 9 ft */}
                <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Tall Ceiling Height
                    </span>
                    <span className="font-mono text-base font-bold text-neutral-900">₹950 – ₹1,250</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-950">
                    8" × 9 ft Louver Panel
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Extended height profile for seamless floor-to-ceiling focal walls with zero joint lines.
                  </p>
                  <div className="pt-2 text-[11px] font-semibold text-neutral-700 space-y-1">
                    <div>• Profiles: Shore Louvers &amp; Charcoal Louvers</div>
                    <div>• Core: 16mm Heavy Commercial Plywood</div>
                  </div>
                </div>

              </div>

              {/* Material Specs */}
              <div className="p-4 rounded-2xl bg-neutral-100/70 border border-neutral-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-neutral-800">
                  <ShieldCheck className="h-4 w-4 text-amber-600 shrink-0" />
                  <span><strong>Material Specification:</strong> 16mm Commercial Grade Plywood + Premium Lamination</span>
                </div>
                <Link to="/contact" className="text-amber-800 font-bold hover:underline shrink-0">
                  View Sample Swatches →
                </Link>
              </div>
            </div>

          </div>
        </section>


        {/* ---------------- 10. ARTIFICIAL GRASS ---------------- */}
        <section id="artificial-grass" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-mono">10</span>
                <span>LANDSCAPING &amp; BALCONY TURF</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                Artificial Grass &amp; Turf Laying
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
                Lush, realistic all-weather green turf for balconies, terrace gardens, villas, and commercial outdoor spaces with zero mowing and low maintenance.
              </p>
            </div>
            <Link
              to="/estimator?service=Artificial%20Grass"
              className="btn-premium inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all shrink-0"
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>Get Installation Quote</span>
            </Link>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { height: '25mm Pile', price: '₹55', unit: '/ sq.ft', ideal: 'Balconies & Wall Cladding' },
              { height: '35mm Pile', price: '₹65', unit: '/ sq.ft', ideal: 'Terrace & Patio Lounges' },
              { height: '40mm Pile', price: '₹70', unit: '/ sq.ft', ideal: 'Lush Residential Gardens' },
              { height: '50mm Pile', price: '₹80', unit: '/ sq.ft', ideal: 'Super Plush Luxury Turf' },
              { height: 'Grass Laying', price: '₹15', unit: '/ sq.ft', ideal: 'Glue & Underlay Fixing' },
            ].map((turf, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    UV Protected
                  </span>
                  <h4 className="font-bold text-base text-neutral-950 font-display">{turf.height}</h4>
                  <p className="text-[11px] text-neutral-500">{turf.ideal}</p>
                </div>
                <div className="pt-3 border-t border-neutral-100">
                  <span className="font-mono text-xl font-bold text-emerald-700 block">{turf.price}</span>
                  <span className="text-[10px] text-neutral-400 font-mono">{turf.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Highlights & Applications */}
          <div className="rounded-3xl border border-emerald-900/15 bg-emerald-50/40 p-6 sm:p-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
              PERFECT APPLICATIONS &amp; PERFORMANCE HIGHLIGHTS:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { title: 'Balcony', desc: 'Instant green makeover' },
                { title: 'Terrace', desc: 'Weatherproof roof deck' },
                { title: 'Garden', desc: 'Zero mowing or weeds' },
                { title: 'Commercial', desc: 'Cafes & offices' },
                { title: 'Low Maintenance', desc: 'Washable with water' },
                { title: 'Green Look All Year', desc: 'UV resistant fibers' },
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-emerald-200/80 shadow-xs space-y-0.5">
                  <h5 className="font-bold text-xs text-neutral-950">{item.title}</h5>
                  <p className="text-[10px] text-neutral-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* 4. STRONG FINAL CTA SECTION (As Requested by User) */}
      <div className="rounded-3xl border border-amber-900/15 bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950 text-white p-8 sm:p-14 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>EXCELLENCE IN EVERY SQ.FT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
            Transform Your Space with Trupaintz Interiors
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            From windows and painting to flooring, ceilings and complete interior solutions — we bring quality, style and functionality together.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            to="/estimator"
            className="w-full sm:w-auto btn-premium rounded-xl bg-amber-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-amber-500 transition-all text-center flex items-center justify-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            <span>Get a Free Quote</span>
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto rounded-xl border border-neutral-700 bg-neutral-800/80 px-7 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-neutral-700 transition-all text-center flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4 text-amber-400" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>

    </div>
  );
};
