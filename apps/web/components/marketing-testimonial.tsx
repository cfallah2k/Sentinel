interface MarketingTestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export default function MarketingTestimonial({ quote, name, role, company }: MarketingTestimonialProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-panel backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-sentinel-500/20 hover:bg-slate-900/95">
      <div className="pointer-events-none absolute left-0 top-0 h-2 w-24 rounded-r-full bg-gradient-to-r from-sentinel-500 via-sky-400 to-cyan-300 opacity-40" />
      <p className="text-lg leading-8 text-slate-200 sm:text-xl">“{quote}”</p>
      <div className="mt-6 border-t border-white/10 pt-5 text-sm text-slate-400">
        <p className="font-semibold text-white">{name}</p>
        <p>{role} · {company}</p>
      </div>
    </div>
  );
}
