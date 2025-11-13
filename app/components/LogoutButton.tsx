//app/components/LogoutButton.tsx


'use client';
import React from 'react';

export default function LogoutButton() {
  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      window.location.href = '/dashboard'; // reload page to show login
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 rounded text-sm border border-gray-500 text-gray-200 bg-black hover:bg-gray-900"
    >
      Logout
    </button>
  );
}
