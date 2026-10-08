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
    num: '01',
    title: 'UPVC Windows & Doors',
    tagline: 'Precision engineered German-standard acoustic profiles & netlon systems',
    badge: 'EITI & BADYEE Certified',
    heroImage: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'From ₹290 / sq.ft',
  },
  {
    id: 'painting',
    num: '02',
    title: 'Painting',
    tagline: 'Dustless mechanized interior & exterior painting with multi-year warranties',
    badge: 'Asian Paints & Birla Paints',
    heroImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'From ₹22 / sq.ft',
  },
  {
    id: 'curtains',
    num: '03',
    title: 'Curtains',
    tagline: 'Luxury drapery, wave-fold sheers & designer fabric collections',
    badge: 'Curtains Avenue · MBF · BD Balaji',
    heroImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'Enquire for Price',
  },
  {
    id: 'blinds',
    num: '04',
    title: 'Blinds',
    tagline: 'Architectural motorized & manual window light control systems',
    badge: 'Roller · Zebra · Bamboo · PVC',
    heroImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'Enquire for Price',
  },
  {
    id: 'wallpapers',
    num: '05',
    title: 'Wallpapers',
    tagline: 'Imported vinyl textured wallcoverings with 10-year durability info',
    badge: '57 sq.ft / Roll · Vinyl Coated',
    heroImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'Enquire for Price',
  },
  {
    id: 'wooden-flooring',
    num: '06',
    title: 'Wooden Flooring',
    tagline: 'Action Tesa & Surya laminate AC3–AC5 planks, vinyl & VOX options',
    badge: 'Action Tesa · Surya · VOX',
    heroImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'From ₹140 / sq.ft',
  },
  {
    id: 'false-ceiling',
    num: '07',
    title: 'False Ceiling',
    tagline: 'Cove lighting drywall, grid, PVC, VOX and wooden ceiling architecture',
    badge: 'Saint-Gobain & USG Boral',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'From ₹75 / sq.ft',
  },
  {
    id: 'mosquito-nets',
    num: '08',
    title: 'Netlon / Mosquito Nets',
    tagline: '100% insect protection with magnetic, pleated and Saint-Gobain mesh',
    badge: 'Saint-Gobain Certified Mesh',
    heroImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'From ₹45 / sq.ft',
  },
  {
    id: 'louvers',
    num: '09',
    title: 'Louvers',
    tagline: 'High-end charcoal and shore fluted wall panels on 16mm commercial plywood',
    badge: '16mm Commercial Plywood',
    heroImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'From ₹850 / piece',
  },
  {
    id: 'artificial-grass',
    num: '10',
    title: 'Artificial Grass',
    tagline: 'Natural lush green landscaping turf for balconies, terraces & lawns',
    badge: '25mm to 50mm Pile Height',
    heroImage: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=1200&q=80',
    priceStarting: 'From ₹55 / sq.ft',
  },
];
