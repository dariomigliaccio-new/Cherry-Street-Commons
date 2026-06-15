"use client";
import dynamic from "next/dynamic";

const FooterMap = dynamic(() => import("./FooterMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center"
      style={{ minHeight: "360px" }}
    >
      <span className="text-slate-400 text-sm">Carregando mapa…</span>
    </div>
  ),
});

export default function FooterMapWrapper() {
  return <FooterMap />;
}
