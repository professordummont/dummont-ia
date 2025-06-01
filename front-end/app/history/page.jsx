'use client';

import Header from '../../components/Header';

export default function HistoryPage() {
  return (
    <div>
      <Header />
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Histórico de Aulas</h2>

        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Aqui você verá os chats passados.
        </p>

        {/* Espaço reservado para exibir os chats */}
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            minHeight: '200px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <p style={{ textAlign: 'center', color: '#888' }}>
            Nenhum chat disponível no momento.
          </p>
        </div>
      </div>
    </div>
  );
}

