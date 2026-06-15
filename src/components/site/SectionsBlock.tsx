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

const FLOOR_PLANS = [
  { name: "1 Bedroom", units: "Select homes", detail: "Efficient layouts for individuals and couples" },
  { name: "2 Bedroom", units: "Family homes", detail: "Flexible space for small households" },
  { name: "3 Bedroom", units: "Larger homes", detail: "Room for families who need more space" },
];

export default function SectionsBlock({ sections }: { sections: Section[] }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-quart", offset: 60 });
  }, []);

  const visible = sections.filter(s => s.visible).sort((a, b) => a.order - b.order);
  const about        = visible.find(s => s.slug === "about");
  const sustainability = visible.find(s => s.slug === "sustainability");
  const community    = visible.find(s => s.slug === "community");

  return (
    <>
      {/* ── About ── */}
      {about && (
        <section id="about" className="py-24 md:py-36" style={{ background: "#FAF7F2" }}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">

            {/* Centered header */}
            <div className="text-center mb-14" data-aos="fade-up">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9973A" }}>
                About the Project
              </p>
              <h2
                className="font-display mb-5"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1E3A5F", letterSpacing: "-0.02em" }}
              >
                {about.title}
              </h2>
              <div className="gold-rule mx-auto" />
            </div>

            {/* Two-col: text + stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div data-aos="fade-right" className="space-y-5">
                {about.content.split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed text-[1.05rem]" style={{ color: "#4A4A4A", fontWeight: 300 }}>
                    {para}
                  </p>
                ))}
              </div>

              <div data-aos="fade-left" data-aos-delay="120">
                <div className="rounded-2xl p-8 md:p-10" style={{ background: "linear-gradient(135deg, #1E3A5F, #0f1f3d)" }}>
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-7" style={{ color: "#C9973A" }}>
                    At a Glance
                  </p>
                  {[
                    ["33", "Affordable Homes"],
                    ["3", "Bedroom Types (1BR · 2BR · 3BR)"],
                    ["2026", "Expected Opening Year"],
                    ["100%", "Affordable Units"],
                  ].map(([num, label]) => (
                    <div key={label} className="flex items-center gap-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      <span className="font-display font-bold text-4xl" style={{ color: "#C9973A", minWidth: "80px" }}>
                        {num}
                      </span>
                      <span className="text-sm leading-snug font-light" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Amenities ── */}
      <section className="py-24 md:py-32" style={{ background: "white" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14" data-aos="fade-up">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9973A" }}>
              Features & Amenities
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1E3A5F", letterSpacing: "-0.02em" }}
            >
              Everything You Need
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {AMENITIES.map((item, i) => (
              <div
                key={item.label}
                data-aos="fade-up"
                data-aos-delay={i * 55}
                className="rounded-2xl p-6 text-center"
                style={{ background: "#FAF7F2", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <p className="font-semibold text-sm mb-1" style={{ color: "#1E3A5F" }}>{item.label}</p>
                <p className="text-xs font-light" style={{ color: "#999" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="floorplans" className="py-24 md:py-32" style={{ background: "#0f1f3d" }}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <div data-aos="fade-up">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9973A" }}>
                Floor Plans
              </p>
              <h2
                className="font-display mb-5"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "white" }}
              >
                Homes planned for different household sizes
              </h2>
              <div className="gold-rule mb-6" />
              <p className="text-base leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.68)" }}>
                Cherry Street Commons will include one, two, and three-bedroom affordable apartments arranged around shared community spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FLOOR_PLANS.map((plan, i) => (
                <div
                  key={plan.name}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="p-6 min-h-52 flex flex-col justify-between"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px" }}
                >
                  <div>
                    <p className="text-sm font-semibold mb-3" style={{ color: "#C9973A" }}>{plan.units}</p>
                    <h3 className="font-display text-2xl mb-3" style={{ color: "white" }}>{plan.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>{plan.detail}</p>
                  </div>
                  <p className="text-xs uppercase tracking-widest mt-8" style={{ color: "rgba(255,255,255,0.36)" }}>
                    Details coming soon
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sustainability ── */}
      {sustainability && (
        <section id="sustainability" className="py-24 md:py-36" style={{ background: "#FAF7F2" }}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-aos="fade-up">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9973A" }}>
                Green Living
              </p>
              <h2
                className="font-display mb-5"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1E3A5F", letterSpacing: "-0.02em" }}
              >
                {sustainability.title}
              </h2>
              <div className="gold-rule mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {sustainability.content.split("\n\n").map((para, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 90}
                  className="rounded-2xl p-7"
                  style={{ background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
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
                  <p className="text-sm leading-relaxed font-light" style={{ color: "#4A4A4A" }}>{para}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Community ── */}
      {community && (
        <section id="community" className="py-24 md:py-36" style={{ background: "white" }}>
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <div className="text-center mb-14" data-aos="fade-up">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "#C9973A" }}>
                Community
              </p>
              <h2
                className="font-display mb-5"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1E3A5F", letterSpacing: "-0.02em" }}
              >
                {community.title}
              </h2>
              <div className="gold-rule mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div data-aos="fade-right" className="space-y-5">
                {community.content.split("\n\n").slice(0, 2).map((para, i) => (
                  <p key={i} className="leading-relaxed text-[1.05rem] font-light" style={{ color: "#4A4A4A" }}>
                    {para}
                  </p>
                ))}
              </div>

              <div data-aos="fade-left" data-aos-delay="120">
                <div className="rounded-2xl p-8" style={{ background: "#FAF7F2", border: "1px solid rgba(0,0,0,0.05)" }}>
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: "#C9973A" }}>
                    Development Partners
                  </p>
                  <div className="space-y-5">
                    {PARTNERS.map(({ role, names }) => (
                      <div key={role} className="pb-5" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <p className="text-[10px] uppercase tracking-widest mb-1 font-medium" style={{ color: "#aaa" }}>{role}</p>
                        {names.map(name => (
                          <p key={name} className="font-semibold text-base" style={{ color: "#1E3A5F" }}>{name}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-light mt-4" style={{ color: "#bbb" }}>San Carlos, California · Opening 2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
