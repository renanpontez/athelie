import Image from "next/image";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";
import { studio, heroFeature } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero relative min-h-[100svh] overflow-hidden">
      {/* full-bleed background image */}
      <div className="absolute inset-0 bg-bone-2">
        <Image
          src={heroFeature.image}
          alt={heroFeature.imageAlt}
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />

        {/* warm bone tint to harmonize photo with the site palette */}
        <div className="absolute inset-0 bg-bone/15 mix-blend-lighten pointer-events-none" />

        {/* main gradient: solid bone on the left fades to image on the right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(95deg, var(--color-bone) 0%, var(--color-bone) 28%, color-mix(in srgb, var(--color-bone) 85%, transparent) 48%, color-mix(in srgb, var(--color-bone) 35%, transparent) 70%, color-mix(in srgb, var(--color-bone) 10%, transparent) 100%)",
          }}
        />

        {/* soft top + bottom vignette for header legibility */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bone/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bone/70 to-transparent pointer-events-none" />
      </div>

      {/* foreground content */}
      <div className="relative z-10 pt-32 md:pt-40 container-edge">
        <div className="flex items-center justify-end pb-12 md:pb-16">
          <DimensionLabel
            label="Fortaleza · São Paulo · Alphaville"
            className="hidden md:inline-flex !text-ink-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start min-h-[60svh]">
          {/* left column: editorial copy on bone tint */}
          <div className="md:col-span-7">
            <p className="font-mono-label text-stone mb-6 reveal-word">
              <span>Estúdio de arquitetura de interiores</span>
            </p>

            <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-ink">
              <span className="reveal-word">
                <span>Arquitetura</span>
              </span>
              <span className="block italic text-sage-dark reveal-word">
                <span>que conta</span>
              </span>
              <span className="block reveal-word">
                <span>a sua história.</span>
              </span>
            </h1>

            <p className="mt-10 max-w-md text-base md:text-lg text-ink-2 fade-up">
              Projetos residenciais, comerciais e corporativos pensados nos
              detalhes, equilibrando estética, funcionalidade e conforto em
              ambientes feitos para durar.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 fade-up">
              <CTA href="#projetos" variant="primary">
                Ver projetos
              </CTA>
              <CTA href={studio.whatsapp} variant="ghost" external>
                Fazer briefing
              </CTA>
            </div>
          </div>

          {/* right column: floating "projeto em destaque" pill over image */}
          <div className="md:col-span-5 relative md:min-h-[55svh]">
            <div className="md:absolute md:bottom-0 md:right-0 flex flex-col items-start md:items-end gap-3 fade-up">
              <div className="font-mono-label text-ink flex items-center gap-2">
                <span className="h-px w-6 bg-ink/40" />
                <span>Projeto em destaque</span>
              </div>

              <div className="inline-flex items-center gap-3 rounded-full bg-bone/60 backdrop-blur-md px-4 py-2 font-mono-label shadow-soft ring-1 ring-bone/40">
                <span className="block h-1.5 w-1.5 rounded-full bg-sage-dark" />
                <span className="text-ink">{heroFeature.projectName}</span>
                <span className="text-ink-2/80">
                  · {heroFeature.projectCity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
