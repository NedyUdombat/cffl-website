import { defineField, defineType } from "sanity";

export default defineType({
  name: "match",
  title: "Matches",
  type: "document",
  fields: [
    defineField({
      name: "matchDay",
      title: "Match Day",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "matchNumber",
      title: "Match Number",
      type: "number",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Time",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "homeTeam",
      title: "Home Team",
      type: "reference",
      to: [{ type: "team" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "awayTeam",
      title: "Away Team",
      type: "reference",
      to: [{ type: "team" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "homeScore",
      title: "Home Score",
      type: "number",
    }),
    defineField({
      name: "awayScore",
      title: "Away Score",
      type: "number",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["scheduled", "completed", "cancelled"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "competition",
      title: "Competitions",
      type: "reference",
      to: [{ type: "competition" }],
    }),
  ],
  preview: {
    select: {
      homeTeam: "homeTeam.abbreviation",
      awayTeam: "awayTeam.abbreviation",
      homeScore: "homeScore",
      awayScore: "awayScore",
      date: "date",
      media: "competition.logo",
      matchNumber: "matchNumber",
    },
    prepare({ homeTeam, awayTeam, date, media, homeScore, awayScore, matchNumber }) {
      return {
        title: `${matchNumber}: ${homeTeam} vs ${awayTeam} (${date ? date : "TBD"})`,
        subtitle: `${homeScore ?? 0} - ${awayScore ?? 0}`,
        media,
      };
    },
  },
});
