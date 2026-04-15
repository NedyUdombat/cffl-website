import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/containers/Home/Footer";

interface ArticlePageProps {
  params: {
    slug: string;
    newsSlug: string;
  };
}

// Dummy article data
const articles = [
  {
    team: "titans",
    slug: "gameday-with-the-raptors",
    title: "Gameday with the Raptors",
    date: "October 10, 2025",
    imageSrc: "/news-img-1.png",
    content:
      "The Titans face off against the Raptors in a thrilling match that will test both teams’ limits...",
  },
  {
    team: "titans",
    slug: "ajanaku-training-camp",
    title: "Training camp preview: Ajanaku flexing his skills on the pitch",
    date: "October 3, 2025",
    imageSrc: "/news1.png",
    content:
      "Ajanaku is quickly becoming one of the standout players during this year's training camp...",
  },
  {
    team: "titans",
    slug: "rookies-under-the-radar",
    title: "Gameday: Rookies under the radar",
    date: "September 25, 2025",
    imageSrc: "/news-img-3.png",
    content:
      "While all eyes are on the veterans, a few rookies are making quiet but significant impacts...",
  },
];

// ✅ REQUIRED for static export
export async function generateStaticParams() {
  // Return every possible combination of team + article slug
  return articles.map((article) => ({
    slug: article.team, // team folder (e.g. "titans")
    newsSlug: article.slug, // article folder (e.g. "gameday-with-the-raptors")
  }));
}

export const dynamic = "force-static"; // ensures build consistency

export default function TeamNewsArticle({ params }: ArticlePageProps) {
  const article = articles.find(
    (a) => a.slug === params.newsSlug && a.team.toLowerCase() === params.slug.toLowerCase()
  );

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-800">
        <p>Article not found.</p>
      </main>
    );
  }

  return (
    <>
      <Navbar linkTextColor="text-black" />

      <main className="min-h-screen bg-white text-gray-800 pt-[120px] px-6 md:px-20">
        <div className="max-w-3xl mx-auto">
          <Image
            src={article.imageSrc}
            alt={article.title}
            width={1200}
            height={600}
            className="rounded-lg shadow-lg mb-8"
          />
          <h1 className="text-4xl font-bold mb-3">{article.title}</h1>
          <p className="text-gray-500 mb-8">{article.date}</p>
          <p className="text-lg leading-relaxed">{article.content}</p>
        </div>
      </main>

      <Footer />
    </>
  );
}
