import { defineField, defineType } from "sanity";

/**
 * "Quem somos" — split layout with the sócias portrait on the left and a
 * short intro headline + paragraph on the right. Different from
 * `foundersSection` (which renders names+roles cards) — this is the
 * editorial intro block used on /sobre.
 */
export const foundersIntroSection = defineType({
  name: "foundersIntroSection",
  title: "Sócias · intro com retrato",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Quem somos" }),
    defineField({ name: "heading", type: "richHeadline" }),
    defineField({ name: "body", type: "text", rows: 4 }),
    defineField({
      name: "portrait",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Texto alternativo" }],
    }),
    defineField({
      name: "captionLeft",
      type: "string",
      description: "ex.: Andressa Hora",
    }),
    defineField({
      name: "captionCenter",
      type: "string",
      description: "ex.: +",
    }),
    defineField({
      name: "captionRight",
      type: "string",
      description: "ex.: Tainah Hora",
    }),
  ],
  preview: { prepare: () => ({ title: "Sócias · intro com retrato" }) },
});
