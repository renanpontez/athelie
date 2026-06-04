import { SectionLabel } from "@/components/ui/SectionLabel";

type Props = {
  label?: string;
  headline?: React.ReactNode;
  body?: string;
};

/**
 * Hero used by every internal route (sobre / servicos / projetos / contato).
 */
export function PageIntro({ label, headline, body }: Props) {
  return (
    <section className="page-intro container-edge pt-32 md:pt-40 pb-12 md:pb-20">
      {label && <SectionLabel label={label} />}

      {headline && (
        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-[15ch]">
          {headline}
        </h1>
      )}

      {body && (
        <p className="mt-10 max-w-xl text-lg md:text-xl text-ink-2">{body}</p>
      )}
    </section>
  );
}
