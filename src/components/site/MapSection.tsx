import FooterMapWrapper from "./FooterMapWrapper";

export default function MapSection() {
  return (
    <section id="location" style={{ background: "white" }}>
      {/* Header strip */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#C9973A" }}
            >
              Our Location
            </p>
            <h2
              className="font-display font-bold leading-tight"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                color: "#1E3A5F",
                letterSpacing: "-0.02em",
              }}
            >
              1244 Cherry Street
            </h2>
            <p className="mt-1 text-base" style={{ color: "#6B6B6B" }}>
              San Carlos, California 94070
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm md:text-right" style={{ color: "#4A4A4A" }}>
            <p>Downtown San Carlos</p>
            <p>Near Caltrain &amp; Highway 101</p>
            <a
              href="https://maps.google.com/?q=1244+Cherry+Street+San+Carlos+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:opacity-70"
              style={{ color: "#8B1A1A" }}
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full" style={{ height: "500px" }}>
        <FooterMapWrapper />
      </div>
    </section>
  );
}
