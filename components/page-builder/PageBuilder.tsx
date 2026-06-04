/**
 * PageBuilder
 * ----------
 * Maps Sanity section blocks to fully-typed React components.
 *
 * Pure data flow:
 *   PAGE_QUERY → sections[] → <PageBuilder> → typed section components
 *
 * Each section component is "data-in, render-out" (no module-level imports of
 * lib/content.ts). Defaults exist on the components for the static `page.backup.tsx`
 * fallback but the live page passes Sanity-derived props for everything.
 */
import { Hero } from "@/components/sections/Hero";
import { PageIntro } from "@/components/sections/PageIntro";
import { Manifesto } from "@/components/sections/Manifesto";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Services } from "@/components/sections/Services";
import { ServicesDetailed } from "@/components/sections/ServicesDetailed";
import { Founders } from "@/components/sections/Founders";
import { FoundersIntro } from "@/components/sections/FoundersIntro";
import { FounderBios } from "@/components/sections/FounderBios";
import { Process } from "@/components/sections/Process";
import { StudioCities } from "@/components/sections/StudioCities";
import { ProjectsByCategory } from "@/components/sections/ProjectsByCategory";
import { ContactChannels } from "@/components/sections/ContactChannels";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { urlFor } from "@/sanity/lib/image";
import type {
  Section,
  HeroSection,
  PageIntroSection,
  ManifestoSection,
  FeaturedProjectsSection,
  ServicesSection,
  ServicesDetailedSection,
  FoundersSection,
  FoundersIntroSection,
  FounderBiosSection,
  ProcessSection,
  PillarsSection,
  StudioCitiesSection,
  ProjectsByCategorySection,
  ContactChannelsSection,
  ContactFormSection as ContactFormSectionType,
  ContactCtaSection,
  SiteSettings,
  RichHeadline,
} from "@/sanity/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Hairline } from "@/components/ui/Hairline";
import { ArchIcon } from "@/components/ui/ArchIcon";

/* ---------- helpers ---------- */

function richHeadlineToReact(
  rh: RichHeadline | undefined,
  italicClass = "italic text-sage-dark"
): React.ReactNode {
  if (!rh) return null;
  return rh.flatMap((block, bi) =>
    block.children.map((c, ci) => {
      const key = `${bi}-${ci}`;
      const isItalic = c.marks?.includes("italicAccent");
      return isItalic ? (
        <span key={key} className={italicClass}>
          {c.text}
        </span>
      ) : (
        <span key={key}>{c.text}</span>
      );
    })
  );
}

/**
 * Same as richHeadlineToReact but each portable-text block (== editor pressed
 * Enter for a new line) renders on its own line and gets a .reveal-word wrap
 * for the per-line stagger animation used by Hero. Inline `italicAccent` marks
 * are preserved per-span so a single word can be italicized mid-line.
 */
function richHeadlineToHero(
  rh: RichHeadline | undefined,
  italicClass = "italic text-sage-dark"
): React.ReactNode {
  if (!rh || rh.length === 0) return null;
  return rh.map((block, bi) => {
    const lineClass = bi === 0 ? "reveal-word" : "block reveal-word";
    return (
      <span key={bi} className={lineClass}>
        <span>
          {block.children.map((c, ci) => {
            const isItalic = c.marks?.includes("italicAccent");
            return isItalic ? (
              <span key={ci} className={italicClass}>
                {c.text}
              </span>
            ) : (
              <span key={ci}>{c.text}</span>
            );
          })}
        </span>
      </span>
    );
  });
}

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

/* ---------- block renderers (one per _type) ---------- */

function HeroBlock({ block }: { block: HeroSection }) {
  const fp = block.featuredProject;
  const heroImage =
    safeImageUrl(block.backgroundImage, 2000) ||
    safeImageUrl(fp?.image, 2000);

  const ctaToProp = (c: { label: string; href?: string } | undefined) =>
    c && c.label
      ? {
          label: c.label,
          href: c.href ?? "#",
          external:
            (c.href ?? "").startsWith("http") ||
            (c.href ?? "").startsWith("mailto:"),
        }
      : undefined;

  return (
    <Hero
      eyebrow={block.eyebrow}
      headline={richHeadlineToHero(block.headline)}
      body={block.body}
      ctaPrimary={ctaToProp(block.ctaPrimary)}
      ctaSecondary={ctaToProp(block.ctaSecondary)}
      feature={
        fp || heroImage
          ? {
              image: heroImage,
              imageAlt: fp?.imageAlt ?? block.eyebrow ?? "",
              projectName: fp?.name ?? "",
              projectCity: fp?.city ?? "",
              projectCategory: fp?.category?.name ?? "",
              projectYear: fp?.year ?? new Date().getFullYear(),
            }
          : undefined
      }
    />
  );
}

function PageIntroBlock({ block }: { block: PageIntroSection }) {
  return (
    <PageIntro
      label={block.label}
      headline={richHeadlineToReact(block.headline)}
      body={block.body}
    />
  );
}

function ManifestoBlock({ block }: { block: ManifestoSection }) {
  return <Manifesto label={block.label} body={block.body} />;
}

function FeaturedProjectsBlock({ block }: { block: FeaturedProjectsSection }) {
  const mapped = (block.projects ?? []).map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category?.name ?? "",
    city: p.city ?? "",
    year: p.year ?? new Date().getFullYear(),
    image: safeImageUrl(p.image, 1600),
    imageAlt: p.imageAlt ?? "",
  }));
  return (
    <FeaturedProjects
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      projects={mapped.length > 0 ? mapped : undefined}
      viewAllHref={block.viewAllLink?.href}
      viewAllLabel={block.viewAllLink?.label}
    />
  );
}

function ServicesBlock({ block }: { block: ServicesSection }) {
  const mapped = (block.services ?? []).map((s) => ({
    slug: s.slug,
    name: s.name,
    tagline: s.tagline,
    description: s.description,
    ordinal: s.ordinal,
  }));
  return (
    <Services
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      intro={block.intro}
      services={mapped.length > 0 ? mapped : undefined}
    />
  );
}

function ServicesDetailedBlock({ block }: { block: ServicesDetailedSection }) {
  const mapped = (block.services ?? []).map((s, i) => ({
    slug: s.slug,
    name: s.name,
    ordinal: s.ordinal ?? String(i + 1).padStart(2, "0"),
    tagline: s.tagline,
    description: s.description,
    includes: s.includes,
  }));
  return (
    <ServicesDetailed
      label={block.label}
      services={mapped.length > 0 ? mapped : undefined}
    />
  );
}

function FoundersBlock({ block }: { block: FoundersSection }) {
  const portrait = block.portrait
    ? { src: safeImageUrl(block.portrait, 1200), alt: "Sócias" }
    : undefined;
  const mapped = (block.founders ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((f) => ({ name: f.name, role: f.role, bio: f.bio }));
  return (
    <Founders
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      intro={block.intro}
      portrait={portrait}
      founders={mapped.length > 0 ? mapped : undefined}
    />
  );
}

function FoundersIntroBlock({ block }: { block: FoundersIntroSection }) {
  const portrait = block.portrait
    ? { src: safeImageUrl(block.portrait, 1200), alt: "Sócias" }
    : undefined;
  return (
    <FoundersIntro
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      body={block.body}
      portrait={portrait}
      captionLeft={block.captionLeft}
      captionCenter={block.captionCenter}
      captionRight={block.captionRight}
    />
  );
}

function FounderBiosBlock({ block }: { block: FounderBiosSection }) {
  const mapped = (block.founders ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((f) => ({
      name: f.name,
      role: f.role,
      bio: f.bio,
    }));
  return <FounderBios label={block.label} founders={mapped} />;
}

function ProcessBlock({ block }: { block: ProcessSection }) {
  return (
    <Process
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      steps={block.steps}
    />
  );
}

/**
 * PillarsBlock — kept inline because Pillars currently renders on /sobre via
 * generic markup. The render mirrors the previous hardcoded section.
 */
function PillarsBlock({ block }: { block: PillarsSection }) {
  const pillars = (block.pillars ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  if (pillars.length === 0) return null;
  const total = String(pillars.length).padStart(2, "0");
  return (
    <section className="container-edge py-16 md:py-24 reveal-on-scroll">
      <div className="flex items-end justify-between flex-wrap gap-6">
        <div>
          {block.label && <SectionLabel label={block.label} />}
          {block.heading && (
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-[18ch] reveal-word">
              <span>{richHeadlineToReact(block.heading)}</span>
            </h2>
          )}
        </div>
      </div>
      <div className="mt-12">
        <Hairline reveal />
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-px bg-stone/30">
        {pillars.map((p, i) => (
          <article
            key={p._id}
            className="bg-bone p-8 md:p-10 fade-up flex flex-col gap-6"
          >
            <header className="flex items-start justify-between">
              <span className="font-mono-label text-stone">
                {String(i + 1).padStart(2, "0")} / {total}
              </span>
              <ArchIcon className="h-10 w-auto text-sage-dark/50" />
            </header>
            <h3 className="font-display text-3xl md:text-4xl leading-tight text-ink">
              {p.name}
            </h3>
            {p.description && (
              <p className="text-ink-2 leading-relaxed">{p.description}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function StudioCitiesBlock({
  block,
  settings,
}: {
  block: StudioCitiesSection;
  settings?: SiteSettings | null;
}) {
  const cities =
    block.cities && block.cities.length > 0
      ? block.cities
      : settings?.cities ?? [];
  return (
    <StudioCities
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      body={block.body}
      cities={cities}
    />
  );
}

function ProjectsByCategoryBlock({
  block,
}: {
  block: ProjectsByCategorySection;
}) {
  const groups = (block.categories ?? [])
    .map((cat) => ({
      key: cat.slug ?? cat._id ?? cat.name,
      label: cat.name,
      projects: (cat.projects ?? []).map((p) => ({
        slug: p.slug,
        name: p.name,
        category: cat.name,
        city: p.city ?? "",
        year: p.year ?? new Date().getFullYear(),
        image: safeImageUrl(p.image, 1600),
        imageAlt: p.imageAlt ?? "",
        summary: p.summary,
      })),
    }))
    .filter((g) => g.projects.length > 0);

  return (
    <ProjectsByCategory
      label={block.label}
      showAnchorNav={block.showAnchorNav}
      groups={groups}
    />
  );
}

function ContactChannelsBlock({
  block,
  settings,
}: {
  block: ContactChannelsSection;
  settings?: SiteSettings | null;
}) {
  type Channel = NonNullable<ContactChannelsSection["channels"]>[number];
  let channels: Channel[] = block.channels ?? [];
  if (channels.length === 0 && settings) {
    const built: Channel[] = [];
    if (settings.whatsapp)
      built.push({
        label: "WhatsApp",
        value: "Conversa direta",
        href: settings.whatsapp,
        external: true,
      });
    if (settings.phone)
      built.push({
        label: "Telefone",
        value: settings.phone,
        href: settings.phoneHref ?? `tel:${settings.phone}`,
        external: false,
      });
    if (settings.email)
      built.push({
        label: "E-mail",
        value: settings.email,
        href: `mailto:${settings.email}`,
        external: false,
        lowercase: true,
      });
    if (settings.instagram)
      built.push({
        label: "Instagram",
        value: settings.instagramHandle ?? "",
        href: settings.instagram,
        external: true,
      });
    channels = built;
  }
  return <ContactChannels label={block.label} channels={channels} />;
}

function ContactFormBlock({
  block,
  settings,
}: {
  block: ContactFormSectionType;
  settings?: SiteSettings | null;
}) {
  return (
    <ContactFormSection
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      body={block.body}
      sidebar={block.sidebar}
      whatsappUrl={settings?.whatsapp}
    />
  );
}

function ContactCtaBlock({
  block,
  settings,
}: {
  block: ContactCtaSection;
  settings?: SiteSettings | null;
}) {
  return (
    <ContactCTA
      label={block.label}
      heading={richHeadlineToReact(block.heading)}
      intro={block.intro}
      ctaPrimaryLabel={block.ctaPrimary?.label}
      ctaSecondaryLabel={block.ctaSecondary?.label}
      contact={
        settings
          ? {
              whatsapp: settings.whatsapp,
              email: settings.email,
              phone: settings.phone,
              phoneHref: settings.phoneHref,
              instagram: settings.instagram,
              instagramHandle: settings.instagramHandle,
              cities: settings.cities,
            }
          : undefined
      }
    />
  );
}

/* ---------- entry ---------- */

export function PageBuilder({
  sections,
  settings,
}: {
  sections?: Section[] | null;
  settings?: SiteSettings | null;
}) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        const key = section._key;
        switch (section._type) {
          case "heroSection":
            return <HeroBlock key={key} block={section} />;
          case "pageIntroSection":
            return <PageIntroBlock key={key} block={section} />;
          case "manifestoSection":
            return <ManifestoBlock key={key} block={section} />;
          case "featuredProjectsSection":
            return <FeaturedProjectsBlock key={key} block={section} />;
          case "servicesSection":
            return <ServicesBlock key={key} block={section} />;
          case "servicesDetailedSection":
            return <ServicesDetailedBlock key={key} block={section} />;
          case "foundersSection":
            return <FoundersBlock key={key} block={section} />;
          case "foundersIntroSection":
            return <FoundersIntroBlock key={key} block={section} />;
          case "founderBiosSection":
            return <FounderBiosBlock key={key} block={section} />;
          case "processSection":
            return <ProcessBlock key={key} block={section} />;
          case "pillarsSection":
            return <PillarsBlock key={key} block={section} />;
          case "studioCitiesSection":
            return (
              <StudioCitiesBlock
                key={key}
                block={section}
                settings={settings}
              />
            );
          case "projectsByCategorySection":
            return <ProjectsByCategoryBlock key={key} block={section} />;
          case "contactChannelsSection":
            return (
              <ContactChannelsBlock
                key={key}
                block={section}
                settings={settings}
              />
            );
          case "contactFormSection":
            return (
              <ContactFormBlock
                key={key}
                block={section}
                settings={settings}
              />
            );
          case "contactCtaSection":
            return (
              <ContactCtaBlock key={key} block={section} settings={settings} />
            );
          default:
            console.warn(
              `[PageBuilder] unknown section type: ${(section as Section)._type}`
            );
            return null;
        }
      })}
    </>
  );
}
