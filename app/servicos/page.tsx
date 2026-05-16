import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { ArchIcon } from "@/components/ui/ArchIcon";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import { services, studio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Serviços — Atheliê Arquitetura",
  description:
    "Três formas de trabalhar com a Atheliê: Consultoria, Projeto Completo e Execução. Escolha o formato que melhor se adapta ao seu projeto.",
};

export default function ServicosPage() {
  return (
    <>
      <section className="page-intro container-edge pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="flex items-center justify-between pb-12 md:pb-16">
          <DimensionLabel label="03 serviços · 24" />
          <DimensionLabel
            label="Fortaleza · São Paulo · Alphaville"
            className="hidden md:inline-flex"
          />
        </div>

        <SectionLabel ordinal="01" label="Serviços" total="07" />
        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink max-w-[15ch]">
          Três formas de trabalhar{" "}
          <span className="italic text-sage-dark">juntos</span>.
        </h1>
        <p className="mt-10 max-w-md text-ink-2">
          Da consultoria pontual ao acompanhamento integral de obra —
          escolhemos juntos o formato que melhor se adapta à escala do seu
          projeto, ao seu prazo e ao seu orçamento.
        </p>
      </section>

      {/* comparativo rápido */}
      <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
        <div className="container-edge">
          <SectionLabel ordinal="02" label="Comparativo" />
          <div className="mt-8">
            <Hairline reveal />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
            {services.map((s) => (
              <article
                key={s.slug}
                className="bg-bone-2 p-8 md:p-10 fade-up flex flex-col gap-6"
              >
                <header className="flex items-start justify-between">
                  <span className="font-mono-label text-stone">
                    {s.ordinal} / 03
                  </span>
                  <ArchIcon className="h-10 w-auto text-ink/60" />
                </header>

                <div>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-2 italic text-sage-dark">{s.tagline}</p>
                </div>

                <div className="mt-auto pt-4 border-t border-stone/30" />

                <Link
                  href={`/servicos/${s.slug}`}
                  className="pretty-link inline-flex items-center gap-2 font-mono-label text-ink"
                >
                  Saiba mais
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 7 H13 M8 2 L13 7 L8 12"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      fill="none"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* deeper cards */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <SectionLabel ordinal="03" label="Em detalhe" />
        <div className="mt-12 space-y-20 md:space-y-32">
          {services.map((s) => (
            <article
              key={s.slug}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 fade-up"
            >
              <div className="md:col-span-4">
                <span className="font-display text-7xl md:text-8xl text-ink/15 leading-none">
                  {s.ordinal}
                </span>
                <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight text-ink">
                  {s.name}
                </h2>
                <p className="mt-3 italic text-sage-dark">{s.tagline}</p>
              </div>

              <div className="md:col-span-7 md:col-start-6">
                <Hairline className="mb-6" />
                <p className="text-ink-2 text-lg leading-relaxed">
                  {s.description}
                </p>

                {s.includes && (
                  <ul className="mt-8 space-y-3">
                    {s.includes.slice(0, 4).map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-ink-2"
                      >
                        <span className="font-mono-label text-stone min-w-[1.5rem] mt-1">
                          {String(i + 1).padStart(2, "0")}
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

      {/* CTA */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="rounded-3xl bg-bone-2 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[20ch] reveal-word">
            <span>
              Não sabe qual{" "}
              <span className="italic text-sage-dark">se encaixa</span>?
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:justify-end fade-up">
            <CTA href={studio.whatsapp} variant="primary" external>
              Conversar
            </CTA>
            <CTA href="/contato" variant="ghost">
              Enviar mensagem
            </CTA>
          </div>
        </div>
      </section>
    </>
  );
}
