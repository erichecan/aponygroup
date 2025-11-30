import React, { useState, useEffect, useRef } from 'react';
import { Send, Trash2, X, MessageSquareText, Sparkles, Minus } from 'lucide-react';
import { Language, Message, Role, STRINGS } from '../types';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage } from './ChatMessage';

interface ChatWidgetProps {
  language: Language;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const t = STRINGS[language];

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleClear = () => {
    setMessages([]);
    setInput('');
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: input.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botMessageId = (Date.now() + 1).toString();
    let currentBotContent = "";
    
    setMessages(prev => [...prev, {
      id: botMessageId,
      role: Role.MODEL,
      content: "",
      timestamp: Date.now()
    }]);

    try {
      await streamGeminiResponse(
        userMessage.content,
        messages,
        language,
        (chunk) => {
          currentBotContent += chunk;
          setMessages(prev => prev.map(msg => 
            msg.id === botMessageId ? { ...msg, content: currentBotContent } : msg
          ));
        }
      );
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { ...msg, content: t.errorGeneric, isError: true } 
          : msg
      ));
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div className={`
        mb-4 w-[350px] md:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 origin-bottom-right pointer-events-auto
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 h-[500px]' : 'opacity-0 scale-95 translate-y-10 h-0'}
      `}>
        {/* Header */}
        <div className="bg-black p-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#FF6B35] rounded-lg">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{t.chatTitle}</h3>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                {t.chatSubtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={handleClear} 
              className="p-2 hover:bg-[#1a1a1a] rounded-lg text-slate-300 transition-colors"
              title={t.clear}
            >
              <Trash2 size={16} />
            </button>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-[#1a1a1a] rounded-lg text-white transition-colors"
            >
              <Minus size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-[#FF6B35] mb-3">
                 <MessageSquareText size={24} />
               </div>
               <p className="font-medium text-slate-800">{t.welcomeTitle}</p>
               <p className="text-sm text-slate-500 mt-1">{t.welcomeText}</p>
            </div>
          ) : (
            messages.map(msg => <ChatMessage key={msg.id} message={msg} />)
          )}
          {isLoading && !messages[messages.length - 1]?.content && (
            <div className="flex items-center gap-2 text-xs text-slate-400 ml-2">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
          <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 focus-within:border-[#FF6B35] focus-within:ring-1 focus-within:ring-orange-100 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              rows={1}
              className="w-full bg-transparent border-none focus:ring-0 text-sm text-slate-800 placeholder-slate-400 resize-none py-2.5 px-2 max-h-24"
            />
            <button
              onClick={() => handleSubmit()}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E55A2B] disabled:opacity-50 disabled:hover:bg-[#FF6B35] transition-all shadow-sm"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          group flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 pointer-events-auto
          ${isOpen ? 'bg-black rotate-90' : 'bg-[#FF6B35] hover:bg-[#E55A2B] hover:-translate-y-1'}
        `}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageSquareText size={26} className="text-white" />
        )}
      </button>
    </div>
  );
};