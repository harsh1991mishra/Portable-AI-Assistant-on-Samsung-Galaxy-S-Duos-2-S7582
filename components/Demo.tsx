
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { generateAiResponse, generateSpeech } from '../services/gemini';

const Demo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello Harsh! Baba is here to help you. What shall we do today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const playAudio = async (base64Data: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    const audioData = decode(base64Data);
    
    const dataInt16 = new Int16Array(audioData.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateAiResponse(textToSend);
    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);

    const speechData = await generateSpeech(responseText);
    if (speechData) {
      playAudio(speechData);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported. Try using Chrome or Kiwi Browser!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[750px] glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
      {/* Device Status Bar Mockup */}
      <div className="bg-black/60 px-6 py-2 flex justify-between items-center text-[10px] text-orange-400 font-mono border-b border-white/5">
        <div className="flex gap-3">
          <span>BABA TERMINAL</span>
          <span className="text-gray-600">|</span>
          <span>S7582</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-gray-500 text-[8px]">CORE CONNECTED</span>
          <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] animate-pulse"></div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-gradient-to-b from-transparent to-orange-900/5"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[85%] p-5 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-orange-600 text-white rounded-br-none shadow-xl shadow-orange-600/20' 
                : 'bg-white/5 text-gray-200 rounded-bl-none border border-white/10 backdrop-blur-sm'
            }`}>
              <p className="text-sm leading-relaxed tracking-wide">{msg.text}</p>
              <div className="flex justify-between items-center mt-3 opacity-40">
                <span className="text-[10px]">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {msg.role === 'model' && <span className="text-[10px]">Baba Logic v1.0</span>}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 px-5 py-4 rounded-full flex gap-2 border border-white/5">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="flex gap-3 items-center">
          <button 
            onClick={startListening}
            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all shadow-lg ${
              isListening 
                ? 'bg-red-500 animate-pulse scale-110 shadow-red-500/20' 
                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-2xl'
            }`}
          >
            {isListening ? '🛑' : '🎙️'}
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Baba is listening..." : "Say something..."}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-orange-500/50 transition-all text-sm placeholder:text-gray-600"
            />
          </div>

          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-14 h-14 flex items-center justify-center bg-orange-600 hover:bg-orange-500 disabled:opacity-30 disabled:grayscale rounded-2xl transition-all shadow-lg shadow-orange-600/20"
          >
            <span className="text-xl">⤴️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
