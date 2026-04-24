import { defineField, defineType } from "sanity";

export default defineType({
  name: "competition",
  title: "Competitions",
  type: "document",
  fields: [
    defineField({
      name: "isDefault",
      title: "Default",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "season",
      title: "Season",
      type: "number",
      description: "e.g. 1, 2, 3",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "League", value: "league" },
          { title: "Tournament", value: "tournament" },
          { title: "Preseason", value: "preseason" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "7s", value: "7" },
          { title: "5s", value: "5" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: [
          { title: "Co-ed", value: "coed" },
          { title: "Men", value: "men" },
          { title: "Women", value: "women" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const startDate = context.document?.startDate;
          if (!endDate || !startDate) return true;
          return endDate >= startDate || "End date must be on or after start date";
        }),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Active", value: "active" },
          { title: "Completed", value: "completed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Competition Logo",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      name: "name",
      type: "type",
      season: "season",
      logo: "logo",
    },
    prepare({
      name,
      type,
      season,
      logo,
    }: {
      name: string;
      type: string;
      season: number;
      logo: string;
    }) {
      return {
        title: name,
        subtitle: [season ? `Season ${season}` : null, type].filter(Boolean).join(" · "),
        media: logo,
      };
    },
  },
});
