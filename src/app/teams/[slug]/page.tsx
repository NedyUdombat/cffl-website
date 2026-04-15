import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TeamPageProps {
  params: {
    slug: string;
  };
}

// ✅ Required for static export
export async function generateStaticParams() {
  return [
    { slug: "titans" },
    { slug: "warriors" },
    { slug: "lions" },
    // Add more teams here
  ];
}

// ✅ Optional (helps Next.js handle pre-render)
export const dynamic = "force-static";

// 📰 Dummy team news (you can later fetch from Sanity)
const newsArticles = [
  {
    id: 1,
    imageSrc: "/news-img-1.png",
    writeup: "Gameday with the Raptors",
    date: "October 10, 2025",
    slug: "gameday-with-the-raptors",
  },
  {
    id: 2,
    imageSrc: "/news1.png",
    writeup: "Training camp preview: Ajanaku flexing his skills on the pitch",
    date: "October 3, 2025",
    slug: "ajanaku-training-camp",
  },
  {
    id: 3,
    imageSrc: "/news-img-3.png",
    writeup: "Gameday: Rookies under the radar",
    date: "September 25, 2025",
    slug: "rookies-under-the-radar",
  },
];

export default function TeamDetail({ params }: TeamPageProps) {
  const { slug } = params;

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar linkTextColor="text-black" />

      <main className="min-h-screen bg-white text-gray-800 pt-[160px] px-6 md:px-10">
        {/* ✅ Hero Image */}
        <div className="relative w-full h-auto mb-8">
          <Image
            src="/titan-fans.png"
            alt={`${slug} Fans`}
            width={1200}
            height={400}
            className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* ✅ Fan Image Carousel */}
        <div className="flex items-center justify-center py-8">
          <button
            className="p-3 bg-white border border-gray-300 shadow-md text-gray-800 hover:bg-gray-100 transition flex-shrink-0 mr-4"
            aria-label="Previous image"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex space-x-4 overflow-hidden">
            {["/titanfan1.png", "/titanfan2.png", "/titanfan3.png"].map((src, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={src}
                  alt={`Fan image ${index + 1}`}
                  width={172}
                  height={172}
                  className="w-full object-cover rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>

          <button
            className="p-3 bg-white border border-gray-300 shadow-md text-gray-800 hover:bg-gray-100 transition flex-shrink-0 ml-4"
            aria-label="Next image"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* ✅ Team News Section */}
        <div className="bg-[#f7f7f7] py-12 px-6 md:px-10 -mx-6 md:-mx-10 mt-8">
          <h2 className="text-3xl font-extrabold text-[#002060] mb-8 uppercase tracking-tight">
            Team News
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <Link
                key={article.id}
                // ✅ NEW: Dynamic link to team-specific article page
                href={`/teams/${slug}/news/${article.slug}`}
                className="group block bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={article.imageSrc}
                    alt={article.writeup}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#C90F0F] transition duration-300 mb-2 leading-snug">
                    {article.writeup}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">{article.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
