import { brand } from "@/lib/content";

// The gallery page is a client component, so its metadata lives here.
export const metadata = {
  title: `Hair Extensions Before & After in Bali — ${brand.name}`,
  description:
    "Real before and after results from our Kerobokan studio: Keratin Bond, Nano Ring and Weft on real clients, added as new work comes in.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
