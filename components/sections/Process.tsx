import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";

type Step = { ordinal?: string; name: string; description?: string };

type Props = {
  label?: string;
  heading?: React.ReactNode;
  steps?: Step[];
};

export function Process({ label, heading, steps }: Props) {
  const list = steps ?? [];
  if (list.length === 0 && !heading) return null;

  return (
    <section className="bg-bone-2 py-24 md:py-32 reveal-on-scroll">
      <div className="container-edge">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            {label && <SectionLabel label={label} />}
            {heading && (
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[16ch] reveal-word">
                {heading}
              </h2>
            )}
          </div>
        </div>

        {list.length > 0 && (
          <>
            <div className="mt-16">
              <Hairline reveal />
            </div>

            <ol className="mt-12 relative grid grid-cols-1 md:grid-cols-4 gap-px bg-stone/30">
              <li className="absolute inset-x-0 top-0 hidden md:block list-none">
                <div className="h-px bg-sage-dark/40 progress-line" />
              </li>

              {list.map((step, i) => (
                <li
                  key={`${step.ordinal ?? i}-${step.name}`}
                  className="bg-bone-2 p-8 md:p-10 fade-up"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl text-ink/15 leading-none">
                      {step.ordinal ?? String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono-label text-stone">Etapa</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl text-ink">
                    {step.name}
                  </h3>
                  {step.description && (
                    <p className="mt-3 text-ink-2 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}
