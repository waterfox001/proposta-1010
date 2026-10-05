import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Sparkles,
  Shield,
  HelpCircle,
  MessageCircle,
  Building2,
  CalendarPlus,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAI }) => {
  const {
    alerts,
    dismissAlert,
    setCurrentView,
    currentUserRole,
    setCurrentUserRole,
    setIsSearchModalOpen,
    setIsNewRentalModalOpen,
    setIsNewReservationModalOpen,
    setIsAvailabilityModalOpen,
    openWhatsAppModal,
    resetToInitialData
  } = useApp();

  const [isAlertsDropdownOpen, setIsAlertsDropdownOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const roles = ['OWNER', 'GERENTE', 'OPERACIONAL', 'FINANCEIRO', 'ATENDENTE'];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-20 shrink-0">
      {/* Left: Global Search trigger */}
      <div className="flex items-center space-x-3 w-96">
        <button
          onClick={() => setIsSearchModalOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 bg-slate-100/80 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-500 transition-colors shadow-inner"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Buscar cliente, CPF, produto, código, locação...</span>
          </div>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-400">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Availability quick check */}
        <button
          onClick={() => setIsAvailabilityModalOpen(true)}
          className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300/80 transition-colors"
          title="Consultar disponibilidade em datas específicas"
        >
          <Search className="w-3.5 h-3.5 text-blue-600" />
          <span>Consultar Datas</span>
        </button>

        {/* Quick New Reservation / Rental */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsNewReservationModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+ Reserva</span>
          </button>
          <button
            onClick={() => setIsNewRentalModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/30 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nova Locação</span>
          </button>
        </div>

        {/* AI Assistant trigger */}
        <button
          onClick={onOpenAI}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 rounded-lg shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span className="hidden md:inline">Assistente AI</span>
        </button>

        {/* Operational Alerts Bell */}
        <div className="relative">
          <button
            onClick={() => setIsAlertsDropdownOpen(!isAlertsDropdownOpen)}
            className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Alertas operacionais"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            )}
          </button>

          {isAlertsDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">Alertas Operacionais ({alerts.length})</span>
                <span className="text-[10px] text-slate-400 font-medium">Exigem ação</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {alerts.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">Nenhum alerta pendente</div>
                ) : (
                  alerts.map(alert => (
                    <div key={alert.id} className="p-3 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="text-xs font-bold text-slate-800">{alert.title}</div>
                        <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{alert.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        {alert.targetView && (
                          <button
                            onClick={() => {
                              setCurrentView(alert.targetView as any);
                              setIsAlertsDropdownOpen(false);
                            }}
                            className="text-[11px] text-blue-600 font-bold hover:underline"
                          >
                            {alert.actionLabel || 'Ver detalhes'} →
                          </button>
                        )}
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-[10px] text-slate-400 hover:text-slate-600 ml-auto"
                        >
                          Dispensar
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Hub trigger */}
        <button
          onClick={() =>
            openWhatsAppModal({
              phone: '5511984529182',
              customerName: 'Mariana Costa Silveira',
              defaultText: 'Olá Mariana! Seu pedido de locação está confirmado com sucesso!',
              type: 'confirmacao'
            })
          }
          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          title="WhatsApp Comunicação com Clientes"
        >
          <MessageCircle className="w-4 h-4" />
        </button>

        {/* Role & User Selector */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-800 font-bold text-xs">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">Administrador</div>
            <div className="flex items-center space-x-1">
              <Shield className="w-2.5 h-2.5 text-blue-600" />
              <select
                value={currentUserRole}
                onChange={e => setCurrentUserRole(e.target.value)}
                className="text-[10px] font-bold text-blue-600 bg-transparent cursor-pointer outline-none"
              >
                {roles.map(r => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Help & Reset Modal Trigger */}
        <button
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
          title="Ajuda e Informações do Sistema"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {isHelpOpen && (
          <div className="absolute top-16 right-6 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50 text-xs">
            <div className="font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span>Sobre o Sistema</span>
              <button onClick={() => setIsHelpOpen(false)} className="text-slate-400 font-normal">✕</button>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed mb-3">
              Sistema Operacional SaaS completo de locação infantil: estoque individual por código (CC-024, CB-014), reservas conectadas, conferência de devolução, higienização a vapor e financeiro em tempo real.
            </p>
            <button
              onClick={() => {
                if (confirm('Deseja restaurar todos os dados mock iniciais?')) {
                  resetToInitialData();
                  setIsHelpOpen(false);
                }
              }}
              className="w-full flex items-center justify-center space-x-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold border border-slate-300"
            >
              <RotateCcw className="w-3 h-3 text-slate-500" />
              <span>Restaurar Dados Fictícios</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
