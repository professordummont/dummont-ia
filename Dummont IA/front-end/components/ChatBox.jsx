'use client';

import { useState } from 'react';

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
      height: 'calc(100vh - 80px)',
      padding: '1rem',
    }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Nova Aula</h2>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#fff',
        marginBottom: '1rem',
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              marginBottom: '0.75rem',
              textAlign: msg.sender === 'user' ? 'right' : 'left',
            }}
          >
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background: msg.sender === 'user' ? '#0070f3' : '#e5e5ea',
              color: msg.sender === 'user' ? '#fff' : '#000',
              maxWidth: '70%',
              wordWrap: 'break-word',
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginRight: '0.5rem',
            fontSize: '1rem',
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button
          onClick={handleSend}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
