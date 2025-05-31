'use client';

import { useState } from 'react';
import { FiSend, FiMic, FiPaperclip } from 'react-icons/fi'; // Feather Icons (leve e elegante)

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const aiResponse = { sender: 'ai', text: data.response };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }

    setInput('');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#fff',
      color: '#000',
    }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '1rem',
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              fontSize: '1rem',
              lineHeight: '1.6',
              backgroundColor: '#fff',
              color: '#000',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: msg.sender === 'user' ? '1px solid #000' : '1px solid #333',
              textAlign: 'left',
              whiteSpace: 'pre-wrap',
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{
        padding: '1.5rem',
        borderTop: '1px solid #000',
        backgroundColor: '#fff',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          border: '1px solid #000',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
        }}>
          {/* Ícone de anexo */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              marginRight: '0.5rem',
            }}
            title="Anexar arquivo"
          >
            <FiPaperclip size={20} color="#fff" />
          </button>

          {/* Input de texto */}
          <input
            type="text"
            placeholder="Digite sua pergunta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: '1.25rem',
              fontSize: '1.125rem',
              border: 'none',
              outline: 'none',
              backgroundColor: '#fff',
              color: '#000',
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          />

          {/* Ícone de microfone */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
            title="Gravar áudio"
          >
            <FiMic size={20} color="#fff" />
          </button>

          {/* Botão de enviar com ícone de avião */}
          <button
            onClick={handleSend}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              marginLeft: '0.5rem',
            }}
            title="Enviar"
          >
            <FiSend size={20} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
