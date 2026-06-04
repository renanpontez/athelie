import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";

type CardProject = {
  slug: string;
  name: string;
  category: string;
  city: string;
  year: number;
  image: string;
  imageAlt: string;
  summary?: string;
};

type Group = {
  key: string;
  label: string;
  projects: CardProject[];
};

type Props = {
  label?: string;
  showAnchorNav?: boolean;
  groups: Group[];
};

export function ProjectsByCategory({
  label,
  showAnchorNav,
  groups,
}: Props) {
  if (!groups || groups.length === 0) return null;
  return (
    <>
      {showAnchorNav && (
        <nav className="container-edge -mt-4 mb-4 flex flex-wrap items-center gap-2 font-mono-label">
          <span className="text-stone mr-2">{label ?? "Categorias"}:</span>
          {groups.map((g) => (
            <a
              key={g.key}
              href={`#${g.key}`}
              className="rounded-full border border-ink/15 px-3 py-1.5 text-ink hover:border-ink hover:bg-ink hover:text-bone transition-colors duration-500"
            >
              {g.label}
            </a>
          ))}
        </nav>
      )}

      {groups.map((group) => {
        if (group.projects.length === 0) return null;
        return (
          <section
            key={group.key}
            id={group.key}
            className="container-edge py-16 md:py-24 reveal-on-scroll"
          >
            <div className="flex items-end justify-between flex-wrap gap-6">
              <SectionLabel label={group.label} />
              <span className="font-mono-label text-stone">
                {String(group.projects.length).padStart(2, "0")} projeto
                {group.projects.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="mt-8">
              <Hairline reveal />
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {group.projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projetos/${p.slug}`}
                  className="project-card group block fade-up"
                >
                  <div className="project-image relative overflow-hidden bg-bone-2 aspect-[4/3]">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 opacity-0 transition-opacity duration-700 group-hover:opacity-100 z-10">
                      <span className="font-mono-label text-bone">{p.year}</span>
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
                        {group.label} · {p.year}
                      </p>
                      <h3 className="mt-2 font-display text-2xl md:text-3xl leading-tight text-ink">
                        {p.name}
                      </h3>
                    </div>
                    {p.city && (
                      <p className="font-mono-label text-stone whitespace-nowrap mt-1">
                        {p.city.split(" · ")[1] ?? p.city}
                      </p>
                    )}
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
