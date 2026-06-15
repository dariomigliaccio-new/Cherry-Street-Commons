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

    tl.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0.55, duration: 1.5 })
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        "-=0.4"
      );
  }, []);

  const bgStyle = banner.imageUrl
    ? { backgroundImage: `url(${banner.imageUrl})` }
    : { background: "linear-gradient(135deg, #1e3a5f 0%, #2d6a4f 100%)" };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={bgStyle}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
        style={{ opacity: 0.55 }}
      />

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
        >
          {banner.title}
        </h1>
        {banner.subtitle && (
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-10 font-light"
          >
            {banner.subtitle}
          </p>
        )}
        {banner.buttonText && banner.buttonHref && (
          <a
            ref={ctaRef}
            href={banner.buttonHref}
            className="inline-block px-10 py-4 bg-white text-slate-900 font-bold text-lg rounded-full shadow-2xl hover:bg-slate-100 transition-all duration-300 hover:scale-105"
          >
            {banner.buttonText}
          </a>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
