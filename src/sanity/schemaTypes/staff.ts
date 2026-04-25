import { defineField, defineType } from "sanity";

export default defineType({
  name: "staff",
  title: "Staffs",
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
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Head Coach", value: "headCoach" },
          { title: "Assistant Coach", value: "assistantHeadCoach" },
          { title: "Offensive Coordinator", value: "offensiveCoordinator" },
          { title: "Defensive Coordinator", value: "defensiveCoordinator" },
          { title: "Team Manager", value: "teamManager" },
          { title: "Team Owner", value: "teamOwner" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "team",
      type: "reference",
      to: [{ type: "team" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
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
    }),
    defineField({
      name: "photo",
      title: "Staff photo",
      type: "image",
      options: { hotspot: true },
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
      role: "role",
    },
    prepare({ firstName, lastName, photo, role }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: role,
        media: photo,
      };
    },
  },
});
