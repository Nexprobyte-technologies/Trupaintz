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
  Ruler, 
  X, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Star 
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const featured = PROJECTS_DATA.find((p) => p.featured) || PROJECTS_DATA[0];

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 py-8 sm:py-12 lg:py-16 space-y-10 sm:space-y-14 lg:space-y-16">
      
      {/* Page Header */}
      <div className="flex flex-col gap-6 pb-6 border-b border-neutral-200">
        <div className="max-w-2xl space-y-3">
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

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-neutral-200/90 shadow-sm w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Works' },
            { id: 'living', label: 'Luxury Living' },
            { id: 'kitchen', label: 'Modular Kitchens' },
            { id: 'texture', label: 'Italian Texture' },
            { id: 'bedroom', label: 'Master Suites' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as ProjectCategory)}
              className={`flex-1 sm:flex-none px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-medium transition-all ${
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
            <button
              onClick={() => setSelectedProject(featured)}
              className="font-semibold text-amber-700 hover:text-amber-800 self-start sm:self-auto"
            >
              View Full Gallery &amp; Specifications →
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="card-hover-lift rounded-3xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm flex flex-col justify-between group"
          >
            <div>
              {/* Image */}
              <div className="relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover img-hover-zoom"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  {project.categoryLabel}
                </span>
                <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-mono text-white">
                  {project.sqft} sq.ft
                </span>
              </div>

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

                <h3 className="font-display text-xl font-bold text-neutral-950 group-hover:text-amber-700 transition-colors">
                  {project.title}
                </h3>

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
              <button
                onClick={() => {
                  setSelectedProject(project);
                  setActiveGalleryIndex(0);
                }}
                className="text-xs font-semibold text-neutral-800 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View Details</span>
                <ArrowRight className="h-3 w-3" />
              </button>

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

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="fixed inset-0" onClick={() => setSelectedProject(null)} />
        <div className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-amber-900/15 bg-white p-4 sm:p-6 lg:p-8 shadow-2xl z-10 text-neutral-900 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Tag & Title */}
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              {selectedProject.categoryLabel} · {selectedProject.location}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 mt-1">
              {selectedProject.title}
            </h3>

            {/* Active Gallery Image */}
            <div className="mt-4 aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950">
              <img
                src={selectedProject.gallery[activeGalleryIndex] || selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnails */}
            {selectedProject.gallery.length > 1 && (
              <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                {selectedProject.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGalleryIndex(i)}
                    className={`h-14 w-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeGalleryIndex === i ? 'border-amber-600 scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description & Scope */}
            <div className="mt-5 space-y-3">
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {selectedProject.description}
              </p>
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs">
                <span className="font-semibold text-amber-900">Project Scope: </span>
                <span className="text-neutral-700">{selectedProject.scope}</span>
              </div>
            </div>

            {/* Materials Used */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Materials &amp; Finishes Specified
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
                {selectedProject.materials.map((mat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Quote */}
            {selectedProject.clientReview && (
              <div className="mt-5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(selectedProject.clientReview.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="italic text-neutral-700">
                  "{selectedProject.clientReview.quote}"
                </p>
                <p className="mt-1 font-semibold text-neutral-900">
                  — {selectedProject.clientReview.author}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-medium text-neutral-500 hover:text-neutral-800"
              >
                Close
              </button>
              <Link
                to={`/contact?project=${encodeURIComponent(selectedProject.title)}`}
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto text-center rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
              >
                Inquire About a Project Like This →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
