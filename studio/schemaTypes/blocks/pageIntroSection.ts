import { defineField, defineType } from "sanity";

/**
 * Internal-page hero (Sobre / Serviços / Projetos / Contato).
 *
 * Different shape from the homepage `heroSection` — separated per playbook
 * rule #1 (don't unify hero + page intro with a variant enum).
 */
export const pageIntroSection = defineType({
  name: "pageIntroSection",
  title: "Hero de página interna",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Sobre" }),
    defineField({ name: "headline", type: "richHeadline" }),
    defineField({ name: "body", type: "text", rows: 4 }),
  ],
  preview: {
    select: { subtitle: "label" },
    prepare: ({ subtitle }) => ({ title: "Hero de página interna", subtitle }),
  },
});
