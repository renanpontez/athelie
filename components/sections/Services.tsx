import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { ArchIcon } from "@/components/ui/ArchIcon";
import { CTA } from "@/components/ui/CTA";

type ServiceCard = {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
};

type Props = {
  label?: string;
  heading?: React.ReactNode;
  intro?: string;
  services?: ServiceCard[];
};

export function Services({ label, heading, intro, services }: Props) {
  const list = services ?? [];
  if (list.length === 0 && !heading) return null;

  const total = String(list.length).padStart(2, "0");
  return (
    <section
      id="servicos"
      className="bg-bone-2 py-24 md:py-32 reveal-on-scroll"
    >
      <div className="container-edge">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            {label && <SectionLabel label={label} />}
            {heading && (
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[16ch] reveal-word">
                {heading}
              </h2>
            )}
          </div>
          {intro && <p className="max-w-sm text-ink-2 fade-up">{intro}</p>}
        </div>

        {list.length > 0 && (
          <>
            <div className="mt-16">
              <Hairline reveal />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
              {list.map((s, i) => (
                <article
                  key={s.slug}
                  className="service-card group relative bg-bone-2 p-8 md:p-10 transition-colors duration-700 hover:bg-bone fade-up"
                >
                  <header className="flex items-start justify-between">
                    <span className="font-mono-label text-stone">
                      {String(i + 1).padStart(2, "0")} / {total}
                    </span>
                    <ArchIcon className="h-10 w-auto text-ink/60 transition-all duration-700 group-hover:text-sage-dark group-hover:-translate-y-1" />
                  </header>

                  <h3 className="mt-12 font-display text-3xl md:text-4xl leading-tight text-ink">
                    {s.name}
                  </h3>
                  {s.tagline && (
                    <p className="mt-3 italic text-sage-dark">{s.tagline}</p>
                  )}

                  {s.description && (
                    <p className="mt-6 text-ink-2 leading-relaxed">
                      {s.description}
                    </p>
                  )}

                  <div className="mt-10">
                    <CTA href={`/servicos/${s.slug}`} variant="underline">
                      Saiba mais
                    </CTA>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
