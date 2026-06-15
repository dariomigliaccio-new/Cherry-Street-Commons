import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { connection } from "next/server";

export default async function AdminDashboard() {
  await connection();

  const [banners, sections, contentItems] = await Promise.all([
    prisma.banner.count(),
    prisma.section.count(),
    prisma.siteContent.count(),
  ]);

  const stats = [
    { label: "Banners", count: banners, href: "/admin/banners", icon: "🖼️", color: "bg-blue-500" },
    { label: "Seções", count: sections, href: "/admin/sections", icon: "📄", color: "bg-green-500" },
    { label: "Conteúdos", count: contentItems, href: "/admin/content", icon: "✏️", color: "bg-purple-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
      <p className="text-slate-500 mb-8">Bem-vindo ao painel de administração do Cherry Street Commons.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5 hover:shadow-md transition"
          >
            <div className={`${stat.color} text-white text-2xl w-14 h-14 rounded-xl flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800">{stat.count}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: "/admin/banners", label: "Editar Banners", icon: "🖼️" },
            { href: "/admin/content", label: "Editar Textos", icon: "✏️" },
            { href: "/admin/sections", label: "Editar Seções", icon: "📄" },
            { href: "/admin/menu", label: "Editar Menu", icon: "☰" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition text-center"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium text-slate-700">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
