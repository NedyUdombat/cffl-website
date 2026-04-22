import { defineField, defineType } from "sanity";

export default defineType({
  name: "replay",
  title: "Game Replay",
  type: "document",
  fields: [
    defineField({
      name: "team1",
      title: "Team 1",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Team Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "logo",
          title: "Team Logo",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "color",
          title: "Team Color",
          type: "string",
          description: "Enter a color hex (e.g. #FF0000) or CSS color name.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "team2",
      title: "Team 2",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Team Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "logo",
          title: "Team Logo",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "color",
          title: "Team Color",
          type: "string",
          description: "Enter a color hex (e.g. #0000FF) or CSS color name.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
});
