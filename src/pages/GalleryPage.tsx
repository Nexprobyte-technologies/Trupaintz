import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GALLERY_DATA } from '../data/mockData';
import { GalleryCategory, GalleryItem } from '../types';
import { 
  Sparkles, 
  Eye, 
  X, 
  ArrowRight, 
  Maximize2, 
  CheckCircle2, 
  PhoneCall,
  Download
} from 'lucide-react';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Furniture',
  'Headboards',
  'Mattress',
  'Flooring',
  'Rugs',
  'Blinds',
  'Wallpapers',
  'Curtains',
  'Interior Design',
  'Architecture',
];

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((item) => item.category === selectedCategory);

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Curated Design Gallery</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">
            Interior Finishes &amp; Furnishings Showcase
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Discover our comprehensive craftsmanship catalog across furniture, custom headboards, hotel-grade mattresses, hardwood flooring, rugs, blinds, wallpapers, and turnkey architecture.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/estimator"
            className="btn-premium rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-500 transition-all"
          >
            Calculate Estimate →
          </Link>
        </div>
      </div>

      {/* Filter Category Tabs (Horizontal Scrollable on Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            style={{
              animationDelay: `${(index % 8) * 60}ms`,
              transform: 'translateY(0)',
            }}
            className="bounce-card card-hover-lift rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Image Container with overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover img-hover-zoom transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-800 shadow-sm uppercase tracking-wider">
                  {item.categoryLabel}
                </span>

                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="rounded-full bg-white/90 p-2 text-neutral-900 shadow-md">
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 sm:p-5">
                <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 group-hover:text-amber-700 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 text-[10px] font-medium text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-neutral-100 flex items-center justify-between text-xs text-amber-700 font-semibold">
              <span>View Details</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal for Item */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
          <div className="fixed inset-0" onClick={() => setActiveItem(null)} />
          <div className="relative w-full max-w-2xl rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-8 shadow-2xl z-10 text-neutral-900 max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              {activeItem.categoryLabel}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              {activeItem.title}
            </h3>

            <div className="mt-4 aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {activeItem.description}
            </p>

            {activeItem.tags && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {activeItem.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 text-xs font-semibold border border-amber-200/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setActiveItem(null)}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-800"
              >
                Close
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  to={`/contact?project=${encodeURIComponent(activeItem.title)}`}
                  onClick={() => setActiveItem(null)}
                  className="w-full sm:w-auto text-center rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
                >
                  Inquire About This Design →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Banner */}
      <div className="rounded-3xl border border-amber-900/10 bg-amber-50/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Custom Manufacturing &amp; Turnkey Supply
          </span>
          <h3 className="font-display text-2xl font-bold text-neutral-950">
            Need Custom Dimensions, Fabrics or Swatches?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Our materials team can bring physical fabric catalogues, Italian wood polish swatches, and wallpaper catalogs directly to your home.
          </p>
        </div>

        <Link
          to="/contact"
          className="btn-premium rounded-xl bg-amber-600 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-amber-500 transition-all shrink-0"
        >
          Book Studio Material Consultation →
        </Link>
      </div>

    </div>
  );
};
