/**
 * Migration: seed the 4 internal page-builder docs (sobre / servicos / projetos
 * / contato) based on the content currently rendered by the hardcoded routes.
 *
 * Usage (from site/):
 *   npx tsx scripts/migrate-internal-pages.ts            # createIfNotExists (safe)
 *   npx tsx scripts/migrate-internal-pages.ts --force    # createOrReplace (destructive)
 *
 * Idempotent: by default this only creates pages that don't already exist —
 * so editors' Studio changes are never overwritten (playbook gotcha #10).
 * Pass --force to wipe and reseed.
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { studio } from "../lib/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;
const FORCE = process.argv.includes("--force");

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_WRITE_TOKEN (Editor role)");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

type Span = { plain?: string; italic?: string };

function rh(...segments: Span[]) {
  return [
    {
      _key: randomUUID().slice(0, 8),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: segments.map((seg) => ({
        _key: randomUUID().slice(0, 8),
        _type: "span",
        text: seg.italic ?? seg.plain ?? "",
        marks: seg.italic ? ["italicAccent"] : [],
      })),
    },
  ];
}

function rhMulti(...lines: Span[][]) {
  return lines.flatMap((line) => rh(...line));
}

async function createIfNotExists(doc: {
  _id: string;
  _type: string;
  [k: string]: unknown;
}) {
  if (FORCE) {
    await client.createOrReplace(doc);
    console.log(`  ✓ ${doc._type} · ${doc._id} (forced)`);
    return;
  }
  const existing = await client.getDocument(doc._id);
  if (existing) {
    console.log(`  · ${doc._id} exists — skip (--force to overwrite)`);
    return;
  }
  await client.create(doc);
  console.log(`  ✓ ${doc._type} · ${doc._id}`);
}

async function migrate() {
  console.log(`→ Seeding internal pages on ${projectId}/${dataset}\n`);

  /* ---------- /sobre ---------- */
  console.log("Sobre:");
  await createIfNotExists({
    _id: "page.sobre",
    _type: "page",
    title: "Sobre",
    slug: { _type: "slug", current: "sobre" },
    sections: [
      {
        _key: "intro",
        _type: "pageIntroSection",
        label: "Sobre",
        headline: rh(
          { plain: "Um estúdio feito de " },
          { italic: "duas vozes" },
          { plain: "." }
        ),
        body: "A Atheliê nasceu da união entre Andressa e Tainah Hora. Duas arquitetas com talentos complementares que se encontraram no amor pela arquitetura de interiores e pela ideia de transformar espaços em lugares com história.",
      },
      {
        _key: "manifesto",
        _type: "manifestoSection",
        label: "Manifesto",
        body: rh(
          { plain: "Acreditamos que cada projeto é uma oportunidade de " },
          { italic: "contar uma história única," },
          {
            plain:
              " unindo estética, funcionalidade e conforto em ambientes feitos para durar.",
          }
        ),
      },
      {
        _key: "foundersIntro",
        _type: "foundersIntroSection",
        label: "Quem somos",
        heading: rh(
          { plain: "Duas " },
          { italic: "visões" },
          { plain: " que se completam." }
        ),
        body: "Andressa traz a delicadeza criativa, a intuição estética e a espontaneidade. Tainah traz o rigor de processo, os paramétricos e a objetividade. Juntas, equilibram cada projeto entre atmosfera e precisão.",
        captionLeft: "Andressa Hora",
        captionCenter: "+",
        captionRight: "Tainah Hora",
      },
      {
        _key: "founderBios",
        _type: "founderBiosSection",
        label: "Sócias",
        // empty `founders[]` ⇒ coalesce falls back to all founder docs
      },
      {
        _key: "pillars",
        _type: "pillarsSection",
        label: "Valores",
        heading: rh({ plain: "Os três pilares de cada projeto." }),
      },
      {
        _key: "process",
        _type: "processSection",
        label: "Processo",
        heading: rh({ plain: "Como caminhamos com você." }),
        steps: [
          { _key: "p1", _type: "step", ordinal: "01", name: "Briefing", description: "Escutamos suas ideias, rotinas e referências. É aqui que nasce a identidade do projeto." },
          { _key: "p2", _type: "step", ordinal: "02", name: "Estudo", description: "Partido arquitetônico, moodboards e estudos volumétricos para alinhar a direção." },
          { _key: "p3", _type: "step", ordinal: "03", name: "Projeto", description: "Anteprojeto, executivo, detalhamento e especificações. Tudo pronto para a obra." },
          { _key: "p4", _type: "step", ordinal: "04", name: "Obra", description: "Acompanhamento técnico e curadoria de fornecedores até a entrega das chaves." },
        ],
      },
      {
        _key: "cities",
        _type: "studioCitiesSection",
        label: "Atendimento",
        heading: rh(
          { plain: "Onde a gente " },
          { italic: "trabalha" },
          { plain: "." }
        ),
      },
      {
        _key: "contact",
        _type: "contactCtaSection",
        label: "Contato",
        heading: rh(
          { plain: "Conta sua " },
          { italic: "história" },
          { plain: " pra gente." }
        ),
        ctaPrimary: { label: "Iniciar conversa", href: studio.whatsapp },
        ctaSecondary: { label: "Ver projetos", href: "/projetos" },
      },
    ],
  });

  /* ---------- /servicos ---------- */
  console.log("\nServiços:");
  await createIfNotExists({
    _id: "page.servicos",
    _type: "page",
    title: "Serviços",
    slug: { _type: "slug", current: "servicos" },
    sections: [
      {
        _key: "intro",
        _type: "pageIntroSection",
        label: "Serviços",
        headline: rh(
          { plain: "Três formas de trabalhar " },
          { italic: "juntos" },
          { plain: "." }
        ),
        body: "Da consultoria pontual ao acompanhamento integral de obra. Escolhemos juntos o formato que melhor se adapta à escala do seu projeto, ao seu prazo e ao seu orçamento.",
      },
      {
        _key: "services",
        _type: "servicesSection",
        label: "Comparativo",
        heading: rh({ plain: "Comparativo." }),
        // empty `services[]` ⇒ coalesce falls back to all service docs by ordinal
      },
      {
        _key: "servicesDetailed",
        _type: "servicesDetailedSection",
        label: "Em detalhe",
      },
      {
        _key: "contact",
        _type: "contactCtaSection",
        label: "Contato",
        heading: rh(
          { plain: "Não sabe qual " },
          { italic: "se encaixa" },
          { plain: "?" }
        ),
        ctaPrimary: { label: "Conversar", href: studio.whatsapp },
        ctaSecondary: { label: "Enviar mensagem", href: "/contato" },
      },
    ],
  });

  /* ---------- /projetos ---------- */
  console.log("\nProjetos:");
  await createIfNotExists({
    _id: "page.projetos",
    _type: "page",
    title: "Projetos",
    slug: { _type: "slug", current: "projetos" },
    sections: [
      {
        _key: "intro",
        _type: "pageIntroSection",
        label: "Projetos",
        headline: rh(
          { plain: "Cada espaço tem " },
          { italic: "sua história" },
          { plain: "." }
        ),
        body: "Uma seleção de projetos residenciais, comerciais e corporativos desenvolvidos pelo estúdio. Cada um com seu desafio, sua paleta e sua atmosfera.",
      },
      {
        _key: "byCategory",
        _type: "projectsByCategorySection",
        label: "Categorias",
        showAnchorNav: true,
      },
    ],
  });

  /* ---------- /contato ---------- */
  console.log("\nContato:");
  await createIfNotExists({
    _id: "page.contato",
    _type: "page",
    title: "Contato",
    slug: { _type: "slug", current: "contato" },
    sections: [
      {
        _key: "intro",
        _type: "pageIntroSection",
        label: "Contato",
        headline: rh(
          { plain: "Vamos " },
          { italic: "conversar" },
          { plain: "?" }
        ),
        body: "Estamos prontas para ouvir suas ideias, desenhar projetos e realizar sonhos. Conte sobre o seu espaço. Escolha o canal que for mais confortável para você.",
      },
      {
        _key: "channels",
        _type: "contactChannelsSection",
        label: "Canais",
        // empty channels ⇒ PageBuilder builds from siteSettings
      },
      {
        _key: "form",
        _type: "contactFormSection",
        label: "Briefing rápido",
        heading: rh(
          { plain: "Conta um pouco " },
          { italic: "sobre o projeto" },
          { plain: "." }
        ),
        body: "O formulário abaixo monta uma mensagem completa para a gente. Você revisa antes de enviar pelo WhatsApp.",
        sidebar: [
          { _key: "s1", term: "Atendimento", value: "Seg a sex · 9h – 18h" },
          { _key: "s2", term: "Resposta média", value: "1 dia útil" },
          { _key: "s3", term: "Idiomas", value: "Português · English" },
        ],
      },
      {
        _key: "cities",
        _type: "studioCitiesSection",
        label: "Onde atendemos",
        heading: rh(
          { plain: "Atendemos projetos em " },
          { italic: "três cidades" },
          { plain: "." }
        ),
        body: "Trabalhamos presencialmente em Fortaleza e remotamente em São Paulo e Alphaville, com viagens periódicas para acompanhamento de obra.",
      },
    ],
  });

  console.log("\n✓ Internal pages seed complete.");
}

migrate().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
