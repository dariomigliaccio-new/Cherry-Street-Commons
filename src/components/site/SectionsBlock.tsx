"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Section = {
  id: string;
  slug: string;
  title: string;
  content: string;
  imageUrl: string;
  order: number;
  visible: boolean;
};

const NEXT_STEPS = [
  {
    title: "About the Project",
    text: "Learn what is planned for Cherry Street Commons and the families it will serve.",
    href: "#about",
    link: "Learn more",
    icon: "M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15zM12 6v6M9 9h6",
  },
  {
    title: "Homes",
    text: "Explore the planned one, two, and three-bedroom affordable apartment options.",
    href: "#floorplans",
    link: "See plans",
    icon: "M3 10.5L12 3l9 7.5V21h-6v-6H9v6H3V10.5z",
  },
  {
    title: "Location",
    text: "Find the downtown San Carlos address near Caltrain, services, and daily needs.",
    href: "#location",
    link: "View map",
    icon: "M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11zM12 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  },
  {
    title: "Apply",
    text: "Application details and resident information will be shared as opening approaches.",
    href: "#floorplans",
    link: "Get ready",
    icon: "M4 12h14M12 5l7 7-7 7",
  },
];

const AMENITIES = [
  { label: "33 Affordable Homes", sub: "1, 2 & 3 bedrooms" },
  { label: "All-Electric", sub: "Heat pump + solar array" },
  { label: "EV-Ready Parking", sub: "23 spaces" },
  { label: "Micro-Mobility", sub: "Bike + scooter spaces" },
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

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SectionsBlock({ sections }: { sections: Section[] }) {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-quart", offset: 50 });
  }, []);

  const visible = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);
  const about = visible.find((s) => s.slug === "about");
  const sustainability = visible.find((s) => s.slug === "sustainability");
  const community = visible.find((s) => s.slug === "community");

  return (
    <>
      <section className="py-[60px] md:py-[64px]" style={{ background: "white" }}>
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div className="mx-auto mb-10 max-w-[760px] text-center" data-aos="fade-up">
            <h2
              className="font-display mb-5 font-extrabold leading-[1.1]"
              style={{ color: "#1a1a1a", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Welcome to Cherry Street Commons.
            </h2>
            <p className="text-base leading-relaxed md:text-[1.15rem]" style={{ color: "#666" }}>
              Affordable homes are coming to downtown San Carlos with shared spaces, sustainable systems, and a location close to everyday essentials.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {NEXT_STEPS.map((card, i) => (
              <a
                key={card.title}
                href={card.href}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="flex min-h-[180px] flex-col items-start gap-3 border border-black/10 bg-white p-[25px] text-left no-underline transition hover:-translate-y-1 hover:shadow-xl"
                style={{ borderRadius: "12px", color: "#1a1a1a" }}
              >
                <span className="flex h-10 w-10 items-center justify-center">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d={card.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="flex flex-1 flex-col gap-2">
                  <span className="text-[1.05rem] font-bold">{card.title}</span>
                  <span className="text-sm leading-relaxed" style={{ color: "#666" }}>{card.text}</span>
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold">
                  {card.link}
                  <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {about && (
        <section id="about" className="py-[60px] md:py-[72px]" style={{ background: "#FAF7F2" }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-10">
            <div className="mx-auto mb-10 max-w-[760px] text-center" data-aos="fade-up">
              <h2
                className="font-display mb-4 font-extrabold leading-[1.1]"
                style={{ color: "#1a1a1a", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                {about.title}
              </h2>
              <p className="text-base leading-relaxed md:text-[1.15rem]" style={{ color: "#666" }}>
                A compact downtown development focused on affordability, access, and long-term neighborhood value.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr]">
              <div data-aos="fade-right" className="space-y-5">
                {about.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[1.02rem] leading-relaxed" style={{ color: "#4A4A4A" }}>
                    {para}
                  </p>
                ))}
              </div>

              <div data-aos="fade-left" className="grid grid-cols-2 gap-4">
                {[
                  ["33", "Affordable Homes"],
                  ["2026", "Expected Opening"],
                  ["100%", "Affordable Units"],
                  ["3", "Bedroom Types"],
                ].map(([num, label]) => (
                  <div key={label} className="bg-white p-6" style={{ borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)" }}>
                    <p className="font-display text-4xl font-extrabold" style={{ color: "#8B1A1A" }}>{num}</p>
                    <p className="mt-2 text-sm font-semibold leading-snug" style={{ color: "#1a1a1a" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-[60px] md:py-[72px]" style={{ background: "white" }}>
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div className="mx-auto mb-10 max-w-[760px] text-center" data-aos="fade-up">
            <h2 className="font-display font-extrabold leading-[1.1]" style={{ color: "#1a1a1a", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Everything You Need.
            </h2>
            <p className="mt-4 text-base leading-relaxed md:text-[1.15rem]" style={{ color: "#666" }}>
              Practical building features planned for modern affordable living.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AMENITIES.map((item, i) => (
              <div
                key={item.label}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="border border-black/10 bg-white p-[25px]"
                style={{ borderRadius: "12px" }}
              >
                <p className="text-[1.05rem] font-bold" style={{ color: "#1a1a1a" }}>{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#666" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="floorplans" className="py-[60px] md:py-[72px]" style={{ background: "#0f1f3d" }}>
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <div className="mx-auto mb-10 max-w-[760px] text-center" data-aos="fade-up">
            <h2 className="font-display font-extrabold leading-[1.1]" style={{ color: "white", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
              Homes planned for different household sizes.
            </h2>
            <p className="mt-4 text-base leading-relaxed md:text-[1.15rem]" style={{ color: "rgba(255,255,255,0.68)" }}>
              Cherry Street Commons will include one, two, and three-bedroom affordable apartments.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {FLOOR_PLANS.map((plan, i) => (
              <div
                key={plan.name}
                data-aos="fade-up"
                data-aos-delay={i * 70}
                className="flex min-h-[190px] flex-col justify-between p-[25px]"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px" }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#C9973A" }}>{plan.units}</p>
                  <h3 className="font-display mt-3 text-2xl font-extrabold" style={{ color: "white" }}>{plan.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{plan.detail}</p>
                </div>
                <p className="mt-8 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.36)" }}>
                  Details coming soon
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {sustainability && (
        <section id="sustainability" className="py-[60px] md:py-[72px]" style={{ background: "#FAF7F2" }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-10">
            <div className="mx-auto mb-10 max-w-[760px] text-center" data-aos="fade-up">
              <h2 className="font-display font-extrabold leading-[1.1]" style={{ color: "#1a1a1a", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                {sustainability.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {sustainability.content.split("\n\n").map((para, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 70} className="bg-white p-[25px]" style={{ borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A4A4A" }}>{para}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {community && (
        <section id="community" className="py-[60px] md:py-[72px]" style={{ background: "white" }}>
          <div className="mx-auto max-w-[1200px] px-5 md:px-10">
            <div className="mx-auto mb-10 max-w-[760px] text-center" data-aos="fade-up">
              <h2 className="font-display font-extrabold leading-[1.1]" style={{ color: "#1a1a1a", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                {community.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_0.9fr]">
              <div data-aos="fade-right" className="space-y-5">
                {community.content.split("\n\n").slice(0, 2).map((para, i) => (
                  <p key={i} className="text-[1.02rem] leading-relaxed" style={{ color: "#4A4A4A" }}>
                    {para}
                  </p>
                ))}
              </div>

              <div data-aos="fade-left" className="p-[25px]" style={{ background: "#FAF7F2", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "12px" }}>
                <p className="mb-5 text-xs font-bold uppercase tracking-widest" style={{ color: "#8B1A1A" }}>
                  Development Partners
                </p>
                <div className="space-y-4">
                  {PARTNERS.map(({ role, names }) => (
                    <div key={role} className="border-b border-black/10 pb-4">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#777" }}>{role}</p>
                      {names.map((name) => (
                        <p key={name} className="font-bold" style={{ color: "#1a1a1a" }}>{name}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
