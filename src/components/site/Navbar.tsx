"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

type MenuItem = { id: string; label: string; href: string; order: number; visible: boolean };
type NavbarProps = { siteName: string; logoUrl: string; menuItems: MenuItem[] };

export default function Navbar({ siteName, logoUrl, menuItems }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const overlayRef    = useRef<HTMLDivElement>(null);
  const linksRef      = useRef<HTMLDivElement>(null);

  const visible = menuItems.filter(m => m.visible).sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!open) return;
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.inOut" }
    );
    if (linksRef.current) {
      tl.fromTo(linksRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out" },
        "-=0.15"
      );
    }
  }, [open]);

  const handleClose = () => {
    if (!overlayRef.current) { setOpen(false); return; }
    gsap.to(overlayRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => setOpen(false),
    });
  };

  return (
    <>
      {/* ── Sticky white header — always visible ── */}
      <header
        className="sticky top-0 left-0 right-0 z-50 bg-white"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 12px rgba(0,0,0,0.05)" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            {logoUrl && !logoUrl.includes("logo.png") ? (
              <img src={logoUrl} alt={siteName} className="h-9 w-auto object-contain" />
            ) : (
              <div className="flex flex-col leading-none">
                <span
                  className="font-display tracking-tight"
                  style={{ fontSize: "1.15rem", color: "#8B1A1A", letterSpacing: "-0.01em" }}
                >
                  Cherry Street
                </span>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase font-medium"
                  style={{ color: "#999" }}
                >
                  Commons
                </span>
              </div>
            )}
          </Link>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-[5px] p-2 -mr-2 group"
          >
            <span className="block w-6 h-[2px] rounded-full transition-all duration-300" style={{ background: "#2C2C2C" }} />
            <span className="block w-4 h-[2px] rounded-full transition-all duration-300 group-hover:w-6" style={{ background: "#2C2C2C" }} />
            <span className="block w-6 h-[2px] rounded-full" style={{ background: "#2C2C2C" }} />
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay menu ── */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{ background: "#0f1f3d", clipPath: "inset(0 0 100% 0)" }}
        >
          {/* Overlay top bar */}
          <div
            className="flex items-center justify-between px-6 md:px-10 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <Link href="/" onClick={handleClose} className="flex flex-col leading-none">
              <span className="font-display tracking-tight" style={{ fontSize: "1.15rem", color: "white" }}>
                Cherry Street
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                Commons
              </span>
            </Link>

            <button onClick={handleClose} aria-label="Close menu" className="p-2 -mr-2 text-white opacity-70 hover:opacity-100 transition-opacity">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div ref={linksRef} className="flex-1 flex flex-col justify-center px-8 md:px-16">
            {visible.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleClose}
                className="block py-4 font-display font-bold transition-colors duration-200 hover:text-[#C9973A]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.8rem)",
                  color: "white",
                  letterSpacing: "-0.02em",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={handleClose}
              className="block py-4 font-display font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.8rem)",
                color: "#C9973A",
                letterSpacing: "-0.02em",
              }}
            >
              Apply Now →
            </a>
          </div>

          {/* Overlay bottom */}
          <div
            className="px-8 md:px-16 pb-8 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
              1244 Cherry Street · San Carlos, CA · Opening 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
}
