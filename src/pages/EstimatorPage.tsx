import React, { useState, useEffect, useMemo } from 'react';
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
  ArrowLeft,
  Download,
  Info,
  Check,
  Plus,
  Minus,
  Home,
  Bed,
  Utensils,
  Sofa,
  Bath,
  Trees,
  Award,
  Phone,
  Send,
  FileText,
  ChevronRight,
  SlidersHorizontal,
  MapPin,
  MessageCircle,
  Layers,
  Wrench,
  CheckCheck,
  RotateCcw
} from 'lucide-react';
import { ServiceCostExportModal } from '../components/ServiceCostExportModal';
import { BRAND_INFO } from '../data/mockData';

// --- DATA DEFINITIONS (Decorpot Style) ---

export interface BhkConfig {
  id: string;
  name: string;
  badge: string;
  sqft: number;
  icon: string;
  defaultRooms: {
    kitchen: number;
    living: number;
    masterBed: number;
    guestBed: number;
    kidsBed: number;
    bathrooms: number;
    balcony: number;
    foyer: number;
  };
}

export const BHK_OPTIONS: BhkConfig[] = [
  {
    id: '1bhk',
    name: '1 BHK',
    badge: 'Compact Home',
    sqft: 650,
    icon: '🏢',
    defaultRooms: {
      kitchen: 1,
      living: 1,
      masterBed: 1,
      guestBed: 0,
      kidsBed: 0,
      bathrooms: 1,
      balcony: 1,
      foyer: 0,
    },
  },
  {
    id: '2bhk',
    name: '2 BHK',
    badge: 'Most Popular',
    sqft: 1100,
    icon: '🏡',
    defaultRooms: {
      kitchen: 1,
      living: 1,
      masterBed: 1,
      guestBed: 1,
      kidsBed: 0,
      bathrooms: 2,
      balcony: 1,
      foyer: 1,
    },
  },
  {
    id: '3bhk',
    name: '3 BHK',
    badge: 'Spacious Family',
    sqft: 1550,
    icon: '🏠',
    defaultRooms: {
      kitchen: 1,
      living: 1,
      masterBed: 1,
      guestBed: 1,
      kidsBed: 1,
      bathrooms: 2,
      balcony: 2,
      foyer: 1,
    },
  },
  {
    id: '4bhk',
    name: '4 BHK',
    badge: 'Luxury Living',
    sqft: 2250,
    icon: '🏰',
    defaultRooms: {
      kitchen: 1,
      living: 1,
      masterBed: 1,
      guestBed: 2,
      kidsBed: 1,
      bathrooms: 3,
      balcony: 2,
      foyer: 1,
    },
  },
  {
    id: 'villa',
    name: '5+ BHK / Villa',
    badge: 'Exclusive Estate',
    sqft: 3400,
    icon: '🏛️',
    defaultRooms: {
      kitchen: 1,
      living: 2,
      masterBed: 1,
      guestBed: 2,
      kidsBed: 2,
      bathrooms: 4,
      balcony: 3,
      foyer: 1,
    },
  },
];

export type PackageTier = 'essential' | 'premium' | 'luxury';

export interface TierInfo {
  id: PackageTier;
  name: string;
  tagline: string;
  badge: string;
  multiplier: number;
  materials: {
    woodwork: string;
    finish: string;
    hardware: string;
    paint: string;
    ceilings: string;
    warranty: string;
    handover: string;
  };
}

export const TIERS_INFO: Record<PackageTier, TierInfo> = {
  essential: {
    id: 'essential',
    name: 'Essential Package',
    tagline: 'Budget-friendly, highly functional & clean modular aesthetics',
    badge: 'Value Choice',
    multiplier: 1.0,
    materials: {
      woodwork: 'Commercial MR Plywood (IS 303 Grade)',
      finish: '0.8mm Matte Anti-Scratch Laminates',
      hardware: 'Standard Soft-Close Hinges & Telescopic Channels',
      paint: 'Asian Paints Tractor / Premium Emulsion (Dustless HEPA Sanding)',
      ceilings: 'Perimeter Step Borders with Basic LED Coves',
      warranty: '3 Years Written Warranty',
      handover: '30 Working Days Guaranteed',
    },
  },
  premium: {
    id: 'premium',
    name: 'Premium Package',
    tagline: 'High-durability BWP marine ply, acrylic finishes & smart coves',
    badge: 'Most Popular · Recommended',
    multiplier: 1.45,
    materials: {
      woodwork: '100% BWR/BWP Marine Grade Plywood (IS 710)',
      finish: '1mm High-Gloss & Anti-Fingerprint Acrylic Laminates',
      hardware: 'Hettich / Hafele Soft-Close Quadra Tandem Boxes',
      paint: 'Asian Paints Royale Silk with Teflon Surface Protection',
      ceilings: 'Saint-Gobain Gyproc Monolithic Ceilings + Warm LED Coves',
      warranty: '10 Years Written Comprehensive Warranty',
      handover: '40 Working Days Guaranteed',
    },
  },
  luxury: {
    id: 'luxury',
    name: 'Luxury Villa Package',
    tagline: 'Imported veneers, PU lacquer, fluted louvers & Italian stucco',
    badge: 'Architectural Haute Couture',
    multiplier: 2.1,
    materials: {
      woodwork: '100% Calibrated BWP Marine Ply + 16mm Louver Panels',
      finish: 'PU Gloss/Matte Polish, European Natural Wood Veneers & Tinted Glass',
      hardware: 'Blum / Hafele Push-to-Open Motorized Automation',
      paint: 'Authentic Italian Venetian Stucco & Velvet Royale Plasters',
      ceilings: 'Saint-Gobain Magnetic Track Lights + Wooden Fluted Accents',
      warranty: '15–20 Years Written Heirlooom Warranty',
      handover: '45 Working Days Guaranteed',
    },
  },
};

export const EstimatorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { triggerBookingConfirmation } = useNotification();

  // Active Wizard Step (1: BHK & Area, 2: Room Customizer, 3: Quality Tier, 4: Estimate & Booking)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Property Config
  const [selectedBhkId, setSelectedBhkId] = useState<string>('2bhk');
  const [propertyType, setPropertyType] = useState<string>('Apartment');
  const [projectScope, setProjectScope] = useState<'new' | 'renovation'>('new');
  const [timeline, setTimeline] = useState<string>('Ready to Move (Under 30 Days)');
  const [sqft, setSqft] = useState<number>(1100);

  // Step 2: Rooms & Quantities
  const [rooms, setRooms] = useState({
    kitchen: 1,
    living: 1,
    masterBed: 1,
    guestBed: 1,
    kidsBed: 0,
    bathrooms: 2,
    balcony: 1,
    foyer: 1,
  });

  // Room Specific Add-ons
  const [kitchenLayout, setKitchenLayout] = useState<'l-shape' | 'parallel' | 'straight' | 'u-shape' | 'island'>('l-shape');
  const [hasFalseCeiling, setHasFalseCeiling] = useState<boolean>(true);
  const [hasWoodenFlooring, setHasWoodenFlooring] = useState<boolean>(true);
  const [hasUpvcSliders, setHasUpvcSliders] = useState<boolean>(true);
  const [hasMosquitoNets, setHasMosquitoNets] = useState<boolean>(true);
  const [hasArtificialGrass, setHasArtificialGrass] = useState<boolean>(true);
  const [hasLouvers, setHasLouvers] = useState<boolean>(true);
  const [hasWallpapers, setHasWallpapers] = useState<boolean>(true);
  const [hasCurtains, setHasCurtains] = useState<boolean>(true);

  // Step 3: Finish Quality Tier
  const [selectedTier, setSelectedTier] = useState<PackageTier>('premium');

  // Step 4: Booking Form State
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [locality, setLocality] = useState<string>('Whitefield');
  const [preferredDate, setPreferredDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState<string>('10:00 AM – 12:00 PM');
  const [consultationType, setConsultationType] = useState<'home' | 'studio'>('home');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Handle URL Query Params on mount
  useEffect(() => {
    const queryBhk = searchParams.get('bhk');
    if (queryBhk && BHK_OPTIONS.some((b) => b.id === queryBhk)) {
      handleBhkChange(queryBhk);
    }
    const querySqft = searchParams.get('sqft');
    if (querySqft) setSqft(Number(querySqft));

    const queryTier = searchParams.get('tier') as PackageTier;
    if (queryTier && ['essential', 'premium', 'luxury'].includes(queryTier)) {
      setSelectedTier(queryTier);
    }
  }, [searchParams]);

  // When BHK changes, auto-update default rooms and estimated sqft
  const handleBhkChange = (bhkId: string) => {
    setSelectedBhkId(bhkId);
    const bhk = BHK_OPTIONS.find((b) => b.id === bhkId);
    if (bhk) {
      setSqft(bhk.sqft);
      setRooms({ ...bhk.defaultRooms });
    }
  };

  const updateRoomCount = (key: keyof typeof rooms, delta: number) => {
    setRooms((prev) => {
      const updated = Math.max(0, Math.min(8, prev[key] + delta));
      return { ...prev, [key]: updated };
    });
  };

  // --- DYNAMIC COST CALCULATION ENGINE ---
  const calculation = useMemo(() => {
    const tierMultiplier = TIERS_INFO[selectedTier].multiplier;

    // Kitchen Base (Cabinets, Countertop, Hardware)
    const kitchenBase = {
      'straight': 110000,
      'l-shape': 155000,
      'parallel': 175000,
      'u-shape': 210000,
      'island': 260000,
    }[kitchenLayout] * rooms.kitchen;

    // Living Room (TV Unit, Foyer shoe rack, Partition, Seating woodwork)
    let livingBase = rooms.living * 95000;
    if (hasLouvers) livingBase += rooms.living * 28000; // Fluted louvers panel

    // Master Bedroom (3-Door sliding wardrobe, loft, headboard, dress unit)
    let masterBedBase = rooms.masterBed * 135000;
    if (hasWoodenFlooring) masterBedBase += rooms.masterBed * 26000; // Action Tesa AC4
    if (hasCurtains) masterBedBase += rooms.masterBed * 18000;

    // Guest & Kids Bedrooms (2-Door wardrobes, beds, study desks)
    let otherBedBase = (rooms.guestBed + rooms.kidsBed) * 92000;
    if (hasWallpapers) otherBedBase += (rooms.guestBed + rooms.kidsBed) * 12000;

    // Bathrooms (Vanity cabinet, mirrors)
    const bathBase = rooms.bathrooms * 22000;

    // Balcony & Outdoor (Artificial grass, UPVC slider, Mosquito net)
    let balconyBase = rooms.balcony * 18000;
    if (hasArtificialGrass) balconyBase += rooms.balcony * 14000; // 40mm grass
    if (hasUpvcSliders) balconyBase += rooms.balcony * 38000; // Soundproof UPVC sliding door
    if (hasMosquitoNets) balconyBase += rooms.balcony * 9500; // Saint-Gobain netlon

    // Foyer
    const foyerBase = rooms.foyer * 32000;

    // Painting & Ceiling Core (calculated per sqft)
    let paintingAndCeiling = Math.round(sqft * 42); // dustless prep + primer + 2 coats
    if (hasFalseCeiling) {
      paintingAndCeiling += Math.round(sqft * 0.75 * 78); // Saint-Gobain Gyproc false ceiling covering 75% area
    }

    // Apply Tier Multipliers
    const kitchenCost = Math.round(kitchenBase * tierMultiplier);
    const livingCost = Math.round((livingBase + foyerBase) * tierMultiplier);
    const bedroomCost = Math.round((masterBedBase + otherBedBase) * tierMultiplier);
    const balconyBathCost = Math.round((balconyBase + bathBase) * tierMultiplier);
    const ceilingPaintCost = Math.round(paintingAndCeiling * (tierMultiplier === 1.0 ? 0.9 : tierMultiplier === 1.45 ? 1.3 : 1.8));

    // Renovation factor (demolition, masking, repair)
    const renovationFactor = projectScope === 'renovation' ? 1.12 : 1.0;

    const subTotal = Math.round(
      (kitchenCost + livingCost + bedroomCost + balconyBathCost + ceilingPaintCost) * renovationFactor
    );

    // Create realistic min and max price band (range)
    const minEstimate = Math.round(subTotal * 0.94);
    const maxEstimate = Math.round(subTotal * 1.08);

    const avgRatePerSqft = Math.round(subTotal / (sqft || 1));

    return {
      subTotal,
      minEstimate,
      maxEstimate,
      avgRatePerSqft,
      breakdown: [
        { label: 'Modular Kitchen & Utilities', amount: kitchenCost, icon: '🍳', pct: Math.round((kitchenCost / subTotal) * 100) },
        { label: 'Living, Foyer & Entertainment', amount: livingCost, icon: '🛋️', pct: Math.round((livingCost / subTotal) * 100) },
        { label: 'Bedrooms & Custom Wardrobes', amount: bedroomCost, icon: '🛏️', pct: Math.round((bedroomCost / subTotal) * 100) },
        { label: 'False Ceiling & Dustless Painting', amount: ceilingPaintCost, icon: '🎨', pct: Math.round((ceilingPaintCost / subTotal) * 100) },
        { label: 'Balcony Turf, UPVC & Mosquito Nets', amount: balconyBathCost, icon: '🌿', pct: Math.round((balconyBathCost / subTotal) * 100) },
      ],
    };
  }, [
    selectedBhkId,
    selectedTier,
    sqft,
    rooms,
    kitchenLayout,
    hasFalseCeiling,
    hasWoodenFlooring,
    hasUpvcSliders,
    hasMosquitoNets,
    hasArtificialGrass,
    hasLouvers,
    hasWallpapers,
    hasCurtains,
    projectScope,
  ]);

  // Handle Form Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setFormError('Please enter your full name, 10-digit phone number, and site address.');
      return;
    }

    if (!/^\+?[0-9\s-]{10,15}$/.test(phone)) {
      setFormError('Please enter a valid 10-digit mobile number for WhatsApp confirmation.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      triggerBookingConfirmation({
        id: `TP-${Date.now().toString().slice(-6)}`,
        fullName,
        email: email || 'consultation@trupaintz.in',
        phone,
        propertyType: `${BHK_OPTIONS.find((b) => b.id === selectedBhkId)?.name} ${propertyType}`,
        serviceRequired: `Complete Interior Package (${TIERS_INFO[selectedTier].name})`,
        tier: selectedTier.toUpperCase(),
        estimatedBudget: calculation.subTotal,
        approxSqFt: sqft,
        preferredDate,
        preferredTime,
        address: `${address}, ${locality}, Bengaluru`,
        notes: notes || `Scope: ${projectScope === 'new' ? 'New Home' : 'Renovation'}. Handover: ${TIERS_INFO[selectedTier].materials.handover}`,
        createdAt: new Date().toLocaleDateString('en-IN'),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const currentBhk = BHK_OPTIONS.find((b) => b.id === selectedBhkId) || BHK_OPTIONS[1];
  const currentTierInfo = TIERS_INFO[selectedTier];

  // Pre-filled WhatsApp link
  const getWhatsAppEstimateUrl = () => {
    const text = encodeURIComponent(
      `Hello TruPaintz! I calculated an interior estimate for my ${currentBhk.name} (${sqft} sq.ft) in Bangalore:\n` +
      `• Tier: ${currentTierInfo.name}\n` +
      `• Estimated Budget: ₹${calculation.minEstimate.toLocaleString()} - ₹${calculation.maxEstimate.toLocaleString()}\n` +
      `• Scope: ${projectScope === 'new' ? 'New Home' : 'Renovation'}\n` +
      `Please connect me with a senior interior architect for 3D layout inspection.`
    );
    return `https://wa.me/${BRAND_INFO.phone.replace(/[^0-9]/g, '')}?text=${text}`;
  };

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 sm:pt-10 lg:pt-12 pb-24 sm:pb-32 space-y-8 sm:space-y-10">
      
      {/* 1. HERO HEADER WITH TRUST BADGES */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-neutral-200/90">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-500/30">
            <Calculator className="h-3.5 w-3.5 text-amber-600" />
            <span className="uppercase tracking-widest">DECORPOT-STYLE TRANSPARENT COST ESTIMATOR</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950">
            Calculate Home Interior Cost in 60 Seconds
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl">
            Configure your exact BHK layout, select customized rooms, choose your material grade, and receive an instant transparent room-by-room cost breakdown.
          </p>
        </div>

        {/* Live Key Assurances */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0">
          <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs text-center">
            <span className="font-mono text-xs font-bold text-amber-700 block">40 Working Days</span>
            <span className="text-[10px] text-neutral-500">Guaranteed Handover</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs text-center">
            <span className="font-mono text-xs font-bold text-emerald-700 block">10-Yr Warranty</span>
            <span className="text-[10px] text-neutral-500">Written Legal Certificate</span>
          </div>
          <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs text-center">
            <span className="font-mono text-xs font-bold text-neutral-950 block">0% Overrun</span>
            <span className="text-[10px] text-neutral-500">Fixed Cost Quotation</span>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE STEPPER TABS (Decorpot 4-Step Flow) */}
      <div className="bg-[#FAF7F2] p-1.5 rounded-2xl border border-amber-900/10 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 text-xs font-semibold">
          {[
            { step: 1, label: '1. Property & Layout', sub: `${currentBhk.name} · ${sqft} sq.ft` },
            { step: 2, label: '2. Room Customizer', sub: `${Object.values(rooms).reduce((a, b) => a + b, 0)} Spaces Selected` },
            { step: 3, label: '3. Quality Tier', sub: `${currentTierInfo.name}` },
            { step: 4, label: '4. Estimate & Booking', sub: `₹${(calculation.subTotal / 100000).toFixed(2)} Lakhs` },
          ].map((tab) => (
            <button
              key={tab.step}
              type="button"
              onClick={() => setCurrentStep(tab.step)}
              className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                currentStep === tab.step
                  ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-600'
                  : 'bg-white/80 hover:bg-white text-neutral-800 hover:text-neutral-950 border border-neutral-200/80'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-bold">{tab.label}</span>
                {currentStep > tab.step && (
                  <CheckCheck className={`h-3.5 w-3.5 ${currentStep === tab.step ? 'text-white' : 'text-emerald-600'}`} />
                )}
              </div>
              <span className={`text-[11px] mt-0.5 truncate ${currentStep === tab.step ? 'text-amber-100' : 'text-neutral-500'}`}>
                {tab.sub}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. STEP CONTENT SECTIONS */}
      <div className="space-y-8">
        
        {/* === STEP 1: BHK & PROPERTY TYPE === */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fade-in">
            {/* BHK Cards Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl font-bold text-neutral-950 flex items-center gap-2">
                  <span>Select Your Property Configuration</span>
                  <span className="text-xs font-normal text-neutral-500">(Sets standard room layout)</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {BHK_OPTIONS.map((bhk) => (
                  <button
                    key={bhk.id}
                    type="button"
                    onClick={() => handleBhkChange(bhk.id)}
                    className={`card-advanced-hover text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                      selectedBhkId === bhk.id
                        ? 'border-amber-600 bg-amber-500/10 shadow-md ring-2 ring-amber-500/20'
                        : 'border-neutral-200/90 bg-white hover:border-amber-400/50 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{bhk.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                          {bhk.badge}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-bold text-neutral-950 group-hover:text-amber-700 transition-colors">
                        {bhk.name}
                      </h4>
                      <p className="text-xs font-mono font-medium text-amber-800 mt-0.5">
                        ~{bhk.sqft} sq.ft
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500 space-y-1">
                      <div>Kitchen: {bhk.defaultRooms.kitchen} · Living: {bhk.defaultRooms.living}</div>
                      <div>Beds: {bhk.defaultRooms.masterBed + bhk.defaultRooms.guestBed + bhk.defaultRooms.kidsBed} · Baths: {bhk.defaultRooms.bathrooms}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Area Slider & Property Parameters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Slider */}
              <div className="p-6 rounded-2xl border border-neutral-200/90 bg-white shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-950 block">
                      Built-Up / Carpet Area
                    </label>
                    <span className="text-xs text-neutral-500">Fine-tune exact square footage</span>
                  </div>
                  <span className="font-mono text-2xl font-bold text-amber-700">
                    {sqft.toLocaleString()} sq.ft
                  </span>
                </div>

                <input
                  type="range"
                  min={500}
                  max={5500}
                  step={50}
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
                />

                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>500 sq.ft</span>
                  <span>1,500 sq.ft</span>
                  <span>3,000 sq.ft</span>
                  <span>5,500+ sq.ft</span>
                </div>
              </div>

              {/* Property Scope & Status */}
              <div className="p-6 rounded-2xl border border-neutral-200/90 bg-white shadow-xs space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-950 block mb-2">
                    Project Type &amp; Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setProjectScope('new')}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                        projectScope === 'new'
                          ? 'border-amber-600 bg-amber-500/10 text-amber-950 ring-1 ring-amber-600'
                          : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="block font-bold text-sm">✨ New Home Interiors</span>
                      <span className="text-[11px] font-normal text-neutral-500">Brand new bare-shell handover</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setProjectScope('renovation')}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                        projectScope === 'renovation'
                          ? 'border-amber-600 bg-amber-500/10 text-amber-950 ring-1 ring-amber-600'
                          : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="block font-bold text-sm">🔨 Renovation / Remodel</span>
                      <span className="text-[11px] font-normal text-neutral-500">Demolition, rewire &amp; redesign</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-950 block mb-2">
                    Property Structure
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Apartment', 'Villa / Row House', 'Penthouse / Duplex', 'Independent House'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPropertyType(type)}
                        className={`px-3 py-1.5 rounded-lg border cursor-pointer font-medium transition-all ${
                          propertyType === type
                            ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Next Step Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn-premium flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-amber-500 cursor-pointer"
              >
                <span>Continue to Room Selection</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* === STEP 2: ROOM BY ROOM CUSTOMIZER === */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-neutral-200">
              <div>
                <h3 className="font-display text-xl font-bold text-neutral-950">
                  Customize Rooms &amp; Architectural Inclusions
                </h3>
                <p className="text-xs text-neutral-500">
                  Adjust room quantities with (+ / -) and select specific feature packages.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleBhkChange(selectedBhkId)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-amber-700 self-start sm:self-auto cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset to {currentBhk.name} Defaults</span>
              </button>
            </div>

            {/* Room Counters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Modular Kitchen */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-amber-50 text-amber-800 text-lg">🍳</span>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950">Modular Kitchen</h4>
                      <span className="text-[10px] text-neutral-400">Base &amp; Wall Units</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateRoomCount('kitchen', -1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-mono text-xs font-bold w-4 text-center">{rooms.kitchen}</span>
                    <button
                      type="button"
                      onClick={() => updateRoomCount('kitchen', 1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {rooms.kitchen > 0 && (
                  <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
                      Kitchen Layout:
                    </label>
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      {(['l-shape', 'parallel', 'u-shape', 'island', 'straight'] as const).map((lay) => (
                        <button
                          key={lay}
                          type="button"
                          onClick={() => setKitchenLayout(lay)}
                          className={`p-1.5 rounded border capitalize text-center cursor-pointer ${
                            kitchenLayout === lay
                              ? 'border-amber-600 bg-amber-500/10 text-amber-900 font-bold'
                              : 'border-neutral-200 text-neutral-600'
                          }`}
                        >
                          {lay.replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Living & Dining Room */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-amber-50 text-amber-800 text-lg">🛋️</span>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950">Living &amp; Dining</h4>
                      <span className="text-[10px] text-neutral-400">TV Unit, Foyer &amp; Seating</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateRoomCount('living', -1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-mono text-xs font-bold w-4 text-center">{rooms.living}</span>
                    <button
                      type="button"
                      onClick={() => updateRoomCount('living', 1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-600">TV Wall Fluted Louvers</span>
                  <input
                    type="checkbox"
                    checked={hasLouvers}
                    onChange={(e) => setHasLouvers(e.target.checked)}
                    className="accent-amber-600 cursor-pointer h-4 w-4"
                  />
                </div>
              </div>

              {/* Master Bedroom */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-amber-50 text-amber-800 text-lg">🛏️</span>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950">Master Bedroom</h4>
                      <span className="text-[10px] text-neutral-400">Sliding Wardrobe &amp; Bed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateRoomCount('masterBed', -1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-mono text-xs font-bold w-4 text-center">{rooms.masterBed}</span>
                    <button
                      type="button"
                      onClick={() => updateRoomCount('masterBed', 1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-[11px] text-neutral-600">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>AC4 Wooden Flooring</span>
                    <input
                      type="checkbox"
                      checked={hasWoodenFlooring}
                      onChange={(e) => setHasWoodenFlooring(e.target.checked)}
                      className="accent-amber-600 h-3.5 w-3.5"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Curtains Avenue Drapery</span>
                    <input
                      type="checkbox"
                      checked={hasCurtains}
                      onChange={(e) => setHasCurtains(e.target.checked)}
                      className="accent-amber-600 h-3.5 w-3.5"
                    />
                  </label>
                </div>
              </div>

              {/* Guest & Kids Bedrooms */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-amber-50 text-amber-800 text-lg">🧸</span>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950">Guest &amp; Kids Rooms</h4>
                      <span className="text-[10px] text-neutral-400">Wardrobes &amp; Study Units</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateRoomCount('guestBed', -1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-mono text-xs font-bold w-4 text-center">{rooms.guestBed + rooms.kidsBed}</span>
                    <button
                      type="button"
                      onClick={() => updateRoomCount('guestBed', 1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-neutral-600">Feature Wallpapers</span>
                  <input
                    type="checkbox"
                    checked={hasWallpapers}
                    onChange={(e) => setHasWallpapers(e.target.checked)}
                    className="accent-amber-600 cursor-pointer h-4 w-4"
                  />
                </div>
              </div>

              {/* Balconies */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-amber-50 text-amber-800 text-lg">🌿</span>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950">Balcony &amp; Deck</h4>
                      <span className="text-[10px] text-neutral-400">Turf, UPVC &amp; Nets</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateRoomCount('balcony', -1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-mono text-xs font-bold w-4 text-center">{rooms.balcony}</span>
                    <button
                      type="button"
                      onClick={() => updateRoomCount('balcony', 1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-[11px] text-neutral-600">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>40mm Artificial Turf</span>
                    <input
                      type="checkbox"
                      checked={hasArtificialGrass}
                      onChange={(e) => setHasArtificialGrass(e.target.checked)}
                      className="accent-amber-600 h-3.5 w-3.5"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Soundproof UPVC Sliders</span>
                    <input
                      type="checkbox"
                      checked={hasUpvcSliders}
                      onChange={(e) => setHasUpvcSliders(e.target.checked)}
                      className="accent-amber-600 h-3.5 w-3.5"
                    />
                  </label>
                </div>
              </div>

              {/* Bathrooms */}
              <div className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-amber-50 text-amber-800 text-lg">🚿</span>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950">Bathrooms</h4>
                      <span className="text-[10px] text-neutral-400">Vanity, Mirrors &amp; Grid</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateRoomCount('bathrooms', -1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-mono text-xs font-bold w-4 text-center">{rooms.bathrooms}</span>
                    <button
                      type="button"
                      onClick={() => updateRoomCount('bathrooms', 1)}
                      className="h-7 w-7 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                  Vanities with soft-close and anti-fog mirror panels.
                </div>
              </div>

              {/* Core Ceilings & Painting Toggle Card (Span 2) */}
              <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-xl bg-amber-500/20 text-amber-900 text-lg">🎨</span>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950">Ceiling &amp; Dustless Painting</h4>
                      <span className="text-[10px] text-amber-900">Saint-Gobain &amp; Asian Paints Royale</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-800 font-mono">Whole Home</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-amber-200/50 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer bg-white p-2 rounded-xl border border-amber-200">
                    <input
                      type="checkbox"
                      checked={hasFalseCeiling}
                      onChange={(e) => setHasFalseCeiling(e.target.checked)}
                      className="accent-amber-600 h-4 w-4"
                    />
                    <span className="text-[11px] font-semibold text-neutral-800">Saint-Gobain False Ceiling</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-white p-2 rounded-xl border border-amber-200">
                    <input
                      type="checkbox"
                      checked={hasMosquitoNets}
                      onChange={(e) => setHasMosquitoNets(e.target.checked)}
                      className="accent-amber-600 h-4 w-4"
                    />
                    <span className="text-[11px] font-semibold text-neutral-800">Saint-Gobain Mosquito Nets</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 px-4 py-2 rounded-xl border border-neutral-200 bg-white cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Property</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-premium flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-amber-500 cursor-pointer"
              >
                <span>Select Quality Package</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* === STEP 3: FINISH GRADE / PACKAGE TIER === */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="pb-2 border-b border-neutral-200">
              <h3 className="font-display text-xl font-bold text-neutral-950">
                Select Your Interior Finish Grade &amp; Material Package
              </h3>
              <p className="text-xs text-neutral-500">
                Choose between budget-smart utility, premium homeowner durability, or bespoke luxury villa specifications.
              </p>
            </div>

            {/* 3 Tier Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(TIERS_INFO) as PackageTier[]).map((tierKey) => {
                const t = TIERS_INFO[tierKey];
                const isSelected = selectedTier === tierKey;
                return (
                  <div
                    key={tierKey}
                    onClick={() => setSelectedTier(tierKey)}
                    className={`card-advanced-hover rounded-3xl p-6 border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                      isSelected
                        ? 'border-amber-600 bg-white shadow-xl ring-2 ring-amber-500/20'
                        : 'border-neutral-200/90 bg-white/80 hover:bg-white shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-xs">
                        Selected Package
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/25">
                          {t.badge}
                        </span>
                        <h4 className="font-display text-2xl font-bold text-neutral-950 mt-2">
                          {t.name}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                          {t.tagline}
                        </p>
                      </div>

                      {/* Itemized Material Specs */}
                      <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs">
                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-neutral-900 block">Woodwork Core</span>
                            <span className="text-[11px] text-neutral-600">{t.materials.woodwork}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-neutral-900 block">Surface Finish</span>
                            <span className="text-[11px] text-neutral-600">{t.materials.finish}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-neutral-900 block">Hardware &amp; Fittings</span>
                            <span className="text-[11px] text-neutral-600">{t.materials.hardware}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-neutral-900 block">Painting &amp; Ceilings</span>
                            <span className="text-[11px] text-neutral-600">{t.materials.paint}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-neutral-500">Warranty:</span>
                        <span className="text-emerald-700 font-bold">{t.materials.warranty}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-neutral-500">Handover:</span>
                        <span className="text-amber-700 font-bold">{t.materials.handover}</span>
                      </div>

                      <button
                        type="button"
                        className={`w-full mt-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                        }`}
                      >
                        {isSelected ? '✓ Selected' : 'Choose ' + t.name}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 px-4 py-2 rounded-xl border border-neutral-200 bg-white cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Rooms</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="btn-premium flex items-center gap-2 rounded-xl bg-amber-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-amber-500 cursor-pointer"
              >
                <span>View Full Estimate &amp; Breakdown</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* === STEP 4: DYNAMIC ESTIMATE & FREE CONSULTATION BOOKING === */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Room-Wise Cost Breakdown Card */}
              <div className="lg:col-span-7 rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* Total Range Header */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      Estimated Project Investment
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-600 text-white">
                      {currentTierInfo.name}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                      ₹{calculation.minEstimate.toLocaleString()} – ₹{calculation.maxEstimate.toLocaleString()}
                    </h2>
                    <span className="font-mono text-xs font-semibold text-neutral-600">
                      (Approx. ₹{calculation.avgRatePerSqft}/sq.ft comprehensive)
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 pt-1">
                    Calculated for <strong>{currentBhk.name} {propertyType}</strong> ({sqft} sq.ft) with {currentTierInfo.materials.warranty} and guaranteed handover in {currentTierInfo.materials.handover}.
                  </p>
                </div>

                {/* Visual Progress Distribution */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-neutral-800">
                    <span>Room-Wise Cost Distribution</span>
                    <span className="text-[11px] font-normal text-neutral-500">100% Itemized Upfront</span>
                  </div>

                  {/* Multi-segmented Progress Bar */}
                  <div className="h-3 w-full rounded-full bg-neutral-100 flex overflow-hidden">
                    {calculation.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        style={{ width: `${item.pct}%` }}
                        title={`${item.label}: ${item.pct}%`}
                        className={`h-full ${
                          ['bg-amber-600', 'bg-amber-500', 'bg-amber-700', 'bg-emerald-600', 'bg-neutral-800'][idx % 5]
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Breakdown List Cards */}
                <div className="space-y-2.5">
                  {calculation.breakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-xs hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.icon}</span>
                        <div>
                          <span className="font-bold text-neutral-900 block">{item.label}</span>
                          <span className="text-[10px] text-neutral-500 font-mono">{item.pct}% of total budget</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-neutral-950 text-sm">
                        ₹{item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={getWhatsAppEstimateUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Send Quote to WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsExportModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-xs font-bold text-neutral-800 transition-colors cursor-pointer"
                  >
                    <Download className="h-4 w-4 text-amber-700" />
                    <span>Export Itemized PDF</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Free 3D Site Survey & Inspection Booking */}
              <div className="lg:col-span-5 rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-4">
                <div className="pb-4 border-b border-neutral-100">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                    Zero Obligation · Free Consultation
                  </span>
                  <h3 className="font-display text-2xl font-bold text-neutral-950 mt-1">
                    Book Free Site Survey &amp; 3D Design
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Our senior architect will visit with physical material swatches, laser measurement tools &amp; digital moisture scanners.
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
                      Thank you <strong>{fullName}</strong>. Your appointment for <strong>{preferredDate}</strong> ({preferredTime}) is logged. Our engineer will reach you shortly on <strong>{phone}</strong> with the preliminary 3D floor plan.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="rounded-xl border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                    >
                      Modify Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3.5">
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
                        className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Phone Number (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 9845012345"
                          className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. ramesh@gmail.com"
                          className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Bangalore Locality
                        </label>
                        <select
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                        >
                          <option value="Whitefield">Whitefield</option>
                          <option value="HSR Layout">HSR Layout</option>
                          <option value="Sarjapur Road">Sarjapur Road</option>
                          <option value="Yelahanka">Yelahanka</option>
                          <option value="Indiranagar">Indiranagar</option>
                          <option value="Electronic City">Electronic City</option>
                          <option value="Kanakapura Road">Kanakapura Road</option>
                          <option value="Hebbal">Hebbal</option>
                          <option value="Other Bengaluru Location">Other Bengaluru Locality</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Consultation Mode
                        </label>
                        <select
                          value={consultationType}
                          onChange={(e) => setConsultationType(e.target.value as any)}
                          className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                        >
                          <option value="home">Free In-Home Inspection</option>
                          <option value="studio">Visit Experience Studio</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-800 mb-1">
                        Apartment Name / Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Sobha Dream Acres, Flat 604"
                        className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-800 mb-1">
                          Time Slot
                        </label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-900 focus:border-amber-500 focus:outline-none"
                        >
                          <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM</option>
                          <option value="02:00 PM – 04:00 PM">02:00 PM – 04:00 PM</option>
                          <option value="05:00 PM – 07:00 PM">05:00 PM – 07:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-premium rounded-xl bg-amber-600 py-3 text-xs font-bold text-white shadow-md hover:bg-amber-500 transition-all disabled:opacity-50 cursor-pointer mt-2"
                    >
                      {isSubmitting ? 'Confirming Visit...' : 'Book Free Site Survey & Lock Quote →'}
                    </button>

                    <p className="text-[10px] text-center text-neutral-400">
                      Zero fee · No credit card required · Free 3D design draft included
                    </p>
                  </form>
                )}
              </div>

            </div>

            {/* Back Button */}
            <div className="flex justify-start pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-950 px-4 py-2 rounded-xl border border-neutral-200 bg-white cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Modify Quality Package</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* 4. STICKY LIVE COST SUMMARY BAR (Always Visible at Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-white/10 px-4 sm:px-8 py-3 text-white shadow-2xl">
        <div className="mx-auto max-w-screen-2xl flex items-center justify-between gap-4">
          
          {/* Left summary */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                Configuration
              </span>
              <span className="text-xs font-bold text-neutral-200">
                {currentBhk.name} · {sqft} sq.ft · {currentTierInfo.name}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block sm:hidden">
                Live Estimate
              </span>
              <span className="font-display text-base sm:text-xl font-bold text-amber-400">
                ₹{calculation.minEstimate.toLocaleString()} – ₹{calculation.maxEstimate.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Right step quick actions */}
          <div className="flex items-center gap-2">
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
                className="btn-premium flex items-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 text-xs font-bold cursor-pointer transition-all"
              >
                <span>Next Step</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <a
                href={getWhatsAppEstimateUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-bold cursor-pointer transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Quote</span>
              </a>
            )}
          </div>

        </div>
      </div>

      {/* Export Modal */}
      <ServiceCostExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        projectName={`${currentBhk.name} ${propertyType} Interior (${currentTierInfo.name})`}
        clientName={fullName || 'Decorpot-Grade Client Estimate'}
        totalCost={calculation.subTotal}
        sqft={sqft}
        serviceScope={`Comprehensive ${currentBhk.name} Interior · ${currentTierInfo.name}`}
      />

    </div>
  );
};
