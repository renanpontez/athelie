import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Props = {
  label?: string;
  heading?: React.ReactNode;
  body?: string;
  portrait?: { src: string; alt: string };
  captionLeft?: string;
  captionCenter?: string;
  captionRight?: string;
};

export function FoundersIntro({
  label,
  heading,
  body,
  portrait,
  captionLeft,
  captionCenter,
  captionRight,
}: Props) {
  return (
    <section className="container-edge py-16 md:py-24 reveal-on-scroll">
      {label && <SectionLabel label={label} />}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-center">
        {portrait?.src && (
          <div className="md:col-span-5 fade-up">
            <div className="portrait arch-top relative overflow-hidden bg-bone-2 aspect-[4/5]">
              <div className="absolute inset-x-0 bottom-0 h-[78%]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            {(captionLeft || captionCenter || captionRight) && (
              <div className="mt-4 flex justify-between font-mono-label text-stone">
                <span>{captionLeft}</span>
                <span>{captionCenter}</span>
                <span>{captionRight}</span>
              </div>
            )}
          </div>
        )}

        <div className="md:col-span-7 md:pl-8">
          {heading && (
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] max-w-[22ch] reveal-word">
              <span>{heading}</span>
            </h2>
          )}
          {body && (
            <p className="mt-8 text-ink-2 max-w-md fade-up">{body}</p>
          )}
        </div>
      </div>
    </section>
  );
}
