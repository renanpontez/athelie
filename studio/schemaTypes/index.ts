import type { SchemaTypeDefinition } from "sanity";

// objects
import { seo } from "./objects/seo";
import { cta } from "./objects/cta";
import { richHeadline } from "./objects/richHeadline";

// documents
import { siteSettings } from "./documents/siteSettings";
import { navigation } from "./documents/navigation";
import { page } from "./documents/page";
import { project } from "./documents/project";
import { projectCategory } from "./documents/projectCategory";
import { service } from "./documents/service";
import { founder } from "./documents/founder";
import { pillar } from "./documents/pillar";

// blocks (page builder)
import { heroSection } from "./blocks/heroSection";
import { pageIntroSection } from "./blocks/pageIntroSection";
import { manifestoSection } from "./blocks/manifestoSection";
import { featuredProjectsSection } from "./blocks/featuredProjectsSection";
import { servicesSection } from "./blocks/servicesSection";
import { servicesDetailedSection } from "./blocks/servicesDetailedSection";
import { foundersSection } from "./blocks/foundersSection";
import { foundersIntroSection } from "./blocks/foundersIntroSection";
import { founderBiosSection } from "./blocks/founderBiosSection";
import { processSection } from "./blocks/processSection";
import { pillarsSection } from "./blocks/pillarsSection";
import { studioCitiesSection } from "./blocks/studioCitiesSection";
import { projectsByCategorySection } from "./blocks/projectsByCategorySection";
import { contactChannelsSection } from "./blocks/contactChannelsSection";
import { contactFormSection } from "./blocks/contactFormSection";
import { contactCtaSection } from "./blocks/contactCtaSection";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seo,
  cta,
  richHeadline,
  // documents
  siteSettings,
  navigation,
  page,
  project,
  projectCategory,
  service,
  founder,
  pillar,
  // blocks
  heroSection,
  pageIntroSection,
  manifestoSection,
  featuredProjectsSection,
  servicesSection,
  servicesDetailedSection,
  foundersSection,
  foundersIntroSection,
  founderBiosSection,
  processSection,
  pillarsSection,
  studioCitiesSection,
  projectsByCategorySection,
  contactChannelsSection,
  contactFormSection,
  contactCtaSection,
];
