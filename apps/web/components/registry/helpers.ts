export function hashOf(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function seededTake<T>(rows: T[], seed: string, count: number): T[] {
  if (rows.length === 0) return [];
  const h = hashOf(seed);
  const out: T[] = [];
  let i = 0;
  while (out.length < Math.min(count, rows.length) && i < rows.length * 3) {
    const row = rows[(h + i * 97) % rows.length];
    if (!out.includes(row)) out.push(row);
    i++;
  }
  return out;
}

export function seededFilter<T>(rows: T[], seed: string, stride = 3): T[] {
  const h = hashOf(seed);
  return rows.filter((_, i) => (h + i * 131) % stride !== 0);
}

export function usageSeries(seed: string, daily: number): { hour: string; requests: number; blocked: number }[] {
  const h = hashOf(seed);
  const out: { hour: string; requests: number; blocked: number }[] = [];
  for (let i = 0; i < 24; i++) {
    const wave = 0.55 + 0.35 * Math.sin(i / 2.2 + (h % 7)) + 0.2 * Math.cos(i / 1.4 + (h % 11));
    out.push({
      hour: `${String(i).padStart(2, '0')}:00`,
      requests: Math.max(1, Math.round((daily / 24) * wave)),
      blocked: Math.max(0, Math.round((daily / 24) * wave * (0.02 + (h % 5) / 100)))
    });
  }
  return out;
}

export function trendSeries(seed: string, points: number, base: number): { date: string; value: number }[] {
  const h = hashOf(seed);
  const out: { date: string; value: number }[] = [];
  for (let i = 0; i < points; i++) {
    const d = new Date(2026, 7, 13 - (points - 1 - i));
    const wave = 0.6 + 0.4 * Math.sin(i / 1.9 + (h % 6)) + 0.25 * Math.cos(i / 1.1 + (h % 9));
    out.push({ date: d.toISOString().slice(5, 10), value: Math.max(1, Math.round(base * wave)) });
  }
  return out;
}

export function maskKey(key: string): string {
  return key.length > 12 ? `${key.slice(0, 10)}…${key.slice(-4)}` : key;
}

export interface RegistryEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  result: 'Success' | 'Denied' | 'Error';
  ip: string;
  context: string;
}

const actionPool = ['registry.register', 'registry.approve', 'registry.update', 'risk.assessment', 'policy.apply', 'key.rotate', 'data.classify', 'flow.review', 'approval.decide', 'incident.create', 'settings.update', 'audit.export'];

export function entityEvents(entityId: string, entityName: string, count = 8): RegistryEvent[] {
  const h = hashOf(entityId);
  const actors = ['amara.okafor@nexora.io', 'jordan.patel@nexora.io', 'maya.chen@nexora.io', 'devon.clarke@nexora.io', 'priya.raman@nexora.io', 'system'];
  const ips = ['10.0.4.22', '10.0.7.91', '10.2.1.14', '10.2.9.63', '172.16.8.4'];
  const contexts = ['web-console', 'api', 'gateway', 'cli', 'webhook'];
  const slug = entityName.toLowerCase().replace(/\s+/g, '-');
  const out: RegistryEvent[] = [];
  for (let i = 0; i < count; i++) {
    const hour = Math.max(0, 13 - Math.floor(i * 1.7) + (h % 2));
    const minute = (h + i * 37) % 60;
    const second = (h + i * 11) % 60;
    out.push({
      id: `evt-${entityId}-${i + 1}`,
      timestamp: `2026-08-13T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}Z`,
      actor: actors[(h + i) % actors.length],
      action: actionPool[(h + i * 3) % actionPool.length],
      resource: `${slug}:${entityId}`,
      result: (['Success', 'Success', 'Success', 'Denied', 'Error'] as const)[(h + i) % 5],
      ip: ips[(h + i) % ips.length],
      context: contexts[(h + i) % contexts.length]
    });
  }
  return out;
}

export interface KeyRow {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  scopes: string[];
}

export function keysFor(seed: string, count: number): KeyRow[] {
  const h = hashOf(seed);
  const names = ['Production', 'Staging', 'CI Pipeline', 'Local Development', 'Partner Integration', 'Backup'];
  const scopes = [['gateway.read'], ['gateway.read', 'gateway.write'], ['gateway.read', 'audit.read'], ['gateway.write', 'keys.manage']];
  const out: KeyRow[] = [];
  for (let i = 0; i < count; i++) {
    const hex = Array.from({ length: 24 }, (_, j) => '0123456789abcdef'[(h + i * 13 + j * 7) % 16]).join('');
    out.push({
      id: `key-${seed}-${i + 1}`,
      name: names[(h + i) % names.length],
      key: `sk_live_${hex}`,
      created: `2026-0${(h + i) % 8 + 1}-${String((h + i * 5) % 28 + 1).padStart(2, '0')}`,
      lastUsed: `2026-08-1${(h + i) % 4}T1${(h + i) % 3}:${String((h + i * 7) % 60).padStart(2, '0')}:00Z`,
      scopes: scopes[(h + i) % scopes.length]
    });
  }
  return out;
}

export interface SchemaColumn {
  name: string;
  type: string;
  nullable: boolean;
  sample: string;
}

const schemaTypes = ['varchar(255)', 'text', 'uuid', 'bigint', 'timestamp', 'boolean', 'decimal(18,4)', 'jsonb'];

export function schemaFor(seed: string): SchemaColumn[] {
  const h = hashOf(seed);
  const base = ['id', 'created_at', 'updated_at', 'status', 'owner_id', 'payload', 'score', 'category', 'source_ref', 'raw_json', 'checksum', 'region', 'tenant_id'];
  return base.map((name, i) => ({
    name,
    type: schemaTypes[(h + i * 3) % schemaTypes.length],
    nullable: (h + i) % 5 === 0,
    sample: schemaTypes[(h + i * 3) % schemaTypes.length] === 'boolean' ? 'true' : `smp_${(h + i * 17) % 999}`
  }));
}