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
      // Aqui você faria o POST das respostas para seu backend ou API
      console.log("Respostas:", respostas);

      // Exemplo: enviar para API (pseudo-código)
      // await fetch('/api/salvar-questionario', { method: 'POST', body: JSON.stringify(respostas) });

      alert('Questionário concluído! Obrigado.');
      router.push('/profile');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1rem' }}>Teste de Aprendizagem do Aluno</h2>
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
