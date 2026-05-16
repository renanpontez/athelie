import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { CTA } from "@/components/ui/CTA";
import { founders, foundersPortrait } from "@/lib/content";

export function Founders() {
  return (
    <section className="container-edge py-24 md:py-32 reveal-on-scroll">
      <SectionLabel ordinal="04" label="Sócias" />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-start">
        <div className="md:col-span-5 fade-up">
          <div className="portrait arch-top relative overflow-hidden bg-bone-2 aspect-[4/5]">
            {/* image sits in the lower 78% so the arch curves over breathing room above the heads */}
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
          <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] max-w-[20ch] reveal-word">
            <span>
              Duas <span className="italic text-sage-dark">visões</span>{" "}
              que se completam, uma só intenção.
            </span>
          </h2>

          <p className="mt-8 text-ink-2 max-w-md fade-up">
            A Atheliê nasceu da união entre delicadeza criativa e rigor de
            processo. Combinamos talentos únicos para transformar espaços em
            lugares que refletem personalidade e história.
          </p>

          <div className="mt-12 space-y-10">
            {founders.map((f) => (
              <div
                key={f.name}
                className="grid grid-cols-12 gap-4 items-start"
              >
                <div className="col-span-12 md:col-span-4">
                  <p className="font-display text-2xl text-ink">{f.name}</p>
                  <p className="font-mono-label text-stone mt-1">{f.role}</p>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <Hairline className="mb-4" reveal />
                  <p className="text-ink-2">{f.bio}</p>
                </div>
              </div>
            ))}
          </div>

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
