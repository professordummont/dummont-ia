'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSend, FiMic, FiPaperclip } from 'react-icons/fi';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const [conversationContext, setConversationContext] = useState({
    subject: '',
    thematic: '',
    attachment: null
  });

  const [conversationStep, setConversationStep] = useState(0); // controla a etapa da conversa

  // Ao abrir o chat, envia a primeira pergunta do sistema
  useEffect(() => {
    setMessages([
      { sender: 'system', text: 'Olá! Para começarmos, qual matéria você está estudando?' }
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Adiciona a mensagem do usuário
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Controle de etapa: preenche subject, thematic e libera o chat
    if (conversationStep === 0) {
      setConversationContext(prev => ({ ...prev, subject: input }));
      setConversationStep(1);

      // Próxima pergunta vem como mensagem do sistema
      setMessages(prev => [
        ...prev,
        { sender: 'system', text: 'Qual a temática da aula? (se você souber)' }
      ]);

      setInput('');
      return;
    }

    if (conversationStep === 1) {
      setConversationContext(prev => ({ ...prev, thematic: input }));
      setConversationStep(2);

      setMessages(prev => [
        ...prev,
        { sender: 'system', text: 'Deseja enviar fotos de livro ou apostila? (clique no clipe 📎). Se não, digite "Não".' }
      ]);

      setInput('');
      return;
    }

    if (conversationStep === 2) {
      // Se o usuário disser "não", avança para conversa normal
      if (input.toLowerCase() === 'não' || input.toLowerCase() === 'nao') {
        setConversationStep(3);

        setMessages(prev => [
          ...prev,
          { sender: 'system', text: 'Perfeito! Agora você pode fazer sua pergunta ou enviar o que deseja aprender.' }
        ]);
      } else {
        // Se o usuário digitar algo, ainda pode ser tratado como texto
        setMessages(prev => [
          ...prev,
          { sender: 'system', text: 'Foto anexada ou texto recebido. Agora você pode começar a conversar normalmente!' }
        ]);
        setConversationStep(3);
      }

      setInput('');
      return;
    }

    // Conversa normal (enviar para o backend)
    try {
      const payload = {
        message: input,
        subject: conversationContext.subject,
        thematic: conversationContext.thematic,
        attachment: conversationContext.attachment
          ? conversationContext.attachment.name
          : null
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
      console.log('Arquivo selecionado:', file);

      setConversationContext(prev => ({
        ...prev,
        attachment: file
      }));

      // Se ainda está na etapa 2, avança
      if (conversationStep === 2) {
        setConversationStep(3);

        setMessages(prev => [
          ...prev,
          { sender: 'system', text: 'Foto recebida. Agora você pode começar a conversar normalmente!' }
        ]);
      }
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
        setInput(transcript);
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
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '60%',
              fontSize: '1rem',
              lineHeight: '1.6',
              backgroundColor: '#fff',
              color: '#000',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '1px solid #333',
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

          <input
            type="text"
            placeholder="Digite sua resposta..."
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

          <button
            onClick={startRecognition}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isListening ? '#f00' : '#000',
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
