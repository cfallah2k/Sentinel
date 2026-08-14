import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import LaunchSplash from '@/components/launch-splash';

export const metadata: Metadata = {
  title: 'SENTINEL | AI Data Governance',
  description: 'Know where your data goes, what AI touches it, and who is allowed to use it.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sentinel-theme');if(t==='light'){document.documentElement.dataset.theme='light';}}catch(e){}})();`
          }}
        />
      </head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className="bg-[var(--bg)] text-[var(--text)]">
        <LaunchSplash />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}