
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, GroundingSource } from '../types';
import { generateAiResponse, generateSpeech } from '../services/gemini';

const Demo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello Harsh! Baba is active and linked to the Telegram Bot. How can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [remoteCommand, setRemoteCommand] = useState<string | null>(null);
  const [diagStats, setDiagStats] = useState({ ram: '412MB', cpu: '12%', temp: '34°C' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    
    // Mocking a remote command arriving from the Telegram Bot
    const timer = setTimeout(() => {
      setRemoteCommand("Telegram Bot Ping...");
      setTimeout(() => setRemoteCommand(null), 3000);
    }, 10000);

    const interval = setInterval(() => {
      setDiagStats({
        ram: `${Math.floor(410 + Math.random() * 20)}MB`,
        cpu: `${Math.floor(10 + Math.random() * 15)}%`,
        temp: `${Math.floor(34 + Math.random() * 4)}°C`
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
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

    const { text, sources } = await generateAiResponse(textToSend);
    const modelMsg: ChatMessage = { role: 'model', text, sources, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);

    const speechData = await generateSpeech(text);
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
    recognition.onresult = (event: any) => handleSend(event.results[0][0].transcript);
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[780px] glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
      {/* Remote Command Indicator */}
      {remoteCommand && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-orange-600 text-[10px] px-4 py-1 rounded-full border border-orange-400 font-bold tracking-widest uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            {remoteCommand}
          </div>
        </div>
      )}

      {/* Device Status Header */}
      <div className="bg-black/80 px-6 py-3 flex justify-between items-center text-[10px] border-b border-white/5 z-10">
        <div className="flex gap-4 mono text-orange-500/80">
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-500 uppercase">Model</span>
            <span>SAMSUNG-S7582</span>
          </div>
          <div className="flex flex-col border-l border-white/10 pl-4">
            <span className="text-[8px] text-gray-500 uppercase">Net Link</span>
            <span className="text-blue-400">TELEGRAM_UP</span>
          </div>
          <div className="hidden sm:flex flex-col border-l border-white/10 pl-4">
            <span className="text-[8px] text-gray-500 uppercase">Temp</span>
            <span>{diagStats.temp}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[8px] text-gray-500 uppercase">Signal</span>
            <span className="mono text-green-500">OPTIMAL</span>
          </div>
          <div className={`w-3 h-3 rounded-full bg-orange-500 ${isLoading ? 'animate-ping' : 'shadow-[0_0_8px_rgba(249,115,22,0.6)]'}`}></div>
        </div>
      </div>

      {/* Chat Messages */}
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
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              
              {msg.sources && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Research Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] px-2 py-1 bg-white/5 hover:bg-white/10 rounded-md text-orange-400 border border-white/5 transition-colors"
                      >
                        🔗 {source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-3 opacity-30">
                <span className="text-[9px] mono uppercase">
                  {msg.role === 'user' ? 'Local Terminal' : 'Baba Brain'}
                </span>
                <span className="text-[9px]">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 px-5 py-4 rounded-3xl flex gap-2 border border-white/5 items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <span className="text-[10px] text-gray-500 ml-2 mono uppercase tracking-widest">Baba processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-6 bg-black/60 backdrop-blur-2xl border-t border-white/10">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening..." : "Message Baba..."}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-6 pr-14 py-4 focus:outline-none focus:border-orange-500/50 transition-all text-sm placeholder:text-gray-600 text-white"
            />
            <button 
              onClick={startListening}
              className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                isListening 
                  ? 'bg-red-500 animate-pulse text-white shadow-lg shadow-red-500/50' 
                  : 'text-gray-400 hover:text-orange-400 hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{isListening ? '🛑' : '🎙️'}</span>
            </button>
          </div>

          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-14 h-14 flex items-center justify-center bg-orange-600 hover:bg-orange-500 disabled:opacity-30 rounded-2xl transition-all shadow-xl shadow-orange-600/30 active:scale-95 flex-shrink-0"
          >
            <span className="text-xl">⤴️</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
