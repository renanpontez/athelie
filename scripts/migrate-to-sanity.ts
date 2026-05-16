/**
 * One-time migration: seed Sanity with the data currently in lib/content.ts.
 *
 * Usage:
 *   1. Create the Sanity project (see plan §8).
 *   2. Put these in .env.local:
 *        NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *        NEXT_PUBLIC_SANITY_DATASET=production
 *        SANITY_WRITE_TOKEN=...  (Editor role; create at sanity.io → Project → API → Tokens)
 *   3. From site/: npx tsx scripts/migrate-to-sanity.ts
 *
 * Idempotent: uses `createOrReplace` so re-runs overwrite by deterministic _id.
 */
import { createClient } from "@sanity/client";
import {
  studio,
  navigation,
  projects,
  services,
  founders,
  pillars,
  processSteps,
  heroFeature,
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

async function upsert(doc: { _id: string; _type: string; [k: string]: unknown }) {
  const res = await client.createOrReplace(doc);
  console.log(`  ✓ ${doc._type} · ${doc._id}`);
  return res;
}

// ---------- migration ----------

async function migrate() {
  console.log(`→ Migrating to ${projectId}/${dataset}\n`);

  // 1. site settings (singleton)
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

  // 2. navigation (singleton)
  console.log("\nNavigation:");
  await upsert({
    _id: "navigation",
    _type: "navigation",
    primary: navigation.map((n) => ({ _type: "navLink", _key: n.href, label: n.label, href: n.href })),
    footer: navigation.map((n) => ({ _type: "navLink", _key: `f-${n.href}`, label: n.label, href: n.href })),
  });

  // 3. projects
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
      // Images: stored as remote URLs in lib/content.ts. Sanity needs uploaded assets.
      // We seed the alt text + a marker; uploading remote URLs as assets is left manual
      // (or extend this script with client.assets.upload).
      imageAlt: p.imageAlt,
    });
  }

  // 4. services
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
      ordinal: s.ordinal,
      tagline: s.tagline,
      description: s.description,
      forWho: s.forWho,
      includes: s.includes,
      steps: s.steps?.map((step, i) => ({ _key: `step-${i}`, _type: "step", ...step })),
      differentiators: s.differentiators?.map((d, i) => ({ _key: `d-${i}`, _type: "differentiator", ...d })),
      faq: s.faq?.map((f, i) => ({ _key: `faq-${i}`, _type: "faq", ...f })),
      relatedProjects: s.relatedProjectSlugs?.map((sl) =>
        projectRefs[sl]
          ? { _type: "reference", _ref: projectRefs[sl], _key: `ref-${sl}` }
          : null
      ).filter(Boolean),
    });
  }

  // 5. founders
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

  // 6. pillars
  console.log("\nPillars:");
  const pillarRefs: string[] = [];
  for (let i = 0; i < pillars.length; i++) {
    const p = pillars[i];
    const _id = id("pillar", p.name.toLowerCase().replace(/\s+/g, "-"));
    pillarRefs.push(_id);
    await upsert({
      _id,
      _type: "pillar",
      ordinal: p.ordinal,
      name: p.name,
      description: p.description,
      order: i,
    });
  }

  // 7. home page (page builder)
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
        body:
          "Projetos residenciais, comerciais e corporativos pensados nos detalhes, equilibrando estética, funcionalidade e conforto em ambientes feitos para durar.",
        featuredProject: projectRefs[heroFeature.projectName.toLowerCase().replace(/\s+/g, "-")] ??
          projectRefs["escritorio-pwr"]
          ? { _type: "reference", _ref: projectRefs["escritorio-pwr"] }
          : undefined,
      },
      { _key: "manifesto", _type: "manifestoSection", ordinal: "01", label: "Manifesto" },
      {
        _key: "projects",
        _type: "featuredProjectsSection",
        ordinal: "02",
        label: "Projetos selecionados",
        projects: projects.slice(0, 4).map((p, i) => ({
          _type: "reference",
          _key: `p-${i}`,
          _ref: projectRefs[p.slug],
        })),
      },
      {
        _key: "services",
        _type: "servicesSection",
        ordinal: "03",
        label: "Serviços",
        services: services.map((s, i) => ({
          _type: "reference",
          _key: `s-${i}`,
          _ref: serviceRefs[s.slug],
        })),
      },
      {
        _key: "founders",
        _type: "foundersSection",
        ordinal: "04",
        label: "Sócias",
        founders: founderRefs.map((ref, i) => ({
          _type: "reference",
          _key: `f-${i}`,
          _ref: ref,
        })),
      },
      {
        _key: "process",
        _type: "processSection",
        ordinal: "05",
        label: "Processo",
        steps: processSteps.map((s, i) => ({ _key: `st-${i}`, _type: "step", ...s })),
      },
      {
        _key: "contact",
        _type: "contactCtaSection",
        ordinal: "06",
        label: "Contato",
      },
    ],
  });

  console.log("\n✓ Migration complete.");
}

migrate().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
