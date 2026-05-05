import Image from "next/image";
import { Suspense } from "react";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon as Instagram } from "@/components/icons";
import { ScrollReveal } from "@/components/animations-gsap";
import BookingForm from "@/components/BookingForm";
import { brand, services } from "@/lib/content";

export const metadata = {
  title: `Book — ${brand.name}`,
  description:
    "Send us your details, and we'll continue the conversation on WhatsApp. We respond within an hour during studio hours.",
};

export default function BookPage() {
  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal className="max-w-3xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
              Book an appointment
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl lg:text-[5.4rem]">
              Tell us about{" "}
              <span className="font-script italic text-[#c9a87c]">your hair</span>.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#c2b8a8]">
              Fill in a few details below. When you submit, we&apos;ll open
              WhatsApp with your message pre-filled — just hit send to start
              the conversation. No accounts, no forms-to-nowhere.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:gap-16">
          {/* FORM */}
          <ScrollReveal className="md:col-span-7">
            <div className="rounded-sm border border-white/10 bg-[#0a0807] p-6 md:p-10">
              <Suspense fallback={<FormSkeleton />}>
                <BookingForm services={services} />
              </Suspense>
            </div>
          </ScrollReveal>

          {/* SIDEBAR — Visit info */}
          <ScrollReveal direction="left" className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <div className="rounded-sm border border-white/10 p-7">
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#c9a87c]">
                  Visit the studio
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#c2b8a8]">
                  Tucked into Kerobokan, ten minutes from Seminyak. Walk-ins
                  welcome by appointment only.
                </p>

                <div className="mt-7 space-y-5 border-t border-white/10 pt-6 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8a7a66]">
                        Address
                      </span>
                      <a
                        href={brand.mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block leading-relaxed text-[#f6efe6] transition-colors hover:text-[#c9a87c]"
                      >
                        {brand.address}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8a7a66]">
                        Hours
                      </span>
                      <p className="mt-1 text-[#f6efe6]">{brand.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8a7a66]">
                        WhatsApp
                      </span>
                      <a
                        href={brand.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-[#f6efe6] transition-colors hover:text-[#c9a87c]"
                      >
                        {brand.whatsappDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Instagram className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a87c]" aria-hidden />
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.22em] text-[#8a7a66]">
                        Instagram
                      </span>
                      <a
                        href={brand.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-[#f6efe6] transition-colors hover:text-[#c9a87c]"
                      >
                        @{brand.instagram}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src="/photos/salon-2.jpg"
                    alt="The Hair Extensions Bali studio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <a
                    href={brand.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 rounded-full bg-[#0e0b09]/85 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#c9a87c] backdrop-blur-md transition-colors hover:bg-[#0e0b09]"
                  >
                    Open in Maps ↗
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-sm border border-[#c9a87c]/30 bg-[#c9a87c]/5 p-6 text-sm">
                <p className="text-[#c9a87c]">⏱ Reply within ~1 hour</p>
                <p className="mt-2 text-[#b5a896]">
                  We respond on WhatsApp during studio hours
                  (Mon – Sun 09:00 – 19:00 WITA). Outside those hours, we&apos;ll
                  message you back first thing the next morning.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 animate-pulse rounded-sm bg-white/5" />
      ))}
    </div>
  );
}
