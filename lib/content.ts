export const brand = {
  name: "The Hair Extensions Bali",
  shortName: "Hair Extensions Bali",
  tagline: "Premium hair extensions, expertly applied in the heart of Bali.",
  instagram: "hairextensionsbali",
  instagramUrl: "https://instagram.com/hairextensionsbali",
  whatsapp: "+6282146918725",
  whatsappLink: "https://wa.me/6282146918725",
  whatsappDisplay: "+62 821-4691-8725",
  address: "Jl. Mertanadi No.79, Kerobokan Kelod, Kec. Kuta Utara, Kabupaten Badung, Bali 80361",
  addressShort: "Kerobokan Kelod, Bali",
  mapsLink: "https://maps.google.com/?q=The+Hair+Extensions+Bali+Jl.+Mertanadi+No.79+Kerobokan",
  mapsDisplay: "The | Hair Extensions Bali",
  hours: "Mon — Sun · 09:00 – 19:00 WITA",
};

export const aboutCopy = {
  short: "Born in Bali from a simple passion — helping women feel confident and beautiful through the power of hair.",
  long: [
    "The Hair Extensions Bali was born from a simple passion: helping women feel confident and beautiful through the power of hair. What started as a small idea in Bali has grown into a trusted destination for those seeking premium-quality extensions and professional care.",
    "We noticed that many women struggled to find natural-looking, long-lasting hair extensions in Bali. With this in mind, we set out to bring international-quality hair, advanced techniques, and a warm, personalized service to the island.",
    "We've worked with countless women from around the world — locals, expats, and travelers — each leaving with hair that not only looks stunning but also feels like their own.",
    "Today, we stand as more than just a salon; we're a place where transformation happens, where beauty meets confidence, and where every client is treated like family.",
  ],
};

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  durationLabel: string;
  lasts: string;
  reusable?: string;
  bestFor: string[];
  prices: { label: string; amountIDR: number }[];
  unit: string;
  minPurchase?: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "keratin-bond",
    name: "Keratin Bond",
    tagline: "Semi-permanent fusion, the most natural-looking finish",
    description:
      "Strands attached to your natural hair using a keratin protein bond — the same protein hair is made of, so it's gentle and safe when applied correctly.",
    durationLabel: "1 hour per 100 strands",
    lasts: "3 – 4 months",
    bestFor: [
      "Long-lasting, natural finish",
      "Healthy medium-to-thick hair",
      "Brides, models, long vacations",
      "Heat-styling lovers",
    ],
    prices: [
      { label: "Single Drawn", amountIDR: 3_500_000 },
      { label: "Double Drawn", amountIDR: 4_500_000 },
      { label: "Premium", amountIDR: 7_000_000 },
    ],
    unit: "per 100 g",
    minPurchase: "Min. purchase 10 g",
    highlights: ["Seamless blend", "Heat-stylable", "Very natural look"],
  },
  {
    slug: "nano-ring",
    name: "Nano Ring",
    tagline: "Tiny, discreet, the gentlest method on natural hair",
    description:
      "A semi-permanent, no-heat, no-glue method using rings about 90% smaller than micro rings. One of the safest methods for natural hair.",
    durationLabel: "1 hour per 100 strands",
    lasts: "8 – 12 weeks",
    reusable: "Reusable for 6 – 9 months",
    bestFor: [
      "Fine or thin hair",
      "Anyone wanting the most invisible result",
      "People avoiding heat or chemicals",
      "Reusable, cost-effective extensions",
    ],
    prices: [
      { label: "Single Drawn", amountIDR: 2_500_000 },
      { label: "Double Drawn", amountIDR: 3_500_000 },
    ],
    unit: "per 100 g",
    minPurchase: "Min. purchase 10 g",
    highlights: ["No heat · no glue", "Almost invisible", "Reusable"],
  },
  {
    slug: "micro-ring",
    name: "Micro Ring",
    tagline: "Strand-by-strand precision, no heat or chemicals",
    description:
      "Also called micro bead or i-tip extensions. Small silicone-lined metal rings secure each strand — no glue, no heat, no damage.",
    durationLabel: "1 hour per 100 strands",
    lasts: "8 – 10 weeks",
    reusable: "Reusable for 6 – 9 months",
    bestFor: [
      "Medium to thick hair",
      "Highlights or full-head application",
      "Versatile styling — ponytails, curls, braids",
      "Reusable, cost-effective extensions",
    ],
    prices: [{ label: "Single Drawn", amountIDR: 1_900_000 }],
    unit: "per 100 g",
    highlights: ["Secure hold", "No heat · no glue", "Customizable"],
  },
  {
    slug: "weft",
    name: "Weft (Sew-In)",
    tagline: "Maximum volume and length, fastest dramatic transformation",
    description:
      "Long strips of hair sewn or beaded onto your natural hair. Adds dramatic volume and length quickly with fewer attachment points.",
    durationLabel: "Approx. 1 day full installation",
    lasts: "6 – 8 weeks before repositioning",
    reusable: "Reusable for 6 – 9 months",
    bestFor: [
      "Medium to thick hair",
      "Maximum volume & length",
      "Brides, performers, special events",
      "Long-term wear",
    ],
    prices: [
      { label: "Single Drawn", amountIDR: 2_600_000 },
      { label: "Double Drawn", amountIDR: 3_500_000 },
    ],
    unit: "per 100 g",
    highlights: ["Dramatic volume", "Fewer bonds", "Long-term wear"],
  },
  {
    slug: "tape-in",
    name: "Tape-In",
    tagline: "Lightweight, lies flat, the fastest application",
    description:
      "Thin, flat wefts pre-taped with medical-grade adhesive. The stylist sandwiches a thin section of your natural hair between two tape wefts.",
    durationLabel: "Under 1.5 hours full head",
    lasts: "6 – 8 weeks before repositioning",
    reusable: "Reusable 3 – 4 times (6 – 8 months total)",
    bestFor: [
      "Fine to medium hair",
      "Anyone wanting a quick application",
      "Highlights, lowlights, or fullness",
      "Comfortable everyday wear",
    ],
    prices: [{ label: "Single Drawn", amountIDR: 2_500_000 }],
    unit: "per 100 g · 40 pcs / 20 pairs",
    highlights: ["Lightweight", "Quick install", "Lies flat"],
  },
  {
    slug: "clip-in",
    name: "Clip-In",
    tagline: "On-demand length and volume — no commitment",
    description:
      "Temporary wefts with small clips sewn on. Apply or remove yourself in minutes — perfect for events, photo shoots, or experimenting.",
    durationLabel: "DIY · minutes to apply",
    lasts: "6 – 12 months with proper care",
    bestFor: [
      "Events, parties, special occasions",
      "Experimenting with length or color",
      "No glue, no heat, no chemicals",
      "Affordable styling freedom",
    ],
    prices: [{ label: "Custom quote", amountIDR: 0 }],
    unit: "Quoted per set",
    highlights: ["DIY · zero damage", "Wear when needed", "Styling freedom"],
  },
];

export const valueProps = [
  {
    title: "100% Real Human Hair",
    body: "International-grade single, double drawn, and premium hair — sourced for longevity and natural movement.",
  },
  {
    title: "Six Application Methods",
    body: "From keratin bonds to clip-ins — we match the technique to your hair type, lifestyle, and goals.",
  },
  {
    title: "Trusted by Travelers & Locals",
    body: "Years of work with women from around the world — every client treated like family, every result built to last.",
  },
  {
    title: "Bali's Premium Destination",
    body: "Located in Kerobokan, ten minutes from Seminyak. International quality, warm Balinese hospitality.",
  },
];

export const testimonials = [
  {
    quote:
      "The most natural extensions I've ever had — and I've tried salons in London and Sydney. The keratin bonds are invisible.",
    name: "Sophie",
    location: "Visiting from London",
    service: "Keratin Bond",
  },
  {
    quote:
      "I've been getting tape-ins here for over a year. They take care of my hair like it's their own. Worth flying back to Bali for.",
    name: "Maya",
    location: "Expat, Canggu",
    service: "Tape-In",
  },
  {
    quote:
      "Got nano rings before my wedding — the photos came out beautifully and they lasted my entire honeymoon and beyond.",
    name: "Annika",
    location: "Bride, Australia",
    service: "Nano Ring",
  },
];

export const faqs = [
  {
    q: "How long do extensions last?",
    a: "It depends on the method. Tape-ins and rings last 6 – 12 weeks before repositioning, keratin bonds 3 – 4 months. With proper care, the same hair can be reused for up to 6 – 9 months — sometimes longer.",
  },
  {
    q: "Will it damage my natural hair?",
    a: "Not when applied correctly. Methods like nano ring and micro ring use no heat, no glue, and no chemicals. Keratin bonds use the same protein your hair is made of. Clip-ins and tape-ins are non-damaging when removed properly.",
  },
  {
    q: "Which method is right for me?",
    a: "We match the method to your hair type and lifestyle. Fine hair: nano ring or tape-in. Medium-thick hair: keratin bond, micro ring, or weft. Need it temporary? Clip-in. Message us on WhatsApp and we'll guide you.",
  },
  {
    q: "Do you use 100% real human hair?",
    a: "Yes — international-quality single drawn, double drawn, and premium-grade human hair. It can be styled, dyed, and cared for like your own.",
  },
  {
    q: "How long does an appointment take?",
    a: "Roughly 1 hour per 100 strands for ring and bond methods. Tape-ins under 1.5 hours. Wefts take about a day for a full installation.",
  },
  {
    q: "How do I book?",
    a: "Message us directly on WhatsApp. We'll discuss your hair, recommend a method, confirm pricing, and book you in.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Consultation",
    body: "Send us a message on WhatsApp with photos of your natural hair. We'll recommend the best method, length, and grade.",
  },
  {
    n: "02",
    title: "Match & Quote",
    body: "We confirm the hair color match, exact gram amount, and full quote — no surprises at the salon.",
  },
  {
    n: "03",
    title: "Application",
    body: "Visit the studio in Kerobokan. Most installations take 1 – 1.5 hours; wefts take a full day for dramatic transformations.",
  },
  {
    n: "04",
    title: "Aftercare",
    body: "Walk out with the look you came for, plus a personalized aftercare guide so your extensions last as long as possible.",
  },
];

export function formatIDR(amount: number): string {
  if (amount === 0) return "Custom quote";
  return new Intl.NumberFormat("en-US").format(amount) + " IDR";
}

export function formatIDRShort(amount: number): string {
  if (amount === 0) return "Custom";
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return (Number.isInteger(m) ? m.toFixed(0) : m.toFixed(1)) + "M IDR";
  }
  return formatIDR(amount);
}

// Photos — real photography from PHOTOS & VIDEOS folders, processed via
// scripts/process-photos.mjs. Each name has both `.jpg` (large, ~1920w/1280h)
// and `-md.jpg` (medium, ~1200w/800h) versions in /public/photos/.
export const visitPhoto = "/photos/salon-2.jpg";

export const galleryPhotos = [
  "/photos/products-1-md.jpg",
  "/photos/products-2-md.jpg",
  "/photos/products-3-md.jpg",
  "/photos/salon-1-md.jpg",
  "/photos/products-5-md.jpg",
  "/photos/detail-2-md.jpg",
  "/photos/products-6-md.jpg",
  "/photos/detail-3-md.jpg",
];

// Hero video — vertical (9:16) showcase of hair extensions, looped silently
// as hero accent. Has matching `poster` for fast first-paint.
export const heroVideoLuxe = {
  src: "/videos/showcase-bulk-dark.mp4",
  poster: "/videos/showcase-bulk-dark-poster.jpg",
  caption: "Dark bulk hair, raw",
};
