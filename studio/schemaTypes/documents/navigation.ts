import { defineArrayMember, defineField, defineType } from "sanity";

const navLink = defineArrayMember({
  type: "object",
  name: "navLink",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  ],
});

export const navigation = defineType({
  name: "navigation",
  title: "Navegação",
  type: "document",
  groups: [
    { name: "brand", title: "Marca" },
    { name: "menus", title: "Menus" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "Nome da empresa",
      type: "string",
      group: "brand",
      description: "Texto que aparece ao lado da logo no header.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "brand",
      description: "Prefira PNG, SVG ou WebP. SVG escala melhor.",
      options: {
        hotspot: true,
        accept: "image/png,image/svg+xml,image/webp",
      },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description:
            'Descreve a logo para leitores de tela. Ex.: "Logo da Atheliê Arquitetura".',
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: "primary",
      title: "Menu principal",
      type: "array",
      group: "menus",
      of: [navLink],
    }),
    defineField({
      name: "footer",
      title: "Menu do rodapé",
      type: "array",
      group: "menus",
      of: [navLink],
    }),
  ],
  preview: {
    select: { title: "companyName", media: "logo" },
    prepare: ({ title, media }) => ({ title: title ?? "Navegação", media }),
  },
});
