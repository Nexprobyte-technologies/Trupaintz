import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  Paintbrush, 
  Ruler, 
  Award, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Instagram,
  HeartHandshake
} from 'lucide-react';
import { BRAND_INFO, BLOG_POSTS } from '../data/mockData';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-1 sm:pt-2 pb-10 sm:pb-12 space-y-6 sm:space-y-8">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
          <Award className="h-3.5 w-3.5" />
          <span>About TruPaintz &amp; Interiors</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
          Crafting Living Spaces with Enduring Integrity
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          We founded TruPaintz &amp; Interiors to bring architectural rigor, imported Italian plaster craftsmanship, and completely dustless execution to Indian homes.
        </p>
      </div>

      {/* Brand Story Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div className="lg:col-span-7 space-y-3.5 text-neutral-700 leading-relaxed text-sm sm:text-base">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
            Why We Reject Ordinary Paint Practices
          </h2>
          <p>
            Standard residential painting often involves manual dry sanding that coats every surface in hazardous chalk dust, paints applied over wet walls without moisture checks, and finishes that peel within 18 months.
          </p>
          <p>
            At <strong>TruPaintz &amp; Interiors</strong>, we transformed the workflow into an architectural discipline. We utilize German Festool HEPA extractors for 100% dust-free wall preparation, check every square meter with digital pinless moisture meters, and specialize in authentic Italian Venetian plasters sourced directly from Novacolor in Italy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {[
              '10-Year Adhesion & Anti-Peel Warranty',
              'Mechanized Zero-Dust HEPA Sanding',
              'Imported Italian Lime & Carrara Marble',
              'Non-Destructive Digital Moisture Testing',
            ].map((pt, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-semibold text-neutral-900">
                <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-amber-900/15 bg-white p-3 shadow-xl">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                alt="TruPaintz Artisans at Work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-display text-base font-bold text-neutral-950">
                ArtisanMohammed &amp; Team
              </p>
              <p className="text-xs text-neutral-500">
                Master Venetian Plaster Artisans · 14+ Years Trowel Experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The 4-Step Execution Workflow */}
      <div className="space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Our Standard Operating Protocol
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
            How Every Space is Engineered
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Substrate Inspection',
              desc: 'Digital moisture testing below 10%, surface flatness mapping, and alkaline barrier primer application.',
            },
            {
              step: '02',
              title: 'Dustless Mechanized Prep',
              desc: 'Direct HEPA vacuum-connected oscillating sanders remove uneven layers with zero airborne chalk.',
            },
            {
              step: '03',
              title: 'Artisan Finish Coats',
              desc: 'Up to 3 hand-burnished trowel passes with genuine marble dust, metallic micas, or premium emulsions.',
            },
            {
              step: '04',
              title: 'White-Glove Handover',
              desc: 'Thorough cleaning, architectural cove light inspection, and 10-year written warranty certificate.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-2xl font-bold text-amber-600 block mb-3">
                  {item.step}
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Journal Articles (Clean Preview) */}
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              From Our Architectural Desk
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-neutral-950">
              Design Insights &amp; Plaster Alchemy
            </h2>
          </div>
          <a
            href={BRAND_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>Follow {BRAND_INFO.instagramHandle}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl border border-neutral-200/90 bg-white p-4 sm:p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-neutral-100">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px] text-amber-700 font-semibold mb-1">
                  {post.category} · {post.readTime}
                </div>
                <h3 className="font-display text-base font-bold text-neutral-950">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-400">
                {post.publishedDate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Studio Location & Consultation CTA */}
      <div className="rounded-3xl border border-amber-900/10 bg-amber-50/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <MapPin className="h-4 w-4" />
            <span>Our Experience Studios</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-neutral-950">
            Visit Our Texture &amp; Finish Gallery
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Touch full-scale profiles of EITI/BADYEE UPVC windows, Saint-Gobain mosquito nets, Action Tesa wooden flooring swatches, wallpaper rolls, designer curtains, blinds, and architectural louvers in person.
          </p>
        </div>

        <Link
          to="/contact"
          className="btn-premium rounded-xl bg-amber-600 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-amber-500 transition-all shrink-0"
        >
          Book Studio Visit / Contact Us →
        </Link>
      </div>

    </div>
  );
};
