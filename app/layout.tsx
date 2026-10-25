import { ReactNode } from 'react';
import Header from '@/components/Header/Header';

// Возвращаем глобальные стили приложения
// @ts-expect-error global css module resolution
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
