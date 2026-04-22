"use client";

import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-start w-full overflow-hidden text-white relative">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative w-full min-h-[680px] lg:h-[1002px] overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      >
        {/* Overlay Gradient */}
        <div
          className="absolute inset-0 w-full h-full mix-blend-multiply"
          style={{
            background: "linear-gradient(180deg, #1F54A9 -2.56%, #000000 115.31%)",
          }}
        />

        {/* CFFL Image */}
        <div className="block sm:hidden h-[185px]" />
        <div
          className="
            top-20 lg:top-[156px] 
            left-1/2 -translate-x-1/2 
            w-11/12 max-w-4xl lg:max-w-[1126px] 
            h-auto aspect-[1126/756] lg:h-[756px] 
            rounded-2xl overflow-hidden flex justify-center items-center relative"
        >
          <Image
            src="CFFL.png"
            alt="CFFL Hero"
            width={1126}
            height={756}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        {/* Text Section */}
        <div
          className="absolute 
            top-24 lg:top-[224.5px] 
            left-1/2 -translate-x-1/2 
            w-full px-4 sm:px-8 
            flex flex-col gap-1 sm:gap-6 
            items-center text-center"
        >
          {/* SPORT • COMMUNITY • IMPACT */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-5 mt-7 sm:mt-2">
            {["SPORT", "COMMUNITY", "IMPACT"].map((word, i) => (
              <div key={word} className="flex items-center gap-5">
                <span
                  className="text-white uppercase 
                    text-2xl sm:text-5xl md:text-7xl lg:text-[96px] 
                    font-bold leading-none"
                  style={{
                    fontFamily: "ITC Machine Std, sans-serif",
                  }}
                >
                  {word}
                </span>
                {i < 2 && <div className="w-2 h-2 bg-white hidden sm:block" />}
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <span
            className="text-white 
              text-base sm:text-2xl md:text-3xl lg:text-[40px] 
              leading-[120%] mt-9 sm:mt-4"
            style={{
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Building Africa's Flag Football Future
          </span>

          {/* Player Image */}
          <div className="block sm:hidden h-[80px]" />
          <div
            className="-mt-49 max-w-4xl lg:max-w-[1023px]
            w-full h-auto aspect-[1023/944] relative min-h-[680px]"
          >
            <Image
              src="players.png"
              alt="Players"
              width={1023}
              height={944}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Fade effect into next section */}
        {/* Seamless Fog Fade into White Section */}
        <div
          className="
    absolute bottom-0 w-full 
    h-[280px] sm:h-[100px] 
    bg-gradient-to-t from-white via-white/90 to-transparent 
    pointer-events-none
  "
          style={{
            paddingBottom: "200px",
            transform: "translateY(0)",
            zIndex: "1",
          }}
        />
      </section>

      {/* ================= OVERLAPPING MIDDLE IMAGE ================= */}
      {/* ================= OVERLAPPING MIDDLE IMAGE ================= */}
      <div
        className="relative w-full flex justify-center"
        style={{
          height: "99px",
          backgroundColor: "#fff",
          zIndex: "3",
        }}
      >
        <Image
          src="football.png"
          alt="Mid Overlap Image"
          width={316.4822129201497}
          height={186.00000274354937}
          className="absolute z-20 -translate-y-1/2 object-contain"
          style={{
            width: "316.48px",
            height: "186px",
          }}
        />
        <div
          style={{
            backgroundColor: "grey",
            opacity: "0.3",
            marginTop: "70px",
            width: "220px",
            height: "28px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        ></div>
      </div>
    </main>
  );
}
