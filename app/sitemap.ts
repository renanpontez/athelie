import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/client";
import {
  PROJECT_SLUGS_QUERY,
  SERVICE_SLUGS_QUERY,
} from "@/sanity/queries";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://atheliearquitetura.com.br"
).replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, serviceSlugs] = await Promise.all([
    sanityFetch<string[]>({
      query: PROJECT_SLUGS_QUERY,
      tags: ["projects"],
    }),
    sanityFetch<string[]>({
      query: SERVICE_SLUGS_QUERY,
      tags: ["services"],
    }),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1, lastModified: now },
    { url: `${SITE_URL}/sobre`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/servicos`, changeFrequency: "monthly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/projetos`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/contato`, changeFrequency: "yearly", priority: 0.6, lastModified: now },
  ];

  const projectRoutes: MetadataRoute.Sitemap = (projectSlugs ?? []).map((slug) => ({
    url: `${SITE_URL}/projetos/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: now,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = (serviceSlugs ?? []).map((slug) => ({
    url: `${SITE_URL}/servicos/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
