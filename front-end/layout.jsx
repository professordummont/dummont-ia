export const metadata = {
  title: 'Minha Plataforma de Aulas',
  description: 'Plataforma de aulas personalizadas com IA',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f9f9f9' }}>
        {children}
      </body>
    </html>
  );
}
