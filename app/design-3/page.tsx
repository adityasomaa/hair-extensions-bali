import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Clock,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons";
import LoaderEditorial from "@/components/loaders/LoaderEditorial";
import { FadeIn, Stagger, ClipReveal } from "@/components/animations";
import {
  brand,
  aboutCopy,
  services,
  valueProps,
  testimonials,
  faqs,
  processSteps,
  galleryPhotos,
  formatIDR,
} from "@/lib/content";

export const metadata = {
  title: `${brand.name} — Bold Editorial`,
  description: brand.tagline,
};

const ACCENT = "#ff3d6e";

export default function Design3Page() {
  return (
    <>
    <LoaderEditorial />
    <div className="min-h-screen bg-white text-black">
      {/* Top utility bar */}
      <div className="border-b border-black bg-black py-2 text-[10px] uppercase tracking-[0.25em] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
          <span className="hidden sm:inline">★ Issue 01 — Bali Edition · By Appointment</span>
          <span className="hidden md:inline">{brand.address.split(",").slice(1, 3).join(",").trim()}</span>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            @{brand.instagram} ↗
          </a>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b-2 border-black bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/design-3" className="block leading-none">
            <span className="block text-[10px] uppercase tracking-[0.3em] text-black/50">The</span>
            <span className="font-condensed text-2xl tracking-tight uppercase">
              Hair Extensions Bali
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {[
              ["About", "#about"],
              ["Services", "#services"],
              ["Process", "#process"],
              ["Visit", "#visit"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="font-condensed text-sm uppercase tracking-[0.18em] text-black hover:text-[var(--accent)]"
                style={{ ["--accent" as string]: ACCENT }}
              >
                {label}
              </a>
            ))}
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-black px-5 py-2.5 font-condensed text-sm uppercase tracking-[0.18em] text-white transition-colors hover:bg-[var(--accent)]"
              style={{ ["--accent" as string]: ACCENT }}
            >
              Book →
            </a>
          </div>

          <a
            href={brand.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black px-4 py-2 font-condensed text-xs uppercase tracking-[0.18em] text-white md:hidden"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Book
          </a>
        </nav>
      </header>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-40 hidden border-2 border-black bg-white px-3 py-1.5 font-condensed text-[10px] uppercase tracking-[0.25em] hover:bg-black hover:text-white md:inline-block"
      >
        ← All Designs
      </Link>

      {/* Hero */}
      <section className="relative border-b-2 border-black">
        <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-16">
          <div className="flex items-baseline justify-between gap-4 border-b border-black/15 pb-4">
            <span className="font-condensed text-xs uppercase tracking-[0.3em] text-black/60">
              No. 001 / Hair Atelier
            </span>
            <span className="font-condensed text-xs uppercase tracking-[0.3em] text-black/60">
              Kerobokan, Bali
            </span>
          </div>

          <div className="grid grid-cols-12 gap-6 py-12 md:gap-10 md:py-16">
            <div className="col-span-12 md:col-span-7">
              <h1 className="font-condensed text-[16vw] leading-[0.85] tracking-tight uppercase md:text-[10.5vw] lg:text-[9.5rem]">
                <FadeIn delay={1.7} duration={0.55} distance={30} as="span" className="block">Real</FadeIn>
                <FadeIn delay={1.8} duration={0.55} distance={30} as="span" className="block">Hair.</FadeIn>
                <FadeIn delay={1.9} duration={0.55} distance={30} as="span" className="block" >
                  <span style={{ color: ACCENT }}>Real</span>
                </FadeIn>
                <FadeIn delay={2.0} duration={0.55} distance={30} as="span" className="block italic font-serif normal-case tracking-tight">results.</FadeIn>
              </h1>
            </div>

            <FadeIn delay={2.15} duration={0.6} direction="left" className="col-span-12 flex flex-col justify-end md:col-span-5">
              <div className="border-l-2 border-black pl-6">
                <p className="font-condensed text-sm uppercase tracking-[0.2em] text-black/60">
                  ★ Premium Hair Extensions · Six Methods
                </p>
                <p className="mt-4 text-lg leading-relaxed md:text-xl">
                  Six expert application methods. International-quality human
                  hair. Warm, personal service in the heart of Kerobokan —
                  trusted by women from around the world.
                </p>
                <a
                  href={brand.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 bg-black px-7 py-4 font-condensed text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-[var(--accent)]"
                  style={{ ["--accent" as string]: ACCENT }}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Book on WhatsApp
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Hero image strip */}
        <div className="grid grid-cols-12 border-t-2 border-black">
          <div className="col-span-12 aspect-[16/9] md:col-span-8 md:aspect-auto md:h-[60vh]">
            <ClipReveal delay={2.0} duration={1.1} className="relative h-full w-full">
              <div className="relative h-full w-full">
                <Image
                  src="/brand/1.jpg.jpeg"
                  alt="The Hair Extensions Bali"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 67vw"
                />
              </div>
            </ClipReveal>
          </div>

          <div className="col-span-12 grid grid-cols-3 border-t-2 border-black md:col-span-4 md:grid-cols-1 md:grid-rows-3 md:border-l-2 md:border-t-0">
            <div className="flex flex-col justify-center gap-1 border-r border-black/15 p-6 last:border-r-0 md:border-b md:border-r-0">
              <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-black/55">
                Methods
              </span>
              <span className="font-condensed text-3xl uppercase md:text-5xl">06</span>
            </div>
            <div className="flex flex-col justify-center gap-1 border-r border-black/15 p-6 last:border-r-0 md:border-b md:border-r-0">
              <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-black/55">
                Lasts up to
              </span>
              <span className="font-condensed text-3xl uppercase md:text-5xl">9 Mo.</span>
            </div>
            <div className="flex flex-col justify-center gap-1 p-6">
              <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-black/55">
                Reply within
              </span>
              <span className="font-condensed text-3xl uppercase md:text-5xl">≈ 1 Hr</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div
        className="overflow-hidden border-b-2 border-black py-4 text-white"
        style={{ backgroundColor: ACCENT }}
      >
        <div className="flex animate-[marquee_30s_linear_infinite] gap-10 whitespace-nowrap font-condensed text-2xl uppercase tracking-[0.18em]">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            [
              "Keratin Bond",
              "★",
              "Nano Ring",
              "★",
              "Micro Ring",
              "★",
              "Weft",
              "★",
              "Tape-In",
              "★",
              "Clip-In",
              "★",
            ].map((s, j) => <span key={`${i}-${j}`}>{s}</span>)
          )}
        </div>
      </div>

      {/* About */}
      <section id="about" className="border-b-2 border-black bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <FadeIn className="col-span-12 md:col-span-4" duration={0.5} distance={20}>
              <p className="font-condensed text-xs uppercase tracking-[0.3em]">
                <span style={{ color: ACCENT }}>★</span> Section 01 — About
              </p>
              <h2 className="mt-4 font-condensed text-6xl leading-[0.9] uppercase md:text-7xl lg:text-8xl">
                Born
                <br />
                in
                <br />
                <span className="italic font-serif normal-case" style={{ color: ACCENT }}>
                  Bali.
                </span>
              </h2>
            </FadeIn>
            <Stagger className="col-span-12 md:col-span-8" stagger={0.08} distance={14}>
              <div className="grid gap-5 text-base leading-relaxed md:grid-cols-2 md:gap-x-8 md:text-lg">
                {aboutCopy.long.map((p, i) => (
                  <p
                    key={i}
                    className={i === 0 ? "md:col-span-2 text-xl md:text-2xl font-medium leading-snug" : ""}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Stagger>
          </div>

          {/* Value props strip */}
          <Stagger className="mt-20 grid grid-cols-1 border-t-2 border-black md:grid-cols-4" stagger={0.08} distance={16}>
            {valueProps.map((v, i) => (
              <div
                key={v.title}
                className={`h-full border-b border-black/15 p-7 md:border-b-0 ${
                  i < 3 ? "md:border-r border-black/15" : ""
                }`}
              >
                <span className="font-condensed text-xs uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-condensed text-2xl uppercase tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/70">{v.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-b-2 border-black bg-black py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="grid grid-cols-12 items-end gap-6 border-b border-white/15 pb-10 md:gap-10" duration={0.5} distance={18}>
            <div className="col-span-12 md:col-span-7">
              <p className="font-condensed text-xs uppercase tracking-[0.3em]">
                <span style={{ color: ACCENT }}>★</span> Section 02 — The Lookbook
              </p>
              <h2 className="mt-4 font-condensed text-6xl leading-[0.9] uppercase md:text-7xl lg:text-8xl">
                Six methods.
                <br />
                One{" "}
                <span className="italic font-serif normal-case" style={{ color: ACCENT }}>
                  obsession
                </span>
                .
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5">
              <p className="text-base text-white/70 md:text-lg">
                Pricing in IDR per 100 g of single-drawn hair unless noted.
                Final pricing depends on grade, length, and gram amount —
                confirmed during your consultation.
              </p>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" stagger={0.07} distance={20}>
            {services.map((s, idx) => (
              <article
                key={s.slug}
                className={`group flex flex-col gap-5 border-b border-white/15 p-7 transition-colors hover:bg-white/5 lg:[&:nth-child(3n+1)]:border-l-0 lg:[&:not(:nth-child(3n+1))]:border-l ${
                  idx % 2 === 0 ? "md:[&:nth-child(odd)]:border-l-0" : ""
                } border-white/15`}
              >
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4">
                  <span className="font-condensed text-xs uppercase tracking-[0.3em] text-white/60">
                    No. {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-condensed text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: ACCENT }}
                  >
                    {s.lasts}
                  </span>
                </div>

                <div>
                  <h3 className="font-condensed text-4xl uppercase tracking-tight md:text-5xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 font-serif text-sm italic text-white/65">{s.tagline}</p>
                </div>

                <p className="text-sm leading-relaxed text-white/75">{s.description}</p>

                <ul className="flex flex-wrap gap-1.5">
                  {s.highlights.map((h) => (
                    <li
                      key={h}
                      className="border border-white/25 px-2.5 py-1 font-condensed text-[11px] uppercase tracking-[0.18em]"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-white/15 pt-5">
                  <ul className="space-y-1.5">
                    {s.prices.map((p) => (
                      <li
                        key={p.label}
                        className="flex items-baseline justify-between gap-3"
                      >
                        <span className="font-condensed text-xs uppercase tracking-[0.2em] text-white/65">
                          {p.label}
                        </span>
                        <span className="font-condensed text-2xl">{formatIDR(p.amountIDR)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-condensed text-[10px] uppercase tracking-[0.3em] text-white/50">
                    {s.unit}{s.minPurchase ? ` · ${s.minPurchase}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </Stagger>

          <FadeIn className="mt-12 border-t border-white/15 pt-10 text-center">
            <p className="font-serif text-2xl italic text-white/85 md:text-3xl">
              &ldquo;Not sure which one? We&apos;ll match you.&rdquo;
            </p>
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-7 py-4 font-condensed text-sm uppercase tracking-[0.25em] text-black transition-opacity hover:opacity-85"
              style={{ backgroundColor: ACCENT }}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Get a free recommendation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="border-b-2 border-black bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <FadeIn className="col-span-12 md:col-span-5" duration={0.5} distance={20}>
              <p className="font-condensed text-xs uppercase tracking-[0.3em]">
                <span style={{ color: ACCENT }}>★</span> Section 03 — Workflow
              </p>
              <h2 className="mt-4 font-condensed text-6xl leading-[0.9] uppercase md:text-7xl lg:text-8xl">
                DM
                <br />
                to
                <br />
                <span className="italic font-serif normal-case" style={{ color: ACCENT }}>
                  reveal.
                </span>
              </h2>
            </FadeIn>
            <Stagger className="col-span-12 md:col-span-7" stagger={0.08} distance={16}>
              <div className="grid grid-cols-1 gap-px bg-black md:grid-cols-2">
                {processSteps.map((step) => (
                  <div
                    key={step.n}
                    className="bg-white p-7 transition-colors hover:bg-black hover:text-white h-full"
                  >
                    <span
                      className="font-condensed text-5xl uppercase tracking-tight md:text-6xl"
                      style={{ color: ACCENT }}
                    >
                      {step.n}
                    </span>
                    <h3 className="mt-2 font-condensed text-2xl uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-black/70 group-hover:text-white/70">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </Stagger>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-b-2 border-black bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-10 flex items-end justify-between gap-6 border-b border-black/15 pb-6" duration={0.5}>
            <div>
              <p className="font-condensed text-xs uppercase tracking-[0.3em]">
                <span style={{ color: ACCENT }}>★</span> Section 04 — Lookbook
              </p>
              <h2 className="mt-4 font-condensed text-5xl uppercase tracking-tight md:text-7xl">
                Recent <span style={{ color: ACCENT }}>work.</span>
              </h2>
            </div>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-condensed text-sm uppercase tracking-[0.2em] underline-offset-4 transition-opacity hover:opacity-65 md:inline-flex md:items-center md:gap-2"
            >
              <Instagram className="h-4 w-4" aria-hidden /> @{brand.instagram} ↗
            </a>
          </FadeIn>

          <Stagger className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3" stagger={0.06} distance={14}>
            {galleryPhotos.map((src, i) => (
              <div
                key={src}
                className={`group relative overflow-hidden bg-black ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt="Hair Extensions Bali"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span
                    className="font-condensed text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: ACCENT }}
                  >
                    /No.{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b-2 border-black bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="border-b border-black/15 pb-6">
            <p className="font-condensed text-xs uppercase tracking-[0.3em]">
              <span style={{ color: ACCENT }}>★</span> Section 05 — Testimonials
            </p>
            <h2 className="mt-4 font-condensed text-5xl uppercase tracking-tight md:text-7xl">
              <span style={{ color: ACCENT }}>★★★★★</span>
            </h2>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3" stagger={0.1} distance={20}>
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                className={`flex flex-col gap-6 p-8 h-full ${
                  i < 2 ? "border-b border-black/15 md:border-b-0 md:border-r" : ""
                }`}
              >
                <span
                  className="font-serif text-7xl leading-none"
                  style={{ color: ACCENT }}
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="font-serif text-xl leading-relaxed text-black md:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto border-t border-black/15 pt-5">
                  <div className="font-condensed text-lg uppercase tracking-tight">
                    {t.name}
                  </div>
                  <div className="font-condensed text-[10px] uppercase tracking-[0.25em] text-black/55">
                    {t.location} · {t.service}
                  </div>
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b-2 border-black bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-4">
              <p className="font-condensed text-xs uppercase tracking-[0.3em]">
                <span style={{ color: ACCENT }}>★</span> Section 06 — FAQ
              </p>
              <h2 className="mt-4 font-condensed text-6xl leading-[0.9] uppercase md:text-7xl">
                Good
                <br />
                to
                <br />
                <span className="italic font-serif normal-case" style={{ color: ACCENT }}>
                  know.
                </span>
              </h2>
            </div>
            <dl className="col-span-12 divide-y-2 divide-black border-y-2 border-black md:col-span-8">
              {faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                    <dt className="font-condensed text-xl uppercase tracking-tight md:text-2xl">
                      {f.q}
                    </dt>
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center font-condensed text-2xl transition-transform group-open:rotate-45"
                      style={{ backgroundColor: ACCENT, color: "#000" }}
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-4 max-w-2xl text-base leading-relaxed text-black/75">{f.a}</dd>
                </details>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Visit / CTA */}
      <section
        id="visit"
        className="border-b-2 border-black py-20 md:py-28"
        style={{ backgroundColor: ACCENT }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 md:gap-10">
          <div className="col-span-12 md:col-span-7">
            <p className="font-condensed text-xs uppercase tracking-[0.3em] text-black">
              ★ Section 07 — Visit
            </p>
            <h2 className="mt-4 font-condensed text-6xl leading-[0.9] uppercase md:text-8xl lg:text-[8rem]">
              Come
              <br />
              say{" "}
              <span className="italic font-serif normal-case">hi.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg text-black/85 md:text-xl">
              Tucked into Kerobokan, ten minutes from Seminyak. Walk-ins
              welcome by appointment only.
            </p>
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-black px-8 py-5 font-condensed text-base uppercase tracking-[0.25em] text-white transition-opacity hover:opacity-85"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Book on WhatsApp
              <ArrowUpRight className="h-5 w-5" aria-hidden />
            </a>
          </div>
          <div className="col-span-12 md:col-span-5">
            <div className="space-y-px bg-black">
              <div className="flex items-start gap-4 bg-white p-6">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden />
                <div>
                  <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-black/55">
                    Address
                  </span>
                  <a
                    href={brand.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block hover:underline"
                  >
                    {brand.address}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden />
                <div>
                  <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-black/55">
                    Hours
                  </span>
                  <p className="mt-1">{brand.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6">
                <MessageCircle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden />
                <div>
                  <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-black/55">
                    WhatsApp
                  </span>
                  <a
                    href={brand.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block hover:underline"
                  >
                    {brand.whatsappDisplay}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6">
                <Instagram className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden />
                <div>
                  <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-black/55">
                    Instagram
                  </span>
                  <a
                    href={brand.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block hover:underline"
                  >
                    @{brand.instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-14 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-6 border-b border-white/15 pb-10 md:gap-10">
            <div className="col-span-12 md:col-span-6">
              <span className="block text-[10px] uppercase tracking-[0.3em] text-white/45">The</span>
              <span className="font-condensed text-5xl uppercase tracking-tight md:text-7xl">
                Hair Extensions Bali
              </span>
              <p className="mt-4 max-w-md text-sm text-white/65">
                Premium hair extensions, expertly applied in the heart of Bali.
                International quality, six methods, family feeling.
              </p>
            </div>
            <div className="col-span-6 md:col-span-3">
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-white/50">
                Reach out
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a href={brand.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]" style={{ ["--accent" as string]: ACCENT }}>
                    WhatsApp ↗
                  </a>
                </li>
                <li>
                  <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]" style={{ ["--accent" as string]: ACCENT }}>
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a href={brand.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]" style={{ ["--accent" as string]: ACCENT }}>
                    Google Maps ↗
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-6 md:col-span-3">
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-white/50">Visit</p>
              <p className="mt-3 text-sm text-white/85">{brand.address}</p>
              <p className="mt-2 text-sm text-white/65">{brand.hours}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start justify-between gap-3 text-xs uppercase tracking-[0.25em] text-white/50 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} The Hair Extensions Bali</p>
            <p>★ By appointment only · Kerobokan, Bali</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={brand.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 font-condensed text-sm uppercase tracking-[0.2em] text-black shadow-2xl shadow-black/35 transition-opacity hover:opacity-85 md:hidden"
        style={{ backgroundColor: ACCENT }}
        aria-label="Book on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> Book
      </a>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
    </>
  );
}
