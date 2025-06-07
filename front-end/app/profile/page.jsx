'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function ProfilePage() {
  const router = useRouter();

  // Estados
  const [photoSrc, setPhotoSrc] = useState(null);
  const [statusAprendizagem, setStatusAprendizagem] = useState('Não respondido');
  const [statusSobreAluno, setStatusSobreAluno] = useState('Não respondido');
  const [statusSobreResponsavel, setStatusSobreResponsavel] = useState('Não respondido');

  // Handlers de navegação
  const handleAbrirQuestionarioAprendizagem = () => {
    router.push('/profile/questionario-aprendizagem');
  };

  const handleAbrirQuestionarioGostos = () => {
    router.push('/profile/questionario-gostos');
  };

  const handleAbrirQuestionarioPais = () => {
    router.push('/profile/questionario-pais');
  };

  // Handler de upload de foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setPhotoSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
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
              {photoSrc ? (
                <img
                  id="photo-preview"
                  src={photoSrc}
                  alt="Foto do perfil"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span id="photo-placeholder">Adicionar Foto</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profile-photo"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
        </div>

        {/* Formulário */}
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>Nome do Aluno:</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #ccc',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderBottom = '1px solid black')}
              onBlur={(e) => (e.target.style.borderBottom = e.target.value ? 'none' : '1px solid #ccc')}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>Idade:</label>
            <input
              type="number"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #ccc',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderBottom = '1px solid black')}
              onBlur={(e) => (e.target.style.borderBottom = e.target.value ? 'none' : '1px solid #ccc')}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>Ano Letivo:</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #ccc',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderBottom = '1px solid black')}
              onBlur={(e) => (e.target.style.borderBottom = e.target.value ? 'none' : '1px solid #ccc')}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>Cidade:</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #ccc',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderBottom = '1px solid black')}
              onBlur={(e) => (e.target.style.borderBottom = e.target.value ? 'none' : '1px solid #ccc')}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold' }}>Região:</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #ccc',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderBottom = '1px solid black')}
              onBlur={(e) => (e.target.style.borderBottom = e.target.value ? 'none' : '1px solid #ccc')}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontWeight: 'bold' }}>Nome do responsável (Opcional):</label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: 'none',
                borderBottom: '1px solid #ccc',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderBottom = '1px solid black')}
              onBlur={(e) => (e.target.style.borderBottom = e.target.value ? 'none' : '1px solid #ccc')}
            />
          </div>
        </form>

        {/* Questionários */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontWeight: 'bold' }}>Teste de aprendizagem do Aluno</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={handleAbrirQuestionarioAprendizagem}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #000',
                cursor: 'pointer',
              }}
            >
              {statusAprendizagem === 'Não respondido' ? 'Iniciar Questionário' : 'Refazer Questionário'}
            </button>
            {statusAprendizagem === 'Não respondido' && (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Não foi feito ainda</span>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontWeight: 'bold' }}>Sobre o Aluno</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={handleAbrirQuestionarioGostos}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #000',
                cursor: 'pointer',
              }}
            >
              {statusSobreAluno === 'Não respondido' ? 'Iniciar Questionário' : 'Refazer Questionário'}
            </button>
            {statusSobreAluno === 'Não respondido' && (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Não foi feito ainda</span>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontWeight: 'bold' }}>Sobre o responsável</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={handleAbrirQuestionarioPais}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#fff',
                color: '#000',
                border: '1px solid #000',
                cursor: 'pointer',
              }}
            >
              {statusSobreResponsavel === 'Não respondido' ? 'Iniciar Questionário' : 'Refazer Questionário'}
            </button>
            {statusSobreResponsavel === 'Não respondido' && (
              <span style={{ color: 'red', fontWeight: 'bold' }}>Não foi feito ainda</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
