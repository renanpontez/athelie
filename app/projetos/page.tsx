import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBuilder } from "@/components/page-builder/PageBuilder";
import { fetchPageData } from "@/sanity/lib/fetchPage";
import { buildMetadata } from "@/sanity/lib/metadata";
import { projectId } from "@/sanity/env";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { page, settings } = await fetchPageData("projetos");
  return buildMetadata({
    pageSeo: page?.seo,
    pageTitle: page?.title ?? "Projetos",
    settings,
    pathname: "/projetos",
  });
}

export default async function ProjetosPage() {
  const sanityConfigured = !!projectId;
  const { page, settings } = await fetchPageData("projetos");

  if (sanityConfigured && !page?.sections?.length) {
    throw new Error(
      "[projetos] PAGE_QUERY returned no page or no sections. Publish a `page` doc with slug=projetos in Sanity, then redeploy."
    );
  }

  if (!page?.sections?.length) notFound();

  return <PageBuilder sections={page.sections} settings={settings} />;
}
