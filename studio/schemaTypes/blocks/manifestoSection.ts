import { defineField, defineType } from "sanity";

export const manifestoSection = defineType({
  name: "manifestoSection",
  title: "Manifesto",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Manifesto" }),
    defineField({
      name: "body",
      title: "Manifesto",
      type: "richHeadline",
      description:
        "Texto do manifesto. Selecione palavras e use o decorator 'Italic accent' para destacar em itálico/acento.",
    }),
  ],
  preview: { prepare: () => ({ title: "Manifesto" }) },
});
