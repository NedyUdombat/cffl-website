"use client";

import Navbar from "@/components/Navbar";
import Footer from "../../containers/Home/Footer";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#13141C] text-white">
      <Navbar linkTextColor="text-white" />

      <div className="flex-grow mt-[142px]">
        <iframe
          src="https://playpass.com/CFFLAGOS/cffl-season-iii-RG2V2mc"
          className="w-full h-[calc(100vh-142px)] border-0"
          allow="payment; clipboard-write"
          title="CFFL Season III Registration"
        />
      </div>

      <Footer />
    </div>
  );
}
