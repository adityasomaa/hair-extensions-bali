"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { brand } from "@/lib/content";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/blog", label: "Journal" },
  { href: "/tips", label: "Tips" },
  { href: "/gallery", label: "Gallery" },
  { href: "/book", label: "Book" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide nav when scrolling, show backdrop after scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#0e0b09]/90 backdrop-blur-md"
            : "border-b border-white/[0.04] bg-[#0e0b09]/55 backdrop-blur-sm"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:py-5">
          <Link href="/" className="inline-flex flex-col leading-none" aria-label="Home">
            <span className="font-script text-2xl text-[#ffb6c1] -mb-1">The</span>
            <span className="font-serif font-medium text-base tracking-[0.28em] uppercase text-[#f6e9ec]">
              Hair Extensions
            </span>
            <span className="self-end font-script text-xl text-[#ffb6c1] -mt-1">
              Bali
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#ffb6c1] ${
                  isActive(link.href)
                    ? "text-[#ffb6c1]"
                    : "text-[#f6e9ec]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#ffb6c1] px-5 py-2.5 text-sm font-medium text-[#0e0b09] transition-all hover:bg-[#ffc9d2]"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden /> WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#f6e9ec] transition-colors hover:border-[#ffb6c1] hover:text-[#ffb6c1] md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-30 bg-[#0e0b09] transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 pt-28 pb-12">
          <ul className="flex flex-col gap-2">
            {links.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block border-b border-white/10 py-5 font-serif text-3xl transition-colors ${
                    isActive(link.href) ? "text-[#ffb6c1]" : "text-[#f6e9ec]"
                  } hover:text-[#ffb6c1]`}
                  style={{
                    transitionDelay: open ? `${100 + i * 50}ms` : "0ms",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <a
              href={brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#ffb6c1] px-6 py-4 text-base font-medium text-[#0e0b09]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Book on WhatsApp · {brand.whatsappDisplay}
            </a>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.22em] text-[#ab9aa1]">
              By appointment · Kerobokan, Bali
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
