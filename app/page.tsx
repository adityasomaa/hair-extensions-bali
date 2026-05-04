import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons";
import LoaderLuxe from "@/components/loaders/LoaderLuxe";
import SmoothScroll from "@/components/SmoothScroll";
import { FadeIn, Stagger, ClipReveal, AccentLine, Parallax } from "@/components/animations";
import {
  brand,
  aboutCopy,
  services,
  valueProps,
  testimonials,
  faqs,
  processSteps,
  galleryPhotos,
  visitPhoto,
  heroVideoLuxe,
  formatIDR,
} from "@/lib/content";
import VideoLoop from "@/components/VideoLoop";

export const metadata = {
  title: `${brand.name} — Premium Hair Extensions in Bali`,
  description: brand.tagline,
};

export default function HomePage() {
  return (
    <SmoothScroll>
    <LoaderLuxe />
    <div className="min-h-screen bg-[#0e0b09] text-[#f6efe6] selection:bg-[#c9a87c] selection:text-[#0e0b09]">
      {/* Top utility bar */}
      <div className="border-b border-white/5 bg-[#0a0807] py-2.5 text-[11px] tracking-wider uppercase text-[#8a7a66]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
          <span className="hidden sm:inline">By appointment · Kerobokan, Bali</span>
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-[#c9a87c]"
          >
            <Instagram className="h-3 w-3" aria-hidden /> @{brand.instagram}
          </a>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0e0b09]/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/" className="leading-none">
            <span className="block font-script text-2xl text-[#c9a87c] -mb-1">The</span>
            <span className="block font-serif text-base tracking-[0.32em] uppercase">
              Hair Extensions
            </span>
            <span className="block text-right font-script text-xl text-[#c9a87c] -mt-1">
              Bali
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
                className="text-sm text-[#d8cdbd] transition-colors hover:text-[#c9a87c]"
              >
                {label}
              </a>
            ))}
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c9a87c] px-5 py-2.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#d8b889]"
            >
              Book on WhatsApp
            </a>
          </div>

          <a
            href={brand.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#c9a87c] px-4 py-2 text-xs font-medium text-[#0e0b09] md:hidden"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Book
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-12 md:gap-16 md:py-28 lg:py-36">
          <div className="md:col-span-7 lg:col-span-7">
            <FadeIn delay={1.6} duration={0.7}>
              <p className="mb-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
                <Sparkles className="h-3 w-3" aria-hidden /> Premium hair extensions in Bali
              </p>
            </FadeIn>
            <FadeIn delay={1.7} duration={1} distance={36}>
              <h1 className="font-serif text-[2.7rem] leading-[1.05] tracking-tight md:text-7xl lg:text-[5.4rem]">
                <span className="font-script text-[#c9a87c]">The</span>{" "}
                <span className="block">Hair Extensions</span>
                <span className="block italic font-script text-[#c9a87c] mt-1">Bali</span>
              </h1>
            </FadeIn>
            <FadeIn delay={2} duration={0.8}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#c2b8a8] md:text-xl">
                Transformation is in the details. International-quality hair, six
                expert application methods, and warm Balinese hospitality —
                quietly perfected since day one.
              </p>
            </FadeIn>
            <FadeIn delay={2.15} duration={0.7}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={brand.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#f6efe6] px-7 py-3.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#c9a87c]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Book a consultation
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
                <a
                  href="#services"
                  className="text-sm tracking-wide text-[#d8cdbd] underline-offset-8 transition-colors hover:text-[#c9a87c] hover:underline"
                >
                  Explore services
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={2.3} duration={0.7}>
              <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.18em] text-[#8a7a66]">
                <div>
                  <dt className="text-[#c9a87c]">Methods</dt>
                  <dd className="mt-1.5 font-serif text-2xl text-[#f6efe6] normal-case tracking-normal">
                    6 techniques
                  </dd>
                </div>
                <div>
                  <dt className="text-[#c9a87c]">Lasts up to</dt>
                  <dd className="mt-1.5 font-serif text-2xl text-[#f6efe6] normal-case tracking-normal">
                    9 months
                  </dd>
                </div>
                <div>
                  <dt className="text-[#c9a87c]">Located</dt>
                  <dd className="mt-1.5 font-serif text-2xl text-[#f6efe6] normal-case tracking-normal">
                    Kerobokan
                  </dd>
                </div>
              </dl>
            </FadeIn>
          </div>

          <div className="relative md:col-span-5 lg:col-span-5">
            <ClipReveal delay={1.8} duration={1.4}>
              <Parallax intensity={0.18}>
                <VideoLoop
                  src={heroVideoLuxe.src}
                  poster={heroVideoLuxe.poster}
                  alt={heroVideoLuxe.caption}
                  lazy={false}
                  className="relative aspect-[4/5] overflow-hidden rounded-sm"
                />
              </Parallax>
            </ClipReveal>
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border border-[#c9a87c]/40 md:block" aria-hidden />
            <div className="absolute -top-6 -right-6 hidden h-32 w-32 border border-[#c9a87c]/40 md:block" aria-hidden />
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="overflow-hidden border-y border-white/5 bg-[#0a0807] py-5">
        <div className="flex animate-[marquee_35s_linear_infinite] gap-12 whitespace-nowrap font-serif text-[#8a7a66] text-xl tracking-wide">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            [
              "Keratin Bond",
              "Nano Ring",
              "Micro Ring",
              "Weft",
              "Tape-In",
              "Clip-In",
              "—",
            ].map((s, j) => (
              <span key={`${i}-${j}`} className="italic">
                {s}
              </span>
            ))
          )}
        </div>
      </div>

      {/* About */}
      <section id="about" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:gap-20">
          <FadeIn className="md:col-span-5">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
              About the studio
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Where transformation feels{" "}
              <span className="font-script italic text-[#c9a87c]">like home</span>.
            </h2>
            <AccentLine className="mt-8 h-px w-32 bg-[#c9a87c]" delay={0.2} duration={1.1} />
          </FadeIn>
          <Stagger
            className="space-y-6 text-[#c2b8a8] md:col-span-7 md:text-lg md:leading-relaxed"
            stagger={0.12}
            distance={16}
          >
            {aboutCopy.long.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Stagger>
        </div>

        {/* Value props */}
        <div className="mx-auto mt-20 max-w-7xl px-6">
          <Stagger
            className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
            distance={14}
          >
            {valueProps.map((v) => (
              <div key={v.title} className="bg-[#0e0b09] p-8">
                <h3 className="font-serif text-xl text-[#c9a87c]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b5a896]">{v.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-white/5 bg-[#0a0807] py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
                Services & investment
              </p>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                Six methods, one obsession with the{" "}
                <span className="font-script italic text-[#c9a87c]">natural</span> finish.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-[#b5a896]">
              All prices below are listed in IDR per 100 grams of single-drawn
              hair unless noted. Final pricing depends on grade, length, and
              gram amount — confirmed during your consultation.
            </p>
          </FadeIn>

          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1} distance={28}>
            {services.map((s, idx) => (
              <article
                key={s.slug}
                className="group flex flex-col rounded-sm border border-white/10 bg-[#0e0b09] p-7 transition-colors hover:border-[#c9a87c]/40"
              >
                <div className="mb-5 flex items-baseline justify-between border-b border-white/10 pb-5">
                  <span className="font-serif text-xs italic text-[#c9a87c]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#8a7a66]">
                    {s.lasts}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-[#f6efe6] md:text-3xl">{s.name}</h3>
                <p className="mt-2 text-sm italic text-[#c9a87c]">{s.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#b5a896]">{s.description}</p>

                <ul className="mt-5 space-y-2 text-xs text-[#d8cdbd]">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="text-[#c9a87c]">·</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <ul className="space-y-2 border-t border-white/10 pt-5">
                    {s.prices.map((p) => (
                      <li key={p.label} className="flex items-baseline justify-between gap-3">
                        <span className="text-sm text-[#b5a896]">{p.label}</span>
                        <span className="font-serif text-lg text-[#f6efe6]">
                          {formatIDR(p.amountIDR)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#8a7a66]">
                    {s.unit}{s.minPurchase ? ` · ${s.minPurchase}` : ""}
                  </p>
                </div>
              </article>
            ))}
          </Stagger>

          <FadeIn className="mt-14 flex flex-col items-center gap-4 text-center" delay={0.1}>
            <p className="text-sm text-[#b5a896]">
              Not sure which method is right for you?
            </p>
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#c9a87c] underline underline-offset-8 transition-colors hover:text-[#f6efe6]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Message us on WhatsApp for a recommendation
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="mb-16 max-w-2xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
              The process
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              From first message to{" "}
              <span className="font-script italic text-[#c9a87c]">final reveal</span>.
            </h2>
          </FadeIn>

          <Stagger className="grid gap-px overflow-hidden rounded-sm bg-white/10 md:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
            {processSteps.map((step) => (
              <div key={step.n} className="bg-[#0e0b09] p-8 h-full">
                <span className="font-script text-3xl text-[#c9a87c]">{step.n}</span>
                <h3 className="mt-3 font-serif text-2xl text-[#f6efe6]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b5a896]">{step.body}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Gallery */}
      <section className="border-t border-white/5 bg-[#0a0807] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
                Recent work
              </p>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                A look inside the studio
              </h2>
            </div>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-sm text-[#c9a87c] underline underline-offset-8 transition-colors hover:text-[#f6efe6] md:inline-flex"
            >
              <Instagram className="h-4 w-4" aria-hidden /> Follow @{brand.instagram}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryPhotos.map((src, i) => (
              <div
                key={src}
                className={`relative aspect-square overflow-hidden rounded-sm ${
                  i % 5 === 0 ? "md:row-span-2 md:aspect-[3/5]" : ""
                }`}
              >
                <Image
                  src={src}
                  alt="Hair Extensions Bali"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-5 text-center text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
            What clients say
          </p>
          <h2 className="text-center font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            Trusted by women{" "}
            <span className="font-script italic text-[#c9a87c]">around the world</span>.
          </h2>

          <Stagger className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.15}>
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-sm border border-white/10 p-7 h-full"
              >
                <blockquote className="font-serif text-lg italic leading-relaxed text-[#f6efe6]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-5 text-sm">
                  <span className="block text-[#c9a87c]">{t.name}</span>
                  <span className="mt-0.5 block text-xs text-[#8a7a66]">
                    {t.location} · {t.service}
                  </span>
                </figcaption>
              </figure>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 bg-[#0a0807] py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
              Frequently asked
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">Good to know</h2>
            <p className="mt-6 text-sm leading-relaxed text-[#b5a896]">
              Don&apos;t see your question? Send us a message — we usually reply
              within an hour during studio hours.
            </p>
          </div>
          <dl className="space-y-px overflow-hidden rounded-sm bg-white/10 md:col-span-8">
            {faqs.map((f) => (
              <div key={f.q} className="bg-[#0a0807] p-7">
                <dt className="font-serif text-xl text-[#f6efe6]">{f.q}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-[#b5a896]">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Visit / CTA */}
      <section id="visit" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-2 md:gap-16">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
              Visit the studio
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-6xl">
              Tucked into{" "}
              <span className="font-script italic text-[#c9a87c]">Kerobokan</span>.
            </h2>
            <p className="mt-6 text-lg text-[#c2b8a8]">
              Ten minutes from the Seminyak strip, set in a quiet creative
              corner of Bali. Walk-ins welcome by appointment only.
            </p>

            <div className="mt-10 space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8a7a66]">Address</span>
                  <a
                    href={brand.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[#f6efe6] transition-colors hover:text-[#c9a87c]"
                  >
                    {brand.address}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8a7a66]">Hours</span>
                  <p className="mt-1 text-[#f6efe6]">{brand.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8a7a66]">WhatsApp</span>
                  <a
                    href={brand.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[#f6efe6] transition-colors hover:text-[#c9a87c]"
                  >
                    {brand.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-[#c9a87c] px-8 py-4 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#d8b889]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Book your appointment
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-sm md:aspect-auto">
            <Image
              src={visitPhoto}
              alt="Hair Extensions Bali studio detail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <a
              href={brand.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 right-5 rounded-full bg-[#0e0b09]/90 px-5 py-2.5 text-xs uppercase tracking-widest text-[#c9a87c] backdrop-blur-md transition-colors hover:bg-[#0e0b09]"
            >
              Open in Maps ↗
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0807] py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
            <div>
              <span className="block font-script text-2xl text-[#c9a87c] -mb-1">The</span>
              <span className="block font-serif text-base tracking-[0.32em] uppercase">
                Hair Extensions
              </span>
              <span className="block font-script text-xl text-[#c9a87c] -mt-1 text-right">
                Bali
              </span>
            </div>
            <div className="flex flex-col items-start gap-3 text-sm text-[#b5a896] md:items-end">
              <a href={brand.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#c9a87c]">
                <Instagram className="h-4 w-4" aria-hidden /> @{brand.instagram}
              </a>
              <a href={brand.whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#c9a87c]">
                <MessageCircle className="h-4 w-4" aria-hidden /> {brand.whatsappDisplay}
              </a>
              <a href={brand.mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-right hover:text-[#c9a87c]">
                <MapPin className="h-4 w-4" aria-hidden /> {brand.addressShort}
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-[#8a7a66] md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
            <p className="italic">By appointment only · Kerobokan, Bali</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={brand.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#c9a87c] px-5 py-3 text-sm font-medium text-[#0e0b09] shadow-2xl shadow-black/40 transition-all hover:bg-[#d8b889] md:hidden"
        aria-label="Book on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
      </a>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
    </SmoothScroll>
  );
}
