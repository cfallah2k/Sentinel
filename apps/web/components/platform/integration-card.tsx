import Link from 'next/link';
import {
  Activity,
  Bell,
  Bot,
  Boxes,
  Bug,
  Cable,
  CheckSquare,
  CircleDot,
  Cloud,
  Container,
  Cpu,
  Database,
  Fingerprint,
  GitBranch,
  Globe,
  KeyRound,
  LineChart,
  Lock,
  MessageSquare,
  Plug,
  Radar,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Webhook,
  Wind,
  type LucideIcon
} from 'lucide-react';
import { Badge, toneForStatus } from '@/components/ui/badge';
import type { Integration } from './integration-data';

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Bell,
  Bot,
  Boxes,
  Bug,
  Cable,
  CheckSquare,
  CircleDot,
  Cloud,
  Container,
  Cpu,
  Database,
  Fingerprint,
  GitBranch,
  Globe,
  KeyRound,
  LineChart,
  Lock,
  MessageSquare,
  Plug,
  Radar,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Webhook,
  Wind
};

export function IntegrationIcon({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
  const Icon = iconMap[name] ?? Boxes;
  return <Icon className={className} />;
}

export function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Link
      href={`/integrations-hub/${integration.id}`}
      className="group flex flex-col rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl transition hover:border-sentinel-500/40 hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sentinel-500/20 bg-sentinel-500/10 text-sentinel-300">
          <IntegrationIcon name={integration.icon} />
        </div>
        <Badge label={integration.status} tone={toneForStatus(integration.status)} />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{integration.name}</h3>
      <p className="mt-1.5 flex-1 text-xs leading-5 text-slate-400">{integration.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-[0.65rem] text-slate-500">
        <span>v{integration.version.replace('v', '')}</span>
        <span className="flex items-center gap-1">
          <Activity className="h-3 w-3" />
          {integration.lastSync}
        </span>
      </div>
    </Link>
  );
}

export function IntegrationGrid({ integrations }: { integrations: Integration[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {integrations.map((i) => (
        <IntegrationCard key={i.id} integration={i} />
      ))}
    </div>
  );
}