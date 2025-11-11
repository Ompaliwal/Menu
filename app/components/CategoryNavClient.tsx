'use client';

import React from 'react';

export type Cat = { id: string; name: string; icon?: string };

export default function CategoryNavClient({ categories }: { categories: Cat[] }) {
  function handleExtrasClick(e: React.MouseEvent) {
    e.preventDefault();
  }

  return (
    <nav aria-label="Categories" className="mb-6">
      <div
        className="
          sticky top-14 z-30 backdrop-blur-sm sticky-nav-shadow
          py-2 px-2 -mx-4 md:mx-0 md:px-0 border-b
        "
        style={{
          backgroundColor: 'var(--color-black)',
          borderColor: 'var(--color-border)',
        }}
      >
        <ul className="flex gap-3 overflow-x-auto no-scrollbar px-2 md:px-0 py-1 snap-x snap-mandatory">
          {categories.map((cat) => (
            <li key={cat.id} className="flex-shrink-0 snap-start">
              <a
                href={`#${cat.id}`}
                style={{
                  color: 'var(--color-white)',
                  backgroundColor: 'var(--color-black)',
                  borderColor: 'var(--color-border-light)',
                }}
                className="
                  inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  transition transform border shadow-sm
                  hover:-translate-y-0.5 active:translate-y-0.5
                  focus:outline-none focus:ring-2
                "
                title={cat.name}
              >
                {cat.icon && (
                  <span aria-hidden className="text-lg leading-none">
                    {cat.icon}
                  </span>
                )}
                <span className="leading-tight">{cat.name}</span>
              </a>
            </li>
          ))}

          {/* small CTA pill at end (optional) */}
          <li className="flex-shrink-0 snap-start">
            <a
              href="#"
              onClick={handleExtrasClick}
              style={{
                color: 'var(--color-white)',
                backgroundColor: 'var(--color-black)',
                borderColor: 'var(--color-border-light)',
              }}
              className="
                inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium
                border border-dashed
              "
              title="Extras"
            >
              + More
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
