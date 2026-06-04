/**
 * Migration: convert `project.category` from string enum to reference of
 * `projectCategory` document type (playbook gotcha #8).
 *
 * Phases (idempotent — safe to re-run):
 *   1. Seed 3 projectCategory docs (residencial, comercial, corporativo)
 *   2. Patch every project doc (published AND drafts.*) whose `category` is
 *      still a string → reference. Drafts must be patched too or editors
 *      open them later and see broken fields (gotcha #6).
 *   3. Patch `page.projetos` projectsByCategorySection so `categories[]` is
 *      a refs array in the playbook-recommended order.
 *
 * Usage (from site/):
 *   node --env-file=.env.local --import=tsx scripts/migrate-categories.ts
 */
import { createClient } from "@sanity/client";

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

/* ---------- baseline categories ---------- */

const CATEGORIES = [
  { slug: "residencial", name: "Residencial", order: 1 },
  { slug: "comercial", name: "Comercial", order: 2 },
  { slug: "corporativo", name: "Corporativo", order: 3 },
] as const;

const catId = (slug: string) => `projectCategory.${slug}`;

/* ---------- helpers ---------- */

type ProjectDoc = {
  _id: string;
  _type: "project";
  category?: unknown;
};

async function ensureCategories(): Promise<Record<string, string>> {
  console.log("Phase 1 — projectCategory docs:");
  const refs: Record<string, string> = {};
  for (const c of CATEGORIES) {
    const _id = catId(c.slug);
    refs[c.slug] = _id;
    const existing = await client.getDocument(_id);
    if (existing) {
      console.log(`  · ${_id} exists — skip`);
      continue;
    }
    await client.create({
      _id,
      _type: "projectCategory",
      name: c.name,
      slug: { _type: "slug", current: c.slug },
      order: c.order,
    });
    console.log(`  ✓ ${_id} created`);
  }
  return refs;
}

async function patchProjects(refs: Record<string, string>) {
  console.log("\nPhase 2 — patching project.category (published + drafts):");
  // Pull every project, including drafts. We can't filter on "string" type
  // directly in GROQ, so fetch all and decide client-side.
  const docs = await client.fetch<ProjectDoc[]>(
    `*[_type == "project"]{ _id, _type, category }`
  );
  let patched = 0;
  let skipped = 0;
  let missing = 0;
  for (const doc of docs) {
    const cat = doc.category;
    // If it's already a reference object, skip.
    if (cat && typeof cat === "object" && "_ref" in (cat as object)) {
      skipped++;
      continue;
    }
    if (typeof cat !== "string") {
      missing++;
      continue;
    }
    const ref = refs[cat];
    if (!ref) {
      console.warn(
        `  ⚠ ${doc._id} has unknown category "${cat}" — skipping (extend CATEGORIES if you want this preserved)`
      );
      missing++;
      continue;
    }
    await client
      .patch(doc._id)
      .set({
        category: {
          _type: "reference",
          _ref: ref,
        },
      })
      .commit();
    console.log(`  ✓ ${doc._id} → ${ref}`);
    patched++;
  }
  console.log(
    `\n  patched=${patched}  already-ref=${skipped}  missing/unknown=${missing}`
  );
}

async function patchProjetosPage(refs: Record<string, string>) {
  console.log("\nPhase 3 — page.projetos projectsByCategorySection order:");
  const page = await client.getDocument("page.projetos");
  if (!page) {
    console.log("  · page.projetos not found — skip");
    return;
  }
  const sections = (page as { sections?: Array<{ _type?: string; _key?: string; categories?: unknown }> }).sections;
  if (!sections) {
    console.log("  · no sections — skip");
    return;
  }
  const idx = sections.findIndex(
    (s) => s._type === "projectsByCategorySection"
  );
  if (idx < 0) {
    console.log("  · no projectsByCategorySection — skip");
    return;
  }
  const section = sections[idx];
  // Already migrated?
  const currentCategories = section.categories as Array<{ _ref?: string }> | undefined;
  if (
    Array.isArray(currentCategories) &&
    currentCategories.length > 0 &&
    currentCategories[0]?._ref
  ) {
    console.log("  · categories[] already populated — skip");
    return;
  }
  const orderedRefs = CATEGORIES.map((c, i) => ({
    _key: `cat-${i}`,
    _type: "reference",
    _ref: refs[c.slug],
  }));
  await client
    .patch("page.projetos")
    .set({ [`sections[${idx}].categories`]: orderedRefs })
    .unset([`sections[${idx}].order`])
    .commit();
  console.log("  ✓ page.projetos categories[] set");
}

async function migrate() {
  console.log(`→ Category migration on ${projectId}/${dataset}\n`);
  const refs = await ensureCategories();
  await patchProjects(refs);
  await patchProjetosPage(refs);
  console.log("\n✓ Category migration complete.");
}

migrate().catch((err) => {
  console.error("✗ Migration failed:", err);
  process.exit(1);
});
