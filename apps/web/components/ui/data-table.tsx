import type { ReactNode } from 'react';
import { Badge, type BadgeTone } from './badge';
import { DataTableClient } from './data-table-client';

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  tone?: (row: T) => BadgeTone;
  className?: string;
}

export function DataTable<T>({
  columns,
  rows,
  searchable = true,
  searchPlaceholder = 'Search...',
  pageSize = 8,
  initialSort
}: {
  columns: Column<T>[];
  rows: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  initialSort?: { key: string; dir: 'asc' | 'desc' };
}) {
  const cells: ReactNode[][] = rows.map((row) =>
    columns.map((col) => {
      if (col.render) return col.render(row);
      if (col.tone) return <Badge label={String((row as Record<string, unknown>)[col.key])} tone={col.tone(row)} />;
      return String((row as Record<string, unknown>)[col.key] ?? '');
    })
  );

  const sortValues: (string | number | null)[][] = rows.map((row) =>
    columns.map((col) => (col.sortValue ? col.sortValue(row) : null))
  );

  const searchKeys: string[] = rows.map((row) =>
    columns
      .map((col) => String((row as Record<string, unknown>)[col.key] ?? ''))
      .join(' ')
      .toLowerCase()
  );

  return (
    <DataTableClient
      columns={columns.map((col) => ({ key: col.key, label: col.label, sortable: Boolean(col.sortValue), className: col.className }))}
      cells={cells}
      sortValues={sortValues}
      searchKeys={searchKeys}
      searchable={searchable}
      searchPlaceholder={searchPlaceholder}
      pageSize={pageSize}
      initialSort={initialSort}
    />
  );
}