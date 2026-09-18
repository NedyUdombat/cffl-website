import { defineField, defineType } from "sanity";

export default defineType({
  name: "media",
  title: "Media",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Image Title / Caption",
      type: "string",
      description: "Brief description or title of the image",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Game Day", value: "Game Day" },
          { title: "Fans", value: "Fans" },
          { title: "Teams", value: "Teams" },
          { title: "Behind the Scenes", value: "Behind the Scenes" },
          { title: "Community", value: "Community" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image",
    },
  },
});
