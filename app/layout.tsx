import { ReactNode } from 'react';
import Header from '@/components/Header/Header';

// Возвращаем глобальные стили приложения

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
