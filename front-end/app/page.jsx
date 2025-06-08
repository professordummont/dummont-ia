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
      console.log('Usuário já logado → redirecionando para /chat');
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
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      {/* Container para logo + textos */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '20px',
        }}
      >
        {/* Logo — aumentei */}
        <Image src="/logo.png" alt="Dummont AI Logo" width={240} height={240} />

        {/* Título + Frase + Botões */}
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '4rem', color: '#111', margin: 0 }}>
            Dummont AI
          </h1>

          {/* Frase */}
          <p
            style={{
              fontSize: '1.5rem',
              color: '#555',
              marginTop: '15px',
              maxWidth: '500px',
            }}
          >
            Uma nova maneira de aprender. O conteúdo da maneira como você gosta de estudar.
          </p>

          {/* Botões — abaixo da frase */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <Link href="/login">
              <button
                style={{
                  padding: '15px 30px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  backgroundColor: '#0066ff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Entrar
              </button>
            </Link>

            <Link href="/register">
              <button
                style={{
                  padding: '15px 30px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: '#0066ff',
                  backgroundColor: '#f5f5f5',
                  border: '2px solid #0066ff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
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
