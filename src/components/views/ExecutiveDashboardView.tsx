import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Target,
  Users,
  CalendarCheck,
  CalendarDays,
  Percent,
  Clock,
  Truck,
  RotateCcw,
  Wrench,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  ShieldCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const ExecutiveDashboardView: React.FC = () => {
  const { setCurrentView } = useApp();

  const monthlyGoal = 45000;
  const currentRevenue = 38940;
  const estimatedProfit = 31850;
  const goalProgress = Math.round((currentRevenue / monthlyGoal) * 100);

  const revenueHistory = [
    { mes: 'Mai', receita: 24500, lucro: 19800 },
    { mes: 'Jun', receita: 27800, lucro: 22600 },
    { mes: 'Jul', receita: 33400, lucro: 27200 },
    { mes: 'Ago', receita: 31200, lucro: 25400 },
    { mes: 'Set', receita: 36100, lucro: 29500 },
    { mes: 'Out (Atual)', receita: 38940, lucro: 31850 }
  ];

  const occupancyByCategory = [
    { name: 'Carrinhos', ocupacao: 84 },
    { name: 'Cadeirinhas', ocupacao: 79 },
    { name: 'Berços', ocupacao: 72 },
    { name: 'Bebê-Conforto', ocupacao: 68 },
    { name: 'Alimentação', ocupacao: 61 },
    { name: 'Brinquedos', ocupacao: 55 }
  ];

  const revenueDistribution = [
    { name: 'Locações Diárias/Semanais', value: 24200, color: '#2563EB' },
    { name: 'Pacotes Mensais', value: 9800, color: '#3B82F6' },
    { name: 'Taxas de Logística', value: 3240, color: '#10B981' },
    { name: 'Extensões de Período', value: 1700, color: '#F59E0B' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Executive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0a192f] via-slate-900 to-blue-950 text-white p-6 rounded-2xl shadow-md border border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Visão da Diretoria Executiva • ERP Kids</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">Dashboard Executivo</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Acompanhamento macro de faturamento, margens líquidas, atingimento de metas e ritmo de expansão do acervo.
          </p>
        </div>

        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 text-right">
            <div className="text-[10px] uppercase text-blue-300 font-bold">Meta Outubro 2026</div>
            <div className="text-lg font-black text-white">R$ 45.000</div>
          </div>
          <div className="bg-emerald-500/20 px-4 py-2.5 rounded-xl border border-emerald-400/30 text-right">
            <div className="text-[10px] uppercase text-emerald-300 font-bold">% Atingida</div>
            <div className="text-lg font-black text-emerald-400">{goalProgress}%</div>
          </div>
        </div>
      </div>

      {/* Main Financial & Growth Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Faturamento Outubro</span>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            R$ {currentRevenue.toLocaleString('pt-BR')}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center space-x-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% vs mês anterior</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Lucro Líquido Estimado</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-2">
            R$ {estimatedProfit.toLocaleString('pt-BR')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Margem líquida de 81.8%</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Ticket Médio</span>
            <Award className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">R$ 342,00</div>
          <div className="text-[11px] text-slate-500 mt-1">Duração média: 6.8 dias</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Taxa de Ocupação</span>
            <Percent className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-blue-700 mt-2">78.4%</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">Acervo em alta demanda</div>
        </div>
      </div>

      {/* Operational Pulse Sub-Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-blue-950">
          <span className="text-[10px] font-bold uppercase text-blue-700 block">Locações Ativas</span>
          <span className="text-xl font-black">52</span>
          <span className="text-[10px] text-blue-600 block mt-0.5">38 famílias atendidas</span>
        </div>

        <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200 text-indigo-950">
          <span className="text-[10px] font-bold uppercase text-indigo-700 block">Reservas Futuras</span>
          <span className="text-xl font-black">28</span>
          <span className="text-[10px] text-indigo-600 block mt-0.5">Próximos 14 dias</span>
        </div>

        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-950">
          <span className="text-[10px] font-bold uppercase text-emerald-700 block">Entregas Hoje</span>
          <span className="text-xl font-black">6</span>
          <span className="text-[10px] text-emerald-600 block mt-0.5">4 em rota, 2 prontas</span>
        </div>

        <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-amber-950">
          <span className="text-[10px] font-bold uppercase text-amber-700 block">Devoluções Hoje</span>
          <span className="text-xl font-black">4</span>
          <span className="text-[10px] text-amber-600 block mt-0.5">Coletas agendadas</span>
        </div>

        <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-200 text-teal-950">
          <span className="text-[10px] font-bold uppercase text-teal-700 block">Em Higienização</span>
          <span className="text-xl font-black">4</span>
          <span className="text-[10px] text-teal-600 block mt-0.5">Vapor 140°C</span>
        </div>

        <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 text-rose-950">
          <span className="text-[10px] font-bold uppercase text-rose-700 block">Em Manutenção</span>
          <span className="text-xl font-black">3</span>
          <span className="text-[10px] text-rose-600 block mt-0.5">1 aguarda peças</span>
        </div>
      </div>

      {/* Recharts Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Month by Month */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Evolução Semestral de Faturamento & Margem Líquida
              </h3>
              <p className="text-[11px] text-slate-500">Crescimento contínuo de receita e disciplina de custos</p>
            </div>
            <div className="flex items-center space-x-3 text-xs">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-slate-600">Faturamento</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-slate-600">Lucro</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Area type="monotone" dataKey="receita" stroke="#2563eb" fill="#93c5fd" fillOpacity={0.4} />
                <Area type="monotone" dataKey="lucro" stroke="#10b981" fill="#a7f3d0" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy by Category */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Taxa de Ocupação por Categoria
            </h3>
            <p className="text-[11px] text-slate-500">% do acervo atualmente alugado</p>
          </div>

          <div className="space-y-3">
            {occupancyByCategory.map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{item.name}</span>
                  <span className="font-extrabold text-blue-700">{item.ocupacao}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${item.ocupacao}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Categorias acima de <strong>75%</strong> sugerem reposição urgente de estoque para não perder reservas.
          </div>
        </div>
      </div>

      {/* Sections: Principais Alertas & Principais Oportunidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alertas */}
        <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-rose-700">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
              Principais Alertas Operacionais
            </h3>
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl flex items-start justify-between">
              <div>
                <strong className="text-rose-950 block">Locação Atrasada há 24h</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">Carrinho YOYO #CB-038 com Rodrigo Santoro deveria ter retornado ontem.</p>
              </div>
              <button
                onClick={() => setCurrentView('rentals')}
                className="px-2.5 py-1 bg-white border border-rose-300 text-rose-700 font-bold rounded-lg shrink-0 text-[11px]"
              >
                Cobrar
              </button>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start justify-between">
              <div>
                <strong className="text-amber-950 block">Gargalo de Carrinhos Compactos</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">92% dos carrinhos ultracompactos já estão reservados para o próximo feriado.</p>
              </div>
              <button
                onClick={() => setCurrentView('availability')}
                className="px-2.5 py-1 bg-white border border-amber-300 text-amber-800 font-bold rounded-lg shrink-0 text-[11px]"
              >
                Ver Grade
              </button>
            </div>
          </div>
        </div>

        {/* Oportunidades */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-emerald-700">
            <Lightbulb className="w-5 h-5" />
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
              Principais Oportunidades Estratégicas
            </h3>
          </div>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start justify-between">
              <div>
                <strong className="text-emerald-950 block">Combo Viagem Completa</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">Clientes que alugam Berço Portátil compram Cadeirinha com 68% de conversão quando ofertado em combo.</p>
              </div>
              <button
                onClick={() => setCurrentView('commercial_crm')}
                className="px-2.5 py-1 bg-white border border-emerald-300 text-emerald-800 font-bold rounded-lg shrink-0 text-[11px]"
              >
                Ativar
              </button>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start justify-between">
              <div>
                <strong className="text-blue-950 block">Campanha de Reativação de Clientes VIP</strong>
                <p className="text-slate-600 text-[11px] mt-0.5">14 clientes recorrentes não alugam há mais de 90 dias. Enviar cupom de incentivo.</p>
              </div>
              <button
                onClick={() => setCurrentView('customer_360')}
                className="px-2.5 py-1 bg-white border border-blue-300 text-blue-800 font-bold rounded-lg shrink-0 text-[11px]"
              >
                Ver Lista
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
