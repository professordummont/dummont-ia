import './globals.css';

export const metadata = {
  title: 'Minha Plataforma',
  description: 'Minha plataforma personalizada',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
