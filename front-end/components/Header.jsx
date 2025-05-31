'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      <h1 style={{ marginRight: 'auto', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Minha Plataforma
      </h1>
      
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
          }}
        >
          👤
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
