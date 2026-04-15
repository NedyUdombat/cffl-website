"use client";

import Image from "next/image";

export default function CFFLAcademyPage() {
  return (
    // The main container: takes up the full viewport height and uses flexbox
    // to center the content (the image) both horizontally and vertically.
    <div
      className="flex h-screen w-full items-center justify-center bg-white    pt-4 sm:pt-10 md:pt-16"
      style={{
        position: "relative",
      }}
    >
      {/* Updated Image component with new dimensions */}
      <Image
        src="/CFFL-Academy.png" // Assumes the image is in your /public directory
        alt="CFFL Academy Logo"
        width={854} // Set the width
        height={956} // Set the height
        className="object-contain max-w-full max-h-full"
      />
    </div>
  );
}
