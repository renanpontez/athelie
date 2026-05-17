/**
 * BACKUP REFERENCE: original static homepage before Sanity took over.
 * Renders the 7 sections with explicit props sourced from lib/content.ts.
 * Use this file as the visual reference for what each section should look
 * like when fully populated. Next.js does NOT route this file because the
 * filename isn't `page.tsx`.
 */
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { Founders } from "@/components/sections/Founders";
import { Process } from "@/components/sections/Process";
import { ContactCTA } from "@/components/sections/ContactCTA";
import {
  studio,
  heroFeature,
  projects,
  services,
  founders,
  foundersPortrait,
  processSteps,
} from "@/lib/content";

const HERO_HEADLINE = (
  <>
    <span className="reveal-word">
      <span>Arquitetura</span>
    </span>
    <span className="block italic text-sage-dark reveal-word">
      <span>que conta</span>
    </span>
    <span className="block reveal-word">
      <span>a sua história.</span>
    </span>
  </>
);

// Mirrors the new richHeadline portable-text shape so the manifesto reveal
// animation runs identically to the Sanity-driven path.
const MANIFESTO_BODY = [
  {
    _type: "block" as const,
    children: [
      {
        _type: "span" as const,
        text: "Cada projeto é uma oportunidade de ",
      },
      {
        _type: "span" as const,
        text: "contar uma história única,",
        marks: ["italicAccent"],
      },
      {
        _type: "span" as const,
        text: " unindo estética, funcionalidade e conforto em ambientes feitos para durar.",
      },
    ],
  },
];

export default function StaticHomePage() {
  return (
    <>
      <Hero
        eyebrow="Estúdio de arquitetura de interiores"
        headline={HERO_HEADLINE}
        body="Projetos residenciais, comerciais e corporativos pensados nos detalhes, equilibrando estética, funcionalidade e conforto em ambientes feitos para durar."
        ctaPrimary={{ label: "Ver projetos", href: "#projetos" }}
        ctaSecondary={{
          label: "Fazer briefing",
          href: studio.whatsapp,
          external: true,
        }}
        dimensionLabel={studio.cities.join(" · ")}
        feature={heroFeature}
      />

      <Manifesto label="Manifesto" body={MANIFESTO_BODY} />

      <FeaturedProjects
        label="Projetos selecionados"
        heading={
          <span>
            Casas, lojas e escritórios feitos com{" "}
            <span className="italic text-sage-dark">pensamento</span>.
          </span>
        }
        projects={projects.slice(0, 4)}
        viewAllHref="/projetos"
        viewAllLabel="Ver portfólio completo"
      />

      <Services
        label="Serviços"
        heading={
          <span>
            Três formas de trabalhar{" "}
            <span className="italic text-sage-dark">juntos</span>.
          </span>
        }
        intro="Da consultoria pontual ao acompanhamento integral de obra. Escolhemos juntos o formato que melhor se adapta ao seu projeto."
        services={services.map((s) => ({
          slug: s.slug,
          name: s.name,
          tagline: s.tagline,
          description: s.description,
        }))}
      />

      <Founders
        label="Sócias"
        heading={
          <span>
            Duas <span className="italic text-sage-dark">visões</span>{" "}
            que se completam, uma só intenção.
          </span>
        }
        intro="A Atheliê nasceu da união entre delicadeza criativa e rigor de processo. Combinamos talentos únicos para transformar espaços em lugares que refletem personalidade e história."
        portrait={foundersPortrait}
        founders={founders}
      />

      <Process
        label="Processo"
        heading={<span>Como caminhamos com você, do briefing às chaves.</span>}
        steps={processSteps}
      />

      <ContactCTA
        label="Contato"
        heading={
          <span>
            Vamos <span className="italic text-sage-dark">conversar</span>?
          </span>
        }
        intro="Estamos prontas para ouvir suas ideias, desenhar projetos e realizar sonhos. Conte sobre o seu espaço e a gente responde em até um dia útil."
        ctaPrimaryLabel="Iniciar conversa"
        ctaSecondaryLabel="Enviar e-mail"
        contact={studio}
      />
    </>
  );
}
