import { defineField, defineType } from "sanity";

/**
 * Lists the cities where the studio operates. Defaults pull from
 * siteSettings.cities (resolved in the page builder), but can be overridden
 * locally per page if needed.
 */
export const studioCitiesSection = defineType({
  name: "studioCitiesSection",
  title: "Cidades",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Atendimento" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "body", type: "text", rows: 3 }),
    defineField({
      name: "cities",
      type: "array",
      of: [{ type: "string" }],
      description: "Vazio = usa siteSettings.cities.",
    }),
  ],
  preview: { prepare: () => ({ title: "Cidades" }) },
});
