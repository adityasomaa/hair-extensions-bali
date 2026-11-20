"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, MessageCircle } from "lucide-react";

/**
 * "Book a consultation" link for the footer. On /book itself a link to /book does
 * nothing, so there it scrolls up to the booking form instead.
 */
export default function BookCta({ className }: { className: string }) {
  const onBookPage = usePathname() === "/book";
  return (
    <Link
      href="/book"
      onClick={(e) => {
        if (!onBookPage) return;
        e.preventDefault();
        document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className={className}
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      Book a consultation
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </Link>
  );
}
