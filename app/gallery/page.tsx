"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { InstagramIcon as Instagram } from "@/components/icons";
import { ScrollReveal, ScrollStagger } from "@/components/animations-gsap";
import { brand, gallery, type GalleryItem } from "@/lib/content";

const filters = [
  { value: "all", label: "All work" },
  { value: "before-after", label: "Before & After" },
  { value: "products", label: "Products & color" },
  { value: "studio", label: "Studio" },
] as const;

type Filter = (typeof filters)[number]["value"];

// Approx aspect-ratio dimensions used by next/image to reserve layout
// space before the real image loads. CSS keeps `height:auto`, so the
// rendered image always falls back to the photo's natural ratio — no
// cropping, no letterboxing. These numbers only affect pre-load CLS.
const aspectDims: Record<NonNullable<GalleryItem["aspect"]>, [number, number]> = {
  wide:   [1600, 1067], // 3:2 landscape
  tall:   [800, 1200],  // 2:3 portrait
  square: [1000, 1000],
};

export default function GalleryPage() {
  const [active, setActive] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? gallery
        : gallery.filter((g) => g.category === active),
    [active]
  );

  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="max-w-3xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
              Gallery
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl lg:text-[5.4rem]">
              A look inside{" "}
              <span className="font-script italic text-[#ffb6c1]">the studio</span>.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#c2b3b8]">
              Recent work, the colour wall, methods up close, and the studio
              itself. New images added regularly — follow along on Instagram for
              behind-the-scenes.
            </p>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#ffb6c1]/40 px-5 py-2.5 text-sm text-[#ffb6c1] transition-all hover:bg-[#ffb6c1] hover:text-[#0e0b09]"
            >
              <Instagram className="h-4 w-4" aria-hidden /> @{brand.instagram}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="pt-12 pb-6">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
            {filters.map((f) => {
              const isActive = active === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActive(f.value)}
                  className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "bg-[#ffb6c1] text-[#0e0b09]"
                      : "border border-white/10 text-[#d8c8cd] hover:border-[#ffb6c1]/40 hover:text-[#ffb6c1]"
                  }`}
                  aria-pressed={isActive}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid — CSS columns masonry, photos shown whole at natural aspect */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollStagger
            className="columns-1 gap-3 sm:columns-2 md:gap-4 lg:columns-3 xl:columns-4"
            selector=":scope > figure"
            stagger={0.05}
            distance={14}
          >
            {filtered.map((item, i) => {
              const [w, h] = aspectDims[item.aspect ?? "square"];
              return (
                <figure
                  key={`${item.src}-${i}`}
                  className="group relative mb-3 break-inside-avoid overflow-hidden rounded-sm bg-[#0a0807] md:mb-4"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={w}
                    height={h}
                    className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a0807]/85 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#ffb6c1]">
                      {item.category}
                    </span>
                    <p className="mt-1 text-sm text-[#f6e9ec]">{item.alt}</p>
                  </figcaption>
                </figure>
              );
            })}
          </ScrollStagger>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-sm text-[#ab9aa1]">
              No items in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
