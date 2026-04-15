import Image from "next/image";

interface MatchFixtureCardProps {
  matchImageSrc: string;
  matchDay: string;
  matchTime: string;
  matchDate: string;
}

export default function MatchFixtureCard({
  matchImageSrc,
  matchDay,
  matchTime,
  matchDate,
}: MatchFixtureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center md:items-stretch w-full max-w-5xl mx-auto border border-gray-200">
      {/* Left: Image */}
      <div className="relative w-full md:w-1/2 h-56 md:h-auto">
        <Image src={matchImageSrc} alt={`${matchDay} Fixture`} fill className="object-cover" />
      </div>

      {/* Right: Match Info */}
      <div className="flex flex-col justify-center p-6 md:p-10 w-full md:w-1/2 text-center md:text-left">
        <h3 className="text-2xl font-bold text-[#002060] uppercase mb-2">{matchDay}</h3>
        <p className="text-gray-600 text-lg mb-1">{matchDate}</p>
        <p className="text-gray-800 text-xl font-semibold">{matchTime}</p>
      </div>
    </div>
  );
}
