'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search } from 'lucide-react';

export interface TableColumnSpec {
  key: string;
  label: string;
  sortable: boolean;
  className?: string;
}

export function DataTableClient({
  columns,
  cells,
  sortValues,
  searchKeys,
  searchable = true,
  searchPlaceholder = 'Search...',
  pageSize = 8,
  initialSort
}: {
  columns: TableColumnSpec[];
  cells: ReactNode[][];
  sortValues: (string | number | null)[][];
  searchKeys: string[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  initialSort?: { key: string; dir: 'asc' | 'desc' };
}) {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(initialSort?.key ?? null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(initialSort?.dir ?? 'asc');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let order: number[] = cells.map((_, i) => i);
    if (query.trim()) {
      const q = query.toLowerCase();
      order = order.filter((i) => searchKeys[i].toLowerCase().includes(q));
    }
    const sortCol = sortKey ? columns.findIndex((c) => c.key === sortKey) : -1;
    if (sortCol >= 0 && columns[sortCol].sortable) {
      order = [...order].sort((a, b) => {
        const va = sortValues[a][sortCol];
        const vb = sortValues[b][sortCol];
        if (va == null && vb == null) return 0;
        if (va == null) return 1;
        if (vb == null) return -1;
        const cmp = va < vb ? -1 : va > vb ? 1 : 0;
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return order;
  }, [cells, searchKeys, query, sortKey, sortDir, columns, sortValues]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageOrder = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div>
      {searchable ? (
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-white/10 bg-slate-950/75 py-2 pl-10 pr-4 text-xs text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sentinel-500/60 focus:ring-2 focus:ring-sentinel-500/15"
          />
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">
                  {col.sortable ? (
                    <button type="button" className="inline-flex items-center gap-1 transition hover:text-slate-300" onClick={() => toggleSort(col.key)}>
                      {col.label}
                      {sortKey === col.key ? (
                        sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      ) : null}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageOrder.map((rowIdx, i) => (
              <tr key={i} className="border-b border-white/5 text-xs text-slate-300 transition hover:bg-white/[0.03]">
                {columns.map((col, ci) => (
                  <td key={col.key} className={`px-4 py-3 ${col.className ?? ''}`}>
                    {cells[rowIdx][ci]}
                  </td>
                ))}
              </tr>
            ))}
            {pageOrder.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-slate-500">
                  No results found
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {pageCount > 1 ? (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[0.65rem] text-slate-500">
            Showing {safePage * pageSize + 1}–{Math.min((safePage + 1) * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="text-[0.65rem] text-slate-500">{safePage + 1} / {pageCount}</span>
            <button
              type="button"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 disabled:opacity-40"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}