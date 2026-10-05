import React from 'react';
import {
  Layers,
  ArrowRight,
  Package,
  Sparkles,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Wrench
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OperationalHubView: React.FC = () => {
  const { setSelectedProductId } = useApp();

  const lifecycleStages = [
    { id: '1_reserva', name: '1. Reserva Criada', count: 4, color: 'border-blue-400 bg-blue-50/50', items: [{ code: 'BC-006', name: 'Bebê Conforto Aton S2', client: 'Ana Beatriz' }] },
    { id: '2_separacao', name: '2. Separação Doca', count: 3, color: 'border-indigo-400 bg-indigo-50/50', items: [{ code: 'CB-019', name: 'Carrinho Priam Lux', client: 'Gabriel Siqueira' }] },
    { id: '3_conferencia_saida', name: '3. Checagem Acessórios', count: 2, color: 'border-purple-400 bg-purple-50/50', items: [{ code: 'BP-020', name: 'Berço Next2Me Magic', client: 'Fernanda Diniz' }] },
    { id: '4_higienizacao_prep', name: '4. Esterilização Final', count: 3, color: 'border-teal-400 bg-teal-50/50', items: [{ code: 'CC-025', name: 'Cadeirinha Matrix K', client: 'Revisão Saída' }] },
    { id: '5_preparacao', name: '5. Pronto p/ Embarque', count: 5, color: 'border-emerald-400 bg-emerald-50/50', items: [{ code: 'BN-007', name: 'Banheira Flexi Bath XL', client: 'Carregamento 13:00' }] },
    { id: '6_entrega', name: '6. Em Rota Entrega', count: 4, color: 'border-blue-600 bg-blue-50/70', items: [{ code: 'CC-024', name: 'Cadeirinha Burigotto', client: 'Mariana Costa' }] },
    { id: '7_locacao_ativa', name: '7. Locação Ativa', count: 47, color: 'border-blue-700 bg-blue-100/50', items: [{ code: 'CB-014', name: 'Carrinho YOYO²', client: 'Lucas Ferreira' }] },
    { id: '8_coleta', name: '8. Rota de Coleta', count: 3, color: 'border-amber-400 bg-amber-50/50', items: [{ code: 'BN-003', name: 'Banheira Splash', client: 'Renata Vasconcellos' }] },
    { id: '9_devolucao', name: '9. Devolução Recebida', count: 2, color: 'border-orange-400 bg-orange-50/50', items: [{ code: 'CB-027', name: 'Carrinho Liteway', client: 'Doca de Triagem' }] },
    { id: '10_conferencia_volta', name: '10. Check Avarias & Caução', count: 2, color: 'border-rose-400 bg-rose-50/50', items: [{ code: 'BP-012', name: 'Berço Pack n Play', client: 'Vistoria Danos' }] },
    { id: '11_higienizacao_retorno', name: '11. Lavagem a Vapor', count: 4, color: 'border-teal-500 bg-teal-50/60', items: [{ code: 'CC-009', name: 'Cadeirinha Cosco', client: 'Carlos Higiene' }] },
    { id: '12_disponivel', name: '12. Disponível no Estoque', count: 86, color: 'border-emerald-600 bg-emerald-50/70', items: [{ code: 'BQ-008', name: 'MamaRoo 4.0 Bluetooth', client: 'Prateleira H-01' }] }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Central Operacional • Ciclo Completo de Locação</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Esteira de 12 etapas conectadas: desde a reserva, conferência, esterilização, entrega, devolução até a liberação final de estoque
        </p>
      </div>

      {/* Process Flow Ribbon */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-md overflow-x-auto text-xs">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
          <span className="text-blue-400">Reserva</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-300">Separação</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-300">Conferência</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-teal-400">Higienização Pré</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-blue-400">Entrega</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-400">Locação Ativa</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-amber-400">Coleta</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-rose-400">Vistoria Pós</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-teal-400">Vapor 140°C</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-300">Disponível Novamente</span>
        </div>
      </div>

      {/* 12-Step Horizontal Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3.5 min-w-[2000px]">
          {lifecycleStages.map(stage => (
            <div
              key={stage.id}
              className={`w-52 rounded-2xl border-2 p-3 ${stage.color} shrink-0 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 mb-2">
                  <h3 className="font-extrabold text-[11px] text-slate-900 truncate">{stage.name}</h3>
                  <span className="text-[10px] bg-white font-mono font-bold px-1.5 py-0.5 rounded shadow-2xs">
                    {stage.count}
                  </span>
                </div>

                <div className="space-y-2">
                  {stage.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold bg-slate-900 text-white px-1.5 py-0.2 rounded">
                          {item.code}
                        </span>
                      </div>
                      <div className="font-bold text-slate-800 text-[11px] leading-tight truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{item.client}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 text-center font-medium">
                Monitorado em tempo real
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
