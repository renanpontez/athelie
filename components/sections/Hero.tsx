import Image from "next/image";
import { CTA } from "@/components/ui/CTA";

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
 * Athelie hero — full-bleed background image with a single column of
 * centered editorial copy and one CTA. Data is Sanity-driven; `body` is
 * rendered as a short tagline beneath the headline.
 */
// Temporary visual override while we evaluate the hero treatment.
// Move to Sanity (page.sections[0].backgroundImage) once approved.
const HERO_IMAGE_OVERRIDE = "/rafaholanda.webp";

export function Hero({
  headline,
  body,
  ctaPrimary,
  feature,
}: Props) {
  const imageSrc = HERO_IMAGE_OVERRIDE || feature?.image;
  const imageAlt = feature?.imageAlt ?? "";

  return (
    <section className="hero relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-bone-2">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="hero-image object-cover"
          />
        )}

        <div className="absolute inset-0 bg-bone/55 pointer-events-none" />

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bone/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bone/70 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 min-h-[100svh] container-edge flex flex-col items-center justify-center text-center pt-32 pb-20">
        {headline && (
          <h1 className="font-display text-[clamp(3.25rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-ink max-w-[18ch]">
            {headline}
          </h1>
        )}

        {body && (
          <p className="mt-5 font-mono-label text-ink-2 tracking-[0.32em] uppercase text-[0.7rem] md:text-xs max-w-[56ch] line-clamp-1 fade-up">
            {body}
          </p>
        )}

        {ctaPrimary && (
          <div className="mt-10 fade-up">
            <CTA
              href={ctaPrimary.href}
              variant="primary"
              external={ctaPrimary.external}
            >
              {ctaPrimary.label}
            </CTA>
          </div>
        )}
      </div>
    </section>
  );
}
