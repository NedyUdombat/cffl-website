"use client";

import imageUrlBuilder from "@sanity/image-url";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";

const builder = imageUrlBuilder(client);
const urlFor = (source: any) => builder.image(source);

export default function Upcoming() {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [games, setGames] = useState<any[]>([]);
  const [nextGames, setNextGames] = useState<any[]>([]);
  const scrollDuration = 7;

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch(`
        *[_type == "upcoming"][0]{
          games[]{
            "logo": logo.asset->_id,
            "logoUrl": logo.asset->url,
            date,
            week
          }
        }
      `);

      console.log({ data });
      setGames(data?.games || []);

      const replayData = await client.fetch(`
        *[_type == "replay"]{
          _id,
          "team1": { "name": team1.name, "logo": team1.logo.asset->url, "color": team1.color },
          "team2": { "name": team2.name, "logo": team2.logo.asset->url, "color": team2.color }
        }
      `);
      setNextGames(replayData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let loopTimeout: NodeJS.Timeout | null = null;
    const loopScroll = async () => {
      while (isRunning) {
        if (!isPaused) {
          await controls.start({
            x: "-50%",
            transition: { duration: scrollDuration, ease: "linear" },
          });
          await controls.start({ x: "0%", transition: { duration: 0 } });
        } else {
          await new Promise<void>((resolve) => {
            loopTimeout = setTimeout(resolve, 100);
          });
        }
      }
    };
    loopScroll();
    return () => {
      setIsRunning(false);
      if (loopTimeout) clearTimeout(loopTimeout);
    };
  }, [controls, isPaused, scrollDuration, isRunning]);

  return (
    <section
      className="relative w-full bg-[#F7F7F7]"
      aria-label="Upcoming Schedule and Game Replays"
    >
      {/* UPCOMING SCHEDULE */}
      <div className="relative w-full flex justify-center items-center rounded-lg overflow-hidden px-6 md:px-[80px] lg:px-[134px] pt-[120px] pb-[80px]">
        <div className="relative w-full max-w-[1200px] h-auto overflow-hidden rounded-lg">
          <div style={{ backgroundColor: "black", opacity: "1" }}>
            <Image
              src="/upcoming-bg.png"
              alt="Upcoming Background"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              style={{ opacity: "0.5" }}
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
          <h2
            className="absolute top-8 left-8 md:top-10 md:left-12 text-white text-[18px] md:text-[48px] font-extrabold uppercase tracking-tight z-20"
            style={{
              fontFamily: "ITC Machine Std, sans-serif",
              fontWeight: 500,
              paddingLeft: "10px",
            }}
          >
            Upcoming Schedule
          </h2>

          <div
            className="absolute bottom-0 left-0 right-0 overflow-hidden z-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-6 py-6 px-8 w-full max-w-[1200px] mx-auto"
              animate={controls}
            >
              {[...games, ...games].map((game, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[280px] h-[100px] border border-[#EBEEF3BF] rounded-xl flex items-center overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-white flex items-center justify-center p-4 rounded-l-xl z-0">
                    <Image
                      src={urlFor(game.logoUrl).url() || "/placeholder.png"}
                      alt="team logo"
                      width={50}
                      height={69}
                      className="object-contain mix-blend-luminosity opacity-100"
                    />
                  </div>
                  <div className="flex flex-col justify-center relative z-10 w-1/2 ml-auto pl-4">
                    <p className="text-white text-[36px] font-medium leading-none">{game.date}</p>
                    <p className="text-white text-[16px] font-normal mt-1">{game.week}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
