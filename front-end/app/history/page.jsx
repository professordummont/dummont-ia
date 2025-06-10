'use client';

import Header from '../../components/Header';

export default function HistoryPage() {
  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Header />

      <main style={{ padding: '3rem 1.5rem', maxWidth: '700px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: '600',
            color: '#111',
            marginBottom: '1rem',
          }}
        >
          Histórico de Aulas
        </h2>

        <p
          style={{
            textAlign: 'center',
            color: '#555',
            fontSize: '1.1rem',
            marginBottom: '2.5rem',
          }}
        >
          Aqui você verá os chats passados.
        </p>

        <section
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.03)',
            padding: '2rem',
            textAlign: 'center',
            color: '#888',
            fontSize: '1rem',
          }}
        >
          Nenhum chat disponível no momento.
        </section>
      </main>
    </div>
  );
}
