import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import {
  ScrollReveal,
  ClipReveal,
  AccentLine,
} from "@/components/animations-gsap";
import FaqList from "@/components/FaqList";
import { brand, services, serviceBySlug } from "@/lib/content";
import { blogPosts, postBySlug, type BlogSection } from "@/lib/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return { title: `Not found — ${brand.name}` };
  return {
    title: `${post.title} — ${brand.name}`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.heroPhoto ? [post.heroPhoto] : undefined,
    },
  };
}

function renderSection(s: BlogSection, i: number) {
  switch (s.kind) {
    case "heading":
      return s.level === 2 ? (
        <h2
          key={i}
          className="mt-12 font-serif text-2xl leading-tight text-[#f6e9ec] md:mt-16 md:text-3xl lg:text-4xl"
        >
          {s.text}
        </h2>
      ) : (
        <h3
          key={i}
          className="mt-8 font-serif text-xl text-[#ffb6c1] md:mt-10 md:text-2xl"
        >
          {s.text}
        </h3>
      );
    case "paragraph":
      return (
        <p
          key={i}
          className="mt-5 text-base leading-relaxed text-[#c2b3b8] md:text-lg md:leading-[1.7]"
        >
          {s.text}
        </p>
      );
    case "list":
      return s.ordered ? (
        <ol
          key={i}
          className="mt-5 space-y-3 pl-6 [counter-reset:list-item] md:text-lg"
        >
          {s.items.map((item, j) => (
            <li
              key={j}
              className="relative pl-2 leading-relaxed text-[#c2b3b8] md:leading-[1.7] marker:text-[#ffb6c1]"
            >
              {item}
            </li>
          ))}
        </ol>
      ) : (
        <ul key={i} className="mt-5 space-y-3 md:text-lg">
          {s.items.map((item, j) => (
            <li
              key={j}
              className="flex gap-4 leading-relaxed text-[#c2b3b8] md:leading-[1.7]"
            >
              <span
                className="mt-3 inline-block h-px w-4 flex-shrink-0 bg-[#ffb6c1]"
                aria-hidden
              />
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div
          key={i}
          className="mt-8 overflow-x-auto rounded-sm border border-white/10"
        >
          <table className="w-full text-sm md:text-base">
            <thead className="bg-[#ffb6c1]/[0.06]">
              <tr>
                {s.headers.map((h, j) => (
                  <th
                    key={j}
                    className="border-b border-white/10 px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[0.18em] text-[#ffb6c1] md:px-5 md:py-4 md:text-[11px]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row, j) => (
                <tr
                  key={j}
                  className="border-b border-white/5 last:border-b-0"
                >
                  {row.map((cell, k) => (
                    <td
                      key={k}
                      className="px-4 py-3 align-top leading-relaxed text-[#c2b3b8] first:font-medium first:text-[#f6e9ec] md:px-5 md:py-4"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-8 border-l-2 border-[#ffb6c1] pl-6 font-serif text-xl italic leading-relaxed text-[#f6e9ec] md:mt-10 md:text-2xl"
        >
          &ldquo;{s.text}&rdquo;
          {s.cite && (
            <cite className="mt-2 block text-sm not-italic text-[#ab9aa1]">
              — {s.cite}
            </cite>
          )}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  // Article JSON-LD — helps Google + AI quote our content with attribution
  const siteUrl = "https://thehairextensionsbali.com";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.heroPhoto ? `${siteUrl}${post.heroPhoto}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: brand.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  const faqJsonLd = post.faq && post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const relatedServices = (post.relatedServices ?? [])
    .map((slug) => serviceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  // Suggest two other posts
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <article className="pb-24 md:pb-32">
        {/* Header */}
        <section className="pt-32 md:pt-40">
          <div className="mx-auto max-w-3xl px-6">
            <ScrollReveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-[#ab9aa1] transition-colors hover:text-[#ffb6c1]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden /> All articles
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3 w-3" aria-hidden /> {post.readingMinutes} min read
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="mt-5 font-serif text-3xl leading-[1.1] md:text-5xl lg:text-[3.5rem]">
                {post.title}
              </h1>
            </ScrollReveal>

            {post.subtitle && (
              <ScrollReveal delay={0.3}>
                <p className="mt-5 font-serif text-lg italic text-[#ffb6c1] md:text-xl">
                  {post.subtitle}
                </p>
              </ScrollReveal>
            )}

            <AccentLine className="mt-7 h-px w-24 bg-[#ffb6c1]" delay={0.4} duration={1} />
          </div>
        </section>

        {/* Hero image */}
        {post.heroPhoto && (
          <ClipReveal delay={0.4} duration={1.2}>
            <div className="mx-auto mt-12 max-w-5xl px-6 md:mt-16">
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                <Image
                  src={post.heroPhoto}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            </div>
          </ClipReveal>
        )}

        {/* Body */}
        <section className="mt-12 md:mt-16">
          <div className="mx-auto max-w-3xl px-6">
            <ScrollReveal>
              <p className="font-serif text-xl leading-relaxed text-[#f6e9ec] md:text-2xl md:leading-[1.55]">
                {post.intro}
              </p>
            </ScrollReveal>

            <div className="mt-2">
              {post.sections.map((s, i) => renderSection(s, i))}
            </div>

            {/* In-article CTA */}
            <ScrollReveal>
              <aside className="mt-16 rounded-sm border border-[#ffb6c1]/30 bg-[#ffb6c1]/[0.06] p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                  Talk to us
                </p>
                <p className="mt-3 font-serif text-xl leading-tight text-[#f6e9ec] md:text-2xl">
                  Want a personalised recommendation?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#c2b3b8] md:text-base">
                  Send a photo of your natural hair on WhatsApp. We'll
                  honestly tell you which method (or grade) gets you the
                  result you want — including if the honest answer is
                  &ldquo;you don't need extensions, your hair already
                  looks great.&rdquo;
                </p>
                <a
                  href={brand.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ffb6c1] px-5 py-2.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#ffc9d2]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp us
                </a>
              </aside>
            </ScrollReveal>

            {/* FAQ */}
            {post.faq && post.faq.length > 0 && (
              <section className="mt-16 md:mt-20">
                <ScrollReveal>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                    Frequently asked
                  </p>
                  <h2 className="mt-3 font-serif text-2xl leading-tight md:text-3xl">
                    Quick questions on this topic
                  </h2>
                </ScrollReveal>
                <div className="mt-8">
                  <FaqList items={post.faq} />
                </div>
              </section>
            )}

            {/* Related services */}
            {relatedServices.length > 0 && (
              <section className="mt-16 md:mt-20">
                <ScrollReveal>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                    Related services
                  </p>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {relatedServices.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/products/${s.slug}`}
                        className="group rounded-sm border border-white/10 p-5 transition-colors hover:border-[#ffb6c1]/40"
                      >
                        <p className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                          {s.lasts}
                        </p>
                        <h3 className="mt-2 font-serif text-xl text-[#f6e9ec] group-hover:text-[#ffb6c1] md:text-2xl">
                          {s.name}
                        </h3>
                        <p className="mt-2 text-sm italic text-[#ffb6c1]">
                          {s.tagline}
                        </p>
                      </Link>
                    ))}
                  </div>
                </ScrollReveal>
              </section>
            )}
          </div>
        </section>

        {/* More articles */}
        {otherPosts.length > 0 && (
          <section className="mt-20 border-t border-white/10 pt-16 md:mt-28 md:pt-20">
            <div className="mx-auto max-w-7xl px-6">
              <ScrollReveal>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
                  More from the journal
                </p>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {otherPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group flex gap-5 rounded-sm border border-white/10 p-5 transition-all hover:border-[#ffb6c1]/40"
                    >
                      {p.heroPhoto && (
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm md:h-32 md:w-32">
                          <Image
                            src={p.heroPhoto}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-base leading-tight text-[#f6e9ec] group-hover:text-[#ffb6c1] md:text-lg">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-[#b5a3a8] line-clamp-2 md:text-sm">
                          {p.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
