"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";

type MenuItem = { id: string; label: string; href: string; order: number; visible: boolean };
type NavbarProps = { siteName: string; logoUrl: string; menuItems: MenuItem[] };

export default function Navbar({ siteName, logoUrl, menuItems }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  const visible = menuItems
    .filter((m) => m.visible && m.href !== "#contact")
    .sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!open) return;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(menuRef.current, { x: -330 }, { x: 0, duration: 0.35 });
    if (linksRef.current) {
      tl.fromTo(linksRef.current.children,
        { x: -18, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.045, duration: 0.28 },
        "-=0.12"
      );
    }
  }, [open]);

  const handleClose = () => {
    if (!menuRef.current) { setOpen(false); return; }
    gsap.to(menuRef.current, { x: -330, duration: 0.25, ease: "power2.in", onComplete: () => setOpen(false) });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white"
        style={{ height: "80px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1669px] items-center justify-between px-5 md:px-10">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex flex-col gap-[5px] p-2"
            >
              <span className="block h-[2px] w-[22px]" style={{ background: "#1a1a1a" }} />
              <span className="block h-[2px] w-[22px]" style={{ background: "#1a1a1a" }} />
              <span className="block h-[2px] w-[22px]" style={{ background: "#1a1a1a" }} />
            </button>

            <Link href="/" className="flex items-center gap-3">
              {logoUrl && !logoUrl.includes("logo.png") ? (
                <img src={logoUrl} alt={siteName} className="h-[55px] w-auto object-contain" />
              ) : (
                <div className="flex flex-col leading-none">
                  <span className="font-display text-[1.25rem] font-extrabold" style={{ color: "#8B1A1A" }}>
                    Cherry Street
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: "#666" }}>
                    Commons
                  </span>
                </div>
              )}
            </Link>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {visible.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: "#1a1a1a" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {open && (
        <>
          <button
            aria-label="Close menu overlay"
            onClick={handleClose}
            className="fixed inset-0 z-[190] bg-black/30"
          />
          <nav
            ref={menuRef}
            className="fixed left-0 top-0 z-[200] flex h-full w-[320px] max-w-[86vw] flex-col bg-white shadow-2xl"
          >
            <div className="flex justify-end border-b border-black/10 p-5">
              <button onClick={handleClose} aria-label="Close menu" className="p-2 text-[#1a1a1a]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul ref={linksRef} className="list-none py-5">
              {visible.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className="flex items-center gap-4 px-[30px] py-[18px] text-base font-medium transition-colors hover:bg-[#f6f6f4]"
                    style={{ color: "#1a1a1a" }}
                  >
                    <span className="flex h-[22px] w-[22px] items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-semibold">{item.label}</span>
                      <span className="mt-1 text-[13px]" style={{ color: "#666" }}>
                        {item.href === "/" ? "Home page" : `Go to ${item.label.toLowerCase()}`}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-black/10 bg-[#f6f6f4] px-[30px] py-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "#777" }}>
                Cherry Street Commons
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                1244 Cherry Street<br />San Carlos, CA 94070
              </p>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
