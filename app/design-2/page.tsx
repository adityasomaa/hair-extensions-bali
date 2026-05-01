import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Clock,
  Sun,
  Heart,
  ArrowRight,
  Star,
} from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons";
import LoaderBoho from "@/components/loaders/LoaderBoho";
import { FadeIn, Stagger, PopIn, ClipReveal } from "@/components/animations";
import {
  brand,
  aboutCopy,
  services,
  valueProps,
  testimonials,
  faqs,
  processSteps,
  galleryPhotos,
  aboutPhoto,
  visitPhoto,
  heroVideoBoho,
  formatIDR,
} from "@/lib/content";
import VideoLoop from "@/components/VideoLoop";

export const metadata = {
  title: `${brand.name} — Tropical Bali Boho`,
  description: brand.tagline,
};

// Decorative SVG shapes
const Squiggle = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 24" fill="none" className={className} aria-hidden>
    <path
      d="M2 12 C 12 2, 22 22, 32 12 S 52 2, 62 12 S 82 22, 92 12 S 112 2, 118 12"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const Leaf = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
    <path
      d="M50 5 C 25 25, 15 55, 50 95 C 85 55, 75 25, 50 5 Z"
      fill="currentColor"
      opacity="0.85"
    />
    <path
      d="M50 15 L 50 90"
      stroke="rgba(0,0,0,0.18)"
      strokeWidth="1.5"
    />
  </svg>
);

const SunRays = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
    <circle cx="50" cy="50" r="18" fill="currentColor" />
    {Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 50 + Math.cos(angle) * 28;
      const y1 = 50 + Math.sin(angle) * 28;
      const x2 = 50 + Math.cos(angle) * 42;
      const y2 = 50 + Math.sin(angle) * 42;
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

export default function Design2Page() {
  return (
    <>
    <LoaderBoho />
    <div className="min-h-screen bg-[#fef7ee] text-[#3d2c1e] selection:bg-[#c66a3d] selection:text-[#fef7ee]">
      {/* Top utility bar */}
      <div className="bg-[#3d2c1e] py-2.5 text-[11px] tracking-wider uppercase text-[#fef7ee]/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
          <span className="hidden items-center gap-2 sm:inline-flex">
            <Sun className="h-3 w-3" aria-hidden /> Open today · 09:00 – 19:00
          </span>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-[#d4a574]"
          >
            <Instagram className="h-3 w-3" aria-hidden /> @{brand.instagram}
          </a>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-[#e6d6bf] bg-[#fef7ee]/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/design-2" className="flex items-center gap-2 font-serif">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c66a3d] text-white">
              <span className="font-script text-xl">h</span>
            </div>
            <div className="leading-tight">
              <div className="font-display-serif text-lg">Hair Extensions</div>
              <div className="font-script text-base text-[#c66a3d] -mt-0.5">Bali</div>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {[
              ["About", "#about"],
              ["Services", "#services"],
              ["Process", "#process"],
              ["Visit", "#visit"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-[#5a4a37] transition-colors hover:text-[#c66a3d]"
              >
                {label}
              </a>
            ))}
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#3d2c1e] px-5 py-2.5 text-sm font-medium text-[#fef7ee] transition-all hover:bg-[#c66a3d]"
            >
              Book on WhatsApp
            </a>
          </div>

          <a
            href={brand.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#3d2c1e] px-4 py-2 text-xs font-medium text-[#fef7ee] md:hidden"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Book
          </a>
        </nav>
      </header>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-40 hidden rounded-full border border-[#3d2c1e]/15 bg-[#fef7ee]/90 px-3 py-1.5 text-[10px] uppercase tracking-widest text-[#5a4a37] backdrop-blur-md hover:text-[#c66a3d] md:inline-block"
      >
        ← All designs
      </Link>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <SunRays className="absolute -top-12 -right-12 h-56 w-56 text-[#d4a574]/35" />
        <Leaf className="absolute -left-10 top-40 h-40 w-40 rotate-[20deg] text-[#8a9a7b]/40" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <FadeIn delay={1.6} duration={0.5}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#c66a3d]/12 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-[#c66a3d]">
                <Sun className="h-3.5 w-3.5" aria-hidden /> Hello, Bali · Hello, gorgeous hair
              </div>
            </FadeIn>
            <FadeIn delay={1.7} duration={0.9} distance={32}>
              <h1 className="mt-7 font-display-serif text-5xl leading-[1.05] md:text-7xl lg:text-[5.6rem]">
                Sun-kissed hair,
                <br />
                <span className="relative inline-block">
                  <span className="font-script italic text-[#c66a3d]">island-made</span>
                  <Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-[#d4a574]" />
                </span>
                .
              </h1>
            </FadeIn>
            <FadeIn delay={1.95} duration={0.7}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#5a4a37] md:text-xl">
                Premium hair extensions, applied with care in our warm Kerobokan
                studio. International quality, Balinese hospitality, results that
                feel completely your own.
              </p>
            </FadeIn>

            <FadeIn delay={2.1} duration={0.6} className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={brand.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#3d2c1e] px-7 py-3.5 text-sm font-medium text-[#fef7ee] transition-all hover:bg-[#c66a3d]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Say hi on WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
              <a
                href="#services"
                className="text-sm font-medium text-[#3d2c1e] underline-offset-4 transition-colors hover:text-[#c66a3d] hover:underline"
              >
                See our services →
              </a>
            </FadeIn>

            <FadeIn delay={2.3} duration={0.6} className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
              <div className="flex items-center gap-2 text-[#5a4a37]">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-[#fef7ee] bg-[#c66a3d]" />
                  <div className="h-7 w-7 rounded-full border-2 border-[#fef7ee] bg-[#8a9a7b]" />
                  <div className="h-7 w-7 rounded-full border-2 border-[#fef7ee] bg-[#d4a574]" />
                </div>
                <span>
                  <strong className="text-[#3d2c1e]">100&apos;s</strong> of happy clients worldwide
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#5a4a37]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#d4a574] text-[#d4a574]" aria-hidden />
                ))}
                <span className="ml-1">5.0 — Google reviews</span>
              </div>
            </FadeIn>
          </div>

          <div className="relative md:col-span-5">
            <div className="relative">
              {/* Main hero image */}
              <ClipReveal delay={1.7} duration={1.2}>
                <VideoLoop
                  src={heroVideoBoho.src}
                  poster={heroVideoBoho.poster}
                  alt={heroVideoBoho.caption}
                  lazy={false}
                  className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-xl shadow-[#3d2c1e]/15"
                />
              </ClipReveal>

              {/* Floating sticker badges */}
              <PopIn delay={2.4} className="absolute -left-6 top-12 hidden -rotate-6 rounded-2xl bg-[#fef7ee] p-3 shadow-lg shadow-[#3d2c1e]/10 md:block">
                <div className="flex items-center gap-2 rounded-xl bg-[#8a9a7b]/15 px-3 py-2">
                  <Heart className="h-4 w-4 text-[#c66a3d]" aria-hidden />
                  <div className="text-xs leading-tight">
                    <div className="font-medium">100% Real</div>
                    <div className="text-[#5a4a37]">Human Hair</div>
                  </div>
                </div>
              </PopIn>

              <PopIn delay={2.6} className="absolute -bottom-4 -right-4 hidden rotate-6 rounded-2xl bg-[#c66a3d] px-5 py-3.5 text-sm font-medium text-white shadow-xl shadow-[#3d2c1e]/15 md:block">
                <span className="font-script text-2xl">Hi!</span>
                <div className="text-xs">By appointment only</div>
              </PopIn>

              <SunRays className="absolute -top-8 -right-6 h-20 w-20 text-[#d4a574]" />
            </div>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="bg-[#fef7ee]">
        <svg viewBox="0 0 1440 80" className="h-12 w-full" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0 40 C 240 80, 480 0, 720 40 S 1200 80, 1440 40 L 1440 80 L 0 80 Z"
            fill="#f4e8d8"
          />
        </svg>
      </div>

      {/* About */}
      <section id="about" className="bg-[#f4e8d8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <FadeIn className="md:col-span-5" direction="left">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem]">
                  <Image
                    src={aboutPhoto}
                    alt="About Hair Extensions Bali"
                    fill={false}
                    width={500}
                    height={625}
                    className="h-full w-full object-cover"
                  />
                </div>
                <PopIn delay={0.4} className="absolute -right-4 -top-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#c66a3d] text-white">
                  <span className="text-center text-xs font-medium leading-tight">
                    Family
                    <br />
                    feeling
                  </span>
                </PopIn>
              </div>
            </FadeIn>
            <FadeIn className="md:col-span-7" direction="right" delay={0.1}>
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#c66a3d]">
                <Heart className="h-3 w-3 fill-[#c66a3d]" aria-hidden /> About us
              </p>
              <h2 className="font-display-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                Born in Bali from a{" "}
                <span className="font-script italic text-[#c66a3d]">simple passion</span>.
              </h2>
              <Stagger className="mt-8 space-y-5 text-[#5a4a37] md:text-lg md:leading-relaxed" stagger={0.1} distance={14}>
                {aboutCopy.long.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Stagger>
            </FadeIn>
          </div>

          {/* Value props */}
          <Stagger className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.1} distance={20}>
            {valueProps.map((v, i) => {
              const colors = [
                ["bg-[#c66a3d]", "text-white"],
                ["bg-[#8a9a7b]", "text-white"],
                ["bg-[#d4a574]", "text-[#3d2c1e]"],
                ["bg-[#3d2c1e]", "text-[#fef7ee]"],
              ][i % 4];
              return (
                <div
                  key={v.title}
                  className={`rounded-[2rem] ${colors[0]} ${colors[1]} p-7 transition-transform hover:-rotate-1 h-full`}
                >
                  <h3 className="font-display-serif text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-90">{v.body}</p>
                </div>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Wave divider */}
      <div className="bg-[#f4e8d8]">
        <svg viewBox="0 0 1440 80" className="h-12 w-full" preserveAspectRatio="none" aria-hidden>
          <path
            d="M0 40 C 240 80, 480 0, 720 40 S 1200 80, 1440 40 L 1440 80 L 0 80 Z"
            fill="#fef7ee"
          />
        </svg>
      </div>

      {/* Services */}
      <section id="services" className="relative overflow-hidden py-24 md:py-32">
        <Leaf className="absolute -right-10 top-32 h-48 w-48 -rotate-45 text-[#8a9a7b]/30" />
        <Leaf className="absolute -left-12 bottom-32 h-40 w-40 rotate-[160deg] text-[#c66a3d]/20" />

        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16 text-center md:mb-20">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#c66a3d]">
              <Sun className="h-3 w-3" aria-hidden /> Services & pricing
            </p>
            <h2 className="font-display-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Six methods, all{" "}
              <span className="font-script italic text-[#c66a3d]">100% real</span> human hair
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#5a4a37]">
              Prices below are in IDR per 100 g of single-drawn hair unless
              noted. Final pricing depends on grade, length, and gram amount —
              confirmed during your free WhatsApp consultation.
            </p>
          </FadeIn>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1} distance={28}>
            {services.map((s, idx) => {
              const tones = [
                "bg-[#fef7ee] border-[#c66a3d]/20",
                "bg-[#fef7ee] border-[#8a9a7b]/30",
                "bg-[#fef7ee] border-[#d4a574]/40",
              ];
              const accents = ["text-[#c66a3d]", "text-[#8a9a7b]", "text-[#a87544]"];
              const tone = tones[idx % 3];
              const accent = accents[idx % 3];
              return (
                <article
                  key={s.slug}
                  className={`group flex flex-col rounded-[2rem] border-2 ${tone} p-7 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3d2c1e]/10`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className={`rounded-full bg-[#3d2c1e]/5 px-3 py-1 text-xs font-medium ${accent}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-[#3d2c1e]/5 px-3 py-1 text-[10px] uppercase tracking-wider text-[#5a4a37]">
                      Lasts {s.lasts}
                    </span>
                  </div>

                  <h3 className="font-display-serif text-3xl text-[#3d2c1e]">{s.name}</h3>
                  <p className={`mt-1 text-sm font-medium italic ${accent}`}>{s.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#5a4a37]">{s.description}</p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {s.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full bg-[#3d2c1e]/5 px-3 py-1 text-[11px] font-medium text-[#5a4a37]"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-7">
                    <ul className="space-y-2 border-t border-dashed border-[#3d2c1e]/15 pt-5">
                      {s.prices.map((p) => (
                        <li key={p.label} className="flex items-baseline justify-between gap-3">
                          <span className="text-sm text-[#5a4a37]">{p.label}</span>
                          <span className={`font-display-serif text-xl text-[#3d2c1e]`}>
                            {formatIDR(p.amountIDR)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[11px] uppercase tracking-wider text-[#7a6650]">
                      {s.unit}
                      {s.minPurchase ? ` · ${s.minPurchase}` : ""}
                    </p>
                  </div>
                </article>
              );
            })}
          </Stagger>

          <FadeIn className="mt-14 rounded-[2rem] bg-[#3d2c1e] p-10 text-center text-[#fef7ee] md:p-14">
            <Heart className="mx-auto h-7 w-7 fill-[#c66a3d] text-[#c66a3d]" aria-hidden />
            <h3 className="mt-4 font-display-serif text-3xl md:text-4xl">
              Not sure which method fits you?
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#fef7ee]/75 md:text-base">
              Send us a photo of your natural hair on WhatsApp. We&apos;ll
              recommend the perfect method, color match, and gram amount —
              completely free.
            </p>
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c66a3d] px-7 py-3.5 text-sm font-medium transition-all hover:bg-[#d4a574] hover:text-[#3d2c1e]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Get a free recommendation
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="bg-[#8a9a7b]/15 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-14 text-center">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#c66a3d]">
              <Sun className="h-3 w-3" aria-hidden /> The process
            </p>
            <h2 className="font-display-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              From DM to{" "}
              <span className="font-script italic text-[#c66a3d]">dream hair</span>.
            </h2>
          </FadeIn>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.12} distance={20}>
            {processSteps.map((step, i) => (
              <div
                key={step.n}
                className="relative rounded-[2rem] bg-[#fef7ee] p-7 transition-transform hover:-translate-y-1 h-full"
              >
                <div
                  className={`absolute -top-5 left-7 flex h-12 w-12 items-center justify-center rounded-full font-display-serif text-lg shadow-md ${
                    i % 2 === 0
                      ? "bg-[#c66a3d] text-white"
                      : "bg-[#8a9a7b] text-white"
                  }`}
                >
                  {step.n}
                </div>
                <h3 className="mt-3 font-display-serif text-2xl text-[#3d2c1e]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a4a37]">{step.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#fef7ee] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#c66a3d]">
                <Heart className="h-3 w-3 fill-[#c66a3d]" aria-hidden /> Recent work
              </p>
              <h2 className="font-display-serif text-4xl leading-tight md:text-5xl">
                A peek inside the studio
              </h2>
            </div>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#c66a3d] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#3d2c1e]"
            >
              <Instagram className="h-4 w-4" aria-hidden /> Follow @{brand.instagram}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryPhotos.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-[1.5rem] shadow-md shadow-[#3d2c1e]/8 ${
                  i === 0 || i === 3 ? "aspect-[3/4]" : "aspect-square"
                } ${i % 3 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"} transition-transform hover:rotate-0 hover:scale-[1.03]`}
              >
                <Image
                  src={src}
                  alt="Hair Extensions Bali"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#f4e8d8] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#c66a3d]">
              <Star className="h-3 w-3 fill-[#c66a3d]" aria-hidden /> Love letters
            </p>
            <h2 className="font-display-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              From clients{" "}
              <span className="font-script italic text-[#c66a3d]">around the world</span>.
            </h2>
          </div>

          <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.15} distance={24}>
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className={`rounded-[2rem] bg-[#fef7ee] p-7 h-full ${
                  i === 1 ? "md:translate-y-6" : ""
                }`}
              >
                <div className="flex gap-1 text-[#d4a574]">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-5 font-display-serif text-lg leading-relaxed text-[#3d2c1e]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-dashed border-[#3d2c1e]/15 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c66a3d] text-sm font-medium text-white">
                    {t.name[0]}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-[#3d2c1e]">{t.name}</div>
                    <div className="text-xs text-[#7a6650]">
                      {t.location} · {t.service}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#c66a3d]">
              Frequently asked
            </p>
            <h2 className="font-display-serif text-4xl leading-tight md:text-5xl">
              Good things to{" "}
              <span className="font-script italic text-[#c66a3d]">know</span>.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                className="group rounded-2xl border-2 border-[#3d2c1e]/10 bg-[#fef7ee] p-6 transition-colors open:border-[#c66a3d]/40"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <span className="font-display-serif text-lg text-[#3d2c1e] md:text-xl">
                    {f.q}
                  </span>
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#c66a3d] text-white transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-[#5a4a37]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="relative overflow-hidden bg-[#3d2c1e] py-24 text-[#fef7ee] md:py-32">
        <SunRays className="absolute right-10 top-12 h-40 w-40 text-[#d4a574]/30" />
        <Leaf className="absolute -bottom-10 -left-6 h-44 w-44 rotate-[35deg] text-[#8a9a7b]/30" />

        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#d4a574]">
              <MapPin className="h-3 w-3" aria-hidden /> Visit the studio
            </p>
            <h2 className="font-display-serif text-4xl leading-tight md:text-6xl">
              Tucked into{" "}
              <span className="font-script italic text-[#d4a574]">Kerobokan</span>.
            </h2>
            <p className="mt-6 max-w-md text-lg text-[#fef7ee]/80">
              Ten minutes from the Seminyak strip, set in a quiet creative
              corner of Bali. Walk-ins welcome by appointment only.
            </p>

            <div className="mt-10 space-y-4 rounded-[2rem] bg-[#fef7ee]/8 p-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#d4a574]" aria-hidden />
                <a
                  href={brand.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-[#d4a574]"
                >
                  {brand.address}
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#d4a574]" aria-hidden />
                <p className="text-sm">{brand.hours}</p>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#d4a574]" aria-hidden />
                <a
                  href={brand.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-[#d4a574]"
                >
                  {brand.whatsappDisplay}
                </a>
              </div>
            </div>

            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#c66a3d] px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#d4a574] hover:text-[#3d2c1e]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Book your appointment
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem]">
              <Image
                src={visitPhoto}
                alt="The studio"
                fill={false}
                width={500}
                height={625}
                className="h-full w-full object-cover"
              />
            </div>
            <a
              href={brand.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-[#fef7ee] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#3d2c1e] shadow-lg transition-transform hover:scale-105"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fef7ee] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c66a3d] text-white">
                <span className="font-script text-xl">h</span>
              </div>
              <div>
                <div className="font-display-serif text-lg text-[#3d2c1e]">Hair Extensions</div>
                <div className="font-script text-base text-[#c66a3d] -mt-0.5">Bali</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 text-sm text-[#5a4a37] md:items-end">
              <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#c66a3d]">
                <Instagram className="h-4 w-4" aria-hidden /> @{brand.instagram}
              </a>
              <a href={brand.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#c66a3d]">
                <MessageCircle className="h-4 w-4" aria-hidden /> {brand.whatsappDisplay}
              </a>
              <a href={brand.mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#c66a3d]">
                <MapPin className="h-4 w-4" aria-hidden /> {brand.addressShort}
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-dashed border-[#3d2c1e]/20 pt-6 text-xs text-[#7a6650] md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} {brand.name}. Made with love in Bali.</p>
            <p className="font-script text-base text-[#c66a3d]">terima kasih ✿</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={brand.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#c66a3d] px-5 py-3 text-sm font-medium text-white shadow-xl shadow-[#3d2c1e]/25 transition-all hover:bg-[#3d2c1e] md:hidden"
        aria-label="Book on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
      </a>
    </div>
    </>
  );
}
