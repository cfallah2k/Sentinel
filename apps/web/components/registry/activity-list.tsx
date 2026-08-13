import { Badge } from '@/components/ui/badge';
import { entityEvents } from './helpers';

export function ActivityList({ entityId, entityName, count = 8 }: { entityId: string; entityName: string; count?: number }) {
  const events = entityEvents(entityId, entityName, count);
  return (
    <div className="divide-y divide-white/5">
      {events.map((e) => (
        <div key={e.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate text-xs text-slate-200">
              <span className="font-mono text-sentinel-300">{e.action}</span>
              <span className="text-slate-500"> — {e.resource}</span>
            </p>
            <p className="mt-0.5 text-[0.65rem] text-slate-500">
              {e.actor} · {e.ip} · {e.context}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="whitespace-nowrap text-[0.65rem] text-slate-500">{e.timestamp}</span>
            <Badge label={e.result} />
          </div>
        </div>
      ))}
    </div>
  );
}