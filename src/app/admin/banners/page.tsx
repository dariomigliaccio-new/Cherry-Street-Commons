"use client";
import { useEffect, useState } from "react";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  imageUrl: string;
  order: number;
  active: boolean;
};

const empty: Omit<Banner, "id"> = {
  title: "",
  subtitle: "",
  buttonText: "",
  buttonHref: "",
  imageUrl: "",
  order: 0,
  active: true,
};

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    const res = await fetch("/api/admin/banners");
    setBanners(await res.json());
  }

  useEffect(() => {
    let cancelled = false;

    fetch("/api/admin/banners")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setBanners(data);
      });

    return () => { cancelled = true; };
  }, []);

  function openNew() {
    setEditing(null);
    setForm(empty);
  }

  function openEdit(b: Banner) {
    setEditing(b);
    setForm({ ...b });
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setForm((f) => ({ ...f, imageUrl: data.url }));
    setUploading(false);
  }

  async function handleSave() {
    setMsg("");
    if (editing) {
      await fetch("/api/admin/banners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...form }),
      });
    } else {
      await fetch("/api/admin/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    await load();
    setEditing(null);
    setForm(empty);
    setMsg("Salvo!");
    setTimeout(() => setMsg(""), 3000);
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este banner?")) return;
    await fetch(`/api/admin/banners?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Banners / Hero</h1>
          <p className="text-slate-500 mt-1">Gerencie os banners da página inicial.</p>
        </div>
        <button
          onClick={openNew}
          className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition"
        >
          + Novo Banner
        </button>
      </div>

      {msg && <p className="text-green-600 mb-4 font-medium">{msg}</p>}

      <div className="grid gap-4 mb-8">
        {banners.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
            {b.imageUrl && (
              <img src={b.imageUrl} alt={b.title} className="w-24 h-16 object-cover rounded-lg" />
            )}
            <div className="flex-1">
              <p className="font-semibold text-slate-800">{b.title}</p>
              <p className="text-sm text-slate-500">{b.subtitle}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${b.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
              {b.active ? "Ativo" : "Inativo"}
            </span>
            <button onClick={() => openEdit(b)} className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition">
              Editar
            </button>
            <button onClick={() => handleDelete(b.id)} className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition">
              Excluir
            </button>
          </div>
        ))}
        {banners.length === 0 && (
          <p className="text-slate-400 text-center py-10">Nenhum banner cadastrado ainda.</p>
        )}
      </div>

      {(editing !== null || form.title !== "" || form.title === "") && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-5">
            {editing ? "Editar Banner" : "Novo Banner"}
          </h2>
          <div className="space-y-4">
            {[
              { key: "title", label: "Título" },
              { key: "subtitle", label: "Subtítulo" },
              { key: "buttonText", label: "Texto do Botão" },
              { key: "buttonHref", label: "Link do Botão" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
                <input
                  value={form[key as keyof typeof form] as string}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Imagem de Fundo</label>
              <div className="flex items-center gap-4">
                {form.imageUrl && (
                  <img src={form.imageUrl} alt="preview" className="h-16 w-28 object-cover rounded" />
                )}
                <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium">
                  {uploading ? "Enviando..." : "Upload de imagem"}
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="active" className="text-sm font-medium text-slate-700">Banner ativo</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition"
              >
                Salvar
              </button>
              <button
                onClick={() => { setEditing(null); setForm(empty); }}
                className="px-6 py-2.5 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
