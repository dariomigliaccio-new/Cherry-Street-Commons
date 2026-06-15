"use client";
import { useEffect, useState } from "react";

type MenuItem = {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
};

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/menu").then((r) => r.json()).then(setItems);
  }, []);

  async function handleSave() {
    setMsg("");
    await fetch("/api/admin/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(items),
    });
    setMsg("Menu salvo!");
    setTimeout(() => setMsg(""), 3000);
  }

  function update(id: string, field: keyof MenuItem, value: string | boolean | number) {
    setItems(items.map((item) => item.id === id ? { ...item, [field]: value } : item));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Menu de Navegação</h1>
      <p className="text-slate-500 mb-8">Edite os itens do menu principal do site.</p>

      {msg && <p className="text-green-600 mb-4 font-medium">{msg}</p>}

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
            <input
              type="number"
              value={item.order}
              onChange={(e) => update(item.id, "order", parseInt(e.target.value))}
              className="w-16 px-2 py-1.5 border border-slate-300 rounded text-sm text-center"
            />
            <input
              value={item.label}
              onChange={(e) => update(item.id, "label", e.target.value)}
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded text-sm"
              placeholder="Label"
            />
            <input
              value={item.href}
              onChange={(e) => update(item.id, "href", e.target.value)}
              className="flex-1 px-3 py-1.5 border border-slate-300 rounded text-sm"
              placeholder="Link"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.visible}
                onChange={(e) => update(item.id, "visible", e.target.checked)}
                className="w-4 h-4"
              />
              Visível
            </label>
          </div>
        ))}
        <button
          onClick={handleSave}
          className="mt-4 px-6 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition"
        >
          Salvar Menu
        </button>
      </div>
    </div>
  );
}
