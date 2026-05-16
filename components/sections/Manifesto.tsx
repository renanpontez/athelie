import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";

export function Manifesto() {
  return (
    <section className="container-edge py-32 md:py-48 reveal-on-scroll">
      <SectionLabel ordinal="01" label="Manifesto" />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-2 hidden md:block">
          <Hairline reveal />
        </div>
        <p className="md:col-span-10 font-display text-[clamp(1.75rem,4.4vw,3.5rem)] leading-[1.15] text-ink max-w-[22ch]">
          <span className="reveal-word">
            <span>Cada projeto é</span>
          </span>{" "}
          <span className="reveal-word">
            <span>uma oportunidade</span>
          </span>{" "}
          <span className="reveal-word">
            <span>de</span>
          </span>{" "}
          <span className="reveal-word italic text-sage-dark">
            <span>contar uma história única</span>
          </span>{" "}
          <span className="reveal-word">
            <span>e deixar uma marca duradoura.</span>
          </span>
        </p>
      </div>
    </section>
  );
}
