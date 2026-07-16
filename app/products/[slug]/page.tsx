import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import {
  ScrollReveal,
  ScrollStagger,
  ClipReveal,
  AccentLine,
} from "@/components/animations-gsap";
import BeforeAfter from "@/components/BeforeAfter";
import BeforeAfterPlaceholder from "@/components/BeforeAfterPlaceholder";
import { brand, services, serviceBySlug, formatIDR } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return { title: `Not found — ${brand.name}` };
  return {
    title: `${s.name} — ${brand.name}`,
    description: s.tagline,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  // Find next service for "next →" nav
  const idx = services.findIndex((s) => s.slug === slug);
  const next = services[(idx + 1) % services.length];
  const prev = services[(idx - 1 + services.length) % services.length];

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-[#ab9aa1] transition-colors hover:text-[#ffb6c1]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All services
            </Link>
          </ScrollReveal>

          <div className="mt-10 grid items-end gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <ScrollReveal delay={0.1}>
                <p className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                  <Sparkles className="h-3 w-3" aria-hidden /> Method · {service.lasts}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2} duration={0.9}>
                <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl lg:text-[5.4rem]">
                  {service.name}.
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.35}>
                <p className="mt-6 max-w-xl text-lg italic text-[#ffb6c1] md:text-xl">
                  {service.tagline}
                </p>
              </ScrollReveal>
              <AccentLine className="mt-6 h-px w-32 bg-[#ffb6c1]" delay={0.5} duration={1.1} />
            </div>

            {service.heroPhoto && (
              <ClipReveal delay={0.4} duration={1.3} className="md:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  <Image
                    src={service.heroPhoto}
                    alt={`${service.name} — ${service.tagline}`}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </ClipReveal>
            )}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
              Before · After
            </p>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              The transformation
            </h2>
          </ScrollReveal>

          {service.beforeAfter?.real ? (
            <BeforeAfter
              before={service.beforeAfter.before}
              after={service.beforeAfter.after}
              alt={`${service.name} before and after`}
            />
          ) : (
            <BeforeAfterPlaceholder serviceName={service.name} />
          )}
        </div>
      </section>

      {/* ── DETAIL: 2-column ─────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-[#0a0807] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 md:grid-cols-12 md:gap-20">
            {/* LEFT: Long-form description */}
            <div className="md:col-span-7">
              <ScrollReveal>
                <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                  About the method
                </p>
                <h2 className="font-serif text-3xl leading-tight md:text-5xl">
                  How it works
                </h2>
                <p className="mt-6 text-base leading-relaxed text-[#c2b3b8] md:text-lg">
                  {service.longDescription ?? service.description}
                </p>
              </ScrollReveal>

              {/* Materials */}
              {service.materials && (
                <ScrollReveal className="mt-12">
                  <h3 className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                    Materials
                  </h3>
                  <ul className="mt-5 space-y-3 text-[#d8c8cd]">
                    {service.materials.map((m) => (
                      <li key={m} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-2 h-px w-4 flex-shrink-0 bg-[#ffb6c1]" aria-hidden />
                        {m}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}

              {/* What's included */}
              {service.whatsIncluded && (
                <ScrollReveal className="mt-12">
                  <h3 className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                    What&apos;s included
                  </h3>
                  <ul className="mt-5 space-y-3 text-[#d8c8cd]">
                    {service.whatsIncluded.map((m) => (
                      <li key={m} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-2 h-px w-4 flex-shrink-0 bg-[#ffb6c1]" aria-hidden />
                        {m}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}

              {/* Aftercare */}
              {service.aftercare && (
                <ScrollReveal className="mt-12">
                  <h3 className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                    Aftercare
                  </h3>
                  <ul className="mt-5 space-y-3 text-[#d8c8cd]">
                    {service.aftercare.map((m) => (
                      <li key={m} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-2 h-px w-4 flex-shrink-0 bg-[#ffb6c1]" aria-hidden />
                        {m}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}
            </div>

            {/* RIGHT: Sticky sidebar with key facts + price */}
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <ScrollReveal direction="left">
                  <div className="rounded-sm border border-white/10 p-7">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                      Investment
                    </p>
                    <ul className="mt-5 space-y-3 border-b border-white/10 pb-5">
                      {service.prices.map((p) => (
                        <li
                          key={p.label}
                          className="flex items-baseline justify-between gap-3"
                        >
                          <span className="text-sm text-[#b5a3a8]">{p.label}</span>
                          <span className="font-serif text-lg text-[#f6e9ec]">
                            {formatIDR(p.amountIDR)}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#ab9aa1]">
                      {service.unit}
                      {service.minPurchase ? ` · ${service.minPurchase}` : ""}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#ab9aa1]">
                      Wavy stock · straight &amp; curly +200,000 IDR/100 g
                    </p>

                    {service.promoBundles && (
                      <div className="mt-6 border-t border-white/10 pt-5">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                          Bundle promo
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {service.promoBundles.map((p) => (
                            <li
                              key={p.label}
                              className="flex items-baseline justify-between gap-3"
                            >
                              <span className="text-sm text-[#b5a3a8]">{p.label}</span>
                              <span className="font-serif text-base text-[#f6e9ec]">
                                {formatIDR(p.amountIDR)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.premiumLengths && (
                      <div className="mt-6 border-t border-white/10 pt-5">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                          Premium · by length
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {service.premiumLengths.map((p) => (
                            <li
                              key={p.label}
                              className="flex items-baseline justify-between gap-3"
                            >
                              <span className="text-sm text-[#b5a3a8]">{p.label}</span>
                              <span className="font-serif text-base text-[#f6e9ec]">
                                {formatIDR(p.amountIDR)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#ab9aa1]">
                          No discount on premium lengths
                        </p>
                      </div>
                    )}

                    <dl className="mt-7 space-y-5 border-t border-white/10 pt-5 text-sm">
                      <div>
                        <dt className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                          <Clock className="h-3 w-3" aria-hidden /> Duration
                        </dt>
                        <dd className="mt-1.5 text-[#f6e9ec]">{service.durationLabel}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                          Lasts
                        </dt>
                        <dd className="mt-1.5 text-[#f6e9ec]">{service.lasts}</dd>
                      </div>
                      {service.serviceInterval && (
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                            Come back
                          </dt>
                          <dd className="mt-1.5 text-[#f6e9ec]">{service.serviceInterval}</dd>
                        </div>
                      )}
                      {service.reusable && (
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                            Hair reusable for
                          </dt>
                          <dd className="mt-1.5 text-[#f6e9ec]">{service.reusable}</dd>
                        </div>
                      )}
                    </dl>

                    <Link
                      href={`/book?service=${service.slug}`}
                      className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#ffb6c1] px-6 py-3.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#ffc9d2]"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      Book this service
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </ScrollReveal>

                {/* Maintenance / service menu */}
                {service.maintenance && (
                  <ScrollReveal direction="left" delay={0.05}>
                    <div className="mt-6 rounded-sm border border-white/10 p-7">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                        Maintenance service
                      </p>
                      {service.maintenance.rows.some((r) => r.outside) && (
                        <div className="mt-4 flex items-baseline justify-end gap-6 text-[9px] uppercase tracking-[0.18em] text-[#ab9aa1]">
                          <span>Our hair</span>
                          <span>Outside hair</span>
                        </div>
                      )}
                      <ul className="mt-3 space-y-2.5">
                        {service.maintenance.rows.map((r) => (
                          <li
                            key={r.label}
                            className="flex items-baseline justify-between gap-3 text-sm"
                          >
                            <span className="flex-1 text-[#b5a3a8]">{r.label}</span>
                            <span className="font-serif text-[#f6e9ec]">{r.ours}</span>
                            {r.outside && (
                              <span className="w-20 text-right font-serif text-[#d8c8cd]">
                                {r.outside}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                      {service.maintenance.notes && (
                        <ul className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
                          {service.maintenance.notes.map((n) => (
                            <li key={n} className="text-xs leading-relaxed text-[#ab9aa1]">
                              {n}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </ScrollReveal>
                )}

                {/* Will it work on my hair? — the first question every client asks */}
                {service.suitability && (
                  <ScrollReveal direction="left" delay={0.08}>
                    <div className="mt-6 rounded-sm border border-white/10 p-7">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                        Will it work on my hair?
                      </p>
                      <ul className="mt-5 space-y-3 text-sm">
                        {(
                          [
                            ["Very short hair", service.suitability.veryShort],
                            ["Shoulder-length hair", service.suitability.shoulder],
                            ["Long hair", service.suitability.long],
                            ["Fine / thin hair", service.suitability.thin],
                          ] as const
                        ).map(([label, ok]) => (
                          <li key={label} className="flex items-center justify-between gap-3">
                            <span className={ok ? "text-[#d8c8cd]" : "text-[#7d6d72]"}>{label}</span>
                            {ok ? (
                              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#ffb6c1]">
                                <Check className="h-3.5 w-3.5" aria-hidden />
                                Yes
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#7d6d72]">
                                <X className="h-3.5 w-3.5" aria-hidden />
                                No
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                )}

                {/* Tips card */}
                {service.idealHairType && (
                  <ScrollReveal direction="left" delay={0.1}>
                    <div className="mt-6 rounded-sm border border-white/10 p-7">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                        Ideal hair type
                      </p>
                      <ul className="mt-5 space-y-3 text-sm text-[#d8c8cd]">
                        {service.idealHairType.map((m) => (
                          <li key={m} className="flex gap-3 leading-relaxed">
                            <span className="mt-2 h-px w-4 flex-shrink-0 bg-[#ffb6c1]" aria-hidden />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                )}

                {/* Best for */}
                {service.bestFor && (
                  <ScrollReveal direction="left" delay={0.15}>
                    <div className="mt-6 rounded-sm border border-white/10 p-7">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                        Best for
                      </p>
                      <ul className="mt-5 space-y-3 text-sm text-[#d8c8cd]">
                        {service.bestFor.map((m) => (
                          <li key={m} className="flex gap-3 leading-relaxed">
                            <span className="mt-2 h-px w-4 flex-shrink-0 bg-[#ffb6c1]" aria-hidden />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREV / NEXT ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href={`/products/${prev.slug}`}
              className="group flex items-center gap-4 rounded-sm border border-white/10 p-6 transition-all hover:border-[#ffb6c1]/40 md:p-8"
            >
              <ArrowLeft className="h-4 w-4 flex-shrink-0 text-[#ab9aa1] transition-colors group-hover:text-[#ffb6c1]" aria-hidden />
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                  Previous
                </span>
                <h3 className="mt-1 font-serif text-2xl text-[#f6e9ec] group-hover:text-[#ffb6c1]">
                  {prev.name}
                </h3>
              </div>
            </Link>
            <Link
              href={`/products/${next.slug}`}
              className="group flex items-center justify-end gap-4 rounded-sm border border-white/10 p-6 text-right transition-all hover:border-[#ffb6c1]/40 md:p-8"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                  Next
                </span>
                <h3 className="mt-1 font-serif text-2xl text-[#f6e9ec] group-hover:text-[#ffb6c1]">
                  {next.name}
                </h3>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#ab9aa1] transition-colors group-hover:text-[#ffb6c1]" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
