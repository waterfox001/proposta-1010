import React from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Award,
  Zap,
  CheckCircle2,
  Percent,
  DollarSign,
  PackageCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip
} from 'recharts';

export const BusinessIntelligenceView: React.FC = () => {
  const radarData = [
    { subject: 'Financeiro', A: 92, fullMark: 100 },
    { subject: 'Comercial', A: 86, fullMark: 100 },
    { subject: 'Operação', A: 89, fullMark: 100 },
    { subject: 'Estoque', A: 78, fullMark: 100 },
    { subject: 'Clientes', A: 94, fullMark: 100 },
    { subject: 'Equipe', A: 90, fullMark: 100 }
  ];

  const executiveInsights = [
    {
      icon: TrendingUp,
      title: 'Faturamento em Forte Expansão',
      desc: 'O faturamento mensal consolidado cresceu +18.4% nos últimos 60 dias, impulsionado por aluguel de carrinhos de viagem.',
      tag: '+18.4% Crescimento',
      tagColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      icon: Award,
      title: 'Carro-Chefe de Receita',
      desc: 'Carrinhos de bebê representam 32.6% da receita total da empresa, com maior margem de contribuição líquida.',
      tag: '32.6% da Receita',
      tagColor: 'bg-blue-100 text-blue-800'
    },
    {
      icon: AlertTriangle,
      title: 'Atenção com Ativos Parados',
      desc: '3 produtos estão parados há mais de 30 dias sem locação. Sugere-se criar combo promocional ou rebaixar diária.',
      tag: '3 Itens Ociosos',
      tagColor: 'bg-rose-100 text-rose-800'
    },
    {
      icon: Zap,
      title: 'LTV & Recorrência Alta',
      desc: 'Clientes recorrentes representam 41% do faturamento total da empresa, gerando custo de aquisição (CAC) quase nulo.',
      tag: '41% Recorrência',
      tagColor: 'bg-indigo-100 text-indigo-800'
    },
    {
      icon: PackageCheck,
      title: 'Alta Demanda de Cadeirinhas 360°',
      desc: 'Cadeirinhas de carro para recém-nascidos apresentam fila de espera nos fins de semana e feriados prolongados.',
      tag: 'Alta Procura',
      tagColor: 'bg-amber-100 text-amber-800'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Inteligência Empresarial & Insights</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Análise preditiva de faturamento, rentabilidade por categoria e padrões de consumo de famílias
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-xl border border-indigo-200 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Motor de Insights Conectado</span>
          </span>
        </div>
      </div>

      {/* Score da Empresa & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-300 text-xs font-bold uppercase mb-2">
              <Award className="w-4 h-4" />
              <span>Score de Eficiência Geral</span>
            </div>
            <div className="text-5xl font-black text-white mt-1">88.2</div>
            <div className="text-xs text-indigo-200 mt-2 leading-relaxed">
              Calculado ponderando rentabilidade, taxa de ocupação do acervo, NPS dos pais e tempo de ciclo de higienização.
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Saúde Financeira:</span>
              <strong className="text-emerald-400">92 / 100</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Eficiência Operacional:</span>
              <strong className="text-blue-400">89 / 100</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Satisfação do Cliente (NPS):</span>
              <strong className="text-indigo-400">94 / 100</strong>
            </div>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Radar de Competitividade Operacional
              </h3>
              <p className="text-[11px] text-slate-500">Maturidade dos 6 pilares estratégicos da empresa</p>
            </div>
          </div>

          <div className="h-64 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cards de Insights do Sistema */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
            Insights Automáticos Detectados pela IA
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {executiveInsights.map((ins, idx) => {
            const Icon = ins.icon;
            return (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-700 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ins.tagColor}`}>
                      {ins.tag}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 mt-2">{ins.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{ins.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
