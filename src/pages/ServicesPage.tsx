import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Calculator, 
  ShieldCheck, 
  ArrowRight, 
  Phone, 
  Check, 
  CheckCircle2 
} from 'lucide-react';
import { CATALOGUE_CATEGORIES } from '../data/catalogueData';

interface ServiceCard {
  tag: string;
  price: string;
  title: string;
  desc: string;
  specs: string[];
  footerNote: string;
}

interface ServiceHighlightPillar {
  title: string;
  desc: string;
}

interface ServiceSectionItem {
  id: string;
  badgeCategory: string;
  title: string;
  description: string;
  quoteUrl: string;
  quoteBtnText: string;
  heroImage: string;
  heroAlt: string;
  heroBadges: string[];
  cards: ServiceCard[];
  bottomHighlights: {
    badge: string;
    title: string;
    note: string;
    pillars: ServiceHighlightPillar[];
    ctaLabel: string;
    ctaUrl: string;
  };
}

const ALL_SERVICES_DATA: ServiceSectionItem[] = [
  {
    id: 'upvc',
    badgeCategory: 'ARCHITECTURAL PROFILES & SYSTEMS',
    title: 'UPVC Windows & Doors',
    description: 'Certified EITI 2.5mm and BADYEE 2mm heavy-gauge profile systems engineered for 42dB acoustic insulation, dustproofing, thermal barrier, and 15–20 year written warranty.',
    quoteUrl: '/estimator?service=UPVC%20Windows%20%26%20Doors',
    quoteBtnText: 'Get a Quote (From ₹290 / sq.ft)',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Luxury UPVC Windows & Doors Installation',
    heroBadges: [
      '15–20 Years Warranty',
      'From ₹290 / sq.ft',
      'EITI 2.5mm Heavy Profiles',
      '4mm–6mm Toughened & DGU Glass',
      'EPDM Weatherproof Gaskets',
    ],
    cards: [
      {
        tag: 'Popular Choice',
        price: 'From ₹320 / sq.ft',
        title: 'Casement / Open Windows',
        desc: 'Hinged inward or outward with frictionless stainless steel friction stays and multi-point perimeter locks.',
        specs: ['Friction Stays & Multipoint Locks', 'Acoustic EPDM Weather Seals', 'Full Aperture Natural Airflow'],
        footerNote: '4mm Float Glass Standard',
      },
      {
        tag: 'Space Saving',
        price: 'From ₹290 / sq.ft',
        title: 'Sliding Window Systems',
        desc: 'Smooth gliding 2-track and 3-track sliding sashes with heavy-duty brass roller bearings and wind resistance.',
        specs: ['2-Track & 3-Track Sashes', 'Integrated Netlon Track Available', 'Heavy Brass Bearing Rollers'],
        footerNote: 'Touch-Lock Mechanism',
      },
      {
        tag: 'Panoramic View',
        price: 'From ₹240 / sq.ft',
        title: 'Fixed Architectural Glass',
        desc: 'Panoramic architectural picture glass designed for unobstructed daylight vistas with zero air draft.',
        specs: ['Maximum Daylight Transmission', 'Toughened Safety Glass Core', 'Acoustic Sound Barrier 42dB'],
        footerNote: 'Zero Air Leakage',
      },
      {
        tag: 'Villa Grade',
        price: 'From ₹550 / sq.ft',
        title: 'Slide & Fold Patio Doors',
        desc: 'Heavy-duty accordion bi-fold and sliding patio doors seamlessly uniting living areas with gardens.',
        specs: ['Multi-Leaf Smooth Folding Track', 'German Heavy Hardware Hinges', 'Zero-Threshold Balcony Access'],
        footerNote: 'Custom Sized Aperture',
      },
    ],
    bottomHighlights: {
      badge: 'ENGINEERING & PROFILE INTEGRITY',
      title: 'German Standard UPVC Fabrication & Assembly',
      note: 'All window and door apertures are measured on-site with laser precision prior to machine welding.',
      pillars: [
        { title: 'Seamless Machine Welding', desc: 'CNC 4-point robotic thermal fusion prevents water seepage and wind draft leaks.' },
        { title: 'Galvanized Steel Core', desc: '1.2mm–1.5mm galvanized steel reinforcement inside profiles against high wind load.' },
        { title: 'EPDM Multi-Fin Gaskets', desc: 'Zero-shrinkage automotive-grade seals preventing dust, rain, and road noise.' },
        { title: '15–20 Year Warranty', desc: 'Written warranty against profile discoloration, brittleness, peeling, and hardware failure.' },
      ],
      ctaLabel: 'Book Free UPVC Site Survey →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'painting',
    badgeCategory: 'MECHANIZED DUSTLESS FINISHES',
    title: 'Interior & Exterior Painting',
    description: 'Certified paint application systems with Asian Paints and Birla Paints. Dust-free vacuum HEPA sanding (99% dust free), non-destructive moisture scans, and written warranty certificates.',
    quoteUrl: '/estimator?service=Painting',
    quoteBtnText: 'Get a Quote (From ₹22 / sq.ft)',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Interior Luxury Home Painting Architecture',
    heroBadges: [
      '3, 7 & 10 Year Warranties',
      'From ₹22 / sq.ft',
      'Asian Paints & Birla Paints',
      '99% Dustless HEPA Sanding',
      'Free Digital Moisture Scans',
    ],
    cards: [
      {
        tag: '3-Year Warranty',
        price: 'From ₹22 / sq.ft',
        title: 'Standard Premium Interior',
        desc: 'Mechanized vacuum sanding, primer sealing, 2 coats acrylic putty skimming, and 2 luxury washable emulsion coats.',
        specs: ['3-Year Written Warranty', 'Washable Satin Finish', 'Asian Paints Royale / Tractor Emulsion'],
        footerNote: '99% Dustless Prep',
      },
      {
        tag: '7-Year Warranty',
        price: 'From ₹28 / sq.ft',
        title: 'Luxury Royale Silk Finish',
        desc: 'High-scrub Teflon surface protection coating with rich eggshell luster for living spaces, dining halls, and foyers.',
        specs: ['7-Year Manufacturer Warranty', 'Teflon Surface Protector Guard', 'Superior Stain Scrub Resistance'],
        footerNote: 'Anti-Stain Coating',
      },
      {
        tag: '10-Year Warranty',
        price: 'From ₹35 / sq.ft',
        title: 'Elite Velvet Sheen & Stucco',
        desc: 'Anti-bacterial crack-bridging Italian Venetian stucco base and ultra-velvet luxury designer sheens for feature halls.',
        specs: ['10-Year Uncompromised Warranty', 'Crack-Bridging Elastomeric Base', 'Anti-Fungal & Anti-Bacterial'],
        footerNote: 'Artisan Hand Trowel',
      },
      {
        tag: 'Exterior Shield',
        price: 'From ₹30 / sq.ft',
        title: 'Apex Exterior Weather Shield',
        desc: 'High-pressure wall washing, elastomeric crack fill, anti-algae silicone priming, and weather-defense coatings.',
        specs: ['10-Year Extreme Weather Defense', 'UV Resistance & Color Stay', 'Fungus & Rain Proof Barrier'],
        footerNote: 'Apex Ultima Formula',
      },
    ],
    bottomHighlights: {
      badge: 'DUSTLESS SANITARY APPLICATION',
      title: 'Certified Clean Painting Protocol',
      note: 'Complimentary digital moisture scanning included with every on-site painting quotation.',
      pillars: [
        { title: '99% Dustless Sanding', desc: 'HEPA filtered mechanized sanders capture dust particles before they enter your home.' },
        { title: 'Digital Moisture Scan', desc: 'Every wall is tested with non-invasive moisture meters to prevent premature paint peeling.' },
        { title: 'Complete Floor Masking', desc: 'Heavy plastic sheets and masking tape safeguard tiles, switches, and woodwork.' },
        { title: 'Written Guarantee Card', desc: 'Legally backed multi-year warranty certificate handed over upon project sign-off.' },
      ],
      ctaLabel: 'Schedule Moisture Inspection →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'curtains',
    badgeCategory: 'BESPOKE WINDOW TREATMENTS',
    title: 'Curtains & Designer Drapery',
    description: 'Curated designer fabric collections crafted with wave-fold silent tracks, sheer day filtration, thermal blackout velvets, precision hardware, and custom stitching.',
    quoteUrl: '/estimator?service=Curtains',
    quoteBtnText: 'Get a Quote (From ₹250 / m)',
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Elegant Draped Curtains in Luxury Interior',
    heroBadges: [
      'Designer Fabric Collections',
      'From ₹250 / meter',
      'Curtains Avenue · MBF · BD Balaji',
      'Wave-Fold Silent Tracks',
      'Custom Tailored Stitching',
    ],
    cards: [
      {
        tag: 'Belgian Series',
        price: 'From ₹350 / meter',
        title: 'Curtains Avenue Collection',
        desc: 'High-GSM Belgian textures, Admire Main, Admire Sheer, Sunrise, Stardust, and daylight filtering linens.',
        specs: ['Admire Main & Admire Sheer', 'Sunrise & Stardust Weaves', 'Superior Drape & Memory Waves'],
        footerNote: 'Swatches in Studio',
      },
      {
        tag: 'Modern Textures',
        price: 'From ₹280 / meter',
        title: 'MBF Contemporary Weaves',
        desc: 'Flowing tactile weaves tailored for modern luxury residences including Sushi, Jersey, Pastel, and Cinkam.',
        specs: ['Sushi, Jersey & Pastel Weaves', 'Lightweight Elegant Hang', 'Fade-Resistant Colorfast Dyes'],
        footerNote: 'Tactile Hand-Feel',
      },
      {
        tag: 'Embossed Luxury',
        price: 'From ₹420 / meter',
        title: 'BD Balaji Décor Heavyweights',
        desc: 'Opulent heavyweight jacquards, 3D embossed velvets, and luxury blackout draperies for master bedrooms.',
        specs: ['Marvel, Exotic & 3D Emboss', '99% Thermal Blackout Lining', 'Opulent Heavy Fall Drape'],
        footerNote: 'Velvet & Jacquard',
      },
      {
        tag: 'Hardware & Motors',
        price: 'From ₹180 / foot',
        title: 'Silent Tracks & Smart Motors',
        desc: 'Heavy-gauge silent ripple-fold rails, motorized remote control tracks, designer finials, and concealed brackets.',
        specs: ['Wave-Fold Ripple Rail Tracks', 'Smart Home Motor Integration', 'Heavy-Duty Ceiling & Wall Clamps'],
        footerNote: 'Free In-Home Fitting',
      },
    ],
    bottomHighlights: {
      badge: 'CUSTOM TAILORING & INSTALLATION',
      title: 'Full-Service Window Dressing Standards',
      note: 'Our window stylist brings physical drapery swatch books directly to your home for easy matching.',
      pillars: [
        { title: 'Laser Aperture Sizing', desc: 'Precision measurements ensure zero puddling or unsightly gaps above flooring.' },
        { title: 'Heavy-Gauge Hardware', desc: 'Thick extruded aluminium tracks glide effortlessly without sticking or rattling.' },
        { title: 'Custom Wave Stitching', desc: 'Double-hemmed weighted bottoms for uniform magazine-style curtain folds.' },
        { title: 'Fabric Swatches at Home', desc: 'Browse 40+ physical fabric sample books inside your own natural room lighting.' },
      ],
      ctaLabel: 'Book In-Home Fabric Viewing →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'blinds',
    badgeCategory: 'LIGHT FILTRATION & SMART SHADING',
    title: 'Window Blinds & Shades',
    description: 'Motorized remote and manual roller screens, day-and-night Zebra dual layers, natural timber louvers, and commercial PVC blinds engineered for exact fit.',
    quoteUrl: '/estimator?service=Blinds',
    quoteBtnText: 'Get a Quote (From ₹75 / sq.ft)',
    heroImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Modern Architectural Window Blinds and Sun Shading',
    heroBadges: [
      'Motorized & Manual Control',
      'From ₹75 / sq.ft',
      'UV Solar Heat Rejection',
      'Zebra · Roller · Bamboo · PVC',
      '5-Year Mechanism Warranty',
    ],
    cards: [
      {
        tag: 'Solar Defense',
        price: 'From ₹75 / sq.ft',
        title: 'Roller Blinds & Solar Blackout',
        desc: 'Minimalist single-sheet UV solar barrier blinds with options from 5% openness to 100% total room blackout.',
        specs: ['Anti-Fray High-Tensile Polyester', '100% Total Room Blackout Option', 'Spring-Damped Smooth Roll Tube'],
        footerNote: 'Easy Clean Wipe',
      },
      {
        tag: 'Dual Lighting',
        price: 'From ₹110 / sq.ft',
        title: 'Zebra Dual-Shade Blinds',
        desc: 'Alternating sheer and solid fabric horizontal bands allowing infinite daylight dimming and privacy adjustment.',
        specs: ['Day-and-Night Dual Layer Control', 'Semi-Sheer Light Diffusion', 'Cassette Valance Cover Included'],
        footerNote: 'Contemporary Look',
      },
      {
        tag: 'Organic Timber',
        price: 'From ₹130 / sq.ft',
        title: 'Natural Bamboo & Venetian Blinds',
        desc: '100% natural organic woven bamboo timber slats and precision tilt aluminium venetian louvers.',
        specs: ['Eco-Friendly Natural Woodgrain', 'Precision Angle Tilt Louvers', 'Moisture-Treated Wood Slat Core'],
        footerNote: 'Tactile Warmth',
      },
      {
        tag: '100% Waterproof',
        price: 'From ₹85 / sq.ft',
        title: 'PVC Waterproof & Vertical Blinds',
        desc: '100% waterproof vertical and horizontal PVC vanes designed for high-humidity kitchens, bathrooms & balconies.',
        specs: ['100% Waterproof & Grease Proof', 'Ceiling-to-Floor Sliding Louvers', 'Commercial Grade Fire Retardant'],
        footerNote: 'Kitchens & Bath',
      },
    ],
    bottomHighlights: {
      badge: 'PRECISION HARDWARE & CALIBRATION',
      title: 'Architectural Window Blind Engineering',
      note: 'Custom manufactured to your window frame within 3 to 5 business days with transparent itemized pricing.',
      pillars: [
        { title: 'Heavy Headrail Cassettes', desc: 'Extruded aluminium cassettes concealing rollers for a clean architectural aesthetic.' },
        { title: 'Smart Motorization', desc: 'Somfy & Tuya smart motors integrated with Alexa, Google Home & smartphone apps.' },
        { title: 'Zero Sag Guarantees', desc: 'Precision bottom weighted bars prevent blind curling or diagonal skewing over time.' },
        { title: 'Transparent Costing', desc: 'Itemized fitting and transit charges stated upfront with no hidden surcharges.' },
      ],
      ctaLabel: 'Request Blinds Measurement →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'wallpapers',
    badgeCategory: 'IMPORTED VINYL WALLCOVERINGS',
    title: 'Designer Wallpapers & Murals',
    description: 'Heavy-grade vinyl coated rolls engineered for 10-year durability, seamless geometric alignments, and tailored 3D panoramic murals.',
    quoteUrl: '/estimator?service=Wallpapers',
    quoteBtnText: 'Get a Quote (From ₹950 / roll)',
    heroImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Designer Textured Wallpaper Elevation Accent Wall',
    heroBadges: [
      '10-Year Peel Resistance',
      'From ₹950 / roll',
      '57 sq.ft Standard Rolls',
      '1,200+ Studio Catalogues',
      '100% Washable & Scratch-Proof',
    ],
    cards: [
      {
        tag: 'European Vinyl',
        price: 'From ₹950 / roll',
        title: 'Tattva Opel Textured Vinyl',
        desc: 'Heavy European textured vinyl roll with rich tactile depth, embossed weave grain, and high scrub resistance.',
        specs: ['Standard 57 sq.ft per Roll', '100% Washable with Damp Cloth', 'Scratch & Abrasion Resistant'],
        footerNote: '10-Year Durability',
      },
      {
        tag: 'Subtle Elegance',
        price: 'From ₹1,150 / roll',
        title: 'Ombre & Self-Textured Series',
        desc: 'Subtle gradient ombre transitions, tactile micro-textures, and soothing neutral luxury tone palettes.',
        specs: ['Non-Woven Breathable Backing', 'Seamless Alignment Match', 'Anti-Fungal Adhesive Bonding'],
        footerNote: 'Master Bedrooms',
      },
      {
        tag: 'Designer Accent',
        price: 'From ₹1,350 / roll',
        title: 'Fabtec & Modern Geometric',
        desc: 'Contemporary metallic foil inlays, bold geometric rhythm, and high-impact accent statements for feature walls.',
        specs: ['High-GSM Heavyweight Substrate', 'Metallic & Foil Accents', 'Zero Visible Seam Taping'],
        footerNote: 'Living Foyers',
      },
      {
        tag: '3D Custom Murals',
        price: 'From ₹45 / sq.ft',
        title: 'Customized 3D Panoramic Murals',
        desc: 'High-definition architectural murals custom printed to the exact width and height of your focal wall.',
        specs: ['Single-Wall Custom Scaling', 'Ultra-HD Pigment Inks', 'Zero Color Degradation'],
        footerNote: 'Bespoke Sizing',
      },
    ],
    bottomHighlights: {
      badge: 'WALLPAPER CRAFTSMANSHIP STANDARDS',
      title: 'Flawless Installation & Surface Preparation',
      note: 'Every installation includes wall skim inspection and precise pattern repeat calculation.',
      pillars: [
        { title: 'Base Putty Priming', desc: 'Walls receive a fine smooth sanding skim and sealer for maximum glue grip.' },
        { title: 'German Adhesive System', desc: 'Specialized starch anti-fungal adhesives ensure zero corner peeling or bubbling.' },
        { title: 'Pattern Alignment', desc: 'Trained paperhangers match intricate repeats with invisible butt-joints.' },
        { title: '1,200+ Studio Library', desc: 'Browse European, Italian, and Japanese physical books in our Bengaluru studio.' },
      ],
      ctaLabel: 'Explore Wallpaper Books →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'wooden-flooring',
    badgeCategory: 'EUROPEAN AC-RATED TIMBER SURFACES',
    title: 'Wooden Flooring & Waterproof Planks',
    description: 'Certified Action Tesa and Surya laminate flooring systems with multi-year warranties, plus high-performance 100% waterproof SPC vinyl and VOX European planks.',
    quoteUrl: '/estimator?service=Wooden%20Flooring',
    quoteBtnText: 'Get a Quote (From ₹140 / sq.ft)',
    heroImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Rich Oak Wooden Flooring Installation with Clean Finish',
    heroBadges: [
      'Up to 20-Yr Manufacturer Warranty',
      'From ₹140 / sq.ft',
      'Action Tesa AC3–AC5 Planks',
      'Surya German Engineered',
      'Laying & Skirting Available',
    ],
    cards: [
      {
        tag: 'Action Tesa AC4',
        price: 'From ₹150 / sq.ft',
        title: 'Action Tesa AC4 Commercial Planks',
        desc: 'High-density HDF core laminate planks engineered for heavy residential foot traffic and formal living suites.',
        specs: ['15-Year Written Warranty', 'AC4 Scratch & Impact Rating', '8mm High-Density HDF Core'],
        footerNote: '15-Yr Warranty',
      },
      {
        tag: 'Action Tesa AC5',
        price: 'From ₹160 / sq.ft',
        title: 'Action Tesa AC5 Elite Planks',
        desc: 'Commercial-grade heavy wear layer planks built to withstand executive lounges, pets, and extreme durability demands.',
        specs: ['20-Year Manufacturer Warranty', 'AC5 Maximum Wear Defense', 'Wax-Sealed Click Interlock'],
        footerNote: '20-Yr Warranty',
      },
      {
        tag: 'German Standard',
        price: 'From ₹150 / sq.ft',
        title: 'Surya German Tech Laminate',
        desc: 'Precision German-engineered timber planks featuring authentic natural wood grain texture and warm acoustic feel.',
        specs: ['High Resilience Timber Veneer', 'Moisture Repellent Wax Edges', 'Smooth Beveled Edge V-Groove'],
        footerNote: 'Natural Texture',
      },
      {
        tag: '100% Waterproof',
        price: 'From ₹95 / sq.ft',
        title: '100% Waterproof SPC Stone Polymer',
        desc: 'Rigid stone plastic composite click planks with pre-attached acoustic underlay, completely immune to water.',
        specs: ['100% Waterproof for All Rooms', 'Zero Expansion or Warping', 'Integrated Sound-Dampening Pad'],
        footerNote: 'Kitchen Safe',
      },
    ],
    bottomHighlights: {
      badge: 'TIMBER INSTALLATION SPECIFICATIONS',
      title: 'Underlayment & Professional Laying Process',
      note: 'Complete floor leveling check and subfloor moisture testing conducted prior to laying.',
      pillars: [
        { title: 'Moisture Barrier Sheet', desc: 'Heavy 0.2mm vapor shield underlay protects planks against rising concrete moisture.' },
        { title: 'Acoustic Foam Pad', desc: 'High-density foam pad eliminates hollow clicking footstep noise underfoot.' },
        { title: 'Expansion Perimeters', desc: 'Precision perimeter clearance prevents floor buckling during seasonal temperature shifts.' },
        { title: 'Matching Skirtings & Trims', desc: 'Color-matched baseboard skirtings, T-profiles, and reducers included.' },
      ],
      ctaLabel: 'Book Flooring Specialist →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'false-ceiling',
    badgeCategory: 'ARCHITECTURAL CEILINGS & COVES',
    title: 'False Ceiling Architecture',
    description: 'Monolithic Gypsum, acoustic Grid, waterproof PVC, European VOX, and solid Wooden ceilings built with certified Saint-Gobain & USG Boral channels.',
    quoteUrl: '/estimator?service=False%20Ceiling',
    quoteBtnText: 'Get a Quote (From ₹75 / sq.ft)',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Architectural False Ceiling with Recessed LED Cove Lighting',
    heroBadges: [
      'Saint-Gobain Gyproc Certified',
      'From ₹75 / sq.ft',
      'Seamless Monolithic Coves',
      'Concealed LED Strip Channels',
      'Anti-Sagging Guaranteed',
    ],
    cards: [
      {
        tag: 'Saint-Gobain Core',
        price: 'From ₹95 / sq.ft',
        title: 'Saint-Gobain Gyproc Monolithic Cove',
        desc: 'Premium gypsum board false ceilings with concealed LED cove lighting troughs, step borders, and zero joint lines.',
        specs: ['Certified Saint-Gobain Channels', 'Level-5 Flush Joint Finish', 'Integrated Concealed LED Coves'],
        footerNote: 'Living & Bedrooms',
      },
      {
        tag: 'Commercial & Office',
        price: 'From ₹75 / sq.ft',
        title: 'Modular Acoustic Grid Ceiling',
        desc: '2x2 mineral fiber modular ceiling tiles suspended on T-grids for sound absorption and quick plenum wiring access.',
        specs: ['NRC 0.65+ Sound Absorption', 'Instant Overhead Electrical Access', 'Anti-Sag Mineral Fiber Tiles'],
        footerNote: 'Rapid Installation',
      },
      {
        tag: 'European VOX',
        price: 'From ₹280 / sq.ft',
        title: 'VOX Designer Composite Ceiling',
        desc: 'Ultra-premium polymer decorative composite ceilings with realistic natural wood grains, 100% moisture proofing.',
        specs: ['Zero Termite & Zero Water Damage', 'Realistic Natural Wood Textures', 'Anti-Static Dust-Repellent Finish'],
        footerNote: 'Balconies & Living',
      },
      {
        tag: 'Bespoke Timber',
        price: 'From ₹450 / sq.ft',
        title: 'Solid Natural Wooden Slats',
        desc: 'Bespoke fluted natural teakwood and oak timber slats with recessed black profile lighting for executive villas.',
        specs: ['Natural Seasoned Teak & Oak', 'Concealed Magnetic Framework', 'Architectural Linear Aesthetics'],
        footerNote: 'Luxury Villa Focus',
      },
    ],
    bottomHighlights: {
      badge: 'FRAMEWORK STRUCTURAL INTEGRITY',
      title: 'Heavy-Gauge Framing & Certified Fasteners',
      note: 'Coordinated false ceiling and lighting layout blueprint provided prior to on-site assembly.',
      pillars: [
        { title: '0.50mm G.I. Channels', desc: 'Heavy-gauge galvanized steel perimeter and intermediate channels prevent ceiling sagging.' },
        { title: 'Level-5 Joint Compound', desc: 'Multi-stage jointing tape with Gyproc jointing plaster guarantees invisible seams.' },
        { title: 'Laser Level Alignment', desc: 'Laser leveled grid ensures razor-straight ceiling planes across entire halls.' },
        { title: 'Electrical Cutout Service', desc: 'Precision spot light, chandelier, and AC diffuser cutouts executed cleanly.' },
      ],
      ctaLabel: 'Request Ceiling Drawing & Quote →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'mosquito-nets',
    badgeCategory: 'INSECT PROTECTION SYSTEMS',
    title: 'Netlon / Mosquito Nets',
    description: '100% insect and dengue mosquito defense for windows and doors using genuine Saint-Gobain high-tensile fiberglass mesh and heavy-gauge aluminium profiles.',
    quoteUrl: '/estimator?service=Netlon%20%2F%20Mosquito%20Nets',
    quoteBtnText: 'Get a Quote (From ₹45 / sq.ft)',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'High-Tensile Clean Mosquito Screening Systems for Windows and Doors',
    heroBadges: [
      '100% Insect & Pest Defense',
      'From ₹45 / sq.ft',
      'Saint-Gobain Certified Fiberglass',
      'Smooth Silent Operation',
      'Zero Sightline Disturbance',
    ],
    cards: [
      {
        tag: 'Magnetic System',
        price: 'From ₹300 / sq.ft',
        title: 'Magnetic Snap-Close Screens',
        desc: 'Flexible magnetic strip frames that snap firmly onto existing window frames with effortless peel-to-open cleaning.',
        specs: ['Heavy-Duty Magnetic Perimeter', 'Saint-Gobain High-Tensile Mesh', 'Quick Peel Off for Window Washing'],
        footerNote: 'Windows & Balconies',
      },
      {
        tag: 'Pleated Accordion',
        price: 'From ₹300 / sq.ft',
        title: 'Low-Profile Pleated Accordion Doors',
        desc: 'Barrier-free horizontal zig-zag retractable pleated insect screens designed specifically for balcony sliding doors.',
        specs: ['Barrier-Free Flat Bottom Guide', 'Zig-Zag Mesh Retracts Silently', 'Resistant to High Wind Speeds'],
        footerNote: 'Sliding Patio Doors',
      },
      {
        tag: 'Hinged Doors',
        price: 'From ₹250 / sq.ft',
        title: 'Hinged Aluminium Security Netlon Doors',
        desc: 'Heavy-duty extruded aluminium door frame equipped with self-closing hinges, mechanical lock, and handle.',
        specs: ['Powder-Coated Aluminium Profile', 'Stainless Steel Hardware Latches', 'Pet-Resilient Sturdy Fiberglass'],
        footerNote: 'Main & Utility Doors',
      },
      {
        tag: 'Genuine Mesh Roll',
        price: 'From ₹55 / sq.ft',
        title: 'Saint-Gobain Mesh Roll Installation',
        desc: '100% genuine Saint-Gobain fiberglass mesh roll replacements or velcro perimeter stapling for existing wooden windows.',
        specs: ['Authentic Saint-Gobain Stamp', 'Anti-Tear Charcoal Fiberglass', 'Optimal Airflow & Light Clarity'],
        footerNote: 'Window Replacement',
      },
    ],
    bottomHighlights: {
      badge: 'HEALTH & DAYLIGHT DEFENSE',
      title: 'Why Homeowners Choose Our Insect Screen Systems',
      note: 'On-site frame measurement and physical mesh demonstration provided free of charge.',
      pillars: [
        { title: '100% Mosquito Defense', desc: 'Precision aperture blocks dengue mosquitoes, flies, bugs, and pests completely.' },
        { title: 'Airflow & Clear Views', desc: 'Ultra-thin charcoal yarn ensures unobstructed outdoor visibility and cross breezes.' },
        { title: 'UV & Weather Proof', desc: 'Non-brittle PVC coated fiberglass that does not crack under harsh tropical sun.' },
        { title: 'Custom Color Framing', desc: 'Aluminium extrusions powder-coated to match your exact window frame color.' },
      ],
      ctaLabel: 'Book Insect Screen Survey →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'louvers',
    badgeCategory: 'DECORATIVE WALL PANELS',
    title: 'Architectural Wall Louvers',
    description: 'Shore Louvers and Charcoal Louvers fabricated on 16mm commercial plywood core with scratch-resistant premium lamination for media elevations & bed backdrops.',
    quoteUrl: '/estimator?service=Louvers',
    quoteBtnText: 'Get a Quote (From ₹850 / pc)',
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Fluted Wall Louvers Accent Elevation with Backlight',
    heroBadges: [
      '16mm Commercial Plywood Core',
      'From ₹850 / piece',
      'Shore & Charcoal Fluted Tones',
      'Scratch-Proof Lamination',
      'Concealed Interlocking Joints',
    ],
    cards: [
      {
        tag: 'Standard 8ft Height',
        price: 'From ₹850 / piece',
        title: '8" × 8 ft Shore Louver Panels',
        desc: 'Precision fluted panel in standard 8ft height ideal for modern TV consoles, bed backdrops, and divider walls.',
        specs: ['16mm Anti-Borer Plywood Base', 'Rich Shore Fluted Texture', 'Standard 8-Foot Ceiling Fit'],
        footerNote: 'Shore Profile',
      },
      {
        tag: 'Tall 9ft Height',
        price: 'From ₹950 / piece',
        title: '8" × 9 ft Tall Ceiling Charcoal Louvers',
        desc: 'Extended 9ft height profile for seamless floor-to-ceiling focal walls with zero horizontal joint lines.',
        specs: ['Seamless 9-Foot Tall Elevation', 'Deep Matte Charcoal Texture', 'Tongue-and-Groove Interlock'],
        footerNote: 'Charcoal Profile',
      },
      {
        tag: 'Media Console Wall',
        price: 'From ₹1,100 / piece',
        title: 'TV Console & Media Wall Feature',
        desc: 'Architectural fluted panel system integrated with concealed wire conduits, LED backlighting, and floating shelves.',
        specs: ['Concealed TV Cable Chase', 'LED Cove Backlight Rebate', 'High-Scuff Impact Resistance'],
        footerNote: 'Cable Friendly',
      },
      {
        tag: 'Acoustic Backing',
        price: 'From ₹1,250 / piece',
        title: 'Acoustic Fluted Slat Panels',
        desc: 'Acoustic-backed timber veneer fluted panels designed to absorb echo and sound reflection in living halls.',
        specs: ['Echo-Dampening Felt Backing', 'Real Wood Look Fluted Slats', 'Warm Luxurious Acoustic Vibe'],
        footerNote: 'Home Theaters',
      },
    ],
    bottomHighlights: {
      badge: 'WALL PANELING EXCELLENCE',
      title: 'Architectural Louver Construction Standards',
      note: 'Browse our full physical swatch collection of charcoal, shore, and walnut louvers in studio.',
      pillars: [
        { title: '16mm Commercial Plywood', desc: 'Heavy-duty calibrated core resists warping, termite damage, and tropical humidity.' },
        { title: 'Zero-Joint Interlock', desc: 'Concealed tongue-and-groove joints guarantee seamless continuous vertical flutes.' },
        { title: 'Scratch-Proof Finish', desc: 'High-pressure surface laminate that wipes clean with zero discoloration over time.' },
        { title: 'Integrated LED Coves', desc: 'Custom edge detailing allows seamless integration of warm indirect LED strip lighting.' },
      ],
      ctaLabel: 'Request Louver Samples →',
      ctaUrl: '/contact',
    },
  },
  {
    id: 'artificial-grass',
    badgeCategory: 'LANDSCAPING & BALCONY TURF',
    title: 'Artificial Grass & Turf Laying',
    description: 'Lush, realistic all-weather green turf for balconies, terrace gardens, villas, and commercial outdoor spaces with zero mowing, UV resistance, and pet-safe materials.',
    quoteUrl: '/estimator?service=Artificial%20Grass',
    quoteBtnText: 'Get a Quote (From ₹55 / sq.ft)',
    heroImage: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=1600&q=85',
    heroAlt: 'Lush Green Balcony Turf and Landscaping Installation',
    heroBadges: [
      'UV Shielded 8+ Year Color Fast',
      'From ₹55 / sq.ft',
      '25mm to 50mm Pile Heights',
      'Rapid Drainage Hole Backing',
      'Pet & Child Safe Soft Fibers',
    ],
    cards: [
      {
        tag: '25mm Compact',
        price: 'From ₹55 / sq.ft',
        title: '25mm Pile Balcony & Wall Turf',
        desc: 'Compact high-density green turf ideal for apartment balconies, vertical garden wall cladding, and cozy sit-outs.',
        specs: ['25mm High-Density Blade Pile', 'Compact & Fast Drying', 'Easy Clean Sweep & Vacuum'],
        footerNote: 'Balconies & Walls',
      },
      {
        tag: '35mm Natural',
        price: 'From ₹65 / sq.ft',
        title: '35mm Pile Terrace & Garden Turf',
        desc: 'Natural multi-tone green with realistic tan thatch layer, creating an authentic lush grass look for terraces.',
        specs: ['Natural 4-Tone Blade Thatch', 'Soft Cushion Feel Underfoot', 'High Foot Traffic Endurance'],
        footerNote: 'Terrace Gardens',
      },
      {
        tag: '40mm Landscape',
        price: 'From ₹70 / sq.ft',
        title: '40mm Pile Lush Villa Landscape',
        desc: 'Dense luxury landscape turf designed for villa lawns, pool decks, and large outdoor patio entertaining areas.',
        specs: ['Super Dense 40mm Monofilament', 'High UV Resistance Formula', 'Heavy Water Drainage Holes'],
        footerNote: 'Villa Lawns',
      },
      {
        tag: '50mm Ultra Plush',
        price: 'From ₹80 / sq.ft',
        title: '50mm Super Plush Luxury Turf',
        desc: 'Our most opulent, super-soft deep pile turf delivering barefoot comfort and resort-style luxury aesthetics.',
        specs: ['50mm Ultra-Plush Pile Height', 'Resort Grade Velvet Softness', 'Pet-Safe Non-Toxic Materials'],
        footerNote: 'Resort Grade',
      },
    ],
    bottomHighlights: {
      badge: 'OUTDOOR TURF PERFORMANCE STANDARDS',
      title: 'Turf Laying & All-Weather Drainage Systems',
      note: 'Professional laying service (₹15/sq.ft) includes perimeter cutting, drainage hole checks, and adhesive seaming.',
      pillars: [
        { title: 'Self-Draining Backing', desc: 'Perforated latex backing allows rainwater to flow directly to floor drains with zero pooling.' },
        { title: 'Zero Mowing or Mud', desc: 'Eliminates mud, lawn mowing, fertilizing, and water bills permanently.' },
        { title: 'UV Anti-Fade Stability', desc: 'Polyethylene fibers treated with UV inhibitors retain vibrant green for 8+ years.' },
        { title: 'Seamless Adhesive Seaming', desc: 'Professional outdoor adhesive and seaming tape join roll edges invisibly.' },
      ],
      ctaLabel: 'Book Balcony Turf Site Visit →',
      ctaUrl: '/contact',
    },
  },
];

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('upvc');
  const location = useLocation();

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const hash = location.hash || window.location.hash;
    if (hash) {
      const targetId = hash.replace('#', '');
      setActiveCategory(targetId);
      setTimeout(() => {
        scrollToSection(targetId);
      }, 150);
    }
  }, [location]);

  const getWhatsAppLink = (serviceName: string) => {
    return `https://wa.me/919677708535?text=${encodeURIComponent(`Hi TruPaintz! I am interested in your ${serviceName} services. Please share more details and arrange a site visit.`)}`;
  };

  return (
    <div className="mx-auto max-w-screen-2xl w-full px-4 sm:px-6 lg:px-10 xl:px-12 pt-10 sm:pt-14 lg:pt-16 pb-24 sm:pb-32 space-y-20 sm:space-y-24 lg:space-y-28">
      
      {/* 1. HERO HEADER */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-500/30">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span className="uppercase tracking-widest font-bold">OUR SERVICES &amp; PRODUCTS CATALOGUE</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 [text-wrap:balance]">
          Complete Interior, Exterior &amp; Architectural Solutions
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
          From heavy-gauge UPVC window profiles and dustless home painting to designer curtains, AC-rated wooden floors, false ceilings, and artificial grass — engineered with uncompromised craftsmanship and manufacturer warranties.
        </p>
      </div>

      {/* 2. STICKY QUICK JUMP NAV BAR */}
      <div className="sticky top-16 sm:top-20 z-40 -mx-4 sm:-mx-6 lg:-mx-10 xl:-mx-12 px-4 sm:px-6 lg:px-10 xl:px-12 py-3 bg-[#FAF7F2]/95 backdrop-blur-md border-y border-amber-900/10 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 shrink-0 hidden md:inline mr-2">
            Services:
          </span>
          {CATALOGUE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-600'
                  : 'bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-200/90'
              }`}
            >
              <span>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. DETAILED 10 STANDARDIZED SERVICE SECTIONS */}
      <div className="space-y-28 sm:space-y-36 lg:space-y-40">
        {ALL_SERVICES_DATA.map((service) => (
          <section key={service.id} id={service.id} className="scroll-reveal scroll-mt-28 space-y-8">
            
            {/* Standard Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200/80 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                  <span className="h-2 w-2 rounded-full bg-amber-600 animate-pulse"></span>
                  <span>{service.badgeCategory}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950">
                  {service.title}
                </h2>
                <p className="text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={getWhatsAppLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-800 transition-colors shadow-2xs"
                >
                  WhatsApp Desk
                </a>
                <Link
                  to={service.quoteUrl}
                  className="btn-premium btn-shimmer-advanced inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-500 transition-all"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  <span>{service.quoteBtnText}</span>
                </Link>
              </div>
            </div>

            {/* Standard Hero Image Card with Matching Badges */}
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-950 shadow-md group">
              <div className="aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden">
                <img
                  src={service.heroImage}
                  alt={service.heroAlt}
                  className="w-full h-full object-cover img-hover-zoom brightness-90 group-hover:brightness-95 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-neutral-950 text-xs font-bold uppercase tracking-wider">
                    {service.heroBadges[0]}
                  </span>
                  {service.heroBadges.slice(1).map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Standard 4-Card Offering Grid with Identical Box Sizes and Stagger Reveal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 stagger-grid">
              {service.cards.map((card, cIdx) => (
                <div
                  key={cIdx}
                  className="card-advanced-hover p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-500/15 border border-amber-500/25 px-2.5 py-0.5 rounded-full">
                        {card.tag}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-700">
                        {card.price}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-neutral-950">
                      {card.title}
                    </h4>

                    <p className="text-xs text-neutral-600 leading-relaxed min-h-[42px]">
                      {card.desc}
                    </p>

                    <div className="pt-2 border-t border-neutral-100 space-y-1.5 text-[11px] text-neutral-600">
                      {card.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1.5">
                          <Check className="h-3 w-3 text-amber-600 shrink-0" />
                          <span className="truncate">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-mono text-[11px]">
                      {card.footerNote}
                    </span>
                    <Link
                      to={service.quoteUrl}
                      className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <span>Select</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Standard Bottom Specifications & Standards Highlight Box */}
            <div className="rounded-3xl border border-neutral-200/90 bg-amber-50/40 p-6 sm:p-8 space-y-5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-900/10 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {service.bottomHighlights.badge}
                  </span>
                  <h4 className="font-display text-xl font-bold text-neutral-950">
                    {service.bottomHighlights.title}
                  </h4>
                </div>
                <span className="text-xs text-neutral-500">
                  {service.bottomHighlights.note}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {service.bottomHighlights.pillars.map((pillar, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-1"
                  >
                    <h5 className="font-bold text-xs text-neutral-950 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span>{pillar.title}</span>
                    </h5>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-neutral-600 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Verified manufacturer warranty &amp; artisan quality assured</span>
                </span>
                <Link
                  to={service.bottomHighlights.ctaUrl}
                  className="font-bold text-amber-800 hover:text-amber-900 hover:underline"
                >
                  {service.bottomHighlights.ctaLabel}
                </Link>
              </div>
            </div>

          </section>
        ))}
      </div>

      {/* 4. STRONG FINAL CTA SECTION */}
      <div className="rounded-3xl border border-amber-900/15 bg-gradient-to-br from-neutral-950 via-neutral-900 to-amber-950 text-white p-8 sm:p-14 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>EXCELLENCE IN EVERY SQ.FT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white [text-wrap:balance]">
            Transform Your Space with Trupaintz Interiors
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            From windows and painting to flooring, ceilings and complete interior solutions — we bring heirloom quality, transparent pricing, and written manufacturer warranties.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <Link
            to="/estimator"
            className="w-full sm:w-auto btn-premium btn-shimmer-advanced rounded-xl bg-amber-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-amber-500 transition-all text-center flex items-center justify-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            <span>Calculate Instant Estimate</span>
          </Link>

          <a
            href="https://wa.me/919677708535?text=Hi%20TruPaintz!%20I%20would%20like%20to%20enquire%20about%20your%20complete%20interior%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto rounded-xl border border-neutral-700 bg-neutral-800/80 px-7 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-neutral-700 transition-all text-center flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4 text-amber-400" />
            <span>WhatsApp Consultation</span>
          </a>
        </div>
      </div>

    </div>
  );
};
