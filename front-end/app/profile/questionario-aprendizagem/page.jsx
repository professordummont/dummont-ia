'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const perguntas = [
  "Imagina que você acabou de ganhar um brinquedo novo (ou um jogo novo, ou um instrumento musical). Como você descobre como ele funciona? O que você faz primeiro?",
  "Imagina que você aprendeu uma mágica nova (ou um truque, uma receita). Como você sabe que já está pronto para mostrar para alguém? Como você percebe que aprendeu bem?",
  "Se seu melhor amigo quisesse aprender a jogar seu jogo favorito, como você ensinaria para ele?",
  "Me conta uma coisa que você aprendeu bem rápido. Como foi que você aprendeu tão rápido?",
  "Agora me conta uma coisa que você achou bem difícil de aprender. O que você acha que deixou mais difícil?",
  "Quando você está tentando aprender uma coisa difícil, o que você costuma fazer?",
  "Imagina que você tem que lembrar o caminho para um lugar novo. O que mais te ajuda a lembrar?",
  "Se você pudesse escolher um lugar legal para aprender, como seria esse lugar?",
  "Se você tivesse uma varinha mágica para aprender qualquer coisa, o que você escolheria aprender? Por quê?",
  "Imagina que alguém vai te ensinar uma coisa difícil. Como você gostaria que essa pessoa ajudasse?"
];

export default function QuestionarioAprendizagem() {
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
      alert('Questionário de aprendizagem concluído! Obrigado.');
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
        Teste de Aprendizagem do Aluno
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
