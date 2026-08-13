export function ProgressBar({ value, color = 'bg-sky-400', className = '' }: { value: number; color?: string; className?: string }) {
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-white/8 ${className}`}>
      <div
        className={`h-full rounded-full ${color} transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export function Metric({ label, value, suffix }: { label: string; value: string | number; suffix?: string }) {
  return (
    <div>
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">
        {value}
        {suffix ? <span className="text-xs font-normal text-slate-400"> {suffix}</span> : null}
      </p>
    </div>
  );
}