import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import {
  projects,
  categoryLabels,
  type ProjectCategory,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Projetos — Atheliê Arquitetura",
  description:
    "Portfólio de projetos residenciais, comerciais e corporativos do estúdio Atheliê Arquitetura.",
};

const order: ProjectCategory[] = ["residencial", "comercial", "corporativo"];

export default function ProjetosPage() {
  return (
    <>
      <section className="page-intro container-edge pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="flex items-center justify-between pb-12 md:pb-16">
          <DimensionLabel label="Portfolio · 24" />
          <DimensionLabel
            label={`${projects.length.toString().padStart(2, "0")} projetos`}
            className="hidden md:inline-flex"
          />
        </div>

        <SectionLabel ordinal="01" label="Projetos" total="07" />
        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-[14ch]">
          Cada espaço tem{" "}
          <span className="italic text-sage-dark">sua história</span>.
        </h1>
        <p className="mt-10 max-w-md text-ink-2">
          Uma seleção de projetos residenciais, comerciais e corporativos
          desenvolvidos pelo estúdio. Cada um com seu desafio, sua paleta e
          sua atmosfera.
        </p>

        <nav className="mt-10 flex flex-wrap items-center gap-2 font-mono-label">
          <span className="text-stone mr-2">Categorias:</span>
          {order.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-ink hover:border-ink hover:bg-ink hover:text-bone transition-colors duration-500"
            >
              {categoryLabels[cat]}
            </a>
          ))}
        </nav>
      </section>

      {order.map((cat, catIdx) => {
        const list = projects.filter((p) => p.category === cat);
        if (list.length === 0) return null;
        return (
          <section
            key={cat}
            id={cat}
            className="container-edge py-16 md:py-24 reveal-on-scroll"
          >
            <div className="flex items-end justify-between flex-wrap gap-6">
              <SectionLabel
                ordinal={String(catIdx + 1).padStart(2, "0")}
                label={categoryLabels[cat]}
                total={String(order.length).padStart(2, "0")}
              />
              <span className="font-mono-label text-stone">
                {String(list.length).padStart(2, "0")} projeto
                {list.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="mt-8">
              <Hairline reveal />
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {list.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projetos/${p.slug}`}
                  className="project-card group block fade-up"
                >
                  <div className="project-image relative overflow-hidden bg-bone-2 aspect-[4/3]">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-10">
                      <span className="font-mono-label text-bone">
                        {p.year}
                      </span>
                      <span className="font-mono-label text-bone inline-flex items-center gap-2">
                        ver projeto
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 14 14"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 7 H13 M8 2 L13 7 L8 12"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            fill="none"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-label text-stone">
                        {categoryLabels[p.category]} · {p.year}
                      </p>
                      <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight text-ink">
                        {p.name}
                      </h3>
                    </div>
                    <p className="font-mono-label text-stone whitespace-nowrap mt-1">
                      {p.city.split(" · ")[1] ?? p.city}
                    </p>
                  </div>
                  {p.summary && (
                    <p className="mt-3 text-ink-2 max-w-md">{p.summary}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
