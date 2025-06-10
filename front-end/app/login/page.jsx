'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login realizado com sucesso!');
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user_nome', data.user_nome);
        console.log('🔵 Usuário autenticado:', data.user_id, data.user_nome);
        router.push('/chat');
      } else {
        alert(data.detail || 'Erro no login.');
      }
    } catch (error) {
      alert('Erro na requisição. Verifique a API.');
      console.error(error);
    }
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Inter, sans-serif',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
        <Link href="/">
          <Image src="/logo.png" alt="Dummont AI Logo" width={50} height={50} style={{ cursor: 'pointer' }} />
        </Link>
      </div>

      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          marginTop: '120px',
          background: '#fff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.25rem', marginBottom: '24px', color: '#111', fontWeight: '600' }}>Entrar</h1>

        <form
          onSubmit={handleSubmit}
          autoComplete="on"
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '14px 16px',
              fontSize: '1rem',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              background: '#f9fafb',
              transition: 'border 0.2s ease',
            }}
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              padding: '14px 16px',
              fontSize: '1rem',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              background: '#f9fafb',
              transition: 'border 0.2s ease',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '14px 0',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#fff',
              backgroundColor: '#0066ff',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Entrar
          </button>
        </form>

        <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#555' }}>
          Não possui conta?{' '}
          <Link href="/register" style={{ color: '#0066ff', fontWeight: '500', textDecoration: 'none' }}>
            Inscreva-se
          </Link>
        </p>
      </div>
    </main>
  );
}