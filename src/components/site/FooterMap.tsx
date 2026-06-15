"use client";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const PROPERTY = {
  lng: -122.2598,
  lat: 37.5063,
  name: "Cherry Street Commons",
  address: "1244 Cherry Street, San Carlos, CA",
};

export default function FooterMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [PROPERTY.lng, PROPERTY.lat],
      zoom: 15,
      pitch: 45,
      bearing: -15,
      attributionControl: false,
    });

    map.current.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    map.current.on("load", () => {
      if (!map.current) return;

      // 3D buildings layer
      map.current.addLayer({
        id: "3d-buildings",
        source: "openmaptiles",
        "source-layer": "building",
        type: "fill-extrusion",
        minzoom: 14,
        paint: {
          "fill-extrusion-color": [
            "interpolate",
            ["linear"],
            ["get", "render_height"],
            0, "#e8ddd0",
            50, "#c4b5a0",
            100, "#a09080",
          ],
          "fill-extrusion-height": ["get", "render_height"],
          "fill-extrusion-base": ["get", "render_min_height"],
          "fill-extrusion-opacity": 0.75,
        },
      });

      // Custom marker element
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.innerHTML = `
        <div style="
          background: #8B1A1A;
          color: white;
          padding: 8px 14px;
          border-radius: 24px;
          font-family: sans-serif;
          font-size: 13px;
          font-weight: 600;
          box-shadow: 0 4px 20px rgba(139,26,26,0.4), 0 2px 8px rgba(0,0,0,0.2);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
          position: relative;
        ">
          <span style="font-size:16px;">📍</span>
          Cherry Street Commons
          <div style="
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #8B1A1A;
          "></div>
        </div>
      `;

      const popup = new maplibregl.Popup({
        offset: 30,
        closeButton: false,
        className: "cherry-popup",
      }).setHTML(`
        <div style="padding: 4px 2px; font-family: sans-serif;">
          <strong style="font-size:14px; color:#1a1a1a;">Cherry Street Commons</strong><br/>
          <span style="font-size:12px; color:#666;">1244 Cherry Street</span><br/>
          <span style="font-size:12px; color:#666;">San Carlos, CA</span>
        </div>
      `);

      new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([PROPERTY.lng, PROPERTY.lat])
        .setPopup(popup)
        .addTo(map.current!);

      // Smooth fly-in
      map.current.easeTo({
        center: [PROPERTY.lng, PROPERTY.lat],
        zoom: 15.5,
        pitch: 55,
        bearing: -20,
        duration: 2000,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
      style={{ minHeight: "360px" }}
    />
  );
}
