import { groq } from "next-sanity";

/* ---------- shared fragments ---------- */

export const PROJECT_CARD_FRAGMENT = groq`{
  _id,
  name,
  "slug": slug.current,
  "category": category->{ _id, name, "slug": slug.current, order },
  city,
  year,
  area,
  scope,
  summary,
  image,
  imageAlt
}`;

export const PROJECT_DETAIL_FRAGMENT = groq`{
  _id,
  name,
  "slug": slug.current,
  "category": category->{ _id, name, "slug": slug.current, order },
  city,
  year,
  area,
  scope,
  summary,
  description,
  image,
  imageAlt,
  gallery[]{
    "src": asset->url,
    "image": @,
    alt
  },
  seo
}`;

export const SERVICE_DETAIL_FRAGMENT = groq`{
  _id,
  name,
  "slug": slug.current,
  ordinal,
  tagline,
  description,
  forWho,
  includes,
  steps,
  differentiators,
  faq,
  "relatedProjects": relatedProjects[]->${PROJECT_CARD_FRAGMENT},
  seo
}`;

/**
 * SECTION_FRAGMENT — one branch per block _type.
 * `coalesce(curated, fallback)` lets editors leave reference arrays empty
 * to mean "show all in default order" (playbook GROQ rule).
 */
export const SECTION_FRAGMENT = groq`
  _key,
  _type == "heroSection" => {
    _type, _key, eyebrow, headline, body, ctaPrimary, ctaSecondary, backgroundImage,
    "featuredProject": featuredProject->${PROJECT_CARD_FRAGMENT}
  },
  _type == "pageIntroSection" => {
    _type, _key, label, headline, body
  },
  _type == "manifestoSection" => { _type, _key, label, body },
  _type == "featuredProjectsSection" => {
    _type, _key, label, heading, viewAllLink,
    "projects": projects[]->${PROJECT_CARD_FRAGMENT}
  },
  _type == "servicesSection" => {
    _type, _key, label, heading, intro,
    "services": coalesce(
      services[]->{ _id, name, "slug": slug.current, tagline, description, ordinal },
      *[_type == "service"] | order(ordinal asc){ _id, name, "slug": slug.current, tagline, description, ordinal }
    )
  },
  _type == "servicesDetailedSection" => {
    _type, _key, label,
    "services": coalesce(
      services[]->{ _id, name, "slug": slug.current, tagline, description, ordinal, includes },
      *[_type == "service"] | order(ordinal asc){ _id, name, "slug": slug.current, tagline, description, ordinal, includes }
    )
  },
  _type == "foundersSection" => {
    _type, _key, label, heading, intro, portrait,
    "founders": coalesce(
      founders[]->{ _id, name, role, bio, portrait, order },
      *[_type == "founder"] | order(order asc){ _id, name, role, bio, portrait, order }
    )
  },
  _type == "foundersIntroSection" => {
    _type, _key, label, heading, body, portrait,
    captionLeft, captionCenter, captionRight
  },
  _type == "founderBiosSection" => {
    _type, _key, label,
    "founders": coalesce(
      founders[]->{ _id, name, role, bio, portrait, order },
      *[_type == "founder"] | order(order asc){ _id, name, role, bio, portrait, order }
    )
  },
  _type == "processSection" => { _type, _key, label, heading, steps },
  _type == "pillarsSection" => {
    _type, _key, label, heading,
    "pillars": coalesce(
      pillars[]->{ _id, name, description, order },
      *[_type == "pillar"] | order(order asc){ _id, name, description, order }
    )
  },
  _type == "studioCitiesSection" => {
    _type, _key, label, heading, body, cities
  },
  _type == "projectsByCategorySection" => {
    _type, _key, label, showAnchorNav,
    "categories": coalesce(
      categories[]->{
        _id, name, "slug": slug.current, order,
        "projects": *[_type == "project" && references(^._id)] | order(year desc, name asc)${PROJECT_CARD_FRAGMENT}
      },
      *[_type == "projectCategory" && count(*[_type == "project" && references(^._id)]) > 0] | order(order asc){
        _id, name, "slug": slug.current, order,
        "projects": *[_type == "project" && references(^._id)] | order(year desc, name asc)${PROJECT_CARD_FRAGMENT}
      }
    )
  },
  _type == "contactChannelsSection" => {
    _type, _key, label,
    channels[]{ label, value, href, external, lowercase }
  },
  _type == "contactFormSection" => {
    _type, _key, label, heading, body,
    sidebar[]{ term, value }
  },
  _type == "contactCtaSection" => { _type, _key, label, heading, intro, ctaPrimary, ctaSecondary }
`;

/* ---------- queries ---------- */

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]{
  _id, name, shortName, tagline, manifesto, cities,
  phone, phoneHref, email, whatsapp, instagram, instagramHandle,
  defaultSeo
}`;

export const NAVIGATION_QUERY = groq`*[_type == "navigation"][0]{
  companyName,
  "logo": logo{
    ...,
    alt
  },
  primary[]{ label, href },
  footer[]{ label, href }
}`;

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seo,
  sections[]{${SECTION_FRAGMENT}}
}`;

export const PROJECTS_INDEX_QUERY = groq`*[_type == "project"] | order(year desc, name asc)${PROJECT_CARD_FRAGMENT}`;

export const PROJECT_DETAIL_QUERY = groq`*[_type == "project" && slug.current == $slug][0]${PROJECT_DETAIL_FRAGMENT}`;

export const PROJECT_SLUGS_QUERY = groq`*[_type == "project" && defined(slug.current)][].slug.current`;

export const SERVICES_INDEX_QUERY = groq`*[_type == "service"] | order(ordinal asc)${SERVICE_DETAIL_FRAGMENT}`;

export const SERVICE_DETAIL_QUERY = groq`*[_type == "service" && slug.current == $slug][0]${SERVICE_DETAIL_FRAGMENT}`;

export const SERVICE_SLUGS_QUERY = groq`*[_type == "service" && defined(slug.current)][].slug.current`;

export const FOUNDERS_QUERY = groq`*[_type == "founder"] | order(order asc)`;

export const PILLARS_QUERY = groq`*[_type == "pillar"] | order(order asc)`;
