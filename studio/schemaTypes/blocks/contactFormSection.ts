import { defineField, defineType } from "sanity";

/**
 * Briefing form section on /contato. Wraps the existing ContactForm
 * client component; editor controls the surrounding copy (label, heading,
 * intro, sidebar items).
 */
export const contactFormSection = defineType({
  name: "contactFormSection",
  title: "Contato · formulário",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Briefing rápido" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({
      name: "sidebar",
      title: "Lista lateral (dt/dd)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "term",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "value",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "term", subtitle: "value" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Contato · formulário" }) },
});
