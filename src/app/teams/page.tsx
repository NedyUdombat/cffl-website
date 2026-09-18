"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer/Footer";
import Teams from "@/containers/Team/Teams";

export default function TeamsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1C2028] text-white">
      <Navbar linkTextColor="text-white" />

      <Teams />

      <Footer />
    </div>
  );
}
