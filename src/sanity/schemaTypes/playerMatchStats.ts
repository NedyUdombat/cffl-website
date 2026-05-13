import { defineField, defineType } from "sanity";

export default defineType({
  name: "playerMatchStats",
  title: "Player Match Stats",
  type: "document",
  fields: [
    defineField({
      name: "match",
      title: "Match",
      type: "reference",
      to: [{ type: "match" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rosterEntry",
      title: "Roster Entry",
      type: "reference",
      to: [{ type: "rosterEntry" }],
      validation: (Rule) => Rule.required(),
    }),

    // Snapshots — for Studio preview
    // defineField({
    //   name: "playerName",
    //   title: "Player Name (Snapshot)",
    //   type: "string",
    // }),
    // defineField({
    //   name: "jerseyNumber",
    //   title: "Jersey Number (Snapshot)",
    //   type: "number",
    // }),
    // defineField({
    //   name: "teamName",
    //   title: "Team Name (Snapshot)",
    //   type: "string",
    // }),

    // Scoring
    defineField({
      name: "passTds",
      title: "Passing Touchdowns",
      type: "number",
      description: "All TDs including pick-6s",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "interceptionTouchdowns",
      title: "Interception Touchdowns (Pick-6)",
      type: "number",
      description: "Sub-category of touchdowns scored on defense",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "extraPoints1pt",
      title: "Extra Points (1pt)",
      type: "number",
      description: "Count of successful 1-point conversions",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "extraPoints2pt",
      title: "Extra Points (2pt)",
      type: "number",
      description: "Count of successful 2-point conversions",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "safeties",
      title: "Safeties",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    // Offense — Receiving
    defineField({
      name: "targets",
      title: "Targets",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "catches",
      title: "Catches",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "drops",
      title: "Drops",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    // Offense — Passing
    defineField({
      name: "passAttempts",
      title: "Pass Attempts",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "passCompletions",
      title: "Pass Completions",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "interceptionsThrown",
      title: "Interceptions Thrown",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
     defineField({
      name: "sacksTaken",
      title: "Sacks Taken",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),

    // Defense
    defineField({
      name: "sacks",
      title: "Sacks",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "interceptions",
      title: "Interceptions",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "flagPulls",
      title: "Flag Pulls",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "passBreakups",
      title: "Pass Breakups",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      playerName: "playerName",
      player: "rosterEntry.player.firstName",
      teamName: "teamName",
      team: "rosterEntry.team.abbreviation",
    },
    prepare({ playerName, player, teamName, team, }) {
      return {
        title: playerName || player || "Player",
        subtitle: `${teamName || team || ""}`,
      };
    },
  },
});
