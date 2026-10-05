import React, { useState } from 'react';
import {
  Target,
  Award,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  ShieldCheck,
  Building,
  Plus
} from 'lucide-react';

interface OkrsGoalsViewProps {
  subTab?: string;
}

export const OkrsGoalsView: React.FC<OkrsGoalsViewProps> = ({ subTab }) => {
  const [filterPeriod, setFilterPeriod] = useState<'Q4-2026' | 'Mensal' | 'Anual'>('Q4-2026');

  const healthScores = [
    { area: 'Financeiro', score: 92, status: 'Excelente', color: 'bg-emerald-500' },
    { area: 'Comercial', score: 86, status: 'Em Meta', color: 'bg-blue-600' },
    { area: 'Operação', score: 89, status: 'Muito Bom', color: 'bg-emerald-500' },
    { area: 'Estoque', score: 78, status: 'Atenção (Ocupação)', color: 'bg-amber-500' },
    { area: 'Clientes & NPS', score: 94, status: 'Excelente (NPS 88)', color: 'bg-emerald-500' },
    { area: 'Equipe', score: 90, status: 'Alinhado', color: 'bg-blue-600' }
  ];

  const okrs = [
    {
      id: 'okr-1',
      objective: 'Atingir R$ 120.000 de Faturamento no Q4 2026 com 80% de Margem',
      owner: 'Diretoria Executiva',
      team: 'Financeiro & Comercial',
      progress: 74,
      status: 'Em andamento',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
      keyResults: [
        { title: 'Fechar outubro com faturamento superior a R$ 40.000', current: 'R$ 38.940', target: 'R$ 40.000', progress: 97 },
        { title: 'Manter taxa de inadimplência abaixo de 1.5%', current: '0.8%', target: '< 1.5%', progress: 100 },
        { title: 'Expandir o ticket médio para R$ 350', current: 'R$ 342', target: 'R$ 350', progress: 97 }
      ]
    },
    {
      id: 'okr-2',
      objective: 'Reduzir o Tempo de Giro da Higienização e Disponibilidade para < 3h',
      owner: 'Roberto Técnico',
      team: 'Operação & Galpão',
      progress: 82,
      status: 'Em andamento',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
      keyResults: [
        { title: 'Digitalizar o checklist de devolução no momento da coleta', current: '98%', target: '100%', progress: 98 },
        { title: 'Instalar segunda câmara de vapor pressurizado', current: 'Concluído', target: '100%', progress: 100 },
        { title: 'Reduzir produtos em manutenção por falta de peças para zero', current: '1 pendente', target: '0 pendente', progress: 70 }
      ]
    },
    {
      id: 'okr-3',
      objective: 'Fidelização de Clientes e Aumento da Recorrência para 50%',
      owner: 'Aline Souza',
      team: 'Atendimento & CRM',
      progress: 68,
      status: 'Em risco',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      keyResults: [
        { title: 'Alcançar 45% das locações provenientes de clientes recorrentes', current: '41%', target: '45%', progress: 85 },
        { title: 'Implementar programa de pontos para locações acima de 7 dias', current: 'Em piloto', target: 'Ativo', progress: 60 },
        { title: 'Manter NPS acima de 85 pontos nas pesquisas pós-devolução', current: 'NPS 88', target: 'NPS 85', progress: 100 }
      ]
    },
    {
      id: 'okr-4',
      objective: 'Renovação e Otimização do Acervo: Zero Itens Ociosos > 60 dias',
      owner: 'Ricardo Silveira',
      team: 'Estoque & Compras',
      progress: 54,
      status: 'Em risco',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      keyResults: [
        { title: 'Liquidar ou remanejar 100% dos itens parados há mais de 90 dias', current: '1 de 2', target: '2', progress: 50 },
        { title: 'Adquirir 6 novos carrinhos ultracompactos para a alta temporada', current: '4 adquiridos', target: '6', progress: 66 },
        { title: 'Elevar a taxa de ocupação média global do estoque para 82%', current: '78.4%', target: '82%', progress: 75 }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Metas & OKRs Empresariais</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestão de objetivos estratégicos, Key Results mensuráveis e saúde dos departamentos
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {(['Q4-2026', 'Mensal', 'Anual'] as const).map(p => (
              <button
                key={p}
                onClick={() => setFilterPeriod(p)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterPeriod === p ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Novo OKR</span>
          </button>
        </div>
      </div>

      {/* Saúde da Empresa (Scores 0 a 100) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Índice de Saúde Global da Empresa (Score: 88.2 / 100)
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            Nível: Alta Performance
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {healthScores.map(h => (
            <div key={h.area} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">{h.area}</span>
                <span className="font-extrabold text-slate-900">{h.score}</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full ${h.color} rounded-full`} style={{ width: `${h.score}%` }} />
              </div>
              <span className="text-[10px] text-slate-500 block truncate">{h.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* OKRs List */}
      <div className="space-y-4">
        {okrs.map(okr => (
          <div key={okr.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                    {okr.team}
                  </span>
                  <span className="text-xs text-slate-400">Responsável: <strong>{okr.owner}</strong></span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mt-1">{okr.objective}</h3>
              </div>

              <div className="flex items-center space-x-3 self-start sm:self-auto">
                <div className="text-right">
                  <span className="text-xs font-black text-slate-900">{okr.progress}%</span>
                  <span className="text-[10px] text-slate-400 block">Progresso</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${okr.statusColor}`}>
                  {okr.status}
                </span>
              </div>
            </div>

            {/* Key Results */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Resultados-Chave (Key Results)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {okr.keyResults.map((kr, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <p className="text-slate-800 font-medium leading-snug">{kr.title}</p>
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>Atual: <strong>{kr.current}</strong></span>
                      <span>Meta: <strong>{kr.target}</strong></span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min(kr.progress, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
