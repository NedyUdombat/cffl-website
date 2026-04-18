import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "CFFL - Building Africa's Flag Football Future",
  description: "Sport • Community • Impact - Africa’s Flag Football League",
  icons: {
    icon: "/logo1.png", // ✅ favicon path (inside /public)
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
