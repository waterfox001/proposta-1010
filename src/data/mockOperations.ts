import {
  SanitizationItem,
  MaintenanceItem,
  ReturnRecord,
  DeliveryOrder,
  FinancialTransaction,
  TeamMember,
  AuditLog,
  OperationalAlert
} from '../types';

export const initialSanitizations: SanitizationItem[] = [
  {
    id: 'san-001',
    productId: 'prod-cc-005',
    productCode: 'CC-009',
    productName: 'Cadeirinha Progress Reclinável Cosco',
    category: 'Cadeirinhas',
    returnDate: '2026-10-05',
    responsibleStaff: 'Carlos Sanitização',
    status: 'em_andamento',
    chemicalUsed: 'Quaternário de Amônio 5ª Geração + Vapor 140°C',
    startedAt: '2026-10-05 09:30',
    notes: 'Aspiração profunda e higienização antibacteriana em execução.'
  },
  {
    id: 'san-002',
    productId: 'prod-cb-005',
    productCode: 'CB-027',
    productName: 'Carrinho Liteway Guarda-Chuva Chicco',
    category: 'Carrinhos',
    returnDate: '2026-10-05',
    responsibleStaff: 'Carlos Sanitização',
    status: 'aguardando',
    chemicalUsed: 'Detergente Enzimático Hospitalar + Hipoclorito neutro',
    notes: 'Aguardando secagem da cadeira anterior para iniciar lavagem de rodas e tecidos.'
  },
  {
    id: 'san-003',
    productId: 'prod-al-004',
    productCode: 'AL-022',
    productName: 'Assento Elevatório Pocket Snack Chicco',
    category: 'Alimentação',
    returnDate: '2026-10-04',
    responsibleStaff: 'Márcia Higiene',
    status: 'em_andamento',
    chemicalUsed: 'Álcool Isopropílico 70% + Desengordurante Alimentício',
    startedAt: '2026-10-05 08:45',
    notes: 'Desinfecção de bandeja plástica e fivelas de segurança.'
  },
  {
    id: 'san-004',
    productId: 'prod-bq-004',
    productCode: 'BQ-021',
    productName: 'Tapete de Atividades Gymini Deluxe',
    category: 'Brinquedos',
    returnDate: '2026-10-04',
    responsibleStaff: 'Márcia Higiene',
    status: 'aguardando',
    chemicalUsed: 'Lavagem com sabão neutro hipoalergênico e luz UV-C',
    notes: 'Peças de pelúcia destacadas para ciclo suave.'
  }
];

export const initialMaintenances: MaintenanceItem[] = [
  {
    id: 'maint-001',
    productId: 'prod-cc-006',
    productCode: 'CC-012',
    productName: 'Cadeirinha 4Ever 4-in-1 Graco',
    category: 'Cadeirinhas',
    problemDescription: 'Presilha central do cinto de 5 pontos travando levemente ao soltar.',
    entryDate: '2026-10-02',
    estimatedCompletion: '2026-10-08',
    technician: 'Roberto Técnico',
    vendor: 'Graco Brasil Distribuidora',
    cost: 140,
    partsUsed: ['Conjunto de trava central Graco DLX'],
    status: 'aguardando_peca',
    notes: 'Peça despachada via Sedex com código de rastreio AA9281928BR.'
  },
  {
    id: 'maint-002',
    productId: 'prod-bn-003',
    productCode: 'BN-009',
    productName: 'Banheira Cuddle & Bubble Chicco',
    category: 'Banho',
    problemDescription: 'Válvula de vedação inferior de escoamento ressecada com vazamento sutil.',
    entryDate: '2026-10-03',
    estimatedCompletion: '2026-10-07',
    technician: 'Roberto Técnico',
    vendor: 'Chicco Assistência Técnica',
    cost: 65,
    partsUsed: ['Anel de vedação de silicone 45mm'],
    status: 'em_manutencao',
    notes: 'Substituição da borracha em andamento na bancada.'
  },
  {
    id: 'maint-003',
    productId: 'prod-bp-001',
    productCode: 'BP-012',
    productName: 'Berço Portátil Pack n Play Graco',
    category: 'Berços',
    problemDescription: 'Rasgo de 8cm na tela lateral de malha respirável identificado na devolução.',
    entryDate: '2026-10-04',
    estimatedCompletion: '2026-10-10',
    technician: 'Ateliê Costura Fina',
    vendor: 'Tapeçaria Especializada Kids',
    cost: 90,
    partsUsed: ['Tela de poliamida reforçada original'],
    status: 'em_analise',
    notes: 'Custo repassado para a caução da locação #LOC-1018.'
  }
];

export const initialReturns: ReturnRecord[] = [
  {
    id: 'ret-001',
    rentalId: 'rent-1018',
    rentalNumber: '#LOC-1018',
    productId: 'prod-bp-001',
    productCode: 'BP-012',
    productName: 'Berço Portátil Pack n Play',
    customerName: 'Aline Barbosa Fontes',
    returnDate: '2026-10-04',
    condition: 'danificado',
    accessoriesReturned: ['Colchonete', 'Bolsa'],
    accessoriesMissing: [],
    damagesFound: 'Rasgo na tela lateral de 8cm.',
    additionalCharge: 90,
    depositDeduction: 90,
    destination: 'EM_MANUTENCAO',
    inspectorName: 'Lucas Conferência',
    status: 'conferido',
    notes: 'Caução original era R$ 180. Devolvido R$ 90 para a cliente e retido R$ 90 para conserto.'
  },
  {
    id: 'ret-002',
    rentalId: 'rent-1019',
    rentalNumber: '#LOC-1019',
    productId: 'prod-cc-005',
    productCode: 'CC-009',
    productName: 'Cadeirinha Progress Reclinável',
    customerName: 'Danilo Alcantara',
    returnDate: '2026-10-05',
    condition: 'bom',
    accessoriesReturned: ['Cinto 5 pontos', 'Almofada redutora'],
    accessoriesMissing: [],
    destination: 'EM_HIGIENIZACAO',
    inspectorName: 'Lucas Conferência',
    status: 'processado',
    notes: 'Todos os acessórios intactos. Encaminhado imediatamente para higienização.'
  },
  {
    id: 'ret-003',
    rentalId: 'rent-1031',
    rentalNumber: '#LOC-1031',
    productId: 'prod-bn-001',
    productCode: 'BN-003',
    productName: 'Banheira Splash com Trocador',
    customerName: 'Renata Vasconcellos Silva',
    returnDate: '2026-10-05',
    condition: 'perfeito',
    accessoriesReturned: ['Mangueira', 'Trocador acolchoado'],
    accessoriesMissing: [],
    destination: 'EM_HIGIENIZACAO',
    inspectorName: 'Lucas Conferência',
    status: 'pendente_conferencia',
    notes: 'Chegando na base às 16:30 com o motorista João.'
  }
];

export const initialDeliveries: DeliveryOrder[] = [
  {
    id: 'del-001',
    rentalId: 'rent-1024',
    customerName: 'Mariana Costa Silveira',
    phone: '(11) 98452-9182',
    address: 'Rua Bela Cintra, 1420, Apto 82 - Jardins',
    timeWindow: '09:00 - 11:00',
    date: '2026-10-05',
    items: [{ productCode: 'CC-024', productName: 'Cadeirinha Matrix Evolution K' }],
    driverName: 'João Silva (Motorista 01)',
    status: 'entregue',
    notes: 'Entregue com sucesso e instalada no veículo Hyundai Creta da cliente.'
  },
  {
    id: 'del-002',
    rentalId: 'res-2045',
    customerName: 'Ana Beatriz Ramos',
    phone: '(11) 98561-2390',
    address: 'Av. Brigadeiro Luis Antonio, 3400 - Jardim Paulista',
    timeWindow: '09:30 - 11:30',
    date: '2026-10-06',
    items: [{ productCode: 'BC-006', productName: 'Bebê Conforto Aton S2 i-Size Cybex' }],
    driverName: 'João Silva (Motorista 01)',
    status: 'separando',
    notes: 'Separar base Isofix e verificar validade da capa solar.'
  },
  {
    id: 'del-003',
    rentalId: 'rent-1031',
    customerName: 'Renata Vasconcellos Silva',
    phone: '(11) 98443-2211',
    address: 'Alameda Lorena, 1890 - Jardins (COLETA)',
    timeWindow: '14:00 - 16:00',
    date: '2026-10-05',
    items: [{ productCode: 'BN-003', productName: 'Banheira Splash Burigotto' }],
    driverName: 'Marcos Santos (Motorista 02)',
    status: 'em_rota',
    notes: 'Coleta agendada com a babá da cliente na portaria.'
  }
];

export const initialFinancialTransactions: FinancialTransaction[] = [
  {
    id: 'fin-001',
    type: 'receita_locacao',
    category: 'Locação',
    description: 'Locação #LOC-1024 - Mariana Costa',
    amount: 245,
    date: '2026-10-03',
    status: 'confirmado',
    paymentMethod: 'pix',
    customerName: 'Mariana Costa Silveira'
  },
  {
    id: 'fin-002',
    type: 'caucao_retida',
    category: 'Caução',
    description: 'Caução garantia #LOC-1024 - CC-024',
    amount: 200,
    date: '2026-10-03',
    status: 'confirmado',
    paymentMethod: 'pix',
    customerName: 'Mariana Costa Silveira'
  },
  {
    id: 'fin-003',
    type: 'receita_locacao',
    category: 'Locação',
    description: 'Locação #LOC-1025 - Carlos Eduardo Mendes',
    amount: 770,
    date: '2026-09-30',
    status: 'confirmado',
    paymentMethod: 'cartao',
    customerName: 'Carlos Eduardo Mendes'
  },
  {
    id: 'fin-004',
    type: 'despesa_manutencao',
    category: 'Manutenção',
    description: 'Peça reposição Graco DLX trava central',
    amount: -140,
    date: '2026-10-02',
    status: 'confirmado',
    paymentMethod: 'pix'
  },
  {
    id: 'fin-005',
    type: 'receita_locacao',
    category: 'Locação',
    description: 'Reserva #RES-2045 - Ana Beatriz Ramos',
    amount: 240,
    date: '2026-10-04',
    status: 'confirmado',
    paymentMethod: 'pix',
    customerName: 'Ana Beatriz Ramos'
  },
  {
    id: 'fin-006',
    type: 'despesa_higienizacao',
    category: 'Higienização',
    description: 'Galão Quaternário de Amônio 5L + Detergente Hospitalar',
    amount: -320,
    date: '2026-10-01',
    status: 'confirmado',
    paymentMethod: 'cartao'
  }
];

export const initialTeamMembers: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Diretoria Executiva',
    email: 'diretoria@locacaoinfantil.com.br',
    role: 'OWNER',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    phone: '(11) 98888-0001',
    active: true
  },
  {
    id: 'team-002',
    name: 'Ricardo Silveira',
    email: 'ricardo.gerencia@locacaoinfantil.com.br',
    role: 'GERENTE',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    phone: '(11) 98888-0002',
    active: true
  },
  {
    id: 'team-003',
    name: 'Aline Souza',
    email: 'aline.atendimento@locacaoinfantil.com.br',
    role: 'ATENDENTE',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    phone: '(11) 98888-0003',
    active: true
  },
  {
    id: 'team-004',
    name: 'Roberto Técnico',
    email: 'roberto.manutencao@locacaoinfantil.com.br',
    role: 'OPERACIONAL',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '(11) 98888-0004',
    active: true
  },
  {
    id: 'team-005',
    name: 'Carolina Prado',
    email: 'financeiro@locacaoinfantil.com.br',
    role: 'FINANCEIRO',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
    phone: '(11) 98888-0005',
    active: true
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'aud-001',
    user: 'Ricardo Silveira (Gerente)',
    action: 'Alterou o status da Cadeirinha CC-024 para ALUGADO',
    date: '2026-10-05',
    time: '10:15',
    details: 'Vinculado à locação ativa #LOC-1024 (Mariana Costa).',
    type: 'estoque'
  },
  {
    id: 'aud-002',
    user: 'Mariana Santos (Operacional)',
    action: 'Registrou devolução e conferência da locação #LOC-1018',
    date: '2026-10-04',
    time: '16:40',
    details: 'Berço BP-012 com rasgo na tela; retido R$ 90 da caução para manutenção.',
    type: 'devolucao'
  },
  {
    id: 'aud-003',
    user: 'Aline Souza (Atendente)',
    action: 'Confirmou reserva #RES-2045 após confirmação do Pix',
    date: '2026-10-04',
    time: '11:20',
    details: 'Cliente Ana Beatriz Ramos. Bebê Conforto BC-006 reservado para 06/10.',
    type: 'reserva'
  },
  {
    id: 'aud-004',
    user: 'Carlos Sanitização (Operacional)',
    action: 'Finalizou higienização da Cadeirinha CC-025',
    date: '2026-10-03',
    time: '17:10',
    details: 'Produto liberado automaticamente para status DISPONIVEL no estoque.',
    type: 'higienizacao'
  }
];

export const initialAlerts: OperationalAlert[] = [
  {
    id: 'alt-001',
    type: 'critical',
    title: '🔴 Locação em Atraso',
    description: 'Carrinho de bebê #CB-038 (YOYO² Taupe) deveria ter sido devolvido ontem (04/10) por Rodrigo Santoro.',
    timestamp: 'Há 1 dia',
    entityId: 'rent-1022',
    entityType: 'rental',
    actionLabel: 'Cobrar via WhatsApp',
    targetView: 'rentals'
  },
  {
    id: 'alt-002',
    type: 'warning',
    title: '🟠 Devoluções Hoje',
    description: 'Banheira Splash #BN-003 (Renata Vasconcellos) com coleta agendada para hoje até 16:00.',
    timestamp: 'Hoje',
    entityId: 'rent-1031',
    entityType: 'rental',
    actionLabel: 'Ver Agendamento',
    targetView: 'deliveries'
  },
  {
    id: 'alt-003',
    type: 'info',
    title: '🟠 Reserva Próxima',
    description: 'Cliente Ana Beatriz possui reserva #RES-2045 com entrega agendada para amanhã cedo.',
    timestamp: 'Amanhã',
    entityId: 'res-2045',
    entityType: 'reservation',
    actionLabel: 'Separar Produto',
    targetView: 'reservations'
  },
  {
    id: 'alt-004',
    type: 'critical',
    title: '🔴 Produto Danificado na Devolução',
    description: 'Berço portátil #BP-012 apresentou problema de rasgo na tela e foi para manutenção.',
    timestamp: 'Ontem',
    entityId: 'prod-bp-001',
    entityType: 'product',
    actionLabel: 'Ver Manutenção',
    targetView: 'maintenance'
  },
  {
    id: 'alt-005',
    type: 'success',
    title: '🟢 Produto Liberado',
    description: 'Cadeirinha #CC-025 foi higienizada com sucesso e já está 100% disponível para novas locações.',
    timestamp: 'Hoje cedo',
    entityId: 'prod-cc-002',
    entityType: 'product',
    actionLabel: 'Ver no Estoque',
    targetView: 'inventory'
  }
];
