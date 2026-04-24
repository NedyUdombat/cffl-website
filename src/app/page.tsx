"use client";
// import GameReplays from "@/containers/GameReplays";
// import Upcoming from "@/containers/Home/Upcoming";
import Navbar from "../components/Navbar";
// import Academy from "../containers/Academy";
// import Footer from "../containers/Home/Footer";

import Footer from "@/containers/Footer/Footer";
import Hero from "../containers/Home/Hero";
import Trending from "../containers/Home/Trending";
// import Upcoming from "./components/upcoming";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-hidden flex flex-col items-center">
      <Navbar />
      <Hero />
      <Trending />
      {/* <Upcoming /> */}
      {/* <GameReplays /> */}
      {/* <Academy /> */}
      <Footer />
    </main>
  );
}
