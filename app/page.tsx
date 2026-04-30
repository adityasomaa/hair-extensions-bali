import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brand, designs } from "@/lib/content";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <header className="mb-16 md:mb-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Design Preview · Internal
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
            {brand.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-600">
            Three landing-page directions to choose from. Click any preview to
            view the full design. They share the same content — only the visual
            language changes.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-3">
          {designs.map((design, idx) => (
            <li key={design.slug}>
              <Link
                href={`/${design.slug}`}
                className="group block h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl md:p-8"
              >
                <div className="flex h-full flex-col">
                  <div className="mb-6 flex items-baseline justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                      Design {idx + 1}
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-neutral-400 transition-all group-hover:translate-x-1 group-hover:text-neutral-900"
                      aria-hidden
                    />
                  </div>

                  <h2 className="mb-3 font-serif text-2xl md:text-3xl">
                    {design.name}
                  </h2>

                  <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-600">
                    {design.description}
                  </p>

                  <div className="flex gap-1.5">
                    {design.palette.map((color) => (
                      <span
                        key={color}
                        className="h-8 flex-1 rounded-md border border-neutral-100"
                        style={{ backgroundColor: color }}
                        aria-label={`Palette color ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-20 border-t border-neutral-200 pt-8 text-sm text-neutral-500">
          <p>
            Once a direction is approved we&apos;ll connect a custom domain via
            Vercel and refine the chosen design with real photography and any
            content tweaks.
          </p>
        </footer>
      </div>
    </main>
  );
}
