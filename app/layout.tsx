import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Positive News Portal',
  description: 'A feel‑good, AI‑powered news reader.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Positive News Portal
            </h1>
            <a
              href="/"
              className="text-sm underline opacity-70 hover:opacity-100 transition"
            >
              Refresh
            </a>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}