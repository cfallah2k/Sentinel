interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalDocProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export default function LegalDoc({ eyebrow, title, updated, intro, sections }: LegalDocProps) {
  return (
    <article className="mx-auto max-w-3xl">
      <div className="rounded-[1.25rem] border border-white/10 bg-[var(--surface)] p-5 shadow-panel backdrop-blur-xl sm:rounded-[1.5rem] sm:p-8">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-sentinel-300">{eyebrow}</p>
        <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">Last updated {updated}</p>
        <p className="mt-6 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{intro}</p>
        <div className="mt-10 space-y-10">
          {sections.map((section, index) => (
            <section key={section.heading}>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sentinel-500/30 bg-sentinel-500/10 text-xs font-semibold text-sentinel-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="text-base font-semibold text-white sm:text-lg">{section.heading}</h2>
              </div>
              <div className="mt-4 space-y-4 pl-11">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-sm leading-7 text-slate-400">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
