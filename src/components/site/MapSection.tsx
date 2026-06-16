export default function MapSection() {
  return (
    <section id="location" style={{ background: "white" }}>
      <div className="mx-auto max-w-[1120px] px-5 py-14 md:px-10 md:py-18">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="mb-3 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "#7f1717" }}
            >
              Location
            </p>
            <h2
              className="font-extrabold leading-tight"
              style={{
                fontSize: "clamp(2rem, 3.2vw, 2.8rem)",
                color: "#1a1a1a",
              }}
            >
              1244 Cherry Street
            </h2>
            <p className="mt-2 text-base" style={{ color: "#625e57" }}>
              San Carlos, California 94070
            </p>
          </div>
          <div className="flex flex-col gap-1 text-sm md:text-right" style={{ color: "#4a4742" }}>
            <p>Downtown San Carlos</p>
            <p>Near Caltrain &amp; Highway 101</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=1244+Cherry+Street,+San+Carlos,+CA+94070"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-bold transition-opacity hover:opacity-70"
              style={{ color: "#7f1717" }}
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full" style={{ height: "460px" }}>
        <iframe
          title="Cherry Street Commons"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-122.2668%2C37.5003%2C-122.2528%2C37.5123&layer=mapnik&marker=37.5063%2C-122.2598"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          loading="lazy"
        />
      </div>

      <div className="py-3 text-center" style={{ background: "#f7f4ef" }}>
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
