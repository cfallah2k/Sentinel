import type { ReactNode } from 'react';
import AppSidebar from '../../components/app-sidebar';
import AppHeader from '../../components/app-header';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_40%)] blur-3xl" />
        <div className="lg:flex">
          <AppSidebar />

          <div className="flex-1">
            <AppHeader />
            <main className="min-h-[calc(100vh-5rem)] px-6 py-8 lg:px-10 lg:py-10">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
