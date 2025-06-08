'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@components/Header';
import ChatBox from '@components/ChatBox';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado
    const userId = localStorage.getItem('user_id');
    const userNome = localStorage.getItem('user_nome');

    console.log('🔵 Verificando usuário logado:', userId, userNome);

    if (!userId) {
      // Se não estiver logado → redireciona para login
      alert('Você precisa fazer login para acessar o chat.');
      router.push('/login');
    }
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Header />

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <ChatBox />
      </div>
    </div>
  );
}
