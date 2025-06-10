'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';

export default function ProfilePage() {
  const router = useRouter();
  const userId = 1;

  const [photoSrc, setPhotoSrc] = useState(null);
  const [statusAprendizagem, setStatusAprendizagem] = useState('Carregando...');
  const [statusSobreAluno, setStatusSobreAluno] = useState('Carregando...');
  const [statusSobreResponsavel, setStatusSobreResponsavel] = useState('Carregando...');

  const [formData, setFormData] = useState({
    student_name: '',
    age: '',
    grade: '',
    city: '',
    region: '',
    guardian_name: ''
  });

  const fieldMap = {
    'Nome do Aluno': 'student_name',
    'Idade': 'age',
    'Ano Letivo': 'grade',
    'Cidade': 'city',
    'Região': 'region',
    'Nome do responsável (Opcional)': 'guardian_name'
  };

  const verificarStatus = async (url, setStatus, tamanhoEsperado) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data || !Array.isArray(data)) return setStatus('Não respondido');

      const total = tamanhoEsperado ?? data.length;
      const respondidas = data.filter((r) => r && r.trim() !== '').length;

      if (respondidas === 0) setStatus('Não respondido');
      else if (respondidas < total) setStatus('Incompleto');
      else setStatus('Respondido');
    } catch (error) {
      console.error(`Erro ao verificar status de ${url}`, error);
      setStatus('Erro');
    }
  };

  const handleSalvarPerfil = async () => {
    const payload = {
      ...formData,
      photo: photoSrc ?? null
    };

    const res = await fetch('/api/perfil', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (json.success) {
      alert('Perfil salvo com sucesso!');
    } else {
      alert('Erro ao salvar perfil.');
    }
  };

  useEffect(() => {
    verificarStatus(`/api/questionario-aprendizagem?userId=${userId}`, setStatusAprendizagem, 10);
    verificarStatus(`/api/questionario-gostos?userId=${userId}`, setStatusSobreAluno, 7);
    verificarStatus(`/api/questionario-pais?userId=${userId}`, setStatusSobreResponsavel, 7);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPhotoSrc(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const renderStatus = (status) => {
    const colors = {
      'Não respondido': '#e74c3c',
      'Incompleto': '#f39c12',
      'Respondido': '#27ae60',
    };
    const icons = {
      'Não respondido': '❌',
      'Incompleto': '⚠️',
      'Respondido': '✅',
    };
    return (
      <span style={{ color: colors[status], fontWeight: 'bold' }}>
        {icons[status]} {status === 'Não respondido' ? 'Não foi feito ainda' : status === 'Incompleto' ? 'Precisa finalizar' : 'Concluído'}
      </span>
    );
  };

  const formFields = [
    'Nome do Aluno',
    'Idade',
    'Ano Letivo',
    'Cidade',
    'Região',
    'Nome do responsável (Opcional)'
  ];

  return (
    <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <Header />
      <div style={{ padding: '2rem 1rem', maxWidth: '960px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem', textAlign: 'center' }}>Perfil do Usuário</h2>

        {/* Foto */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <label htmlFor="profile-photo">
            <div
              style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                backgroundColor: '#eee',
                margin: '0 auto',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              {photoSrc ? (
                <img src={photoSrc} alt="Foto do perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#888' }}>Adicionar Foto</span>
              )}
            </div>
          </label>
          <input type="file" id="profile-photo" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
        </div>

        {/* Formulário */}
        <div style={{
          background: '#fff',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {formFields.map((field, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: 600 }}>{field}</label>
              <input
                type={field === 'Idade' ? 'number' : 'text'}
                placeholder={field}
                value={formData[fieldMap[field]]}
                onChange={(e) => setFormData({ ...formData, [fieldMap[field]]: e.target.value })}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid #d0d0d0',
                  backgroundColor: '#f5f7fa',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border 0.2s ease-in-out'
                }}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
          <button
            onClick={handleSalvarPerfil}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Salvar Perfil
          </button>
        </div>

        {/* Título de Questionários */}
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', fontWeight: '600' }}>Questionários</h2>

        {[{
          titulo: 'Teste de aprendizagem do Aluno',
          status: statusAprendizagem,
          onClick: () => router.push('/profile/questionario-aprendizagem')
        }, {
          titulo: 'Sobre o Aluno',
          status: statusSobreAluno,
          onClick: () => router.push('/profile/questionario-gostos')
        }, {
          titulo: 'Sobre o Responsável',
          status: statusSobreResponsavel,
          onClick: () => router.push('/profile/questionario-pais')
        }].map(({ titulo, status, onClick }, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: '1.5rem',
              borderRadius: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              marginBottom: '1.5rem'
            }}
          >
            <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>{titulo}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={onClick}
                style={{
                  padding: '0.6rem 1.2rem',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  letterSpacing: '0.3px'
                }}
              >
                {status === 'Não respondido' ? 'Iniciar Questionário' : 'Refazer Questionário'}
              </button>
              {renderStatus(status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}