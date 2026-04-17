import { Barlow_Condensed, Barlow, Inter } from "next/font/google";
import Providers from "@/app/providers";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-barlow",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className={`${barlowCondensed.variable} ${barlow.variable} ${inter.variable}`}>
        {children}
      </div>
    </Providers>
  );
}
