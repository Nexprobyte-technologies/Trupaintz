import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Project, 
  ProjectCategory 
} from '../types';
import { PROJECTS_DATA } from '../data/mockData';
import { 
  Eye, 
  MapPin, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [sliderPos, setSliderPos] = useState(50);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const featured = PROJECTS_DATA.find((p) => p.featured) || PROJECTS_DATA[0];

  const getServiceAnchor = (project: Project): string => {
    if (project.id === 'proj-1') return '/services#painting';
    if (project.id === 'proj-2') return '/services#upvc';
    if (project.id === 'proj-3') return '/services#louvers';
    if (project.id === 'proj-4') return '/services#wooden-flooring';
    if (project.id === 'proj-6') return '/services#artificial-grass';
    
    const map: Record<string, string> = {
      windows: '/services#upvc',
      painting: '/services#painting',
      flooring: '/services#wooden-flooring',
      louvers: '/services#louvers',
      curtains: '/services#curtains',
      blinds: '/services#blinds',
      wallpapers: '/services#wallpapers',
      ceilings: '/services#false-ceiling',
      grass: '/services#artificial-grass',
    };
    return map[project.category] || '/services#upvc';
  };

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-10 sm:pt-14 lg:pt-16 pb-24 sm:pb-32 space-y-8 sm:space-y-10 lg:space-y-12">
      
      {/* 1. Page Header */}
      <div className="max-w-2xl space-y-2.5">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
          <Eye className="h-3.5 w-3.5" />
          <span>Curated Portfolio</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950">
          Realized Architectural Spaces
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Explore our residential renovations across Bengaluru. Filter by space type to review scopes, materials, and artisan finish details.
        </p>
      </div>

      {/* 2. Merged Showcase Section: 'All Works' Filter Box + Image Section */}
      <div className="space-y-4 sm:space-y-5">
        
        {/* Filter Pills - 'All Works' Box */}
        <div className="w-full overflow-x-auto no-scrollbar py-1">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-neutral-200/90 shadow-sm w-max max-w-none">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'windows', label: 'UPVC & Netlon' },
              { id: 'painting', label: 'Painting & Ceilings' },
              { id: 'flooring', label: 'Flooring & Blinds' },
              { id: 'louvers', label: 'Louvers & Wallpapers' },
              { id: 'curtains', label: 'Grass & Curtains' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ProjectCategory)}
                className={`px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Project: Before & After Visual Slider */}
        {featured.beforeImage && activeCategory === 'all' && (
          <div className="rounded-3xl border border-amber-900/15 bg-white p-6 sm:p-8 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Featured Transformation · Interactive Before &amp; After
              </span>
              <span className="text-xs text-neutral-500">Drag center slider to inspect</span>
            </div>

            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden select-none">
              {/* After (Completed) Image */}
              <img
                src={featured.image}
                alt="Completed Renovation"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                Completed Finish
              </span>

              {/* Before (Original) Image with clip path */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={featured.beforeImage}
                  alt="Before Renovation"
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
                />
                <span className="absolute top-4 left-4 bg-amber-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-amber-100">
                  Original Bare Site
                </span>
              </div>

              {/* Draggable Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center text-neutral-800 text-xs font-bold">
                  ⇄
                </div>
              </div>

              {/* Invisible Range Input for Slider */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                aria-label="Before and after comparison slider"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-600">
              <div>
                <strong className="text-neutral-900">{featured.title}</strong> — {featured.location} ({featured.duration})
              </div>
              <Link
                to={getServiceAnchor(featured)}
                className="font-semibold text-amber-700 hover:text-amber-800 self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Matching Service &amp; Specifications</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="card-advanced-hover rounded-3xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div>
              {/* Direct clickable Image leading to matching service */}
              <Link
                to={getServiceAnchor(project)}
                className="block relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden bg-neutral-100 cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover img-hover-zoom"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-800 uppercase tracking-wider shadow-2xs">
                  {project.categoryLabel}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-mono text-white">
                  {project.sqft} sq.ft
                </span>
              </Link>

              {/* Details */}
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-amber-600" />
                    <span>{project.location}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-neutral-400" />
                    <span>{project.duration}</span>
                  </span>
                </div>

                <Link
                  to={getServiceAnchor(project)}
                  className="block font-display text-xl font-bold text-neutral-950 group-hover:text-amber-700 transition-colors"
                >
                  {project.title}
                </Link>

                <p className="mt-2 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Materials Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.materials.slice(0, 2).map((mat, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-neutral-100 text-[11px] text-neutral-700"
                    >
                      {mat}
                    </span>
                  ))}
                  {project.materials.length > 2 && (
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-[11px] text-neutral-500">
                      +{project.materials.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 sm:p-5 lg:p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between">
              <Link
                to={getServiceAnchor(project)}
                className="text-xs font-semibold text-neutral-900 hover:text-amber-700 flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Service Details</span>
                <ArrowRight className="h-3.5 w-3.5 text-amber-600" />
              </Link>

              <Link
                to={`/estimator?service=${encodeURIComponent(project.categoryLabel)}`}
                className="text-xs font-semibold text-amber-700 hover:text-amber-800"
              >
                Estimate Similar Space
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
