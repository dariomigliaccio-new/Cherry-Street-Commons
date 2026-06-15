import Link from "next/link";
import FooterMapWrapper from "./FooterMapWrapper";

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
    <footer id="contact">
      {/* ── Map block — tall and prominent ── */}
      <div className="relative w-full" style={{ height: "480px" }}>
        <FooterMapWrapper />

        {/* Floating address card over map */}
        <div
          className="absolute top-6 left-6 z-10 rounded-2xl p-5 shadow-2xl"
          style={{
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.8)",
            maxWidth: "260px",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #8B1A1A, #B02020)" }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
            </div>
            <p className="font-bold text-sm" style={{ color: "#1E3A5F" }}>Cherry Street Commons</p>
          </div>
          <p className="text-sm font-medium" style={{ color: "#2C2C2C" }}>1244 Cherry Street</p>
          <p className="text-sm" style={{ color: "#6B6B6B" }}>San Carlos, California</p>
          <div
            className="mt-3 pt-3 flex items-center gap-1 text-xs font-semibold"
            style={{ borderTop: "1px solid #f0f0f0", color: "#8B1A1A" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
            Opening 2026
          </div>
        </div>
      </div>

      {/* ── Info strip ── */}
      <div style={{ background: "#0f1f3d" }}>
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3
              className="font-display font-bold text-2xl mb-3"
              style={{ color: "white", letterSpacing: "-0.02em" }}
            >
              Cherry Street Commons
            </h3>
            <div className="gold-rule mb-4" />
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
              33 affordable homes in the heart of downtown San Carlos.<br />
              A partnership between Eden Housing & HIP Housing.
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
              OPENING 2026 · SAN CARLOS, CA
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "#C9973A" }}>
              Contact
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 opacity-50">📍</span>
                <span>{address || "1244 Cherry Street, San Carlos, CA"}</span>
              </li>
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="opacity-50">✉️</span> {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="opacity-50">📞</span> {phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "#C9973A" }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {visible.map(item => (
                <li key={item.id}>
                  <Link
                    href={item.href}
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

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{footerText}</p>
            <Link href="/admin" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.2)" }}>
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
