import { defineField, defineType } from "sanity";

export default defineType({
  name: "player",
  title: "Players",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "jerseyName",
      title: "Jersey Name",
      type: "string",
    }),
    defineField({
      name: "jerseyNumber",
      title: "Jersey Number",
      type: "number",
    }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: [
          { title: "Male", value: "male" },
          { title: "Female", value: "female" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "photo",
      title: "Player photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
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
          { title: "Linebacker (LB)", value: "LB" },
          { title: "Cornerback (CB)", value: "CB" },
          { title: "Safety (S)", value: "S" },
          { title: "Rusher (RSH)", value: "RSH" },
        ],
        layout: "list",
      },
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
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      photo: "photo",
      gender: "gender",
    },
    prepare({ firstName, lastName, photo, gender }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: gender,
        media: photo,
      };
    },
  },
});
