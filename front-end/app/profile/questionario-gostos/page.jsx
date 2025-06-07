'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const perguntas = [
  "O que você mais gosta?",
  "Qual é o seu desenho animado, filme ou personagem favorito?",
  "Quais são seus brinquedos ou jogos preferidos?",
  "Você gosta de algum esporte ou atividade física? Qual?",
  "Qual tipo de história ou livro você mais gosta?",
  "Você tem um animal favorito? Qual?",
  "Qual é a sua comida ou doce preferido?"
];

export default function QuestionarioGostos() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(''));
  const router = useRouter();

  const handleRespostaChange = (e) => {
    const newRespostas = [...respostas];
    newRespostas[currentQuestion] = e.target.value;
    setRespostas(newRespostas);
  };

  const handleNext = () => {
    if (currentQuestion < perguntas.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log("Respostas:", respostas);
      alert('Questionário de gostos concluído! Obrigado.');
      router.push('/profile');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleVoltar = () => {
    router.push('/profile');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', position: 'relative', minHeight: '100vh' }}>
      
      {/* Botão Voltar no canto extremo esquerdo superior */}
      <button
        onClick={handleVoltar}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1.2rem',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          color: '#000',
          fontWeight: 'bold',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.6'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        Voltar
      </button>

      {/* Título centralizado */}
      <h2 style={{
        marginBottom: '1rem',
        marginTop: '2rem',
        textAlign: 'center',
        fontSize: '1.8rem',
        color: '#000'
      }}>
        Sobre o Aluno
      </h2>

      {/* Pergunta */}
      <p style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
        Pergunta {currentQuestion + 1} de {perguntas.length}
      </p>

      <h3 style={{ marginBottom: '1rem', whiteSpace: 'pre-line' }}>
        {perguntas[currentQuestion]}
      </h3>

      {/* Caixa de texto */}
      <textarea
        value={respostas[currentQuestion]}
        onChange={handleRespostaChange}
        style={{
          width: '100%',
          height: '250px',
          padding: '0.5rem',
          marginBottom: '1rem',
          fontSize: '1rem'
        }}
      ></textarea>

      {/* Botões Anterior / Próxima */}
      <div style={{
        marginTop: '0.5rem',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          style={{
            padding: '0.2rem 1rem',
            fontSize: '1.2rem',
            background: 'none',
            border: 'none',
            color: '#000',
            fontWeight: 'bold',
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
            opacity: currentQuestion === 0 ? 0.5 : 1,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => {
            if (currentQuestion !== 0) e.target.style.opacity = '0.6';
          }}
          onMouseLeave={(e) => {
            if (currentQuestion !== 0) e.target.style.opacity = '1';
          }}
        >
          Anterior
        </button>

        <button
          onClick={handleNext}
          style={{
            padding: '0.2rem 1rem',
            fontSize: '1.2rem',
            background: 'none',
            border: 'none',
            color: '#000',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.6'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          {currentQuestion < perguntas.length - 1 ? 'Próxima' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
