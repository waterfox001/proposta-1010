import React, { useState } from 'react';
import {
  Zap,
  Clock,
  MessageCircle,
  Bell,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface AutomationsViewProps {
  subTab?: string;
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({ subTab }) => {
  const [rules, setRules] = useState([
    {
      id: 'aut-1',
      title: 'Disparo de Confirmação de Reserva via WhatsApp',
      trigger: 'Quando reserva mudar para "PAGO / CONFIRMADA"',
      action: 'Enviar WhatsApp com checklist de viagem e comprovante eletrônico',
      channel: 'WhatsApp API',
      active: true
    },
    {
      id: 'aut-2',
      title: 'Lembrete Preventivo de Devolução (24h Antes)',
      trigger: '24 horas antes do término da locação ativa',
      action: 'Notificar cliente sobre a janela de coleta e opção de renovação de diária',
      channel: 'WhatsApp & SMS',
      active: true
    },
    {
      id: 'aut-3',
      title: 'Alerta Automático de Devolução Atrasada',
      trigger: 'Prazo de retorno vencido em 60 minutos',
      action: 'Mudar status do produto para ATRASADO e emitir alerta crítico no painel',
      channel: 'Painel & WhatsApp',
      active: true
    },
    {
      id: 'aut-4',
      title: 'Roteamento Imediato de Produto Devolvido para Higienização',
      trigger: 'Quando motorista registrar devolução no app',
      action: 'Mudar status para "EM HIGIENIZAÇÃO" e alocar técnico da bancada',
      channel: 'Estoque / ERP',
      active: true
    },
    {
      id: 'aut-5',
      title: 'Pesquisa de Satisfação & NPS Pós-Devolução',
      trigger: '4 horas após a conferência sem avarias e devolução da caução',
      action: 'Enviar link de avaliação com 1 clique (NPS 0 a 10)',
      channel: 'WhatsApp',
      active: true
    }
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Automações, Triggers & Regras de Negócio</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gatilhos automáticos para cobranças, lembretes de devolução, alertas de atraso e pesquisa de satisfação
          </p>
        </div>

        <button className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition-all self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>+ Criar Nova Regra de Automação</span>
        </button>
      </div>

      {/* Rules List */}
      <div className="space-y-3">
        {rules.map(rule => (
          <div
            key={rule.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-400 transition-all"
          >
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-xs text-slate-900">{rule.title}</h3>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {rule.channel}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-0.5 pl-8">
                <div>Gatilho: <strong className="text-slate-800">{rule.trigger}</strong></div>
                <div>Ação executada: <span className="text-slate-700">{rule.action}</span></div>
              </div>
            </div>

            <div className="flex items-center space-x-3 self-end sm:self-center shrink-0">
              <span className={`text-xs font-bold ${rule.active ? 'text-emerald-700' : 'text-slate-400'}`}>
                {rule.active ? 'Ativa' : 'Pausada'}
              </span>
              <button onClick={() => toggleRule(rule.id)} className="text-slate-700">
                {rule.active ? (
                  <ToggleRight className="w-8 h-8 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-300" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
