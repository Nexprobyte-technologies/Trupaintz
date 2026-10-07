import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  ArrowRight, 
  X, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 py-10 sm:py-16 space-y-16">
      
      {/* Header section with exact requested title & subtitle */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="uppercase tracking-widest font-bold">OUR SERVICES</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">
          Discover Our Complete Interior Design Solutions
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
          From custom hardwood flooring and turnkey architectural interior designs to motorized drapery, luxury wallpapers, and bespoke furniture crafted for discerning homeowners.
        </p>
      </div>

      {/* 10 Services Grid (Numbered 01 to 10) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className="card-hover-lift rounded-3xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div>
              {/* Service Image with Number Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover img-hover-zoom"
                />

                {/* Number Badge (01, 02, etc.) */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neutral-950/85 backdrop-blur-md font-mono text-xs font-bold text-amber-400 border border-amber-400/30 shadow-md">
                    {service.num}
                  </span>
                  <span className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-800 shadow-sm uppercase tracking-wider">
                    {service.highlightTag}
                  </span>
                </div>

                <span className="absolute bottom-3 right-3 bg-neutral-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-white">
                  {service.priceRange}
                </span>
              </div>

              {/* Service Details */}
              <div className="p-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-amber-700 font-bold text-sm">
                    {service.num}.
                  </span>
                  <h2 className="font-display text-2xl font-bold text-neutral-950 group-hover:text-amber-700 transition-colors">
                    {service.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="mt-5 space-y-2 border-t border-neutral-100 pt-4">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                      <Check className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Action Links */}
            <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(service)}
                className="text-xs font-semibold text-neutral-700 hover:text-neutral-950 underline underline-offset-4 cursor-pointer"
              >
                Full Scope
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to={`/gallery`}
                  className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Gallery
                </Link>

                <Link
                  to={`/estimator?service=${encodeURIComponent(service.title)}`}
                  className="btn-premium inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-500 transition-all"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Estimate</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Craftsmanship Standards Guarantee Banner */}
      <div className="rounded-3xl border border-amber-900/10 bg-amber-50/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>Integrated Architectural Execution</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
            End-to-End Coordination Under One Studio Roof
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Eliminate conflicting contractors. From initial subfloor preparation and electrical conduit tracks to custom upholstery, wallpapers, and final handover, our studio supervises every milestone.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            to="/gallery"
            className="rounded-xl border border-neutral-300 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-neutral-800 hover:bg-neutral-50 transition-all text-center"
          >
            Explore Design Gallery
          </Link>

          <Link
            to="/contact"
            className="btn-premium rounded-xl bg-amber-600 px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-amber-500 transition-all text-center"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>

      {/* Service Scope Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="fixed inset-0" onClick={() => setSelectedService(null)} />
          <div className="relative w-full max-w-xl rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-8 shadow-2xl z-10 text-neutral-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Service {selectedService.num} · {selectedService.highlightTag}
            </span>
            <h3 className="font-display text-2xl font-bold text-neutral-950 mt-1">
              {selectedService.title}
            </h3>
            <p className="font-mono text-xs text-neutral-500 mt-1">
              Price Range: {selectedService.priceRange}
            </p>

            <div className="mt-4 aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="mt-5 space-y-2.5">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Specifications &amp; What's Included
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                {selectedService.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-800"
              >
                Close
              </button>
              <Link
                to={`/estimator?service=${encodeURIComponent(selectedService.title)}`}
                onClick={() => setSelectedService(null)}
                className="rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
              >
                Get Estimate for this Service →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
