"use client";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const PROPERTY = {
  lng: -122.2598,
  lat: 37.5063,
  name: "Cherry Street Commons",
  address: "1244 Cherry Street",
  city: "San Carlos, CA",
};

export default function FooterMap() {
  const container = useRef<HTMLDivElement>(null);
  const map       = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !container.current) return;

    map.current = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [PROPERTY.lng, PROPERTY.lat],
      zoom: 14,
      pitch: 50,
      bearing: -20,
      attributionControl: false,
    });

    map.current.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    map.current.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    map.current.on("load", () => {
      if (!map.current) return;

      // 3D buildings
      map.current.addLayer({
        id: "3d-buildings",
        source: "openmaptiles",
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 13,
        paint: {
          "fill-extrusion-color": [
            "interpolate", ["linear"], ["get", "render_height"],
            0, "#e8ddd0", 30, "#d4c8b8", 80, "#b8a898",
          ],
          "fill-extrusion-height": ["get", "render_height"],
          "fill-extrusion-base": ["get", "render_min_height"],
          "fill-extrusion-opacity": 0.8,
        },
      });

      // Custom marker
      const el = document.createElement("div");
      el.style.cssText = `
        display: flex; flex-direction: column; align-items: center; cursor: pointer;
      `;
      el.innerHTML = `
        <div style="
          background: linear-gradient(135deg, #8B1A1A, #B02020);
          color: white;
          padding: 10px 18px;
          border-radius: 30px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 6px 24px rgba(139,26,26,0.5);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.01em;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Cherry Street Commons
        </div>
        <div style="
          width: 2px; height: 16px;
          background: linear-gradient(to bottom, #8B1A1A, transparent);
          margin-top: 0;
        "></div>
        <div style="
          width: 8px; height: 8px;
          background: #8B1A1A;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(139,26,26,0.25);
        "></div>
      `;

      new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([PROPERTY.lng, PROPERTY.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 20, closeButton: false })
            .setHTML(`
              <div style="font-family:Inter,sans-serif; padding:4px 2px; min-width:160px;">
                <p style="font-weight:700; font-size:14px; color:#1a1a1a; margin-bottom:4px;">
                  ${PROPERTY.name}
                </p>
                <p style="font-size:12px; color:#555; margin:0;">${PROPERTY.address}</p>
                <p style="font-size:12px; color:#555; margin:0;">${PROPERTY.city}</p>
                <p style="font-size:11px; color:#8B1A1A; margin-top:6px; font-weight:600;">
                  Opening 2026
                </p>
              </div>
            `)
        )
        .addTo(map.current!);

      // Smooth fly-in
      map.current.flyTo({
        center: [PROPERTY.lng, PROPERTY.lat],
        zoom: 15.5,
        pitch: 58,
        bearing: -25,
        duration: 2400,
        essential: true,
      });
    });

    return () => { map.current?.remove(); map.current = null; };
  }, []);

  return <div ref={container} className="w-full h-full" />;
}
