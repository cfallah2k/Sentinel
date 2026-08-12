import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.26),_transparent_35%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_32%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(circle,_rgba(56,189,248,0.08),_transparent_55%)] blur-3xl" />
      <div className="relative min-h-screen">{children}</div>
    </div>
  );
}
