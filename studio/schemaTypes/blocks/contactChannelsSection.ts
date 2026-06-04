import { defineArrayMember, defineField, defineType } from "sanity";

const channel = defineArrayMember({
  type: "object",
  name: "channel",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "string" }),
    defineField({ name: "href", type: "string" }),
    defineField({ name: "external", type: "boolean", initialValue: false }),
    defineField({ name: "lowercase", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "label", subtitle: "value" } },
});

/**
 * Contact channels grid on /contato — WhatsApp, phone, e-mail, Instagram, etc.
 * If `channels` is empty, the renderer builds a default set from siteSettings.
 */
export const contactChannelsSection = defineType({
  name: "contactChannelsSection",
  title: "Contato · canais",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Canais" }),
    defineField({
      name: "channels",
      type: "array",
      of: [channel],
      description: "Vazio = monta a partir do siteSettings.",
    }),
  ],
  preview: { prepare: () => ({ title: "Contato · canais" }) },
});
