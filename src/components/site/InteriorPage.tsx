import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "@/components/site/Footer";
import MapSection from "@/components/site/MapSection";
import Navbar from "@/components/site/Navbar";
import type { PublicMenuItem, PublicSection } from "@/lib/site-data";

type InteriorPageProps = {
  siteName: string;
  logoUrl: string;
  menuItems: PublicMenuItem[];
  title: string;
  eyebrow?: string;
  intro: string;
  section?: PublicSection;
  children?: ReactNode;
  showMap?: boolean;
  footerText?: string;
  email?: string;
  phone?: string;
  address?: string;
};

function Paragraphs({ content }: { content: string }) {
  return (
    <div className="space-y-5">
      {content.split("\n\n").filter(Boolean).map((paragraph, index) => (
        <p key={index} className="text-[1.02rem] leading-[1.75]" style={{ color: "#4a4742" }}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default function InteriorPage({
  siteName,
  logoUrl,
  menuItems,
  title,
  eyebrow,
  intro,
  section,
  children,
  showMap = false,
  footerText = "Cherry Street Commons",
  email = "",
  phone = "",
  address = "1244 Cherry Street, San Carlos, CA 94070",
}: InteriorPageProps) {
  return (
    <>
      <Navbar siteName={siteName} logoUrl={logoUrl} menuItems={menuItems} />
      <main className="bg-white pt-20">
        <section className="border-b border-[#e8e4dc] bg-[#f7f4ef] py-16 md:py-20">
          <div className="mx-auto max-w-[1120px] px-5 md:px-10">
            {eyebrow && (
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "#7f1717" }}>
                {eyebrow}
              </p>
            )}
            <h1 className="max-w-[820px] text-[2.35rem] font-extrabold leading-[1.04] md:text-[4.2rem]" style={{ color: "#1a1a1a" }}>
              {title}
            </h1>
            <p className="mt-6 max-w-[720px] text-[1.05rem] leading-[1.65] md:text-[1.18rem]" style={{ color: "#625e57" }}>
              {intro}
            </p>
          </div>
        </section>

        {(section || children) && (
          <section className="py-14 md:py-20">
            <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 px-5 md:grid-cols-[0.75fr_1.25fr] md:px-10">
              <aside>
                <p className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: "#7f1717" }}>
                  Cherry Street Commons
                </p>
                <Link href="/apply" className="mt-6 inline-flex items-center gap-2 rounded-[12px] border border-[#d8d0c3] px-5 py-3 text-sm font-bold text-[#1a1a1a] transition-colors hover:border-[#7f1717]">
                  Apply updates
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </aside>
              <div>
                {section && <Paragraphs content={section.content} />}
                {children}
              </div>
            </div>
          </section>
        )}

        {showMap && <MapSection />}
      </main>
      <Footer
        siteName={siteName}
        footerText={footerText}
        email={email}
        phone={phone}
        address={address}
        menuItems={menuItems}
      />
    </>
  );
}
