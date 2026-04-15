import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function SamplePage() {
  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col items-center">
      {/* Navbar */}
      <Navbar />

      {/* Image Section */}
      <section className="mt-10 flex flex-col items-center">
        <Image
          src="/example.jpg" // replace with your image path (e.g. /hero.jpg)
          alt="Sample image"
          width={600}
          height={400}
          className="rounded-2xl shadow-lg"
        />

        {/* Text Section */}
        <div className="mt-6 max-w-2xl text-center px-4">
          <h1 className="text-3xl font-bold mb-2">Welcome to Our Page</h1>
          <p className="text-gray-300 leading-relaxed">
            This is a simple page layout with a navbar, an image, and some descriptive text below
            it. You can easily customize it with your own content and styling.
          </p>
        </div>
      </section>
    </main>
  );
}
