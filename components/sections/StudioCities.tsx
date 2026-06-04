import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";

type Props = {
  label?: string;
  heading?: React.ReactNode;
  body?: string;
  cities?: string[];
};

export function StudioCities({ label, heading, body, cities }: Props) {
  if (!cities || cities.length === 0) return null;
  return (
    <section className="container-edge py-16 md:py-24 reveal-on-scroll">
      {label && <SectionLabel label={label} />}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10">
        <div className="md:col-span-5">
          {heading && (
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
              <span>{heading}</span>
            </h2>
          )}
          {body && (
            <p className="mt-6 text-ink-2 max-w-md fade-up">{body}</p>
          )}
        </div>
        <ul className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cities.map((city, i) => (
            <li key={city} className="fade-up">
              <Hairline className="mb-4" />
              <span className="font-mono-label text-stone">
                {String(i + 1).padStart(2, "0")} · Cidade
              </span>
              <p className="mt-3 font-display text-2xl text-ink">{city}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
