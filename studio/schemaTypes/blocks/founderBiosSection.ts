import { defineField, defineType } from "sanity";

/**
 * Detailed founder bios grid for /sobre.
 * Pulls in `founder` documents by reference — coalesce(curated, all) so editors
 * can leave the array empty to mean "show all in order".
 */
export const founderBiosSection = defineType({
  name: "founderBiosSection",
  title: "Sócias · bios detalhadas",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", initialValue: "Sócias" }),
    defineField({
      name: "founders",
      type: "array",
      of: [{ type: "reference", to: [{ type: "founder" }] }],
      description: "Vazio = todos os sócias em ordem.",
    }),
  ],
  preview: { prepare: () => ({ title: "Sócias · bios detalhadas" }) },
});
