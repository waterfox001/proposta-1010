import React, { useState } from 'react';
import { Search, X, CheckCircle2, XCircle, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';

export const AvailabilityCheckerModal: React.FC = () => {
  const {
    isAvailabilityModalOpen,
    setIsAvailabilityModalOpen,
    products,
    setSelectedProductId
  } = useApp();

  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-15');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'TODAS'>('Cadeirinhas');

  if (!isAvailabilityModalOpen) return null;

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

  const filteredProducts = selectedCategory === 'TODAS'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const availableItems = filteredProducts.filter(p => p.status === 'DISPONIVEL');
  const unavailableItems = filteredProducts.filter(p => p.status !== 'DISPONIVEL');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">Verificador de Disponibilidade & Alternativas</h2>
              <div className="text-xs text-slate-300">
                Consulta cruzada entre estoque, reservas, higienização e manutenções
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsAvailabilityModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Data Inicial Desejada
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-300 rounded-xl outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Data Final Devolução
              </label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-300 rounded-xl outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Categoria do Produto
              </label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value as any)}
                className="w-full p-2 text-xs bg-white border border-slate-300 rounded-xl outline-none font-medium"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 flex items-center justify-between">
            <span>
              Período selecionado: <strong>{startDate}</strong> até <strong>{endDate}</strong>
            </span>
            <span className="font-semibold text-emerald-700">
              {availableItems.length} opções disponíveis na categoria
            </span>
          </div>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Unavailable with alternatives section */}
          {unavailableItems.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>Itens Ocupados no Período ({unavailableItems.length})</span>
              </div>
              <div className="space-y-2">
                {unavailableItems.map(item => (
                  <div
                    key={item.id}
                    className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={item.photoUrl} alt={item.name} className="w-10 h-10 rounded-lg object-cover border" />
                      <div>
                        <div className="font-bold text-rose-950 flex items-center space-x-2">
                          <span className="font-mono bg-rose-200/80 text-rose-900 text-[10px] px-1.5 py-0.5 rounded">
                            {item.code}
                          </span>
                          <span>{item.name}</span>
                          <span className="text-[10px] text-rose-700 font-normal">❌ {item.status}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {item.brand} • Diária R$ {item.dailyRate} • {item.currentCustomerName ? `Com: ${item.currentCustomerName}` : ''}
                        </div>
                      </div>
                    </div>

                    {/* Smart alternative button */}
                    {availableItems.length > 0 && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block">Alternativa disponível:</span>
                        <span className="text-xs font-bold text-emerald-700">
                          {availableItems[0].code} ({availableItems[0].brand})
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available section */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Itens Prontos & 100% Disponíveis ({availableItems.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableItems.map(item => (
                <div
                  key={item.id}
                  className="p-3 bg-emerald-50/40 border border-emerald-200/80 rounded-xl flex items-center justify-between text-xs hover:border-emerald-400 transition-all"
                >
                  <div className="flex items-center space-x-2.5">
                    <img src={item.photoUrl} alt={item.name} className="w-11 h-11 rounded-lg object-cover border" />
                    <div>
                      <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <span className="bg-emerald-600 text-white font-mono text-[9px] px-1 rounded">
                          {item.code}
                        </span>
                        <span className="truncate max-w-[130px]">{item.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-600 mt-0.5">
                        {item.brand} • Diária: R$ {item.dailyRate}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProductId(item.id);
                      setIsAvailabilityModalOpen(false);
                    }}
                    className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs"
                    title="Ver detalhes"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
