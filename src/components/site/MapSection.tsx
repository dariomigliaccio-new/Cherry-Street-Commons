export default function MapSection() {
  return (
    <section id="location" style={{ background: "white" }}>
      {/* Header */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#C9973A" }}
            >
              Nossa Localização
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
          <div className="flex flex-col gap-1 text-sm md:text-right" style={{ color: "#4A4A4A" }}>
            <p>Downtown San Carlos</p>
            <p>Near Caltrain &amp; Highway 101</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1244+Cherry+Street,+San+Carlos,+CA+94070"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold mt-2 hover:opacity-70 transition-opacity"
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

      {/* Simple flat map embed */}
      <div className="w-full" style={{ height: "480px" }}>
        <iframe
          title="Cherry Street Commons"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-122.2668%2C37.5003%2C-122.2528%2C37.5123&layer=mapnik&marker=37.5063%2C-122.2598"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
        />
      </div>

      {/* Link to full map */}
      <div className="text-center py-3" style={{ background: "#f5f5f5" }}>
        <a
          href="https://www.openstreetmap.org/?mlat=37.5063&mlon=-122.2598#map=15/37.5063/-122.2598"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:underline"
          style={{ color: "#888" }}
        >
          View larger map
        </a>
      </div>
    </section>
  );
}
