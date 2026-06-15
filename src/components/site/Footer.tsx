import Link from "next/link";

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
    <footer id="contact" style={{ background: "#0f1f3d" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <h3
            className="font-display font-bold text-2xl mb-3"
            style={{ color: "white", letterSpacing: "-0.02em" }}
          >
            {siteName}
          </h3>
          <div className="gold-rule mb-5" />
          <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            33 affordable homes in the heart of downtown San Carlos.<br />
            A partnership between Eden Housing &amp; HIP Housing.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}>
            OPENING 2026 · SAN CARLOS, CA
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "#C9973A" }}>
            Contact
          </h4>
          <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
            <li>
              <span style={{ color: "rgba(255,255,255,0.35)" }}>📍 </span>
              {address || "1244 Cherry Street, San Carlos, CA"}
            </li>
            {email && (
              <li>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>✉ </span>{email}
                </a>
              </li>
            )}
            {phone && (
              <li>
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                  <span style={{ color: "rgba(255,255,255,0.35)" }}>📞 </span>{phone}
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

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>{footerText}</p>
          <Link href="/admin" className="text-xs hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.18)" }}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
