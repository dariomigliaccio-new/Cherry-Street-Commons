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
  const wrapRef    = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(badgeRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }, 0.4)
      .fromTo(titleRef.current,
        { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1 }, 0.7)
      .fromTo(lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6 }, 1.5)
      .fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }, 1.6)
      .fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 2.1);
  }, []);

  const hasCustomBg = banner.imageUrl &&
    !banner.imageUrl.includes("hero-bg.jpg") &&
    banner.imageUrl !== "";
  const backgroundImage = hasCustomBg ? banner.imageUrl : "/cherry-street-hero.png";

  return (
    <section className="w-full flex justify-center" style={{ background: "#0f1f3d" }}>
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: "1668px",
          minHeight: "min(760px, calc(100svh - 72px))",
        }}
      >
        <style>{`
          @media (max-width: 767px) {
            .hero-shell { min-height: 720px !important; }
            .hero-actions { flex-direction: column; width: 100%; max-width: 320px; }
            .hero-actions a { width: 100%; justify-content: center; }
          }
        `}</style>

        <div className="hero-shell absolute inset-0 min-h-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(15,31,61,0.82) 0%, rgba(15,31,61,0.52) 46%, rgba(15,31,61,0.18) 100%), linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.42))",
            }}
          />

          <div className="relative z-10 h-full min-h-[inherit] flex flex-col items-start justify-center text-left text-white px-6 md:px-10 max-w-screen-xl mx-auto">
            <div
              ref={badgeRef}
              className="mb-6 px-4 py-2 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(201,151,58,0.22)",
                border: "1px solid rgba(201,151,58,0.5)",
                backdropFilter: "blur(8px)",
                color: "#F0C870",
                letterSpacing: "0.2em",
                borderRadius: "999px",
              }}
            >
              San Carlos, California · 2026
            </div>

            <h1
              ref={titleRef}
              className="font-display font-bold leading-tight mb-5 max-w-4xl"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
                textShadow: "0 4px 30px rgba(0,0,0,0.4)",
              }}
            >
              {banner.title}
            </h1>

            <div
              ref={lineRef}
              className="gold-rule mb-6"
              style={{ transformOrigin: "left center" }}
            />

            {banner.subtitle && (
              <p
                ref={subRef}
                className="text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                {banner.subtitle}
              </p>
            )}

            {banner.buttonText && banner.buttonHref && (
              <div ref={ctaRef} className="hero-actions flex items-center gap-4">
                <a
                  href={banner.buttonHref}
                  className="btn-glow inline-flex items-center gap-2 px-8 py-4 font-semibold text-white text-base"
                  style={{
                    background: "linear-gradient(135deg, #8B1A1A, #B02020)",
                    boxShadow: "0 8px 32px rgba(139,26,26,0.5)",
                    animation: "pulse-glow 3s ease-in-out infinite",
                    borderRadius: "8px",
                  }}
                >
                  {banner.buttonText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white text-base transition-all hover:bg-white/20"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: "8px",
                  }}
                >
                  Apply Now
                </a>
              </div>
            )}
          </div>

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-60"
            style={{ animation: "float-up 2.5s ease-in-out infinite" }}
          >
            <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
