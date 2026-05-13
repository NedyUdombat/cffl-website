import { defineField, defineType } from "sanity";

export default defineType({
  name: "team",
  title: "Teams",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Team Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "abbreviation",
      title: "Abbreviation",
      description: "Short team code, e.g. 'NYG'",
      type: "string",
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "yearFounded",
      title: "Year Founded",
      type: "string",
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "logo",
      title: "Team Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bannerImage",
      title: "Banner Image",
      description: "Hero/cover image shown on the team page",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "primaryColor",
      title: "Primary Color",
      description: "Hex color code, e.g. #FF0000",
      type: "string",
    }),
    defineField({
      name: "secondaryColor",
      title: "Secondary Color",
      description: "Hex color code, e.g. #FFFFFF",
      type: "string",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "youtube", title: "Youtube URL", type: "url" },
        { name: "tiktok", title: "TikTok URL", type: "url" },
        { name: "twitter", title: "X URL", type: "url" },
      ],
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "email",
    }),
    defineField({
      name: "phone",
      title: "Contact phone",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "Team Website URL",
      type: "url",
    }),
    defineField({
      name: "isActive",
      title: "Active Team",
      description: "Uncheck to hide this team from the website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "yearFounded",
      media: "logo",
    },
  },
});
