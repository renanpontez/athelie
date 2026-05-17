/**
 * Migration: seed Sanity with the data currently in lib/content.ts.
 *
 * Usage:
 *   1. Put the env vars in .env.local (NEXT_PUBLIC_SANITY_PROJECT_ID,
 *      NEXT_PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN).
 *   2. From site/: npx tsx scripts/migrate-to-sanity.ts
 *
 * Idempotent: uses `createOrReplace` so re-runs overwrite by deterministic _id.
 *
 * Schema notes (post-cleanup):
 *   - Section blocks no longer have `ordinal`.
 *   - Manifesto section no longer has `segments`; uses `body: richHeadline`.
 *   - `heading`, `intro`, `viewAllLink`, ctaPrimary/Secondary are populated.
 */
import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import {
  studio,
  navigation,
  projects,
  services,
  founders,
  pillars,
  processSteps,
} from "../lib/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_WRITE_TOKEN (Editor role)");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ---------- helpers ----------

const id = (prefix: string, slug: string) =>
  `${prefix}.${slug.replace(/[^a-z0-9-]/gi, "-")}`;

type Span = { plain?: string; italic?: string };

/**
 * Build a richHeadline portable-text array from an ordered list of plain/italic
 * segments. One block per call (== one visual line). For multi-line headings
 * call rh() once per line and concat.
 */
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

async function upsert(doc: { _id: string; _type: string; [k: string]: unknown }) {
  const res = await client.createOrReplace(doc);
  console.log(`  ✓ ${doc._type} · ${doc._id}`);
  return res;
}

// ---------- migration ----------

async function migrate() {
  console.log(`→ Migrating to ${projectId}/${dataset}\n`);

  console.log("Site settings:");
  await upsert({
    _id: "siteSettings",
    _type: "siteSettings",
    name: studio.name,
    shortName: studio.shortName,
    tagline: studio.tagline,
    manifesto: studio.manifesto,
    cities: studio.cities,
    phone: studio.phone,
    phoneHref: studio.phoneHref,
    email: studio.email,
    whatsapp: studio.whatsapp,
    instagram: studio.instagram,
    instagramHandle: studio.instagramHandle,
  });

  console.log("\nNavigation:");
  await upsert({
    _id: "navigation",
    _type: "navigation",
    primary: navigation.map((n) => ({
      _type: "navLink",
      _key: n.href,
      label: n.label,
      href: n.href,
    })),
    footer: navigation.map((n) => ({
      _type: "navLink",
      _key: `f-${n.href}`,
      label: n.label,
      href: n.href,
    })),
  });

  console.log("\nProjects:");
  const projectRefs: Record<string, string> = {};
  for (const p of projects) {
    const _id = id("project", p.slug);
    projectRefs[p.slug] = _id;
    await upsert({
      _id,
      _type: "project",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      city: p.city,
      year: p.year,
      area: p.area,
      scope: p.scope,
      summary: p.summary,
      description: p.description,
      // Images are still remote URLs in lib/content.ts. Upload assets manually
      // in Studio (drag-drop) or extend this with client.assets.upload.
      imageAlt: p.imageAlt,
    });
  }

  console.log("\nServices:");
  const serviceRefs: Record<string, string> = {};
  for (const s of services) {
    const _id = id("service", s.slug);
    serviceRefs[s.slug] = _id;
    await upsert({
      _id,
      _type: "service",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      tagline: s.tagline,
      description: s.description,
      forWho: s.forWho,
      includes: s.includes,
      steps: s.steps?.map((step, i) => ({
        _key: `step-${i}`,
        _type: "step",
        ...step,
      })),
      differentiators: s.differentiators?.map((d, i) => ({
        _key: `d-${i}`,
        _type: "differentiator",
        ...d,
      })),
      faq: s.faq?.map((f, i) => ({ _key: `faq-${i}`, _type: "faq", ...f })),
      relatedProjects: s.relatedProjectSlugs
        ?.map((sl) =>
          projectRefs[sl]
            ? { _type: "reference", _ref: projectRefs[sl], _key: `ref-${sl}` }
            : null
        )
        .filter(Boolean),
    });
  }

  console.log("\nFounders:");
  const founderRefs: string[] = [];
  for (let i = 0; i < founders.length; i++) {
    const f = founders[i];
    const _id = id("founder", f.name.toLowerCase().replace(/\s+/g, "-"));
    founderRefs.push(_id);
    await upsert({
      _id,
      _type: "founder",
      name: f.name,
      role: f.role,
      bio: f.bio,
      order: i,
    });
  }

  console.log("\nPillars:");
  for (let i = 0; i < pillars.length; i++) {
    const p = pillars[i];
    const _id = id("pillar", p.name.toLowerCase().replace(/\s+/g, "-"));
    await upsert({
      _id,
      _type: "pillar",
      name: p.name,
      description: p.description,
      order: i,
    });
  }

  console.log("\nHome page:");
  await upsert({
    _id: "page.home",
    _type: "page",
    title: "Início",
    slug: { _type: "slug", current: "home" },
    sections: [
      {
        _key: "hero",
        _type: "heroSection",
        eyebrow: "Estúdio de arquitetura de interiores",
        headline: rhMulti(
          [{ plain: "Arquitetura" }],
          [{ italic: "que conta" }],
          [{ plain: "a sua história." }]
        ),
        body: "Projetos residenciais, comerciais e corporativos pensados nos detalhes, equilibrando estética, funcionalidade e conforto em ambientes feitos para durar.",
        ctaPrimary: { label: "Ver projetos", href: "#projetos" },
        ctaSecondary: { label: "Fazer briefing", href: studio.whatsapp },
        featuredProject: projectRefs["escritorio-pwr"]
          ? { _type: "reference", _ref: projectRefs["escritorio-pwr"] }
          : undefined,
      },
      {
        _key: "manifesto",
        _type: "manifestoSection",
        label: "Manifesto",
        body: rh(
          { plain: "Cada projeto é uma oportunidade de " },
          { italic: "contar uma história única," },
          {
            plain:
              " unindo estética, funcionalidade e conforto em ambientes feitos para durar.",
          }
        ),
      },
      {
        _key: "projects",
        _type: "featuredProjectsSection",
        label: "Projetos selecionados",
        heading: rh(
          { plain: "Casas, lojas e escritórios feitos com " },
          { italic: "pensamento" },
          { plain: "." }
        ),
        viewAllLink: {
          label: "Ver portfólio completo",
          href: "/projetos",
        },
        projects: projects.slice(0, 4).map((p, i) => ({
          _type: "reference",
          _key: `p-${i}`,
          _ref: projectRefs[p.slug],
        })),
      },
      {
        _key: "services",
        _type: "servicesSection",
        label: "Serviços",
        heading: rh(
          { plain: "Três formas de trabalhar " },
          { italic: "juntos" },
          { plain: "." }
        ),
        intro:
          "Da consultoria pontual ao acompanhamento integral de obra. Escolhemos juntos o formato que melhor se adapta ao seu projeto.",
        services: services.map((s, i) => ({
          _type: "reference",
          _key: `s-${i}`,
          _ref: serviceRefs[s.slug],
        })),
      },
      {
        _key: "founders",
        _type: "foundersSection",
        label: "Sócias",
        heading: rh(
          { plain: "Duas " },
          { italic: "visões" },
          { plain: " que se completam, uma só intenção." }
        ),
        intro:
          "A Atheliê nasceu da união entre delicadeza criativa e rigor de processo. Combinamos talentos únicos para transformar espaços em lugares que refletem personalidade e história.",
        founders: founderRefs.map((ref, i) => ({
          _type: "reference",
          _key: `f-${i}`,
          _ref: ref,
        })),
      },
      {
        _key: "process",
        _type: "processSection",
        label: "Processo",
        heading: rh({
          plain: "Como caminhamos com você, do briefing às chaves.",
        }),
        steps: processSteps.map((s, i) => ({
          _key: `st-${i}`,
          _type: "step",
          ...s,
        })),
      },
      {
        _key: "contact",
        _type: "contactCtaSection",
        label: "Contato",
        heading: rh(
          { plain: "Vamos " },
          { italic: "conversar" },
          { plain: "?" }
        ),
        intro:
          "Estamos prontas para ouvir suas ideias, desenhar projetos e realizar sonhos. Conte sobre o seu espaço e a gente responde em até um dia útil.",
        ctaPrimary: { label: "Iniciar conversa", href: studio.whatsapp },
        ctaSecondary: { label: "Enviar e-mail", href: `mailto:${studio.email}` },
      },
    ],
  });

  console.log("\n✓ Migration complete.");
}

migrate().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
