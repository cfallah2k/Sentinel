'use client';

import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { featureFlags } from '@/lib/mock-data';

function Toggle({ initial, onChange }: { initial: boolean; onChange: (v: boolean) => void }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => {
        const next = !on;
        setOn(next);
        onChange(next);
      }}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
        on ? 'border-sentinel-500/50 bg-sentinel-500/80' : 'border-white/10 bg-white/10'
      }`}
    >
      <span className={`absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  );
}

export function FeatureFlagGrid() {
  const [flags, setFlags] = useState(featureFlags.map((f) => ({ ...f })));

  const setEnabled = (id: string, enabled: boolean) => {
    setFlags((prev) => prev.map((f) => (f.id === id ? { ...f, enabled } : f)));
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {flags.map((f) => (
        <Card key={f.id}>
          <CardBody>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-mono text-xs text-sentinel-300">{f.name}</p>
                  <Badge label={f.enabled ? 'Enabled' : 'Disabled'} tone={f.enabled ? 'green' : 'slate'} />
                </div>
                <h3 className="mt-1.5 text-sm font-semibold text-white">{f.name.split('.').pop()}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-400">{f.description}</p>
                <p className="mt-3 text-[0.65rem] text-slate-500">
                  Owner {f.owner} · Updated {f.updated}
                </p>
              </div>
              <Toggle initial={f.enabled} onChange={(v) => setEnabled(f.id, v)} />
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}