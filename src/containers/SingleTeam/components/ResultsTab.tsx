"use client";

import type { MatchResult, Fixture } from "./types";
import { MatchResultRow, FixtureRow } from "./MatchResultRow";
import { SectionHeading } from "./SectionHeading";

export function ResultsTab({
  results,
  fixtures,
  primaryColor,
}: {
  results: MatchResult[];
  fixtures: Fixture[];
  primaryColor: string;
}) {
  return (
    <section className="py-12 md:py-16 px-6 md:px-14 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Recent Results */}
        <div className="mb-8">
          <SectionHeading primaryColor={primaryColor}>Recent Results</SectionHeading>
        </div>
        <div className="flex flex-col gap-2.5">
          {results.map((result) => (
            <MatchResultRow key={result.date + result.opponent} result={result} />
          ))}
        </div>

        {/* Upcoming Fixtures */}
        {fixtures.length > 0 && (
          <>
            <div className="mt-10 mb-4 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-inter">
                Upcoming Fixtures
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              {fixtures.map((fixture) => (
                <FixtureRow key={fixture.date + fixture.opponent} fixture={fixture} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
