"use client";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const LNG = -122.2598;
const LAT = 37.5063;

export default function FooterMap() {
  const container = useRef<HTMLDivElement>(null);
  const map       = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !container.current) return;

    map.current = new maplibregl.Map({
      container: container.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [LNG, LAT],
      zoom: 13.5,
      pitch: 30,
      bearing: -10,
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

      // Subtle 3D buildings
      map.current.addLayer({
        id: "3d-buildings",
        source: "openmaptiles",
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 14,
        paint: {
          "fill-extrusion-color": "#e8e4de",
          "fill-extrusion-height": ["get", "render_height"],
          "fill-extrusion-base": ["get", "render_min_height"],
          "fill-extrusion-opacity": 0.6,
        },
      });

      // Marker element
      const el = document.createElement("div");
      el.style.cssText = "display:flex;flex-direction:column;align-items:center;cursor:pointer;";
      el.innerHTML = `
        <div style="
          background: #8B1A1A;
          color: white;
          padding: 9px 16px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          font-family: Inter, sans-serif;
          box-shadow: 0 4px 20px rgba(139,26,26,0.45);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 7px;
        ">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Cherry Street Commons
        </div>
        <div style="width:2px;height:14px;background:linear-gradient(to bottom,#8B1A1A,transparent);"></div>
        <div style="width:7px;height:7px;background:#8B1A1A;border-radius:50%;box-shadow:0 0 0 3px rgba(139,26,26,0.2);"></div>
      `;

      new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([LNG, LAT])
        .setPopup(
          new maplibregl.Popup({ offset: 18, closeButton: false })
            .setHTML(`
              <div style="font-family:Inter,sans-serif;padding:4px 2px;min-width:160px;">
                <p style="font-weight:700;font-size:13px;color:#1a1a1a;margin-bottom:3px;">Cherry Street Commons</p>
                <p style="font-size:12px;color:#666;margin:0;">1244 Cherry Street</p>
                <p style="font-size:12px;color:#666;margin:0;">San Carlos, CA 94070</p>
                <p style="font-size:11px;color:#8B1A1A;margin-top:5px;font-weight:600;">Opening 2026</p>
              </div>
            `)
        )
        .addTo(map.current!);

      map.current.flyTo({
        center: [LNG, LAT],
        zoom: 15,
        pitch: 35,
        bearing: -12,
        duration: 2000,
        essential: true,
      });
    });

    return () => { map.current?.remove(); map.current = null; };
  }, []);

  return <div ref={container} className="w-full h-full" />;
}
