interface Step {
  title: string;
  description: string;
}

interface StepsProps {
  eyebrow: string;
  title: string;
  steps: Step[];
}

export default function Steps({ eyebrow, title, steps }: StepsProps) {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">{eyebrow}</p>
        <h2 className="mt-3 text-lg font-semibold text-white sm:text-xl">{title}</h2>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-[1.25rem] border border-white/10 bg-[rgba(15,23,42,0.92)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-6"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sentinel-500/15 text-sm font-bold text-sentinel-300 shadow-[0_8px_40px_rgba(56,189,248,0.1)]">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="mt-4 text-sm font-semibold text-white sm:text-base">{step.title}</h3>
            <p className="mt-2 text-xs leading-6 text-slate-400 sm:text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
