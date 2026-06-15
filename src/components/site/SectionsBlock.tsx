"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

type Section = {
  id: string; slug: string; title: string; content: string;
  imageUrl: string; order: number; visible: boolean;
};

export default function SectionsBlock({ sections }: { sections: Section[] }) {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-quart", offset: 80 });
  }, []);

  const visible = sections.filter(s => s.visible).sort((a, b) => a.order - b.order);

  return (
    <div style={{ background: "var(--cream)" }}>
      {visible.map((section, i) => {
        const isEven = i % 2 === 0;
        const hasImage = !!section.imageUrl;

        return (
          <section
            key={section.id}
            id={section.slug}
            className="py-24 md:py-32"
            style={{ background: isEven ? "var(--cream)" : "white" }}
          >
            <div className="max-w-7xl mx-auto px-6">
              {hasImage ? (
                /* Layout com imagem */
                <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-16`}>
                  <div
                    className="w-full md:w-1/2"
                    data-aos={isEven ? "fade-right" : "fade-left"}
                  >
                    <div className="relative">
                      <img
                        src={section.imageUrl}
                        alt={section.title}
                        className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                      />
                      {/* Decorative frame */}
                      <div
                        className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl -z-10"
                        style={{ border: "2px solid var(--gold)", opacity: 0.4 }}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2" data-aos="fade-up" data-aos-delay="150">
                    <SectionText section={section} />
                  </div>
                </div>
              ) : (
                /* Layout centrado sem imagem */
                <div className="max-w-3xl mx-auto" data-aos="fade-up">
                  <SectionText section={section} centered />
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SectionText({ section, centered }: { section: Section; centered?: boolean }) {
  return (
    <div className={centered ? "text-center" : ""}>
      {/* Eyebrow */}
      <p
        className="text-xs font-bold tracking-widest uppercase mb-4"
        style={{ color: "var(--gold)" }}
      >
        {section.slug.replace("-", " ")}
      </p>

      {/* Title */}
      <h2
        className="font-display font-bold mb-5 leading-tight"
        style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          color: "var(--navy)",
          letterSpacing: "-0.02em",
        }}
      >
        {section.title}
      </h2>

      {/* Gold rule */}
      <div
        className={`gold-rule mb-6 ${centered ? "mx-auto" : ""}`}
        style={{ background: "var(--gold)" }}
      />

      {/* Content */}
      <div className="space-y-4">
        {section.content.split("\n\n").map((para, j) => (
          <p
            key={j}
            className="leading-relaxed text-base"
            style={{ color: "var(--text-muted)" }}
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
