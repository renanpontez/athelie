import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CTA } from "@/components/ui/CTA";

type ServiceCard = {
  slug: string;
  ordinal?: string;
  name: string;
  tagline?: string;
  description?: string;
  includes?: string[];
};

type Props = {
  label?: string;
  services?: ServiceCard[];
};

export function ServicesDetailed({ label, services }: Props) {
  if (!services || services.length === 0) return null;
  return (
    <section className="container-edge py-16 md:py-24 reveal-on-scroll">
      {label && <SectionLabel label={label} />}
      <div className="mt-12 space-y-20 md:space-y-32">
        {services.map((s, i) => (
          <article
            key={s.slug}
            className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 fade-up"
          >
            <div className="md:col-span-4">
              <span className="font-display text-7xl md:text-8xl text-ink/15 leading-none">
                {s.ordinal ?? String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight text-ink">
                {s.name}
              </h2>
              {s.tagline && (
                <p className="mt-3 italic text-sage-dark">{s.tagline}</p>
              )}
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <Hairline className="mb-6" />
              {s.description && (
                <p className="text-ink-2 text-lg leading-relaxed">
                  {s.description}
                </p>
              )}

              {s.includes && s.includes.length > 0 && (
                <ul className="mt-8 space-y-3">
                  {s.includes.slice(0, 4).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-ink-2"
                    >
                      <span className="font-mono-label text-stone min-w-[1.5rem] mt-1">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10">
                <CTA href={`/servicos/${s.slug}`} variant="underline">
                  Conhecer o serviço completo
                </CTA>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
