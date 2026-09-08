import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { format } from "date-fns";
import { ArrowRight, Calendar, CalendarDays, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import type { RELATED_QUERYResult } from "sanity.types";
import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer/Footer";
import { LatestScores } from "@/containers/News/components/latest-scores";
import { client } from "@/sanity/lib/client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs: { slug: { current: string } }[] = await client.fetch(`
    *[_type == "news" && defined(slug.current)]{
      slug
    }
  `);

  return slugs.map((item) => ({
    slug: item.slug.current,
  }));
}

const fetchArticleData = async (slug: string) => {
  try {
    const ARTICLE_QUERY = defineQuery(`
      *[_type == "news" && slug.current == $slug][0]{
        _id,
        title,
        subtitle,
        publishedAt,
        content,
        "slug": slug.current,
        "mainImage" : mainImage.asset->url
      }
    `);

    const RELATED_QUERY = defineQuery(`
      *[_type == "news" && slug.current != $slug][0...4]{
        _id,
        title,
        slug,
        publishedAt,
        category,
        "slug": slug.current,
        "mainImage" : mainImage.asset->url
      }
    `);

    const [article, related] = await Promise.all([
      client.fetch(ARTICLE_QUERY, { slug }),
      client.fetch(RELATED_QUERY, { slug }),
    ]);

    return { article, related };
  } catch (error) {
    console.error("Error fetching article data:", error);
    return { article: null, related: [] };
  }
};

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#334155] text-[16px] md:text-[17px] leading-[1.8] mb-6 font-normal">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-[24px] md:text-[28px] font-bold text-[#002060] mt-10 mb-4 tracking-tight">
        {children}
      </h2>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 pl-6 border-l-4 border-[#0052FF] text-[#002060] italic text-[18px] md:text-[20px] font-medium leading-relaxed bg-[#F8FAFC] py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
};

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const { article, related } = await fetchArticleData(slug);

  if (!article) {
    return (
      <>
        <Navbar linkTextColor="text-black" />
        <main className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
          <p>Article not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  const categoryName = "CFFL";

  return (
    <>
      <Navbar linkTextColor="text-black" />

      <main className="bg-[#F8FAFC] min-h-screen pt-38 pb-20 px-4 sm:px-8 md:px-20 lg:px-30">
        <div className="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 bg-transparent p-6 sm:p-10 rounded-2xl">
            <h3 className="text-[12px] font-bold text-[#002060] tracking-wider uppercase mb-3">
              NEWS
            </h3>
            <h1
              className="text-[32px] sm:text-[40px] md:text-[44px] font-black text-[#002060] leading-[1.15] mb-4 tracking-tight"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-[16px] md:text-[18px] text-[#475569] leading-relaxed mb-6">
                {article.subtitle}
              </p>
            )}

            <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-2 text-[#64748B] text-[13px] font-medium">
                <Calendar className="w-4 h-4 text-[#94A3B8]" />
                <span>{format(new Date(article.publishedAt), "MMMM dd, yyyy")}</span>
              </div>
              <span className="bg-[#EFF6FF] text-[#0052FF] text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                {categoryName}
              </span>
            </div>

            {article.mainImage && (
              <div className="relative w-full h-80 sm:h-112.5 mb-8 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={article.mainImage}
                  alt={article.title}
                  fill
                  priority
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-white text-[12px] font-medium border border-white/10">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{`CFFL Media - ${article.title}`}</span>
                </div>
              </div>
            )}

            <article className="prose max-w-none">
              <PortableText value={article.content} components={portableTextComponents} />
            </article>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="sticky top-30 flex flex-col gap-8">
              <div className="bg-transparent p-6 rounded-2xl ">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[12px] font-bold text-[#002060] tracking-wider uppercase">
                    RELATED STORIES
                  </h3>
                  <Link
                    href="/news"
                    className="text-[12px] font-medium text-[#0052FF] hover:underline flex items-center gap-1"
                  >
                    See all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="flex flex-col gap-4">
                  {related?.map((item: RELATED_QUERYResult[number]) => (
                    <Link
                      key={item._id}
                      href={`/news/${item.slug}`}
                      className="group flex gap-3 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
                    >
                      <div className="relative w-20 h-17.5 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.mainImage}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-0.5 min-w-0">
                        <span className="text-3xs font-bold text-[#0052FF] uppercase tracking-wider">
                          CFFL
                        </span>
                        <h3 className="text-[13px] font-bold text-[#002060] group-hover:text-[#0052FF] line-clamp-2 transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                          <CalendarDays className="w-3 h-3" />
                          <span>{format(new Date(item.publishedAt), "MMMM d, yyyy")}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <LatestScores />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

export const dynamic = "force-static";
