import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProductUnit,
  Customer,
  Rental,
  Reservation,
  SanitizationItem,
  MaintenanceItem,
  ReturnRecord,
  DeliveryOrder,
  FinancialTransaction,
  TeamMember,
  AuditLog,
  OperationalAlert,
  ViewMode,
  ProductStatus,
  ProductCondition
} from '../types';
import { initialProducts } from '../data/mockProducts';
import { initialCustomers } from '../data/mockCustomers';
import { initialRentals, initialReservations } from '../data/mockRentals';
import {
  initialSanitizations,
  initialMaintenances,
  initialReturns,
  initialDeliveries,
  initialFinancialTransactions,
  initialTeamMembers,
  initialAuditLogs,
  initialAlerts
} from '../data/mockOperations';

interface WhatsAppData {
  phone: string;
  customerName: string;
  defaultText?: string;
  type: 'confirmacao' | 'lembrete' | 'cobranca' | 'comprovante' | 'endereco';
  rentalNumber?: string;
  productName?: string;
  totalAmount?: number;
}

interface AppContextType {
  products: ProductUnit[];
  customers: Customer[];
  rentals: Rental[];
  reservations: Reservation[];
  sanitizations: SanitizationItem[];
  maintenances: MaintenanceItem[];
  returns: ReturnRecord[];
  deliveries: DeliveryOrder[];
  financialTransactions: FinancialTransaction[];
  teamMembers: TeamMember[];
  auditLogs: AuditLog[];
  alerts: OperationalAlert[];
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  currentUserRole: string;
  setCurrentUserRole: (role: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedRentalId: string | null;
  setSelectedRentalId: (id: string | null) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  whatsAppData: WhatsAppData | null;
  openWhatsAppModal: (data: WhatsAppData) => void;
  closeWhatsAppModal: () => void;
  isNewRentalModalOpen: boolean;
  setIsNewRentalModalOpen: (open: boolean) => void;
  isNewReservationModalOpen: boolean;
  setIsNewReservationModalOpen: (open: boolean) => void;
  isAvailabilityModalOpen: boolean;
  setIsAvailabilityModalOpen: (open: boolean) => void;

  // Actions
  updateProductStatus: (productId: string, newStatus: ProductStatus, reason?: string) => void;
  addProduct: (product: Omit<ProductUnit, 'id' | 'daysInactive' | 'rentalCount' | 'totalRevenue'>) => void;
  createRental: (rentalData: any) => void;
  createReservation: (reservationData: any) => void;
  convertReservationToRental: (reservationId: string) => void;
  cancelReservation: (reservationId: string) => void;
  processReturnConference: (returnId: string, destination: 'DISPONIVEL' | 'EM_HIGIENIZACAO' | 'EM_MANUTENCAO' | 'INDISPONIVEL', condition: ProductCondition, deduction?: number, notes?: string) => void;
  completeSanitization: (sanitizationId: string) => void;
  completeMaintenance: (maintenanceId: string, sendToSanitization: boolean) => void;
  createMaintenanceOrder: (data: any) => void;
  updateDeliveryStatus: (deliveryId: string, status: any) => void;
  dismissAlert: (alertId: string) => void;
  addAuditLog: (action: string, type: AuditLog['type'], details: string) => void;
  resetToInitialData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductUnit[]>(() => {
    const saved = localStorage.getItem('locakids_erp_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('locakids_erp_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [rentals, setRentals] = useState<Rental[]>(() => {
    const saved = localStorage.getItem('locakids_erp_rentals');
    return saved ? JSON.parse(saved) : initialRentals;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('locakids_erp_reservations');
    return saved ? JSON.parse(saved) : initialReservations;
  });

  const [sanitizations, setSanitizations] = useState<SanitizationItem[]>(() => {
    const saved = localStorage.getItem('locakids_erp_sanitizations');
    return saved ? JSON.parse(saved) : initialSanitizations;
  });

  const [maintenances, setMaintenances] = useState<MaintenanceItem[]>(() => {
    const saved = localStorage.getItem('locakids_erp_maintenances');
    return saved ? JSON.parse(saved) : initialMaintenances;
  });

  const [returns, setReturns] = useState<ReturnRecord[]>(() => {
    const saved = localStorage.getItem('locakids_erp_returns');
    return saved ? JSON.parse(saved) : initialReturns;
  });

  const [deliveries, setDeliveries] = useState<DeliveryOrder[]>(() => {
    const saved = localStorage.getItem('locakids_erp_deliveries');
    return saved ? JSON.parse(saved) : initialDeliveries;
  });

  const [financialTransactions, setFinancialTransactions] = useState<FinancialTransaction[]>(() => {
    const saved = localStorage.getItem('locakids_erp_financial');
    return saved ? JSON.parse(saved) : initialFinancialTransactions;
  });

  const [teamMembers] = useState<TeamMember[]>(initialTeamMembers);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('locakids_erp_audits');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [alerts, setAlerts] = useState<OperationalAlert[]>(() => {
    const saved = localStorage.getItem('locakids_erp_alerts');
    return saved ? JSON.parse(saved) : initialAlerts;
  });

  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [currentUserRole, setCurrentUserRole] = useState<string>('OWNER');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [whatsAppData, setWhatsAppData] = useState<WhatsAppData | null>(null);
  const [isNewRentalModalOpen, setIsNewRentalModalOpen] = useState(false);
  const [isNewReservationModalOpen, setIsNewReservationModalOpen] = useState(false);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('locakids_erp_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_rentals', JSON.stringify(rentals));
  }, [rentals]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_sanitizations', JSON.stringify(sanitizations));
  }, [sanitizations]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_maintenances', JSON.stringify(maintenances));
  }, [maintenances]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_returns', JSON.stringify(returns));
  }, [returns]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_deliveries', JSON.stringify(deliveries));
  }, [deliveries]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_financial', JSON.stringify(financialTransactions));
  }, [financialTransactions]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_audits', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('locakids_erp_alerts', JSON.stringify(alerts));
  }, [alerts]);

  const addAuditLog = (action: string, type: AuditLog['type'], details: string) => {
    const now = new Date();
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      user: `${currentUserRole} (Sistema)`,
      action,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      details,
      type
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateProductStatus = (productId: string, newStatus: ProductStatus, reason?: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            status: newStatus,
            currentRentalId: newStatus === 'DISPONIVEL' ? undefined : p.currentRentalId,
            currentCustomerName: newStatus === 'DISPONIVEL' ? undefined : p.currentCustomerName,
            returnDueDate: newStatus === 'DISPONIVEL' ? undefined : p.returnDueDate
          };
        }
        return p;
      })
    );
    const prod = products.find(p => p.id === productId);
    if (prod) {
      addAuditLog(`Status do produto ${prod.code} alterado para ${newStatus}`, 'estoque', reason || 'Atualização manual ou de fluxo');
    }
  };

  const addProduct = (productData: Omit<ProductUnit, 'id' | 'daysInactive' | 'rentalCount' | 'totalRevenue'>) => {
    const newProduct: ProductUnit = {
      ...productData,
      id: `prod-${Date.now()}`,
      daysInactive: 0,
      rentalCount: 0,
      totalRevenue: 0
    };
    setProducts(prev => [newProduct, ...prev]);
    addAuditLog(`Novo produto cadastrado: ${newProduct.code} - ${newProduct.name}`, 'estoque', `Categoria: ${newProduct.category}`);
  };

  const createRental = (data: any) => {
    const rentalNumber = `#LOC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRental: Rental = {
      id: `rent-${Date.now()}`,
      rentalNumber,
      customerId: data.customerId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerCpf: data.customerCpf || '000.000.000-00',
      items: data.items,
      startDate: data.startDate,
      expectedReturnDate: data.expectedReturnDate,
      dailyRateTotal: data.dailyRateTotal || data.items.reduce((acc: number, item: any) => acc + (item.dailyRate || 0), 0),
      totalAmount: data.totalAmount,
      depositAmount: data.depositAmount || 200,
      depositStatus: 'retida',
      paymentStatus: 'pago',
      paymentMethod: data.paymentMethod || 'pix',
      status: 'ativa',
      deliveryType: data.deliveryType || 'entrega',
      address: data.address || 'Balcão da loja',
      contractSigned: true,
      notes: data.notes || '',
      timeline: [
        { step: 'Locação confirmada e contrato assinado', timestamp: new Date().toLocaleString(), done: true },
        { step: 'Pagamento de aluguel e caução recebido', timestamp: new Date().toLocaleString(), done: true },
        { step: 'Itens separados e entregues ao cliente', timestamp: new Date().toLocaleString(), done: true },
        { step: 'Locação em andamento', timestamp: new Date().toLocaleString(), done: true }
      ]
    };

    setRentals(prev => [newRental, ...prev]);

    // RULE: All rented products MUST switch to ALUGADO immediately
    const itemIds = data.items.map((i: any) => i.productId);
    setProducts(prev =>
      prev.map(p => {
        if (itemIds.includes(p.id)) {
          return {
            ...p,
            status: 'ALUGADO',
            currentRentalId: newRental.id,
            currentCustomerId: newRental.customerId,
            currentCustomerName: newRental.customerName,
            returnDueDate: newRental.expectedReturnDate,
            rentalCount: p.rentalCount + 1,
            totalRevenue: p.totalRevenue + newRental.totalAmount
          };
        }
        return p;
      })
    );

    // Update customer stats
    setCustomers(prev =>
      prev.map(c => {
        if (c.id === data.customerId) {
          const newCount = c.rentalCount + 1;
          return {
            ...c,
            rentalCount: newCount,
            totalSpent: c.totalSpent + newRental.totalAmount,
            isRecurring: newCount > 1,
            lastRentalDate: newRental.startDate
          };
        }
        return c;
      })
    );

    // Add financial transactions
    const newTx: FinancialTransaction = {
      id: `fin-${Date.now()}`,
      type: 'receita_locacao',
      category: 'Locação',
      description: `Locação ${rentalNumber} - ${data.customerName}`,
      amount: newRental.totalAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'confirmado',
      paymentMethod: newRental.paymentMethod,
      customerName: data.customerName,
      referenceId: newRental.id
    };
    const newDepositTx: FinancialTransaction = {
      id: `fin-dep-${Date.now()}`,
      type: 'caucao_retida',
      category: 'Caução',
      description: `Caução de garantia ${rentalNumber}`,
      amount: newRental.depositAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'confirmado',
      paymentMethod: newRental.paymentMethod,
      customerName: data.customerName,
      referenceId: newRental.id
    };

    setFinancialTransactions(prev => [newTx, newDepositTx, ...prev]);

    // Schedule delivery if needed
    if (newRental.deliveryType === 'entrega') {
      const newDel: DeliveryOrder = {
        id: `del-${Date.now()}`,
        rentalId: newRental.id,
        customerName: newRental.customerName,
        phone: newRental.customerPhone,
        address: newRental.address,
        timeWindow: '09:00 - 12:00',
        date: newRental.startDate,
        items: newRental.items.map(i => ({ productCode: i.productCode, productName: i.productName })),
        driverName: 'João Silva (Motorista 01)',
        status: 'pronto'
      };
      setDeliveries(prev => [newDel, ...prev]);
    }

    addAuditLog(`Nova locação registrada ${rentalNumber}`, 'locacao', `Cliente: ${newRental.customerName}, Valor: R$ ${newRental.totalAmount}`);
  };

  const createReservation = (data: any) => {
    const resNumber = `#RES-${Math.floor(2000 + Math.random() * 8000)}`;
    const newRes: Reservation = {
      id: `res-${Date.now()}`,
      reservationNumber: resNumber,
      customerId: data.customerId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      items: data.items,
      startDate: data.startDate,
      endDate: data.endDate,
      totalDays: data.totalDays || 7,
      rentalValue: data.rentalValue,
      deliveryFee: data.deliveryFee || 0,
      depositValue: data.depositValue || 200,
      discount: data.discount || 0,
      totalAmount: data.totalAmount,
      paymentStatus: data.paymentStatus || 'pago',
      paymentMethod: data.paymentMethod || 'pix',
      status: 'confirmada',
      deliveryType: data.deliveryType || 'entrega',
      deliveryAddress: data.deliveryAddress,
      notes: data.notes || '',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setReservations(prev => [newRes, ...prev]);

    // RULE: Reserve items in inventory
    const itemIds = data.items.map((i: any) => i.productId);
    setProducts(prev =>
      prev.map(p => {
        if (itemIds.includes(p.id)) {
          return {
            ...p,
            status: 'RESERVADO',
            currentCustomerName: newRes.customerName
          };
        }
        return p;
      })
    );

    addAuditLog(`Reserva ${resNumber} criada para ${newRes.customerName}`, 'reserva', `Período: ${newRes.startDate} a ${newRes.endDate}`);
  };

  const convertReservationToRental = (reservationId: string) => {
    const res = reservations.find(r => r.id === reservationId);
    if (!res) return;

    createRental({
      customerId: res.customerId,
      customerName: res.customerName,
      customerPhone: res.customerPhone,
      items: res.items,
      startDate: res.startDate,
      expectedReturnDate: res.endDate,
      totalAmount: res.totalAmount,
      depositAmount: res.depositValue,
      paymentMethod: res.paymentMethod,
      deliveryType: res.deliveryType,
      address: res.deliveryAddress || 'Retirada em loja',
      notes: `Convertido da reserva ${res.reservationNumber}`
    });

    setReservations(prev =>
      prev.map(r => (r.id === reservationId ? { ...r, status: 'ativa' } : r))
    );

    addAuditLog(`Reserva ${res.reservationNumber} convertida em Locação ativa`, 'locacao', `Cliente: ${res.customerName}`);
  };

  const cancelReservation = (reservationId: string) => {
    const res = reservations.find(r => r.id === reservationId);
    if (!res) return;

    const itemIds = res.items.map(i => i.productId);
    setProducts(prev =>
      prev.map(p => {
        if (itemIds.includes(p.id)) {
          return {
            ...p,
            status: 'DISPONIVEL',
            currentCustomerName: undefined
          };
        }
        return p;
      })
    );

    setReservations(prev =>
      prev.map(r => (r.id === reservationId ? { ...r, status: 'cancelada' } : r))
    );

    addAuditLog(`Reserva ${res.reservationNumber} cancelada`, 'reserva', 'Produtos liberados de volta ao estoque');
  };

  const processReturnConference = (
    returnId: string,
    destination: 'DISPONIVEL' | 'EM_HIGIENIZACAO' | 'EM_MANUTENCAO' | 'INDISPONIVEL',
    condition: ProductCondition,
    deduction: number = 0,
    notes: string = ''
  ) => {
    const ret = returns.find(r => r.id === returnId);
    if (!ret) return;

    setReturns(prev =>
      prev.map(r =>
        r.id === returnId
          ? {
              ...r,
              destination,
              condition,
              depositDeduction: deduction,
              status: 'processado',
              notes: notes || r.notes
            }
          : r
      )
    );

    // Update product status
    setProducts(prev =>
      prev.map(p => {
        if (p.id === ret.productId) {
          return {
            ...p,
            status: destination,
            condition,
            currentRentalId: undefined,
            currentCustomerName: undefined,
            returnDueDate: undefined
          };
        }
        return p;
      })
    );

    // If destination is EM_HIGIENIZACAO, create sanitization item
    if (destination === 'EM_HIGIENIZACAO') {
      const newSan: SanitizationItem = {
        id: `san-${Date.now()}`,
        productId: ret.productId,
        productCode: ret.productCode,
        productName: ret.productName,
        category: 'Outros',
        returnDate: new Date().toISOString().split('T')[0],
        responsibleStaff: 'Carlos Sanitização',
        status: 'aguardando',
        chemicalUsed: 'Quaternário de Amônio 5ª Geração + Vapor 140°C',
        notes: `Devolvido de ${ret.customerName}. Condição: ${condition}`
      };
      setSanitizations(prev => [newSan, ...prev]);
    } else if (destination === 'EM_MANUTENCAO') {
      const newMaint: MaintenanceItem = {
        id: `maint-${Date.now()}`,
        productId: ret.productId,
        productCode: ret.productCode,
        productName: ret.productName,
        category: 'Outros',
        problemDescription: ret.damagesFound || 'Avaria identificada no checklist de devolução',
        entryDate: new Date().toISOString().split('T')[0],
        estimatedCompletion: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        technician: 'Roberto Técnico',
        vendor: 'Oficina Autorizada',
        cost: deduction || 80,
        partsUsed: ['Reparo geral'],
        status: 'aberta'
      };
      setMaintenances(prev => [newMaint, ...prev]);
    }

    addAuditLog(`Devolução conferida para ${ret.productCode}`, 'devolucao', `Destino: ${destination}, Condição: ${condition}`);
  };

  const completeSanitization = (sanitizationId: string) => {
    const item = sanitizations.find(s => s.id === sanitizationId);
    if (!item) return;

    setSanitizations(prev =>
      prev.map(s =>
        s.id === sanitizationId
          ? { ...s, status: 'concluido', completedAt: new Date().toLocaleString() }
          : s
      )
    );

    // RULE: Product goes back to DISPONIVEL immediately
    setProducts(prev =>
      prev.map(p => {
        if (p.id === item.productId) {
          return {
            ...p,
            status: 'DISPONIVEL',
            daysInactive: 0,
            condition: 'perfeito'
          };
        }
        return p;
      })
    );

    // Add alert
    const newAlert: OperationalAlert = {
      id: `alt-${Date.now()}`,
      type: 'success',
      title: '🟢 Produto Liberado',
      description: `${item.productCode} - ${item.productName} foi higienizado e retornou ao estoque disponível.`,
      timestamp: 'Agora',
      entityId: item.productId,
      entityType: 'product',
      actionLabel: 'Ver no Estoque',
      targetView: 'inventory'
    };
    setAlerts(prev => [newAlert, ...prev]);

    addAuditLog(`Higienização concluída para ${item.productCode}`, 'higienizacao', 'Produto liberado com sucesso para status DISPONÍVEL');
  };

  const completeMaintenance = (maintenanceId: string, sendToSanitization: boolean) => {
    const item = maintenances.find(m => m.id === maintenanceId);
    if (!item) return;

    setMaintenances(prev =>
      prev.map(m =>
        m.id === maintenanceId
          ? { ...m, status: 'concluid' as any, completedDate: new Date().toISOString().split('T')[0] }
          : m
      )
    );

    const nextStatus: ProductStatus = sendToSanitization ? 'EM_HIGIENIZACAO' : 'DISPONIVEL';

    setProducts(prev =>
      prev.map(p => {
        if (p.id === item.productId) {
          return {
            ...p,
            status: nextStatus,
            condition: 'bom',
            lastMaintenance: new Date().toISOString().split('T')[0]
          };
        }
        return p;
      })
    );

    if (sendToSanitization) {
      const newSan: SanitizationItem = {
        id: `san-${Date.now()}`,
        productId: item.productId,
        productCode: item.productCode,
        productName: item.productName,
        category: item.category,
        returnDate: new Date().toISOString().split('T')[0],
        responsibleStaff: 'Carlos Sanitização',
        status: 'aguardando',
        chemicalUsed: 'Limpeza pós-manutenção hospitalar',
        notes: 'Higienizar resíduos de graxa/ferramentas antes de liberar'
      };
      setSanitizations(prev => [newSan, ...prev]);
    }

    addAuditLog(`Manutenção de ${item.productCode} finalizada`, 'manutencao', `Encaminhado para: ${nextStatus}`);
  };

  const createMaintenanceOrder = (data: any) => {
    const newMaint: MaintenanceItem = {
      id: `maint-${Date.now()}`,
      productId: data.productId,
      productCode: data.productCode,
      productName: data.productName,
      category: data.category || 'Outros',
      problemDescription: data.problemDescription,
      entryDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: data.estimatedCompletion,
      technician: data.technician || 'Roberto Técnico',
      vendor: data.vendor || 'Oficina Especializada',
      cost: data.cost || 0,
      partsUsed: data.partsUsed || [],
      status: 'em_manutencao'
    };
    setMaintenances(prev => [newMaint, ...prev]);

    setProducts(prev =>
      prev.map(p => (p.id === data.productId ? { ...p, status: 'EM_MANUTENCAO' } : p))
    );

    addAuditLog(`Ordem de serviço aberta para ${data.productCode}`, 'manutencao', data.problemDescription);
  };

  const updateDeliveryStatus = (deliveryId: string, status: any) => {
    setDeliveries(prev =>
      prev.map(d => (d.id === deliveryId ? { ...d, status } : d))
    );
    addAuditLog(`Status de entrega atualizado para ${status}`, 'locacao', `ID: ${deliveryId}`);
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const openWhatsAppModal = (data: WhatsAppData) => {
    setWhatsAppData(data);
  };

  const closeWhatsAppModal = () => {
    setWhatsAppData(null);
  };

  const resetToInitialData = () => {
    setProducts(initialProducts);
    setCustomers(initialCustomers);
    setRentals(initialRentals);
    setReservations(initialReservations);
    setSanitizations(initialSanitizations);
    setMaintenances(initialMaintenances);
    setReturns(initialReturns);
    setDeliveries(initialDeliveries);
    setFinancialTransactions(initialFinancialTransactions);
    setAuditLogs(initialAuditLogs);
    setAlerts(initialAlerts);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        products,
        customers,
        rentals,
        reservations,
        sanitizations,
        maintenances,
        returns,
        deliveries,
        financialTransactions,
        teamMembers,
        auditLogs,
        alerts,
        currentView,
        setCurrentView,
        currentUserRole,
        setCurrentUserRole,
        selectedProductId,
        setSelectedProductId,
        selectedRentalId,
        setSelectedRentalId,
        isSearchModalOpen,
        setIsSearchModalOpen,
        whatsAppData,
        openWhatsAppModal,
        closeWhatsAppModal,
        isNewRentalModalOpen,
        setIsNewRentalModalOpen,
        isNewReservationModalOpen,
        setIsNewReservationModalOpen,
        isAvailabilityModalOpen,
        setIsAvailabilityModalOpen,
        updateProductStatus,
        addProduct,
        createRental,
        createReservation,
        convertReservationToRental,
        cancelReservation,
        processReturnConference,
        completeSanitization,
        completeMaintenance,
        createMaintenanceOrder,
        updateDeliveryStatus,
        dismissAlert,
        addAuditLog,
        resetToInitialData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
