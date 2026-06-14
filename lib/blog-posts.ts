/**
 * Long-form articles — primarily for SEO + AI Generative Engine
 * Optimization. Each post targets a specific long-tail query that
 * competitors don't cover well, with fact-rich content AI tools
 * can quote directly when answering related questions.
 *
 * Structure: posts are data, not MDX, so they slot cleanly into
 * Article JSON-LD without parsing markdown at runtime.
 */

import { formatIDR } from "./content";

export type BlogSection =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "list"; ordered?: boolean; items: string[] }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "quote"; text: string; cite?: string };

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  subtitle?: string;
  /** ≤155 chars for SEO meta description */
  description: string;
  /** ISO date YYYY-MM-DD */
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  /** Path under /public, used for hero + OG image */
  heroPhoto?: string;
  /** Lead paragraph rendered separately, large */
  intro: string;
  sections: BlogSection[];
  faq?: BlogFaq[];
  keywords: string[];
  /** Related service slugs to link from this post */
  relatedServices?: string[];
};

// ─── helpers used inline ────────────────────────────────────────────────
const idr = (n: number) => formatIDR(n);

// ─── POST 1 — Pricing guide ─────────────────────────────────────────────
const pricingPost: BlogPost = {
  slug: "hair-extensions-cost-bali-pricing-guide-2026",
  title: "Hair Extensions Cost in Bali — Full 2026 Pricing Guide",
  subtitle: "Real numbers per method, what's included, and the hidden costs to avoid.",
  description:
    "What hair extensions actually cost in Bali in 2026: per-method prices with installation included, what affects the price, and the hidden fees to avoid.",
  publishedAt: "2026-05-28",
  updatedAt: "2026-05-28",
  readingMinutes: 7,
  heroPhoto: "/photos/hero-rack.jpg",
  intro:
    "Looking at hair extensions in Bali and wondering what to actually budget? This is the no-fluff 2026 pricing guide. We cover real prices per method (installation included), what pushes the bill up or down, why Bali is significantly cheaper than Sydney, London, or Singapore for the same quality hair, and where the hidden costs hide — so you don't get surprised at the counter.",
  sections: [
    { kind: "heading", level: 2, text: "Pricing at a glance — six methods, real numbers" },
    {
      kind: "paragraph",
      text: `At The Hair Extensions Bali (Kerobokan), single drawn is IDR 3,500,000 and double drawn IDR 4,500,000 per 100 grams across methods, installation included. Prices are for wavy stock; straight and curly textures add IDR 200,000 per 100 g.`,
    },
    {
      kind: "table",
      headers: ["Method", "Single / Double (per 100g)", "Typical wear time"],
      rows: [
        ["Keratin Bond", `${idr(3_500_000)} / ${idr(4_500_000)}`, "2 – 4 months"],
        ["Nano Ring", `${idr(3_500_000)} / ${idr(4_500_000)}`, "~ 2 months"],
        ["Weft (Sew-In)", `${idr(3_500_000)} / ${idr(4_500_000)}`, "~ 2 months"],
        ["Tape-In", `${idr(3_500_000)} / ${idr(4_500_000)}`, "~ 2 months"],
        ["Halo Hair", `${idr(3_500_000)} / ${idr(4_500_000)}`, "6 – 12 months reusable"],
        ["Clip-In", `${idr(3_500_000)} / ${idr(4_500_000)}`, "6 – 12 months reusable"],
      ],
    },
    {
      kind: "paragraph",
      text: "Bundle promos bring the per-gram rate down — e.g. Nano Ring single drawn 100 g at IDR 2,800,000, or Tape-In single 200 g at IDR 4,800,000. Premium keratin glue is priced by length: IDR 5,000,000 (40 cm) up to IDR 8,000,000 (70 cm) per 100 g, no discount. Weft Premium runs IDR 5,500,000.",
    },

    { kind: "heading", level: 2, text: "What's actually included" },
    {
      kind: "list",
      items: [
        "Free WhatsApp colour match before your visit (send a photo, we confirm grade and tone)",
        "Full installation in our Kerobokan studio by an experienced stylist",
        "Trim and blend after install, so the extensions sit naturally with your length",
        "Personalised aftercare guide tailored to your method",
        "WhatsApp support for the life of the install (free advice, no upsells)",
      ],
    },

    { kind: "heading", level: 2, text: "What pushes the price up" },
    { kind: "paragraph", text: "Three variables move the total:" },
    {
      kind: "list",
      ordered: true,
      items: [
        "Gram amount — most clients need 100 – 200 g for a natural full head. Long, thick natural hair may need 250 – 300 g.",
        "Hair grade — Single Drawn is the standard; Double Drawn is denser tip-to-root and adds 20-30%; Premium Remy adds 50-100% but lasts the longest.",
        "Length — 40 cm is standard. 50 cm – 60 cm adds 15-25% per step. 70 cm+ is rare and quoted custom.",
      ],
    },

    { kind: "heading", level: 2, text: "Why Bali is cheaper than overseas" },
    {
      kind: "paragraph",
      text: "Same international-grade human hair runs roughly 40-60% lower in Bali than Sydney, London, or Singapore. Three reasons:",
    },
    {
      kind: "list",
      items: [
        "Lower commercial rent and labour costs in Indonesia.",
        "Direct sourcing from the same factories — many premium European brands buy from the same suppliers we do.",
        "We carry Indonesian-sourced hair alongside imported Remy. It's not always advertised abroad, but it's well-suited to South-East Asian hair types and tropical climate, and runs noticeably cheaper without quality compromise.",
      ],
    },

    { kind: "heading", level: 2, text: "Hidden costs to watch for (industry-wide)" },
    {
      kind: "list",
      items: [
        "\"DM for price\" salons — usually means quote varies wildly per walk-in. Ask for a written quote on WhatsApp before booking.",
        "Hair-only vs hair-plus-install confusion — some shops quote raw hair price; installation is extra. Always ask if the figure includes fitting.",
        "Single Drawn priced as Double Drawn — Single Drawn has thinner tips. If your quote feels too good, ask which grade.",
        "Hidden synthetic blends — \"100% human\" should mean exactly that, no nylon or kanekalon mixed in. Real human hair burns to ash; synthetic melts. Reputable shops will tell you the source.",
        "Aftercare upsells — be wary if the salon insists you must buy their branded shampoo. Any sulfate-free shampoo works.",
      ],
    },

    { kind: "heading", level: 2, text: "Our pricing principle" },
    {
      kind: "paragraph",
      text: "We publish every rate on the website and confirm the full quote on WhatsApp before you visit. Walk-in pricing matches WhatsApp pricing. No hidden install fees, no surprise upgrades at the counter, no \"DM for price\" gatekeeping.",
    },
  ],
  faq: [
    {
      q: "What is the cheapest hair extension method in Bali?",
      a: "At The Hair Extensions Bali, the lowest entry point is the bundle promo: Nano Ring, Tape-In, and Halo Hair single drawn 100 g go for IDR 2,800,000 — installation included (tape install 20,000 IDR/pair). Standard rate is IDR 3,500,000 single drawn / IDR 4,500,000 double drawn across methods.",
    },
    {
      q: "Do prices in Bali include installation?",
      a: "At reputable shops yes — at ours, every published rate includes the full install. Always confirm in writing before booking elsewhere because some salons quote hair-only.",
    },
    {
      q: "How much should I budget for a full head of hair extensions in Bali?",
      a: "Plan IDR 3 – 5 million for a typical fine-to-medium head (100 – 150 g, single drawn). IDR 6 – 8 million for thick or long hair (200 – 300 g) or for premium Remy grade. Bridal looks with double-drawn weft routinely land in the IDR 7 – 10 million range.",
    },
  ],
  keywords: [
    "hair extensions cost bali",
    "hair extensions price bali",
    "how much do hair extensions cost in bali",
    "hair extensions bali pricing",
    "keratin bond price bali",
    "weft hair extensions cost bali",
  ],
  relatedServices: ["keratin-bond", "weft", "nano-ring"],
};

// ─── POST 2 — Indonesian hair vs Remy ───────────────────────────────────
const indoVsRemyPost: BlogPost = {
  slug: "indonesian-hair-vs-remy-hair-comparison",
  title: "Indonesian Hair vs Remy Hair — Which One Is Right for You?",
  subtitle:
    "Two grades of real human hair stocked side-by-side in Bali. They're not the same. Here's the honest breakdown.",
  description:
    "Indonesian-sourced hair vs imported Remy hair: side-by-side comparison of durability, price, climate suitability, and which one suits which hair type.",
  publishedAt: "2026-05-28",
  updatedAt: "2026-05-28",
  readingMinutes: 6,
  heroPhoto: "/photos/products-1.jpg",
  intro:
    "Walk into most Bali hair extension shops and you'll see two main grades stocked: Indonesian-sourced and imported Remy. Both are 100% real human hair — but they're not the same. This guide breaks down what each is, the price gap, durability differences, and which one actually suits your hair (and your budget).",
  sections: [
    { kind: "heading", level: 2, text: "What is Indonesian hair?" },
    {
      kind: "paragraph",
      text: "Indonesian hair is real human hair sourced from donors across Indonesia. It's native to the region — most Indonesian donors have medium-density, naturally straight-to-wavy hair, well-adapted to the tropical climate. It's typically processed and sold as Single Drawn (slightly thinner tips than root) at a noticeably lower price point than imported Remy.",
    },

    { kind: "heading", level: 2, text: "What is Remy hair?" },
    {
      kind: "paragraph",
      text: "Remy hair is the industry's premium grade. \"Remy\" means the hair cuticles are kept aligned in the same direction during processing — root to tip, never reversed. This alignment prevents tangling, gives the hair a natural shine, and dramatically extends its usable life. Remy can be sourced from anywhere; the term refers to the processing standard, not the country of origin. The most prized Remy comes from India, Vietnam, and Russia.",
    },

    { kind: "heading", level: 2, text: "Side-by-side comparison" },
    {
      kind: "table",
      headers: ["Trait", "Indonesian Hair", "Remy Hair"],
      rows: [
        ["Source", "Indonesia", "India, Vietnam, Russia, Eastern Europe (varies)"],
        ["Cuticle alignment", "Standard processing", "Cuticles aligned (signature of Remy grade)"],
        ["Typical lifespan", "4 – 6 months with care", "9 – 12 months with care"],
        ["Price (per 100g)", "Lower (entry tier)", "Higher (premium tier)"],
        ["Tangling risk", "Higher if mishandled", "Very low when aligned"],
        ["Climate suitability", "Excellent for SE Asia humidity", "Excellent across climates"],
        ["Texture range", "Mostly straight-to-wavy", "Wide — straight, wavy, curly"],
        ["Dyeing", "Single re-dye safely", "Multiple re-dyes possible"],
      ],
    },

    { kind: "heading", level: 2, text: "Climate factor — why Indonesian works in Bali" },
    {
      kind: "paragraph",
      text: "Bali's tropical humidity is hard on hair extensions. Indonesian hair handles this better than most imported grades because the donor hair itself grew in similar conditions — it's already conditioned to humidity and salt. European-sourced hair can frizz more aggressively in Bali's climate unless heavily conditioned.",
    },
    {
      kind: "paragraph",
      text: "If you're a local or expat living in Bali year-round, Indonesian hair is often the more practical match. If you're a traveller flying back to a temperate country, Remy travels better and lasts longer overall.",
    },

    { kind: "heading", level: 2, text: "Which suits which hair type" },
    {
      kind: "list",
      items: [
        "Fine, easy-care natural hair → Indonesian (Single Drawn). Light enough not to weigh you down.",
        "Medium-thick natural hair → either works. Indonesian for everyday wear; Remy for special occasions where you want maximum lifespan.",
        "Coarse or curly natural hair → Premium Remy with matched texture. Indonesian is typically straighter so blend may not match.",
        "Bridal or photo-shoot looks → Remy Double Drawn. The cuticle alignment + density delivers maximum dimensional shine on camera.",
        "Anyone who wants to re-use the same hair for 9 + months → Remy. The lifespan justifies the price gap.",
      ],
    },

    { kind: "heading", level: 2, text: "Our recommendation" },
    {
      kind: "paragraph",
      text: "Tell us your hair type and budget on WhatsApp, send a photo, and we'll honestly tell you which grade gets you the result you want without overspending. We stock both grades in 100 + shades on our wall in Kerobokan — you can see, touch, and compare in person before deciding.",
    },
  ],
  faq: [
    {
      q: "Is Indonesian hair the same as Remy hair?",
      a: "No. \"Remy\" describes a processing standard (cuticles aligned in one direction); \"Indonesian\" describes a source country. Indonesian hair is usually sold as Single Drawn at a lower price; Remy can be sourced from many countries and is sold at a premium for its longer lifespan.",
    },
    {
      q: "Is Indonesian hair good quality?",
      a: "Yes — Indonesian hair is 100% real human hair and works very well in tropical climates like Bali. It's a great-value entry tier. The main difference vs Remy is lifespan: 4 – 6 months vs 9 – 12 months with the same care.",
    },
    {
      q: "Can I dye Indonesian hair?",
      a: "Yes, once. We recommend going darker rather than lighter, and only with sulfate-free, ammonia-free dye. Multiple re-dyes work better on Premium Remy.",
    },
  ],
  keywords: [
    "indonesian hair vs remy hair",
    "what is indonesian hair",
    "is indonesian hair good",
    "remy vs non-remy hair",
    "best hair grade bali",
    "indonesian hair extensions",
  ],
  relatedServices: ["keratin-bond", "weft", "tape-in"],
};

// ─── POST 3 — Extensions vs Wigs ────────────────────────────────────────
const extensionsVsWigsPost: BlogPost = {
  slug: "hair-extensions-vs-wigs-bali",
  title: "Hair Extensions vs Wigs in Bali — Honest Pros, Cons & Costs",
  subtitle:
    "Both popular in Bali. They solve different problems. Here's which one you actually want.",
  description:
    "Hair extensions vs wigs in Bali: how each works, who suits which, real costs, maintenance differences, and where to buy each on the island.",
  publishedAt: "2026-05-28",
  updatedAt: "2026-05-28",
  readingMinutes: 7,
  heroPhoto: "/photos/salon-1.jpg",
  intro:
    "Bali has a strong market for both hair extensions and wigs — both are made from the same real human hair, often by the same factories. But they solve very different problems. This guide compares them honestly: how each works, who suits which, what they really cost, the maintenance reality, and where to buy each in Bali.",
  sections: [
    { kind: "heading", level: 2, text: "How hair extensions work" },
    {
      kind: "paragraph",
      text: "Hair extensions attach added hair to your natural hair using one of six methods (keratin bond, nano ring, weft, tape-in, halo hair, or clip-in). They blend with your existing hair, move when your hair moves, and look most natural at the part line and roots. Most require an installation appointment (1 – 8 hours depending on method) and grow out with your natural hair, needing repositioning every 2 – 4 months — halo hair and clip-in are the wear-it-yourself exceptions.",
    },

    { kind: "heading", level: 2, text: "How wigs work" },
    {
      kind: "paragraph",
      text: "A wig is a full hair piece you put on top of your existing hair (which is usually braided flat or covered with a stocking cap). Modern lace-front and HD lace wigs include a transparent mesh that mimics a natural hairline, letting you part the hair anywhere. You can take a wig off at the end of the day. There's no installation appointment — you buy it, fit it yourself.",
    },

    { kind: "heading", level: 2, text: "Side-by-side comparison" },
    {
      kind: "table",
      headers: ["Trait", "Hair Extensions", "Wig"],
      rows: [
        ["What it is", "Added hair attached to yours", "Full hair piece, removable"],
        ["Installation", "Professional, 1 – 8 hours", "DIY, ~ 5 minutes each time"],
        ["Wear time", "24/7 for 2 – 4 months", "Each session, take off at night"],
        ["Looks natural at part", "Yes, blends with your hair", "Yes with lace-front / HD lace"],
        ["Can shower / swim", "Yes (after cure period)", "No — remove first"],
        ["Best for thin hair", "Excellent if hair is healthy", "Excellent — adds full coverage"],
        ["Heat-stylable", "Yes (with care)", "Human-hair wigs yes; synthetic no"],
        ["Wind / sport tolerance", "Very high", "Moderate — can shift"],
        ["Reusable", "Hair reusable for 6 – 12 months", "Full wig reusable for 1 – 3 years"],
        ["Cost (Bali, real human hair)", `From ${idr(1_900_000)} install incl.`, "From IDR 1,500,000 – 8,000,000"],
      ],
    },

    { kind: "heading", level: 2, text: "Who suits extensions, who suits wigs" },
    { kind: "heading", level: 3, text: "Get extensions if:" },
    {
      kind: "list",
      items: [
        "Your natural hair is healthy and you want length / volume that feels like your own",
        "You're active — swimming, surfing, gym, yoga — and don't want to take hair off",
        "You want a result you can stop thinking about for 2 – 4 months",
        "You're attending a wedding or photo shoot and want camera-perfect blend at the hairline",
        "You travel often and don't want to manage a wig on planes / beach",
      ],
    },
    { kind: "heading", level: 3, text: "Get a wig if:" },
    {
      kind: "list",
      items: [
        "You experience hair loss, thinning, or medical hair loss",
        "You want to change your look frequently — different colours, different lengths",
        "You don't want to commit to an installation appointment",
        "You're protecting natural hair underneath (e.g. growing out a chop, healing damage)",
        "You want to take the hair off completely at night",
      ],
    },

    { kind: "heading", level: 2, text: "Real cost comparison in Bali" },
    {
      kind: "list",
      items: [
        `Entry hair extensions (bundle promo, 100 g, single drawn, installed): from ${idr(2_800_000)} on nano ring, tape-in, and halo hair`,
        `Entry human-hair wig (basic lace-front, ~30 cm): from IDR 1,500,000`,
        `Premium hair extensions (keratin glue premium 70 cm, 100 g, installed): up to ${idr(8_000_000)}`,
        "Premium human-hair wig (HD lace, ~50 cm, custom-coloured): IDR 5,000,000 – 8,000,000+",
        "Maintenance: extensions need repositioning visit (~ IDR 500,000) every 2 – 4 months. Wigs need home wash + occasional restyling, no salon visit.",
      ],
    },

    { kind: "heading", level: 2, text: "Maintenance reality" },
    {
      kind: "paragraph",
      text: "Hair extensions sit on your head 24/7, so they get the same wear as your natural hair plus the stress of being attached. They need wash routine adjustments, sulfate-free shampoo, and repositioning every 2 – 4 months. Total time investment: light daily routine + one studio visit every couple of months.",
    },
    {
      kind: "paragraph",
      text: "Wigs are washed less often (every 10 – 20 wears) and stored on a wig stand when not worn. Detangling is similar but less stress on the cap structure. You'll restyle / re-pluck the lace every few months for the best look.",
    },

    { kind: "heading", level: 2, text: "Where to buy each in Bali" },
    {
      kind: "paragraph",
      text: "For hair extensions, look for a specialist hair extension shop (toko rambut) rather than a general beauty salon. Specialists carry more shades and methods. The Hair Extensions Bali in Kerobokan is the island's largest such shop — 100+ shades on display, seven application methods, transparent pricing, installation by experienced stylists. Walk-in or by appointment, daily 09:00 – 19:00 WITA.",
    },
    {
      kind: "paragraph",
      text: "For wigs, look for boutiques specialising in lace-front and HD lace human-hair wigs. Several wig-only shops exist around Denpasar and Seminyak.",
    },
  ],
  faq: [
    {
      q: "Are hair extensions better than wigs?",
      a: "Neither is objectively better — they solve different problems. Extensions suit people with healthy natural hair who want lasting added length / volume. Wigs suit people with hair loss, those who want different looks frequently, or those who don't want a long appointment.",
    },
    {
      q: "Can I sleep in hair extensions?",
      a: "Yes — that's a key advantage over wigs, which you take off at night. Sleep with extensions tied in a low loose braid or ponytail to minimise tangling.",
    },
    {
      q: "Do hair extensions damage your real hair?",
      a: "Not when applied correctly. Methods like nano ring and weft are very low-damage. Keratin bond carries some risk if your natural hair isn't strong enough. We can advise honestly on WhatsApp once we see a photo of your hair.",
    },
  ],
  keywords: [
    "hair extensions vs wigs",
    "wig vs hair extensions",
    "wigs vs hair extensions bali",
    "should i get extensions or a wig",
    "human hair wig bali",
    "hair extensions bali",
  ],
  relatedServices: ["weft", "clip-in"],
};

export const blogPosts: BlogPost[] = [
  pricingPost,
  indoVsRemyPost,
  extensionsVsWigsPost,
];

export function postBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
