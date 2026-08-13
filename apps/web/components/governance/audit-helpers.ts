import { auditLogs, hourlySeries } from '@/lib/mock-data';
import type { AuditLog } from '@/lib/mock-data';

export const auditNavItems = [
  { href: '/audit', label: 'Overview' },
  { href: '/audit/logs', label: 'Logs' },
  { href: '/audit/security', label: 'Security' },
  { href: '/audit/data-access', label: 'Data Access' },
  { href: '/audit/ai-activity', label: 'AI Activity' },
  { href: '/audit/policy-events', label: 'Policy Events' },
  { href: '/audit/admin-events', label: 'Admin Events' },
  { href: '/audit/authentication', label: 'Authentication' },
  { href: '/audit/api', label: 'API' },
  { href: '/audit/export', label: 'Export' }
];

export type AuditCategory =
  | 'security'
  | 'data-access'
  | 'ai-activity'
  | 'policy-events'
  | 'admin-events'
  | 'authentication'
  | 'api';

export function auditCategoryOf(log: AuditLog): AuditCategory {
  if (log.context === 'api' || log.context === 'webhook') return 'api';
  if (log.action.startsWith('auth.')) return 'authentication';
  if (log.action.startsWith('policy.')) return 'policy-events';
  if (log.action.startsWith('user.') || log.action === 'settings.update') return 'admin-events';
  if (log.action.startsWith('key.')) return 'security';
  if (log.action.startsWith('incident.')) return 'security';
  if (log.action.startsWith('system.') || log.action === 'integration.connect') return 'ai-activity';
  if (log.action === 'approval.decide' || log.action === 'export.run') return 'data-access';
  return 'security';
}

export function logsFor(category?: AuditCategory): AuditLog[] {
  if (!category) return auditLogs;
  return auditLogs.filter((l) => auditCategoryOf(l) === category);
}

export function logById(id: string) {
  return auditLogs.find((l) => l.id === id);
}

export function eventSeries24h() {
  return hourlySeries.map((h) => ({
    hour: h.hour,
    events: h.allowed + h.blocked + h.redacted + h.pending
  }));
}

export function resultDonut() {
  const results = ['Success', 'Denied', 'Error'] as const;
  return results
    .map((r) => ({ name: r, value: auditLogs.filter((l) => l.result === r).length }))
    .filter((d) => d.value > 0);
}

export function countBy(category?: AuditCategory) {
  const logs = logsFor(category);
  return {
    total: logs.length,
    success: logs.filter((l) => l.result === 'Success').length,
    denied: logs.filter((l) => l.result === 'Denied').length,
    error: logs.filter((l) => l.result === 'Error').length
  };
}

export function payloadFor(log: AuditLog) {
  return {
    event_id: log.id,
    action: log.action,
    actor: log.actor,
    resource: log.resource,
    result: log.result,
    ip: log.ip,
    context: log.context,
    timestamp: log.timestamp,
    request_id: `req_${log.id.replace('log-', '')}9a2f`,
    org: 'org-nexora'
  };
}

export function timelineFor(log: AuditLog) {
  const ts = new Date(log.timestamp).getTime();
  const at = (mins: number) => new Date(ts - mins * 60000).toISOString().slice(0, 16).replace('T', ' ');
  return [
    { time: at(12), label: 'Request received', detail: `Session initiated for ${log.actor} via ${log.context}` },
    { time: at(8), label: 'Policy evaluation', detail: `Policy engine evaluated ${log.action} against active rules` },
    { time: at(5), label: 'Scope authorized', detail: `Access checks passed for ${log.resource}` },
    { time: at(1), label: 'Execution', detail: `${log.action} executed on ${log.resource}` },
    { time: log.timestamp.slice(0, 16).replace('T', ' '), label: 'Audit record written', detail: `Event persisted as ${log.id}` }
  ];
}

export function relatedByActor(log: AuditLog) {
  return auditLogs.filter((l) => l.actor === log.actor && l.id !== log.id);
}

export function relatedByResource(log: AuditLog) {
  return auditLogs.filter((l) => l.resource === log.resource && l.id !== log.id);
}