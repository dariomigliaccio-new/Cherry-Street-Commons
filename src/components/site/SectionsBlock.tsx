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

export default function SectionsBlock({ sections }: { sections: Section[] }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  const visible = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  return (
    <>
      {visible.map((section, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={section.id}
            id={section.slug}
            className={`py-24 ${isEven ? "bg-white" : "bg-slate-50"}`}
          >
            <div className="max-w-7xl mx-auto px-6">
              <div
                className={`flex flex-col ${
                  section.imageUrl
                    ? isEven
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                    : ""
                } items-center gap-12`}
              >
                {section.imageUrl && (
                  <div
                    className="w-full md:w-1/2"
                    data-aos={isEven ? "fade-right" : "fade-left"}
                  >
                    <img
                      src={section.imageUrl}
                      alt={section.title}
                      className="w-full h-80 object-cover rounded-2xl shadow-lg"
                    />
                  </div>
                )}
                <div
                  className={section.imageUrl ? "w-full md:w-1/2" : "max-w-3xl mx-auto text-center"}
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h2 className="text-4xl font-bold text-slate-800 mb-6">{section.title}</h2>
                  <div className="w-16 h-1 bg-slate-800 mb-6 rounded-full mx-auto md:mx-0" />
                  <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
