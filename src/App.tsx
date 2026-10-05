import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';

// Modals & Drawers
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { WhatsAppModal } from './components/modals/WhatsAppModal';
import { AIAssistantDrawer } from './components/modals/AIAssistantDrawer';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { NewRentalModal } from './components/modals/NewRentalModal';
import { AvailabilityCheckerModal } from './components/modals/AvailabilityCheckerModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { ExecutiveDashboardView } from './components/views/ExecutiveDashboardView';
import { OkrsGoalsView } from './components/views/OkrsGoalsView';
import { BusinessIntelligenceView } from './components/views/BusinessIntelligenceView';
import { CommercialPipelineView } from './components/views/CommercialPipelineView';
import { RentalsView } from './components/views/RentalsView';
import { ReservationsView } from './components/views/ReservationsView';
import { CalendarView } from './components/views/CalendarView';
import { OperationalAgendaView } from './components/views/OperationalAgendaView';
import { OperationalHubView } from './components/views/OperationalHubView';
import { DeliveriesView } from './components/views/DeliveriesView';
import { ReturnsView } from './components/views/ReturnsView';
import { SanitizationView } from './components/views/SanitizationView';
import { MaintenanceView } from './components/views/MaintenanceView';
import { InventoryView } from './components/views/InventoryView';
import { CategoriesView } from './components/views/CategoriesView';
import { AvailabilityView } from './components/views/AvailabilityView';
import { InventoryIntelligenceView } from './components/views/InventoryIntelligenceView';
import { CustomersView } from './components/views/CustomersView';
import { Customer360View } from './components/views/Customer360View';
import { FinancialView } from './components/views/FinancialView';
import { FinancialErpView } from './components/views/FinancialErpView';
import { LogisticsMapView } from './components/views/LogisticsMapView';
import { TeamAuditingView } from './components/views/TeamAuditingView';
import { ReportsRankingsView } from './components/views/ReportsRankingsView';
import { MarketingChannelsView } from './components/views/MarketingChannelsView';
import { AutomationsView } from './components/views/AutomationsView';
import { DocumentsVaultView } from './components/views/DocumentsVaultView';
import { SettingsErpView } from './components/views/SettingsErpView';
import { CustomerStoreView } from './components/views/CustomerStoreView';

const MainAppContent: React.FC = () => {
  const { currentView } = useApp();
  const [isAIOpen, setIsAIOpen] = useState(false);

  // If customer store mode is active, render full-screen client experience
  if (
    currentView === 'customer_store' ||
    currentView === 'online_booking' ||
    currentView === 'customer_account' ||
    currentView === 'customer_contracts' ||
    currentView === 'tracking_delivery'
  ) {
    return <CustomerStoreView />;
  }

  const renderActiveView = () => {
    switch (currentView) {
      // 1. VISÃO GERAL
      case 'dashboard':
      case 'alerts_center':
        return <DashboardView />;
      case 'executive_dashboard':
        return <ExecutiveDashboardView />;
      case 'okrs_goals':
        return <OkrsGoalsView subTab="okrs" />;
      case 'business_intelligence':
        return <BusinessIntelligenceView />;

      // 2. COMERCIAL
      case 'commercial_crm':
        return <CommercialPipelineView subTab="crm" />;
      case 'leads':
        return <CommercialPipelineView subTab="leads" />;
      case 'sales_pipeline':
        return <CommercialPipelineView subTab="pipeline" />;
      case 'follow_ups':
        return <CommercialPipelineView subTab="follow_ups" />;
      case 'proposals':
        return <CommercialPipelineView subTab="propostas" />;
      case 'commercial_goals':
        return <CommercialPipelineView subTab="metas" />;

      // 3. OPERAÇÃO
      case 'rentals':
        return <RentalsView />;
      case 'reservations':
        return <ReservationsView />;
      case 'calendar':
        return <CalendarView />;
      case 'agenda':
        return <OperationalAgendaView />;
      case 'operational_hub':
        return <OperationalHubView />;
      case 'deliveries':
        return <DeliveriesView />;
      case 'returns':
      case 'damages_incidents':
        return <ReturnsView />;
      case 'sanitization':
        return <SanitizationView />;
      case 'maintenance':
        return <MaintenanceView />;

      // 4. ESTOQUE & ATIVOS
      case 'inventory':
      case 'products_assets':
        return <InventoryView />;
      case 'categories':
        return <CategoriesView />;
      case 'availability':
        return <AvailabilityView />;
      case 'inventory_intelligence':
        return <InventoryIntelligenceView subTab="inteligencia" />;
      case 'demand_forecast':
        return <InventoryIntelligenceView subTab="demanda" />;
      case 'purchases_restock':
        return <InventoryIntelligenceView subTab="compras" />;
      case 'suppliers':
        return <InventoryIntelligenceView subTab="fornecedores" />;

      // 5. CLIENTES
      case 'customers':
      case 'rental_history':
      case 'inactive_customers':
      case 'vip_customers':
        return <CustomersView subTab={currentView} />;
      case 'customer_360':
      case 'loyalty_program':
      case 'nps_satisfaction':
        return <Customer360View subTab={currentView} />;

      // 6. FINANCEIRO
      case 'financial':
      case 'accounts_receivable':
      case 'accounts_payable':
      case 'cash_flow':
      case 'income_expenses':
      case 'deposits_held':
      case 'overdue_defaults':
      case 'profitability':
      case 'dre_statement':
      case 'commissions':
        return <FinancialErpView subTab={currentView} />;

      // 7. LOGÍSTICA
      case 'logistics_map':
      case 'driver_tracking':
      case 'routes_logistics':
      case 'drivers_list':
      case 'logistics_incidents':
      case 'logistics_performance':
        return <LogisticsMapView subTab={currentView} />;

      // 8. GESTÃO
      case 'team':
      case 'roles_permissions':
      case 'audit_logs':
        return <TeamAuditingView subTab={currentView} />;
      case 'tasks_management':
      case 'productivity':
        return <OkrsGoalsView subTab={currentView} />;

      // 9. RELATÓRIOS & BI
      case 'reports':
      case 'bi_analytics':
      case 'bi_financial':
      case 'bi_commercial':
      case 'bi_inventory':
      case 'bi_operational':
      case 'bi_customers':
      case 'bi_logistics':
      case 'rankings_kpis':
        return <ReportsRankingsView subTab={currentView} />;

      // 10. MARKETING
      case 'marketing_origins':
      case 'acquisition_channels':
      case 'conversion_funnel':
      case 'channel_roi':
      case 'marketing_campaigns':
        return <MarketingChannelsView subTab={currentView} />;

      // 11. AUTOMAÇÕES
      case 'automations':
      case 'business_rules':
      case 'system_notifications':
      case 'automated_reminders':
        return <AutomationsView subTab={currentView} />;

      // 12. DOCUMENTOS
      case 'documents_vault':
      case 'contracts_docs':
      case 'invoices_nf':
      case 'inspection_photos':
        return <DocumentsVaultView subTab={currentView} />;

      // 13. CONFIGURAÇÕES
      case 'company_settings':
      case 'users_settings':
      case 'pricing_settings':
      case 'policies_settings':
      case 'integrations_settings':
        return <SettingsErpView subTab={currentView} />;

      default:
        return <ExecutiveDashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar onOpenAI={() => setIsAIOpen(true)} />

        <main className="flex-1 overflow-y-auto bg-slate-50">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal />
      <WhatsAppModal />
      <ProductDetailModal />
      <NewRentalModal />
      <AvailabilityCheckerModal />
      <AIAssistantDrawer isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
