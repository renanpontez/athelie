import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { ArchIcon } from "@/components/ui/ArchIcon";
import { CTA } from "@/components/ui/CTA";
import { sanityFetch } from "@/sanity/client";
import {
  SERVICE_DETAIL_QUERY,
  SERVICE_SLUGS_QUERY,
  SERVICES_INDEX_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { buildMetadata } from "@/sanity/lib/metadata";
import { projectId } from "@/sanity/env";
import type { ServiceDetail, SiteSettings } from "@/sanity/types";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

function safeImageUrl(image: unknown, width = 1600): string {
  if (!image || typeof image !== "object") return "";
  const asAny = image as { asset?: unknown };
  if (!asAny.asset) return "";
  try {
    return urlFor(image as never).width(width).url();
  } catch {
    return "";
  }
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: SERVICE_SLUGS_QUERY,
    tags: ["services"],
  });
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    sanityFetch<ServiceDetail | null>({
      query: SERVICE_DETAIL_QUERY,
      params: { slug },
      tags: [`service:${slug}`, "services"],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["settings"],
    }),
  ]);
  if (!service) return buildMetadata({ settings });
  return buildMetadata({
    pageSeo: service.seo,
    pageTitle: service.name,
    settings,
    pathname: `/servicos/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const sanityConfigured = !!projectId;

  const [service, settings, index] = await Promise.all([
    sanityFetch<ServiceDetail | null>({
      query: SERVICE_DETAIL_QUERY,
      params: { slug },
      tags: [`service:${slug}`, "services"],
    }),
    sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ["settings"],
    }),
    sanityFetch<ServiceDetail[]>({
      query: SERVICES_INDEX_QUERY,
      tags: ["services"],
    }),
  ]);

  if (sanityConfigured && !service) notFound();
  if (!service) notFound();

  const list = index ?? [];
  const idx = list.findIndex((s) => s.slug === slug);
  const next = list.length > 0 ? list[(idx + 1) % list.length] : null;

  const related = (service.relatedProjects ?? []).slice(0, 3);

  return (
    <>
      {/* hero */}
      <section className="page-intro container-edge pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="flex items-center justify-between pb-10">
          <Link
            href="/servicos"
            className="pretty-link font-mono-label text-ink inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M13 7 H1 M6 2 L1 7 L6 12"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
            Todos os serviços
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end">
          <div className="md:col-span-8">
            <SectionLabel label="Serviço" />
            <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-tight text-ink max-w-[14ch]">
              {service.name}.
            </h1>
            {service.tagline && (
              <p className="mt-6 italic text-sage-dark text-xl md:text-2xl">
                {service.tagline}
              </p>
            )}
            {service.description && (
              <p className="mt-8 max-w-lg text-lg text-ink-2">
                {service.description}
              </p>
            )}
          </div>

          <div className="md:col-span-4">
            <ArchIcon className="h-20 w-auto text-sage-dark/40" />
          </div>
        </div>
      </section>

      {/* para quem é */}
      {service.forWho && service.forWho.length > 0 && (
        <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
          <div className="container-edge">
            <SectionLabel label="Para quem é" />
            <div className="mt-8">
              <Hairline reveal />
            </div>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
              {service.forWho.map((item, i) => (
                <li
                  key={i}
                  className="bg-bone-2 p-8 md:p-10 fade-up flex flex-col gap-4"
                >
                  <span className="font-display text-5xl text-ink/15 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink-2 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* o que inclui */}
      {service.includes && service.includes.length > 0 && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <SectionLabel label="O que inclui" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10">
            <div className="md:col-span-4">
              <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink reveal-word">
                <span>Tudo o que entregamos no escopo deste serviço.</span>
              </h2>
            </div>
            <ul className="md:col-span-7 md:col-start-6 space-y-4">
              {service.includes.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 fade-up border-b border-stone/30 pb-4"
                >
                  <span className="font-mono-label text-stone min-w-[2rem] mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-ink-2 text-lg leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* etapas */}
      {service.steps && service.steps.length > 0 && (
        <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
          <div className="container-edge">
            <SectionLabel label="Como funciona" />
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[16ch] reveal-word">
              <span>Cada etapa, com um propósito.</span>
            </h2>
            <div className="mt-12">
              <Hairline reveal />
            </div>
            <ol className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-stone/30">
              {service.steps.map((step, i) => (
                <li key={i} className="bg-bone-2 p-8 md:p-10 fade-up">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl text-ink/15 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono-label text-stone">Etapa</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl text-ink">
                    {step.name}
                  </h3>
                  {step.description && (
                    <p className="mt-3 text-ink-2 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* diferenciais */}
      {service.differentiators && service.differentiators.length > 0 && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <SectionLabel label="Diferenciais" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.differentiators.map((d, i) => (
              <article
                key={i}
                className="rounded-3xl bg-bone-2 p-8 md:p-10 fade-up"
              >
                <ArchIcon className="h-12 w-auto text-sage-dark/60" />
                <h3 className="mt-6 font-display text-2xl md:text-3xl text-ink leading-tight">
                  {d.title}
                </h3>
                {d.description && (
                  <p className="mt-4 text-ink-2 leading-relaxed">
                    {d.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* projetos relacionados */}
      {related.length > 0 && (
        <section className="container-edge py-16 md:py-24 reveal-on-scroll">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <SectionLabel label="Cases relacionados" />
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
                <span>Projetos que nasceram deste serviço.</span>
              </h2>
            </div>
            <Link
              href="/projetos"
              className="pretty-link font-mono-label text-ink"
            >
              Ver portfólio completo
            </Link>
          </div>
          <div className="mt-10">
            <Hairline reveal />
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
            {related.map((p) => {
              const src = safeImageUrl(p.image, 1200);
              const categoryLabel = p.category?.name ?? "";
              return (
                <Link
                  key={p.slug}
                  href={`/projetos/${p.slug}`}
                  className="project-card group block fade-up"
                >
                  <div className="project-image relative overflow-hidden bg-bone-2 aspect-[4/5]">
                    {src && (
                      <Image
                        src={src}
                        alt={p.imageAlt ?? p.name}
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="font-mono-label text-stone">
                      {categoryLabel} · {p.year ?? ""}
                    </p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-ink">
                      {p.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* faq */}
      {service.faq && service.faq.length > 0 && (
        <section className="bg-bone-2 py-16 md:py-24 reveal-on-scroll">
          <div className="container-edge">
            <SectionLabel label="Perguntas frequentes" />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10">
              <div className="md:col-span-4">
                <h2 className="font-display text-3xl md:text-4xl leading-tight text-ink reveal-word">
                  <span>O que costumam perguntar.</span>
                </h2>
              </div>
              <dl className="md:col-span-7 md:col-start-6 space-y-6">
                {service.faq.map((item, i) => (
                  <div
                    key={i}
                    className="border-b border-stone/30 pb-6 fade-up"
                  >
                    <dt className="font-display text-xl md:text-2xl text-ink">
                      {item.q}
                    </dt>
                    {item.a && (
                      <dd className="mt-3 text-ink-2 leading-relaxed">
                        {item.a}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* next + CTA */}
      <section className="container-edge py-16 md:py-24 reveal-on-scroll">
        <div className="rounded-3xl bg-ink text-bone p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight max-w-[18ch] reveal-word">
            <span>
              Pronta(o) para começar com o{" "}
              <span className="italic text-sage">
                {service.name.toLowerCase()}
              </span>
              ?
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 md:justify-end fade-up">
            {settings?.whatsapp && (
              <a
                href={settings.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-3.5 text-sm tracking-wide text-ink transition-colors duration-500 hover:bg-sage hover:text-bone"
              >
                <span className="font-mono-label !tracking-[0.16em]">
                  Iniciar conversa
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7 H13 M8 2 L13 7 L8 12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                  />
                </svg>
              </a>
            )}
            {next && (
              <Link
                href={`/servicos/${next.slug}`}
                className="pretty-link font-mono-label text-bone inline-flex items-center gap-2"
              >
                Próximo serviço: {next.name}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  aria-hidden="true"
                >
                  <path
                    d="M1 7 H13 M8 2 L13 7 L8 12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
