type FooterProps = {
  siteName: string;
  footerText: string;
  email: string;
  phone: string;
  address: string;
};

export default function Footer({ siteName, footerText, email, phone, address }: FooterProps) {
  return (
    <footer id="contact" className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">{siteName}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Building community connections, one step at a time.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Contato</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              {email && <li>📧 {email}</li>}
              {phone && <li>📞 {phone}</li>}
              {address && <li>📍 {address}</li>}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Admin</h4>
            <a
              href="/admin"
              className="text-slate-400 text-sm hover:text-white transition"
            >
              Painel Administrativo →
            </a>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 text-center text-slate-500 text-sm">
          {footerText}
        </div>
      </div>
    </footer>
  );
}
