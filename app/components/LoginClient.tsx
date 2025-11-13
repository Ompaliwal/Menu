// app/components/LoginClient.tsx
'use client';
import React, { useState } from 'react';

export default function LoginClient() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j?.error || 'Login failed');
        setLoading(false);
        return;
      }

      // on success cookie is set by server; reload to render dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-3">
      {error && <div className="text-red-600">{error}</div>}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        className="w-full p-2 border rounded"
        autoComplete="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        className="w-full p-2 border rounded"
        autoComplete="current-password"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <button
          type="button"
          className="px-4 py-2 border rounded text-sm"
          onClick={() => {
            // helpful demo credentials hint (remove in prod)
            alert('Demo creds:\nusername: admin\npassword: password\n(Or set ADMIN_USER / ADMIN_PASS env vars)');
          }}
        >
          Demo creds
        </button>
      </div>
    </form>
  );
}
