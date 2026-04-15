import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import LoadMoreButton from "@/components/LoadMoreButton";
import Navbar from "@/components/Navbar";
import Footer from "@/containers/Home/Footer";
import { client } from "@/sanity/lib/client";

// 🧱 Configure Sanity Image Builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

interface FanPhoto {
  _id: string;
  image: any;
  order?: number;
}

export default async function MeetTheFansPage() {
  const fans: FanPhoto[] = await client.fetch(`
    *[_type == "fans"] | order(order asc) {
      _id,
      image,
      order
    }
  `);

  return (
    <div className="bg-[#13141C] min-h-screen text-white">
      {/* ✅ Navbar inside hero */}
      <section className="relative w-full min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
        {/* Navbar should appear on the hero itself */}
        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar linkTextColor="text-white" />
        </div>

        {/* Title */}
        <div className="relative z-10 flex flex-col items-center justify-center mt-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wide">
            Meet The Fans
          </h1>
        </div>

        {/* Subtle background logo */}
        <div className="absolute inset-0 opacity-[0.05] flex items-center justify-center">
          <Image
            src="/logo1.png"
            alt="CFFL Background Logo"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
      </section>

      {/* 🖼 Fan Gallery Grid */}
      <main className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {fans.length === 0 ? (
            <p className="text-center text-gray-400">No fan photos available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fans.map((fan) => (
                <div
                  key={fan._id}
                  className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer"
                >
                  {fan.image ? (
                    <Image
                      src={urlFor(fan.image).width(600).height(600).url()}
                      alt="Fan photo"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-[300px] bg-gray-800 text-gray-500 text-sm">
                      No image
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 🔽 Load More */}
          <div className="text-center mt-12">
            <LoadMoreButton />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
