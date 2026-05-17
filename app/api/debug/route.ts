/**
 * TEMPORARY debug endpoint — delete after diagnosing the Sanity fetch issue.
 * Returns what the server-side Sanity client actually sees on this deployment.
 */
import { sanityFetch } from "@/sanity/client";
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const env = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? null,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? null,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? null,
    hasReadToken: !!process.env.SANITY_READ_TOKEN,
    hasWriteToken: !!process.env.SANITY_WRITE_TOKEN,
    readTokenPrefix: process.env.SANITY_READ_TOKEN?.slice(0, 8) ?? null,
    NODE_ENV: process.env.NODE_ENV,
  };

  let homeResult: unknown = "(not attempted)";
  let homeError: string | null = null;
  let settingsResult: unknown = "(not attempted)";

  try {
    homeResult = await sanityFetch({
      query: PAGE_QUERY,
      params: { slug: "home" },
      tags: ["page:home"],
    });
  } catch (err) {
    homeError = err instanceof Error ? err.message : String(err);
  }

  try {
    settingsResult = await sanityFetch({
      query: SITE_SETTINGS_QUERY,
      tags: ["settings"],
    });
  } catch (err) {
    /* swallow */
  }

  return Response.json({
    env,
    homeSummary:
      homeResult && typeof homeResult === "object" && "sections" in homeResult
        ? {
            _id: (homeResult as { _id?: string })._id,
            slug: (homeResult as { slug?: string }).slug,
            sectionCount: (homeResult as { sections?: unknown[] }).sections?.length,
            types: (homeResult as { sections?: { _type?: string }[] }).sections?.map(
              (s) => s._type
            ),
          }
        : homeResult,
    homeError,
    settingsSummary:
      settingsResult && typeof settingsResult === "object" && settingsResult !== null
        ? {
            _id: (settingsResult as { _id?: string })._id,
            name: (settingsResult as { name?: string }).name,
            keys: Object.keys(settingsResult),
          }
        : settingsResult,
  });
}
