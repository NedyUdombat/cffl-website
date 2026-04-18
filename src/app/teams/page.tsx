"use client";

import Teams from "@/containers/Team/Teams";
import Navbar from "../../components/Navbar";

export default function TeamsPage() {
  return (
    <>
      {/* --- Navbar --- */}
      <Navbar linkTextColor="text-black" />
      {/* --- Main Content --- */}
      <Teams />
    </>
  );
}
