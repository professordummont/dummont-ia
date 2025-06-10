'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const perguntas = [
  "Para ajudar seu filho a compreender um problema de matemática, primeiro leia a situação com ele em voz alta, depois identifiquem juntos as informações importantes e, por fim, discutam qual operação deve ser usada para resolver.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Se uma criança precisa entender como calcular o troco em uma compra, você pode mostrar um exemplo: se o item custa R$ 8,50 e ela paga com uma nota de R$ 10,00, pergunte quanto sobra. Depois peça que faça o mesmo com outros valores.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Explicar frações pode ser comparado a dividir uma pizza: se você tem uma pizza e corta em 8 pedaços, cada pedaço é 1/8 da pizza.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Se a criança demonstra dificuldade em um tema, experimente apresentar o conteúdo de um jeito diferente — como por meio de um jogo, um vídeo ou uma atividade prática.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Após acessar a aba 'Recursos de Estudo', localize o módulo correspondente ao tema atual. Dentro dele, utilize os exercícios interativos e os vídeos de apoio como complemento ao conteúdo principal.\n\nExplique com suas palavras o que você entendeu dessa instrução.",
  "Em vez de dar diretamente a resposta certa, incentive seu filho a pensar em diferentes maneiras de resolver o problema e a explicar como chegou à resposta que ele escolher.\n\nExplique com suas palavras o que você entendeu dessa instrução."
];

export default function QuestionarioPais() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(''));
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const userId = 1; // Trocar por autenticação real

  useEffect(() => {
    const carregarRespostas = async () => {
      try {
        const res = await fetch(`/api/questionario-pais?userId=${userId}`);
        const data = await res.json();
        if (Array.isArray(data)) setRespostas(data);
      } catch (err) {
        console.error('Erro ao carregar respostas:', err);
      } finally {
        setIsLoading(false);
      }
    };
    carregarRespostas();
  }, []);

  const salvarRespostas = async (respostasParaSalvar) => {
    try {
      await fetch('/api/questionario-pais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, respostas: respostasParaSalvar })
      });
    } catch (err) {
      console.error('Erro ao salvar respostas:', err);
    }
  };

  const handleRespostaChange = async (e) => {
    const novasRespostas = [...respostas];
    novasRespostas[currentQuestion] = e.target.value;
    setRespostas(novasRespostas);
    await salvarRespostas(novasRespostas);
  };

  const handleNext = async () => {
    if (currentQuestion < perguntas.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      await salvarRespostas(respostas);
      alert('Questionário de interpretação concluído! Obrigado.');
      router.push('/profile');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const handleVoltar = () => router.push('/profile');

  if (isLoading) return <p style={{ padding: '2rem' }}>Carregando questionário...</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button
        onClick={handleVoltar}
        style={{ position: 'fixed', top: '1rem', left: '1rem', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }}
      >
        Voltar
      </button>

      <h2 style={{ marginTop: '2rem', textAlign: 'center' }}>Sobre os Pais</h2>
      <p>Pergunta {currentQuestion + 1} de {perguntas.length}</p>
      <h3 style={{ whiteSpace: 'pre-line' }}>{perguntas[currentQuestion]}</h3>

      <textarea
        value={respostas[currentQuestion]}
        onChange={handleRespostaChange}
        style={{ width: '100%', height: '250px', marginBottom: '1rem' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handlePrevious} disabled={currentQuestion === 0}>Anterior</button>
        <button onClick={handleNext}>
          {currentQuestion < perguntas.length - 1 ? 'Próxima' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
