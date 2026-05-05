import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { ScrollReveal, ScrollStagger, ClipReveal } from "@/components/animations-gsap";
import { brand, tips } from "@/lib/content";

export const metadata = {
  title: `Tips & Care — ${brand.name}`,
  description:
    "Hair-extension aftercare, method choices, travel, and maintenance — practical guides from the team at The Hair Extensions Bali.",
};

const tagAccent: Record<string, string> = {
  Aftercare: "text-[#c9a87c]",
  Choosing: "text-[#d8b889]",
  Lifestyle: "text-[#b58d5a]",
  Maintenance: "text-[#c2a07a]",
};

export default function TipsPage() {
  const featured = tips.find((t) => t.featured);
  const others = tips.filter((t) => !t.featured);

  return (
    <>
      {/* Page intro */}
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="max-w-3xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
              Tips & care guides
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl lg:text-[5.4rem]">
              Practical guides from{" "}
              <span className="font-script italic text-[#c9a87c]">the studio</span>.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#c2b8a8]">
              Aftercare. Method choices. Travel and maintenance. Everything we tell
              clients in person, written down so you can come back to it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured tip */}
      {featured && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href={`#${featured.slug}`}
              className="group block"
            >
              <article className="grid gap-10 md:grid-cols-12 md:gap-16 md:items-center">
                {featured.photo && (
                  <ClipReveal className="md:col-span-7">
                    <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
                      <Image
                        src={featured.photo}
                        alt={featured.title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                  </ClipReveal>
                )}

                <ScrollReveal direction="left" className="md:col-span-5">
                  <p
                    className={`mb-3 text-[11px] uppercase tracking-[0.28em] ${
                      tagAccent[featured.tag]
                    }`}
                  >
                    Featured · {featured.tag}
                  </p>
                  <h2 className="font-serif text-3xl leading-tight md:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-[#c2b8a8]">
                    {featured.excerpt}
                  </p>
                  <div className="mt-7 flex items-center gap-5 text-sm">
                    {featured.readingMinutes && (
                      <span className="inline-flex items-center gap-1.5 text-[#a8957d]">
                        <Clock className="h-3.5 w-3.5" aria-hidden /> {featured.readingMinutes} min read
                      </span>
                    )}
                    <span className="inline-flex items-center gap-2 text-[#c9a87c] underline-offset-4 group-hover:underline">
                      Read the guide
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </ScrollReveal>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Grid of other tips */}
      <section className="border-t border-white/5 bg-[#0a0807] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="mb-12 max-w-2xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
              Quick guides
            </p>
            <h2 className="font-serif text-3xl leading-tight md:text-5xl">
              Bookmark these for later.
            </h2>
          </ScrollReveal>

          <ScrollStagger
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
            distance={20}
          >
            {others.map((tip) => (
              <Link
                key={tip.slug}
                href={`#${tip.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0e0b09] transition-all hover:-translate-y-1 hover:border-[#c9a87c]/40"
              >
                {tip.photo && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={tip.photo}
                      alt={tip.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <p
                    className={`text-[10px] uppercase tracking-[0.22em] ${
                      tagAccent[tip.tag]
                    }`}
                  >
                    {tip.tag}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-[#f6efe6]">
                    {tip.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#b5a896]">
                    {tip.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className="inline-flex items-center gap-1.5 text-[#a8957d]">
                      <Clock className="h-3 w-3" aria-hidden /> {tip.readingMinutes ?? 2} min
                    </span>
                    <ArrowRight
                      className="h-3.5 w-3.5 text-[#a8957d] transition-all group-hover:translate-x-1 group-hover:text-[#c9a87c]"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* Article bodies — anchor-linked from cards */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          {tips.map((tip) => (
            <article
              key={tip.slug}
              id={tip.slug}
              className="border-t border-white/10 py-16 first:border-t-0 first:pt-0 md:py-20 md:scroll-mt-32"
            >
              <ScrollReveal>
                <p
                  className={`mb-4 text-[11px] uppercase tracking-[0.28em] ${
                    tagAccent[tip.tag]
                  }`}
                >
                  {tip.tag}
                </p>
                <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                  {tip.title}
                </h2>
                {tip.readingMinutes && (
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#a8957d]">
                    <Clock className="h-3 w-3" aria-hidden /> {tip.readingMinutes} min read
                  </p>
                )}
              </ScrollReveal>

              <ScrollStagger className="mt-10 space-y-6 text-base leading-relaxed text-[#c2b8a8] md:text-lg" stagger={0.06} distance={12}>
                {tip.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </ScrollStagger>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
