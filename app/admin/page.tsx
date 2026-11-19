import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";
import { adminConfigured, isAdmin } from "@/lib/admin/auth";
import { today } from "@/lib/ai/schedule";

export const metadata: Metadata = {
  title: "Admin janji temu · The Hair Extensions Bali",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  return <AdminPanel authed={await isAdmin()} configured={adminConfigured()} today={today()} />;
}
