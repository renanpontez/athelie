import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { ArchIcon } from "@/components/ui/ArchIcon";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import {
  studio,
  founders,
  foundersPortrait,
  pillars,
  processSteps,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre · Atheliê Arquitetura",
  description:
    "Conheça a Atheliê Arquitetura. Estúdio fundado por Andressa e Tainah Hora, dedicado a projetos de arquitetura de interiores que unem estética, funcionalidade e conforto.",
};

export default function SobrePage() {
  return (
    <>
      {/* hero */}
      <section className="page-intro container-edge pt-32 md:pt-40 pb-12 md:pb-20">
        <div className="flex items-center justify-between pb-12 md:pb-16">
          <DimensionLabel label={`Est. 2021 · ${studio.cities.length} cidades`} />
          <DimensionLabel
            label={studio.cities.join(" · ")}
            className="hidden md:inline-flex"
          />
        </div>

        <SectionLabel ordinal="01" label="Sobre" total="07" />
        <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-ink max-w-[15ch]">
          Um estúdio feito de{" "}
          <span className="italic text-sage-dark">duas vozes</span>.
        </h1>
        <p className="mt-10 max-w-xl text-lg md:text-xl text-ink-2">
          A Atheliê nasceu da união entre Andressa e Tainah Hora. Duas
          arquitetas com talentos complementares que se encontraram no amor
          pela arquitetura de interiores e pela ideia de transformar espaços
          em lugares com história.
        </p>
      </section>

      {/* manifesto */}
      <section className="container-edge py-16 md:py-24 manifesto-section reveal-on-scroll">
        <SectionLabel ordinal="02" label="Manifesto" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-2 hidden md:block pt-6">
            <Hairline reveal />
          </div>
          <p className="md:col-span-10 font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.2] text-ink max-w-[40ch]">
            <span className="manifesto-word inline-block opacity-30">Acreditamos </span>
            <span className="manifesto-word inline-block opacity-30">que </span>
            <span className="manifesto-word inline-block opacity-30">cada </span>
            <span className="manifesto-word inline-block opacity-30">projeto </span>
            <span className="manifesto-word inline-block opacity-30">é </span>
            <span className="manifesto-word inline-block opacity-30">uma </span>
            <span className="manifesto-word inline-block opacity-30">oportunidade </span>
            <span className="manifesto-word inline-block opacity-30">de </span>
            <span className="italic text-sage-dark">
              <span className="manifesto-word inline-block opacity-30">contar </span>
              <span className="manifesto-word inline-block opacity-30">uma </span>
              <span className="manifesto-word inline-block opacity-30">história </span>
              <span className="manifesto-word inline-block opacity-30">única, </span>
            </span>
            <span className="manifesto-word inline-block opacity-30">unindo </span>
            <span className="manifesto-word inline-block opacity-30">estética, </span>
            <span className="manifesto-word inline-block opacity-30">funcionalidade </span>
            <span className="manifesto-word inline-block opacity-30">e </span>
            <span className="manifesto-word inline-block opacity-30">conforto </span>
            <span className="manifesto-word inline-block opacity-30">em </span>
            <span className="manifesto-word inline-block opacity-30">ambientes </span>
            <span className="manifesto-word inline-block opacity-30">feitos </span>
            <span className="manifesto-word inline-block opacity-30">para </span>
            <span className="manifesto-word inline-block opacity-30">durar.</span>
          </p>
        </div>
      </section>

      {/* portrait + intro */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <SectionLabel ordinal="03" label="Quem somos" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-center">
          <div className="md:col-span-5 fade-up">
            <div className="portrait arch-top relative overflow-hidden bg-bone-2 aspect-[4/5]">
              <div className="absolute inset-x-0 bottom-0 h-[78%]">
                <Image
                  src={foundersPortrait.src}
                  alt={foundersPortrait.alt}
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between font-mono-label text-stone">
              <span>Andressa Hora</span>
              <span>+</span>
              <span>Tainah Hora</span>
            </div>
          </div>

          <div className="md:col-span-7 md:pl-8">
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] max-w-[22ch] reveal-word">
              <span>
                Duas <span className="italic text-sage-dark">visões</span> que
                se completam.
              </span>
            </h2>
            <p className="mt-8 text-ink-2 max-w-md fade-up">
              Andressa traz a delicadeza criativa, a intuição estética e a
              espontaneidade. Tainah traz o rigor de processo, os
              paramétricos e a objetividade. Juntas, equilibram cada projeto
              entre atmosfera e precisão.
            </p>
          </div>
        </div>
      </section>

      {/* bios detalhadas */}
      <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
        <div className="container-edge">
          <SectionLabel ordinal="04" label="Sócias" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-stone/30">
            {founders.map((f, i) => (
              <article
                key={f.name}
                className="bg-bone-2 p-8 md:p-12 fade-up flex flex-col gap-6"
              >
                <header className="flex items-baseline justify-between">
                  <span className="font-mono-label text-stone">
                    {String(i + 1).padStart(2, "0")} / 02
                  </span>
                  <span className="font-mono-label text-stone">{f.role}</span>
                </header>

                <h3 className="font-display text-4xl md:text-5xl leading-tight text-ink">
                  {f.name}
                </h3>

                <Hairline />

                <p className="text-ink-2 text-lg leading-relaxed">{f.bio}</p>

                <div className="font-mono-label text-stone mt-auto pt-6 border-t border-stone/30">
                  {i === 0 ? "Criação · Atmosfera · Direção visual" : "Processo · Paramétricos · Identidade"}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* pilares */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <SectionLabel ordinal="05" label="Valores" />
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
              <span>Os três pilares de cada projeto.</span>
            </h2>
          </div>
        </div>

        <div className="mt-12">
          <Hairline reveal />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
          {pillars.map((p) => (
            <article
              key={p.ordinal}
              className="bg-bone p-8 md:p-10 fade-up flex flex-col gap-6"
            >
              <header className="flex items-start justify-between">
                <span className="font-mono-label text-stone">
                  {p.ordinal} / 03
                </span>
                <ArchIcon className="h-10 w-auto text-sage-dark/50" />
              </header>
              <h3 className="font-display text-3xl md:text-4xl leading-tight text-ink">
                {p.name}
              </h3>
              <p className="text-ink-2 leading-relaxed">{p.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* processo (resumo) */}
      <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
        <div className="container-edge">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <SectionLabel ordinal="06" label="Processo" />
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
                <span>Como caminhamos com você.</span>
              </h2>
            </div>
          </div>

          <ol className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-px bg-stone/30">
            {processSteps.map((step) => (
              <li key={step.ordinal} className="bg-bone-2 p-8 md:p-10 fade-up">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl text-ink/15 leading-none">
                    {step.ordinal}
                  </span>
                  <span className="font-mono-label text-stone">Etapa</span>
                </div>
                <h3 className="mt-8 font-display text-2xl text-ink">
                  {step.name}
                </h3>
                <p className="mt-3 text-ink-2 leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* atendimento */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <SectionLabel ordinal="07" label="Atendimento" />
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10">
          <div className="md:col-span-5">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
              <span>
                Onde a gente <span className="italic text-sage-dark">trabalha</span>.
              </span>
            </h2>
          </div>
          <ul className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {studio.cities.map((city, i) => (
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

      {/* CTA */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="rounded-3xl bg-bone-2 p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
            <span>
              Conta sua{" "}
              <span className="italic text-sage-dark">história</span> pra gente.
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:justify-end fade-up">
            <CTA href={studio.whatsapp} variant="primary" external>
              Iniciar conversa
            </CTA>
            <Link
              href="/projetos"
              className="pretty-link font-mono-label text-ink inline-flex items-center gap-2"
            >
              Ver projetos
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <path
                  d="M1 7 H13 M8 2 L13 7 L8 12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
