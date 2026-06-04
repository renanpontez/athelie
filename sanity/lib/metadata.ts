/**
 * buildMetadata — three-tier fallback chain for page metadata.
 *
 *   page.seo  →  siteSettings.defaultSeo  →  hardcoded fallback
 *
 * Editors can override at any level. Routes call this from generateMetadata
 * with the data they already fetched via fetchPageData (no extra round-trip).
 */
import type { Metadata } from "next";
import type { Image as SanityImage } from "sanity";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/sanity/types";

const FALLBACK_TITLE = "Atheliê Arquitetura";
const FALLBACK_DESCRIPTION =
  "Estúdio de arquitetura de interiores fundado por Andressa e Tainah Hora. Projetos residenciais, comerciais e corporativos com estética, funcionalidade e conforto.";

type SeoLike = {
  title?: string;
  description?: string;
  image?: SanityImage;
};

function ogImageUrl(image: SanityImage | undefined): string | undefined {
  if (!image) return undefined;
  try {
    const url = urlFor(image).width(1200).url();
    return url || undefined;
  } catch {
    return undefined;
  }
}

export function buildMetadata({
  pageSeo,
  pageTitle,
  settings,
  pathname,
}: {
  pageSeo?: SeoLike;
  pageTitle?: string;
  settings?: (SiteSettings & { defaultSeo?: SeoLike }) | null;
  pathname?: string;
}): Metadata {
  const siteName = settings?.name ?? FALLBACK_TITLE;
  const defaultSeo = (settings as { defaultSeo?: SeoLike } | null | undefined)
    ?.defaultSeo;

  const baseTitle =
    pageSeo?.title ?? pageTitle ?? defaultSeo?.title ?? siteName;
  const title =
    baseTitle === siteName ? siteName : `${baseTitle} · ${siteName}`;

  const description =
    pageSeo?.description ??
    defaultSeo?.description ??
    settings?.tagline ??
    FALLBACK_DESCRIPTION;

  const image = ogImageUrl(pageSeo?.image) ?? ogImageUrl(defaultSeo?.image);

  return {
    title,
    description,
    alternates: pathname ? { canonical: pathname } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      siteName,
      url: pathname,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
    icons: { icon: "/logo.png" },
  };
}
