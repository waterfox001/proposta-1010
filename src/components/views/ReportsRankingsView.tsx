import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ReportsRankingsViewProps {
  subTab?: string;
}

export const ReportsRankingsView: React.FC<ReportsRankingsViewProps> = ({ subTab }) => {
  const { products, customers, setSelectedProductId } = useApp();
  const [selectedReportType, setSelectedReportType] = React.useState<string>('geral');

  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'bi_financial') setSelectedReportType('financeiro');
    else if (subTab === 'bi_commercial') setSelectedReportType('comercial');
    else if (subTab === 'bi_inventory') setSelectedReportType('estoque');
    else if (subTab === 'bi_operational') setSelectedReportType('operacional');
    else if (subTab === 'bi_customers') setSelectedReportType('clientes');
    else if (subTab === 'bi_logistics') setSelectedReportType('logistica');
    else if (subTab === 'rankings_kpis') setSelectedReportType('rankings');
    else setSelectedReportType('geral');
  }, [subTab]);

  // Top rented products
  const topRented = [...products].sort((a, b) => b.rentalCount - a.rentalCount).slice(0, 5);

  // Top revenue products
  const topRevenue = [...products].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);

  // Idle products (> 30 days)
  const idleProducts = products.filter(p => p.daysInactive >= 30);

  // Top recurring customers
  const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

  const handleExportCSV = () => {
    const csvContent =
      'Ranking,Codigo,Nome,Categoria,Locacoes,ReceitaTotal,DiasParado\n' +
      products
        .map(
          (p, i) =>
            `${i + 1},${p.code},"${p.name}",${p.category},${p.rentalCount},${p.totalRevenue},${p.daysInactive}`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_gerencial_locacao_infantil_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Relatórios Gerenciais & Rankings</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Análise de performance por produto, rentabilidade, ociosidade de acervo e clientes VIP
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimir PDF</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Top 3 Rankings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mais Alugados */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-blue-700">
            <Award className="w-4 h-4" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Produtos Mais Alugados
            </h3>
          </div>

          <div className="space-y-2.5">
            {topRented.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-xs text-slate-900 leading-tight truncate max-w-[170px]">
                      {p.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">{p.code} • {p.brand}</div>
                  </div>
                </div>
                <div className="text-right">
                  <strong className="text-xs text-blue-700 font-extrabold">{p.rentalCount}x</strong>
                  <div className="text-[10px] text-slate-400">locações</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mais Faturam */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-emerald-700">
            <TrendingUp className="w-4 h-4" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Top Faturamento Acumulado
            </h3>
          </div>

          <div className="space-y-2.5">
            {topRevenue.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setSelectedProductId(p.id)}
                className="p-2.5 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-xs text-slate-900 leading-tight truncate max-w-[170px]">
                      {p.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">{p.code} • {p.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <strong className="text-xs text-emerald-700 font-extrabold">
                    R$ {p.totalRevenue.toLocaleString('pt-BR')}
                  </strong>
                  <div className="text-[10px] text-slate-400">faturado</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clientes Mais Recorrentes */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-amber-600">
            <Award className="w-4 h-4" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Clientes VIP / Recorrentes
            </h3>
          </div>

          <div className="space-y-2.5">
            {topCustomers.map((c, idx) => (
              <div
                key={c.id}
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-slate-900 leading-tight truncate max-w-[160px]">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.rentalCount} locações concluídas</div>
                  </div>
                </div>
                <div className="text-right font-extrabold text-slate-900">
                  R$ {c.totalSpent.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 23: PRODUTOS PARADOS / BAIXA UTILIZAÇÃO */}
      <div className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Produtos com Baixa Utilização & Estoque Parado (&gt; 30, 60, 90 dias)
              </h3>
              <p className="text-xs text-slate-500">
                Identificação de custo de oportunidade de armazenamento e sugestões comerciais do sistema
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            {idleProducts.length} itens parados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Produto</th>
                <th className="py-3 px-4">Dias Parado</th>
                <th className="py-3 px-4">Valor Aquisição</th>
                <th className="py-3 px-4">Receita Total</th>
                <th className="py-3 px-4">Sugestão Automática do Sistema</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {idleProducts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                      <span className="font-mono bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded">
                        {p.code}
                      </span>
                      <span>{p.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{p.brand} • {p.category}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800">
                      {p.daysInactive} dias sem locar
                    </span>
                  </td>

                  <td className="py-3 px-4 font-semibold text-slate-700">R$ {p.purchaseValue}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">R$ {p.totalRevenue}</td>

                  <td className="py-3 px-4">
                    <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        {p.daysInactive > 90
                          ? 'Sugerir liquidação do ativo ou combo cortesia para locações superiores a 30 dias.'
                          : 'Aplicar desconto promocional de 20% na diária para incentivar giro.'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
