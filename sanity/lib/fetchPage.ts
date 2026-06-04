/**
 * Shared page fetcher used by every Sanity-driven route.
 *
 * Returns the page document for the given slug and the global siteSettings,
 * in a single parallel round-trip. Routes throw a loud build-time error when
 * Sanity IS configured but the page is missing — and 404 gracefully when
 * Sanity isn't configured at all (preview deploys without secrets).
 */
import { sanityFetch } from "@/sanity/client";
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { PageDoc, SiteSettings } from "@/sanity/types";

export async function fetchPageData(slug: string): Promise<{
  page: PageDoc | null;
  settings: SiteSettings | null;
}> {
  const [page, settings] = await Promise.all([
    sanityFetch<PageDoc | null>({
      query: PAGE_QUERY,
      params: { slug },
      tags: [`page:${slug}`, "page"],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["settings"],
    }),
  ]);
  return { page, settings };
}
