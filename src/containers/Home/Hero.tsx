"use client";

import Image from "next/image";

export interface NewsItemType {
  id: string | number;
  title: string;
  slug: string;
  publishedAt: string;
  content: string;
  excerpt: string;
  mainImage: string;
}

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-start w-full overflow-hidden text-white relative">
      <section
        className="relative w-full min-h-150 sm:min-h-180 lg:h-250.5 overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col justify-between"
        style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
      >
        <div
          className="absolute inset-0 w-full h-full mix-blend-multiply z-0"
          style={{
            background: "linear-gradient(180deg, rgba(113, 63, 18, 0.45) -2.56%, #18181B 115.31%)",
          }}
        />

        <div
          className="
            absolute bottom-12 sm:bottom-16 lg:bottom-0
            left-1/2 -translate-x-1/2 z-0
            w-10/12 sm:w-8/12 max-w-lg lg:max-w-200
            h-auto aspect-1126/756
            pointer-events-none flex justify-center items-center"
        >
          <Image
            src="/CFFL.png"
            alt="CFFL Hero"
            width={1126}
            height={756}
            priority
            className="w-full h-full object-contain opacity-90"
          />
        </div>

        <div className="relative z-10 w-full pt-20 sm:pt-28 lg:pt-37.5 px-4 sm:px-8 flex flex-col items-center text-center">
          <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 lg:gap-5 mt-20">
            {["SPORT", "COMMUNITY", "IMPACT"].map((word, i) => (
              <div key={word} className="flex items-center gap-2 sm:gap-4 lg:gap-5">
                <span
                  className="text-white uppercase 
                    text-3xl sm:text-6xl md:text-7xl lg:text-[96px] 
                    font-bold leading-none tracking-tight"
                  style={{
                    fontFamily: "ITC Machine Std, sans-serif",
                  }}
                >
                  {word}
                </span>
                {i < 2 && (
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-2 max-w-3xl mt-4 sm:mt-6">
            <h1
              className="text-white 
              text-lg sm:text-2xl md:text-3xl lg:text-[40px] font-bold
              leading-[120%]"
              style={{
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Building Africa's Flag Football Future
            </h1>
            <p
              className="text-white/80
              text-sm sm:text-base 
              leading-[140%] px-2 sm:px-0"
              style={{
                fontFamily: "DM Sans, sans-serif",
              }}
            >
              Nigeria’s home of competitive flag football, bringing athletes, fans and communities
              together through the game we love.
            </p>
          </div>

          <div className="w-full max-w-3xl lg:max-w-255.75 relative aspect-1023/944 mt-6 sm:-mt-12 lg:-mt-20">
            <Image
              src="/players.png"
              alt="Players"
              width={1023}
              height={944}
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div
          className="
            absolute bottom-0 w-full 
            h-32 sm:h-48 lg:h-70
            bg-linear-to-t from-white via-white/80 to-transparent 
            pointer-events-none z-10
          "
        />
      </section>

      <div
        className="relative w-full flex justify-center bg-white z-20"
        style={{
          height: "99px",
        }}
      >
        <Image
          src="/football.png"
          alt="Mid Overlap Image"
          width={316}
          height={186}
          className="absolute z-20 -translate-y-1/2 object-contain w-55 sm:w-70 lg:w-[316.48px] h-auto"
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gray-500/30 blur-[2px]"
          style={{
            marginTop: "60px",
            width: "180px",
            height: "22px",
          }}
        />
      </div>
    </main>
  );
}
