import { CopyButton } from './settings-form';

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90">
      {label ? (
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-slate-500">{label}</span>
          <CopyButton text={code} />
        </div>
      ) : (
        <div className="flex justify-end border-b border-white/5 px-4 py-2">
          <CopyButton text={code} />
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-xs leading-6 text-slate-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}