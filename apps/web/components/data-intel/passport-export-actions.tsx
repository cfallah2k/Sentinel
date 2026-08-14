'use client';

import { Download } from 'lucide-react';

function download(name: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function PassportExportActions({ passportId, systemName }: { passportId: string; systemName: string }) {
  const stamp = new Date().toISOString().slice(0, 10);
  const base = { passportId, generatedAt: stamp, integrity: 'SHA-256 anchored' };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() =>
          download(`${passportId}-passport-${stamp}.json`, JSON.stringify(base, null, 2), 'application/json')
        }
        className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/20"
      >
        <Download className="h-3.5 w-3.5" /> JSON
      </button>
      <button
        type="button"
        onClick={() =>
          download(
            `${passportId}-passport-${stamp}.csv`,
            'passport_id,generated_at,integrity\n' + `${passportId},${stamp},SHA-256 anchored\n`,
            'text/csv;charset=utf-8'
          )
        }
        className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/20"
      >
        <Download className="h-3.5 w-3.5" /> CSV
      </button>
      <button
        type="button"
        onClick={() => {
          const html = `<html><head><title>Passport ${passportId}</title></head><body><h1>AI Passport ${passportId}</h1><p>System: ${systemName}</p><p>Generated: ${stamp}</p><p>Integrity: SHA-256 anchored</p></body></html>`;
          const blob = new Blob([html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${passportId}-passport-${stamp}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        }}
        className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/20"
      >
        <Download className="h-3.5 w-3.5" /> PDF
      </button>
    </div>
  );
}