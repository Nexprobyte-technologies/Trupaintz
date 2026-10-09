import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import { 
  Calculator, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Download,
  Info
} from 'lucide-react';
import { ServiceCostExportModal } from '../components/ServiceCostExportModal';

export const EstimatorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { triggerBookingConfirmation } = useNotification();

  const initialServiceFromQuery = searchParams.get('service') || 'Italian Stucco + Premium Painting';
  const initialSqftFromQuery = searchParams.get('sqft') ? Number(searchParams.get('sqft')) : 1800;

  const [propertyType, setPropertyType] = useState('3BHK Apartment');
  const [serviceScope, setServiceScope] = useState(initialServiceFromQuery);
  const [tier, setTier] = useState<'luxury' | 'ultra' | 'heritage'>('luxury');
  const [sqft, setSqft] = useState(initialSqftFromQuery);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Booking Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('10:00 AM – 12:00 PM');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  // Update if query params change
  useEffect(() => {
    const queryService = searchParams.get('service');
    if (queryService) setServiceScope(queryService);
    const querySqft = searchParams.get('sqft');
    if (querySqft) setSqft(Number(querySqft));
  }, [searchParams]);

  // Cost calculation formula based on official pricing
  const getRatePerSqFt = () => {
    if (serviceScope.includes('UPVC')) {
      // EITI 2.5mm / BADYEE 2mm pricing:
      // Fixed: 290-310, Sliding: 340-360, Open: 440-460, Woodgrain Colours: 800-1200
      if (tier === 'heritage') return 850; // Woodgrain finish (Golden Oak / Dark Oak)
      if (tier === 'ultra') return 450;    // Open Casement (EITI ₹460 / BADYEE ₹440)
      return 350;                         // Sliding (EITI ₹360 / BADYEE ₹340)
    }
    if (serviceScope.includes('Mosquito') || serviceScope.includes('Netlon')) {
      // Saint-Gobain Netlon rates: Magnet: 300, Normal lock: 250, Pleated: 300, Velcro: 60
      if (tier === 'heritage') return 300; // Pleated / Magnetic Door
      if (tier === 'ultra') return 250;    // Normal lock hinged aluminium frame
      return 60;                          // Velcro stapler stitch
    }

    let base = 35;
    if (serviceScope.includes('Stucco') || serviceScope.includes('Italian')) base += 45;
    if (serviceScope.includes('Modular') || serviceScope.includes('Kitchen')) base += 60;
    if (serviceScope.includes('Ceiling')) base += 25;
    if (serviceScope.includes('Waterproofing')) base += 20;

    if (tier === 'heritage') base *= 1.35;
    if (tier === 'ultra') base *= 1.20;
    return Math.round(base);
  };

  const rate = getRatePerSqFt();
  const materialCost = Math.round(sqft * rate * 0.62);
  const laborAndMechanizedCost = Math.round(sqft * rate * 0.38);
  const totalEstimatedCost = materialCost + laborAndMechanizedCost;
  const estimatedDays = Math.max(7, Math.round(sqft / 120));

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setFormError('Please fill in your name, phone number, email, and property address.');
      return;
    }

    if (!/^\+?[0-9\s-]{8,15}$/.test(phone)) {
      setFormError('Please enter a valid phone number for site visit confirmation.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      triggerBookingConfirmation({
        id: `BK-${Date.now()}`,
        fullName,
        email,
        phone,
        propertyType,
        serviceRequired: serviceScope,
        tier: tier.toUpperCase(),
        estimatedBudget: totalEstimatedCost,
        approxSqFt: sqft,
        preferredDate,
        preferredTime,
        address,
        notes,
        createdAt: new Date().toLocaleDateString(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-28 space-y-8 sm:space-y-12 lg:space-y-14">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
          <Calculator className="h-3.5 w-3.5" />
          <span>Transparent Cost Calculator</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">
          Instant Estimation &amp; Site Inspection
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Calculate transparent project costs based on your carpet area, finish specifications, and schedule a complimentary site moisture inspection.
        </p>
      </div>

      {/* Main Grid: Calculator on Left, Booking Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Calculator Parameters & Breakdown */}
        <div className="lg:col-span-7 rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h2 className="font-display text-2xl font-bold text-neutral-950">
              Project Parameters
            </h2>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-4"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export PDF Quote</span>
            </button>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              Property Layout
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                '2BHK Apartment',
                '3BHK Apartment',
                '4BHK Apartment',
                'Penthouse / Duplex',
                'Luxury Villa',
                'Commercial Studio',
              ].map((prop) => (
                <button
                  key={prop}
                  type="button"
                  onClick={() => setPropertyType(prop)}
                  className={`p-2.5 rounded-xl border text-xs font-medium text-center transition-all ${
                    propertyType === prop
                      ? 'border-amber-600 bg-amber-500/10 text-amber-900 font-semibold shadow-sm'
                      : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {prop}
                </button>
              ))}
            </div>
          </div>

          {/* Square Footage Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-neutral-900 mb-2">
              <span className="uppercase tracking-wider">Estimated Area</span>
              <span className="font-mono text-base font-bold text-amber-700">{sqft} sq.ft</span>
            </div>
            <input
              type="range"
              min={500}
              max={6000}
              step={100}
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>500 sq.ft (Studio)</span>
              <span>2,500 sq.ft (Villa Floor)</span>
              <span>6,000 sq.ft (Bunglow)</span>
            </div>
          </div>

          {/* Service Scope Selection */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              Service Scope
            </label>
            <select
              value={serviceScope}
              onChange={(e) => setServiceScope(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
            >
              <option value="UPVC Windows & Doors">UPVC Windows &amp; Doors (EITI 2.5mm / BADYEE 2mm)</option>
              <option value="Painting">Dustless Home Painting (Interior &amp; Exterior)</option>
              <option value="Curtains">Curtains &amp; Designer Drapery</option>
              <option value="Blinds">Window Blinds (Roller, Zebra, Bamboo, Venetian)</option>
              <option value="Wallpapers">Designer Wallpapers (57 sq.ft / Roll)</option>
              <option value="Wooden Flooring">Wooden Flooring (Action Tesa &amp; Surya)</option>
              <option value="False Ceiling">False Ceiling (Saint-Gobain Gyproc &amp; USG Boral)</option>
              <option value="Netlon / Mosquito Nets">Netlon / Mosquito Nets (Saint-Gobain Mesh)</option>
              <option value="Louvers">Architectural Louvers (Shore &amp; Charcoal Fluted)</option>
              <option value="Artificial Grass">Artificial Grass (25mm–50mm Landscape Turf)</option>
            </select>
          </div>

          {/* Finish Quality Tier */}
          <div>
            <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
              Finish Grade
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'luxury', label: 'Classic Luxury', desc: 'Premium Emulsion + Accent' },
                { id: 'ultra', label: 'Ultra Artisanal', desc: 'Venetian Plaster Accents' },
                { id: 'heritage', label: 'Heritage Italian', desc: 'Full Marble Stucco' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTier(t.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    tier === t.id
                      ? 'border-amber-600 bg-amber-500/15 text-amber-950 font-semibold shadow-sm'
                      : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <p className="text-xs font-bold">{t.label}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Itemized Calculation Summary Card */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-amber-200/60">
              <span className="text-neutral-600">Material &amp; Imported Mineral Base (62%):</span>
              <span className="font-mono font-semibold text-neutral-900">₹{materialCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-amber-200/60">
              <span className="text-neutral-600">Mechanized HEPA Sanding &amp; Master Artisans (38%):</span>
              <span className="font-mono font-semibold text-neutral-900">₹{laborAndMechanizedCost.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-amber-200/60">
              <span className="text-neutral-600">Estimated Duration:</span>
              <span className="font-mono font-semibold text-neutral-900">{estimatedDays} Working Days</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs font-bold text-neutral-950 uppercase tracking-wider block">
                  Total Estimated Investment
                </span>
                <span className="text-[11px] text-neutral-500">
                  Approx. ₹{rate}/sq.ft comprehensive
                </span>
              </div>
              <span className="font-display text-2xl sm:text-3xl font-bold text-amber-800">
                ₹{totalEstimatedCost.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Info className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Includes 10-Year Adhesion Warranty, primer coats, and white-glove site protection.</span>
          </div>
        </div>

        {/* Right Column: Site Consultation Booking Form */}
        <div className="lg:col-span-5 rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
          <div className="pb-4 border-b border-neutral-100">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Step 2 · Zero Obligation
            </span>
            <h2 className="font-display text-2xl font-bold text-neutral-950 mt-1">
              Schedule Free Site Visit
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Our engineer will bring physical swatches and inspect substrate moisture.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-neutral-950">
                Site Inspection Confirmed!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you <strong>{fullName}</strong>. Your appointment for <strong>{preferredDate}</strong> ({preferredTime}) is logged. Our senior project engineer will reach you shortly on <strong>{phone}</strong>.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Modify or Book Another Visit
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Iyer"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98450 12345"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ramesh@gmail.com"
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Site Address / Apartment Details *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 402, Oakwood Residences, Sarjapur Main Road"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-800 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM</option>
                    <option value="02:00 PM – 04:00 PM">02:00 PM – 04:00 PM</option>
                    <option value="05:00 PM – 07:00 PM">05:00 PM – 07:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Special Notes or Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Interested in Roman Stucco for main hall, want digital moisture inspection."
                  className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-premium rounded-xl bg-amber-600 py-3.5 text-xs font-semibold text-white shadow-md hover:bg-amber-500 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Confirming Visit...' : 'Confirm Free Site Visit & Receive Estimate →'}
              </button>

              <p className="text-[10px] text-center text-neutral-400">
                Zero obligation. Free physical Italian texture swatch samples delivered on site.
              </p>
            </form>
          )}
        </div>

      </div>

      {/* Export Modal */}
      <ServiceCostExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        projectName={`${propertyType} (${serviceScope})`}
        clientName={fullName || 'Prospective Client Estimate'}
        totalCost={totalEstimatedCost}
        sqft={sqft}
        serviceScope={serviceScope}
      />

    </div>
  );
};
