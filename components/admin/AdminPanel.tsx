"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, List, LogOut, MessageCircle, Plus } from "lucide-react";
import CustomDatePicker from "@/components/CustomDatePicker";
import CustomSelect from "@/components/CustomSelect";

// Staff calendar for the studio: one day at a time, a column per stylist. It reads and
// writes the same appointments the AI receptionist books, through /api/admin/bookings.

type Service = { name: string; minutes: number };
type Row = {
  path: string;
  code: string;
  name: string;
  mobile: string;
  service: string;
  date: string;
  time: string;
  ends: string;
  minutes: number;
  stylist: number;
  hair: string;
  notes: string;
  channel: string;
};
type Day = {
  date: string;
  weekday: string;
  opens: string;
  closes: string | null;
  botFrom: string;
  stylists: number[];
  services: Service[];
  bookings: Row[];
};
type Form = {
  path?: string;
  code?: string;
  name: string;
  mobile: string;
  service: string;
  date: string;
  time: string;
  minutes: number;
  stylist: number;
  hair: string;
  notes: string;
};

const PX = 1.6; // pixels per minute on the day grid
const TZ = "Asia/Makassar";
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const toTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const shiftDate = (date: string, days: number) =>
  new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
const longDate = (date: string) =>
  new Date(`${date}T12:00:00+08:00`).toLocaleDateString("id-ID", { timeZone: TZ, weekday: "long", day: "numeric", month: "long" });
const duration = (m: number) => {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return [h ? `${h} jam` : "", r ? `${r} menit` : ""].filter(Boolean).join(" ");
};
const nowMinutes = () => {
  const [h, m] = new Date().toLocaleTimeString("en-GB", { timeZone: TZ, hour12: false }).split(":");
  return Number(h) * 60 + Number(m);
};

const SOURCE: Record<string, { label: string; block: string; dot: string }> = {
  website: { label: "Dari AI chat", block: "border-[#ffb6c1] bg-[#ffb6c1]/15", dot: "bg-[#ffb6c1]" },
  admin: { label: "Dibuat staf", block: "border-[#c2b3b8] bg-[#c2b3b8]/15", dot: "bg-[#c2b3b8]" },
  demo: { label: "Contoh (demo)", block: "border-dashed border-[#ffb6c1]/70 bg-[#ffb6c1]/[0.06]", dot: "border border-dashed border-[#ffb6c1]" },
};
const source = (c: string) => SOURCE[c] ?? SOURCE.admin;

const input =
  "w-full rounded-sm border border-white/10 bg-[#0e0b09] px-4 py-3 text-[15px] text-[#f6e9ec] placeholder:text-[#ab9aa1] transition-colors hover:border-[#ffb6c1]/40 focus:border-[#ffb6c1] focus:outline-none focus:ring-1 focus:ring-[#ffb6c1]";
const labelCls = "block text-[11px] uppercase tracking-[0.22em] text-[#ffb6c1]";
const btn = "inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-[14px] transition-colors disabled:opacity-50";
const btnPrimary = `${btn} bg-[#ffb6c1] font-medium text-[#0e0b09] hover:bg-[#ffc8d0]`;
const btnGhost = `${btn} border border-white/10 text-[#f6e9ec] hover:border-[#ffb6c1]/50`;

export default function AdminPanel({ authed: initial, configured, today }: { authed: boolean; configured: boolean; today: string }) {
  const [authed, setAuthed] = useState(initial);
  const loggedOut = useCallback(() => setAuthed(false), []);
  if (!authed) return <Login configured={configured} onDone={() => setAuthed(true)} />;
  return <Calendar today={today} onLoggedOut={loggedOut} />;
}

function Lockup() {
  return (
    <div className="leading-none">
      <span className="font-script text-[22px] text-[#ffb6c1]">The </span>
      <span className="font-serif text-[13px] uppercase tracking-[0.24em]">Hair Extensions</span>
      <span className="font-script text-[22px] text-[#ffb6c1]"> Bali</span>
    </div>
  );
}

function Login({ configured, onDone }: { configured: boolean; onDone: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) return onDone();
      setError(((await res.json().catch(() => ({}))) as { error?: string }).error ?? "Login gagal.");
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0e0b09] px-4 text-[#f6e9ec]">
      <div className="mx-auto max-w-sm pt-[12vh]">
        <div className="rounded-sm border border-[#ffb6c1]/15 bg-[#16110e] p-8">
          <Lockup />
          <h1 className="mt-6 font-serif text-[28px]">Admin janji temu</h1>
          <p className="mt-2 text-[14px] text-[#c2b3b8]">Khusus staf studio. Masukkan password admin.</p>
          {configured ? (
            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="pw" className={labelCls}>
                  Password
                </label>
                <input id="pw" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} mt-2`} />
              </div>
              {error && <p className="text-[14px] text-[#ffb6c1]">{error}</p>}
              <button type="submit" disabled={busy} className={`${btnPrimary} w-full`}>
                {busy ? "Masuk…" : "Masuk"}
              </button>
            </form>
          ) : (
            <p className="mt-6 text-[14px] text-[#ffb6c1]">Admin belum diaktifkan: password admin belum diatur di server.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Calendar({ today, onLoggedOut }: { today: string; onLoggedOut: () => void }) {
  const [date, setDate] = useState(today);
  const [day, setDay] = useState<Day | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState<Form | null>(null);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [reload, setReload] = useState(0);

  // Loading is set by the handlers that change the date; the effect only sets state once
  // the request has answered, and ignores answers for a date the user has left.
  useEffect(() => {
    let active = true;
    fetch(`/api/admin/bookings?date=${date}`, { cache: "no-store" })
      .then(async (res) => {
        if (!active) return;
        if (res.status === 401) return onLoggedOut();
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        if (!active) return;
        setError("");
        setDay(data as Day);
      })
      .catch((e) => active && setError(e instanceof Error && e.message ? e.message : "Gagal memuat jadwal."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [date, reload, onLoggedOut]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const go = (d: string) => {
    if (!d || d === date) return;
    setLoading(true);
    setDate(d);
  };

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    onLoggedOut();
  }

  const blank = (time?: string, stylist?: number): Form => ({
    name: "",
    mobile: "",
    service: day?.services[0]?.name ?? "",
    date,
    time: time ?? day?.botFrom ?? "12:00",
    minutes: day?.services[0]?.minutes ?? 30,
    stylist: stylist ?? day?.stylists[0] ?? 1,
    hair: "",
    notes: "",
  });
  const open = !!day?.closes;

  return (
    <div className="min-h-screen bg-[#0e0b09] text-[#f6e9ec]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <Lockup />
            <p className="mt-1.5 text-[12px] uppercase tracking-[0.22em] text-[#c2b3b8]">Admin janji temu</p>
          </div>
          <button onClick={logout} className={btnGhost}>
            <LogOut className="h-4 w-4" aria-hidden /> Keluar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 pb-16 pt-6 sm:px-6">
        {/* Day picker */}
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => go(shiftDate(date, -1))} aria-label="Hari sebelumnya" className={`${btnGhost} px-3`}>
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <div className="min-w-0 flex-1 sm:w-64 sm:flex-none [&>div]:mt-0">
            <CustomDatePicker id="day" lang="id" value={date} onChange={go} />
          </div>
          <button onClick={() => go(shiftDate(date, 1))} aria-label="Hari berikutnya" className={`${btnGhost} px-3`}>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
          {date !== today && (
            <button onClick={() => go(today)} className={btnGhost}>
              Hari ini
            </button>
          )}
          <button onClick={() => day && setForm(blank())} disabled={!open} className={`${btnPrimary} w-full sm:ml-auto sm:w-auto`}>
            <Plus className="h-4 w-4" aria-hidden /> Tambah janji
          </button>
        </div>

        {/* Day summary */}
        {day && (
          <section className="mt-6">
            <h1 className="font-serif text-[30px] leading-tight sm:text-[34px]">
              {day.weekday}
              {date === today && <span className="ml-3 align-middle text-[12px] uppercase tracking-[0.22em] text-[#ffb6c1]">Hari ini</span>}
            </h1>
            {open ? (
              <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
                <Chip strong>{day.bookings.length} janji</Chip>
                {day.stylists.map((s) => (
                  <Chip key={s}>
                    Stylist {s}: {day.bookings.filter((b) => b.stylist === s).length} janji
                  </Chip>
                ))}
                <Chip>
                  Studio buka {day.opens}–{day.closes}
                </Chip>
                <Chip>AI chat menerima janji mulai {day.botFrom}</Chip>
              </div>
            ) : (
              <p className="mt-3 text-[15px] text-[#c2b3b8]">Studio tutup di tanggal ini.</p>
            )}
          </section>
        )}

        {notice && <p className="mt-4 rounded-sm border border-[#ffb6c1]/40 bg-[#ffb6c1]/10 px-4 py-3 text-[14px]">{notice}</p>}
        {error && <p className="mt-4 rounded-sm border border-[#ffb6c1]/40 px-4 py-3 text-[14px] text-[#ffb6c1]">{error}</p>}

        {day && open && (
          <>
            {/* View switch + legend */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-3">
              <div role="tablist" aria-label="Tampilan" className="inline-flex rounded-sm border border-white/10 p-1">
                {([
                  ["calendar", "Kalender", CalendarDays],
                  ["list", "Daftar", List],
                ] as const).map(([key, text, Icon]) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={view === key}
                    onClick={() => setView(key)}
                    className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-[14px] transition-colors ${
                      view === key ? "bg-[#ffb6c1] font-medium text-[#0e0b09]" : "text-[#c2b3b8] hover:text-[#f6e9ec]"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden /> {text}
                  </button>
                ))}
              </div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#c2b3b8]">
                {Object.values(SOURCE).map((s) => (
                  <li key={s.label} className="inline-flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-sm ${s.dot}`} aria-hidden /> {s.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`mt-5 transition-opacity ${loading ? "opacity-50" : ""}`}>
              {view === "calendar" ? (
                <>
                  <p className="mb-3 text-[14px] text-[#c2b3b8]">
                    Klik kotak kosong untuk menambah janji di jam itu. Klik janji untuk mengubah atau menghapusnya.
                  </p>
                  <Grid day={day} isToday={date === today} onNew={(t, s) => setForm(blank(t, s))} onOpen={(r) => setForm({ ...r })} />
                </>
              ) : (
                <Agenda day={day} onOpen={(r) => setForm({ ...r })} onNew={() => setForm(blank())} />
              )}
            </div>
          </>
        )}
      </main>

      {form && day && (
        <Editor
          form={form}
          day={day}
          onClose={() => setForm(null)}
          onSaved={(d, message) => {
            setForm(null);
            setNotice(message);
            setLoading(true);
            if (d !== date) setDate(d);
            else setReload((n) => n + 1);
          }}
          onLoggedOut={onLoggedOut}
        />
      )}
    </div>
  );
}

function Chip({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span className={`rounded-sm border px-3 py-1.5 ${strong ? "border-[#ffb6c1]/50 text-[#f6e9ec]" : "border-white/10 text-[#c2b3b8]"}`}>
      {children}
    </span>
  );
}

function Grid({ day, isToday, onNew, onOpen }: { day: Day; isToday: boolean; onNew: (time: string, stylist: number) => void; onOpen: (r: Row) => void }) {
  const open = toMin(day.opens);
  const close = toMin(day.closes!);
  const botFrom = toMin(day.botFrom);
  const height = (close - open) * PX;
  const hours = useMemo(() => Array.from({ length: (close - open) / 60 + 1 }, (_, i) => open + i * 60), [open, close]);
  const slots = useMemo(() => Array.from({ length: (close - open) / 30 }, (_, i) => open + i * 30), [open, close]);
  const cols = `64px repeat(${day.stylists.length}, minmax(0,1fr))`;

  // Current time line on today's calendar, updated every minute.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!isToday) return;
    const tick = () => setNow(nowMinutes());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [isToday]);
  const showNow = isToday && now !== null && now >= open && now <= close;

  return (
    <div className="overflow-hidden rounded-sm border border-white/10 bg-[#16110e]">
      <div className="grid border-b border-white/10" style={{ gridTemplateColumns: cols }}>
        <div className="px-2 py-3 text-right text-[11px] uppercase tracking-[0.18em] text-[#ab9aa1]">Jam</div>
        {day.stylists.map((s) => (
          <div key={s} className="border-l border-white/10 px-3 py-3 text-center">
            <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#ffb6c1]">Stylist {s}</p>
            <p className="text-[12px] text-[#c2b3b8]">{day.bookings.filter((b) => b.stylist === s).length} janji</p>
          </div>
        ))}
      </div>

      <div className="relative grid py-3" style={{ gridTemplateColumns: cols }}>
        <div className="relative" style={{ height }}>
          {hours.map((m) => (
            <span key={m} className="absolute right-3 -translate-y-1/2 text-[12px] tabular-nums text-[#c2b3b8]" style={{ top: (m - open) * PX }}>
              {toTime(m)}
            </span>
          ))}
        </div>

        {day.stylists.map((s) => (
          <div key={s} className="relative border-l border-white/10" style={{ height }}>
            {/* Staff-only hour before the AI receptionist starts taking bookings */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 bg-[repeating-linear-gradient(135deg,rgba(246,233,236,0.035)_0_6px,transparent_6px_12px)]"
              style={{ height: (botFrom - open) * PX }}
            >
              <span className="absolute left-2 top-1 text-[10px] uppercase tracking-[0.16em] text-[#ab9aa1]">Hanya staf</span>
            </div>
            {hours.map((m) => (
              <div key={m} className="pointer-events-none absolute inset-x-0 border-t border-white/[0.08]" style={{ top: (m - open) * PX }} />
            ))}

            {/* Every half hour is a button: hover shows the time, click starts a booking there */}
            {slots.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onNew(toTime(m), s)}
                aria-label={`Tambah janji Stylist ${s} jam ${toTime(m)}`}
                className="group absolute inset-x-0 flex items-center justify-end px-3 text-left hover:bg-[#ffb6c1]/[0.07] focus-visible:bg-[#ffb6c1]/[0.07]"
                style={{ top: (m - open) * PX, height: 30 * PX }}
              >
                <span className="text-[12px] text-[#ffb6c1] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">+ {toTime(m)}</span>
              </button>
            ))}

            {day.bookings
              .filter((b) => b.stylist === s)
              .map((b) => {
                const start = Math.max(toMin(b.time), open);
                const end = Math.min(toMin(b.time) + b.minutes, close);
                const h = Math.max(26, (end - start) * PX - 3);
                return (
                  <button
                    key={b.path}
                    type="button"
                    onClick={() => onOpen(b)}
                    className={`absolute inset-x-1.5 z-10 flex flex-col items-start justify-start overflow-hidden rounded-sm border border-l-[3px] px-2.5 py-1.5 text-left transition-[filter] hover:brightness-125 ${source(b.channel).block}`}
                    style={{ top: (start - open) * PX + 1, height: h }}
                  >
                    {h < 56 ? (
                      // Short appointments: time and name on one line so nothing is cut off
                      <span className="w-full truncate text-[13px]">
                        <span className="font-medium tabular-nums text-[#ffb6c1]">{b.time}</span> · <span className="font-medium">{b.name}</span>
                      </span>
                    ) : (
                      <>
                        <span className="text-[12px] font-medium tabular-nums text-[#ffb6c1]">
                          {b.time}–{b.ends}
                        </span>
                        <span className="w-full truncate text-[14px] font-medium">{b.name}</span>
                        {h > 60 && <span className="w-full truncate text-[12px] text-[#c2b3b8]">{b.service}</span>}
                        {h > 80 && <span className="w-full truncate text-[12px] text-[#ab9aa1]">{duration(b.minutes)}</span>}
                      </>
                    )}
                  </button>
                );
              })}
          </div>
        ))}

        {showNow && (
          <div className="pointer-events-none absolute right-0 z-20 flex items-center" style={{ left: 58, top: 12 + (now! - open) * PX - 4 }}>
            <span className="h-2 w-2 rounded-full bg-[#ffb6c1]" />
            <span className="h-px flex-1 bg-[#ffb6c1]" />
          </div>
        )}
      </div>
    </div>
  );
}

function Agenda({ day, onOpen, onNew }: { day: Day; onOpen: (r: Row) => void; onNew: () => void }) {
  if (!day.bookings.length)
    return (
      <div className="rounded-sm border border-white/10 bg-[#16110e] p-8 text-center">
        <p className="text-[15px] text-[#c2b3b8]">Belum ada janji di tanggal ini.</p>
        <button onClick={onNew} className={`${btnPrimary} mt-4`}>
          <Plus className="h-4 w-4" aria-hidden /> Tambah janji
        </button>
      </div>
    );
  return (
    <ul className="divide-y divide-white/10 rounded-sm border border-white/10 bg-[#16110e]">
      {day.bookings.map((b) => (
        <li key={b.path} className="grid gap-3 p-4 sm:grid-cols-[150px_minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:p-5">
          <div>
            <p className="font-serif text-[22px] tabular-nums leading-none">{b.time}</p>
            <p className="mt-1 text-[13px] text-[#c2b3b8]">
              s/d {b.ends} · {duration(b.minutes)}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-[16px] font-medium">{b.name}</p>
            <p className="text-[14px] text-[#c2b3b8]">{b.service}</p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#c2b3b8]">
              <span className="text-[#ffb6c1]">Stylist {b.stylist}</span>
              <span className="inline-flex items-center gap-1.5">
                <span className={`h-2.5 w-2.5 rounded-sm ${source(b.channel).dot}`} aria-hidden /> {source(b.channel).label}
              </span>
              <span>{b.code}</span>
            </p>
            {b.hair && <p className="mt-2 text-[13px] text-[#c2b3b8]">Rambut: {b.hair}</p>}
            {b.notes && <p className="text-[13px] text-[#c2b3b8]">Catatan: {b.notes}</p>}
          </div>
          <div className="flex gap-2 sm:flex-col">
            <button onClick={() => onOpen(b)} className={btnGhost}>
              Ubah
            </button>
            {b.mobile && (
              <a href={`https://wa.me/${b.mobile.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Editor({
  form: initial,
  day,
  onClose,
  onSaved,
  onLoggedOut,
}: {
  form: Form;
  day: Day;
  onClose: () => void;
  onSaved: (date: string, message: string) => void;
  onLoggedOut: () => void;
}) {
  const [f, setF] = useState<Form>(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  const close = toMin(day.closes ?? "19:00");
  const times = useMemo(() => {
    const out: string[] = [];
    for (let m = toMin(day.opens); m < close; m += 15) out.push(toTime(m));
    return out;
  }, [day.opens, close]);
  const ends = toTime(toMin(f.time) + (f.minutes || 0));
  const lateEnd = toMin(f.time) + (f.minutes || 0) > close;

  // Escape closes the form, unless a dropdown or the date picker inside it is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector("form[role=dialog] [role=listbox], form[role=dialog] [role=dialog]")) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function send(method: "POST" | "PUT" | "DELETE", body: object, message: string) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/bookings", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.status === 401) return onLoggedOut();
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data.error ?? "Gagal menyimpan.");
      onSaved(f.date, message);
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  function save(e: FormEvent) {
    e.preventDefault();
    send(f.path ? "PUT" : "POST", f, f.path ? `Janji ${f.name} sudah diubah.` : `Janji ${f.name} sudah ditambahkan.`);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:p-6" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
        onSubmit={save}
        data-lenis-prevent
        className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-t-sm border border-[#ffb6c1]/20 bg-[#16110e] sm:rounded-sm"
      >
        <div className="sticky top-0 z-30 flex items-start justify-between gap-3 border-b border-white/10 bg-[#16110e] px-6 py-4">
          <div>
            <h2 id="editor-title" className="font-serif text-[24px] leading-tight">
              {f.path ? "Ubah janji" : "Tambah janji"}
            </h2>
            <p className="mt-1 text-[13px] text-[#c2b3b8]">
              {longDate(f.date)} · {f.time}–{ends} · Stylist {f.stylist}
              {f.code ? ` · ${f.code}` : ""}
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Tutup" className="px-2 text-[24px] leading-none text-[#c2b3b8] hover:text-[#f6e9ec]">
            ×
          </button>
        </div>

        <div className="space-y-8 px-6 py-6">
          <fieldset className="space-y-4">
            <legend className="mb-3 font-serif text-[18px]">Jadwal</legend>
            <div>
              <label htmlFor="f-service" className={labelCls}>Treatment</label>
              <CustomSelect
                id="f-service"
                value={f.service}
                onChange={(v) => {
                  const s = day.services.find((x) => x.name === v);
                  setF((p) => ({ ...p, service: v, minutes: s?.minutes ?? p.minutes }));
                }}
                options={day.services.map((s) => ({ value: s.name, label: `${s.name} · ${duration(s.minutes)}` }))}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="f-date" className={labelCls}>Tanggal</label>
                <CustomDatePicker id="f-date" lang="id" value={f.date} onChange={(v) => v && set("date", v)} />
              </div>
              <div>
                <label htmlFor="f-time" className={labelCls}>Jam mulai</label>
                <CustomSelect id="f-time" value={f.time} onChange={(v) => set("time", v)} options={times.map((t) => ({ value: t, label: t }))} />
              </div>
              <div>
                <label htmlFor="f-stylist" className={labelCls}>Stylist</label>
                <CustomSelect
                  id="f-stylist"
                  value={String(f.stylist)}
                  onChange={(v) => set("stylist", Number(v))}
                  options={day.stylists.map((s) => ({ value: String(s), label: `Stylist ${s}` }))}
                />
              </div>
              <div>
                <label htmlFor="f-minutes" className={labelCls}>Durasi (menit)</label>
                <input id="f-minutes" type="number" min={15} max={480} step={15} required value={f.minutes} onChange={(e) => set("minutes", Number(e.target.value))} className={`${input} mt-2`} />
              </div>
            </div>
            <p className={`text-[13px] ${lateEnd ? "text-[#ffb6c1]" : "text-[#c2b3b8]"}`}>
              Selesai jam {ends}
              {lateEnd ? ` (lewat jam tutup ${day.closes})` : ""}. Durasi otomatis mengikuti treatment, bisa diubah kalau perlu.
            </p>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="mb-3 font-serif text-[18px]">Klien</legend>
            <div>
              <label htmlFor="f-name" className={labelCls}>Nama</label>
              <input id="f-name" required value={f.name} onChange={(e) => set("name", e.target.value)} className={`${input} mt-2`} />
            </div>
            <div>
              <label htmlFor="f-mobile" className={labelCls}>WhatsApp</label>
              <input id="f-mobile" inputMode="tel" placeholder="+62…" value={f.mobile} onChange={(e) => set("mobile", e.target.value)} className={`${input} mt-2`} />
            </div>
            <div>
              <label htmlFor="f-hair" className={labelCls}>Rambut klien</label>
              <input id="f-hair" placeholder="mis. sebahu, tipis, cokelat gelap; mau 50 cm" value={f.hair} onChange={(e) => set("hair", e.target.value)} className={`${input} mt-2`} />
            </div>
            <div>
              <label htmlFor="f-notes" className={labelCls}>Catatan</label>
              <textarea id="f-notes" rows={2} value={f.notes} onChange={(e) => set("notes", e.target.value)} className={`${input} mt-2`} />
            </div>
          </fieldset>

          {error && <p className="rounded-sm border border-[#ffb6c1]/40 px-4 py-3 text-[14px] text-[#ffb6c1]">{error}</p>}
        </div>

        <div className="sticky bottom-0 z-30 flex flex-wrap items-center gap-2 border-t border-white/10 bg-[#16110e] px-6 py-4">
          {confirmDelete ? (
            <>
              <p className="w-full text-[14px] sm:w-auto sm:flex-1">Hapus janji ini? Jamnya akan kosong lagi untuk AI chat.</p>
              <button type="button" onClick={() => send("DELETE", { path: f.path }, `Janji ${f.name} sudah dihapus.`)} disabled={busy} className={btnPrimary}>
                {busy ? "Menghapus…" : "Ya, hapus"}
              </button>
              <button type="button" onClick={() => setConfirmDelete(false)} className={btnGhost}>
                Batal
              </button>
            </>
          ) : (
            <>
              <button type="submit" disabled={busy} className={btnPrimary}>
                {busy ? "Menyimpan…" : "Simpan"}
              </button>
              <button type="button" onClick={onClose} className={btnGhost}>
                Batal
              </button>
              {f.path && (
                <button type="button" onClick={() => setConfirmDelete(true)} className={`${btn} ml-auto text-[#ffb6c1] hover:bg-[#ffb6c1]/10`}>
                  Hapus janji
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
}
