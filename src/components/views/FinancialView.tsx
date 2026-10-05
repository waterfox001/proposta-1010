import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const FinancialView: React.FC = () => {
  const { financialTransactions, rentals } = useApp();

  const [paymentFilter, setPaymentFilter] = useState<string>('TODAS');

  const totalRevenue = financialTransactions
    .filter(f => f.type === 'receita_locacao')
    .reduce((sum, f) => sum + f.amount, 0) + 28450;

  const totalExpenses = Math.abs(
    financialTransactions
      .filter(f => f.type.startsWith('despesa'))
      .reduce((sum, f) => sum + f.amount, 0)
  ) + 4200;

  const totalDepositsHeld = rentals
    .filter(r => r.depositStatus === 'retida')
    .reduce((sum, r) => sum + r.depositAmount, 0) + 3800;

  const estimatedProfit = totalRevenue - totalExpenses;

  // Chart: weekly revenue trends
  const revenueTrendData = [
    { semana: 'Semana 1', receita: 6200, despesa: 1100 },
    { semana: 'Semana 2', receita: 7400, despesa: 980 },
    { semana: 'Semana 3', receita: 8100, despesa: 1400 },
    { semana: 'Semana 4', receita: 9550, despesa: 1250 }
  ];

  const categoryRevenueData = [
    { category: 'Carrinhos', valor: 11400 },
    { category: 'Cadeirinhas', valor: 8900 },
    { category: 'Berços', valor: 4800 },
    { category: 'Bebê-conforto', valor: 3600 },
    { category: 'Alimentação', valor: 2100 },
    { category: 'Brinquedos', valor: 1850 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Financeiro, Pagamentos & Gestão de Cauções</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fluxo de caixa, gateway simulado, custódia de garantias e demonstrativo de resultados
          </p>
        </div>

        <button
          onClick={() => {
            const csv = 'Tipo,Descricao,Valor,Data,Status\n' + financialTransactions.map(f => `${f.type},${f.description},${f.amount},${f.date},${f.status}`).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `financeiro_locacao_infantil_${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
          }}
          className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Exportar Extrato CSV</span>
        </button>
      </div>

      {/* Financial KPIs Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Faturamento Bruto</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">
            +18.4% vs mês anterior
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Cauções sob Custódia</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-700 mt-2">
            R$ {totalDepositsHeld.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Garantia retida de locações ativas</div>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Despesas & Peças</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 mt-2">
            R$ {totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Manutenção e produtos de higienização</div>
        </div>

        <div className="p-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase">
            <span>Lucro Operacional Estimado</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            R$ {estimatedProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-300 mt-1">Margem líquida de ~82.3%</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              Evolução Semanal de Receitas x Despesas
            </h3>
            <span className="text-[11px] text-slate-400">Outubro 2026</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="semana" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="receita" stroke="#2563eb" fill="#93c5fd" fillOpacity={0.4} />
                <Area type="monotone" dataKey="despesa" stroke="#e11d48" fill="#fda4af" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              Receita Gerada por Categoria de Produto
            </h3>
            <span className="text-[11px] text-slate-400">Top Famílias</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryRevenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 10, fill: '#64748b' }} width={85} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                />
                <Bar dataKey="valor" fill="#2563eb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase text-slate-800 tracking-wider">
            Lançamentos Financeiros Recentes
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Gateway Pix & Cartão Conectado</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Descrição</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Data</th>
                <th className="py-3 px-4">Forma</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Valor Líquido</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {financialTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{tx.description}</div>
                    {tx.customerName && (
                      <div className="text-[10px] text-slate-400">{tx.customerName}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{tx.category}</td>
                  <td className="py-3 px-4 text-slate-500">{tx.date}</td>
                  <td className="py-3 px-4 font-mono uppercase text-slate-700">{tx.paymentMethod}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {tx.status}
                    </span>
                  </td>
                  <td className={`py-3 px-4 text-right font-extrabold text-xs ${
                    tx.amount >= 0 ? 'text-emerald-700' : 'text-rose-600'
                  }`}>
                    {tx.amount >= 0 ? `+ R$ ${tx.amount}` : `- R$ ${Math.abs(tx.amount)}`}
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
