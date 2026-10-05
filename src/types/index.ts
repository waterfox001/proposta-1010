export type ProductStatus =
  | 'DISPONIVEL'
  | 'RESERVADO'
  | 'ALUGADO'
  | 'EM_HIGIENIZACAO'
  | 'EM_MANUTENCAO'
  | 'DANIFICADO'
  | 'PERDIDO'
  | 'INDISPONIVEL';

export type ProductCategory =
  | 'Cadeirinhas'
  | 'Bebê-conforto'
  | 'Carrinhos'
  | 'Berços'
  | 'Cercadinhos'
  | 'Alimentação'
  | 'Banho'
  | 'Brinquedos'
  | 'Acessórios'
  | 'Outros';

export type ProductCondition =
  | 'perfeito'
  | 'bom'
  | 'desgaste'
  | 'danificado'
  | 'incompleto';

export interface ProductUnit {
  id: string;
  code: string; // e.g. CC-024, CB-014, BP-012
  sku: string;
  name: string;
  category: ProductCategory;
  brand: string;
  model: string;
  serialNumber?: string;
  location: string; // e.g. "Prateleira A-02", "Doca 1", "Showroom"
  purchaseValue: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  depositValue: number; // Caução sugerida
  status: ProductStatus;
  condition: ProductCondition;
  photoUrl: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  daysInactive: number; // dias parado
  rentalCount: number;
  totalRevenue: number;
  currentRentalId?: string;
  currentCustomerId?: string;
  currentCustomerName?: string;
  returnDueDate?: string;
  notes?: string;
  includedAccessories: string[];
}

export interface Customer {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  birthDate: string;
  notes?: string;
  totalSpent: number;
  rentalCount: number;
  isRecurring: boolean;
  status: 'ativo' | 'inadimplente' | 'bloqueado';
  lastRentalDate?: string;
}

export type ReservationStatus =
  | 'orcamento'
  | 'aguardando_pagamento'
  | 'reservada'
  | 'confirmada'
  | 'em_preparacao'
  | 'retirada_agendada'
  | 'entregue'
  | 'ativa'
  | 'devolucao_pendente'
  | 'concluida'
  | 'cancelada';

export interface ReservationItem {
  productId: string;
  productCode: string;
  productName: string;
  category: ProductCategory;
  dailyRate: number;
}

export interface Reservation {
  id: string;
  reservationNumber: string; // e.g. #RES-2041
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: ReservationItem[];
  startDate: string;
  endDate: string;
  totalDays: number;
  rentalValue: number;
  deliveryFee: number;
  depositValue: number;
  discount: number;
  totalAmount: number;
  paymentStatus: 'pendente' | 'pago' | 'parcial' | 'estornado';
  paymentMethod: 'pix' | 'cartao' | 'dinheiro' | 'transferencia';
  status: ReservationStatus;
  deliveryType: 'entrega' | 'retirada';
  deliveryAddress?: string;
  notes?: string;
  createdAt: string;
}

export type RentalStatus =
  | 'preparacao'
  | 'em_rota'
  | 'ativa'
  | 'devolucao_hoje'
  | 'atrasada'
  | 'devolvida'
  | 'finalizada';

export interface RentalTimelineStep {
  step: string;
  timestamp: string;
  done: boolean;
  note?: string;
}

export interface Rental {
  id: string;
  rentalNumber: string; // e.g. #LOC-1024
  reservationId?: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerCpf: string;
  items: {
    productId: string;
    productCode: string;
    productName: string;
    category: ProductCategory;
    dailyRate: number;
  }[];
  startDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  dailyRateTotal: number;
  totalAmount: number;
  depositAmount: number;
  depositStatus: 'retida' | 'devolvida' | 'descontada_dano' | 'isenta';
  depositDeductionReason?: string;
  depositDeductionAmount?: number;
  paymentStatus: 'pago' | 'pendente' | 'atrasado' | 'estornado';
  paymentMethod: 'pix' | 'cartao' | 'dinheiro' | 'transferencia';
  status: RentalStatus;
  deliveryType: 'entrega' | 'retirada';
  address: string;
  contractSigned: boolean;
  contractUrl?: string;
  notes?: string;
  timeline: RentalTimelineStep[];
}

export interface DeliveryOrder {
  id: string;
  rentalId: string;
  customerName: string;
  phone: string;
  address: string;
  timeWindow: string;
  date: string;
  items: { productCode: string; productName: string }[];
  driverName: string;
  status: 'aguardando' | 'separando' | 'pronto' | 'em_rota' | 'entregue' | 'falha' | 'reagendada';
  notes?: string;
}

export interface ReturnRecord {
  id: string;
  rentalId: string;
  rentalNumber: string;
  productId: string;
  productCode: string;
  productName: string;
  customerName: string;
  returnDate: string;
  condition: ProductCondition;
  accessoriesReturned: string[];
  accessoriesMissing: string[];
  damagesFound?: string;
  additionalCharge?: number;
  depositDeduction?: number;
  destination: 'DISPONIVEL' | 'EM_HIGIENIZACAO' | 'EM_MANUTENCAO' | 'INDISPONIVEL';
  inspectorName: string;
  status: 'pendente_conferencia' | 'conferido' | 'processado';
  notes?: string;
}

export interface SanitizationItem {
  id: string;
  productId: string;
  productCode: string;
  productName: string;
  category: ProductCategory;
  returnDate: string;
  responsibleStaff: string;
  status: 'aguardando' | 'em_andamento' | 'concluido';
  startedAt?: string;
  completedAt?: string;
  chemicalUsed: string;
  notes?: string;
}

export interface MaintenanceItem {
  id: string;
  productId: string;
  productCode: string;
  productName: string;
  category: ProductCategory;
  problemDescription: string;
  entryDate: string;
  estimatedCompletion: string;
  completedDate?: string;
  technician: string;
  vendor: string;
  cost: number;
  partsUsed: string[];
  status: 'aberta' | 'em_analise' | 'aguardando_peca' | 'em_manutencao' | 'concluida';
  notes?: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'receita_locacao' | 'taxa_entrega' | 'caucao_retida' | 'caucao_estorno' | 'despesa_manutencao' | 'despesa_higienizacao' | 'outras_despesas';
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'confirmado' | 'pendente' | 'atrasado' | 'estornado';
  paymentMethod: 'pix' | 'cartao' | 'dinheiro' | 'transferencia';
  referenceId?: string;
  customerName?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'OWNER' | 'ADMIN' | 'GERENTE' | 'OPERACIONAL' | 'FINANCEIRO' | 'ATENDENTE';
  avatar: string;
  phone: string;
  active: boolean;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  date: string;
  time: string;
  details: string;
  type: 'estoque' | 'locacao' | 'reserva' | 'financeiro' | 'manutencao' | 'devolucao' | 'higienizacao';
}

export interface OperationalAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: string;
  entityId?: string;
  entityType?: 'product' | 'rental' | 'reservation' | 'return';
  actionLabel?: string;
  targetView?: string;
}

export type ViewMode =
  // Visão Geral
  | 'dashboard'
  | 'executive_dashboard'
  | 'okrs_goals'
  | 'business_intelligence'
  | 'alerts_center'
  // Comercial
  | 'commercial_crm'
  | 'leads'
  | 'sales_pipeline'
  | 'follow_ups'
  | 'proposals'
  | 'commercial_goals'
  // Operação
  | 'rentals'
  | 'reservations'
  | 'calendar'
  | 'agenda'
  | 'operational_hub'
  | 'deliveries'
  | 'returns'
  | 'sanitization'
  | 'maintenance'
  | 'damages_incidents'
  // Estoque & Ativos
  | 'inventory'
  | 'products_assets'
  | 'categories'
  | 'availability'
  | 'inventory_intelligence'
  | 'demand_forecast'
  | 'purchases_restock'
  | 'suppliers'
  // Clientes
  | 'customers'
  | 'customer_360'
  | 'rental_history'
  | 'loyalty_program'
  | 'nps_satisfaction'
  | 'inactive_customers'
  | 'vip_customers'
  // Financeiro
  | 'financial'
  | 'accounts_receivable'
  | 'accounts_payable'
  | 'cash_flow'
  | 'income_expenses'
  | 'deposits_held'
  | 'overdue_defaults'
  | 'profitability'
  | 'dre_statement'
  | 'commissions'
  // Logística
  | 'logistics_map'
  | 'driver_tracking'
  | 'routes_logistics'
  | 'drivers_list'
  | 'logistics_incidents'
  | 'logistics_performance'
  // Gestão
  | 'team'
  | 'tasks_management'
  | 'productivity'
  | 'roles_permissions'
  | 'audit_logs'
  // Relatórios & BI
  | 'reports'
  | 'bi_analytics'
  | 'bi_financial'
  | 'bi_commercial'
  | 'bi_inventory'
  | 'bi_operational'
  | 'bi_customers'
  | 'bi_logistics'
  | 'rankings_kpis'
  // Marketing
  | 'marketing_origins'
  | 'acquisition_channels'
  | 'conversion_funnel'
  | 'channel_roi'
  | 'marketing_campaigns'
  // Automações
  | 'automations'
  | 'business_rules'
  | 'system_notifications'
  | 'automated_reminders'
  // Portal do Cliente
  | 'customer_store'
  | 'online_booking'
  | 'customer_account'
  | 'customer_contracts'
  | 'tracking_delivery'
  // Documentos
  | 'documents_vault'
  | 'contracts_docs'
  | 'invoices_nf'
  | 'inspection_photos'
  // Configurações
  | 'company_settings'
  | 'users_settings'
  | 'pricing_settings'
  | 'policies_settings'
  | 'integrations_settings';
