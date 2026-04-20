import { defineField, defineType } from "sanity";

export default defineType({
  name: "rosterEntry",
  title: "Rosters",
  type: "document",
  fields: [
    defineField({
      name: "player",
      type: "reference",
      to: [{ type: "player" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "team",
      type: "reference",
      to: [{ type: "team" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "competition",
      type: "reference",
      to: [{ type: "competition" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isCaptain",
      title: "Captain?",
      type: "boolean",
      initialValue: false,
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
  ],
  preview: {
    select: {
      firstName: "player.firstName",
      lastName: "player.lastName",
      photo: "player.photo",
      gender: "gender",
      team: "team.abbreviation",
    },
    prepare({ firstName, lastName, photo, team, gender }) {
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${team} • ${gender}`,
        media: photo,
      };
    },
  },
});
