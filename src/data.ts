export type Occasion = 'Interview' | 'Networking' | 'Career Fair' | 'Business Professional' | 'Business Casual';
export type Category = 'Blazers' | 'Tops' | 'Trousers' | 'Skirts' | 'Shoes' | 'Accessories';
export type GarmentSlot = 'blazer' | 'top' | 'bottom' | 'shoes' | 'accessory';
export type Filters = { occasion: string; category: string; size: string; availability: string };

export type Item = {
  id: string;
  name: string;
  category: Category;
  slot: GarmentSlot;
  image: string;
  alt: string;
  color: string;
  sizes: string[];
  occasions: Occasion[];
  available: number;
  description: string;
};

// The 8 clothing photos and hero/guide images from the ORIGINAL MVP are kept intact.
// New categories (shoes, skirts, totes) use matching free Unsplash photography.
// Photos represent sample/style inspiration, not guaranteed exact inventory.
export const images = {
  "group": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&auto=format&fit=crop",
  "blazer": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&auto=format&fit=crop",
  "flatlay": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1300&auto=format&fit=crop",
  "suit": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop",
  "color": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&auto=format&fit=crop",
  "shoes": "https://images.unsplash.com/photo-1777987601447-266e128de448?w=900&auto=format&fit=crop",
  "shirt": "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=900&auto=format&fit=crop",
  "trousers": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&auto=format&fit=crop"
};

export const inventory: Item[] = [
  {
    "id": "essential-blazer",
    "name": "The Essential Blazer",
    "category": "Blazers",
    "slot": "blazer",
    "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&auto=format&fit=crop",
    "alt": "Original MVP photo of a tailored jacket",
    "color": "Midnight",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Career Fair",
      "Business Professional"
    ],
    "available": 3,
    "description": "A polished layer for interviews and professional introductions."
  },
  {
    "id": "navy-jacket",
    "name": "Structured Navy Jacket",
    "category": "Blazers",
    "slot": "blazer",
    "image": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&auto=format&fit=crop",
    "alt": "Original MVP editorial photo of a structured jacket",
    "color": "Navy",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Interview",
      "Career Fair",
      "Business Professional"
    ],
    "available": 2,
    "description": "Structured and easy to dress up for formal professional events."
  },
  {
    "id": "stone-blazer",
    "name": "Stone Relaxed Blazer",
    "category": "Blazers",
    "slot": "blazer",
    "image": "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&auto=format&fit=crop",
    "alt": "Illustrative MVP tailored jacket photography",
    "color": "Stone",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Business Professional",
      "Business Casual"
    ],
    "available": 3,
    "description": "Soft tailoring that transitions from coffee chats to interview day."
  },
  {
    "id": "weekend-jacket",
    "name": "Relaxed Work Jacket",
    "category": "Blazers",
    "slot": "blazer",
    "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1300&auto=format&fit=crop",
    "alt": "Illustrative clothing image from the original MVP",
    "color": "Warm beige",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Networking",
      "Career Fair",
      "Business Casual"
    ],
    "available": 4,
    "description": "A comfortable extra layer for a more relaxed professional setting."
  },
  {
    "id": "white-shirt",
    "name": "Classic White Shirt",
    "category": "Tops",
    "slot": "top",
    "image": "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&auto=format&fit=crop",
    "alt": "Original MVP photo of a classic white shirt",
    "color": "White",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Interview",
      "Career Fair",
      "Business Professional",
      "Business Casual"
    ],
    "available": 5,
    "description": "A clean foundation for professional and business casual outfits."
  },
  {
    "id": "oxford-shirt",
    "name": "Oxford Button-Down",
    "category": "Tops",
    "slot": "top",
    "image": "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=900&auto=format&fit=crop",
    "alt": "Original MVP shirt photo",
    "color": "Sky blue",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Career Fair",
      "Business Casual"
    ],
    "available": 6,
    "description": "A timeless shirt with a crisp, professional finish."
  },
  {
    "id": "ivory-blouse",
    "name": "Ivory Collar Blouse",
    "category": "Tops",
    "slot": "top",
    "image": "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&auto=format&fit=crop",
    "alt": "Illustrative original MVP shirt photo",
    "color": "Ivory",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Business Professional"
    ],
    "available": 4,
    "description": "An easy-to-style top for a professional look with personality."
  },
  {
    "id": "knit-layer",
    "name": "Relaxed Knit Layer",
    "category": "Tops",
    "slot": "top",
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&auto=format&fit=crop",
    "alt": "Original MVP image of relaxed knit clothing",
    "color": "Cream",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "occasions": [
      "Networking",
      "Career Fair",
      "Business Professional",
      "Business Casual"
    ],
    "available": 3,
    "description": "A softer approach to business casual and professional layering."
  },
  {
    "id": "neutral-trousers",
    "name": "Tailored Neutral Trousers",
    "category": "Trousers",
    "slot": "bottom",
    "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&auto=format&fit=crop",
    "alt": "Original MVP image of neutral trousers",
    "color": "Sand",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Career Fair",
      "Business Casual"
    ],
    "available": 4,
    "description": "Versatile tailored trousers that pair with nearly anything."
  },
  {
    "id": "charcoal-dress-pants",
    "name": "Charcoal Dress Pants",
    "category": "Trousers",
    "slot": "bottom",
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop",
    "alt": "Original MVP photo of charcoal pants",
    "color": "Charcoal",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Interview",
      "Career Fair",
      "Business Professional"
    ],
    "available": 4,
    "description": "A dependable staple for a confident first impression."
  },
  {
    "id": "black-trousers",
    "name": "Black Straight-Leg Trousers",
    "category": "Trousers",
    "slot": "bottom",
    "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=900&auto=format&fit=crop",
    "alt": "Illustrative original MVP tailored trouser photo",
    "color": "Black",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Business Professional"
    ],
    "available": 5,
    "description": "Comfortable straight-leg structure with clean lines for long events."
  },
  {
    "id": "taupe-chinos",
    "name": "Everyday Tailored Chinos",
    "category": "Trousers",
    "slot": "bottom",
    "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&auto=format&fit=crop",
    "alt": "Illustrative original MVP tailored trouser photo",
    "color": "Taupe",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Networking",
      "Career Fair",
      "Business Professional",
      "Business Casual"
    ],
    "available": 3,
    "description": "A smart-casual alternative that feels polished without being stiff."
  },
  {
    "id": "black-midi-skirt",
    "name": "Classic Black Midi Skirt",
    "category": "Skirts",
    "slot": "bottom",
    "image": "https://images.unsplash.com/photo-1763444134734-166e349dcba8?w=900&auto=format&fit=crop",
    "alt": "Skirt outfit shown on a person in a professional setting",
    "color": "Black",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Business Professional"
    ],
    "available": 3,
    "description": "A timeless silhouette suitable for formal and semi-formal events."
  },
  {
    "id": "stone-pleated-skirt",
    "name": "Stone Pleated Skirt",
    "category": "Skirts",
    "slot": "bottom",
    "image": "https://images.unsplash.com/photo-1753161025693-e68299ad484f?w=900&auto=format&fit=crop",
    "alt": "Clothing store skirt inspiration, illustrative",
    "color": "Stone",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "occasions": [
      "Interview",
      "Career Fair",
      "Business Casual"
    ],
    "available": 3,
    "description": "An easy-moving option to pair with a classic button-down."
  },
  {
    "id": "navy-pencil-skirt",
    "name": "Navy Pencil Skirt",
    "category": "Skirts",
    "slot": "bottom",
    "image": "https://images.unsplash.com/photo-1763444134734-166e349dcba8?w=900&auto=format&fit=crop",
    "alt": "Professional skirt outfit photograph, illustrative",
    "color": "Navy",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "occasions": [
      "Interview",
      "Career Fair",
      "Business Professional"
    ],
    "available": 2,
    "description": "An interview-ready silhouette for structured professional outfits."
  },
  {
    "id": "a-line-skirt",
    "name": "A-Line Midi Skirt",
    "category": "Skirts",
    "slot": "bottom",
    "image": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&auto=format&fit=crop",
    "alt": "Original MVP fashion inspiration photograph, illustrative",
    "color": "Taupe",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "occasions": [
      "Networking",
      "Career Fair",
      "Business Professional",
      "Business Casual"
    ],
    "available": 4,
    "description": "A polished, comfortable option for networking or an office day."
  },
  {
    "id": "polished-loafers",
    "name": "Polished Leather Loafers",
    "category": "Shoes",
    "slot": "shoes",
    "image": "https://images.unsplash.com/photo-1777987601447-266e128de448?w=900&auto=format&fit=crop",
    "alt": "Photo of brown leather loafers",
    "color": "Brown",
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Career Fair",
      "Business Professional",
      "Business Casual"
    ],
    "available": 4,
    "description": "Smart, comfortable shoes for career events with lots of walking."
  },
  {
    "id": "oxford-shoes",
    "name": "Classic Oxford Shoes",
    "category": "Shoes",
    "slot": "shoes",
    "image": "https://images.unsplash.com/photo-1777987601426-c05a82045862?w=900&auto=format&fit=crop",
    "alt": "Photo of classic black leather dress shoes",
    "color": "Black",
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "occasions": [
      "Interview",
      "Career Fair",
      "Business Professional"
    ],
    "available": 3,
    "description": "Traditional formal shoes with a clean profile."
  },
  {
    "id": "low-heel-shoes",
    "name": "Low-Heel Buckle Shoes",
    "category": "Shoes",
    "slot": "shoes",
    "image": "https://images.unsplash.com/photo-1758542988948-b95a6c4aa68b?w=900&auto=format&fit=crop",
    "alt": "Photo of black leather buckle shoes",
    "color": "Black",
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Business Professional"
    ],
    "available": 2,
    "description": "A low-profile polished option with secure buckle detailing."
  },
  {
    "id": "neutral-flats",
    "name": "Comfort-First Flats",
    "category": "Shoes",
    "slot": "shoes",
    "image": "https://images.unsplash.com/photo-1748341545593-12c86c6ab718?w=900&auto=format&fit=crop",
    "alt": "Illustrative photo of neutral professional footwear",
    "color": "Tan",
    "sizes": [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11"
    ],
    "occasions": [
      "Networking",
      "Career Fair",
      "Business Casual"
    ],
    "available": 5,
    "description": "An easier choice for standing, walking, and longer campus events."
  },
  {
    "id": "leather-belt",
    "name": "Minimal Leather Belt",
    "category": "Accessories",
    "slot": "accessory",
    "image": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=900&auto=format&fit=crop",
    "alt": "Original MVP photo of a leather belt",
    "color": "Black",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Business Professional",
      "Business Casual"
    ],
    "available": 8,
    "description": "A finishing detail for a put-together look."
  },
  {
    "id": "portfolio-case",
    "name": "Interview Portfolio",
    "category": "Accessories",
    "slot": "accessory",
    "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1300&auto=format&fit=crop",
    "alt": "Original MVP professional wardrobe photo, illustrative",
    "color": "Black",
    "sizes": [
      "One size"
    ],
    "occasions": [
      "Interview",
      "Career Fair",
      "Business Professional"
    ],
    "available": 4,
    "description": "Keeps notes, resumes, and interview materials organized."
  },
  {
    "id": "work-tote",
    "name": "Structured Work Tote",
    "category": "Accessories",
    "slot": "accessory",
    "image": "https://images.unsplash.com/photo-1773766779226-bed5e3cdcc50?w=900&auto=format&fit=crop",
    "alt": "Photograph of a tote bag worn outdoors",
    "color": "Tan",
    "sizes": [
      "One size"
    ],
    "occasions": [
      "Networking",
      "Career Fair",
      "Business Casual"
    ],
    "available": 3,
    "description": "A practical carryall for a notebook, resume copies, and essentials."
  },
  {
    "id": "soft-scarf",
    "name": "Lightweight Neutral Scarf",
    "category": "Accessories",
    "slot": "accessory",
    "image": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&auto=format&fit=crop",
    "alt": "Original MVP fashion photo, illustrative",
    "color": "Cream",
    "sizes": [
      "One size"
    ],
    "occasions": [
      "Interview",
      "Networking",
      "Career Fair",
      "Business Casual"
    ],
    "available": 5,
    "description": "A soft accent that complements structured pieces."
  }
];

export const occasions: { name: Occasion; note: string; tone: string }[] = [
  { name: 'Interview', note: 'Make a confident first impression', tone: 'coral' },
  { name: 'Networking', note: 'Approachable, polished, prepared', tone: 'blue' },
  { name: 'Career Fair', note: 'Ready for a room full of possibilities', tone: 'lime' },
  { name: 'Business Professional', note: 'Classic structure, elevated details', tone: 'navy' },
  { name: 'Business Casual', note: 'Professional with room to breathe', tone: 'cream' },
];

export const guideCards = [
  { title: 'Interview', kicker: 'Lead with confidence', image: images.suit, body: 'Start with structure, a clean shirt, and comfortable polished shoes. The point is to feel ready for the conversation.', look: 'Navy blazer + Oxford shirt + tailored trousers' },
  { title: 'Networking', kicker: 'Make it easy to connect', image: images.color, body: 'A comfortable layer and personal detail can make an outfit feel like you while still looking event-ready.', look: 'Relaxed jacket + classic shirt + chinos' },
  { title: 'Career Fair', kicker: 'Ready for a full day', image: images.group, body: 'Choose flexible layers and shoes made for moving around while you meet different employers.', look: 'Essential blazer + tailored trousers + loafers' },
  { title: 'Business Professional', kicker: 'Classic, considered, capable', image: images.blazer, body: 'Keep it intentional with tailored shapes, a neat fit, and a few elevated pieces.', look: 'Structured jacket + white shirt + dress pants' },
  { title: 'Business Casual', kicker: 'Polished, not overdone', image: images.flatlay, body: 'Balance an easy layer with one elevated piece, and bring your own sense of style.', look: 'Knit layer + tailored chinos + comfortable flats' },
];

export const slotLabels: Record<GarmentSlot, string> = {
  blazer: 'Blazer / jacket', top: 'Shirt / blouse', bottom: 'Trousers / skirt',
  shoes: 'Shoes', accessory: 'Accessory',
};
