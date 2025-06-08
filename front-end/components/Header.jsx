'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProfileIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4"></circle>
    <path d="M16 16c-1.333-2-6.667-2-8 0"></path>
    <path d="M4 20h16"></path>
  </svg>
);

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [targetLink, setTargetLink] = useState('/');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        setTargetLink('/chat');
      } else {
        setTargetLink('/');
      }
    }
  }, []);

  const handleLogout = () => {
    console.log('Fazendo logout...');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_nome');
    router.push('/');
    setShowMenu(false);
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px 24px',
        background: '#fff',
        borderBottom: '1px solid #eaeaea',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo + Título */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'cover',
          }}
        />
        <Link
          href={targetLink}
          style={{
            marginLeft: '12px',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: '#000',
            cursor: 'pointer',
          }}
        >
          Dummont IA
        </Link>
      </div>

      {/* Ícone de Perfil */}
      <div style={{ position: 'relative', marginRight: '45px' }}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ProfileIcon />
          </div>
        </button>

        {showMenu && (
          <div
            onMouseLeave={() => setShowMenu(false)} // 👈 Fecha quando o mouse sai da lista
            style={{
              position: 'absolute',
              top: '50px',
              right: 0,
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '0.5rem',
              width: '160px',
            }}
          >
            <Link
              href="/profile"
              style={{
                display: 'block',
                padding: '0.5rem',
                textDecoration: 'none',
                color: '#333',
              }}
            >
              Perfil
            </Link>
            <Link
              href="/history"
              style={{
                display: 'block',
                padding: '0.5rem',
                textDecoration: 'none',
                color: '#333',
              }}
            >
              Histórico
            </Link>
            <button
              onClick={handleLogout}
              style={{
                display: 'block',
                padding: '0.5rem',
                textAlign: 'left',
                border: 'none',
                textDecoration: 'none',
                background: 'transparent',
                color: '#333',
                cursor: 'pointer',
                marginTop: '1px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                fontWeight: 'normal',
                lineHeight: '1.5',
              }}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
