'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiPaperclip } from 'react-icons/fi';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const endRef = useRef(null);

  const [conversationContext, setConversationContext] = useState({
    subject: '',
    thematic: '',
    attachment: null
  });

  const [conversationStep, setConversationStep] = useState(0);

  useEffect(() => {
    setMessages([{ sender: 'system', text: 'Olá! Para começarmos, qual matéria você está estudando?' }]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    if (conversationStep === 0) {
      setConversationContext(prev => ({ ...prev, subject: input }));
      setConversationStep(1);
      setMessages(prev => [...prev, { sender: 'system', text: 'Qual a temática da aula? (se você souber)' }]);
      setInput('');
      return;
    }

    if (conversationStep === 1) {
      setConversationContext(prev => ({ ...prev, thematic: input }));
      setConversationStep(2);
      setMessages(prev => [...prev, { sender: 'system', text: 'Deseja enviar fotos de livro ou apostila? (clique no clipe 📎). Se não, digite "Não".' }]);
      setInput('');
      return;
    }

    if (conversationStep === 2) {
      if (input.toLowerCase() === 'não' || input.toLowerCase() === 'nao') {
        setConversationStep(3);
        setMessages(prev => [...prev, { sender: 'system', text: 'Perfeito! Agora você pode fazer sua pergunta ou enviar o que deseja aprender.' }]);
      } else {
        setMessages(prev => [...prev, { sender: 'system', text: 'Foto anexada ou texto recebido. Agora você pode começar a conversar normalmente!' }]);
        setConversationStep(3);
      }
      setInput('');
      return;
    }

    try {
      const payload = {
        message: input,
        subject: conversationContext.subject,
        thematic: conversationContext.thematic,
        attachment: conversationContext.attachment?.name || null
      };

      const response = await fetch('http://localhost:8000/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
      setConversationContext(prev => ({ ...prev, attachment: file }));
      if (conversationStep === 2) {
        setConversationStep(3);
        setMessages(prev => [...prev, { sender: 'system', text: 'Foto recebida. Agora você pode começar a conversar normalmente!' }]);
      }
    }
  };

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Seu navegador não suporta reconhecimento de fala.');

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pt-BR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event) => console.error('Erro no reconhecimento:', event.error);
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
    }

    try {
      recognitionRef.current.start();
    } catch (error) {
      if (error.name !== 'InvalidStateError') console.error('Erro ao iniciar reconhecimento:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#f9f9f9',
      fontFamily: 'Inter, sans-serif',
      position: 'relative'
    }}>
      <div style={{
        flex: 1,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '1rem',
        overflowY: 'auto'
      }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '60%',
              fontSize: '1rem',
              background: msg.sender === 'user' ? '#000' : '#fff',
              color: msg.sender === 'user' ? '#fff' : '#000',
              padding: '0.85rem 1.25rem',
              borderRadius: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              border: msg.sender === 'user' ? 'none' : '1px solid #ccc',
              lineHeight: '1.5'
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div style={{
        padding: '1rem',
        borderTop: '1px solid #eaeaea',
        backgroundColor: '#f9f9f9',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          background: '#fff',
          border: '1px solid #ddd',
          borderRadius: '12px',
          padding: '0.75rem 1rem'
        }}>
          <label style={{
            backgroundColor: '#000',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginRight: '0.75rem'
          }}>
            <FiPaperclip size={20} color="#fff" />
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
          </label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            style={{
              flex: 1,
              fontSize: '1rem',
              padding: '0.85rem 1rem',
              border: 'none',
              outline: 'none',
              background: '#f5f5f5',
              borderRadius: '8px'
            }}
          />

          <button
            onClick={startRecognition}
            title={isListening ? 'Escutando...' : 'Gravar áudio'}
            style={{
              marginLeft: '0.75rem',
              background: isListening ? '#e74c3c' : '#000',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FiMic size={20} color="#fff" />
          </button>

          <button
            onClick={handleSend}
            title="Enviar"
            style={{
              marginLeft: '0.5rem',
              background: '#000',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FiSend size={20} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
}
