import React, { useState } from 'react';
import { SearchCode, Calendar, CheckCircle2, XCircle, ArrowRight, Package, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';

export const AvailabilityView: React.FC = () => {
  const { products, setSelectedProductId, setIsNewRentalModalOpen } = useApp();

  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-15');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'TODAS'>('Cadeirinhas');

  const categories: (ProductCategory | 'TODAS')[] = [
    'TODAS',
    'Cadeirinhas',
    'Bebê-conforto',
    'Carrinhos',
    'Berços',
    'Cercadinhos',
    'Alimentação',
    'Banho',
    'Brinquedos',
    'Acessórios'
  ];

  const filtered = selectedCategory === 'TODAS'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const available = filtered.filter(p => p.status === 'DISPONIVEL');
  const unavailable = filtered.filter(p => p.status !== 'DISPONIVEL');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Verificação Rápida de Disponibilidade</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Simulador e consulta de períodos para atendimento ao cliente e sugestão de substituições automáticas
        </p>
      </div>

      {/* Date & Category Form */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Data de Início da Locação
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium outline-none focus:bg-white focus:border-blue-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Data Prevista de Devolução
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium outline-none focus:bg-white focus:border-blue-600 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Categoria Desejada
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value as any)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl font-medium outline-none focus:bg-white focus:border-blue-600 transition-all"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="text-slate-600">
            Resultado para o período de <strong>{startDate}</strong> a <strong>{endDate}</strong>:
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-emerald-700 font-bold">✓ {available.length} Disponíveis</span>
            <span className="text-rose-600 font-bold">✕ {unavailable.length} Ocupados/Manutenção</span>
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Items */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Itens 100% Disponíveis para o Período</span>
          </div>

          <div className="space-y-2.5">
            {available.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200">
                Nenhum produto livre na categoria para estas datas.
              </div>
            ) : (
              available.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white rounded-2xl border border-emerald-200/80 shadow-xs flex items-center justify-between hover:border-emerald-400 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <img src={item.photoUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover border" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {item.code}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.brand} • Diária: <strong>R$ {item.dailyRate}</strong> • Semanal: R$ {item.weeklyRate}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProductId(item.id);
                      setIsNewRentalModalOpen(true);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Alugar</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Unavailable Items & Suggested Alternatives */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-rose-800 uppercase tracking-wider">
            <XCircle className="w-4 h-4 text-rose-600" />
            <span>Itens Ocupados & Sugestões de Alternativas</span>
          </div>

          <div className="space-y-2.5">
            {unavailable.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200">
                Todos os itens da categoria estão liberados e disponíveis!
              </div>
            ) : (
              unavailable.map(item => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white rounded-2xl border border-rose-200 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {item.code}
                      </span>
                      <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                      {item.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Ocupado atualmente por: <strong>{item.currentCustomerName || 'Em ciclo interno'}</strong>
                  </div>

                  {/* Smart Alternative Box */}
                  {available.length > 0 && (
                    <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="text-[10px] font-bold text-emerald-800 uppercase">
                          Alternativa Sugerida:
                        </div>
                        <div className="font-bold text-slate-900 mt-0.5">
                          {available[0].name} ({available[0].code})
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedProductId(available[0].id)}
                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1"
                      >
                        <span>Ver Opção</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
