export const brand = {
  name: "The Hair Extensions Bali",
  shortName: "Hair Extensions Bali",
  tagline:
    "Bali's largest hair extension shop. Premium real human hair, expertly fitted in Kerobokan. Extensions only — no cuts, colour, or styling.",
  instagram: "hairextensionsbali",
  instagramUrl: "https://instagram.com/hairextensionsbali",
  whatsapp: "+6282146918725",
  whatsappLink: "https://wa.me/6282146918725",
  whatsappDisplay: "+62 821-4691-8725",
  address: "Jl. Mertanadi No.79, Kerobokan Kelod, Kec. Kuta Utara, Kabupaten Badung, Bali 80361",
  addressShort: "Kerobokan Kelod, Bali",
  street: "Jl. Mertanadi No.79",
  locality: "Kerobokan Kelod",
  region: "Bali",
  postalCode: "80361",
  country: "ID",
  mapsLink: "https://maps.google.com/?q=The+Hair+Extensions+Bali+Jl.+Mertanadi+No.79+Kerobokan",
  mapsDisplay: "The | Hair Extensions Bali",
  hours: "Mon — Sun · 09:00 – 19:00 WITA",
  hoursOpens: "09:00",
  hoursCloses: "19:00",
  priceRange: "IDR 1,900,000 – 8,000,000",
  amenities: [
    "On-site parking",
    "Restroom available",
    "Walk-ins welcome (by call)",
    "Air-conditioned",
    "Wheelchair-accessible entrance",
  ],
};

/**
 * Specialisation notice — surfaced as a prominent callout above the
 * shop-feature cards. The owner reports constant requests from walk-ins
 * for cuts/colour/styling. We don't do those. This needs to be the
 * first thing a visitor reads after "Why visit us".
 *
 * Body delivered in both English and Bahasa Indonesia, since walk-in
 * confusion happens in both languages.
 */
export const specialisationNotice = {
  eyebrow: "Heads up — we specialise · Khusus extension",
  title: "Extensions only — no cuts, no colour, no styling.",
  body:
    "We sell and install premium hair extensions — that's all we do, all day. For cuts, colour, or styling, please visit your favourite stylist; come to us for world-class hair and expert fitting.",
  bodyId:
    "Kami toko rambut, bukan salon. Kami khusus jual dan pasang hair extension — tidak melayani potong, cat, atau styling rambut.",
};

/**
 * Shop-feature cards — used in the "Why visit us" section on the home page.
 * Written to be fact-rich and natural-language friendly so AI assistants
 * (ChatGPT, Claude, Perplexity, Gemini) can quote them when answering
 * questions like "where to buy hair extensions in Bali".
 *
 * `icon` is a lucide-react component name; mapped to JSX in page.tsx.
 */
export const shopFeatures = [
  {
    icon: "Store",
    title: "Bali's largest hair extension shop",
    body:
      "100+ shades on display in our Kerobokan hair shop. Wavy, curly, straight, and bone-straight textures. Single drawn, double drawn, premium Remy hair, and Indonesian-sourced human hair — all 100% real, sourced for natural movement and longevity. Always Indonesian hair in stock, alongside international grades.",
  },
  {
    icon: "Eye",
    title: "Shop in person, install on the spot",
    body:
      "Unlike most extension salons, we're a hair shop first. Walk in to browse the wall, feel every texture, hold shades against your own hair — then have your chosen extension professionally installed the same day, using whichever of our seven methods suits you best.",
  },
  {
    icon: "DoorOpen",
    title: "Walk-in friendly, parking on-site",
    body:
      "Located in tourist Kerobokan, ten minutes from Seminyak, fifteen from Canggu. On-site parking, restroom available, air-conditioned interior. Appointments preferred — but walk-ins are welcome if you call ahead on WhatsApp.",
  },
  {
    icon: "BadgeCheck",
    title: "Fair pricing, transparent rates",
    body:
      "Every price published upfront on our website — no hidden costs, no \"DM for price\" games. International-grade human hair at a fraction of what you'd pay in Sydney, London, or Singapore, with full installation included and ongoing maintenance support.",
  },
];

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
  /** Long-form description for the detail page */
  longDescription?: string;
  durationLabel: string;
  lasts: string;
  reusable?: string;
  bestFor: string[];
  prices: { label: string; amountIDR: number }[];
  unit: string;
  minPurchase?: string;
  /** Bundle promo pricing (e.g. "Single 150 g" at a package rate) */
  promoBundles?: { label: string; amountIDR: number }[];
  /** Premium grade priced by length (keratin glue premium) */
  premiumLengths?: { label: string; amountIDR: number }[];
  /** Maintenance / service menu (remove, reposition, new glue, …).
   *  `ours` = price with hair bought from us, `outside` = outside hair. */
  maintenance?: {
    rows: { label: string; ours: string; outside?: string }[];
    notes?: string[];
  };
  highlights: string[];
  /** Material composition — what the extension is physically made of */
  materials?: string[];
  /** What's included in the appointment / package */
  whatsIncluded?: string[];
  /** Ideal hair type traits */
  idealHairType?: string[];
  /** Aftercare tips specific to this method */
  aftercare?: string[];
  /** Before / after photo paths. `real: true` flags an actual client pair
   *  (suppresses the "placeholders coming soon" disclaimer on the page). */
  beforeAfter?: { before: string; after: string; real?: boolean };
  /** Hero / detail page image */
  heroPhoto?: string;
};

export const services: Service[] = [
  {
    slug: "keratin-bond",
    name: "Keratin Bond",
    tagline: "Semi-permanent fusion, the most natural-looking finish",
    description:
      "Strands attached to your natural hair using a keratin protein bond — the same protein hair is made of, so it's gentle and safe when applied correctly.",
    longDescription:
      "Keratin bond extensions (also called fusion or hot-fusion) are our most invisible and longest-lasting method. Each strand is attached individually using a small bead of keratin — the same natural protein your own hair is built from. Applied with a precision heat tool, the bond forms a flexible, almost weightless connection that moves with your hair, blends seamlessly with your scalp, and disappears completely once color-matched. Ideal for clients who want extensions that feel and behave like their own hair, for months at a time.",
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
    ],
    unit: "per 100 g",
    minPurchase: "Min. buy 1 tag (20 pcs ±10 g) · install 4,000 IDR/strand",
    promoBundles: [
      { label: "Single 100 g", amountIDR: 3_500_000 },
      { label: "Single 200 g", amountIDR: 4_800_000 },
      { label: "Double 100 g", amountIDR: 4_500_000 },
      { label: "Double 150 g", amountIDR: 5_800_000 },
      { label: "Double 200 g", amountIDR: 6_800_000 },
    ],
    premiumLengths: [
      { label: "Premium 40 cm", amountIDR: 5_000_000 },
      { label: "Premium 50 cm", amountIDR: 6_000_000 },
      { label: "Premium 60 cm", amountIDR: 7_000_000 },
      { label: "Premium 70 cm", amountIDR: 8_000_000 },
    ],
    maintenance: {
      rows: [
        { label: "Remove (per strand)", ours: "4,000", outside: "8,000" },
        { label: "Install (per strand)", ours: "6,000", outside: "10,000" },
        { label: "New glue (per strand)", ours: "6,000", outside: "8,000" },
      ],
      notes: [
        "Minimum service 50 strands",
        "Standard turnaround 2 days · 1-day express 20,000 IDR/strand",
        "No warranty for installations using glue not provided by us",
      ],
    },
    highlights: ["Seamless blend", "Heat-stylable", "Very natural look"],
    materials: [
      "100% real human hair (single / double / premium drawn)",
      "Pre-tipped keratin protein bond (food-grade, salon-standard)",
      "Heat-fusion connector tool",
    ],
    whatsIncluded: [
      "Free WhatsApp color match before your visit",
      "Full installation in our Kerobokan studio",
      "Trim and style after install (bring inspo photos)",
      "Personalised aftercare guide",
    ],
    idealHairType: [
      "Medium to thick density",
      "Healthy, not over-processed",
      "Hair that can hold a small bond without breakage",
      "Not ideal for very fine or fragile hair",
    ],
    aftercare: [
      "Wait 48 hours before first wash",
      "Use sulfate-free, alcohol-free shampoo",
      "Brush from tips to roots, twice daily",
      "Always sleep with hair loosely tied + silk pillowcase",
      "Avoid direct heat on the bonds — keep iron 2 cm below",
    ],
    heroPhoto: "/photos/before-after/keratin-bond-detail.jpg",
  },
  {
    slug: "nano-ring",
    name: "Nano Ring",
    tagline: "Tiny, discreet, the gentlest method on natural hair",
    description:
      "A semi-permanent, no-heat, no-glue method using rings about 90% smaller than micro rings. One of the safest methods for natural hair.",
    longDescription:
      "Nano rings are the smallest attachment we use — roughly 90% smaller than a standard micro ring, virtually invisible against the scalp. Each strand is threaded through a silicone-lined metal ring and clamped closed with a precision plier. No heat. No glue. No chemicals. The silicone protects your natural hair from the metal, and the tiny size makes nano rings the gentlest semi-permanent method available — particularly suited to fine or thin hair that struggles with heavier methods.",
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
      { label: "Single Drawn", amountIDR: 3_500_000 },
      { label: "Double Drawn", amountIDR: 4_500_000 },
    ],
    unit: "per 100 g",
    minPurchase: "Min. buy 1 tag (50 pcs ±53 g) · free install",
    promoBundles: [
      { label: "Single 100 g", amountIDR: 2_800_000 },
      { label: "Single 150 g", amountIDR: 4_000_000 },
      { label: "Single 200 g", amountIDR: 5_000_000 },
      { label: "Double 100 g", amountIDR: 3_500_000 },
      { label: "Double 150 g", amountIDR: 4_800_000 },
      { label: "Double 200 g", amountIDR: 5_800_000 },
    ],
    maintenance: {
      rows: [
        { label: "Remove (per strand)", ours: "5,000", outside: "5,000" },
        { label: "Install (per strand)", ours: "5,000", outside: "10,000" },
        { label: "New glue (per strand)", ours: "10,000", outside: "20,000" },
      ],
      notes: ["Minimum service 50 strands"],
    },
    highlights: ["No heat · no glue", "Almost invisible", "Reusable"],
    materials: [
      "100% real human hair (single / double drawn)",
      "Silicone-lined nano metal rings (~2 mm)",
      "Threading hook + clamping plier",
    ],
    whatsIncluded: [
      "Free WhatsApp color match before your visit",
      "Full installation in our Kerobokan studio",
      "Trim and style after install",
      "Personalised aftercare guide",
      "Maintenance refit available every 8 – 12 weeks",
    ],
    idealHairType: [
      "Fine to medium density",
      "Anyone with thin or fragile hair",
      "Clients avoiding heat / glue",
      "Best on healthy, not heavily-bleached hair",
    ],
    aftercare: [
      "Wait 48 hours before first wash — let the rings settle",
      "Avoid hair masks at the roots (oils slip the rings)",
      "Brush gently from tips up — never tug the ring band",
      "Sleep with hair tied in a low loose braid",
      "Schedule a refit every 8 – 12 weeks as natural hair grows",
    ],
    heroPhoto: "/photos/products-5.jpg",
  },
  {
    slug: "micro-ring",
    name: "Micro Ring",
    tagline: "Strand-by-strand precision, no heat or chemicals",
    description:
      "Also called micro bead or i-tip extensions. Small silicone-lined metal rings secure each strand — no glue, no heat, no damage.",
    longDescription:
      "Micro rings (i-tip or micro bead extensions) sit between nano rings and wefts in size and strength. Each strand passes through a small silicone-lined metal ring that's clamped tight against your natural hair. The silicone lining protects your hair from the metal, and the secure hold makes micro rings ideal for medium-to-thick hair that needs a little more grip than a nano ring can provide. Like nanos, they use no heat, glue, or chemicals — and the rings + hair are reusable for months with a simple refit.",
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
    materials: [
      "100% real human hair (single drawn, i-tip pre-bonded)",
      "Silicone-lined micro metal rings (~3 mm)",
      "Threading hook + clamping plier",
    ],
    whatsIncluded: [
      "Free WhatsApp color match before your visit",
      "Full installation in our Kerobokan studio",
      "Custom placement — highlights or full-head",
      "Trim and style after install",
      "Personalised aftercare guide",
    ],
    idealHairType: [
      "Medium to thick density",
      "Healthy hair without heavy chemical damage",
      "Clients who want versatile styling (updos, braids)",
      "Anyone preferring a no-heat method",
    ],
    aftercare: [
      "Wait 48 hours before first wash — let the rings settle",
      "Hair masks fine — but keep them mid-length to ends only",
      "Brush gently with a loop brush, tips first",
      "Avoid silicone leave-ins (can slip the bonds)",
      "Refit every 8 – 10 weeks as natural hair grows",
    ],
    heroPhoto: "/photos/before-after/micro-ring-detail.jpg",
  },
  {
    slug: "weft",
    name: "Weft (Sew-In)",
    tagline: "Maximum volume and length, fastest dramatic transformation",
    description:
      "Long strips of hair sewn or beaded onto your natural hair. Adds dramatic volume and length quickly with fewer attachment points.",
    longDescription:
      "A weft is a long strip of hair sewn at the top, ready to be stitched or beaded onto a horizontal cornrow of your natural hair. Because each weft covers a wide area, you get dramatic volume and length with far fewer attachment points than strand-by-strand methods. That makes wefts the fastest way to a full transformation — and the strongest method for clients who want long-term, high-impact wear: brides, performers, content creators, and anyone preparing for a major event.",
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
      { label: "Single Drawn", amountIDR: 3_500_000 },
      { label: "Double Drawn", amountIDR: 4_500_000 },
      { label: "Weft Premium", amountIDR: 5_500_000 },
    ],
    unit: "per 100 g",
    minPurchase: "Min. buy 50 g · free install",
    promoBundles: [
      { label: "Single 100 g", amountIDR: 3_500_000 },
      { label: "Single 150 g", amountIDR: 4_800_000 },
      { label: "Single 200 g", amountIDR: 5_800_000 },
      { label: "Double 100 g", amountIDR: 4_500_000 },
      { label: "Double 150 g", amountIDR: 6_200_000 },
      { label: "Double 200 g", amountIDR: 7_200_000 },
    ],
    maintenance: {
      rows: [
        { label: "Reposition 1 row", ours: "400,000" },
        { label: "Reposition 2 rows", ours: "750,000" },
        { label: "Reposition 3 rows", ours: "900,000" },
        { label: "Reposition 4 rows", ours: "1,100,000" },
        { label: "Reposition 5 rows", ours: "1,150,000" },
        { label: "Remove only · 1 row", ours: "200,000" },
        { label: "Remove only · 2–5 rows", ours: "350,000" },
      ],
    },
    highlights: ["Dramatic volume", "Fewer bonds", "Long-term wear"],
    materials: [
      "100% real human hair (single / double drawn)",
      "Hand-sewn weft track at the top",
      "Cotton sewing thread + needle, or silicone beads",
    ],
    whatsIncluded: [
      "Free WhatsApp color match before your visit",
      "Cornrow braiding of your natural hair",
      "Sewn-in installation across the head",
      "Trim, blend, and style after install",
      "Personalised aftercare guide",
    ],
    idealHairType: [
      "Medium to thick density",
      "Healthy, strong natural hair (the cornrow holds the weft)",
      "Clients wanting maximum volume in one session",
      "Not ideal for very fine or fragile hair",
    ],
    aftercare: [
      "Wait 48 hours before first wash — let the wefts settle",
      "Keep the cornrow base clean — wash carefully every 5 – 7 days",
      "Use a wide-tooth comb on the lengths only",
      "Sleep with hair in a low ponytail or loose braid",
      "Schedule repositioning every 6 – 8 weeks",
    ],
    heroPhoto: "/photos/before-after/weft-installation.jpg",
    beforeAfter: {
      before: "/photos/before-after/weft-before.jpg",
      after: "/photos/before-after/weft-after.jpg",
      real: true,
    },
  },
  {
    slug: "tape-in",
    name: "Tape-In",
    tagline: "Lightweight, lies flat, the fastest application",
    description:
      "Thin, flat wefts pre-taped with medical-grade adhesive. The stylist sandwiches a thin section of your natural hair between two tape wefts.",
    longDescription:
      "Tape-ins are pre-cut, flat wefts of hair backed with a medical-grade hypoallergenic adhesive — the same family used for sensitive-skin medical tape. The stylist sandwiches a thin section of your natural hair between two tape wefts so the adhesive bonds top-to-top, leaving the section nearly invisible. Because the wefts lie flat against your scalp, tape-ins are the most comfortable everyday-wear option, the fastest to install, and the easiest to remove cleanly with the right oil-based releaser.",
    durationLabel: "Under 1.5 hours full head",
    lasts: "6 – 8 weeks before repositioning",
    reusable: "Reusable 3 – 4 times (6 – 8 months total)",
    bestFor: [
      "Fine to medium hair",
      "Anyone wanting a quick application",
      "Highlights, lowlights, or fullness",
      "Comfortable everyday wear",
    ],
    prices: [
      { label: "Single Drawn", amountIDR: 3_500_000 },
      { label: "Double Drawn", amountIDR: 4_500_000 },
    ],
    unit: "per 100 g",
    minPurchase: "Min. buy 1 tag (5 pairs / 10 pcs ±30 g) · install 20,000 IDR/pair",
    promoBundles: [
      { label: "Single 100 g", amountIDR: 2_800_000 },
      { label: "Single 150 g", amountIDR: 3_800_000 },
      { label: "Single 200 g", amountIDR: 4_800_000 },
      { label: "Double 100 g", amountIDR: 3_800_000 },
      { label: "Double 150 g", amountIDR: 5_800_000 },
      { label: "Double 200 g", amountIDR: 6_800_000 },
    ],
    maintenance: {
      rows: [
        { label: "Install (per pair)", ours: "25,000" },
        { label: "New glue (per pair)", ours: "25,000" },
      ],
      notes: ["Minimum service 20 pcs / 10 pairs"],
    },
    highlights: ["Lightweight", "Quick install", "Lies flat"],
    materials: [
      "100% real human hair (single drawn, flat-weft format)",
      "Medical-grade hypoallergenic adhesive backing",
      "Replacement tapes for refits",
    ],
    whatsIncluded: [
      "Free WhatsApp color match before your visit",
      "Full installation (under 1.5 hr)",
      "Trim and style after install",
      "Personalised aftercare guide",
      "Refit using replacement tapes after 6 – 8 weeks",
    ],
    idealHairType: [
      "Fine to medium density",
      "Healthy hair without heavy oils at the scalp",
      "Anyone wanting a fast install",
      "Clients who prefer a flat, flush look",
    ],
    aftercare: [
      "No oils, masks, or conditioner near the tape line",
      "Wait 48 hours before first wash",
      "Sulfate-free shampoo only",
      "Schedule a refit every 6 – 8 weeks for fresh tapes",
    ],
    heroPhoto: "/photos/products-2.jpg",
  },
  {
    slug: "halo-hair",
    name: "Halo Hair",
    tagline: "A hidden wire, instant volume — zero attachment",
    description:
      "A weft mounted on an invisible wire that sits like a halo under your top layer of hair. On in seconds, off in seconds — no clips, no glue, no commitment.",
    longDescription:
      "Halo hair is the gentlest extension there is: a single curved weft mounted on a thin, invisible wire that rests on your head like a halo, hidden under your own top layer of hair. Nothing attaches to your natural hair — no rings, no glue, no clips pulling at the roots. You put it on in seconds in front of a mirror and lift it off just as fast. Because there is zero attachment, it's the one method that suits even very fine, fragile, or thinning hair. Cared for properly, a halo set lasts 6 – 12 months and can be styled, dyed, and reused like your own hair.",
    durationLabel: "DIY · seconds to wear",
    lasts: "6 – 12 months with proper care",
    bestFor: [
      "Very fine, fragile, or thinning hair",
      "Anyone avoiding attachments completely",
      "Daily on/off flexibility",
      "First-timers testing extensions",
    ],
    prices: [
      { label: "Single Drawn", amountIDR: 3_500_000 },
      { label: "Double Drawn", amountIDR: 4_500_000 },
    ],
    unit: "per 100 g",
    minPurchase: "Min. buy 50 g · no installation needed",
    promoBundles: [
      { label: "Single 100 g", amountIDR: 2_800_000 },
      { label: "Single 150 g", amountIDR: 4_000_000 },
      { label: "Single 200 g", amountIDR: 5_000_000 },
      { label: "Double 100 g", amountIDR: 4_500_000 },
      { label: "Double 150 g", amountIDR: 6_200_000 },
      { label: "Double 200 g", amountIDR: 7_200_000 },
    ],
    highlights: ["Zero attachment", "On/off in seconds", "Gentlest method"],
    materials: [
      "100% real human hair, hand-sewn weft",
      "Invisible nylon wire, adjustable sizing",
      "Soft weft base for scalp comfort",
    ],
    whatsIncluded: [
      "Free WhatsApp color match before your visit",
      "Wire sized to your head at the shop",
      "Fitting demo — wear it confidently before you leave",
      "Personalised care guide",
    ],
    idealHairType: [
      "Fine to medium density",
      "Fragile or thinning hair that can't hold attachments",
      "Anyone wanting daily flexibility",
      "Clients hesitant about permanent methods",
    ],
    aftercare: [
      "Take the halo off before sleeping and showering",
      "Wash only when visibly soiled — over-washing shortens life",
      "Brush gently from tips up before storing",
      "Store flat or on a hanger to keep the weft shape",
    ],
    heroPhoto: "/photos/products-6.jpg",
  },
  {
    slug: "clip-in",
    name: "Clip-In",
    tagline: "On-demand length and volume — no commitment",
    description:
      "Temporary wefts with small clips sewn on. Apply or remove yourself in minutes — perfect for events, photo shoots, or experimenting.",
    longDescription:
      "Clip-ins are temporary wefts with small pressure-sensitive clips sewn along the top edge. You snap them onto sections of your natural hair in minutes — no stylist, no chemicals, no commitment. Perfect for weddings, photoshoots, vacations, or anyone wanting to test extension length and color before committing to a permanent method. Cared for properly, a single set lasts 6 – 12 months and can be styled, dyed, and reused as often as you like.",
    durationLabel: "DIY · minutes to apply",
    lasts: "6 – 12 months with proper care",
    bestFor: [
      "Events, parties, special occasions",
      "Experimenting with length or color",
      "No glue, no heat, no chemicals",
      "Affordable styling freedom",
    ],
    prices: [
      { label: "Single Drawn", amountIDR: 3_500_000 },
      { label: "Double Drawn", amountIDR: 4_500_000 },
    ],
    unit: "per 100 g",
    minPurchase: "Min. buy 50 g · free install (clips fitted)",
    promoBundles: [
      { label: "Single 100 g", amountIDR: 3_500_000 },
      { label: "Single 150 g", amountIDR: 4_800_000 },
      { label: "Single 200 g", amountIDR: 5_800_000 },
      { label: "Double 100 g", amountIDR: 4_500_000 },
      { label: "Double 150 g", amountIDR: 6_200_000 },
      { label: "Double 200 g", amountIDR: 7_200_000 },
    ],
    highlights: ["DIY · zero damage", "Wear when needed", "Styling freedom"],
    materials: [
      "100% real human hair, hand-sewn weft",
      "Pressure-sensitive metal clips with silicone backing",
      "Soft fabric base for scalp comfort",
    ],
    whatsIncluded: [
      "Custom set sized to your head",
      "Free WhatsApp color match before fulfilment",
      "5 – 10 wefts in graduated widths (full set)",
      "DIY application card with diagram",
      "Carry pouch",
    ],
    idealHairType: [
      "Any hair type — fine to thick",
      "Anyone wanting a temporary boost",
      "Travelers / event guests / brides",
      "Clients hesitant about permanent methods",
    ],
    aftercare: [
      "Wash only when visibly soiled — over-washing shortens life",
      "Always brush out before storing in the carry pouch",
      "Clip onto pre-styled hair, not freshly washed",
      "Treat heat-styling exactly as you would your own hair",
    ],
    heroPhoto: "/photos/detail-1.jpg",
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

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

/**
 * FAQ answer can be either a flat string (simple Q&A) or a structured
 * answer with intro + per-method items + outro. The structured form
 * renders as a labelled list — easier to scan than a long paragraph
 * (per client feedback: "jangan dalam bentuk kalimat, breakdown per
 * bagian dengan spasi per kalimat").
 */
export type FaqAnswer =
  | string
  | {
      intro?: string;
      items?: { label: string; body: string }[];
      outro?: string;
    };

export type Faq = { q: string; a: FaqAnswer };

export const faqs: Faq[] = [
  {
    q: "Do you offer hair styling, cuts, or colour?",
    a: "No — we specialise in hair extensions only. We sell, fit, and maintain extensions; we don't do cuts, colour, blow-dries, or styling services. Kami toko rambut, bukan salon. For cuts or colour, please visit a salon you already trust; come to us for world-class hair and expert installation.",
  },
  {
    q: "How long do hair extensions last?",
    a: {
      intro:
        "Wear time before repositioning, assuming no tangling and proper aftercare:",
      items: [
        { label: "Keratin Bond", body: "2 – 4 months" },
        { label: "Nano Ring", body: "~ 2 months" },
        { label: "Micro Ring", body: "~ 2 months" },
        { label: "Tape-In", body: "~ 2 months" },
        { label: "Weft", body: "~ 2 months" },
        {
          label: "Halo Hair",
          body: "Reusable for 6 – 12 months — a wire-mounted weft you wear and remove yourself",
        },
        {
          label: "Clip-In",
          body: "Reusable for 6 – 12 months — you put them on and off yourself",
        },
      ],
      outro:
        "The hair itself can be reused for 6 – 9 months across multiple repositionings with proper care.",
    },
  },
  {
    q: "Will hair extensions damage my natural hair?",
    a: {
      intro: "It depends on the method and your hair's strength. Honestly:",
      items: [
        {
          label: "Keratin Bond",
          body: "Higher risk if your natural hair isn't strong enough — fusion bonds put more stress on the root.",
        },
        {
          label: "Nano Ring",
          body: "Less damaging than keratin bond. Risk still depends on whether your natural hair is healthy.",
        },
        {
          label: "Tape-In",
          body: "Low damage while worn. Most damage cases happen during removal — needs the correct technique.",
        },
        {
          label: "Weft",
          body: "Very low damage — installed in only 3 – 5 horizontal lines, not all over your head.",
        },
        {
          label: "Micro Ring",
          body: "Similar to nano ring — minimal damage when applied and removed by a trained stylist.",
        },
        {
          label: "Halo Hair",
          body: "Zero damage — nothing attaches to your hair at all, the wire rests on your head.",
        },
        {
          label: "Clip-In",
          body: "Zero damage — temporary, you put them on and off yourself.",
        },
      ],
      outro:
        "Send us a photo on WhatsApp first; we'll honestly tell you which method (if any) suits your hair.",
    },
  },
  {
    q: "Which method is right for me?",
    a: {
      intro:
        "Method selection depends mostly on your natural hair density. General guide:",
      items: [
        {
          label: "Fine hair",
          body: "Keratin Bond — lightweight, blends seamlessly without adding weight.",
        },
        {
          label: "Medium to thick hair",
          body: "Tape-In, Weft, or Nano Ring — these methods carry more volume comfortably.",
        },
        {
          label: "Temporary (events, travel, trying it out)",
          body: "Clip-In or Halo Hair — no commitment, removable anytime.",
        },
        {
          label: "Very fragile or thinning hair",
          body: "Halo Hair — zero attachment, nothing pulls on your natural hair.",
        },
      ],
      outro:
        "Not sure? Send us a photo of your natural hair on WhatsApp — we'll guide you.",
    },
  },
  {
    q: "Do you use 100% real human hair? Is it Remy?",
    a: {
      intro: "Yes — 100% real human hair, no synthetic blends:",
      items: [
        { label: "Single Drawn", body: "Standard premium human hair." },
        {
          label: "Double Drawn",
          body: "Thicker from root to tip, more volume per strand.",
        },
        {
          label: "Premium Remy",
          body: "Cuticle-aligned for the longest lifespan and most natural movement.",
        },
        {
          label: "Indonesian-sourced hair",
          body: "Native to the region, well-suited to South-East Asian hair types and tropical climate. Always in stock.",
        },
      ],
      outro:
        "All grades can be styled, dyed, and cared for like your own hair.",
    },
  },
  {
    q: "When can I wash my hair after installation?",
    a: {
      intro:
        "Always wait at least 48 hours before the first wash — bonds need time to cure and rings/tapes need to settle. After that:",
      items: [
        {
          label: "Keratin Bond / Tape-In",
          body: "Sulfate-free, alcohol-free shampoo only. No oils, masks, or conditioner near the bond/tape line.",
        },
        {
          label: "Nano Ring / Micro Ring / Weft",
          body: "Wash carefully around the attachment line; keep masks and oils on the lengths only.",
        },
        {
          label: "Clip-In",
          body: "Wash only when visibly soiled — over-washing shortens the life of the wefts.",
        },
      ],
      outro:
        "We send you a personalised aftercare guide after every appointment.",
    },
  },
  {
    q: "How long does an appointment take?",
    a: {
      intro: "Appointment duration by method:",
      items: [
        {
          label: "Keratin Bond / Nano Ring / Micro Ring",
          body: "~ 1 hour per 100 strands.",
        },
        {
          label: "Tape-In",
          body: "Under 1.5 hours for a full head.",
        },
        {
          label: "Weft",
          body: "About a day for a full installation.",
        },
        {
          label: "Halo Hair / Clip-In",
          body: "Walk out same visit — no installation needed.",
        },
      ],
    },
  },
  {
    q: "How do I book?",
    a: "Message us on WhatsApp at +62 821-4691-8725. Send a photo of your natural hair so we can recommend the right method and quote you the full price before you visit. Open Mon – Sun, 09:00 – 19:00 WITA. Walk-ins welcome if you call ahead.",
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

// Active home-page hero video — 4:5 portrait shop-interior clip (1080×1350,
// 8s loop, ~4.2MB). Shows the wall of hair extensions with the "Hair"
// signage in the background.
export const heroVideoDisplay = {
  src: "/videos/hero-display.mp4",
  poster: "/videos/hero-display-poster.jpg",
  caption:
    "The Hair Extensions Bali shop interior — wall of 100+ hair extension shades on display",
};

// Google Reviews — placeholder cards in the same voice as live reviews.
// When the business goes live and accumulates real reviews, swap to
// embedded Google Places API or replace these with verified quotes.
export type GoogleReview = {
  rating: 5 | 4;
  quote: string;
  name: string;
  /** Where they're from / context */
  location: string;
  /** Service they had */
  service: string;
  /** Relative time, e.g. "2 weeks ago" */
  when: string;
};

export const googleReviews: GoogleReview[] = [
  {
    rating: 5,
    quote:
      "The most natural extensions I've ever had — and I've tried salons in London and Sydney. The keratin bonds are invisible. Worth a flight back to Bali.",
    name: "Sophie",
    location: "Visiting from London",
    service: "Keratin Bond",
    when: "2 weeks ago",
  },
  {
    rating: 5,
    quote:
      "I've been getting tape-ins here for over a year. They take care of my hair like it's their own. The colour matching is perfect every time.",
    name: "Maya",
    location: "Expat, Canggu",
    service: "Tape-In",
    when: "1 month ago",
  },
  {
    rating: 5,
    quote:
      "Got nano rings before my wedding — the photos came out beautifully and they lasted my entire honeymoon and beyond. So worth it.",
    name: "Annika",
    location: "Bride, Australia",
    service: "Nano Ring",
    when: "3 months ago",
  },
  {
    rating: 5,
    quote:
      "Honestly the best decision I made on my Bali trip. The team listened to exactly what I wanted and delivered. My hair feels healthier than before.",
    name: "Léa",
    location: "Visiting from Paris",
    service: "Micro Ring",
    when: "1 month ago",
  },
  {
    rating: 5,
    quote:
      "Came in for a clip-in set for my engagement shoot. Quality is amazing — looks like real hair because it is. Already planning my next visit.",
    name: "Priya",
    location: "Visiting from Singapore",
    service: "Clip-In",
    when: "2 months ago",
  },
  {
    rating: 5,
    quote:
      "Booked a full weft installation a week before my Bali wedding. They worked all day to get it perfect. Got endless compliments at the reception.",
    name: "Olivia",
    location: "Bride, New Zealand",
    service: "Weft",
    when: "6 months ago",
  },
];

// Tips & care guides — mix layout: one featured long-form + grid of short tips.
export type Tip = {
  slug: string;
  title: string;
  /** Short summary (~140 chars) for cards */
  excerpt: string;
  /** Body — paragraphs, joined as a long-form article */
  body: string[];
  /** Featured = appears in the top hero slot of /tips */
  featured?: boolean;
  /** Reading time in minutes (estimate) */
  readingMinutes?: number;
  /** Cover photo */
  photo?: string;
  /** Tag for filtering */
  tag: "Aftercare" | "Choosing" | "Lifestyle" | "Maintenance";
};

export const tips: Tip[] = [
  {
    slug: "wash-extensions-the-right-way",
    title: "How to wash your extensions the right way",
    excerpt:
      "The first 48 hours are critical. After that, it's about products, water temperature, and brushing — in that order.",
    featured: true,
    readingMinutes: 5,
    photo: "/photos/detail-3-md.jpg",
    tag: "Aftercare",
    body: [
      "If you've just left the studio with a fresh install — keratin bond, nano ring, micro ring, or tape-in — the single most important rule is to wait 48 hours before the first wash. Your bonds need time to fully cure (keratin) or settle (rings, tapes), and washing too early is the most common reason extensions slip in week one.",
      "After that 48-hour window, the rules are simple but unforgiving. Use a sulfate-free, alcohol-free shampoo — sulfates strip the oils that keep the bonds flexible, and alcohol dehydrates the hair shaft. We hand out a recommended product list at every appointment; ignore the celebrity endorsements and stick to what's on the list.",
      "Water temperature should be lukewarm, never hot. Hot water expands the hair cuticle and lifts colour faster, which means your match drifts and your install starts looking patchy by week three. Lukewarm rinse, cool finish — every time.",
      "Brushing technique matters more than people think. Always brush with a loop or paddle brush, starting at the very tips and working up section by section. Never tug. Never brush from the root down. The brush should never catch on the attachment point — if it does, slow down and untangle by hand.",
      "Twice a day is plenty. More than that and you're working friction into the bonds. Less than that and you'll wake up to matting. Five minutes morning, five minutes night, and a silk pillowcase fills in the rest.",
    ],
  },
  {
    slug: "sleeping-with-extensions",
    title: "Sleeping with extensions, without tangles",
    excerpt: "A loose braid + silk pillowcase = no morning tangles, no slipping bonds.",
    readingMinutes: 2,
    photo: "/photos/detail-2-md.jpg",
    tag: "Aftercare",
    body: [
      "Friction is the enemy. Cotton pillowcases pull at the cuticle every time you turn — over a few weeks that's hours of friction. Switch to silk or satin. The cost difference is small, the difference for your hair is enormous.",
      "Always tie hair into a low loose braid before bed. Not a tight ponytail (puts tension on the rings/bonds), not loose (you'll wake up matted). A loose three-strand braid is the sweet spot.",
      "If you're prone to overheating at night, sleep with hair tucked under a silk bonnet — this protects the lengths and the attachment points equally.",
    ],
  },
  {
    slug: "heat-styling-rules",
    title: "Heat styling without damaging your extensions",
    excerpt: "Yes, you can use a curling iron. No, you can't iron the bond. Here's the line.",
    readingMinutes: 3,
    photo: "/photos/products-1-md.jpg",
    tag: "Aftercare",
    body: [
      "Real human hair extensions can be heat-styled exactly like your own hair — with one caveat: keep the iron at least 2 cm below the attachment point. Direct heat on a keratin bond will soften it and cause slippage. Direct heat on a tape weft will weaken the adhesive.",
      "Always use a heat protectant spray before any iron. Apply mid-length to ends, never on the bonds.",
      "Maximum temperature: 180 °C / 360 °F. Anything higher is for synthetic hair, not real human hair. Real hair burns at higher temperatures and you'll see the damage as dryness within weeks.",
    ],
  },
  {
    slug: "when-to-schedule-maintenance",
    title: "When to come back for a refit",
    excerpt:
      "Tape-ins: 6 – 8 weeks. Rings: 8 – 10 weeks. Bonds: 3 – 4 months. The exact timing matters.",
    readingMinutes: 2,
    photo: "/photos/products-3-md.jpg",
    tag: "Maintenance",
    body: [
      "Your natural hair grows ~1 – 1.5 cm per month. As it grows, the attachment point moves further from the scalp — eventually too far to look or feel natural.",
      "Tape-ins: 6 – 8 weeks. The tapes start to drift visible around week six.",
      "Nano / micro rings: 8 – 10 weeks. The rings stay in place; we just slide them up.",
      "Keratin bonds: 3 – 4 months. The longest-lasting method, and the slowest refit cycle.",
      "Wefts: 6 – 8 weeks for repositioning. The cornrow base needs to be redone.",
      "WhatsApp us a photo of the current install when you're around the right week. We'll tell you immediately whether it's time.",
    ],
  },
  {
    slug: "products-to-avoid",
    title: "Products to avoid (and why)",
    excerpt:
      "Sulfates, alcohol, silicone-heavy leave-ins, and clarifying shampoos. Each one breaks something specific.",
    readingMinutes: 3,
    photo: "/photos/products-5-md.jpg",
    tag: "Aftercare",
    body: [
      "Sulfates strip the natural oils that keep extension hair flexible. Within a few washes you'll see dryness at the tips and brittleness through the lengths. Read the label — anything ending in '-sulfate' is out.",
      "Alcohol-based products (most drugstore hair sprays, most volumising mousses) dehydrate the hair shaft. The lengths lose their bounce and start looking dull. Look for 'alcohol-free' or 'low-alcohol' on the label.",
      "Heavy silicones (cyclomethicone, dimethicone) coat the hair, which makes it feel smooth but slowly slips your rings and weakens your tape adhesive. Use silicone-free leave-ins.",
      "Clarifying shampoos and oil treatments at the root will dissolve any tape adhesive and slip rings. Both are fine on the lengths only — keep them away from the attachment band.",
    ],
  },
  {
    slug: "choosing-the-right-method",
    title: "Choosing the right method for your hair",
    excerpt:
      "Fine hair → nano or tape. Medium-thick → bond or micro. Need it temporary → clip-in. Need volume fast → weft.",
    readingMinutes: 4,
    photo: "/photos/products-2-md.jpg",
    tag: "Choosing",
    body: [
      "The right method is the one that matches your hair density, lifestyle, and timeline. Here's the short version:",
      "Fine or thin hair: nano ring or tape-in. Both are gentle and lie flat. Avoid heavier methods that can stress fragile hair.",
      "Medium-to-thick hair: keratin bond, micro ring, or weft. Your hair has the density to hold the attachment without strain. Pick by lifestyle — bonds for low-maintenance, micros for versatile styling, wefts for dramatic transformations.",
      "Need it temporary: clip-in. Wear when you want, remove when you don't. Zero damage.",
      "Need volume fast: weft. One full-day appointment, dramatic transformation, brides and special-event clients only.",
      "Still unsure? WhatsApp us a photo of your hair (front, back, side — natural light, no styling). We'll match you to a method in five minutes.",
    ],
  },
  {
    slug: "travel-with-extensions",
    title: "Travelling with extensions — the practical guide",
    excerpt: "Carry-on. Sun + salt water. Pool chlorine. Airport security. The full playbook.",
    readingMinutes: 4,
    photo: "/photos/salon-2-md.jpg",
    tag: "Lifestyle",
    body: [
      "Salt water won't damage the bonds, but it will dry out the hair. Rinse with fresh water immediately after the ocean and apply a leave-in conditioner mid-length to ends.",
      "Chlorine is harsher than salt water. If you're swimming in pools regularly, wet your hair with fresh water before the pool — saturated hair absorbs less chlorine. After the pool, rinse and condition.",
      "Direct tropical sun fades colour faster than anywhere else. Tie hair up under a wide-brimmed hat between 11 AM and 3 PM. Yes, your hair colour really does drift if you don't.",
      "Airport security: the metal detector will not flag micro / nano rings (they're too small). Some scanners detect tape backing — rare. If asked, just say 'hair extensions' — they're entirely common in international travel.",
      "For carry-on, pack: silk pillowcase, sulfate-free shampoo (decanted into <100 ml bottles), wide-tooth comb, leave-in conditioner. That's the entire travel kit.",
    ],
  },
  {
    slug: "color-matching-from-bali",
    title: "Booking from abroad: how the colour match works",
    excerpt:
      "Send three photos to WhatsApp before your trip. We confirm the match, gram amount, and price before you arrive.",
    readingMinutes: 2,
    photo: "/photos/products-6-md.jpg",
    tag: "Choosing",
    body: [
      "Most of our international clients book before they land in Bali. The colour match starts on WhatsApp.",
      "Send three photos in natural light: top-back of head, side, and front. Don't style or filter — we need to see the actual tone, including roots, mids, and ends.",
      "We respond with a recommended hair grade (single drawn / double drawn / premium), the gram amount needed for the look you want, and the full price. No surprises at the salon.",
      "If you're considering balayage / highlights / multi-tone, we'll suggest a custom blend. We can mix two or three shades for a perfectly seamless transition.",
      "Once the match is confirmed, we book you in. The hair is set aside before you arrive — the install is the only thing that happens in person.",
    ],
  },
];

// Gallery — mixed showcase. Categorized for filter UI on /gallery page.
export type GalleryItem = {
  src: string;
  alt: string;
  category: "before-after" | "products" | "studio";
  /** Wider aspect (3:2) for hero rows; square (1:1) is default */
  aspect?: "square" | "wide" | "tall";
};

export const gallery: GalleryItem[] = [
  // Before & After — real client photos
  { src: "/photos/before-after/weft-before.jpg", alt: "Client before — natural black bob, ready for weft installation", category: "before-after", aspect: "tall" },
  { src: "/photos/before-after/weft-after.jpg", alt: "Same client after — long flowing extensions, Weft installation", category: "before-after", aspect: "tall" },
  { src: "/photos/before-after/weft-installation.jpg", alt: "Weft installation top view — horizontal tracks sewn in", category: "before-after", aspect: "tall" },
  { src: "/photos/before-after/keratin-bond-detail.jpg", alt: "Keratin Bond extensions — installed close-up", category: "before-after" },
  { src: "/photos/before-after/micro-ring-detail.jpg", alt: "Micro Ring extensions — installed close-up", category: "before-after" },
  { src: "/photos/before-after/unknown-blonde-result.jpg", alt: "Long blonde extensions — finished result, salon chair", category: "before-after", aspect: "tall" },
  // Studio
  { src: "/photos/salon-1-md.jpg", alt: "Studio interior — wide salon view", category: "studio", aspect: "wide" },
  { src: "/photos/salon-2-md.jpg", alt: "Studio corridor", category: "studio", aspect: "wide" },
  { src: "/photos/salon-3-md.jpg", alt: "Studio front entrance", category: "studio" },
  { src: "/photos/hero-salon-md.jpg", alt: "All About Hair wall", category: "studio", aspect: "wide" },
  // Products
  { src: "/photos/products-1-md.jpg", alt: "Display rack with hair extensions", category: "products", aspect: "tall" },
  { src: "/photos/products-2-md.jpg", alt: "Color comparison row", category: "products", aspect: "wide" },
  { src: "/photos/products-3-md.jpg", alt: "Color storage with mannequins", category: "products" },
  { src: "/photos/products-4-md.jpg", alt: "Color storage display", category: "products" },
  { src: "/photos/products-5-md.jpg", alt: "Single rack closeup", category: "products" },
  { src: "/photos/products-6-md.jpg", alt: "Single rack texture", category: "products" },
  { src: "/photos/hero-rack-md.jpg", alt: "Wig display rack vertical", category: "products", aspect: "tall" },
];
