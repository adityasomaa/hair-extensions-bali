import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { ScrollReveal, ScrollStagger, AccentLine } from "@/components/animations-gsap";
import { brand } from "@/lib/content";
import { blogPosts } from "@/lib/blog-posts";

export const metadata = {
  title: `Journal — ${brand.name}`,
  description:
    "Long-form guides on hair extensions in Bali — pricing, hair grades, methods comparison. Honest advice from Bali's largest hair extension shop.",
};

export default function BlogIndexPage() {
  // Newest first
  const posts = [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );

  return (
    <main className="pb-24 md:pb-32">
      {/* Header */}
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
              Journal
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
              Honest{" "}
              <span className="font-script italic text-[#ffb6c1]">advice</span>{" "}
              on hair extensions in Bali.
            </h1>
            <AccentLine className="mt-8 h-px w-32 bg-[#ffb6c1]" delay={0.2} duration={1.1} />
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#c2b3b8] md:text-xl">
              Long-form guides written from a decade of pinning, blending, and
              maintaining extensions in the heart of Kerobokan. No upsell.
              No fluff. Just what we'd tell a friend asking.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts grid */}
      <section className="mt-20 md:mt-28">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollStagger
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.1}
            distance={20}
          >
            {posts.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0e0b09] transition-all hover:-translate-y-1 hover:border-[#ffb6c1]/40"
              >
                {p.heroPhoto && (
                  <Link
                    href={`/blog/${p.slug}`}
                    className="relative block aspect-[4/3] overflow-hidden"
                    aria-label={p.title}
                  >
                    <Image
                      src={p.heroPhoto}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </Link>
                )}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                    <time dateTime={p.publishedAt}>
                      {new Date(p.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="inline-flex items-center gap-1.5 text-[#ab9aa1]">
                      <Clock className="h-3 w-3" aria-hidden /> {p.readingMinutes} min
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl leading-tight text-[#f6e9ec] md:text-3xl">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="transition-colors hover:text-[#ffb6c1]"
                    >
                      {p.title}
                    </Link>
                  </h2>
                  {p.subtitle && (
                    <p className="mt-3 text-sm italic text-[#ffb6c1]">
                      {p.subtitle}
                    </p>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-[#b5a3a8] line-clamp-3">
                    {p.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-[#ffb6c1] underline-offset-8 transition-all hover:underline"
                    >
                      Read full article
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </ScrollStagger>
        </div>
      </section>
    </main>
  );
}
