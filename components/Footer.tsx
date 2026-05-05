import Link from "next/link";
import { MapPin, MessageCircle, Clock } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons";
import { brand } from "@/lib/content";

const groups = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/products", label: "Products" },
      { href: "/tips", label: "Tips" },
      { href: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/products/keratin-bond", label: "Keratin Bond" },
      { href: "/products/nano-ring", label: "Nano Ring" },
      { href: "/products/micro-ring", label: "Micro Ring" },
      { href: "/products/weft", label: "Weft (Sew-In)" },
      { href: "/products/tape-in", label: "Tape-In" },
      { href: "/products/clip-in", label: "Clip-In" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0807]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex flex-col leading-none">
              <span className="font-script text-3xl text-[#c9a87c] -mb-1">The</span>
              <span className="font-serif text-lg tracking-[0.32em] uppercase text-[#f6efe6]">
                Hair Extensions
              </span>
              <span className="self-end font-script text-2xl text-[#c9a87c] -mt-1">
                Bali
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#b5a896]">
              Premium hair extensions, expertly applied in the heart of Bali.
              International-quality hair, six methods, family feeling.
            </p>

            <div className="mt-8 space-y-3 text-sm">
              <a
                href={brand.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-[#b5a896] hover:text-[#c9a87c]"
              >
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                <span>{brand.address}</span>
              </a>
              <a
                href={brand.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[#b5a896] hover:text-[#c9a87c]"
              >
                <MessageCircle className="h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                <span>{brand.whatsappDisplay}</span>
              </a>
              <a
                href={brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[#b5a896] hover:text-[#c9a87c]"
              >
                <Instagram className="h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                <span>@{brand.instagram}</span>
              </a>
              <div className="flex items-center gap-3 text-[#b5a896]">
                <Clock className="h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                <span>{brand.hours}</span>
              </div>
            </div>
          </div>

          {/* Link groups */}
          {groups.map((g) => (
            <div key={g.title} className="md:col-span-3">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a87c]">
                {g.title}
              </p>
              <ul className="mt-5 space-y-3 text-sm">
                {g.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#d8cdbd] transition-colors hover:text-[#c9a87c]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Book CTA */}
          <div className="md:col-span-1 md:flex md:flex-col md:items-end md:justify-end">
            <Link
              href="/book"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a87c] px-6 py-3.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#d8b889] md:w-auto"
            >
              Book →
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-8 text-xs text-[#a8957d] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p className="italic">By appointment only · Kerobokan, Bali</p>
        </div>
      </div>
    </footer>
  );
}
