import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ScrollReveal, ScrollStagger } from "@/components/animations-gsap";
import { brand, services, formatIDR } from "@/lib/content";

export const metadata = {
  title: `Services & Pricing — ${brand.name}`,
  description:
    "Six expert hair-extension methods, all with 100% real human hair. Keratin Bond, Nano Ring, Weft, Tape-In, Halo Hair, Clip-In.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="max-w-3xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
              Services & investment
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl lg:text-[5.4rem]">
              Six methods, one obsession with the{" "}
              <span className="font-script italic text-[#ffb6c1]">natural</span> finish.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#c2b3b8]">
              Every method below uses 100% real human hair. We match the technique
              to your hair type, lifestyle, and goals. Tap any card for the full
              breakdown — materials, what&apos;s included, ideal hair type, aftercare,
              and pricing.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollStagger
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
            distance={24}
          >
            {services.map((s, idx) => (
              <Link
                key={s.slug}
                href={`/products/${s.slug}`}
                className="group flex h-full flex-col rounded-sm border border-white/10 bg-[#0e0b09] p-7 transition-all hover:-translate-y-1 hover:border-[#ffb6c1]/40"
              >
                <div className="mb-5 flex items-baseline justify-between border-b border-white/10 pb-5">
                  <span className="font-serif text-xs italic text-[#ffb6c1]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                    {s.lasts}
                  </span>
                </div>

                <h2 className="font-serif text-2xl text-[#f6e9ec] md:text-3xl">{s.name}</h2>
                <p className="mt-2 text-sm italic text-[#ffb6c1]">{s.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-[#b5a3a8]">
                  {s.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5 text-xs">
                  {s.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-full border border-white/10 px-3 py-1 text-[#d8c8cd]"
                    >
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <div className="flex items-baseline justify-between gap-3 border-t border-white/10 pt-5">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#ab9aa1]">
                      Starting from
                    </span>
                    <span className="font-serif text-xl text-[#f6e9ec]">
                      {formatIDR(s.prices[0]?.amountIDR ?? 0)}
                    </span>
                  </div>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#ab9aa1]">
                    {s.unit}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-[#ffb6c1] underline-offset-4 group-hover:underline">
                    See full detail
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            ))}
          </ScrollStagger>

          <ScrollReveal className="mt-16 rounded-sm border border-white/10 bg-[#0a0807] p-10 text-center md:p-14">
            <h3 className="font-serif text-3xl text-[#f6e9ec] md:text-4xl">
              Not sure which method fits you?
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-sm text-[#b5a3a8] md:text-base">
              Send us a photo of your natural hair on WhatsApp. We&apos;ll
              recommend the perfect method, colour match, and gram amount —
              completely free.
            </p>
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ffb6c1] px-7 py-3.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#ffc9d2]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Get a free recommendation
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
