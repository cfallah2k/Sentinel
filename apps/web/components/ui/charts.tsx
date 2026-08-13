'use client';

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const tooltipStyle = {
  backgroundColor: 'rgba(2,6,23,0.95)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '1rem',
  fontSize: '0.75rem',
  color: '#e2e8f0',
  boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
};

export function AreaTrend({ data, dataKey, xKey = 'hour', color = '#38bdf8', height = 180, showGrid = true }: {
  data: Record<string, number | string>[];
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showGrid ? <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} /> : null}
          <XAxis dataKey={xKey} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${dataKey})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MultiArea({ data, keys, xKey = 'hour', colors = ['#38bdf8', '#f87171', '#fbbf24', '#a78bfa'], height = 200 }: {
  data: Record<string, number | string>[];
  keys: string[];
  xKey?: string;
  colors?: string[];
  height?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
          <defs>
            {keys.map((k, i) => (
              <linearGradient key={k} id={`mgrad-${k}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors[i % colors.length]} stopOpacity={0.3} />
                <stop offset="100%" stopColor={colors[i % colors.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          {keys.map((k, i) => (
            <Area key={k} type="monotone" dataKey={k} stroke={colors[i % colors.length]} strokeWidth={1.8} fill={`url(#mgrad-${k})`} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BarSeries({ data, dataKey, xKey = 'name', color = '#38bdf8', height = 200, radius = 8 }: {
  data: Record<string, number | string>[];
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
  radius?: number;
}) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -15 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} interval={0} angle={data.length > 6 ? -20 : 0} height={40} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey={dataKey} fill={color} radius={[radius, radius, 0, 0]} maxBarSize={34} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const pieColors = ['#38bdf8', '#f87171', '#fbbf24', '#a78bfa', '#34d399', '#f472b6'];

export function DonutChart({ data, height = 200, innerRadius = 52, outerRadius = 70 }: {
  data: { name: string; value: number }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6" style={{ minHeight: height }}>
      <div style={{ height, width: height }} className="shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip contentStyle={tooltipStyle} />
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={3} stroke="none">
              {data.map((_, i) => (
                <Cell key={i} fill={pieColors[i % pieColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid w-full grid-cols-1 gap-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-2 text-slate-300">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: pieColors[i % pieColors.length] }} />
              {d.name}
            </span>
            <span className="font-semibold text-white">{d.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sparkline({ data, color = '#38bdf8', height = 36 }: { data: number[]; color?: string; height?: number }) {
  const points = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={points} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.6} fill={`url(#spark-${color.replace('#', '')})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}