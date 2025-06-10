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
    stroke="currentColor"
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
      setTargetLink(userId ? '/chat' : '/');
    }
  }, []);

  const handleLogout = () => {
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
        padding: '1rem 2rem',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo e Nome */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            objectFit: 'cover',
          }}
        />
        <Link
          href={targetLink}
          style={{
            marginLeft: '14px',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#111',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
          }}
        >
          Dummont IA
        </Link>
      </div>

      {/* Perfil */}
      <div style={{ position: 'relative', marginRight: '5rem', marginLeft: 'auto' }}>
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
              backgroundColor: '#f3f4f6',
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease',
            }}
          >
            <ProfileIcon />
          </div>
        </button>

        {showMenu && (
          <div
            onMouseLeave={() => setShowMenu(false)}
            style={{
              position: 'absolute',
              top: '52px',
              right: 0,
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              width: '180px',
              padding: '0.75rem 0',
              fontSize: '0.95rem',
            }}
          >
            <Link
              href="/profile"
              style={{
                display: 'block',
                padding: '0.75rem 1.25rem',
                color: '#111',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Perfil
            </Link>
            <Link
              href="/history"
              style={{
                display: 'block',
                padding: '0.75rem 1.25rem',
                color: '#111',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Histórico
            </Link>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '0.75rem 1.25rem',
                textAlign: 'left',
                border: 'none',
                background: 'transparent',
                color: '#e11d48',
                cursor: 'pointer',
                fontSize: 'inherit',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#fef2f2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
