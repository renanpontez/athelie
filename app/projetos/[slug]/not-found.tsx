import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CTA } from "@/components/ui/CTA";

export default function NotFound() {
  return (
    <section className="container-edge pt-40 pb-24 min-h-[70svh] flex flex-col items-start justify-center">
      <SectionLabel label="404" />
      <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-tight text-ink max-w-[16ch]">
        Esse projeto não foi <span className="italic text-sage-dark">encontrado</span>.
      </h1>
      <p className="mt-8 max-w-md text-ink-2">
        O endereço pode ter mudado ou o projeto ainda não foi publicado.
        Que tal voltar para o portfólio completo?
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <CTA href="/projetos" variant="primary">
          Ver projetos
        </CTA>
        <Link href="/" className="pretty-link font-mono-label text-ink">
          Voltar para o início
        </Link>
      </div>
    </section>
  );
}
