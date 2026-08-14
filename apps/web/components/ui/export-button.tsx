'use client';

import { Download } from 'lucide-react';

export default function ExportCsvButton({
  filename,
  rows,
  label = 'Export'
}: {
  filename: string;
  rows: Record<string, string | number>[];
  label?: string;
}) {
  const handleExport = () => {
    const header = rows.length > 0 ? Object.keys(rows[0]) : [];
    const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [header.join(','), ...rows.map((r) => header.map((h) => escape(r[h] ?? '')).join(','))].join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10 sm:text-sm"
    >
      <Download className="h-3.5 w-3.5" size={14} />
      {label}
    </button>
  );
}