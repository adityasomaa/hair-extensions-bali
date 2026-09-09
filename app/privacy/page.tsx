import Link from "next/link";
import { ScrollReveal } from "@/components/animations-gsap";
import { brand } from "@/lib/content";

export const metadata = {
  title: `Privacy Policy — ${brand.name}`,
  description:
    "How The Hair Extensions Bali collects, uses, and protects the personal information of clients and website visitors.",
};

const UPDATED = "9 September 2026";

const sections = [
  {
    h: "Who we are",
    p: [
      `${brand.name} is a hair extension studio and supplier at ${brand.address}. We sell and install real human hair extensions. We do not offer cuts, colour, or general styling.`,
      `This policy covers ${brand.name}, our website at thehairextensionsbali.com, and the bookings we take by WhatsApp, phone, and Instagram.`,
    ],
  },
  {
    h: "What we collect",
    p: [
      "We only collect what we need to answer an enquiry and carry out an appointment. In practice that is:",
    ],
    ul: [
      "Your name and the phone number or Instagram handle you contact us from.",
      "What you tell us about your hair when asking for a quote — length, colour, texture, and any photos you choose to send.",
      "Your appointment date and the method and weight you booked.",
      "Before and after photos taken in the studio, only when you agree to them.",
      "Standard website analytics: pages viewed, approximate region, and the type of device used.",
    ],
    after: [
      "We do not ask for identity documents, and we do not store card numbers. Payment is settled in the studio through our payment provider, who handles the card details directly.",
    ],
  },
  {
    h: "Why we use it",
    ul: [
      "To reply to your enquiry and give you an accurate quote.",
      "To book, prepare, and carry out your appointment.",
      "To match hair colour and texture correctly before you arrive.",
      "To send aftercare reminders and maintenance follow-ups about your own installation.",
      "To understand which pages of the site are useful, so we can improve them.",
    ],
  },
  {
    h: "Photographs",
    p: [
      "Before and after photos are the main way clients judge our work, so we ask about them openly. We ask in the studio before taking any photo, and again before publishing one. You can say no at any point and it will not affect your appointment or your price.",
      "If you have agreed and later change your mind, message us on WhatsApp and we will remove the photo from our website and Instagram. Copies already saved or reshared by other people are outside our control, and we will say so honestly rather than promise otherwise.",
    ],
  },
  {
    h: "Who else sees your information",
    p: [
      "We do not sell your personal information, and we do not share it for anyone else's marketing.",
      "A small number of service providers process data on our behalf, each limited to what their service needs:",
    ],
    ul: [
      "Meta, for WhatsApp and Instagram messages you send us.",
      "Google, for website analytics and for advertising measurement.",
      "Vercel, which hosts this website and keeps standard server logs.",
      "Onyx Creative Asia, the agency that builds our website and manages our advertising. They can access the website and ad accounts, but they do not handle client bookings.",
    ],
    after: [
      "We will also disclose information where Indonesian law requires it.",
    ],
  },
  {
    h: "Cookies and analytics",
    p: [
      "This website uses cookies that keep it working and let us count visits. Analytics data is aggregated — it tells us how many people read a page, not who they are. You can block or delete cookies in your browser settings; the site will still work, and we will simply see less about how it is used.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "Enquiry messages and appointment records are kept for as long as you remain a client and for two years afterwards, so we can look up what was installed if you come back for maintenance. Published photos stay up until you ask us to take them down. Analytics data is retained for 14 months.",
    ],
  },
  {
    h: "How we protect it",
    p: [
      "Client conversations stay in WhatsApp and Instagram, which are encrypted in transit by the platforms themselves. Accounts that hold client information are limited to the owner and the studio team who need them, and each person uses their own login with two-step verification. The website is served over HTTPS and does not store bookings in a public database.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You can ask us at any time to show you what we hold about you, correct something that is wrong, delete your information, or stop messaging you. Write to us on WhatsApp and we will act on it within 30 days. There is no charge.",
    ],
  },
  {
    h: "Children",
    p: [
      "Our service is not directed at children. Clients under 18 are welcome in the studio but must be accompanied by a parent or guardian, who gives consent for the appointment and for any photographs.",
    ],
  },
  {
    h: "Changes",
    p: [
      "If this policy changes, we will update the date at the top of this page. Material changes will also be announced on our Instagram.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-28 md:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <ScrollReveal>
          <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-[#ffb6c1]">
            Legal
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] md:text-6xl">
            Privacy <span className="font-script italic text-[#ffb6c1]">policy</span>.
          </h1>
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-[#c2b3b8]">
            Last updated {UPDATED}
          </p>
          <p className="mt-8 text-lg leading-relaxed text-[#c2b3b8]">
            This page explains what we collect from clients and website visitors,
            why we collect it, and how to have it removed. It is written plainly on
            purpose.
          </p>
        </ScrollReveal>

        <div className="mt-16 space-y-14">
          {sections.map((s) => (
            <ScrollReveal key={s.h}>
              <h2 className="font-serif text-2xl md:text-3xl">{s.h}</h2>
              {s.p?.map((t) => (
                <p key={t} className="mt-5 leading-relaxed text-[#c2b3b8]">
                  {t}
                </p>
              ))}
              {s.ul && (
                <ul className="mt-5 space-y-3">
                  {s.ul.map((t) => (
                    <li key={t} className="flex gap-4 leading-relaxed text-[#c2b3b8]">
                      <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-[#ffb6c1]/50" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.after?.map((t) => (
                <p key={t} className="mt-5 leading-relaxed text-[#c2b3b8]">
                  {t}
                </p>
              ))}
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl">Contact us</h2>
            <p className="mt-5 leading-relaxed text-[#c2b3b8]">
              Any question about this policy, or any request about your own
              information, goes to the studio directly.
            </p>
            <div className="mt-8 border-t border-[#ffb6c1]/20 pt-8 text-[#c2b3b8]">
              <p className="font-serif text-xl text-[#f6e9ec]">{brand.name}</p>
              <p className="mt-3 leading-relaxed">{brand.address}</p>
              <p className="mt-3">
                WhatsApp{" "}
                <a
                  href={brand.whatsappLink}
                  className="text-[#ffb6c1] underline-offset-4 hover:underline"
                >
                  {brand.whatsappDisplay}
                </a>
              </p>
              <p className="mt-1">
                Instagram{" "}
                <a
                  href={brand.instagramUrl}
                  className="text-[#ffb6c1] underline-offset-4 hover:underline"
                >
                  @{brand.instagram}
                </a>
              </p>
              <p className="mt-3">{brand.hours}</p>
            </div>
            <Link
              href="/"
              className="mt-10 inline-block text-sm uppercase tracking-[0.2em] text-[#ffb6c1] underline-offset-4 hover:underline"
            >
              Back to home
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
