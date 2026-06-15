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

export default function Footer({
  siteName,
  footerText,
  email,
  phone,
  address,
  menuItems = [],
}: FooterProps) {
  const visible = menuItems.filter((m) => m.visible);

  return (
    <footer id="contact" className="bg-white border-t border-slate-200">
      {/* Map block */}
      <div className="w-full" style={{ height: "360px" }}>
        <FooterMapWrapper />
      </div>

      {/* Info strip */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-3 tracking-wide">{siteName}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Affordable multi-family housing in the heart of downtown San Carlos.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Contato
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {address && (
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-slate-500">📍</span>
                  {address}
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2">
                  <span className="text-slate-500">✉️</span>
                  <a href={`mailto:${email}`} className="hover:text-white transition">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2">
                  <span className="text-slate-500">📞</span>
                  <a href={`tel:${phone}`} className="hover:text-white transition">
                    {phone}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              {visible.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-300 hover:text-white transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-sm text-slate-500 hover:text-slate-300 transition"
                >
                  Admin →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-4">
          <p className="text-center text-slate-500 text-xs">{footerText}</p>
        </div>
      </div>
    </footer>
  );
}
