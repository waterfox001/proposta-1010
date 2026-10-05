import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  Target,
  LineChart,
  Bell,
  Users,
  UserPlus,
  Filter,
  Clock,
  FileText,
  Award,
  CalendarCheck,
  CalendarDays,
  Calendar,
  CalendarClock,
  Layers,
  Truck,
  RotateCcw,
  Sparkles,
  Wrench,
  AlertTriangle,
  Package,
  Boxes,
  SearchCode,
  Cpu,
  TrendingUp,
  ShoppingCart,
  Building2,
  History,
  Crown,
  Smile,
  UserMinus,
  DollarSign,
  ArrowDownLeft,
  ArrowUpRight,
  Coins,
  Scale,
  ShieldCheck,
  AlertCircle,
  BarChart2,
  FileSpreadsheet,
  Percent,
  MapPin,
  Navigation,
  Compass,
  UserCheck,
  Gauge,
  CheckSquare,
  Zap,
  Shield,
  FileSearch,
  BarChart3,
  Trophy,
  Activity,
  Share2,
  PieChart,
  Megaphone,
  Sliders,
  Store,
  Globe,
  UserCircle,
  FileCheck,
  CreditCard,
  Receipt,
  Camera,
  FolderArchive,
  FileCheck2,
  Building,
  Tag,
  FileSignature,
  Link,
  Baby,
  ChevronDown,
  ChevronRight,
  Search,
  ChevronsUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ViewMode } from '../types';

interface SidebarCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  items: {
    id: ViewMode;
    label: string;
    icon: React.ElementType;
    badgeKey?: 'delayed' | 'pendingReservations' | 'sanitization' | 'maintenance' | 'returns' | 'alerts';
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    rentals,
    reservations,
    sanitizations,
    maintenances,
    returns,
    alerts
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  
  // Track open/collapsed categories
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'visao_geral': true,
    'comercial': true,
    'operacao': true,
    'estoque': true,
    'clientes': false,
    'financeiro': false,
    'logistica': false,
    'gestao': false,
    'relatorios': false,
    'marketing': false,
    'automacoes': false,
    'portal_cliente': false,
    'documentos': false,
    'configuracoes': false
  });

  const delayedRentals = rentals.filter(r => r.status === 'atrasada').length;
  const pendingReservations = reservations.filter(r => r.status === 'aguardando_pagamento' || r.status === 'reservada').length;
  const inSanitization = sanitizations.filter(s => s.status !== 'concluido').length;
  const inMaintenance = maintenances.filter(m => m.status !== 'concluida').length;
  const pendingReturns = returns.filter(ret => ret.status === 'pendente_conferencia').length;
  const activeAlerts = alerts.filter(a => a.type === 'critical' || a.type === 'warning').length;

  const getBadgeValue = (key?: string) => {
    switch (key) {
      case 'delayed':
        return delayedRentals > 0 ? `${delayedRentals} atraso` : undefined;
      case 'pendingReservations':
        return pendingReservations > 0 ? pendingReservations : undefined;
      case 'sanitization':
        return inSanitization > 0 ? inSanitization : undefined;
      case 'maintenance':
        return inMaintenance > 0 ? inMaintenance : undefined;
      case 'returns':
        return pendingReturns > 0 ? pendingReturns : undefined;
      case 'alerts':
        return activeAlerts > 0 ? activeAlerts : undefined;
      default:
        return undefined;
    }
  };

  const categories: SidebarCategory[] = useMemo(() => [
    {
      id: 'visao_geral',
      name: 'VISÃO GERAL',
      icon: LayoutDashboard,
      items: [
        { id: 'executive_dashboard', label: 'Dashboard Executivo', icon: LayoutDashboard },
        { id: 'okrs_goals', label: 'Metas & OKRs', icon: Target },
        { id: 'business_intelligence', label: 'Inteligência Empresarial', icon: LineChart },
        { id: 'alerts_center', label: 'Central de Alertas', icon: Bell, badgeKey: 'alerts', badgeColor: 'bg-red-500 text-white' }
      ]
    },
    {
      id: 'comercial',
      name: 'COMERCIAL',
      icon: Users,
      items: [
        { id: 'commercial_crm', label: 'CRM', icon: Users },
        { id: 'leads', label: 'Leads', icon: UserPlus },
        { id: 'sales_pipeline', label: 'Pipeline de Vendas', icon: Filter },
        { id: 'follow_ups', label: 'Follow-ups', icon: Clock },
        { id: 'proposals', label: 'Propostas & Orçamentos', icon: FileText },
        { id: 'commercial_goals', label: 'Metas Comerciais', icon: Award }
      ]
    },
    {
      id: 'operacao',
      name: 'OPERAÇÃO',
      icon: CalendarCheck,
      items: [
        { id: 'rentals', label: 'Locações', icon: CalendarCheck, badgeKey: 'delayed', badgeColor: 'bg-red-500 text-white' },
        { id: 'reservations', label: 'Reservas', icon: CalendarDays, badgeKey: 'pendingReservations', badgeColor: 'bg-blue-600 text-white' },
        { id: 'calendar', label: 'Calendário de Reservas', icon: Calendar },
        { id: 'agenda', label: 'Agenda Operacional', icon: CalendarClock },
        { id: 'operational_hub', label: 'Central Operacional', icon: Layers },
        { id: 'deliveries', label: 'Entregas & Rotas', icon: Truck },
        { id: 'returns', label: 'Devoluções & Check', icon: RotateCcw, badgeKey: 'returns', badgeColor: 'bg-amber-500 text-white' },
        { id: 'sanitization', label: 'Higienização', icon: Sparkles, badgeKey: 'sanitization', badgeColor: 'bg-emerald-600 text-white' },
        { id: 'maintenance', label: 'Manutenção & O.S.', icon: Wrench, badgeKey: 'maintenance', badgeColor: 'bg-rose-500 text-white' },
        { id: 'damages_incidents', label: 'Avarias & Ocorrências', icon: AlertTriangle }
      ]
    },
    {
      id: 'estoque',
      name: 'ESTOQUE & ATIVOS',
      icon: Package,
      items: [
        { id: 'inventory', label: 'Estoque Individual', icon: Package },
        { id: 'products_assets', label: 'Produtos & Ativos', icon: Boxes },
        { id: 'categories', label: 'Categorias & Catálogo', icon: Layers },
        { id: 'availability', label: 'Checar Disponibilidade', icon: SearchCode },
        { id: 'inventory_intelligence', label: 'Inteligência de Estoque', icon: Cpu },
        { id: 'demand_forecast', label: 'Demanda & Previsão', icon: TrendingUp },
        { id: 'purchases_restock', label: 'Compras & Reposição', icon: ShoppingCart },
        { id: 'suppliers', label: 'Fornecedores', icon: Building2 }
      ]
    },
    {
      id: 'clientes',
      name: 'CLIENTES',
      icon: Users,
      items: [
        { id: 'customer_360', label: 'Clientes & CRM 360°', icon: Users },
        { id: 'rental_history', label: 'Histórico de Locações', icon: History },
        { id: 'loyalty_program', label: 'Fidelidade', icon: Crown },
        { id: 'nps_satisfaction', label: 'Satisfação & NPS', icon: Smile },
        { id: 'inactive_customers', label: 'Clientes Inativos', icon: UserMinus },
        { id: 'vip_customers', label: 'Clientes VIP', icon: Sparkles }
      ]
    },
    {
      id: 'financeiro',
      name: 'FINANCEIRO',
      icon: DollarSign,
      items: [
        { id: 'financial', label: 'Dashboard Financeiro', icon: DollarSign },
        { id: 'accounts_receivable', label: 'Contas a Receber', icon: ArrowDownLeft },
        { id: 'accounts_payable', label: 'Contas a Pagar', icon: ArrowUpRight },
        { id: 'cash_flow', label: 'Fluxo de Caixa', icon: Coins },
        { id: 'income_expenses', label: 'Receitas & Despesas', icon: Scale },
        { id: 'deposits_held', label: 'Cauções', icon: ShieldCheck },
        { id: 'overdue_defaults', label: 'Inadimplência', icon: AlertCircle },
        { id: 'profitability', label: 'Rentabilidade', icon: BarChart2 },
        { id: 'dre_statement', label: 'DRE Simplificada', icon: FileSpreadsheet },
        { id: 'commissions', label: 'Comissões', icon: Percent }
      ]
    },
    {
      id: 'logistica',
      name: 'LOGÍSTICA',
      icon: Truck,
      items: [
        { id: 'logistics_map', label: 'Mapa Operacional', icon: MapPin },
        { id: 'driver_tracking', label: 'Rastreamento de Entregadores', icon: Navigation },
        { id: 'routes_logistics', label: 'Rotas & Itinerários', icon: Compass },
        { id: 'drivers_list', label: 'Motoristas/Entregadores', icon: UserCheck },
        { id: 'logistics_incidents', label: 'Ocorrências Logísticas', icon: AlertTriangle },
        { id: 'logistics_performance', label: 'Performance Logística', icon: Gauge }
      ]
    },
    {
      id: 'gestao',
      name: 'GESTÃO',
      icon: ShieldCheck,
      items: [
        { id: 'team', label: 'Equipe', icon: Users },
        { id: 'tasks_management', label: 'Tarefas', icon: CheckSquare },
        { id: 'productivity', label: 'Produtividade', icon: Zap },
        { id: 'roles_permissions', label: 'Permissões', icon: Shield },
        { id: 'audit_logs', label: 'Auditoria', icon: FileSearch }
      ]
    },
    {
      id: 'relatorios',
      name: 'RELATÓRIOS & BI',
      icon: BarChart3,
      items: [
        { id: 'reports', label: 'Relatórios Gerais', icon: BarChart3 },
        { id: 'bi_financial', label: 'Relatório Financeiro', icon: DollarSign },
        { id: 'bi_commercial', label: 'Relatório Comercial', icon: TrendingUp },
        { id: 'bi_inventory', label: 'Relatório de Estoque', icon: Package },
        { id: 'bi_operational', label: 'Relatório Operacional', icon: Layers },
        { id: 'bi_customers', label: 'Relatório de Clientes', icon: Users },
        { id: 'bi_logistics', label: 'Relatório Logístico', icon: Truck },
        { id: 'rankings_kpis', label: 'Rankings & Indicadores', icon: Trophy }
      ]
    },
    {
      id: 'marketing',
      name: 'MARKETING',
      icon: Share2,
      items: [
        { id: 'marketing_origins', label: 'Origem dos Clientes', icon: Compass },
        { id: 'acquisition_channels', label: 'Canais de Aquisição', icon: Share2 },
        { id: 'conversion_funnel', label: 'Conversão', icon: Filter },
        { id: 'channel_roi', label: 'ROI por Canal', icon: PieChart },
        { id: 'marketing_campaigns', label: 'Campanhas', icon: Megaphone }
      ]
    },
    {
      id: 'automacoes',
      name: 'AUTOMAÇÕES',
      icon: Zap,
      items: [
        { id: 'automations', label: 'Automações', icon: Zap },
        { id: 'business_rules', label: 'Regras', icon: Sliders },
        { id: 'system_notifications', label: 'Notificações', icon: Bell },
        { id: 'automated_reminders', label: 'Lembretes', icon: Clock }
      ]
    },
    {
      id: 'portal_cliente',
      name: 'PORTAL DO CLIENTE',
      icon: Store,
      items: [
        { id: 'customer_store', label: 'Site do Cliente', icon: Store },
        { id: 'online_booking', label: 'Reservas Online', icon: Globe },
        { id: 'customer_account', label: 'Área do Cliente', icon: UserCircle },
        { id: 'customer_contracts', label: 'Contratos Online', icon: FileCheck },
        { id: 'tracking_delivery', label: 'Acompanhamento Entrega', icon: Truck }
      ]
    },
    {
      id: 'documentos',
      name: 'DOCUMENTOS',
      icon: FolderArchive,
      items: [
        { id: 'documents_vault', label: 'Todos os Documentos', icon: FolderArchive },
        { id: 'contracts_docs', label: 'Contratos', icon: FileText },
        { id: 'invoices_nf', label: 'Notas Fiscais & NFS-e', icon: FileSpreadsheet },
        { id: 'inspection_photos', label: 'Fotos & Vistorias', icon: Camera }
      ]
    },
    {
      id: 'configuracoes',
      name: 'CONFIGURAÇÕES',
      icon: Building,
      items: [
        { id: 'company_settings', label: 'Empresa', icon: Building },
        { id: 'users_settings', label: 'Usuários & Acesso', icon: Users },
        { id: 'pricing_settings', label: 'Preços & Taxas', icon: Tag },
        { id: 'policies_settings', label: 'Políticas & Contratos', icon: FileSignature },
        { id: 'integrations_settings', label: 'Integrações & APIs', icon: Link }
      ]
    }
  ], [delayedRentals, pendingReservations, inSanitization, inMaintenance, pendingReturns, activeAlerts]);

  // Filter categories when user types in search
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const term = searchTerm.toLowerCase();
    return categories
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.label.toLowerCase().includes(term))
      }))
      .filter(cat => cat.items.length > 0);
  }, [categories, searchTerm]);

  const toggleCategory = (catId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const toggleAll = () => {
    const allOpen = Object.values(openCategories).every(v => v);
    const newState: Record<string, boolean> = {};
    categories.forEach(c => {
      newState[c.id] = !allOpen;
    });
    setOpenCategories(newState);
  };

  return (
    <aside className="w-72 bg-[#0a192f] text-slate-200 flex flex-col h-screen border-r border-slate-800 shrink-0 select-none shadow-xl z-30">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Baby className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm tracking-tight text-white font-sans">Locação Infantil</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[9px] uppercase font-bold tracking-widest text-blue-400 bg-blue-950/90 px-1.5 py-0.5 rounded border border-blue-800/60">
                ERP SaaS
              </span>
              <span className="text-[9px] text-slate-400 font-mono">v2.5 Pro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search & Collapse Toggle Bar */}
      <div className="px-3 pt-3 pb-2 border-b border-slate-800/80 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          <input
            type="text"
            placeholder="Filtrar menus e módulos..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Estrutura Operacional
          </span>
          <button
            onClick={toggleAll}
            className="flex items-center space-x-1 text-[10px] font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            title="Expandir ou recolher todos os grupos"
          >
            <ChevronsUpDown className="w-3 h-3" />
            <span>Alternar Grupos</span>
          </button>
        </div>
      </div>

      {/* Navigation Accordion Categories */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800">
        {filteredCategories.map(cat => {
          const isOpen = searchTerm ? true : (openCategories[cat.id] ?? true);
          const CatIcon = cat.icon;
          const hasActiveItem = cat.items.some(it => it.id === currentView);

          return (
            <div key={cat.id} className="rounded-xl overflow-hidden bg-slate-900/40 border border-slate-800/40">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold tracking-wide transition-all ${
                  hasActiveItem
                    ? 'text-blue-300 bg-blue-950/30'
                    : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <CatIcon className={`w-3.5 h-3.5 shrink-0 ${hasActiveItem ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="truncate">{cat.name}</span>
                </div>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <span className="text-[10px] font-mono font-normal text-slate-400">
                    {cat.items.length}
                  </span>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Sub-items list */}
              {isOpen && (
                <div className="px-1.5 pb-1.5 pt-0.5 space-y-0.5">
                  {cat.items.map(item => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    const badgeVal = getBadgeValue(item.badgeKey);

                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all text-left group ${
                          isActive
                            ? 'bg-blue-600 text-white font-semibold shadow-sm shadow-blue-600/30'
                            : 'text-slate-300 hover:bg-slate-800/90 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <Icon
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                            }`}
                          />
                          <span className="truncate text-[11.5px]">{item.label}</span>
                        </div>

                        {badgeVal !== undefined && (
                          <span
                            className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-full shrink-0 ${
                              item.badgeColor || 'bg-slate-700 text-white'
                            }`}
                          >
                            {badgeVal}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Customer Store / Portal Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/90">
        <button
          onClick={() => setCurrentView('customer_store')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
            currentView === 'customer_store'
              ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md font-bold'
              : 'bg-slate-800/90 border-slate-700 text-amber-300 hover:bg-slate-800 hover:border-amber-400/50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Store className="w-4 h-4 text-amber-400" />
            <div className="text-left">
              <div className="leading-tight text-[11px] font-bold">Portal do Cliente</div>
              <div className="text-[9px] text-slate-400 font-normal">Site público de reservas</div>
            </div>
          </div>
          <span className="text-[9px] uppercase font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1 py-0.5 rounded">
            Live Store
          </span>
        </button>
      </div>
    </aside>
  );
};
