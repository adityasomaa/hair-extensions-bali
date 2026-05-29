import Link from "next/link";
import { brand } from "@/lib/content";

/**
 * Drop-in stand-in for the real <BeforeAfter /> slider used on service
 * pages where we don't yet have a real client before/after pair.
 *
 * Matches the slider's aspect ratio + border treatment so swapping to
 * real photos later won't cause layout shift. Brand-mark centred,
 * "coming soon" copy, with an Instagram link for latest results.
 */
export default function BeforeAfterPlaceholder({
  serviceName,
}: {
  serviceName: string;
}) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-white/10">
      {/* Soft warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] via-[#0e0b09] to-[#0a0807]" />

      {/* Subtle pink glow centre */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,182,193,0.10),transparent_60%)]" />

      {/* Decorative bracket corners */}
      <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-[#ffb6c1]/40" />
      <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r border-t border-[#ffb6c1]/40" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b border-l border-[#ffb6c1]/40" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b border-r border-[#ffb6c1]/40" />

      {/* Top label */}
      <span className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-[10px] uppercase tracking-[0.32em] text-[#ffb6c1]">
        Before · After
      </span>

      {/* Centre stack */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="flex flex-col items-center">
          <span className="font-script text-3xl text-[#ffb6c1] -mb-1 md:text-4xl">
            The
          </span>
          <span className="font-serif text-sm tracking-[0.32em] uppercase text-[#f6e9ec] md:text-base">
            Hair Extensions
          </span>
          <span className="font-script text-2xl text-[#ffb6c1] -mt-1 md:text-3xl">
            Bali
          </span>
        </div>

        <div className="my-6 h-px w-16 bg-[#ffb6c1]" />

        <p className="text-sm italic leading-relaxed text-[#c2b3b8] md:text-base">
          {`${serviceName} before & after photos`}
          <br />
          coming soon
        </p>

        <Link
          href={brand.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 text-[10px] uppercase tracking-[0.28em] text-[#ab9aa1] transition-colors hover:text-[#ffb6c1] md:text-xs"
        >
          See latest @{brand.instagram} →
        </Link>
      </div>
    </div>
  );
}
