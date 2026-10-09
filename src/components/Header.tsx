import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Calculator, 
  Layers, 
  Star, 
  ArrowRight
} from 'lucide-react';
import { CATALOGUE_CATEGORIES } from '../data/catalogueData';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false);

  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(e.target as Node)) {
        setIsExploreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsExploreDropdownOpen(false);
  }, [location.pathname]);

  // Explore More Items (Projects moved inside Explore More as requested)
  const EXPLORE_ITEMS = [
    {
      to: '/projects',
      label: 'Realized Projects',
      desc: 'Curated residential & commercial spaces',
      icon: Layers,
    },
    {
      to: '/estimator',
      label: 'Cost Estimator',
      desc: 'Transparent sq.ft calculation & site visit booking',
      icon: Calculator,
    },
    {
      to: '/visualizer',
      label: '3D Material Visualizer',
      desc: 'Simulate Italian stuccos under daylight & cove lights',
      icon: Sparkles,
    },
    {
      to: '/reviews',
      label: 'Client Reviews',
      desc: 'Verified homeowner milestone inspections & ratings',
      icon: Star,
    },
  ];

  const isExploreActive = EXPLORE_ITEMS.some((item) => location.pathname === item.to);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-amber-900/10 bg-[#FAF7F2]/98 backdrop-blur-md shadow-xs transition-all duration-200">
      <div className="mx-auto flex h-16 sm:h-20 max-w-screen-2xl w-full items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Left Section: Company Name (2 Lines) + Navigation Links Right Beside It */}
        <div className="flex items-center gap-5 sm:gap-7 xl:gap-8">
          
          {/* Brand Logo with 2-Line Company Name */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none shrink-0"
            aria-label="TruPaintz and Interiors Home"
          >
            {/* Logo Badge */}
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white shadow-md border border-neutral-200/90 p-1.5 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="TruPaintz & Interiors" 
                className="h-full w-full object-contain" 
              />
            </div>

            {/* 2-Lines Split Company Name */}
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base sm:text-lg font-bold tracking-tight text-neutral-950 transition-colors group-hover:text-amber-700 leading-tight whitespace-nowrap">
                TruPaintz
              </span>
              <span className="font-display text-xs sm:text-sm font-semibold tracking-tight text-amber-800 transition-colors group-hover:text-amber-700 leading-tight whitespace-nowrap">
                &amp; Interiors
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links positioned right after the company name */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-medium tracking-wide text-neutral-600">
            
            {/* 1. Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link-animated py-1 transition-colors whitespace-nowrap ${
                  isActive ? 'text-amber-800 font-bold active' : 'hover:text-neutral-950 text-neutral-700'
                }`
              }
            >
              Home
            </NavLink>

            {/* 2. About Us */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link-animated py-1 transition-colors whitespace-nowrap ${
                  isActive ? 'text-amber-800 font-bold active' : 'hover:text-neutral-950 text-neutral-700'
                }`
              }
            >
              About Us
            </NavLink>

            {/* 3. Our Services (Moved to where Projects was + 10 Services Dropdown) */}
            <div className="relative" ref={servicesDropdownRef}>
              <div
                className="flex items-center"
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
              >
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    `nav-link-animated flex items-center gap-1 py-1 font-medium transition-colors whitespace-nowrap ${
                      isActive || isServicesDropdownOpen
                        ? 'text-amber-800 font-bold'
                        : 'text-neutral-700 hover:text-neutral-950'
                    }`
                  }
                >
                  <span>Our Services</span>
                </NavLink>
                <button
                  type="button"
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  className="p-1 text-neutral-500 hover:text-amber-800 focus:outline-none cursor-pointer"
                  aria-label="Toggle Our Services menu"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isServicesDropdownOpen ? 'rotate-180 text-amber-700' : 'text-neutral-500'
                    }`}
                  />
                </button>
              </div>

              {/* 10 Services Mega Dropdown Card */}
              {isServicesDropdownOpen && (
                <div
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  className="absolute left-0 top-full mt-2 w-[540px] xl:w-[580px] rounded-2xl border border-amber-900/15 bg-white/98 p-4 shadow-2xl backdrop-blur-xl z-50 animate-scale-in"
                >
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      Our Complete 10 Services &amp; Products
                    </span>
                    <Link
                      to="/services"
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <span>Catalogue Overview</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {CATALOGUE_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/services#${cat.id}`}
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          if (location.pathname === '/services') {
                            const el = document.getElementById(cat.id);
                            if (el) {
                              const y = el.getBoundingClientRect().top + window.scrollY - 100;
                              window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                          }
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl transition-all text-left hover:bg-amber-50/80 group border border-transparent hover:border-amber-200/60"
                      >
                        <div className="h-6 w-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-800 shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors text-[10px] font-bold">
                          ✓
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-neutral-900 group-hover:text-amber-800 truncate">
                            {cat.title}
                          </p>
                          <p className="text-[10px] text-neutral-500 truncate">
                            {cat.badge}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Explore More Dropdown (Includes Projects, Estimator, Visualizer, Reviews) */}
            <div className="relative" ref={exploreDropdownRef}>
              <button
                onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
                onMouseEnter={() => setIsExploreDropdownOpen(true)}
                className={`nav-link-animated flex items-center gap-1.5 py-1 font-medium transition-colors cursor-pointer ${
                  isExploreActive || isExploreDropdownOpen
                    ? 'text-amber-800 font-bold'
                    : 'text-neutral-700 hover:text-neutral-950'
                }`}
                aria-expanded={isExploreDropdownOpen}
              >
                <span>Explore More</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isExploreDropdownOpen ? 'rotate-180 text-amber-700' : 'text-neutral-500'
                  }`}
                />
              </button>

              {/* Explore More Dropdown Card */}
              {isExploreDropdownOpen && (
                <div
                  onMouseLeave={() => setIsExploreDropdownOpen(false)}
                  className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-amber-900/15 bg-white/98 p-3 shadow-2xl backdrop-blur-xl z-50 animate-scale-in"
                >
                  <div className="space-y-1">
                    {EXPLORE_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.to;
                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setIsExploreDropdownOpen(false)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors text-left group ${
                            isActive
                              ? 'bg-amber-50 text-amber-900 font-semibold'
                              : 'hover:bg-amber-50/70 text-neutral-800'
                          }`}
                        >
                          <div className="h-8 w-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-800 shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-950 group-hover:text-amber-700">
                              {item.label}
                            </p>
                            <p className="text-[11px] text-neutral-500 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Contact Us */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link-animated py-1 transition-colors whitespace-nowrap ${
                  isActive ? 'text-amber-800 font-bold active' : 'hover:text-neutral-950 text-neutral-700'
                }`
              }
            >
              Contact Us
            </NavLink>

          </nav>
        </div>

        {/* Right Actions: Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Primary CTA: Calculate Estimate */}
          <Link
            to="/estimator"
            className="btn-premium hidden sm:inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 sm:py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-500 transition-all whitespace-nowrap cursor-pointer"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Get Free Estimate</span>
          </Link>

          {/* Mobile Drawer Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex lg:hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-800 hover:bg-neutral-50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-900/10 bg-[#FAF7F2] p-4 sm:p-6 space-y-4 animate-fade-in-up">
          <nav className="flex flex-col space-y-2">
            
            <NavLink
              to="/"
              end
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-amber-600 text-white font-semibold shadow-sm' : 'text-neutral-700 hover:bg-amber-50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-amber-600 text-white font-semibold shadow-sm' : 'text-neutral-700 hover:bg-amber-50'
                }`
              }
            >
              About Us
            </NavLink>

            {/* Mobile Our Services (10 Services Accordion) */}
            <div className="border-t border-neutral-200/80 pt-1">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-neutral-800 rounded-xl hover:bg-amber-50 cursor-pointer"
              >
                <span>Our Services (10)</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMobileServicesOpen && (
                <div className="pl-3 pt-1 space-y-1">
                  <Link
                    to="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-bold text-amber-700 hover:underline"
                  >
                    View All Services Overview →
                  </Link>
                  {CATALOGUE_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/services#${cat.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-xs text-neutral-700 hover:text-amber-800 rounded-lg hover:bg-amber-50"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Explore More Accordion (Projects, Estimator, Visualizer, Reviews) */}
            <div className="border-t border-neutral-200/80 pt-1">
              <button
                onClick={() => setIsMobileExploreOpen(!isMobileExploreOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-neutral-800 rounded-xl hover:bg-amber-50 cursor-pointer"
              >
                <span>Explore More</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMobileExploreOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMobileExploreOpen && (
                <div className="pl-3 pt-1 space-y-1">
                  {EXPLORE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-700 hover:text-amber-800 rounded-lg hover:bg-amber-50/60"
                      >
                        <Icon className="h-3.5 w-3.5 text-amber-700" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-amber-600 text-white font-semibold shadow-sm' : 'text-neutral-700 hover:bg-amber-50'
                }`
              }
            >
              Contact Us
            </NavLink>

          </nav>

          <div className="pt-2 border-t border-neutral-200 flex flex-col gap-2">
            <Link
              to="/estimator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-amber-600 py-3 text-xs font-semibold text-white shadow-md"
            >
              Calculate Project Estimate →
            </Link>
            <a
              href={`https://wa.me/919677708535?text=${encodeURIComponent('Hi TruPaintz team!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center rounded-xl border border-neutral-300 py-2.5 text-xs font-semibold text-neutral-800 bg-white"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
