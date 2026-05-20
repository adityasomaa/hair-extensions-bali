import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  ArrowUpRight,
  Sparkles,
  Star,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import LoaderLuxe from "@/components/loaders/LoaderLuxe";
import {
  ScrollReveal,
  ScrollStagger,
  ParallaxScroll,
  ClipReveal,
  AccentLine,
} from "@/components/animations-gsap";
import {
  brand,
  aboutCopy,
  services,
  valueProps,
  faqs,
  formatIDR,
} from "@/lib/content";
import { getReviews } from "@/lib/reviews";

export const metadata = {
  title: `${brand.name} — Premium Hair Extensions in Bali`,
  description: brand.tagline,
};

export default async function HomePage() {
  const googleReviews = await getReviews();

  return (
    <>
      <LoaderLuxe />

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-12 md:grid-cols-12 md:gap-16 md:py-20 lg:py-28">
          <div className="md:col-span-7 lg:col-span-7">
            <ScrollReveal delay={1.6} duration={0.7}>
              <p className="mb-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                <Sparkles className="h-3 w-3" aria-hidden /> Premium hair extensions in Bali
              </p>
            </ScrollReveal>
            <ScrollReveal delay={1.7} duration={1} distance={36}>
              <h1 className="font-serif text-[2.7rem] leading-[1.05] tracking-tight md:text-7xl lg:text-[5.4rem]">
                <span className="font-script text-[#ffb6c1]">The</span>{" "}
                <span className="block">Hair Extensions</span>
                <span className="block italic font-script text-[#ffb6c1] mt-1">Bali</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={2} duration={0.8}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#c2b3b8] md:text-xl">
                Hair extensions in Bali, based in Kerobokan. Specialising in
                keratin bond, nano ring, micro ring, weft, tape-in, and clip-in
                extensions — 100% real human hair, expertly applied.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={2.15} duration={0.7}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/book"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-[#f6e9ec] px-7 py-3.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#ffb6c1]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Book a consultation
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </Link>
                <Link
                  href="/products"
                  className="text-sm tracking-wide text-[#d8c8cd] underline-offset-8 transition-colors hover:text-[#ffb6c1] hover:underline"
                >
                  Explore services
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2.3} duration={0.7}>
              <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 text-[11px] uppercase tracking-[0.18em] text-[#ab9aa1]">
                <div>
                  <dt className="text-[#ffb6c1]">Methods</dt>
                  <dd className="mt-1.5 font-serif text-2xl text-[#f6e9ec] normal-case tracking-normal">
                    6 techniques
                  </dd>
                </div>
                <div>
                  <dt className="text-[#ffb6c1]">Experience</dt>
                  <dd className="mt-1.5 font-serif text-2xl text-[#f6e9ec] normal-case tracking-normal">
                    3+ years
                  </dd>
                </div>
                <div>
                  <dt className="text-[#ffb6c1]">Satisfied clients</dt>
                  <dd className="mt-1.5 font-serif text-2xl text-[#f6e9ec] normal-case tracking-normal">
                    500+
                  </dd>
                </div>
              </dl>
            </ScrollReveal>
          </div>

          <div className="relative md:col-span-5 lg:col-span-5">
            <ClipReveal delay={1.8} duration={1.4}>
              <ParallaxScroll intensity={0.18}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src="/photos/hero-rack.jpg"
                    alt="The Hair Extensions Bali studio — wall of premium hair colors and mannequin display"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </ParallaxScroll>
            </ClipReveal>
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border border-[#ffb6c1]/40 md:block" aria-hidden />
            <div className="absolute -top-6 -right-6 hidden h-32 w-32 border border-[#ffb6c1]/40 md:block" aria-hidden />
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-white/5 bg-[#0a0807] py-5">
        <div className="flex animate-[marquee_35s_linear_infinite] gap-12 whitespace-nowrap font-serif text-[#ab9aa1] text-xl tracking-wide">
          {Array.from({ length: 4 }).flatMap((_, i) =>
            ["Keratin Bond", "Nano Ring", "Micro Ring", "Weft", "Tape-In", "Clip-In", "—"].map(
              (s, j) => (
                <span key={`${i}-${j}`} className="italic">
                  {s}
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ── 2. ABOUT US ──────────────────────────────────────────────────── */}
      <section id="about" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:gap-20">
          <ScrollReveal className="md:col-span-5">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
              About the studio
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Where transformation feels{" "}
              <span className="font-script italic text-[#ffb6c1]">like home</span>.
            </h2>
            <AccentLine className="mt-8 h-px w-32 bg-[#ffb6c1]" delay={0.2} duration={1.1} />
          </ScrollReveal>
          <ScrollStagger
            className="space-y-6 text-[#c2b3b8] md:col-span-7 md:text-lg md:leading-relaxed"
            stagger={0.12}
            distance={16}
          >
            {aboutCopy.long.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </ScrollStagger>
        </div>

        {/* Value props */}
        <div className="mx-auto mt-20 max-w-7xl px-6">
          <ScrollStagger
            className="grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4"
            stagger={0.08}
            distance={14}
          >
            {valueProps.map((v) => (
              <div key={v.title} className="bg-[#0e0b09] p-8">
                <h3 className="font-serif text-xl text-[#ffb6c1]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b5a3a8]">{v.body}</p>
              </div>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ── 3. PRODUCTS / SERVICES (overview, links to /products) ───────── */}
      <section id="services" className="border-t border-white/5 bg-[#0a0807] py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                Our services
              </p>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                Six methods, one obsession with the{" "}
                <span className="font-script italic text-[#ffb6c1]">natural</span> finish.
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm text-[#ffb6c1] underline underline-offset-8 transition-colors hover:text-[#f6e9ec]"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </ScrollReveal>

          <ScrollStagger
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.1}
            distance={28}
          >
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/products/${s.slug}`}
                className="group flex flex-col rounded-sm border border-white/10 bg-[#0e0b09] p-7 transition-all hover:-translate-y-1 hover:border-[#ffb6c1]/40"
              >
                <div className="mb-5 flex items-baseline justify-between border-b border-white/10 pb-5">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                    {s.lasts}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-[#ab9aa1] transition-all group-hover:translate-x-1 group-hover:text-[#ffb6c1]"
                    aria-hidden
                  />
                </div>

                <h3 className="font-serif text-2xl text-[#f6e9ec] md:text-3xl">{s.name}</h3>
                <p className="mt-2 text-sm italic text-[#ffb6c1]">{s.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#b5a3a8] line-clamp-3">
                  {s.description}
                </p>

                <div className="mt-auto pt-7">
                  <div className="flex items-baseline justify-between gap-3 border-t border-white/10 pt-5">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                      Starting from
                    </span>
                    <span className="font-serif text-xl text-[#f6e9ec]">
                      {formatIDR(s.prices[0]?.amountIDR ?? 0)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </ScrollStagger>

          <ScrollReveal className="mt-14 flex flex-col items-center gap-4 text-center" delay={0.1}>
            <p className="text-sm text-[#b5a3a8]">
              Not sure which method is right for you?
            </p>
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#ffb6c1] underline underline-offset-8 transition-colors hover:text-[#f6e9ec]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> Message us on WhatsApp
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. GOOGLE REVIEWS ────────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="mb-16 text-center">
            <p className="mb-5 inline-flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
              <Star className="h-3 w-3 fill-[#ffb6c1]" aria-hidden /> 5.0 on Google · From clients worldwide
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Trusted by women{" "}
              <span className="font-script italic text-[#ffb6c1]">around the world</span>.
            </h2>
          </ScrollReveal>

          <ScrollStagger
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.12}
            distance={24}
          >
            {googleReviews.slice(0, 6).map((r) => (
              <figure
                key={r.name + r.when}
                className="flex h-full flex-col rounded-sm border border-white/10 p-7 transition-colors hover:border-[#ffb6c1]/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#ffb6c1] text-[#ffb6c1]" aria-hidden />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                    {r.when}
                  </span>
                </div>
                <blockquote className="mt-5 flex-1 font-serif text-base italic leading-relaxed text-[#f6e9ec]">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm">
                  <span className="block text-[#ffb6c1]">{r.name}</span>
                  <span className="mt-0.5 block text-xs text-[#ab9aa1]">
                    {[r.location, r.service].filter(Boolean).join(" · ")}
                  </span>
                </figcaption>
              </figure>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* ── 5. FREQUENTLY ASKED ──────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-[#0a0807] py-24 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:gap-16">
          <ScrollReveal className="md:col-span-4">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
              Frequently asked
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Good things to{" "}
              <span className="font-script italic text-[#ffb6c1]">know</span>.
            </h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#c2b3b8]">
              Don&apos;t see your question? Send us a WhatsApp message — we
              usually reply within an hour during studio hours.
            </p>
          </ScrollReveal>

          <ScrollStagger className="md:col-span-8" stagger={0.06} distance={12}>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer items-baseline justify-between gap-4 list-none">
                    <dt className="font-serif text-lg leading-tight text-[#f6e9ec] md:text-xl">
                      {f.q}
                    </dt>
                    <span
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#ffb6c1]/40 text-[#ffb6c1] transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-[#c2b3b8] md:text-base">
                    {f.a}
                  </dd>
                </details>
              ))}
            </dl>
          </ScrollStagger>
        </div>
      </section>

      {/* ── 6. BOOK AN APPOINTMENT ───────────────────────────────────────── */}
      <section
        id="book"
        className="border-t border-white/5 py-24 md:py-36"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:gap-16">
          <ScrollReveal className="md:col-span-7">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
              Book an appointment
            </p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl lg:text-7xl">
              Send us a message —{" "}
              <span className="font-script italic text-[#ffb6c1]">we&rsquo;ll do the rest</span>.
            </h2>
            <p className="mt-8 max-w-xl text-lg text-[#c2b3b8]">
              Share a few photos of your natural hair on WhatsApp. We&apos;ll
              recommend the best method, confirm the colour match and gram amount,
              and book you in — usually within an hour during studio hours.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/book"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#ffb6c1] px-7 py-3.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#ffc9d2]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Open the booking form
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <a
                href={brand.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide text-[#d8c8cd] underline-offset-8 transition-colors hover:text-[#ffb6c1] hover:underline"
              >
                Or message directly on WhatsApp →
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="md:col-span-5">
            <div className="rounded-sm border border-white/10 bg-[#0e0b09] p-8">
              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ffb6c1]" aria-hidden />
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                      Visit
                    </span>
                    <a
                      href={brand.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block leading-relaxed text-[#f6e9ec] transition-colors hover:text-[#ffb6c1]"
                    >
                      {brand.address}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ffb6c1]" aria-hidden />
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                      Hours
                    </span>
                    <p className="mt-1 text-[#f6e9ec]">{brand.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ffb6c1]" aria-hidden />
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                      WhatsApp
                    </span>
                    <a
                      href={brand.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-[#f6e9ec] transition-colors hover:text-[#ffb6c1]"
                    >
                      {brand.whatsappDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="/photos/salon-2.jpg"
                  alt="The Hair Extensions Bali studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Floating WhatsApp (mobile) */}
      <a
        href={brand.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full bg-[#ffb6c1] px-5 py-3 text-sm font-medium text-[#0e0b09] shadow-2xl shadow-black/40 transition-all hover:bg-[#ffc9d2] md:hidden"
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
    </>
  );
}
