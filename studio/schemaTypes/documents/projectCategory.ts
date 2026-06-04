import { defineField, defineType } from "sanity";

/**
 * Project category — promoted from a string enum to a reference doc per
 * playbook gotcha #8. Editors can now add/rename categories without a code
 * change. Cascade: project.category references this, projectsByCategorySection
 * orders by references, the renderer dereferences `p.category->name`.
 */
export const projectCategory = defineType({
  name: "projectCategory",
  title: "Categoria de projeto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Ordena a exibição no portfólio. Menor aparece primeiro.",
    }),
  ],
  orderings: [
    {
      title: "Ordem",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "slug.current" },
  },
});
