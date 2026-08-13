import { BookOpen } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { kbArticles } from '@/components/platform/support-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Support"
        title="Knowledge Base"
        description="Guides written by the Sentinel team to get you unblocked."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Articles" value={kbArticles.length} icon={BookOpen} accent="sky" sub="Published" />
        <StatCard label="Total reads" value="22,996" icon={BookOpen} accent="violet" sub="All time" />
        <StatCard label="Helpful rate" value="94%" icon={BookOpen} accent="green" sub="Thumbs up" />
        <StatCard label="Updated (7d)" value="2" icon={BookOpen} accent="amber" sub="Recently revised" />
      </div>

      <Card>
        <CardHeader title="Popular articles" subtitle="Sorted by read count" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {kbArticles.map((a) => (
              <div key={a.id} className="group flex flex-col rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-4 transition hover:border-sentinel-500/30 hover:bg-sentinel-500/5">
                <div className="flex items-center justify-between">
                  <Badge label={a.category} tone="blue" />
                  <span className="text-[0.65rem] text-slate-500">{a.reads.toLocaleString()} reads</span>
                </div>
                <h3 className="mt-3 text-xs font-semibold text-slate-200 transition group-hover:text-sentinel-300">{a.title}</h3>
                <p className="mt-1.5 flex-1 text-[0.7rem] leading-4 text-slate-500">{a.excerpt}</p>
                <p className="mt-3 text-[0.65rem] text-slate-600">Updated {a.updated}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}