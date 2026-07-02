import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lista de Tarefas',
  description: 'Aplicação de exemplo com Next.js 15 App Router e testes unitários',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
