'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function ProfilePage() {
  const router = useRouter();

  // Estados para armazenar status dos questionários
  const [statusAprendizagem, setStatusAprendizagem] = useState('Não respondido');
  const [statusSobreAluno, setStatusSobreAluno] = useState('Não respondido');
  const [statusSobreResponsavel, setStatusSobreResponsavel] = useState('Não respondido');

  // Redirecionar para questionário de aprendizagem
  const handleAbrirQuestionarioAprendizagem = () => {
    router.push('/profile/questionario-aprendizagem');
  };

  // Redirecionar para questionário de gostos (que será o "Sobre o Aluno")
  const handleAbrirQuestionarioGostos = () => {
    router.push('/profile/questionario-gostos');
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Perfil do Usuário</h2>

        {/* Campo de Foto */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <label htmlFor="profile-photo">
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              <img
                id="photo-preview"
                src=""
                alt="Clique para adicionar uma foto"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'none' }}
              />
              <span id="photo-placeholder">Adicionar Foto</span>
            </div>
          </label>
          <input
            type="file"
            id="profile-photo"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                  const img = document.getElementById('photo-preview');
                  const placeholder = document.getElementById('photo-placeholder');
                  img.src = event.target.result;
                  img.style.display = 'block';
                  placeholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>

        {/* Formulário */}
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label>Nome do Aluno:</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Idade:</label>
            <input type="number" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Ano Letivo:</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Cidade:</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Região:</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label>Nome do responsável (Opcional):</label>
            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }} />
          </div>
        </form>

        {/* Questionários */}
        <div style={{ marginBottom: '2rem' }}>
          <h3>Teste de aprendizagem do Aluno</h3>
          <p>Status: {statusAprendizagem}</p>
          <button
            onClick={handleAbrirQuestionarioAprendizagem}
            style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}
          >
            {statusAprendizagem === 'Não respondido' ? 'Iniciar Questionário' : 'Refazer Questionário'}
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Sobre o Aluno</h3> {/* <- este é o Questionário de Gostos */}
          <p>Status: {statusSobreAluno}</p>
          <button
            onClick={handleAbrirQuestionarioGostos}
            style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}
          >
            {statusSobreAluno === 'Não respondido' ? 'Iniciar Questionário' : 'Refazer Questionário'}
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3>Sobre o responsável</h3>
          <p>Status: {statusSobreResponsavel}</p>
          <button
            onClick={() => alert('Funcionalidade em construção')}
            style={{ padding: '0.5rem 1rem', marginTop: '0.5rem' }}
          >
            {statusSobreResponsavel === 'Não respondido' ? 'Iniciar Questionário' : 'Refazer Questionário'}
          </button>
        </div>
      </div>
    </div>
  );
}
