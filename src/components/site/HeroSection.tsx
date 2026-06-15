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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0.45, duration: 1.4 })
      .fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.7")
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
      .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
  }, []);

  const hasBg = banner.imageUrl && banner.imageUrl !== "/uploads/hero-bg.jpg";

  return (
    <section className="w-full flex justify-center bg-slate-100">
      {/* Desktop: 1668×661 — Mobile: 800×1000 */}
      <div
        className="relative w-full overflow-hidden bg-slate-800"
        style={{
          /* Desktop ratio: 1668/661 ≈ 2.523 */
          aspectRatio: "1668 / 661",
          maxWidth: "1668px",
        }}
      >
        {/* Mobile override via inline style + tailwind breakpoint trick */}
        <style>{`
          @media (max-width: 767px) {
            .hero-wrapper {
              aspect-ratio: 800 / 1000 !important;
            }
          }
        `}</style>
        <div className="hero-wrapper absolute inset-0"
          style={{
            backgroundImage: hasBg ? `url(${banner.imageUrl})` : "linear-gradient(135deg, #1e3a5f 0%, #8B1A1A 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.45 }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            style={{ textShadow: "0 3px 20px rgba(0,0,0,0.5)" }}
          >
            {banner.title}
          </h1>

          {banner.subtitle && (
            <p
              ref={subtitleRef}
              className="text-lg md:text-2xl text-white/85 mb-8 max-w-2xl font-light"
            >
              {banner.subtitle}
            </p>
          )}

          {banner.buttonText && banner.buttonHref && (
            <a
              ref={ctaRef}
              href={banner.buttonHref}
              className="inline-block px-9 py-3.5 bg-white text-slate-900 font-bold rounded-full shadow-xl hover:bg-slate-100 transition-all duration-300 hover:scale-105 text-base"
            >
              {banner.buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
