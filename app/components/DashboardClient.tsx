// app/components/DashboardClient.tsx
'use client';
import React, { useEffect, useState } from 'react';

type Item = {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  images?: string[];
};

export default function DashboardClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Record<string, number>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/menu');
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          setError(j?.error || 'Failed to load menu');
          setLoading(false);
          return;
        }
        const data = await res.json();
        setItems(data.items || []);
      } catch (e) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function startEdit(id: string, current: number) {
    setEditing((s) => ({ ...s, [id]: current }));
  }

  function changeVal(id: string, val: string) {
    const num = Number(val);
    setEditing((s) => ({ ...s, [id]: isNaN(num) ? 0 : num }));
  }

  async function savePrice(id: string) {
    setError(null);
    const price = editing[id];
    if (typeof price !== 'number') return;
    setSavingId(id);
    try {
      const res = await fetch('/api/admin/price', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, price }),
      });
      const j = await res.json();
      if (!res.ok) {
        setError(j?.error || 'Save failed');
      } else {
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, price } : it)));
        setEditing((s) => {
          const c = { ...s };
          delete c[id];
          return c;
        });
      }
    } catch {
      setError('Network error');
    } finally {
      setSavingId(null);
    }
  }

  if (loading) return <div>Loading menu…</div>;

  return (
    <div className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.id} className="p-3 border rounded flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{item.name}</div>
              <div className="text-xs text-gray-500">{item.id} • {item.categoryId}</div>
            </div>

            <div className="w-40 text-right">
              {editing[item.id] !== undefined ? (
                <div className="flex items-center gap-2 justify-end">
                  <input
                    className="w-20 p-1 border text-right rounded"
                    value={editing[item.id]}
                    onChange={(e) => changeVal(item.id, e.target.value)}
                  />
                  <button
                    className="px-2 py-1 bg-black text-white rounded text-sm"
                    onClick={() => savePrice(item.id)}
                    disabled={savingId === item.id}
                  >
                    {savingId === item.id ? 'Saving…' : 'Save'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-end">
                  <div className="text-sm font-semibold">{item.price}</div>
                  <button
                    className="px-2 py-1 text-sm border rounded"
                    onClick={() => startEdit(item.id, item.price)}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
