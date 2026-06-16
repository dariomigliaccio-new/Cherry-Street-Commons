"use client";
import { useState } from "react";
import Link from "next/link";
import { normalizeHref } from "@/lib/site-data";

type MenuItem = { id: string; label: string; href: string; order: number; visible: boolean };
type NavbarProps = { siteName: string; logoUrl: string; menuItems: MenuItem[] };

export default function Navbar({ siteName, logoUrl, menuItems }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const visible = (menuItems.length ? menuItems : [
    { id: "home", label: "Home", href: "/", order: 0, visible: true },
    { id: "about", label: "About", href: "/about", order: 1, visible: true },
    { id: "homes", label: "Homes", href: "/homes", order: 2, visible: true },
    { id: "location", label: "Location", href: "/location", order: 3, visible: true },
    { id: "apply", label: "Apply", href: "/apply", order: 4, visible: true },
  ])
    .filter((m) => m.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 bg-white"
        style={{ height: "80px", borderBottom: "1px solid #e8e4dc" }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1669px] items-center justify-between px-5 md:px-10">
          <div className="flex min-w-0 items-center gap-4 md:gap-5">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] transition-opacity hover:opacity-60"
            >
              <span className="block h-[2px] w-[24px] bg-[#1a1a1a]" />
              <span className="block h-[2px] w-[24px] bg-[#1a1a1a]" />
              <span className="block h-[2px] w-[24px] bg-[#1a1a1a]" />
            </button>

            <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
              {logoUrl && !logoUrl.includes("logo.png") ? (
                <img src={logoUrl} alt={siteName} className="h-[52px] w-auto max-w-[190px] object-contain md:max-w-[260px]" />
              ) : (
                <div className="flex min-w-0 flex-col leading-none">
                  <span className="text-[1.14rem] font-extrabold md:text-[1.25rem]" style={{ color: "#7f1717" }}>
                    Cherry Street
                  </span>
                  <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#6f6a60" }}>
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
                href={normalizeHref(item.href)}
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
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[190] bg-black/25"
          />
          <nav
            className="fixed left-0 top-0 z-[200] flex h-full w-[320px] max-w-[86vw] flex-col bg-white shadow-2xl"
          >
            <div className="flex h-20 items-center justify-between border-b border-[#e8e4dc] px-[30px]">
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#7f1717" }}>
                Menu
              </p>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-[#1a1a1a] transition-opacity hover:opacity-60">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <ul className="list-none py-5">
              {visible.map((item) => (
                <li key={item.id}>
                  <Link
                    href={normalizeHref(item.href)}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 px-[30px] py-[17px] text-[18px] font-semibold transition-colors hover:bg-[#f7f4ef]"
                    style={{ color: "#1a1a1a" }}
                  >
                    <span className="flex h-[22px] w-[22px] items-center justify-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-[#e8e4dc] bg-[#f7f4ef] px-[30px] py-6">
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
