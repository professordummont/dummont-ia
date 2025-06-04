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
      // Aqui você faria o POST das respostas para seu backend ou API
      console.log("Respostas:", respostas);

      // Exemplo: enviar para API (pseudo-código)
      // await fetch('/api/salvar-questionario-gostos', { method: 'POST', body: JSON.stringify(respostas) });

      alert('Questionário de gostos concluído! Obrigado.');
      router.push('/profile');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Questionário: Descobrindo os Gostos da Criança</h2>
      <p>Pergunta {currentQuestion + 1} de {perguntas.length}</p>
      <h3 style={{ marginBottom: '1rem' }}>{perguntas[currentQuestion]}</h3>
      <textarea
        value={respostas[currentQuestion]}
        onChange={handleRespostaChange}
        style={{ width: '100%', height: '150px', padding: '0.5rem' }}
      ></textarea>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleNext} style={{ padding: '0.5rem 1rem' }}>
          {currentQuestion < perguntas.length - 1 ? 'Próxima' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
