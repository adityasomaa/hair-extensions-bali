import { services } from "@/lib/content";

// Maintenance prices shown inside the chat when the receptionist calls show_maintenance_prices.
// Same numbers as the product pages (lib/content.ts), so the two never disagree.

const ID: Record<string, string> = {
  "Remove (per strand)": "Lepas (per helai)",
  "Install (per strand)": "Pasang (per helai)",
  "New glue (per strand)": "Lem baru (per helai)",
  "Reposition 1 row": "Reposisi 1 baris",
  "Reposition 2 rows": "Reposisi 2 baris",
  "Reposition 3 rows": "Reposisi 3 baris",
  "Reposition 4 rows": "Reposisi 4 baris",
  "Reposition 5 rows": "Reposisi 5 baris",
  "Remove only · 1 row": "Lepas saja · 1 baris",
  "Remove only · 2–5 rows": "Lepas saja · 2–5 baris",
  "Minimum service 50 strands": "Minimal 50 helai",
  "Standard turnaround 2 days · 1-day express 20,000 IDR/strand": "Pengerjaan standar 2 hari · ekspres 1 hari 20.000 IDR/helai",
  "No warranty for installations using glue not provided by us": "Tidak ada garansi untuk pemasangan dengan lem yang bukan dari kami",
};

const TEXT = {
  en: { title: "Maintenance prices", item: "Service (IDR)", ours: "Our hair", outside: "Outside hair" },
  id: { title: "Harga maintenance", item: "Layanan (IDR)", ours: "Rambut dari kami", outside: "Rambut dari luar" },
};

export default function ChatPriceTable({ method, lang }: { method: string; lang: "en" | "id" }) {
  const t = TEXT[lang];
  const tr = (s: string) => (lang === "id" ? ID[s] ?? s : s);
  const list = services.filter((s) => s.maintenance && (method === "all" || s.slug === method));
  if (!list.length) return null;

  return (
    <div className="my-1 w-full space-y-3">
      {list.map((s) => {
        const rows = s.maintenance!.rows;
        const outside = rows.some((r) => r.outside);
        return (
          <div key={s.slug} className="overflow-hidden rounded-xl border border-[#1a1411]/10 bg-white">
            <p className="bg-[#0e0b09] px-3 py-2 text-[13px] font-medium text-[#f6e9ec]">
              {t.title} · {s.name}
            </p>
            <table className="w-full text-left text-[12.5px]">
              <thead>
                <tr className="text-[#8a7a76]">
                  <th className="px-3 py-1.5 font-medium">{t.item}</th>
                  <th className="px-2 py-1.5 text-right font-medium">{t.ours}</th>
                  {outside && <th className="px-3 py-1.5 text-right font-medium">{t.outside}</th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t border-[#1a1411]/5">
                    <td className="px-3 py-1.5">{tr(r.label)}</td>
                    <td className="px-2 py-1.5 text-right tabular-nums">{r.ours}</td>
                    {outside && <td className="px-3 py-1.5 text-right tabular-nums">{r.outside ?? "–"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
            {s.maintenance!.notes?.length ? (
              <ul className="border-t border-[#1a1411]/5 px-3 py-2 text-[11.5px] leading-snug text-[#8a7a76]">
                {s.maintenance!.notes.map((n) => (
                  <li key={n}>{tr(n)}</li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
