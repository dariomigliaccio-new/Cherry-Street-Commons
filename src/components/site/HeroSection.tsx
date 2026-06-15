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

  const hasBg = banner.imageUrl &&
    !banner.imageUrl.includes("hero-bg.jpg") &&
    banner.imageUrl !== "";

  return (
    <section className="w-full flex justify-center" style={{ background: "#0f1f3d" }}>
      {/* Wrapper com proporções corretas */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "1668 / 661",
          maxWidth: "1668px",
        }}
      >
        {/* Mobile override */}
        <style>{`
          @media (max-width: 767px) {
            .hero-inner { aspect-ratio: 800 / 1000 !important; position: relative !important; }
          }
        `}</style>

        <div className="hero-inner absolute inset-0">
          {/* ── Background ── */}
          {hasBg ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.imageUrl})` }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #0f1f3d 0%, #1E3A5F 35%, #3d1010 70%, #8B1A1A 100%)",
                backgroundSize: "400% 400%",
                animation: "gradient-shift 12s ease infinite",
              }}
            />
          )}

          {/* ── Uiverse blobs ── */}
          {!hasBg && (
            <>
              <div
                className="absolute rounded-full opacity-20 blur-3xl"
                style={{
                  width: "45%", height: "80%",
                  top: "-20%", left: "-10%",
                  background: "radial-gradient(circle, #8B1A1A, #C9973A)",
                  animation: "blob-move-1 18s ease-in-out infinite",
                }}
              />
              <div
                className="absolute rounded-full opacity-15 blur-3xl"
                style={{
                  width: "40%", height: "70%",
                  bottom: "-20%", right: "-5%",
                  background: "radial-gradient(circle, #1E3A5F, #4a90d9)",
                  animation: "blob-move-2 22s ease-in-out infinite",
                }}
              />
              <div
                className="absolute rounded-full opacity-10 blur-2xl"
                style={{
                  width: "25%", height: "50%",
                  top: "30%", left: "40%",
                  background: "radial-gradient(circle, #C9973A, #8B1A1A)",
                  animation: "blob-move-3 16s ease-in-out infinite",
                }}
              />
            </>
          )}

          {/* ── Overlay ── */}
          <div
            className="absolute inset-0"
            style={{
              background: hasBg
                ? "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)"
                : "rgba(0,0,0,0.15)",
            }}
          />

          {/* ── Grid pattern overlay (Uiverse style) ── */}
          {!hasBg && (
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          )}

          {/* ── Content ── */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="mb-6 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(201,151,58,0.25)",
                border: "1px solid rgba(201,151,58,0.5)",
                backdropFilter: "blur(8px)",
                color: "#F0C870",
                letterSpacing: "0.2em",
              }}
            >
              San Carlos, California · 2026
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="font-display font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
                textShadow: "0 4px 30px rgba(0,0,0,0.4)",
                letterSpacing: "-0.02em",
              }}
            >
              {banner.title}
            </h1>

            {/* Gold line */}
            <div
              ref={lineRef}
              className="gold-rule mb-6"
              style={{ transformOrigin: "left center" }}
            />

            {/* Subtitle */}
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

            {/* CTA */}
            {banner.buttonText && banner.buttonHref && (
              <div ref={ctaRef} className="flex items-center gap-4">
                <a
                  href={banner.buttonHref}
                  className="btn-glow inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full text-white text-base"
                  style={{
                    background: "linear-gradient(135deg, #8B1A1A, #B02020)",
                    boxShadow: "0 8px 32px rgba(139,26,26,0.5)",
                    animation: "pulse-glow 3s ease-in-out infinite",
                  }}
                >
                  {banner.buttonText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full text-white text-base transition-all hover:bg-white/20"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  Apply Now
                </a>
              </div>
            )}
          </div>

          {/* ── Scroll indicator ── */}
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
