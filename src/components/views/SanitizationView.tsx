import React from 'react';
import { Sparkles, CheckCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SanitizationView: React.FC = () => {
  const { sanitizations, completeSanitization, setSelectedProductId, setCurrentView } = useApp();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Centro de Higienização & Esterilização</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Processo rigoroso de lavagem a vapor 140°C e desinfecção hospitalar com quaternário de amônio de 5ª geração
          </p>
        </div>
      </div>

      {/* Sanitization Queue */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sanitizations.map(item => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              item.status === 'concluido'
                ? 'bg-slate-50 border-slate-200 opacity-80'
                : 'bg-white border-teal-200 shadow-xs hover:border-teal-400'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="font-mono bg-teal-900 text-teal-100 text-xs font-bold px-2 py-0.5 rounded-lg">
                  {item.productCode}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'concluido'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.status === 'em_andamento'
                      ? 'bg-teal-100 text-teal-800 animate-pulse'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {item.status === 'concluido' ? 'Concluído & Liberado' : item.status === 'em_andamento' ? 'Em Higienização' : 'Aguardando Início'}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-xs text-slate-900 leading-tight">{item.productName}</h3>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Retornado em: <strong>{item.returnDate}</strong> • Responsável: {item.responsibleStaff}
                </div>
              </div>

              <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 space-y-1 text-xs">
                <div className="text-[10px] font-bold text-teal-900 uppercase">Protocolo Químico / Vapor:</div>
                <div className="text-[11px] text-teal-950">{item.chemicalUsed}</div>
              </div>

              {item.notes && (
                <div className="text-[11px] text-slate-600 italic">
                  "{item.notes}"
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedProductId(item.productId);
                  setCurrentView('inventory');
                }}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                Ver no Estoque
              </button>

              {item.status !== 'concluido' ? (
                <button
                  onClick={() => completeSanitization(item.id)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Liberar para Disponível</span>
                </button>
              ) : (
                <span className="text-[11px] text-emerald-700 font-bold flex items-center space-x-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Pronto no Estoque</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
