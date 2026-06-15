"use client";
import { useEffect, useState } from "react";

type Section = {
  id: string;
  slug: string;
  title: string;
  content: string;
  imageUrl: string;
  order: number;
  visible: boolean;
};

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [editing, setEditing] = useState<Section | null>(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/sections")
      .then((r) => r.json())
      .then(setSections);
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setEditing({ ...editing, imageUrl: data.url });
    setUploading(false);
  }

  async function handleSave() {
    if (!editing) return;
    setMsg("");
    await fetch("/api/admin/sections", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    const res = await fetch("/api/admin/sections");
    setSections(await res.json());
    setEditing(null);
    setMsg("Salvo com sucesso!");
    setTimeout(() => setMsg(""), 3000);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Seções</h1>
      <p className="text-slate-500 mb-8">Edite o conteúdo de cada seção da página.</p>

      {msg && <p className="text-green-600 mb-4 font-medium">{msg}</p>}

      <div className="grid gap-4">
        {sections.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow-sm p-5">
            {editing?.id === s.id ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                  <input
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Conteúdo</label>
                  <textarea
                    rows={5}
                    value={editing.content}
                    onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Imagem</label>
                  <div className="flex items-center gap-4">
                    {editing.imageUrl && (
                      <img src={editing.imageUrl} alt="preview" className="h-16 w-28 object-cover rounded" />
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
                    id={`visible-${s.id}`}
                    checked={editing.visible}
                    onChange={(e) => setEditing({ ...editing, visible: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`visible-${s.id}`} className="text-sm font-medium text-slate-700">Seção visível</label>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSave} className="px-6 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition">
                    Salvar
                  </button>
                  <button onClick={() => setEditing(null)} className="px-6 py-2.5 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 transition">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {s.imageUrl && (
                  <img src={s.imageUrl} alt={s.title} className="w-20 h-14 object-cover rounded" />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{s.title}</p>
                  <p className="text-sm text-slate-500 line-clamp-1">{s.content}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.visible ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                  {s.visible ? "Visível" : "Oculta"}
                </span>
                <button onClick={() => setEditing(s)} className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                  Editar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
