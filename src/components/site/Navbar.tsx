"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

type MenuItem = {
  id: string; label: string; href: string; order: number; visible: boolean;
};

type NavbarProps = {
  siteName: string; logoUrl: string; menuItems: MenuItem[];
};

export default function Navbar({ siteName, logoUrl, menuItems }: NavbarProps) {
  const navRef     = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobile,   setMobile]   = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = menuItems.filter(m => m.visible).sort((a, b) => a.order - b.order);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.96)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          {logoUrl && !logoUrl.includes("logo.png") ? (
            <img src={logoUrl} alt={siteName} className="h-10 w-auto object-contain" />
          ) : (
            <div className="flex flex-col leading-none">
              <span
                className="font-display font-bold tracking-tight transition-colors"
                style={{
                  fontSize: "1.2rem",
                  color: scrolled ? "#8B1A1A" : "white",
                  letterSpacing: "-0.02em",
                }}
              >
                Cherry Street
              </span>
              <span
                className="text-xs tracking-widest uppercase transition-colors"
                style={{ color: scrolled ? "#6B6B6B" : "rgba(255,255,255,0.75)" }}
              >
                Commons
              </span>
            </div>
          )}
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {visible.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm font-medium transition-all duration-200 relative group"
              style={{ color: scrolled ? "#2C2C2C" : "rgba(255,255,255,0.9)" }}
            >
              {item.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                style={{ background: "#8B1A1A" }}
              />
            </Link>
          ))}
          <a
            href="#contact"
            className="btn-glow text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #8B1A1A, #B02020)",
              boxShadow: "0 4px 20px rgba(139,26,26,0.35)",
            }}
          >
            Apply Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
          onClick={() => setMobile(!mobile)}
        >
          <span className="block h-0.5 w-6 transition-all" style={{ background: scrolled ? "#2C2C2C" : "white" }} />
          <span className="block h-0.5 w-4 transition-all" style={{ background: scrolled ? "#2C2C2C" : "white" }} />
          <span className="block h-0.5 w-6 transition-all" style={{ background: scrolled ? "#2C2C2C" : "white" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobile && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {visible.map(item => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMobile(false)}
              className="block text-slate-700 font-medium py-2 border-b border-slate-50 hover:text-[#8B1A1A] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="#contact"
            className="block text-center py-3 rounded-full text-white font-semibold mt-2"
            style={{ background: "linear-gradient(135deg, #8B1A1A, #B02020)" }}
          >
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
}
