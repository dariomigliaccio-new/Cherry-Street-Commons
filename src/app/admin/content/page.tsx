"use client";
import { useEffect, useState } from "react";

const EDITABLE_KEYS = [
  { key: "site_name", label: "Nome do Site" },
  { key: "site_tagline", label: "Slogan" },
  { key: "footer_text", label: "Texto do Rodapé" },
  { key: "contact_email", label: "Email de Contato" },
  { key: "contact_phone", label: "Telefone" },
  { key: "contact_address", label: "Endereço" },
];

export default function ContentPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [logo, setLogo] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        setValues(data);
        setLogo(data.site_logo || "");
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setMsg("");
    await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, site_logo: logo }),
    });
    setSaving(false);
    setMsg("Salvo com sucesso!");
    setTimeout(() => setMsg(""), 3000);
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    setLogo(data.url);
    setUploading(false);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Conteúdo Geral</h1>
      <p className="text-slate-500 mb-8">Edite os textos e informações gerais do site.</p>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Logo do Site</label>
          <div className="flex items-center gap-4">
            {logo && (
              <img src={logo} alt="Logo" className="h-16 w-auto object-contain rounded border" />
            )}
            <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium transition">
              {uploading ? "Enviando..." : "Fazer upload do logo"}
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
          </div>
        </div>

        {EDITABLE_KEYS.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
            <input
              type="text"
              value={values[key] || ""}
              onChange={(e) => setValues({ ...values, [key]: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 transition"
            />
          </div>
        ))}

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
          {msg && <span className="text-green-600 text-sm font-medium">{msg}</span>}
        </div>
      </div>
    </div>
  );
}
