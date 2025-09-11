import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppShell } from '@/components/layout/AppShell';
import { DemoProvider } from '@/context/DemoContext';

export const metadata: Metadata = {
  title: 'DerivaSim | شبیه‌ساز مشتقه',
  description: 'داشبورد مدیریت پورتفولیو مشتقه',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <DemoProvider>
          <AppShell>{children}</AppShell>
          <Toaster />
        </DemoProvider>
      </body>
    </html>
  );
}
