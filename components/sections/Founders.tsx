import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CTA } from "@/components/ui/CTA";

type Founder = { name: string; role?: string; bio?: string };

type Props = {
  label?: string;
  heading?: React.ReactNode;
  intro?: string;
  portrait?: { src: string; alt?: string };
  founders?: Founder[];
};

export function Founders({
  label,
  heading,
  intro,
  portrait,
  founders,
}: Props) {
  const list = founders ?? [];
  if (list.length === 0 && !heading && !portrait) return null;

  return (
    <section className="container-edge py-24 md:py-32 reveal-on-scroll">
      {label && <SectionLabel label={label} />}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-start">
        {portrait?.src && (
          <div className="md:col-span-5 fade-up">
            <div className="portrait arch-top relative overflow-hidden bg-bone-2 aspect-[4/5]">
              <div className="absolute inset-x-0 bottom-0 h-[78%]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt ?? ""}
                  fill
                  sizes="(min-width: 768px) 35vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            {list.length > 0 && (
              <div className="mt-4 flex justify-between font-mono-label text-stone">
                {list.slice(0, 3).map((f, i, arr) => (
                  <span key={f.name}>
                    {f.name}
                    {i < arr.length - 1 && <span className="ml-2">+</span>}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div
          className={
            portrait?.src ? "md:col-span-7 md:pl-8" : "md:col-span-12"
          }
        >
          {heading && (
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] max-w-[20ch] reveal-word">
              {heading}
            </h2>
          )}

          {intro && (
            <p className="mt-8 text-ink-2 max-w-md fade-up">{intro}</p>
          )}

          {list.length > 0 && (
            <div className="mt-12 space-y-10">
              {list.map((f) => (
                <div
                  key={f.name}
                  className="grid grid-cols-12 gap-4 items-start"
                >
                  <div className="col-span-12 md:col-span-4">
                    <p className="font-display text-2xl text-ink">{f.name}</p>
                    {f.role && (
                      <p className="font-mono-label text-stone mt-1">{f.role}</p>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <Hairline className="mb-4" reveal />
                    {f.bio && <p className="text-ink-2">{f.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12">
            <CTA href="/sobre" variant="underline">
              Conheça o estúdio
            </CTA>
          </div>
        </div>
      </div>
    </section>
  );
}
