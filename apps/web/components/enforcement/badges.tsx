import { Badge, toneForStatus, type BadgeTone } from '@/components/ui/badge';

const decisionTones: Record<string, BadgeTone> = {
  Allowed: 'green',
  Blocked: 'rose',
  Redacted: 'violet',
  'Approval Required': 'amber',
  Logged: 'slate',
  Allow: 'green',
  Block: 'rose',
  Redact: 'violet',
  'Require Approval': 'amber',
  Log: 'slate'
};

export function DecisionBadge({ label }: { label: string }) {
  return <Badge label={label} tone={decisionTones[label] ?? toneForStatus(label)} />;
}

const severityTones: Record<string, BadgeTone> = {
  Critical: 'red',
  High: 'rose',
  Medium: 'amber',
  Low: 'blue'
};

export function SeverityBadge({ label }: { label: string }) {
  return <Badge label={label} tone={severityTones[label] ?? toneForStatus(label)} />;
}
