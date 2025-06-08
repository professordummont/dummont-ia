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

        // 🔥 Salva o user_id e user_nome no localStorage (para usar no chat ou perfil)
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user_nome', data.user_nome);

        console.log('🔵 Usuário autenticado:', data.user_id, data.user_nome);

        // 🚀 Redireciona via SPA
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
        backgroundColor: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Logo no canto superior esquerdo */}
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

      {/* Formulário centralizado */}
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          marginTop: '100px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: '#111' }}>Login</h1>

        <form
          onSubmit={handleSubmit}
          autoComplete="on" // 🚀 ativa o autocomplete do navegador
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <input
            type="email"
            name="email" // 🚀 importante
            autoComplete="email" // 🚀 importante
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc', // corrigido
            }}
          />
          <input
            type="password"
            name="password" // 🚀 importante
            autoComplete="current-password" // 🚀 importante
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc', // corrigido
            }}
          />
          <button
            type="submit"
            style={{
              padding: '15px',
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
        </form>
      </div>
    </main>
  );
}
