import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Loader2, Lightbulb } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { askOperationalAI, AIChatMessage } from '../../services/geminiService';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const { products, rentals, reservations, financialTransactions } = useApp();

  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Olá! Sou o assistente operacional inteligente. Posso analisar em tempo real faturamento, estoques ociosos, locações em atraso e prever disponibilidades.',
      timestamp: 'Hoje'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const totalProducts = products.length;
  const occupiedProducts = products.filter(p => p.status === 'ALUGADO' || p.status === 'RESERVADO').length;
  const occupancyRate = totalProducts > 0 ? Math.round((occupiedProducts / totalProducts) * 100) : 0;
  const delayedCount = rentals.filter(r => r.status === 'atrasada').length;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askOperationalAI(textToSend, {
        products,
        rentals,
        reservations,
        financial: financialTransactions,
        delayedCount,
        occupancyRate
      });

      const assistantMsg: AIChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      const errorMsg: AIChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Desculpe, ocorreu um erro ao analisar os dados. Por favor tente novamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'Quais produtos mais faturaram este mês?',
    'Quais estão parados há mais de 30 dias?',
    'Quanto tenho para receber?',
    'Quais locações estão atrasadas?',
    'Quantas cadeirinhas estão disponíveis hoje?'
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-indigo-500/30 rounded-xl border border-indigo-400/30">
            <Sparkles className="w-5 h-5 text-indigo-300 animate-pulse" />
          </div>
          <div>
            <div className="font-extrabold text-sm flex items-center space-x-1.5">
              <span>Assistente Operacional AI</span>
              <span className="text-[10px] bg-indigo-400/20 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-400/30">
                Gemini 3.8
              </span>
            </div>
            <div className="text-[11px] text-slate-300">Inteligência Operacional em Tempo Real</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 font-bold mb-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Consultas rápidas:</span>
        </div>
        <div className="flex gap-1.5 whitespace-nowrap overflow-x-auto pb-1">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-2.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200 rounded-lg transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2 ${
              msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-xs'
                  : 'bg-slate-100 text-slate-800 rounded-tl-xs whitespace-pre-wrap'
              }`}
            >
              {msg.text}
              <div
                className={`text-[9px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-xs text-indigo-600 font-medium p-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Assistente AI cruzando dados de estoque e locações...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-slate-200 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Pergunte sobre produtos, atrasos, faturamento..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl shadow-md transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
