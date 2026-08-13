'use client';

import { useState, type ReactNode } from 'react';

export function Tabs({ tabs, defaultValue, onChange }: {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  defaultValue?: string;
  onChange?: (id: string) => void;
}) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.id);
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => {
            setActive(t.id);
            onChange?.(t.id);
          }}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold transition ${
            active === t.id
              ? 'bg-sentinel-500/15 text-sentinel-300 ring-1 ring-sentinel-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function TabPanels({ panels, active }: { panels: { id: string; content: ReactNode }[]; active: string }) {
  const panel = panels.find((p) => p.id === active);
  return panel ? <div>{panel.content}</div> : null;
}