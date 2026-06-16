import Link from "next/link";
import { normalizeHref } from "@/lib/site-data";

type FooterProps = {
  siteName: string;
  footerText: string;
  email: string;
  phone: string;
  address: string;
  menuItems?: { id: string; label: string; href: string; visible: boolean }[];
};

export default function Footer({ siteName, footerText, email, phone, address, menuItems = [] }: FooterProps) {
  const visible = menuItems.filter(m => m.visible);

  return (
    <footer id="contact" style={{ background: "#1f1d1a" }}>
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-5 py-14 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <h3
            className="mb-3 text-2xl font-extrabold"
            style={{ color: "white" }}
          >
            {siteName}
          </h3>
          <p className="mb-6 max-w-[30rem] text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
            33 affordable homes in the heart of downtown San Carlos.<br />
            A partnership between Eden Housing &amp; HIP Housing.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}>
            OPENING 2026 · SAN CARLOS, CA
          </p>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-widest" style={{ color: "#d6c9b6" }}>
            Contact
          </h4>
          <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
            <li>
              {address || "1244 Cherry Street, San Carlos, CA"}
            </li>
            {email && (
              <li>
                <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                  {email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a href={`tel:${phone}`} className="transition-colors hover:text-white">
                  {phone}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-bold uppercase tracking-widest" style={{ color: "#d6c9b6" }}>
            Navigation
          </h4>
          <ul className="space-y-2">
            {visible.map(item => (
              <li key={item.id}>
                <Link
                  href={normalizeHref(item.href)}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-2 px-5 py-5 md:flex-row md:px-10">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>{footerText}</p>
          <Link href="/admin" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.18)" }}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
