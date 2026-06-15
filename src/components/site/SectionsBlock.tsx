"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Section = {
  id: string; slug: string; title: string; content: string;
  imageUrl: string; order: number; visible: boolean;
};

const AMENITIES = [
  { icon: "🏠", label: "33 Affordable Homes", sub: "1, 2 & 3 bedrooms" },
  { icon: "⚡", label: "All-Electric", sub: "Heat pump + solar array" },
  { icon: "🚗", label: "EV-Ready Parking", sub: "23 spaces" },
  { icon: "🚲", label: "Micro-Mobility", sub: "20 bike + 8 scooter spaces" },
  { icon: "🌿", label: "Courtyard & Tot Lot", sub: "Outdoor gathering space" },
  { icon: "🍳", label: "Community Kitchen", sub: "Shared media & meeting rooms" },
  { icon: "👔", label: "Laundry On-Site", sub: "Resident convenience" },
  { icon: "🌳", label: "Street Improvements", sub: "New trees & pedestrian plaza" },
];

const PARTNERS = [
  { role: "Developers", names: ["Eden Housing", "HIP Housing"] },
  { role: "Architect", names: ["Van Meter Williams Pollack"] },
  { role: "General Contractor", names: ["Echelcon, Inc."] },
  { role: "Financial Partners", names: ["City of San Carlos"] },
];

export default function SectionsBlock({ sections }: { sections: Section[] }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-quart", offset: 60 });
  }, []);

  const visible = sections.filter(s => s.visible).sort((a, b) => a.order - b.order);
  const about = visible.find(s => s.slug === "about");
  const sustainability = visible.find(s => s.slug === "sustainability");
  const community = visible.find(s => s.slug === "community");

  return (
    <>
      {/* ── About ── */}
      {about && (
        <section id="about" className="py-20 md:py-28" style={{ background: "#FAF7F2" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div data-aos="fade-right">
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C9973A" }}>
                  About the Project
                </p>
                <h2
                  className="font-display font-bold leading-tight mb-5"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1E3A5F", letterSpacing: "-0.02em" }}
                >
                  {about.title}
                </h2>
                <div className="gold-rule mb-6" />
                <div className="space-y-4">
                  {about.content.split("\n\n").map((para, i) => (
                    <p key={i} className="leading-relaxed text-base" style={{ color: "#4A4A4A" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Stats card */}
              <div data-aos="fade-left" data-aos-delay="150">
                <div
                  className="rounded-3xl p-8 md:p-10"
                  style={{ background: "linear-gradient(135deg, #1E3A5F 0%, #0f1f3d 100%)" }}
                >
                  <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "#C9973A" }}>
                    At a Glance
                  </p>
                  {[
                    ["33", "Affordable Homes"],
                    ["3", "Bedroom Types (1BR, 2BR, 3BR)"],
                    ["2026", "Opening Year"],
                    ["100%", "Affordable Units"],
                  ].map(([num, label]) => (
                    <div key={label} className="flex items-center gap-4 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      <span
                        className="font-display font-bold text-3xl md:text-4xl"
                        style={{ color: "#C9973A", minWidth: "72px" }}
                      >
                        {num}
                      </span>
                      <span className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.72)" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                  <div className="mt-6">
                    <a
                      href="#location"
                      className="inline-flex items-center gap-2 text-sm font-semibold"
                      style={{ color: "#C9973A" }}
                    >
                      View Location
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Amenities Grid ── */}
      <section className="py-20" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#C9973A" }}>
              Features & Amenities
            </p>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#1E3A5F", letterSpacing: "-0.02em" }}
            >
              Everything You Need
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {AMENITIES.map((item, i) => (
              <div
                key={item.label}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="rounded-2xl p-6 text-center transition-shadow hover:shadow-lg"
                style={{
                  background: "#FAF7F2",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="font-semibold text-sm mb-1" style={{ color: "#1E3A5F" }}>{item.label}</p>
                <p className="text-xs" style={{ color: "#888" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sustainability ── */}
      {sustainability && (
        <section id="sustainability" className="py-20 md:py-28" style={{ background: "#FAF7F2" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C9973A" }}>
                Green Living
              </p>
              <h2
                className="font-display font-bold leading-tight mb-5"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1E3A5F", letterSpacing: "-0.02em" }}
              >
                {sustainability.title}
              </h2>
              <div className="gold-rule mx-auto mb-8" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {sustainability.content.split("\n\n").map((para, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="rounded-2xl p-7"
                  style={{
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "linear-gradient(135deg, #1E3A5F, #2d5a9e)" }}
                  >
                    {i === 0 && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )}
                    {i >= 2 && (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{para}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Community / Partners ── */}
      {community && (
        <section id="community" className="py-20 md:py-28" style={{ background: "white" }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div data-aos="fade-right">
                <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "#C9973A" }}>
                  Community
                </p>
                <h2
                  className="font-display font-bold leading-tight mb-5"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1E3A5F", letterSpacing: "-0.02em" }}
                >
                  {community.title}
                </h2>
                <div className="gold-rule mb-6" />
                <div className="space-y-4">
                  {community.content.split("\n\n").slice(0, 2).map((para, i) => (
                    <p key={i} className="leading-relaxed text-base" style={{ color: "#4A4A4A" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Partners */}
              <div data-aos="fade-left" data-aos-delay="150">
                <div
                  className="rounded-3xl p-8"
                  style={{ background: "#FAF7F2", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "#C9973A" }}>
                    Development Partners
                  </p>
                  <div className="space-y-5">
                    {PARTNERS.map(({ role, names }) => (
                      <div key={role} className="pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#999" }}>{role}</p>
                        {names.map(name => (
                          <p key={name} className="font-semibold text-base" style={{ color: "#1E3A5F" }}>{name}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-xs" style={{ color: "#999" }}>San Carlos, California · Opening 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
