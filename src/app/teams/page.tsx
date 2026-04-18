"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer/Footer";
import Teams from "@/containers/Team/Teams";

export default function TeamsPage() {
  return (
    <>
      {/* --- Navbar --- */}
      <Navbar linkTextColor="text-black" />
      {/* --- Main Content --- */}
      <Teams />
      <Footer />
    </>
  );
}
