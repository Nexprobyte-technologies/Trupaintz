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
  Compass, 
  Layers, 
  Phone,
  Clock,
  Award,
  Download,
  Sun,
  Sunset,
  Moon,
  Lightbulb,
  Sliders,
  RotateCcw,
  Check
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
    number: '',
    category: 'Dustless Painting & Home Solutions',
    title: 'Precision Painting & ',
    highlightText: 'Complete Interior Solutions',
    description: 'We combine dustless Asian Paints & Birla Paints systems with certified UPVC windows, wooden flooring, false ceilings, and bespoke drapery. Engineered with heirloom quality.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
    locationBadge: 'The Solarium Penthouse · Indiranagar',
    finishType: 'Dustless Asian Paints & Cove Ceilings',
    primaryCtaText: 'Calculate Instant Estimate',
    primaryCtaLink: '/estimator',
    secondaryCtaText: 'Explore Portfolio',
    secondaryCtaLink: '/projects',
  },
  {
    id: 1,
    number: '',
    category: 'Architectural Louvers, Ceilings & Turf',
    title: 'Transform Spaces with ',
    highlightText: 'Louvers, Ceilings & Grass',
    description: 'Shore and Charcoal fluted louvers on 16mm commercial plywood, Saint-Gobain false ceilings, and 25mm–50mm UV-resistant artificial turf for all-weather luxury.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    locationBadge: 'The Glass Pavilion · Sadashivanagar',
    finishType: '16mm Louvers, VOX Ceilings & 40mm Turf',
    primaryCtaText: 'Explore All 10 Services',
    primaryCtaLink: '/services',
    secondaryCtaText: 'Explore Projects',
    secondaryCtaLink: '/projects',
  },
  {
    id: 2,
    number: '',
    category: 'Heavy-Gauge UPVC Windows & Doors',
    title: 'Precision UPVC Profiles & ',
    highlightText: 'Saint-Gobain Mosquito Net',
    description: 'Certified EITI 2.5mm and BADYEE 2mm profiles, automated machine welding, EPDM soundproof gaskets, and genuine Saint-Gobain Netlon mesh backed by 15–20 year warranty.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=85',
    locationBadge: 'Eco Living · Coimbatore & Karamadai',
    finishType: 'EITI 2.5MM, BADYEE 2MM & Saint-Gobain Mesh',
    primaryCtaText: 'View UPVC Price Sheet',
    primaryCtaLink: '/services',
    secondaryCtaText: 'Instant Estimate',
    secondaryCtaLink: '/estimator',
  },
  {
    id: 3,
    number: '',
    category: 'Curtains, Motorized Blinds & Hardwood Flooring',
    title: 'Bespoke Drapery, Smart Blinds & ',
    highlightText: 'Luxury Flooring',
    description: 'Motorized whisper-quiet Zebra blinds, Curtains Avenue wave-fold sheer drapery, and Action Tesa AC4 wooden flooring installed with micron-level precision.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1920&q=85',
    locationBadge: 'Aura Residence · Chinnamathampalayam',
    finishType: 'Smart Blinds, Curtains Avenue & Action Tesa',
    primaryCtaText: 'Instant Estimate',
    primaryCtaLink: '/estimator',
    secondaryCtaText: 'Explore All Solutions',
    secondaryCtaLink: '/services',
  },
];

interface VisualizerRoom {
  id: 'living' | 'bedroom' | 'balcony';
  name: string;
  sub: string;
  image: string;
  sqft: string;
  features: string[];
}

interface VisualizerTexture {
  id: 'travertine' | 'venetian' | 'fluted' | 'hardwood';
  name: string;
  category: string;
  lrv: string;
  colorHex: string;
  desc: string;
}

const VISUALIZER_ROOMS: Record<string, VisualizerRoom> = {
  living: {
    id: 'living',
    name: 'Luxury Grand Hall',
    sub: 'Panoramic Bay UPVC & Stucco Feature Wall',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    sqft: '450 sq.ft',
    features: ['German UPVC Profiles', 'Dustless Royal Glaze', 'Italian Stucco Accent'],
  },
  bedroom: {
    id: 'bedroom',
    name: 'Executive Master Suite',
    sub: 'Acoustic Fluted Louvers & Cove False Ceiling',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    sqft: '320 sq.ft',
    features: ['Charcoal Acoustic Louvers', 'Warm Cove LED Tray', 'Belgian Sheer Curtains'],
  },
  balcony: {
    id: 'balcony',
    name: 'Garden Veranda & Lounge',
    sub: 'High-Density Turf & Soundproof UPVC Sliders',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    sqft: '280 sq.ft',
    features: ['40mm UV Artificial Grass', 'Heavy Duty UPVC Sliders', 'Louver Ceiling Paneling'],
  },
};

const VISUALIZER_TEXTURES: VisualizerTexture[] = [
  {
    id: 'travertine',
    name: 'Roman Travertine Plaster',
    category: 'Italian Plaster',
    lrv: '68% LRV',
    colorHex: '#D6C7B2',
    desc: 'Earthen matte limestone texture with gentle porous depth',
  },
  {
    id: 'venetian',
    name: 'Venetian Gold Marmorino',
    category: 'Luxury Finish',
    lrv: '76% LRV',
    colorHex: '#E2D5BE',
    desc: 'Hand-troweled silky burnish with luminous reflection',
  },
  {
    id: 'fluted',
    name: 'Charcoal Acoustic Louver',
    category: 'Architectural Wood',
    lrv: '22% LRV',
    colorHex: '#2E2D2B',
    desc: 'Precision fluted WPC paneling with noise dampening',
  },
  {
    id: 'hardwood',
    name: 'Bavarian Oak Plank',
    category: 'Flooring Finish',
    lrv: '45% LRV',
    colorHex: '#A27B5C',
    desc: 'High-density German AC4 natural matte grain',
  },
];

const LIGHTING_CONFIG = {
  day: {
    name: 'Day Mode',
    sub: 'True Natural Sun',
    kelvin: '5600K Daylight',
    lux: '980 Lux',
    cssFilter: 'brightness(1.12) contrast(1.05) saturate(1.15)',
    overlayStyle: 'linear-gradient(145deg, rgba(255, 255, 255, 0.22) 0%, rgba(224, 242, 254, 0.16) 35%, transparent 75%)',
    badgeText: '5600K Day · Natural Architectural Sun',
    accentColor: '#38bdf8',
    description: 'Clean, high-clarity natural sunlight revealing authentic surface textures, sharp UPVC window contours, and natural material tones.',
  },
  evening: {
    name: 'Evening Mode',
    sub: 'Golden Sunset Hour',
    kelvin: '3400K Golden Sunset',
    lux: '520 Lux',
    cssFilter: 'brightness(1.02) contrast(1.16) sepia(0.38) saturate(1.48) hue-rotate(-8deg)',
    overlayStyle: 'linear-gradient(125deg, rgba(245, 158, 11, 0.48) 0%, rgba(217, 119, 6, 0.32) 45%, rgba(180, 83, 9, 0.18) 75%, transparent 100%)',
    badgeText: '3400K Sunset · Golden Hour Radiance',
    accentColor: '#f97316',
    description: 'Rich sunset rays casting warm amber and terracotta highlights on Italian stucco walls, hardwood flooring, and drapery.',
  },
  night: {
    name: 'Night Mode',
    sub: 'Warm Chandelier & Hidden Cove LEDs',
    kelvin: '2400K Warm Gold',
    lux: '180 Lux',
    cssFilter: 'brightness(0.72) contrast(1.3) saturate(1.25) hue-rotate(-5deg)',
    overlayStyle: 'radial-gradient(circle at 50% 35%, rgba(20, 15, 10, 0.12) 0%, rgba(10, 8, 6, 0.88) 100%)',
    badgeText: '2400K Night · Hidden Cove LEDs & Crystal Chandelier',
    accentColor: '#f59e0b',
    description: 'Intimate midnight luxury ambiance with concealed ceiling cove illumination, warm spotlight cones, and chandelier glow.',
  },
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { reviews, averageRating, totalReviews } = useReviews();

  // 5-Second Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animProgressKey, setAnimProgressKey] = useState(0);

  // Quick Estimator State on Home Page
  const [homeSqft, setHomeSqft] = useState(1500);
  const [homeService, setHomeService] = useState('Home Painting');

  // Interactive 3D Visualizer Studio State (Day, Evening, Night)
  const [visLighting, setVisLighting] = useState<'day' | 'evening' | 'night'>('evening');
  const [visRoom, setVisRoom] = useState<'living' | 'bedroom' | 'balcony'>('living');
  const [visTexture, setVisTexture] = useState<'travertine' | 'venetian' | 'fluted' | 'hardwood'>('travertine');
  const [is3dPerspective, setIs3dPerspective] = useState(true);

  const estimatedMin = Math.round(homeSqft * (homeService === 'Home Painting' ? 28 : homeService === 'Wooden Flooring' ? 150 : 360));
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

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <div className="space-y-20 sm:space-y-28 lg:space-y-36 pb-24 sm:pb-32">
      
      {/* 1. Global Ethos Inspired 5-Second Auto-Advancing Hero Carousel */}
      <section className="relative overflow-hidden pt-6 pb-6 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12">
        {/* Subtle Ambient Light Glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(217,119,6,0.3) 0%, rgba(180,83,9,0.1) 50%, transparent 80%)',
          }}
        />

        <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
          
          {/* Hero Main Presentation Card */}
          <div className="relative rounded-3xl overflow-hidden border border-amber-900/15 bg-white shadow-2xl">
            
            {/* Visual Carousel Backdrop & Image Layers */}
            <div className="relative min-h-[520px] sm:h-[580px] lg:h-[640px] xl:h-[680px] w-full overflow-hidden bg-neutral-900">
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
                    className={`w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
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
                      className="btn-premium btn-shimmer-advanced inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-neutral-950 shadow-xl shadow-amber-500/30 hover:bg-amber-400 transition-all text-center"
                    >
                      <span>{activeSlideData.primaryCtaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to={activeSlideData.secondaryCtaLink}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/15 backdrop-blur-md px-6 py-3.5 text-sm font-medium text-white hover:bg-white/25 transition-all text-center shadow-sm hover:scale-[1.03]"
                    >
                      <Eye className="h-4 w-4 text-amber-300" />
                      <span>{activeSlideData.secondaryCtaText}</span>
                    </Link>

                    {/* Download App Button */}
                    <a
                      href="#"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-amber-950/70 backdrop-blur-md px-5 py-3.5 text-sm font-semibold text-amber-200 hover:bg-amber-900/80 hover:text-white transition-all text-center shadow-md cursor-pointer hover:scale-[1.03]"
                    >
                      <Download className="h-4 w-4 text-amber-300" />
                      <span>Download App</span>
                    </a>
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

                  {/* 4 Interactive Slide Tabs with 5s Progress Bars (Numbers Removed) */}
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
                        <div className="flex items-center justify-between text-[11px] font-medium mb-1">
                          <span className="truncate">
                            {idx === 0 ? 'Living Hall' : idx === 1 ? 'Architecture' : idx === 2 ? 'Master Suites' : 'Drapery'}
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

      {/* 2. Architectural Pillars: "Discover the Beauty of Modern Architecture" */}
      <section className="scroll-reveal mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="text-center max-w-3xl mx-auto pb-8 sm:pb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 stagger-grid">
          
          {/* Pillar 01 */}
          <div className="ethos-card rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between group">
            <div>
              <div className="mb-4">
                <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
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
              <div className="mb-4">
                <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
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
              <Link to="/services" className="font-semibold text-amber-700 group-hover:underline flex items-center gap-1">
                Services <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="ethos-card rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-xs flex flex-col justify-between group">
            <div>
              <div className="mb-4">
                <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
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
              <div className="mb-4">
                <div className="inline-flex p-2.5 rounded-xl bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
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
      <section className="scroll-reveal mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
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
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 hover:text-amber-700 transition-colors"
                >
                  <span>View All Services</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 4 Architectural Core Values Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h4 className="font-display text-base font-bold text-neutral-950 uppercase tracking-wide">
                      Latest Technologies
                    </h4>
                    <div className="p-2 rounded-xl bg-white border border-neutral-200 shadow-xs text-amber-600 shrink-0">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Interactive 3D Studio, digital surface moisture analysis, and mechanized HEPA dust-free sanding machines.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h4 className="font-display text-base font-bold text-neutral-950 uppercase tracking-wide">
                      Expert Craftsmanship
                    </h4>
                    <div className="p-2 rounded-xl bg-white border border-neutral-200 shadow-xs text-amber-600 shrink-0">
                      <Paintbrush className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Generational trowel masters trained in authentic Italian Marmorino, Grassello, and seamless microcement.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h4 className="font-display text-base font-bold text-neutral-950 uppercase tracking-wide">
                      High-Quality Designs
                    </h4>
                    <div className="p-2 rounded-xl bg-white border border-neutral-200 shadow-xs text-amber-600 shrink-0">
                      <Layers className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Curated Belgian linens, natural oak veneers, GOLS-certified latex, and European imported wallcoverings.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h4 className="font-display text-base font-bold text-neutral-950 uppercase tracking-wide">
                      Residential &amp; Commercial
                    </h4>
                    <div className="p-2 rounded-xl bg-white border border-neutral-200 shadow-xs text-amber-600 shrink-0">
                      <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Proven track record across luxury villas, duplexes, bespoke boutique studios, and flagship retail showrooms.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Core Architectural & Interior Solutions (5 Key Flagship Services) */}
      <section className="scroll-reveal mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-neutral-200/80">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full Portfolio Spectrum</span>
            </div>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold text-neutral-950">
              Discover Our Core Interior &amp; Architectural Solutions
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
              We turn ideas into real spaces. Explore our 5 core architectural and interior services, engineered with heirloom quality and uncompromised craftsmanship.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 border border-neutral-300 rounded-xl px-3.5 py-2 bg-white shadow-xs"
            >
              <span>Recent Transformations</span>
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 transition-colors"
            >
              <span>View All 10 Services in Catalogue</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 5 Core Services Interactive Responsive Grid (4, 5, 8, 9, 10 removed as requested) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 stagger-grid">
          {SERVICES_DATA.filter((s) => ['srv-1', 'srv-2', 'srv-3', 'srv-6', 'srv-7'].includes(s.id)).map((service) => (
            <div
              key={service.id}
              className="card-advanced-hover rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-sm flex flex-col justify-between group overflow-hidden"
            >
              <div>
                <div className="relative aspect-[16/11] rounded-xl overflow-hidden mb-3 bg-neutral-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover img-hover-zoom"
                    loading="lazy"
                  />
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
                  to="/services"
                  className="text-[10px] text-neutral-500 hover:text-neutral-800"
                >
                  Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5.5 Interactive 3D Visualizer Studio with Morning, Day & Light (Warm Cove) Modes */}
      <section className="scroll-reveal mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="rounded-3xl border border-amber-900/15 bg-white p-5 sm:p-8 lg:p-10 shadow-xl overflow-hidden relative">
          {/* Subtle Ambient Decorative Glow */}
          <div
            className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
          />

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700">
                <Sparkles className="h-4 w-4" />
                <span>Interactive 3D Architectural Studio</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  Live Lighting Simulation
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950">
                Experience Natural Light &amp; Luxury Finishes in 3D
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
                Toggle between Morning, Day, and Light (warm evening cove) illumination. Observe how European wall plasters, UPVC bay frames, and acoustic louvers respond dynamically to ambient lighting.
              </p>
            </div>

            {/* Lighting Mode Selector Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 bg-neutral-100/90 p-1.5 rounded-2xl border border-neutral-200/90 shrink-0">
              <button
                type="button"
                onClick={() => setVisLighting('day')}
                className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  visLighting === 'day'
                    ? 'bg-white text-neutral-900 shadow-md border border-neutral-200 ring-2 ring-sky-400'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                }`}
              >
                <Sun className="h-4 w-4 text-sky-500" />
                <span>Day Mode (5600K)</span>
              </button>

              <button
                type="button"
                onClick={() => setVisLighting('evening')}
                className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  visLighting === 'evening'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md border border-amber-400 ring-2 ring-amber-400/50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                }`}
              >
                <Sunset className="h-4 w-4 text-amber-200" />
                <span>Evening Mode (3400K)</span>
              </button>

              <button
                type="button"
                onClick={() => setVisLighting('night')}
                className={`flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  visLighting === 'night'
                    ? 'bg-neutral-950 text-amber-300 shadow-md border border-amber-500/50 ring-2 ring-amber-400/60'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                }`}
              >
                <Moon className="h-4 w-4 text-amber-400" />
                <span>Night Mode (2400K)</span>
              </button>
            </div>
          </div>

          {/* Interactive Workspace: Visualizer Stage + Material Customizer */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visualizer 3D Stage (Col 8) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              
              {/* Space Selection Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {Object.values(VISUALIZER_ROOMS).map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => setVisRoom(room.id as 'living' | 'bedroom' | 'balcony')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 border cursor-pointer ${
                      visRoom === room.id
                        ? 'border-amber-600 bg-amber-500/15 text-amber-900 font-bold shadow-xs'
                        : 'border-neutral-200 bg-neutral-50/80 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {room.name}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setIs3dPerspective(!is3dPerspective)}
                  className={`ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                    is3dPerspective
                      ? 'border-amber-400 bg-amber-50 text-amber-800'
                      : 'border-neutral-200 text-neutral-500 hover:bg-neutral-50'
                  }`}
                  title="Toggle 3D Perspective Tilt"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>3D Angle: {is3dPerspective ? 'Perspective ON' : 'Flat Plan'}</span>
                </button>
              </div>

              {/* Simulated Room Canvas with Live Lighting Shader */}
              <div className="visualizer-stage relative rounded-2xl overflow-hidden border border-neutral-200/90 shadow-md bg-neutral-950 aspect-[16/10] sm:aspect-[16/9]">
                <div
                  className="w-full h-full relative overflow-hidden visualizer-canvas-3d"
                  style={{
                    transform: is3dPerspective ? 'perspective(1000px) rotateX(1.5deg) scale(1.01)' : 'none',
                  }}
                >
                  {/* High-Resolution Room Architecture Image */}
                  <img
                    src={VISUALIZER_ROOMS[visRoom].image}
                    alt={VISUALIZER_ROOMS[visRoom].name}
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                    style={{
                      filter: LIGHTING_CONFIG[visLighting].cssFilter,
                    }}
                  />

                  {/* Atmospheric Lighting Overlay Gradient */}
                  <div
                    className="absolute inset-0 transition-all duration-700 ease-in-out pointer-events-none"
                    style={{
                      background: LIGHTING_CONFIG[visLighting].overlayStyle,
                    }}
                  />

                  {/* Day Mode: Natural Sunbeam flare from high angle */}
                  {visLighting === 'day' && (
                    <div
                      className="absolute inset-0 pointer-events-none animate-sunray"
                      style={{
                        background: 'radial-gradient(circle at 85% 15%, rgba(254, 240, 138, 0.35) 0%, rgba(224, 242, 254, 0.2) 35%, transparent 70%)',
                      }}
                    />
                  )}

                  {/* Evening Mode: Golden Sunset Horizon sweep */}
                  {visLighting === 'evening' && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(ellipse 90% 60% at 75% 45%, rgba(251, 146, 60, 0.35) 0%, rgba(217, 119, 6, 0.2) 50%, transparent 80%)',
                      }}
                    />
                  )}

                  {/* Night Mode: False Ceiling Concealed Cove LEDs + Feature Wall Spotlights */}
                  {visLighting === 'night' && (
                    <>
                      {/* Active Glowing False Ceiling Cove Strip */}
                      <div
                        className="absolute inset-0 pointer-events-none animate-cove-pulse"
                        style={{
                          background: 'radial-gradient(ellipse 95% 45% at 50% 10%, rgba(251, 191, 36, 0.8) 0%, rgba(217, 119, 6, 0.38) 40%, transparent 80%)',
                        }}
                      />
                      {/* Spotlights pooling on accent wall */}
                      <div
                        className="absolute inset-0 pointer-events-none animate-night-glow"
                        style={{
                          background: 'radial-gradient(ellipse at 30% 35%, rgba(254, 243, 199, 0.35) 0%, transparent 35%), radial-gradient(ellipse at 70% 35%, rgba(254, 243, 199, 0.35) 0%, transparent 35%)',
                        }}
                      />
                    </>
                  )}

                  {/* Live Simulation Telemetry HUD */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="bg-neutral-950/85 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full flex items-center gap-2 text-white shadow-sm">
                      <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: LIGHTING_CONFIG[visLighting].accentColor }} />
                      <span className="text-[11px] font-mono font-bold tracking-wide">
                        {LIGHTING_CONFIG[visLighting].badgeText}
                      </span>
                    </div>

                    <div className="bg-neutral-950/85 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-white text-[10px] font-mono hidden sm:flex items-center gap-1.5">
                      <span>Simulated Lux:</span>
                      <span className="text-amber-400 font-bold">{LIGHTING_CONFIG[visLighting].lux}</span>
                    </div>
                  </div>

                  {/* Bottom Surface & Spec HUD */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="bg-neutral-950/85 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-xl text-white">
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Active Finish Spec</div>
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-white/30"
                          style={{ backgroundColor: VISUALIZER_TEXTURES.find(t => t.id === visTexture)?.colorHex }}
                        />
                        <span>{VISUALIZER_TEXTURES.find(t => t.id === visTexture)?.name}</span>
                        <span className="text-[10px] font-normal text-neutral-400">({VISUALIZER_TEXTURES.find(t => t.id === visTexture)?.lrv})</span>
                      </div>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-neutral-900 text-[11px] font-semibold border border-neutral-200 shadow-sm hidden md:block">
                      {VISUALIZER_ROOMS[visRoom].sqft} · Handcrafted by TruPaintz
                    </div>
                  </div>

                </div>
              </div>

              {/* Lighting Mode Description Notice */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-start gap-3 text-xs text-neutral-700">
                <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-950">{LIGHTING_CONFIG[visLighting].name} Telemetry: </span>
                  <span className="text-neutral-600">{LIGHTING_CONFIG[visLighting].description}</span>
                </div>
              </div>

            </div>

            {/* Right Panel: Surface & Architectural Finishes Customizer (Col 4) */}
            <div className="lg:col-span-4 rounded-2xl bg-neutral-50/90 border border-neutral-200/90 p-5 flex flex-col justify-between h-full gap-5">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
                    <Sliders className="h-3.5 w-3.5" />
                    <span>Material Finishes</span>
                  </div>
                  <span className="text-[11px] text-neutral-500 font-mono">4 Tactile Presets</span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {VISUALIZER_TEXTURES.map((texture) => {
                    const isSelected = visTexture === texture.id;
                    return (
                      <button
                        key={texture.id}
                        type="button"
                        onClick={() => setVisTexture(texture.id as 'travertine' | 'venetian' | 'fluted' | 'hardwood')}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'border-amber-600 bg-white shadow-sm ring-1 ring-amber-500/30'
                            : 'border-neutral-200/80 bg-white/60 hover:bg-white hover:border-neutral-300'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-lg shrink-0 border border-neutral-300 shadow-inner mt-0.5"
                          style={{ backgroundColor: texture.colorHex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-950">{texture.name}</span>
                            {isSelected && <Check className="h-3.5 w-3.5 text-amber-600" />}
                          </div>
                          <span className="text-[10px] text-amber-700 font-medium block">{texture.category} · {texture.lrv}</span>
                          <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug line-clamp-1">
                            {texture.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Scope features of active room */}
                <div className="mt-5 pt-4 border-t border-neutral-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-2">
                    Included Architectural Specifications:
                  </span>
                  <div className="space-y-1.5">
                    {VISUALIZER_ROOMS[visRoom].features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation and Sample Box Action */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col gap-2">
                <Link
                  to="/contact"
                  className="btn-shimmer rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs py-2.5 px-4 text-center shadow-sm transition-colors"
                >
                  Book In-Person Material Sample Visit →
                </Link>
                <Link
                  to="/estimator"
                  className="rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-xs py-2 px-4 text-center transition-colors"
                >
                  Calculate Cost for this Configuration
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Featured Living Space Transformations */}
      <section className="scroll-reveal mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-neutral-200/80">
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
            <span>View All Projects</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 stagger-grid">
          {PROJECTS_DATA.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="card-advanced-hover rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm flex flex-col group"
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

      {/* 7. Interactive Quick Estimator & Complimentary On-Site Inspection Desk */}
      <section className="scroll-reveal mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Quick Estimator Card */}
          <div className="lg:col-span-7 rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-8 lg:p-9 shadow-md flex flex-col justify-between">
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
                    <span className="font-mono text-amber-700 font-bold">{homeSqft} sq.ft</span>
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
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5 font-mono">
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
                    {['Home Painting', 'UPVC Windows', 'Wooden Flooring'].map((type) => (
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
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Estimated Investment Range
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
                    ₹{estimatedMin.toLocaleString()} – ₹{estimatedMax.toLocaleString()}
                  </span>
                  <span className="text-[10px] sm:text-xs text-neutral-500 block mt-0.5">
                    Includes material, mechanized sanding &amp; artisan application
                  </span>
                </div>
                <Link
                  to={`/estimator?sqft=${homeSqft}&service=${encodeURIComponent(homeService)}`}
                  className="btn-shimmer-advanced rounded-xl bg-amber-600 hover:bg-amber-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors shrink-0 shadow-sm whitespace-nowrap"
                >
                  Full Breakdown →
                </Link>
              </div>
            </div>

            <p className="mt-4 text-[11px] text-neutral-500">
              * Final quote confirmed after non-destructive digital moisture inspection on site.
            </p>
          </div>

          {/* Right Column: Complimentary On-Site Inspection Desk (Fills space with high-value relevant offering) */}
          <div className="lg:col-span-5 rounded-3xl border border-amber-900/30 bg-neutral-950 text-white p-6 sm:p-8 lg:p-9 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Architectural Room Background Image - Bright Sunlit Luxury Interior */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
                alt="Bright Luxury Interior Inspection"
                className="w-full h-full object-cover object-center opacity-85 scale-100 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/50 to-neutral-900/25 pointer-events-none" />
            </div>

            {/* Ambient gold glow */}
            <div 
              className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-35 z-0"
              style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Zero-Obligation Site Visit</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
                Free On-Site Inspection &amp; Moisture Testing
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-neutral-100 leading-relaxed drop-shadow-sm">
                Before confirming your project, our senior project engineer visits your location with precision inspection equipment and physical material samples.
              </p>

              {/* 4 Trust Highlights with Transparent Glassmorphic Boxes */}
              <div className="mt-5 space-y-2.5">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 hover:border-amber-300/60 shadow-sm transition-all">
                  <Ruler className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Micron Laser Area Measurement</h5>
                    <p className="text-[11px] text-neutral-100">Accurate sq.ft calculation for windows, flooring &amp; walls.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 hover:border-emerald-300/60 shadow-sm transition-all">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Digital Pinless Moisture Scan</h5>
                    <p className="text-[11px] text-neutral-100">Detects hidden wall dampness before paint or floor installation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 hover:border-amber-300/60 shadow-sm transition-all">
                  <Layers className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">50+ Physical Swatches &amp; Profiles</h5>
                    <p className="text-[11px] text-neutral-100">Touch genuine EITI UPVC sections, curtains, and flooring AC samples.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 hover:border-amber-300/60 shadow-sm transition-all">
                  <Award className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-white">Guaranteed Transparent Pricing</h5>
                    <p className="text-[11px] text-neutral-100">Zero hidden extras with 10–20 year manufacturer written warranty.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3 relative z-10">
              <Link
                to="/contact"
                className="btn-shimmer-advanced w-full sm:w-auto flex-1 text-center rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2.5 text-xs font-bold text-neutral-950 shadow-md transition-all"
              >
                Book Free Site Visit →
              </Link>
              <a
                href={`https://wa.me/919677708535?text=${encodeURIComponent('Hi TruPaintz! I would like to book a complimentary on-site measurement and moisture inspection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs font-semibold text-white transition-all"
              >
                WhatsApp Desk
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Testimonials Highlight */}
      <section className="scroll-reveal mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-neutral-200/80">
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

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 stagger-grid">
          {reviews.slice(0, 2).map((rev) => (
            <div
              key={rev.id}
              className="card-advanced-hover rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between"
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
      <section className="scroll-reveal mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12">
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

