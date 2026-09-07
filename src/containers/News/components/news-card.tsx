import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  article: any;
}

export function NewsPageCard({ article }: NewsCardProps) {
  return (
    <Link
      key={article._id}
      href={`/news/${article.slug || ""}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        <div className="relative w-full h-37.5 bg-gray-100 overflow-hidden">
          {article.mainImage ? (
            <Image
              src={article.mainImage}
              alt={article.title || "News Image"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="inline-block bg-[#F1F5F9] text-[#002060] text-3xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2">
            NEWS
          </div>

          <h3 className="text-[14px] font-bold text-[#002060] leading-snug line-clamp-2 mb-2 group-hover:text-[#0052FF] transition-colors">
            {article.title}
          </h3>
        </div>
      </div>

      <div className="px-4 pb-4 pt-0">
        <p className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
          <span>CFFL Staff</span> &bull;
          <span>
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Aug 20, 2026"}
          </span>
        </p>
      </div>
    </Link>
  );
}
