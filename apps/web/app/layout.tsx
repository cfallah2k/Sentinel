import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SENTINEL | AI Data Governance',
  description: 'Know where your data goes, what AI touches it, and who is allowed to use it.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text)]">{children}</body>
    </html>
  );
}
