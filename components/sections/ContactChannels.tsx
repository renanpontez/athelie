import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { ArchIcon } from "@/components/ui/ArchIcon";

type Channel = {
  label: string;
  value?: string;
  href?: string;
  external?: boolean;
  lowercase?: boolean;
};

type Props = {
  label?: string;
  channels?: Channel[];
};

export function ContactChannels({ label, channels }: Props) {
  if (!channels || channels.length === 0) return null;
  return (
    <section className="container-edge py-12 md:py-16 reveal-on-scroll">
      {label && <SectionLabel label={label} />}
      <div className="mt-10">
        <Hairline reveal />
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/30">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href ?? "#"}
            target={c.external ? "_blank" : undefined}
            rel={c.external ? "noopener noreferrer" : undefined}
            className="group bg-bone p-8 md:p-10 fade-up flex flex-col gap-4 transition-colors duration-500 hover:bg-bone-2"
          >
            <header className="flex items-center justify-between">
              <span className="font-mono-label text-stone">{c.label}</span>
              <ArchIcon className="h-7 w-auto text-ink/40 transition-all duration-500 group-hover:text-sage-dark group-hover:-translate-y-0.5" />
            </header>
            {c.value && (
              <p
                className={`font-display text-xl md:text-2xl text-ink leading-tight ${
                  c.lowercase ? "lowercase" : ""
                }`}
              >
                {c.value}
              </p>
            )}
            <span className="mt-auto font-mono-label text-stone inline-flex items-center gap-2 group-hover:text-ink transition-colors duration-500">
              Abrir
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
          </a>
        ))}
      </div>
    </section>
  );
}
