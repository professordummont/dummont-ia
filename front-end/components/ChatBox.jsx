'use client';

import { useState, useRef } from 'react';
import { FiSend, FiMic, FiPaperclip } from 'react-icons/fi'; // Feather Icons (leve e elegante)

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false); // <- novo estado para controle
  const recognitionRef = useRef(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Arquivo selecionado:', file);

      // Exemplo: você poderia enviar esse arquivo para o back via FormData:
      /*
      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => console.log('Resposta upload:', data))
        .catch(error => console.error('Erro no upload:', error));
      */
    }
  };

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Seu navegador não suporta reconhecimento de fala.');
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pt-BR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Transcrição:', transcript);
        setInput(transcript); // coloca no input para você poder enviar
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Erro no reconhecimento:', event.error);
      };

      recognitionRef.current.onstart = () => {
        console.log('Reconhecimento começou');
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        console.log('Reconhecimento terminou');
        setIsListening(false);
      };
    }

    // Protege com try/catch para evitar InvalidStateError
    try {
      recognitionRef.current.start();
      console.log('Reconhecimento iniciado');
    } catch (error) {
      if (error.name === 'InvalidStateError') {
        console.warn('Reconhecimento já em execução');
      } else {
        console.error('Erro ao iniciar reconhecimento:', error);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 64px)',
      backgroundColor: '#fff',
      color: '#000',
    }}>
      <div style={{
        flex: '1 1 auto',
        maxHeight: 'calc(100vh - 64px - 220px)',
        overflowY: 'auto',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1rem',
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: 'center',
              marginLeft: msg.sender === 'ai' ? '0' : 'auto',
              marginRight: msg.sender === 'user' ? '0' : 'auto',
              maxWidth: '60%',
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
        borderTop: 'none',
        backgroundColor: '#fff',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
        }}>
          {/* Ícone de anexo */}
          <label
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
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>

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
            onClick={startRecognition}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isListening ? '#f00' : '#000', // vermelho se escutando
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
            title={isListening ? 'Escutando...' : 'Gravar áudio'}
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
