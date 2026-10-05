import React, { useState } from 'react';
import { ShieldCheck, Users, Clock, History, Key, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface TeamAuditingViewProps {
  subTab?: string;
}

export const TeamAuditingView: React.FC<TeamAuditingViewProps> = ({ subTab }) => {
  const { teamMembers, auditLogs, currentUserRole, setCurrentUserRole } = useApp();
  const [activeTab, setActiveTab] = useState<'auditoria' | 'equipe' | 'permissoes'>('equipe');

  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'roles_permissions') setActiveTab('permissoes');
    else if (subTab === 'audit_logs') setActiveTab('auditoria');
    else setActiveTab('equipe');
  }, [subTab]);

  const rolePermissions = [
    {
      role: 'ATENDENTE',
      modules: ['Clientes & CRM', 'Reservas', 'Locações Rápidas', 'WhatsApp'],
      desc: 'Criação de reservas, consulta de disponibilidade e atendimento a famílias.'
    },
    {
      role: 'OPERACIONAL',
      modules: ['Estoque Unitário', 'Entregas & Rotas', 'Devoluções & Check', 'Higienização', 'Manutenção'],
      desc: 'Separação física, lavagem hospitalar, inspeção técnica e conferência de avarias.'
    },
    {
      role: 'FINANCEIRO',
      modules: ['Locações', 'Pagamentos', 'Financeiro Geral', 'Gestão de Cauções', 'Relatórios'],
      desc: 'Conciliação de Pix, estorno de caução de garantia e controle de fluxo de caixa.'
    },
    {
      role: 'GERENTE',
      modules: ['Operação Completa', 'Estoque', 'Equipe', 'Relatórios & Rankings', 'Auditoria'],
      desc: 'Supervisão de rotinas, desbloqueio de produtos e gestão de produtividade.'
    },
    {
      role: 'OWNER',
      modules: ['Acesso Total Irrestrito a todos os módulos do sistema'],
      desc: 'Administração global, parametrização de preços e governança.'
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Equipe, Permissões & Trilha de Auditoria</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log imutável de ações operacionais e controle de controle de acesso baseado em papéis (RBAC)
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('auditoria')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'auditoria' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Trilha de Auditoria ({auditLogs.length} eventos)
        </button>
        <button
          onClick={() => setActiveTab('equipe')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'equipe' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Membros da Equipe ({teamMembers.length})
        </button>
        <button
          onClick={() => setActiveTab('permissoes')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'permissoes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Matriz de Perfis & Permissões
        </button>
      </div>

      {/* Tab: Audit Log */}
      {activeTab === 'auditoria' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Histórico de Ações Registradas em Tempo Real
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Registro Automático de Segurança</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.map(log => (
              <div key={log.id} className="p-4 hover:bg-slate-50 flex items-start justify-between gap-4 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-slate-900">{log.user}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 uppercase">
                      {log.type}
                    </span>
                  </div>
                  <div className="font-medium text-slate-800">{log.action}</div>
                  <div className="text-[11px] text-slate-500">{log.details}</div>
                </div>

                <div className="text-right text-[11px] text-slate-400 shrink-0 font-mono">
                  <div>{log.date}</div>
                  <div>{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Team Members */}
      {activeTab === 'equipe' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div className="space-y-0.5">
                <h3 className="font-bold text-xs text-slate-900">{member.name}</h3>
                <div className="text-[11px] text-slate-400">{member.email}</div>
                <div className="flex items-center space-x-2 pt-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                    {member.role}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">● Ativo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Permissions Matrix */}
      {activeTab === 'permissoes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rolePermissions.map(rp => (
            <div
              key={rp.role}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-sm text-blue-700">{rp.role}</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                  Nível de Acesso
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{rp.desc}</p>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Módulos Autorizados:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {rp.modules.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 flex items-center space-x-1"
                    >
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
