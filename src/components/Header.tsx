import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Calculator, 
  Layers, 
  Image as GalleryIcon,
  Star, 
  ArrowRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Direct visible links requested by user:
  // Home, About Us, Projects, Contact Us
  const DIRECT_NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact Us' },
  ];

  // Remaining items in the dropdown menu:
  const DROPDOWN_ITEMS = [
    {
      to: '/services',
      label: 'Our Services',
      desc: 'UPVC windows, Saint-Gobain nets, flooring & interiors',
      icon: Layers,
    },
    {
      to: '/gallery',
      label: 'Gallery',
      desc: 'All categories: UPVC, mosquito net, flooring & decor',
      icon: GalleryIcon,
    },
    {
      to: '/visualizer',
      label: '3D Studio',
      desc: 'Simulate Italian stuccos and lighting in real time',
      icon: Sparkles,
    },
    {
      to: '/estimator',
      label: 'Cost Estimator',
      desc: 'Transparent sq.ft calculation & site visit booking',
      icon: Calculator,
    },
    {
      to: '/reviews',
      label: 'Reviews',
      desc: 'Verified homeowner milestone inspections & feedback',
      icon: Star,
    },
  ];

  const isDropdownActive = DROPDOWN_ITEMS.some((item) => location.pathname === item.to);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-amber-900/10 bg-[#FAF7F2]/98 backdrop-blur-md shadow-xs transition-all duration-200">
      <div className="mx-auto flex h-16 sm:h-20 max-w-screen-2xl w-full items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-12">
        
        {/* Brand Logo with letter "TP" */}
        <Link
          to="/"
          className="group flex items-center gap-3 text-left focus:outline-none shrink-0 mr-4"
          aria-label="TruPaintz and Interiors Home"
        >
          {/* Letter "TP" Logo Badge */}
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-md ring-2 ring-amber-400/40 shrink-0 font-serif font-bold text-base sm:text-lg tracking-wider transition-transform duration-300 group-hover:scale-105">
            TP
          </div>

          <div className="flex flex-col">
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-amber-700 leading-tight whitespace-nowrap">
              TruPaintz &amp; Interiors
            </span>
            <span className="hidden xs:block text-[9px] uppercase tracking-widest text-amber-800 font-semibold leading-none">
              Interior Architecture
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links:
            Home, About Us, Projects, Contact Us + Dropdown for remaining */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-medium tracking-wide text-neutral-600">
          
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

          {/* 3. Projects */}
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `nav-link-animated py-1 transition-colors whitespace-nowrap ${
                isActive ? 'text-amber-800 font-bold active' : 'hover:text-neutral-950 text-neutral-700'
              }`
            }
          >
            Projects
          </NavLink>

          {/* 4. Dropdown Menu for All Remaining Items */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setIsDropdownOpen(true)}
              className={`nav-link-animated flex items-center gap-1.5 py-1 font-medium transition-colors cursor-pointer ${
                isDropdownActive || isDropdownOpen
                  ? 'text-amber-800 font-bold'
                  : 'text-neutral-700 hover:text-neutral-950'
              }`}
              aria-expanded={isDropdownOpen}
            >
              <span>Explore More</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180 text-amber-700' : 'text-neutral-500'
                }`}
              />
            </button>

            {/* Dropdown Card */}
            {isDropdownOpen && (
              <div
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 rounded-2xl border border-amber-900/15 bg-white/98 p-3 shadow-2xl backdrop-blur-xl z-50 animate-scale-in"
              >
                <div className="space-y-1">
                  {DROPDOWN_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsDropdownOpen(false)}
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

        {/* Right Actions: Primary CTA (No Notification Bell) */}
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
            {DIRECT_NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-600 text-white font-semibold shadow-sm'
                      : 'text-neutral-700 hover:bg-amber-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile Dropdown Section */}
            <div className="pt-2 border-t border-neutral-200">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-neutral-800 rounded-xl hover:bg-amber-50 cursor-pointer"
              >
                <span>Explore More</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMobileDropdownOpen && (
                <div className="pl-3 pt-1 space-y-1">
                  {DROPDOWN_ITEMS.map((item) => {
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
