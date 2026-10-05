import React, { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Percent,
  Plus,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  MoreVertical,
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  UserPlus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CommercialPipelineViewProps {
  subTab?: string;
}

export const CommercialPipelineView: React.FC<CommercialPipelineViewProps> = ({ subTab }) => {
  const { openWhatsAppModal } = useApp();
  const [activeTab, setActiveTab] = useState<'pipeline' | 'leads' | 'follow_ups' | 'propostas' | 'metas'>('pipeline');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'leads') {
      setActiveTab('leads');
    } else if (subTab === 'follow_ups') {
      setActiveTab('follow_ups');
    } else if (subTab === 'proposals' || subTab === 'propostas') {
      setActiveTab('propostas');
    } else if (subTab === 'commercial_goals' || subTab === 'metas') {
      setActiveTab('metas');
    } else {
      setActiveTab('pipeline');
    }
  }, [subTab]);

  const pipelineColumns = [
    {
      id: 'novo_lead',
      title: 'Novo Lead',
      count: 6,
      totalVal: 'R$ 1.840',
      color: 'border-t-slate-400',
      cards: [
        { name: 'Letícia Albuquerque', item: 'Carrinho YOYO para viagem Paris', val: 350, phone: '(11) 98122-3344', date: 'Hoje' },
        { name: 'Bruno Camargo', item: '2 Cadeirinhas 0 a 36kg gêmeos', val: 490, phone: '(11) 97655-2211', date: 'Hoje' }
      ]
    },
    {
      id: 'contato',
      title: 'Contato Feito',
      count: 4,
      totalVal: 'R$ 1.420',
      color: 'border-t-blue-400',
      cards: [
        { name: 'Camila Peixoto', item: 'Berço Acoplável Chicco Next2Me', val: 390, phone: '(11) 99881-4433', date: 'Ontem' }
      ]
    },
    {
      id: 'interessado',
      title: 'Interessado',
      count: 5,
      totalVal: 'R$ 2.150',
      color: 'border-t-indigo-500',
      cards: [
        { name: 'Diego Nogueira', item: 'Carrinho Priam Lux Rose Gold', val: 560, phone: '(11) 98774-1122', date: '03/10' }
      ]
    },
    {
      id: 'orcamento',
      title: 'Orçamento Enviado',
      count: 7,
      totalVal: 'R$ 3.890',
      color: 'border-t-amber-500',
      cards: [
        { name: 'Renato Faria', item: 'Pacote Praia (Carrinho + Banheira)', val: 440, phone: '(11) 99112-8877', date: '02/10' },
        { name: 'Sabrina Sato Maia', item: 'Cadeira Refeição Stokke Tripp Trapp', val: 380, phone: '(11) 98443-6655', date: '02/10' }
      ]
    },
    {
      id: 'negociacao',
      title: 'Em Negociação',
      count: 3,
      totalVal: 'R$ 1.980',
      color: 'border-t-purple-500',
      cards: [
        { name: 'Fernanda Diniz', item: 'Extensão de locação por 15 dias', val: 620, phone: '(11) 98112-9988', date: '01/10' }
      ]
    },
    {
      id: 'reserva',
      title: 'Reserva Gerada',
      count: 8,
      totalVal: 'R$ 4.750',
      color: 'border-t-blue-600',
      cards: [
        { name: 'Ana Beatriz Ramos', item: 'Bebê Conforto Cybex Aton S2', val: 240, phone: '(11) 98561-2390', date: '04/10' }
      ]
    },
    {
      id: 'locacao',
      title: 'Locação Ativa',
      count: 14,
      totalVal: 'R$ 8.920',
      color: 'border-t-emerald-500',
      cards: [
        { name: 'Mariana Costa', item: 'Cadeirinha Burigotto Matrix K', val: 245, phone: '(11) 98452-9182', date: '05/10' }
      ]
    },
    {
      id: 'recorrente',
      title: 'Cliente Recorrente',
      count: 19,
      totalVal: 'R$ 14.300',
      color: 'border-t-teal-600',
      cards: [
        { name: 'Carlos Eduardo Mendes', item: 'Cadeirinha Pria Maxi-Cosi', val: 770, phone: '(11) 99182-3004', date: 'VIP' }
      ]
    }
  ];

  const leadsList = [
    { id: 'lead-1', name: 'Juliana Paes Cavalcanti', email: 'juliana.paes@gmail.com', phone: '(11) 98888-1234', source: 'Instagram Direct', interest: 'Carrinho de Bebê para Viagem Europa (15 dias)', budget: 'R$ 450', status: 'Novo' },
    { id: 'lead-2', name: 'Rodrigo Santoro Ramos', email: 'rodrigo.santoro@hotmail.com', phone: '(11) 97777-5678', source: 'Google Pesquisa', interest: 'Cadeirinha Isofix 0 a 36kg para aluguel mensal', budget: 'R$ 380', status: 'Qualificado' },
    { id: 'lead-3', name: 'Fabiana Karla Silveira', email: 'fabiana.karla@uol.com.br', phone: '(11) 96666-9012', source: 'Indicação Pediatra', interest: 'Berço Acoplável Next2Me para pós-parto (3 meses)', budget: 'R$ 1.100', status: 'Proposta Enviada' },
    { id: 'lead-4', name: 'Marcos Mion de Oliveira', email: 'marcos.mion@outlook.com', phone: '(11) 95555-3456', source: 'Site - Reserva Online', interest: 'Cadeira de Alimentação Stokke Tripp Trapp', budget: 'R$ 290', status: 'Agendado' }
  ];

  const followUps = [
    { id: 'fu-1', client: 'Camila Peixoto', phone: '(11) 99881-4433', note: 'Mãe confirmando datas do voo para enviar link de pagamento', time: '11:30 Hoje', priority: 'Alta' },
    { id: 'fu-2', client: 'Renato Faria', phone: '(11) 99112-8877', note: 'Aguardando validação se o hotel já tem banheira ou prefere combo', time: '14:00 Hoje', priority: 'Média' },
    { id: 'fu-3', client: 'Diego Nogueira', phone: '(11) 98774-1122', note: 'Verificar se prefere entrega no aeroporto de Guarulhos ou Congonhas', time: '16:00 Hoje', priority: 'Alta' },
    { id: 'fu-4', client: 'Letícia Albuquerque', phone: '(11) 98122-3344', note: 'Primeiro contato: explicar higienização e caução sem estresse', time: 'Amanhã 09:30', priority: 'Média' }
  ];

  const proposals = [
    { id: 'prop-101', client: 'Camila Peixoto', items: 'Berço Chicco Next2Me + Colchão Especial', total: 'R$ 390,00', validity: '08/10/2026', status: 'Enviada WhatsApp' },
    { id: 'prop-102', client: 'Renato Faria', items: 'Combo Praia: Carrinho YOYO + Banheira Flexi', total: 'R$ 440,00', validity: '07/10/2026', status: 'Em Análise' },
    { id: 'prop-103', client: 'Diego Nogueira', items: 'Carrinho Cybex Priam Lux Rose Gold', total: 'R$ 560,00', validity: '09/10/2026', status: 'Aprovada / Gerando Reserva' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Comercial & Funil de Vendas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestão completa de leads, follow-ups de atendimento, pipeline de conversão e metas da equipe
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'pipeline' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Pipeline Kanban
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'leads' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Leads ({leadsList.length})
            </button>
            <button
              onClick={() => setActiveTab('follow_ups')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'follow_ups' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Follow-ups ({followUps.length})
            </button>
            <button
              onClick={() => setActiveTab('propostas')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'propostas' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Propostas & Orçamentos
            </button>
            <button
              onClick={() => setActiveTab('metas')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'metas' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Metas Comerciais
            </button>
          </div>

          <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all">
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ Lead</span>
          </button>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Valor do Pipeline</div>
          <div className="text-2xl font-black text-slate-900 mt-1">R$ 36.250</div>
          <div className="text-[11px] text-blue-600 font-bold mt-0.5">66 oportunidades ativas</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Previsão Fechamento</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">R$ 28.400</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Ponderado por probabilidade</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Taxa de Conversão</div>
          <div className="text-2xl font-black text-blue-600 mt-1">34.8%</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-0.5">+4.2% vs média do setor</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Follow-ups Pendentes</div>
          <div className="text-2xl font-black text-amber-600 mt-1">8 hoje</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Contatos agendados</div>
        </div>
      </div>

      {/* TAB: PIPELINE KANBAN */}
      {activeTab === 'pipeline' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3.5 min-w-[1300px]">
            {pipelineColumns.map(col => (
              <div
                key={col.id}
                className={`w-64 bg-slate-100/80 rounded-2xl p-3 border border-slate-200/90 border-t-4 ${col.color} shrink-0 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-extrabold text-xs text-slate-900">{col.title}</h3>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-bold">
                        {col.count}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500">{col.totalVal}</span>
                  </div>

                  <div className="space-y-2.5">
                    {col.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs space-y-2 hover:border-blue-400 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                            {card.name}
                          </span>
                          <span className="text-[10px] text-slate-400">{card.date}</span>
                        </div>

                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {card.item}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                          <span className="font-mono font-bold text-slate-900">R$ {card.val}</span>
                          <button
                            onClick={() => openWhatsAppModal({
                              phone: card.phone,
                              customerName: card.name,
                              type: 'confirmacao',
                              rentalNumber: '#PRE-ORC',
                              productName: card.item,
                              totalAmount: card.val
                            })}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                            title="Chamar no WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="mt-3 py-1.5 w-full border border-dashed border-slate-300 rounded-lg text-[11px] text-slate-500 font-semibold hover:border-slate-400 hover:bg-white transition-all flex items-center justify-center space-x-1">
                  <Plus className="w-3 h-3" />
                  <span>Adicionar</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: LEADS */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Lista Central de Leads & Oportunidades</h3>
              <p className="text-xs text-slate-500">Mapeamento de famílias interessadas em aluguel e status de atendimento</p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {leadsList.length} Leads Ativos
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Lead / Família</th>
                  <th className="py-2.5 px-3">Origem</th>
                  <th className="py-2.5 px-3">Interesse / Produto</th>
                  <th className="py-2.5 px-3">Orçamento Estimado</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leadsList.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{lead.name}</div>
                      <div className="text-[10px] text-slate-400">{lead.phone} • {lead.email}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{lead.source}</td>
                    <td className="py-3 px-3 text-slate-800 font-medium">{lead.interest}</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{lead.budget}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => openWhatsAppModal({
                          phone: lead.phone,
                          customerName: lead.name,
                          type: 'confirmacao',
                          rentalNumber: '#LEAD-CAD',
                          productName: lead.interest
                        })}
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[11px] font-bold transition-colors inline-flex items-center space-x-1"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Contatar</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: FOLLOW-UPS */}
      {activeTab === 'follow_ups' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Agenda de Follow-ups Comerciais</h3>
              <p className="text-xs text-slate-500">Lembretes operacionais de contato com clientes para fechar orçamentos</p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {followUps.length} Agendamentos
            </span>
          </div>

          <div className="space-y-3">
            {followUps.map(fu => (
              <div key={fu.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-slate-900">{fu.client}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${fu.priority === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {fu.priority} Prioridade
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{fu.time}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{fu.note}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openWhatsAppModal({
                      phone: fu.phone,
                      customerName: fu.client,
                      type: 'lembrete',
                      rentalNumber: '#FOLLOW-UP'
                    })}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors">
                    Marcar Concluído
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: PROPOSTAS */}
      {activeTab === 'propostas' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Propostas & Orçamentos Emitidos</h3>
              <p className="text-xs text-slate-500">Documentos personalizados de locação e pacotes para viagens</p>
            </div>
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all">
              + Nova Proposta
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Itens Inclusos</th>
                  <th className="py-2.5 px-3">Valor Total</th>
                  <th className="py-2.5 px-3">Validade</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {proposals.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">{p.id}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{p.client}</td>
                    <td className="py-3 px-3 text-slate-600">{p.items}</td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-700">{p.total}</td>
                    <td className="py-3 px-3 text-slate-400">{p.validity}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: METAS COMERCIAIS */}
      {activeTab === 'metas' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-200">
            <h3 className="font-extrabold text-sm text-slate-900">Metas Comerciais do Mês (Outubro 2026)</h3>
            <p className="text-xs text-slate-500">Acompanhamento de metas individuais e coletivas de novos contratos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">Meta Geral de Locações</div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900">47 / 55</span>
                <span className="text-xs font-bold text-emerald-600">85.4%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85.4%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400">Faltam 8 contratos para bater a meta</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">Ticket Médio por Locação</div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900">R$ 342</span>
                <span className="text-xs font-bold text-emerald-600">Meta: R$ 320</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold">+6.8% acima da meta planejada</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">Tempo Médio de Atendimento</div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900">4.2 min</span>
                <span className="text-xs font-bold text-blue-600">Meta: &lt; 5 min</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-[10px] text-slate-400">Resposta rápida no WhatsApp de suporte</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
