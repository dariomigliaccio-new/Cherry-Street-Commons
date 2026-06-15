"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

type MenuItem = {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
};

type NavbarProps = {
  siteName: string;
  logoUrl: string;
  menuItems: MenuItem[];
};

export default function Navbar({ siteName, logoUrl, menuItems }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visible = menuItems.filter((m) => m.visible).sort((a, b) => a.order - b.order);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl && logoUrl !== "/uploads/logo.png" ? (
            <img src={logoUrl} alt={siteName} className="h-10 w-auto object-contain" />
          ) : (
            <span className={`text-2xl font-bold transition-colors ${scrolled ? "text-slate-900" : "text-white"}`}>
              {siteName}
            </span>
          )}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {visible.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${
                scrolled ? "text-slate-700" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className={`space-y-1.5 ${scrolled ? "text-slate-900" : "text-white"}`}>
            <span className="block w-6 h-0.5 bg-current" />
            <span className="block w-6 h-0.5 bg-current" />
            <span className="block w-6 h-0.5 bg-current" />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-3">
          {visible.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-700 font-medium py-1 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
