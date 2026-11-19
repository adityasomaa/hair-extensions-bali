"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

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

const PX = 1.5; // pixels per minute on the day grid
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const toTime = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const shiftDate = (date: string, days: number) =>
  new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);

const CHANNEL: Record<string, { label: string; cls: string }> = {
  website: { label: "AI chat", cls: "border-[#ffb6c1] bg-[#ffb6c1]/15" },
  admin: { label: "Staf", cls: "border-[#c2b3b8] bg-[#c2b3b8]/12" },
  demo: { label: "Demo", cls: "border-dashed border-[#ffb6c1]/70 bg-[#ffb6c1]/8" },
};
const channel = (c: string) => CHANNEL[c] ?? { label: c, cls: "border-[#c2b3b8] bg-[#c2b3b8]/12" };

const field =
  "w-full rounded-md border border-[#ffb6c1]/20 bg-[#0e0b09] px-3 py-2 text-[15px] text-[#f6e9ec] placeholder:text-[#c2b3b8]/50 focus:border-[#ffb6c1] focus:outline-none";
const label = "mb-1 block text-[11px] font-medium uppercase tracking-[0.18em] text-[#ffb6c1]";
const btn = "rounded-md px-3 py-2 text-[14px] transition-colors disabled:opacity-50";

export default function AdminPanel({ authed: initial, configured, today }: { authed: boolean; configured: boolean; today: string }) {
  const [authed, setAuthed] = useState(initial);
  const loggedOut = useCallback(() => setAuthed(false), []);
  if (!authed) return <Login configured={configured} onDone={() => setAuthed(true)} />;
  return <Calendar today={today} onLoggedOut={loggedOut} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0e0b09] text-[#f6e9ec]">
      <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">{children}</div>
    </div>
  );
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
    <Shell>
      <div className="mx-auto mt-[12vh] max-w-sm rounded-xl border border-[#ffb6c1]/15 bg-[#16110e] p-8">
        <Lockup />
        <h1 className="mt-6 font-serif text-[28px]">Admin janji temu</h1>
        <p className="mt-2 text-[14px] text-[#c2b3b8]">Khusus staf studio.</p>
        {configured ? (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="pw" className={label}>
                Password
              </label>
              <input id="pw" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
            </div>
            {error && <p className="text-[14px] text-[#ffb6c1]">{error}</p>}
            <button type="submit" disabled={busy} className={`${btn} w-full bg-[#ffb6c1] font-medium text-[#0e0b09] hover:bg-[#ffc8d0]`}>
              {busy ? "Masuk…" : "Masuk"}
            </button>
          </form>
        ) : (
          <p className="mt-6 text-[14px] text-[#ffb6c1]">Admin belum diaktifkan: password admin belum diatur di server.</p>
        )}
      </div>
    </Shell>
  );
}

function Calendar({ today, onLoggedOut }: { today: string; onLoggedOut: () => void }) {
  const [date, setDate] = useState(today);
  const [day, setDay] = useState<Day | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<Form | null>(null);

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

  const go = (d: string) => {
    if (d === date) return;
    setLoading(true);
    setDate(d);
  };

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    onLoggedOut();
  }

  const services = day?.services ?? [];
  const blank = (time?: string, stylist?: number): Form => ({
    name: "",
    mobile: "",
    service: services[0]?.name ?? "",
    date,
    time: time ?? day?.botFrom ?? "12:00",
    minutes: services[0]?.minutes ?? 30,
    stylist: stylist ?? day?.stylists[0] ?? 1,
    hair: "",
    notes: "",
  });

  return (
    <Shell>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ffb6c1]/15 pb-4">
        <div>
          <Lockup />
          <h1 className="mt-2 font-serif text-[24px]">Admin janji temu</h1>
        </div>
        <button onClick={logout} className={`${btn} border border-[#ffb6c1]/25 text-[#c2b3b8] hover:text-[#f6e9ec]`}>
          Keluar
        </button>
      </header>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button onClick={() => go(shiftDate(date, -1))} aria-label="Hari sebelumnya" className={`${btn} border border-[#ffb6c1]/25 hover:border-[#ffb6c1]`}>
          ‹
        </button>
        <button onClick={() => go(today)} className={`${btn} border border-[#ffb6c1]/25 hover:border-[#ffb6c1]`}>
          Hari ini
        </button>
        <button onClick={() => go(shiftDate(date, 1))} aria-label="Hari berikutnya" className={`${btn} border border-[#ffb6c1]/25 hover:border-[#ffb6c1]`}>
          ›
        </button>
        <input type="date" value={date} onChange={(e) => e.target.value && go(e.target.value)} aria-label="Pilih tanggal" className={`${field} w-auto [color-scheme:dark]`} />
        <button onClick={() => day && setForm(blank())} disabled={!day?.closes} className={`${btn} ml-auto bg-[#ffb6c1] font-medium text-[#0e0b09] hover:bg-[#ffc8d0]`}>
          + Janji baru
        </button>
      </div>

      {day && (
        <p className="mt-4 text-[14px] text-[#c2b3b8]">
          <span className="font-serif text-[20px] text-[#f6e9ec]">{day.weekday}</span>
          <span className="block sm:ml-3 sm:inline">
            {day.closes ? `Buka ${day.opens}–${day.closes} · AI receptionist menerima janji mulai ${day.botFrom} · ${day.bookings.length} janji` : "Studio tutup"}
          </span>
        </p>
      )}
      {error && <p className="mt-4 rounded-md border border-[#ffb6c1]/40 px-3 py-2 text-[14px] text-[#ffb6c1]">{error}</p>}

      {day?.closes && (
        <div className={`mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] ${loading ? "opacity-60" : ""}`}>
          <Grid day={day} onNew={(t, s) => setForm(blank(t, s))} onOpen={(r) => setForm({ ...r })} />
          <List day={day} onOpen={(r) => setForm({ ...r })} />
        </div>
      )}

      {form && day && (
        <Editor
          form={form}
          day={day}
          onClose={() => setForm(null)}
          onSaved={(d) => {
            setForm(null);
            setLoading(true);
            if (d !== date) setDate(d);
            else setReload((n) => n + 1);
          }}
          onLoggedOut={onLoggedOut}
        />
      )}
    </Shell>
  );
}

function Grid({ day, onNew, onOpen }: { day: Day; onNew: (time: string, stylist: number) => void; onOpen: (r: Row) => void }) {
  const open = toMin(day.opens);
  const close = toMin(day.closes!);
  const hours = useMemo(() => Array.from({ length: (close - open) / 60 + 1 }, (_, i) => open + i * 60), [open, close]);
  const height = (close - open) * PX;
  const botFrom = toMin(day.botFrom);

  return (
    <div className="overflow-hidden rounded-xl border border-[#ffb6c1]/15 bg-[#16110e]">
      <div className="grid border-b border-[#ffb6c1]/15" style={{ gridTemplateColumns: `52px repeat(${day.stylists.length}, minmax(0,1fr))` }}>
        <div />
        {day.stylists.map((s) => (
          <div key={s} className="border-l border-[#ffb6c1]/10 py-2 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-[#ffb6c1]">
            Stylist {s}
          </div>
        ))}
      </div>
      <div className="grid" style={{ gridTemplateColumns: `52px repeat(${day.stylists.length}, minmax(0,1fr))` }}>
        <div className="relative" style={{ height }}>
          {hours.map((m) => (
            <span key={m} className="absolute right-2 -translate-y-1/2 text-[11px] text-[#c2b3b8]" style={{ top: (m - open) * PX }}>
              {m === open ? "" : toTime(m)}
            </span>
          ))}
        </div>
        {day.stylists.map((s) => (
          <div
            key={s}
            className="relative cursor-copy border-l border-[#ffb6c1]/10"
            style={{ height }}
            title="Klik jam kosong untuk menambah janji"
            onClick={(e) => {
              if (e.target !== e.currentTarget) return;
              const y = e.clientY - e.currentTarget.getBoundingClientRect().top;
              const m = Math.min(close - 30, open + Math.floor(y / PX / 30) * 30);
              onNew(toTime(m), s);
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 bg-[#f6e9ec]/[0.03]" style={{ height: (botFrom - open) * PX }} />
            {hours.map((m) => (
              <div key={m} className="pointer-events-none absolute inset-x-0 border-t border-[#f6e9ec]/[0.07]" style={{ top: (m - open) * PX }} />
            ))}
            {hours.slice(0, -1).map((m) => (
              <div key={`h${m}`} className="pointer-events-none absolute inset-x-0 border-t border-dashed border-[#f6e9ec]/[0.04]" style={{ top: (m + 30 - open) * PX }} />
            ))}
            {day.bookings
              .filter((b) => b.stylist === s)
              .map((b) => (
                <button
                  key={b.path}
                  onClick={() => onOpen(b)}
                  className={`absolute inset-x-1 flex flex-col items-start justify-start overflow-hidden rounded-md border-l-[3px] border px-2 py-1 text-left hover:brightness-125 ${channel(b.channel).cls}`}
                  style={{
                    // Kept inside opening hours if someone booked earlier or later
                    top: (Math.max(toMin(b.time), open) - open) * PX + 1,
                    height: Math.max(24, (Math.min(toMin(b.time) + b.minutes, close) - Math.max(toMin(b.time), open)) * PX - 2),
                  }}
                >
                  <span className="block text-[11px] text-[#ffb6c1]">
                    {b.time}–{b.ends} · {channel(b.channel).label}
                  </span>
                  <span className="block truncate text-[13px] font-medium">{b.name}</span>
                  {b.minutes >= 45 && <span className="block truncate text-[12px] text-[#c2b3b8]">{b.service}</span>}
                </button>
              ))}
          </div>
        ))}
      </div>
      <p className="border-t border-[#ffb6c1]/10 px-3 py-2 text-[12px] text-[#c2b3b8]">
        Area yang lebih terang ({day.opens}–{day.botFrom}) hanya bisa diisi staf. AI receptionist menawarkan jam mulai {day.botFrom}.
      </p>
    </div>
  );
}

function List({ day, onOpen }: { day: Day; onOpen: (r: Row) => void }) {
  if (!day.bookings.length)
    return <p className="rounded-xl border border-[#ffb6c1]/15 bg-[#16110e] p-5 text-[14px] text-[#c2b3b8]">Belum ada janji di tanggal ini.</p>;
  return (
    <ul className="space-y-3">
      {day.bookings.map((b) => (
        <li key={b.path}>
          <button onClick={() => onOpen(b)} className="w-full rounded-xl border border-[#ffb6c1]/15 bg-[#16110e] p-4 text-left hover:border-[#ffb6c1]/50">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-serif text-[18px]">
                {b.time}–{b.ends}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#ffb6c1]">
                Stylist {b.stylist} · {channel(b.channel).label}
              </span>
            </div>
            <p className="mt-1 text-[15px] font-medium">{b.name}</p>
            <p className="text-[13px] text-[#c2b3b8]">
              {b.service} · {b.minutes} menit · {b.code}
            </p>
            {b.hair && <p className="mt-2 text-[13px] text-[#c2b3b8]">Rambut: {b.hair}</p>}
            {b.notes && <p className="text-[13px] text-[#c2b3b8]">Catatan: {b.notes}</p>}
          </button>
          {b.mobile && (
            <a href={`https://wa.me/${b.mobile.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block px-1 text-[13px] text-[#ffb6c1] underline-offset-4 hover:underline">
              WhatsApp {b.mobile}
            </a>
          )}
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
  onSaved: (date: string) => void;
  onLoggedOut: () => void;
}) {
  const [f, setF] = useState<Form>(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));

  const close = toMin(day.closes ?? "19:00");
  const times = useMemo(() => {
    const out: string[] = [];
    for (let m = toMin(day.opens); m < close; m += 15) out.push(toTime(m));
    return out;
  }, [day.opens, close]);
  const ends = toTime(toMin(f.time) + (f.minutes || 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function send(method: "POST" | "PUT" | "DELETE", body: object) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/bookings", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.status === 401) return onLoggedOut();
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data.error ?? "Gagal menyimpan.");
      onSaved(f.date);
    } catch {
      setError("Koneksi bermasalah. Coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  function save(e: FormEvent) {
    e.preventDefault();
    send(f.path ? "PUT" : "POST", f);
  }

  function remove() {
    if (f.path && window.confirm(`Hapus janji ${f.name} jam ${f.time}? Jam ini akan kosong lagi untuk AI receptionist.`)) send("DELETE", { path: f.path });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
        onSubmit={save}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-[#ffb6c1]/20 bg-[#16110e] p-6 sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="editor-title" className="font-serif text-[24px]">
            {f.path ? "Ubah janji" : "Janji baru"}
          </h2>
          {f.code && <span className="pt-2 text-[12px] text-[#c2b3b8]">{f.code}</span>}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label htmlFor="f-name" className={label}>Nama klien</label>
            <input id="f-name" required value={f.name} onChange={(e) => set("name", e.target.value)} className={field} />
          </div>
          <div className="col-span-2">
            <label htmlFor="f-mobile" className={label}>WhatsApp</label>
            <input id="f-mobile" inputMode="tel" placeholder="+62…" value={f.mobile} onChange={(e) => set("mobile", e.target.value)} className={field} />
          </div>
          <div className="col-span-2">
            <label htmlFor="f-service" className={label}>Treatment</label>
            <select
              id="f-service"
              value={f.service}
              onChange={(e) => {
                const s = day.services.find((x) => x.name === e.target.value);
                setF((p) => ({ ...p, service: e.target.value, minutes: s?.minutes ?? p.minutes }));
              }}
              className={field}
            >
              {day.services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} ({s.minutes} menit)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-date" className={label}>Tanggal</label>
            <input id="f-date" type="date" required value={f.date} onChange={(e) => set("date", e.target.value)} className={`${field} [color-scheme:dark]`} />
          </div>
          <div>
            <label htmlFor="f-time" className={label}>Jam mulai</label>
            <select id="f-time" value={f.time} onChange={(e) => set("time", e.target.value)} className={field}>
              {!times.includes(f.time) && <option value={f.time}>{f.time}</option>}
              {times.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-minutes" className={label}>Durasi (menit)</label>
            <input id="f-minutes" type="number" min={15} max={480} step={15} required value={f.minutes} onChange={(e) => set("minutes", Number(e.target.value))} className={field} />
            <p className="mt-1 text-[12px] text-[#c2b3b8]">Selesai {ends}</p>
          </div>
          <div>
            <label htmlFor="f-stylist" className={label}>Stylist</label>
            <select id="f-stylist" value={f.stylist} onChange={(e) => set("stylist", Number(e.target.value))} className={field}>
              {day.stylists.map((s) => (
                <option key={s} value={s}>Stylist {s}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="f-hair" className={label}>Rambut klien</label>
            <input id="f-hair" placeholder="mis. sebahu, tipis, cokelat gelap; mau 50 cm" value={f.hair} onChange={(e) => set("hair", e.target.value)} className={field} />
          </div>
          <div className="col-span-2">
            <label htmlFor="f-notes" className={label}>Catatan</label>
            <textarea id="f-notes" rows={2} value={f.notes} onChange={(e) => set("notes", e.target.value)} className={field} />
          </div>
        </div>

        {error && <p className="mt-4 text-[14px] text-[#ffb6c1]">{error}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button type="submit" disabled={busy} className={`${btn} bg-[#ffb6c1] font-medium text-[#0e0b09] hover:bg-[#ffc8d0]`}>
            {busy ? "Menyimpan…" : "Simpan"}
          </button>
          <button type="button" onClick={onClose} className={`${btn} border border-[#ffb6c1]/25 text-[#c2b3b8] hover:text-[#f6e9ec]`}>
            Batal
          </button>
          {f.path && (
            <button type="button" onClick={remove} disabled={busy} className={`${btn} ml-auto text-[#ffb6c1] hover:bg-[#ffb6c1]/10`}>
              Hapus janji
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
