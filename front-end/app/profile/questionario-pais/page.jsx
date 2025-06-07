'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const perguntas = [
  "Para ajudar seu filho a compreender um problema de matemática, primeiro leia a situação com ele em voz alta, depois identifiquem juntos as informações importantes e, por fim, discutam qual operação deve ser usada para resolver.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Se uma criança precisa entender como calcular o troco em uma compra, você pode mostrar um exemplo: se o item custa R$ 8,50 e ela paga com uma nota de R$ 10,00, pergunte quanto sobra. Depois peça que faça o mesmo com outros valores.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Explicar frações pode ser comparado a dividir uma pizza: se você tem uma pizza e corta em 8 pedaços, cada pedaço é 1/8 da pizza.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Se a criança demonstra dificuldade em um tema, experimente apresentar o conteúdo de um jeito diferente — como por meio de um jogo, um vídeo ou uma atividade prática.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Após acessar a aba 'Recursos de Estudo', localize o módulo correspondente ao tema atual. Dentro dele, utilize os exercícios interativos e os vídeos de apoio como complemento ao conteúdo principal.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Em vez de dar diretamente a resposta certa, incentive seu filho a pensar em diferentes maneiras de resolver o problema e a explicar como chegou à resposta que ele escolher.\n\nExplique com suas palavras o que você entendeu dessa instrução."
];

export default function QuestionarioInterpretacaoResponsavel() {
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
      alert('Questionário de interpretação concluído! Obrigado.');
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
        Sobre os Pais
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
