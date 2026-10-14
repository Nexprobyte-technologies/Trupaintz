export interface ServiceCatalogueCategory {
  id: string;
  num: string;
  title: string;
  tagline: string;
  badge: string;
  heroImage: string;
  priceStarting: string;
}

export const CATALOGUE_CATEGORIES: ServiceCatalogueCategory[] = [
  {
    id: 'upvc',
    num: '',
    title: 'UPVC Windows & Doors',
    tagline: 'Precision engineered German-standard acoustic profiles & netlon systems',
    badge: 'EITI & BADYEE Certified',
    heroImage: '/services/upvc-windows-doors.png',
    priceStarting: 'From ₹290 / sq.ft',
  },
  {
    id: 'painting',
    num: '',
    title: 'Painting',
    tagline: 'Dustless mechanized interior & exterior painting with multi-year warranties',
    badge: 'Asian Paints & Birla Paints',
    heroImage: '/services/painting.png',
    priceStarting: 'From ₹22 / sq.ft',
  },
  {
    id: 'curtains',
    num: '',
    title: 'Curtains',
    tagline: 'Luxury drapery, wave-fold sheers & designer fabric collections',
    badge: 'Curtains Avenue · MBF · BD Balaji',
    heroImage: '/services/curtains.png',
    priceStarting: 'From ₹250 / m',
  },
  {
    id: 'blinds',
    num: '',
    title: 'Blinds',
    tagline: 'Architectural motorized & manual window light control systems',
    badge: 'Roller · Zebra · Bamboo · PVC',
    heroImage: '/services/blinds.png',
    priceStarting: 'From ₹75 / sq.ft',
  },
  {
    id: 'wallpapers',
    num: '',
    title: 'Wallpapers',
    tagline: 'Imported vinyl textured wallcoverings with 10-year durability info',
    badge: '57 sq.ft / Roll · Vinyl Coated',
    heroImage: '/services/wallpapers.png',
    priceStarting: 'From ₹950 / roll',
  },
  {
    id: 'wooden-flooring',
    num: '',
    title: 'Wooden Flooring',
    tagline: 'Action Tesa & Surya laminate AC3–AC5 planks, vinyl & VOX options',
    badge: 'Action Tesa · Surya · VOX',
    heroImage: '/services/wooden-flooring.png',
    priceStarting: 'From ₹140 / sq.ft',
  },
  {
    id: 'false-ceiling',
    num: '',
    title: 'False Ceiling',
    tagline: 'Cove lighting drywall, grid, PVC, VOX and wooden ceiling architecture',
    badge: 'Saint-Gobain & USG Boral',
    heroImage: '/services/false-ceiling.png',
    priceStarting: 'From ₹75 / sq.ft',
  },
  {
    id: 'mosquito-nets',
    num: '',
    title: 'Netlon / Mosquito Nets',
    tagline: '100% insect protection with magnetic, pleated and Saint-Gobain mesh',
    badge: 'Saint-Gobain Certified Mesh',
    heroImage: '/services/netlon-mosquito-nets.png',
    priceStarting: 'From ₹45 / sq.ft',
  },
  {
    id: 'louvers',
    num: '',
    title: 'Louvers',
    tagline: 'High-end charcoal and shore fluted wall panels on 16mm commercial plywood',
    badge: '16mm Commercial Plywood',
    heroImage: '/services/louvers.png',
    priceStarting: 'From ₹850 / piece',
  },
  {
    id: 'artificial-grass',
    num: '',
    title: 'Artificial Grass',
    tagline: 'Natural lush green landscaping turf for balconies, terraces & lawns',
    badge: '25mm to 50mm Pile Height',
    heroImage: '/services/artificial-grass.png',
    priceStarting: 'From ₹55 / sq.ft',
  },
];
