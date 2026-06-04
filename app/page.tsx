/**
 * Homepage — fully Sanity-driven, statically generated.
 *
 * Caching strategy:
 *   - Production: SSG with ISR. Built once at deploy, then refreshed on demand
 *     by the /api/revalidate webhook (instantaneous on Sanity publish) and as a
 *     safety net every `revalidate` seconds.
 *   - Local dev: sanityFetch uses `cache: "no-store"` so every page load hits
 *     Sanity live and you see your Studio edits without restarting.
 *
 * Build-time failure mode:
 *   - If Sanity is configured but the fetch returns null/empty, we THROW so the
 *     build fails loudly instead of baking a "not found" fallback into the
 *     static HTML (which would persist until the next deploy).
 *   - If Sanity is NOT configured (no projectId env), we render the friendly
 *     "publish in Studio" placeholder so initial setup doesn't crash.
 */
import type { Metadata } from "next";
import { PageBuilder } from "@/components/page-builder/PageBuilder";
import { fetchPageData } from "@/sanity/lib/fetchPage";
import { buildMetadata } from "@/sanity/lib/metadata";
import { projectId } from "@/sanity/env";

// ISR safety net — webhook is the primary invalidation path.
// 1 hour keeps us fresh even if a webhook is dropped.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await fetchPageData("home");
  return buildMetadata({
    pageSeo: page?.seo,
    pageTitle: page?.title,
    settings,
    pathname: "/",
  });
}

export default async function HomePage() {
  const sanityConfigured = !!projectId;
  const { page: home, settings } = await fetchPageData("home");

  if (sanityConfigured && !home?.sections?.length) {
    throw new Error(
      "[home] PAGE_QUERY returned no page or no sections. Publish a `page` doc with slug=home in Sanity, then redeploy."
    );
  }

  if (!home?.sections?.length) {
    return (
      <section className="container-edge pt-40 pb-24 min-h-[70svh] flex flex-col items-start justify-center">
        <h1 className="font-display text-4xl text-ink max-w-[20ch]">
          Homepage não encontrada no Sanity.
        </h1>
        <p className="mt-4 text-ink-2 max-w-md">
          Abra o Studio e publique uma página com slug <code>home</code>. Os
          dados ainda não chegaram ou a migração não foi executada.
        </p>
      </section>
    );
  }

  return <PageBuilder sections={home.sections} settings={settings} />;
}
