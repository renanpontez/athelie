import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";

type Founder = {
  name: string;
  role?: string;
  bio?: string;
  trailing?: string;
};

type Props = {
  label?: string;
  founders?: Founder[];
};

/**
 * Detailed bios grid for /sobre — each card shows founder name, role, bio,
 * and a small trailing keyword line (Criação · Atmosfera · Direção visual).
 */
export function FounderBios({ label, founders }: Props) {
  if (!founders || founders.length === 0) return null;
  const total = String(founders.length).padStart(2, "0");

  return (
    <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
      <div className="container-edge">
        {label && <SectionLabel label={label} />}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/30">
          {founders.map((f, i) => (
            <article
              key={f.name}
              className="bg-bone-2 p-8 md:p-12 fade-up flex flex-col gap-6"
            >
              <header className="flex items-baseline justify-between">
                <span className="font-mono-label text-stone">
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
                {f.role && (
                  <span className="font-mono-label text-stone">{f.role}</span>
                )}
              </header>

              <h3 className="font-display text-4xl md:text-5xl leading-tight text-ink">
                {f.name}
              </h3>

              <Hairline />

              {f.bio && (
                <p className="text-ink-2 text-lg leading-relaxed">{f.bio}</p>
              )}

              {f.trailing && (
                <div className="font-mono-label text-stone mt-auto pt-6 border-t border-stone/30">
                  {f.trailing}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
