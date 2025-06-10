'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      router.push('/chat');
    }
  }, [router]);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Inter, sans-serif',
        padding: '2rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '3rem',
          textAlign: 'left',
        }}
      >
        <Image
          src="/logo.png"
          alt="Dummont AI Logo"
          width={200}
          height={200}
          style={{ borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
        />

        <div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, color: '#111', marginBottom: '1rem' }}>
            Dummont AI
          </h1>

          <p
            style={{
              fontSize: '1.25rem',
              color: '#555',
              maxWidth: '500px',
              lineHeight: '1.6',
            }}
          >
            Uma nova maneira de aprender. O conteúdo da maneira como você gosta de estudar.
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '2rem' }}>
            <Link href="/login">
              <button
                style={{
                  padding: '0.9rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                  backgroundColor: '#000',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease-in-out',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Entrar
              </button>
            </Link>

            <Link href="/register">
              <button
                style={{
                  padding: '0.9rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#000',
                  backgroundColor: '#fff',
                  border: '2px solid #000',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s ease-in-out, background 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Inscrever-se
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
