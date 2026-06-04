import { defineField, defineType } from "sanity";

/**
 * Anchored portfolio listing on /projetos — one section per category.
 * Categories are `projectCategory` documents. The renderer groups projects
 * by category and prefixes anchor nav for fast jumping.
 *
 * Leave `categories` empty to fall back to all projectCategory docs in
 * `order` asc (coalesce in GROQ).
 */
export const projectsByCategorySection = defineType({
  name: "projectsByCategorySection",
  title: "Projetos por categoria",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Projetos" }),
    defineField({
      name: "showAnchorNav",
      title: "Mostrar nav de âncoras",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "categories",
      title: "Categorias (ordem)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "projectCategory" }] }],
      description: "Vazio = todas as categorias por order asc.",
    }),
  ],
  preview: { prepare: () => ({ title: "Projetos por categoria" }) },
});
