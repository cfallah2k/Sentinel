import type { ReactNode } from 'react';
import SiteFooter from '../../components/site-footer';
import SiteHeader from '../../components/site-header';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_30%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.14),_transparent_32%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle,_rgba(14,165,233,0.08),_transparent_55%)] blur-3xl" />
      <div className="relative">
        <SiteHeader />
        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
