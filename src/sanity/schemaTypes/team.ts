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
      name: "foundedYear",
      title: "Founded Year",
      type: "number",
    }),
    defineField({
      name: "headCoach",
      title: "Head Coach",
      type: "string",
    }),
    defineField({
      name: "asstHeadCoach",
      title: "Assistant Head Coach",
      type: "string",
    }),
    defineField({
      name: "players",
      title: "Roster",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "firstName", title: "First Name", type: "string" },
            { name: "lastName", title: "Last Name", type: "string" },
            { name: "email", title: "Email", type: "email" },
            { name: "jerseyName", title: "Jersey Name", type: "string" },
            { name: "jerseyNumber", title: "Jersey Number", type: "number" },
            {
              name: "gender",
              title: "Gender",
              type: "string",
              options: {
                list: [
                  { title: "Male", value: "male" },
                  { title: "Female", value: "female" },
                  { title: "Non-binary", value: "non-binary" },
                  { title: "Prefer not to say", value: "prefer-not-to-say" },
                ],
                layout: "dropdown",
              },
            },
            { name: "photo", title: "Player Photo", type: "image", options: { hotspot: true } },
            { name: "isCaptain", title: "Captain?", type: "boolean" },
            {
              name: "positions",
              title: "Position(s)",
              type: "array",
              of: [{ type: "string" }],
              options: {
                list: [
                  { title: "Quarterback (QB)", value: "QB" },
                  { title: "Wide Receiver (WR)", value: "WR" },
                  { title: "Running Back (RB)", value: "RB" },
                  { title: "Center (C)", value: "C" },
                  { title: "Offensive Line (OL)", value: "OL" },
                  { title: "Defensive Line (DL)", value: "DL" },
                  { title: "Linebacker (LB)", value: "LB" },
                  { title: "Cornerback (CB)", value: "CB" },
                  { title: "Safety (S)", value: "S" },
                  { title: "Kicker (K)", value: "K" },
                ],
                layout: "grid",
              },
            },
            { name: "instagram", title: "Instagram Handle", type: "string" },
          ],
          preview: {
            select: { title: "firstName", subtitle: "lastName" },
          },
        },
      ],
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
