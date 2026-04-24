"use client";

// @ts-nocheck

import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer/Footer";
import { client } from "@/sanity/lib/client";

// 🧱 Sanity image builder
const builder = imageUrlBuilder(client);
function urlFor(source: string) {
  return builder.image(source);
}

// ✅ Props
type Props = {
  params: { slug: string };
};

// ⚙️ Pre-render all possible slugs
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

// 📰 Main Page Component
export default async function NewsDetailPage({ params }: Props) {
  const article = await client.fetch(
    `
    *[_type == "news" && slug.current == $slug][0]{
      title,
      mainImage,
      publishedAt,
      content
    }
  `,
    { slug: params.slug }
  );

  // 🧩 Handle missing article
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

  return (
    <>
      <Navbar linkTextColor="text-black" />

      <main className="min-h-screen bg-white text-gray-800 pt-[160px] px-6 md:px-10">
        {/* 🖼️ Hero Image */}
        {article.mainImage && (
          <div className="relative w-full max-h-[450px] mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={urlFor(article.mainImage).width(1200).height(600).url()}
              alt={article.title}
              width={1200}
              height={600}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* 📰 Article Header */}
        <h1 className="text-4xl font-extrabold text-[#002060] mb-4 leading-snug">
          {article.title}
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* 📝 Article Content */}
        <article className="prose prose-lg max-w-none text-gray-800">
          <PortableText value={article.content} />
        </article>
      </main>

      <Footer />
    </>
  );
}

// ✅ For static export mode
export const dynamic = "force-static";
