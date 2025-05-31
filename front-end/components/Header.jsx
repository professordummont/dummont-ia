'use client';

import { useState } from 'react';
import Link from 'next/link';

// Exemplo: usando ícones SVG inline (sem necessidade de libs externas para este exemplo)
const ProfileIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"></circle>
    <path d="M16 16c-1.333-2-6.667-2-8 0"></path>
    <path d="M4 20h16"></path>
  </svg>
);

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '1rem',
      background: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo + Título */}
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%', // se quiser deixar ela redonda
            objectFit: 'cover',
          }}
        />
        {/* Título */}
        <h1 style={{
          marginLeft: '0.5rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          fontFamily: "'Stunning', sans-serif", // precisa garantir que a fonte "Stunning" foi carregada
        }}>
          Dummont IA
        </h1>
      </div>

      {/* Ícone de Perfil com circunferência */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {/* Circunferência */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ProfileIcon />
          </div>
        </button>

        {showMenu && (
          <div style={{
            position: 'absolute',
            top: '2.5rem',
            right: 0,
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            padding: '0.5rem',
            width: '150px',
          }}>
            <Link href="/profile" style={{ display: 'block', padding: '0.5rem', textDecoration: 'none', color: '#333' }}>Perfil</Link>
            <Link href="/history" style={{ display: 'block', padding: '0.5rem', textDecoration: 'none', color: '#333' }}>Histórico</Link>
          </div>
        )}
      </div>
    </header>
  );
}
