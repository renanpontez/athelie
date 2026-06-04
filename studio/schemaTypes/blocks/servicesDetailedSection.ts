import { defineField, defineType } from "sanity";

/**
 * "Em detalhe" cards for /servicos. Each card is a deep description with
 * an ordinal number, name, tagline, summary text, and an optional includes
 * list (first 4 shown). Pulls from `service` documents.
 */
export const servicesDetailedSection = defineType({
  name: "servicesDetailedSection",
  title: "Serviços · em detalhe",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Em detalhe" }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      description: "Vazio = todos os serviços por ordinal.",
    }),
  ],
  preview: { prepare: () => ({ title: "Serviços · em detalhe" }) },
});
