import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer/Footer";
import { LatestScoresLoader } from "./latest-scores";

export function NewsPageLoader() {
  return (
    <div className="bg-white min-h-screen text-[#002060]">
      <Navbar linkTextColor="text-black" />
      <main className="pt-35 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 animate-pulse">
          <div className="mb-12">
            <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 h-75 lg:h-95 bg-gray-200" />
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="h-5 w-20 bg-gray-200 rounded mb-4" />
                  <div className="h-8 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-8 w-1/2 bg-gray-200 rounded mb-4" />
                  <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded mb-6" />
                </div>
                <div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
                  <div className="h-10 w-28 bg-gray-200 rounded-md" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="h-4 w-28 bg-gray-200 rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {SIX_GRID_TEXTS.map((text) => (
                  <div
                    key={text}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm p-4 flex flex-col justify-between h-70"
                  >
                    <div>
                      <div className="w-full h-30 bg-gray-200 rounded-lg mb-3" />
                      <div className="h-3 w-12 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-full bg-gray-200 rounded mb-1" />
                      <div className="h-4 w-2/3 bg-gray-200 rounded mb-2" />
                    </div>
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 flex flex-col gap-8">
              <LatestScoresLoader />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const SIX_GRID_TEXTS = ["text-1", "text-2", "text-3", "text-4", "text-5", "text-6"];
