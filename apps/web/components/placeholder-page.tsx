export default function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="max-w-2xl p-8 rounded-3xl border border-white/10 bg-slate-900/95 shadow-xl">
        <h1 className="text-3xl font-semibold">{title}</h1>
        {description ? <p className="mt-4 text-slate-300">{description}</p> : null}
      </div>
    </main>
  );
}
