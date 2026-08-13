import type { ReactNode } from 'react';
import AppSidebar from '@/components/app-sidebar';
import AppTopbar from '@/components/app-topbar';

export default function appLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 lg:flex-row">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}