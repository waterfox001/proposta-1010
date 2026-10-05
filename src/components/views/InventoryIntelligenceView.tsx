import React, { useState, useEffect } from 'react';
import {
  Package,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Building2,
  DollarSign,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BarChart3,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface InventoryIntelligenceViewProps {
  subTab?: string;
}

export const InventoryIntelligenceView: React.FC<InventoryIntelligenceViewProps> = ({ subTab }) => {
  const { products, setSelectedProductId } = useApp();
  const [activeTab, setActiveTab] = useState<'inteligencia' | 'demanda' | 'compras' | 'fornecedores'>('inteligencia');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'demand_forecast' || subTab === 'demanda') setActiveTab('demanda');
    else if (subTab === 'purchases_restock' || subTab === 'compras') setActiveTab('compras');
    else if (subTab === 'suppliers' || subTab === 'fornecedores') setActiveTab('fornecedores');
    else setActiveTab('inteligencia');
  }, [subTab]);

  const suppliers = [
    { name: 'Burigotto Brasil Indústria', category: 'Cadeirinhas & Banheiras', contact: '(19) 3404-9000', leadTime: '3 dias', rating: '9.8', cnpj: '43.209.112/0001-90' },
    { name: 'Dorel Juvenile Brasil (Maxi-Cosi)', category: 'Cadeirinhas Premium & Carrinhos', contact: '(24) 2244-7700', leadTime: '5 dias', rating: '9.9', cnpj: '10.554.890/0001-33' },
    { name: 'Artsana Brasil (Chicco)', category: 'Berços & Cadeirinhas', contact: '(11) 2246-2000', leadTime: '4 dias', rating: '9.7', cnpj: '08.771.234/0001-12' },
    { name: 'Distribuidora Kids & Peças SP', category: 'Peças de Reposição & Travas', contact: '(11) 3321-4455', leadTime: '24h', rating: '9.5', cnpj: '21.443.901/0001-55' }
  ];

  const restockSuggestions = [
    { code: 'SUG-01', item: 'Carrinho YOYO² Ultracompacto Black', category: 'Carrinhos', reason: 'Taxa de ocupação de 84% e fila de espera para novembro', qtd: 2, estimatedCost: 6800, roiEstimado: '3.2 meses' },
    { code: 'SUG-02', item: 'Cadeirinha 360° Isofix Unico Plus', category: 'Cadeirinhas', reason: 'Alta rentabilidade com retorno do investimento em 4 locações', qtd: 3, estimatedCost: 4950, roiEstimado: '2.8 meses' },
    { code: 'SUG-03', item: 'Berço Acoplável Next2Me Magic', category: 'Berços', reason: 'Busca frequente por mães recém-parturientes para uso mensal', qtd: 2, estimatedCost: 3780, roiEstimado: '3.5 meses' }
  ];

  const demandForecast = [
    { period: 'Novembro 2026 (Feriados)', expectedDemand: '+35% Carrinhos Compactos de Viagem', action: 'Garantir 4 unidades adicionais no estoque' },
    { period: 'Dezembro 2026 (Férias Escolares)', expectedDemand: '+50% Cadeirinhas de Viagem & Bebê-Conforto', action: 'Bloquear manutenções não-urgentes' },
    { period: 'Janeiro 2027 (Praia & Resorts)', expectedDemand: '+65% Carrinhos YOYO, Berços Portáteis e Banheiras', action: 'Abrir pré-reservas antecipadas com sinal 50%' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Inteligência de Estoque, Demanda & Reposição</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Previsão de compras, fornecedores homologados e rentabilidade sobre o capital investido em ativos
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('inteligencia')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'inteligencia' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Inteligência
          </button>
          <button
            onClick={() => setActiveTab('demanda')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'demanda' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Previsão & Demanda
          </button>
          <button
            onClick={() => setActiveTab('compras')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'compras' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sugestões de Compra
          </button>
          <button
            onClick={() => setActiveTab('fornecedores')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === 'fornecedores' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Fornecedores
          </button>
        </div>
      </div>

      {/* Suggested Restock Orders */}
      {(activeTab === 'inteligencia' || activeTab === 'compras') && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Sugestões de Compras & Reposição Baseadas em Demanda
              </h3>
            </div>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
              Algoritmo Preditivo de Alta Temporada
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {restockSuggestions.map((sug, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs flex flex-col justify-between">
                <div>
                  <span className="font-mono bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                    {sug.category}
                  </span>
                  <h4 className="font-bold text-slate-900 mt-1">{sug.item}</h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">{sug.reason}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Investimento Estimado</span>
                    <strong className="text-slate-900 font-mono">R$ {sug.estimatedCost.toLocaleString('pt-BR')},00</strong>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    ROI: {sug.roiEstimado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demand Forecast Section */}
      {(activeTab === 'inteligencia' || activeTab === 'demanda') && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Previsão de Picos Sazonais de Demanda (Q4 2026 / Q1 2027)
            </h3>
          </div>

          <div className="space-y-3">
            {demandForecast.map((df, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-900 flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{df.period}</span>
                  </div>
                  <div className="text-blue-700 font-semibold mt-0.5">{df.expectedDemand}</div>
                </div>
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-[11px] font-medium">
                  {df.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Homologated Suppliers */}
      {(activeTab === 'inteligencia' || activeTab === 'fornecedores') && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Fornecedores Homologados & Lead Time
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Fornecedor</th>
                  <th className="py-2.5 px-3">Linha de Produtos</th>
                  <th className="py-2.5 px-3">Lead Time Médio</th>
                  <th className="py-2.5 px-3">Contato Comercial</th>
                  <th className="py-2.5 px-3">Score Fornecedor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suppliers.map((sup, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{sup.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">CNPJ: {sup.cnpj}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{sup.category}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{sup.leadTime}</td>
                    <td className="py-3 px-3 text-slate-600">{sup.contact}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                        ★ {sup.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
