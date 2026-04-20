import { createClient } from "@sanity/client";
import "dotenv/config";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  apiVersion:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
    process.env.SANITY_STUDIO_API_VERSION ||
    "2026-04-15",
  token: process.env.SANITY_STUDIO_TOKEN,
  useCdn: false,
});

// Edit this array before each run. Replace with the current matchday's results.
const scoreUpdates = [
  { matchDay: 3, matchNumber: 9,  homeScore: 34, awayScore: 7  },
  { matchDay: 3, matchNumber: 10, homeScore: 0,  awayScore: 38 },
  { matchDay: 3, matchNumber: 11, homeScore: 13, awayScore: 26 },
  { matchDay: 3, matchNumber: 12, homeScore: 42, awayScore: 24 },
];

async function updateScores() {
  for (const update of scoreUpdates) {
    const { matchDay, matchNumber, homeScore, awayScore } = update;

    const match = await client.fetch<{ _id: string } | null>(
      `*[_type == "match" && matchDay == $matchDay && matchNumber == $matchNumber][0]{ _id }`,
      { matchDay, matchNumber }
    );

    if (!match) {
      console.warn(`⚠️  No match found for matchDay=${matchDay}, matchNumber=${matchNumber}`);
      continue;
    }

    await client
      .patch(match._id)
      .set({ homeScore, awayScore, status: "completed" })
      .commit();

    console.log(`✅  Updated matchDay=${matchDay} #${matchNumber}: ${homeScore} - ${awayScore}`);
  }
}

updateScores().catch(console.error);
