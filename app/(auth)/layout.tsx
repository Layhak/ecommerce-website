import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import { fontSans } from '@/config/fonts';
import { Providers } from './providers';
import clsx from 'clsx';
import StoreProvider from '@/app/StoreProvider';
import SessionWrapper from '@/app/SessionProvider';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <SessionWrapper>
        <body
          className={clsx(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <StoreProvider>
            <Providers
              themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
            >
              <main className="container mx-auto min-h-screen max-w-7xl flex-grow px-6 pt-16">
                {children}
              </main>
            </Providers>
          </StoreProvider>
        </body>
      </SessionWrapper>
    </html>
  );
}
