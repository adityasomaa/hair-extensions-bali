"use client";

import { usePathname } from "next/navigation";

/** Leaves the public site's chrome (nav, footer, loader, chat) off the staff panel. */
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  return usePathname()?.startsWith("/admin") ? null : children;
}
