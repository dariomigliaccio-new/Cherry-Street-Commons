"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

type MenuItem = { id: string; label: string; href: string; order: number; visible: boolean };
type NavbarProps = { siteName: string; logoUrl: string; menuItems: MenuItem[] };

export default function Navbar({ siteName, logoUrl, menuItems }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const overlayRef       = useRef<HTMLDivElement>(null);
  const linksRef         = useRef<HTMLDivElement>(null);

  const visible = menuItems.filter(m => m.visible).sort((a, b) => a.order - b.order);

  // Open animation
  useEffect(() => {
    if (!open) return;
    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power3.inOut" }
    );
    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );
    }
  }, [open]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => setOpen(false),
    });
  };

  return (
    <>
      {/* ── Floating header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%)",
        }}
      >
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-none">
          {logoUrl && !logoUrl.includes("logo.png") ? (
            <img src={logoUrl} alt={siteName} className="h-9 w-auto object-contain" />
          ) : (
            <>
              <span
                className="font-display font-bold"
                style={{ fontSize: "1.1rem", color: "white", letterSpacing: "-0.02em" }}
              >
                Cherry Street
              </span>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                Commons
              </span>
            </>
          )}
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="flex flex-col gap-[5px] p-2 group"
        >
          <span className="block w-7 h-[2px] bg-white transition-all group-hover:w-5" />
          <span className="block w-5 h-[2px] bg-white transition-all group-hover:w-7" />
          <span className="block w-7 h-[2px] bg-white" />
        </button>
      </header>

      {/* ── Full-screen overlay menu ── */}
      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{
            background: "#0f1f3d",
            clipPath: "inset(0 0 100% 0)",
          }}
        >
          {/* Overlay header */}
          <div className="flex items-center justify-between px-8 py-5">
            <Link href="/" onClick={handleClose} className="flex flex-col leading-none">
              <span
                className="font-display font-bold"
                style={{ fontSize: "1.1rem", color: "white", letterSpacing: "-0.02em" }}
              >
                Cherry Street
              </span>
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
                Commons
              </span>
            </Link>

            <button onClick={handleClose} aria-label="Fechar menu" className="p-2 text-white hover:opacity-60 transition-opacity">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-8" style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />

          {/* Navigation links */}
          <div
            ref={linksRef}
            className="flex-1 flex flex-col justify-center px-8 md:px-20"
          >
            {visible.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleClose}
                className="block py-5 font-display font-bold transition-colors hover:text-[#C9973A]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
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
              className="block py-5 font-display font-bold"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                color: "#C9973A",
                letterSpacing: "-0.02em",
              }}
            >
              Apply Now
            </a>
          </div>

          {/* Overlay footer */}
          <div className="px-8 md:px-20 pb-10 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              1244 Cherry Street · San Carlos, California · Opening 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
}
