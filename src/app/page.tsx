import Academy from "./components/Academy";
import Footer from "./components/footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
// import Upcoming from "./components/upcoming";

export default function HomePage() {
  return (
    <main className="relative w-full min-h-screen text-white overflow-hidden flex flex-col items-center">
      <Navbar />
      <HeroSection />
      {/* <Upcoming /> */}
      <Academy />
      <Footer />
    </main>
  );
}
