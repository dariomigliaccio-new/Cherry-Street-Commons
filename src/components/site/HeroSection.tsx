"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  imageUrl: string;
};

export default function HeroSection({ banner }: { banner: Banner }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(titleRef.current,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }, 0.25)
      .fromTo(subRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 }, 0.45)
      .fromTo(ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 }, 0.6);
  }, []);

  const hasCustomBg = banner.imageUrl &&
    !banner.imageUrl.includes("hero-bg.jpg") &&
    banner.imageUrl !== "";
  const backgroundImage = hasCustomBg ? banner.imageUrl : "/cherry-street-hero.png";

  return (
    <section className="w-full flex justify-center bg-white">
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: "1667px",
          aspectRatio: "1667 / 662",
        }}
      >
        <style>{`
          @media (max-width: 767px) {
            .hero-shell { aspect-ratio: 4 / 5 !important; }
            .hero-content { left: 20px !important; right: 20px !important; bottom: 40px !important; max-width: none !important; text-align: center !important; align-items: center !important; }
            .hero-cta { position: static !important; margin-top: 14px; justify-content: center; }
            .hero-title { font-size: 2.7rem !important; }
          }
        `}</style>

        <div className="hero-shell absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.48))",
            }}
          />

          <div className="hero-content absolute bottom-[52px] left-12 z-10 flex max-w-[560px] flex-col gap-1 text-left text-white">
            <h1
              ref={titleRef}
              className="hero-title font-display mb-2 font-extrabold leading-none"
              style={{
                fontSize: "clamp(3rem, 5.25vw, 5.5rem)",
                textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              }}
            >
              {banner.title}
            </h1>

            {banner.subtitle && (
              <p
                ref={subRef}
                className="text-[0.95rem] font-semibold leading-snug md:text-base"
                style={{
                  color: "rgba(255,255,255,0.94)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.45)",
                }}
              >
                {banner.subtitle}
              </p>
            )}
          </div>

          {banner.buttonText && banner.buttonHref && (
            <div ref={ctaRef} className="hero-cta absolute bottom-10 right-[120px] z-10 flex">
              <a
                href={banner.buttonHref}
                className="inline-flex items-center justify-center px-7 py-[13px] text-[15px] font-bold text-[#1a1a1a] transition-transform hover:-translate-y-0.5"
                style={{ background: "white", borderRadius: "14px" }}
              >
                {banner.buttonText}
              </a>
            </div>
          )}

          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/45" />
            <span className="h-2 w-2 rounded-full bg-white/45" />
          </div>
        </div>
      </div>
    </section>
  );
}
