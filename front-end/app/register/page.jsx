// front-end/app/register/page.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      alert('As senhas não conferem!');
      return;
    }

    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
      window.location.href = '/chat';
    } else {
      alert(data.detail || 'Erro no cadastro.');
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
        <h1 style={{ fontSize: '2rem', marginBottom: '30px', color: '#111' }}>Inscrever-se</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
            style={{
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
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
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
