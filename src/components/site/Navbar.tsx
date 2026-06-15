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
  const navRef  = useRef<HTMLElement>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const visible = menuItems.filter(m => m.visible).sort((a, b) => a.order - b.order);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 left-0 right-0 z-50 bg-white"
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
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
                className="font-display font-bold tracking-tight"
                style={{ fontSize: "1.2rem", color: "#8B1A1A", letterSpacing: "-0.02em" }}
              >
                Cherry Street
              </span>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "#6B6B6B" }}
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
              className="text-sm font-medium transition-colors duration-200 relative group"
              style={{ color: "#2C2C2C" }}
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
            className="btn-glow text-sm font-semibold px-5 py-2.5 rounded-full text-white"
            style={{
              background: "linear-gradient(135deg, #8B1A1A, #B02020)",
              boxShadow: "0 4px 20px rgba(139,26,26,0.3)",
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
          <span className="block h-0.5 w-6" style={{ background: "#2C2C2C" }} />
          <span className="block h-0.5 w-4" style={{ background: "#2C2C2C" }} />
          <span className="block h-0.5 w-6" style={{ background: "#2C2C2C" }} />
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
