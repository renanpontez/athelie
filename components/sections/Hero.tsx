import Image from "next/image";
import { CTA } from "@/components/ui/CTA";
import { DimensionLabel } from "@/components/ui/DimensionLabel";

type Feature = {
  image: string;
  imageAlt: string;
  projectName?: string;
  projectCity?: string;
  projectCategory?: string;
  projectYear?: number;
};

type CTAProp = { label: string; href: string; external?: boolean };

type Props = {
  eyebrow?: string;
  headline?: React.ReactNode;
  body?: string;
  ctaPrimary?: CTAProp;
  ctaSecondary?: CTAProp;
  dimensionLabel?: string;
  feature?: Feature;
};

/**
 * Athelie hero — full-bleed background image with editorial copy on the left
 * fading from bone. No hardcoded fallbacks: everything visible comes from
 * Sanity (or from `page.backup.tsx` if you need the legacy reference).
 */
export function Hero({
  eyebrow,
  headline,
  body,
  ctaPrimary,
  ctaSecondary,
  dimensionLabel,
  feature,
}: Props) {
  return (
    <section className="hero relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-bone-2">
        {feature?.image && (
          <Image
            src={feature.image}
            alt={feature.imageAlt}
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover"
          />
        )}

        <div className="absolute inset-0 bg-bone/15 mix-blend-lighten pointer-events-none" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(95deg, var(--color-bone) 0%, var(--color-bone) 28%, color-mix(in srgb, var(--color-bone) 85%, transparent) 48%, color-mix(in srgb, var(--color-bone) 35%, transparent) 70%, color-mix(in srgb, var(--color-bone) 10%, transparent) 100%)",
          }}
        />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bone/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bone/70 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 pt-32 md:pt-40 container-edge">
        {dimensionLabel && (
          <div className="flex items-center justify-end pb-12 md:pb-16">
            <DimensionLabel
              label={dimensionLabel}
              className="hidden md:inline-flex !text-ink-2"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start min-h-[60svh]">
          <div className="md:col-span-7">
            {eyebrow && (
              <p className="font-mono-label text-stone mb-6 reveal-word">
                <span>{eyebrow}</span>
              </p>
            )}

            {headline && (
              <h1 className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-ink">
                {headline}
              </h1>
            )}

            {body && (
              <p className="mt-10 max-w-md text-base md:text-lg text-ink-2 fade-up">
                {body}
              </p>
            )}

            {(ctaPrimary || ctaSecondary) && (
              <div className="mt-10 flex flex-wrap items-center gap-4 fade-up">
                {ctaPrimary && (
                  <CTA
                    href={ctaPrimary.href}
                    variant="primary"
                    external={ctaPrimary.external}
                  >
                    {ctaPrimary.label}
                  </CTA>
                )}
                {ctaSecondary && (
                  <CTA
                    href={ctaSecondary.href}
                    variant="ghost"
                    external={ctaSecondary.external}
                  >
                    {ctaSecondary.label}
                  </CTA>
                )}
              </div>
            )}
          </div>

          {feature?.projectName && (
            <div className="md:col-span-5 relative md:min-h-[55svh]">
              <div className="md:absolute md:bottom-0 md:right-0 flex flex-col items-start md:items-end gap-3 fade-up">
                <div className="font-mono-label text-ink flex items-center gap-2">
                  <span className="h-px w-6 bg-ink/40" />
                  <span>Projeto em destaque</span>
                </div>

                <div className="inline-flex items-center gap-3 rounded-full bg-bone/60 backdrop-blur-md px-4 py-2 font-mono-label shadow-soft ring-1 ring-bone/40">
                  <span className="block h-1.5 w-1.5 rounded-full bg-sage-dark" />
                  <span className="text-ink">{feature.projectName}</span>
                  {feature.projectCity && (
                    <span className="text-ink-2/80">
                      · {feature.projectCity}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
