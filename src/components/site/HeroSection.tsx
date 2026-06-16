"use client";
import Link from "next/link";
import { normalizeHref } from "@/lib/site-data";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  imageUrl: string;
};

export default function HeroSection({ banner }: { banner: Banner }) {
  const hasCustomBg = banner.imageUrl &&
    !banner.imageUrl.includes("hero-bg.jpg") &&
    banner.imageUrl !== "";
  const backgroundImage = hasCustomBg ? banner.imageUrl : "/cherry-street-hero.png";

  return (
    <section className="flex w-full justify-center bg-white">
      <div
        className="hero-frame relative w-full overflow-hidden"
        style={{
          maxWidth: "1667px",
          aspectRatio: "1667 / 662",
        }}
      >
        <style>{`
          @media (max-width: 767px) {
            .hero-frame { aspect-ratio: 4 / 5 !important; }
            .hero-content { left: 22px !important; right: 22px !important; bottom: 36px !important; max-width: none !important; }
            .hero-title { font-size: 2.45rem !important; }
            .hero-copy { max-width: 18rem !important; }
          }
        `}</style>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.58) 100%)",
          }}
        />

        <div className="hero-content absolute bottom-[48px] left-12 z-10 max-w-[620px] text-left text-white">
          <h1
            className="hero-title mb-3 font-extrabold leading-[0.98]"
            style={{
              fontSize: "clamp(3rem, 5vw, 5.15rem)",
              textShadow: "0 2px 14px rgba(0,0,0,0.36)",
            }}
          >
            {banner.title}
          </h1>

          {banner.subtitle && (
            <p
              className="hero-copy max-w-[31rem] text-[0.98rem] font-semibold leading-[1.45] md:text-[1.05rem]"
              style={{
                color: "rgba(255,255,255,0.94)",
                textShadow: "0 2px 10px rgba(0,0,0,0.45)",
              }}
            >
              {banner.subtitle}
            </p>
          )}

          {banner.buttonText && banner.buttonHref && (
            <div className="mt-7">
              <Link
                href={normalizeHref(banner.buttonHref)}
                className="inline-flex items-center justify-center rounded-[14px] bg-white px-7 py-[13px] text-[15px] font-bold text-[#1a1a1a] transition-opacity hover:opacity-85"
              >
                {banner.buttonText}
              </Link>
            </div>
          )}
        </div>

        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          <span className="h-2 w-2 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white/45" />
          <span className="h-2 w-2 rounded-full bg-white/45" />
        </div>
      </div>
    </section>
  );
}
