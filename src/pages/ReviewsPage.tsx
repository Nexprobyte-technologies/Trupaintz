import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useReviews } from '../context/ReviewsContext';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  ThumbsUp,
  X
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { reviews, addMilestoneReview, averageRating, totalReviews } = useReviews();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'stucco' | 'prep' | 'ceiling' | 'windows'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New review form
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [milestone, setMilestone] = useState('UPVC Windows & Netlon Door Installation');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('Bengaluru');

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === 'all') return true;
    const lower = (r.milestoneReviewed + ' ' + r.title + ' ' + r.comment).toLowerCase();
    if (selectedFilter === 'stucco') return lower.includes('stucco') || lower.includes('lime') || lower.includes('plaster');
    if (selectedFilter === 'prep') return lower.includes('prep') || lower.includes('sanding') || lower.includes('dust');
    if (selectedFilter === 'ceiling') return lower.includes('ceiling') || lower.includes('track') || lower.includes('cove');
    if (selectedFilter === 'windows') return lower.includes('upvc') || lower.includes('window') || lower.includes('netlon') || lower.includes('door');
    return true;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !comment.trim() || !title.trim()) return;

    addMilestoneReview({
      clientName,
      projectName,
      milestoneReviewed: milestone,
      rating,
      title,
      comment,
      location,
      aspects: { craftsmanship: rating, punctuality: 5, cleanliness: 5 },
    });

    setIsAddModalOpen(false);
    setClientName('');
    setProjectName('');
    setTitle('');
    setComment('');
  };

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified Homeowner Feedback</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">
            Milestone Quality Signoffs
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Real feedback collected at completion of substrate preparation, Italian stucco burnishing, and handover inspections.
          </p>
        </div>

        {/* Rating Score Card */}
        <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-neutral-200/90 shadow-sm shrink-0">
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <div className="border-l border-neutral-200 pl-4">
            <span className="font-mono text-xl font-bold text-neutral-950 block">
              {averageRating} / 5.0
            </span>
            <span className="text-xs text-neutral-500">
              {totalReviews} Verified Inspections
            </span>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs & Add Review Trigger */}
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 p-1 bg-white rounded-2xl border border-neutral-200/90 shadow-sm">
          {[
            { id: 'all', label: 'All Inspections' },
            { id: 'stucco', label: 'Italian Stucco' },
            { id: 'prep', label: 'Dustless Prep' },
            { id: 'ceiling', label: 'False Ceiling & Cove' },
            { id: 'windows', label: 'UPVC & Windows' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedFilter === f.id
                  ? 'bg-amber-600 text-white font-semibold shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-xl border border-amber-600 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-500/20 transition-colors"
        >
          + Submit Project Feedback
        </button>
      </div>

      {/* 3. Reviews Grid */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                <div>
                  <span className="text-xs font-bold text-neutral-900 block">{rev.clientName}</span>
                  <span className="text-[11px] text-neutral-500">{rev.projectName} · {rev.location}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 text-[10px] font-semibold text-amber-800 border border-amber-200/60 mb-2">
                  Phase: {rev.milestoneReviewed}
                </span>
                <h3 className="font-display text-lg font-bold text-neutral-950">
                  "{rev.title}"
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
              <div className="flex items-center gap-2">
                <span>Craft: <strong>{rev.aspects?.craftsmanship || 5}★</strong></span>
                <span>·</span>
                <span>Clean: <strong>{rev.aspects?.cleanliness || 5}★</strong></span>
                <span>·</span>
                <span>Time: <strong>{rev.aspects?.punctuality || 5}★</strong></span>
              </div>
              <span className="font-mono text-[11px] text-neutral-400">{rev.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 10-Year Warranty Guarantee Card */}
      <div className="mt-12 sm:mt-16 lg:mt-20 rounded-3xl border border-amber-900/10 bg-amber-50/60 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>Written Quality Commitment</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-neutral-950">
            Backed by 10-Year Adhesion &amp; Anti-Flaking Warranty
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Every home finished by TruPaintz receives an official warranty certificate covering paint adhesion, micro-crack elasticity, and Italian stucco bond strength.
          </p>
        </div>

        <Link
          to="/estimator"
          className="btn-premium rounded-xl bg-amber-600 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-amber-500 transition-all shrink-0"
        >
          Book Your Space Consultation →
        </Link>
      </div>

      {/* Add Review Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-2xl z-10 text-neutral-900">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="font-display text-2xl font-bold text-neutral-950">
              Submit Milestone Review
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Share your feedback on our craftsmanship and execution standards.
            </p>

            <form onSubmit={handleAddSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Priya Venkatesh"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Project / Apartment
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g. Prestige Willow Tree"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Vidyaranyapura, BLR"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Milestone Phase
                </label>
                <select
                  value={milestone}
                  onChange={(e) => setMilestone(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                >
                  <option value="Italian Stucco Living Elevation">Italian Stucco Living Elevation</option>
                  <option value="UPVC Windows & Netlon Door Installation">UPVC Windows &amp; Netlon Door Installation</option>
                  <option value="Action Tesa Wooden Flooring & Blinds">Action Tesa Wooden Flooring &amp; Blinds</option>
                  <option value="False Ceiling Framing & Magnetic Tracks">False Ceiling Framing &amp; Magnetic Tracks</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        rating >= num ? 'bg-amber-600 text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {num}★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Review Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Spectacular finish with zero dust in other rooms"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Detailed Feedback *
                </label>
                <textarea
                  rows={3}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the finish quality, cleanliness, and team communication..."
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
