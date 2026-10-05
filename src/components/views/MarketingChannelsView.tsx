import React from 'react';
import {
  TrendingUp,
  Percent,
  DollarSign,
  Share2,
  Users,
  Award,
  Globe,
  Instagram,
  Search
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface MarketingChannelsViewProps {
  subTab?: string;
}

export const MarketingChannelsView: React.FC<MarketingChannelsViewProps> = ({ subTab }) => {
  const channels = [
    { channel: 'Indicação / Boca a Boca', clientes: 142, receita: 48600, cac: 'R$ 0,00', roi: 'Infinito', icon: Users, color: 'text-emerald-600' },
    { channel: 'Instagram Orgânico & Reels', clientes: 98, receita: 33400, cac: 'R$ 14,20', roi: '18.4x', icon: Instagram, color: 'text-pink-600' },
    { channel: 'Google Search / SEO Local', clientes: 86, receita: 29500, cac: 'R$ 22,50', roi: '14.2x', icon: Search, color: 'text-blue-600' },
    { channel: 'Parcerias com Pediatras & Maternidades', clientes: 54, receita: 18900, cac: 'R$ 18,00', roi: '16.0x', icon: Award, color: 'text-indigo-600' },
    { channel: 'Google Ads (Campanha Viagem)', clientes: 38, receita: 12800, cac: 'R$ 48,00', roi: '6.8x', icon: Globe, color: 'text-amber-600' }
  ];

  const conversionFunnel = [
    { etapa: 'Visitantes no Site', volume: 14200 },
    { etapa: 'Consultaram Datas', volume: 4850 },
    { etapa: 'Adicionaram Carrinho', volume: 1240 },
    { etapa: 'Iniciaram Checkout', volume: 680 },
    { etapa: 'Locações Pagas', volume: 418 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Marketing & Canais de Aquisição</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Origem dos clientes, custo de aquisição (CAC), retorno sobre investimento (ROI) e campanhas sazonais
        </p>
      </div>

      {/* Main Channels Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
            Performance por Canal de Venda
          </h3>
          <span className="text-[11px] text-slate-400">Atribuição por Primeiro e Último Toque</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Canal de Origem</th>
                <th className="py-3 px-4">Clientes Conquistados</th>
                <th className="py-3 px-4">Receita Gerada</th>
                <th className="py-3 px-4">CAC Médio</th>
                <th className="py-3 px-4 text-right">ROI Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {channels.map((ch, idx) => {
                const Icon = ch.icon;
                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-4 flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${ch.color}`} />
                      <span className="font-bold text-slate-800">{ch.channel}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{ch.clientes} pais</td>
                    <td className="py-3 px-4 font-bold text-slate-900">R$ {ch.receita.toLocaleString('pt-BR')}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono">{ch.cac}</td>
                    <td className="py-3 px-4 text-right font-black text-emerald-700">{ch.roi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
