import { Rental, Reservation } from '../types';

export const initialRentals: Rental[] = [
  {
    id: 'rent-1024',
    rentalNumber: '#LOC-1024',
    reservationId: 'res-2038',
    customerId: 'cust-001',
    customerName: 'Mariana Costa Silveira',
    customerPhone: '(11) 98452-9182',
    customerCpf: '234.891.458-12',
    items: [
      {
        productId: 'prod-cc-001',
        productCode: 'CC-024',
        productName: 'Cadeirinha Matrix Evolution K',
        category: 'Cadeirinhas',
        dailyRate: 35
      }
    ],
    startDate: '2026-10-05',
    expectedReturnDate: '2026-10-12',
    dailyRateTotal: 35,
    totalAmount: 245,
    depositAmount: 200,
    depositStatus: 'retida',
    paymentStatus: 'pago',
    paymentMethod: 'pix',
    status: 'ativa',
    deliveryType: 'entrega',
    address: 'Rua Bela Cintra, 1420, Apto 82 - Jardins, São Paulo',
    contractSigned: true,
    notes: 'Entregue com manual de fixação e redutor higienizado.',
    timeline: [
      { step: 'Reserva criada no sistema', timestamp: '2026-10-03 14:20', done: true },
      { step: 'Pagamento de R$ 245 + Caução R$ 200 via Pix aprovado', timestamp: '2026-10-03 14:25', done: true },
      { step: 'Produto CC-024 separado e conferido na doca', timestamp: '2026-10-05 08:30', done: true },
      { step: 'Entrega realizada no endereço e assinado termo', timestamp: '2026-10-05 10:15', done: true },
      { step: 'Locação ativa em andamento', timestamp: '2026-10-05 10:15', done: true },
      { step: 'Devolução prevista', timestamp: '2026-10-12 18:00', done: false },
      { step: 'Conferência técnica de peças', timestamp: 'Pendente', done: false },
      { step: 'Higienização e liberação para estoque', timestamp: 'Pendente', done: false }
    ]
  },
  {
    id: 'rent-1022',
    rentalNumber: '#LOC-1022',
    customerId: 'cust-005',
    customerName: 'Rodrigo Santoro Filho',
    customerPhone: '(11) 99341-8890',
    customerCpf: '312.984.770-19',
    items: [
      {
        productId: 'prod-cb-002',
        productCode: 'CB-038',
        productName: 'Carrinho YOYO² Ultracompacto Taupe',
        category: 'Carrinhos',
        dailyRate: 50
      }
    ],
    startDate: '2026-09-28',
    expectedReturnDate: '2026-10-04', // Atrasado ontem!
    dailyRateTotal: 50,
    totalAmount: 350,
    depositAmount: 500,
    depositStatus: 'retida',
    paymentStatus: 'pago',
    paymentMethod: 'cartao',
    status: 'atrasada',
    deliveryType: 'retirada',
    address: 'Retirada no balcão da loja matriz',
    contractSigned: true,
    notes: 'ALERTA: Deveria ter sido devolvido ontem (04/10). Cobrança de diária excedente a ser deduzida da caução se necessário.',
    timeline: [
      { step: 'Reserva criada', timestamp: '2026-09-26 10:00', done: true },
      { step: 'Pagamento cartão de crédito', timestamp: '2026-09-26 10:05', done: true },
      { step: 'Retirada em loja', timestamp: '2026-09-28 11:00', done: true },
      { step: 'Locação ativa', timestamp: '2026-09-28 11:00', done: true },
      { step: 'Vencimento atingido - Devolução Atrasada', timestamp: '2026-10-04 18:00', done: true, note: 'Atrasado há 1 dia' }
    ]
  },
  {
    id: 'rent-1031',
    rentalNumber: '#LOC-1031',
    customerId: 'cust-009',
    customerName: 'Renata Vasconcellos Silva',
    customerPhone: '(11) 98443-2211',
    customerCpf: '245.981.334-10',
    items: [
      {
        productId: 'prod-bn-001',
        productCode: 'BN-003',
        productName: 'Banheira Splash com Trocador',
        category: 'Banho',
        dailyRate: 20
      }
    ],
    startDate: '2026-09-28',
    expectedReturnDate: '2026-10-05', // Hoje!
    dailyRateTotal: 20,
    totalAmount: 160,
    depositAmount: 100,
    depositStatus: 'retida',
    paymentStatus: 'pago',
    paymentMethod: 'pix',
    status: 'devolucao_hoje',
    deliveryType: 'entrega',
    address: 'Alameda Lorena, 1890 - Jardins, São Paulo',
    contractSigned: true,
    notes: 'Motorista agendado para coleta hoje entre 14:00 e 16:00.',
    timeline: [
      { step: 'Reserva confirmada', timestamp: '2026-09-27', done: true },
      { step: 'Pagamento Pix efetuado', timestamp: '2026-09-27', done: true },
      { step: 'Entregue na residência', timestamp: '2026-09-28', done: true },
      { step: 'Coleta agendada para hoje', timestamp: '2026-10-05 14:00', done: false }
    ]
  },
  {
    id: 'rent-1025',
    rentalNumber: '#LOC-1025',
    customerId: 'cust-003',
    customerName: 'Carlos Eduardo Mendes',
    customerPhone: '(11) 99182-3004',
    customerCpf: '192.483.920-88',
    items: [
      {
        productId: 'prod-cc-004',
        productCode: 'CC-019',
        productName: 'Cadeirinha Pria All-in-One',
        category: 'Cadeirinhas',
        dailyRate: 55
      }
    ],
    startDate: '2026-10-01',
    expectedReturnDate: '2026-10-15',
    dailyRateTotal: 55,
    totalAmount: 770,
    depositAmount: 400,
    depositStatus: 'retida',
    paymentStatus: 'pago',
    paymentMethod: 'cartao',
    status: 'ativa',
    deliveryType: 'entrega',
    address: 'Rua Pamplona, 980 - Jardim Paulista, São Paulo',
    contractSigned: true,
    timeline: [
      { step: 'Reserva e pagamento', timestamp: '2026-09-30', done: true },
      { step: 'Instalação realizada no veículo', timestamp: '2026-10-01 10:00', done: true },
      { step: 'Locação ativa', timestamp: '2026-10-01', done: true }
    ]
  },
  {
    id: 'rent-1027',
    rentalNumber: '#LOC-1027',
    customerId: 'cust-002',
    customerName: 'Lucas Ferreira Lima',
    customerPhone: '(11) 97120-4491',
    customerCpf: '381.992.140-54',
    items: [
      {
        productId: 'prod-cb-001',
        productCode: 'CB-014',
        productName: 'Carrinho YOYO² Ultracompacto',
        category: 'Carrinhos',
        dailyRate: 50
      }
    ],
    startDate: '2026-10-03',
    expectedReturnDate: '2026-10-10',
    dailyRateTotal: 50,
    totalAmount: 350,
    depositAmount: 500,
    depositStatus: 'retida',
    paymentStatus: 'pago',
    paymentMethod: 'pix',
    status: 'ativa',
    deliveryType: 'retirada',
    address: 'Retirada no balcão',
    contractSigned: true,
    timeline: [
      { step: 'Reserva confirmada', timestamp: '2026-10-02', done: true },
      { step: 'Retirado pelo cliente', timestamp: '2026-10-03 14:00', done: true }
    ]
  },
  {
    id: 'rent-1028',
    rentalNumber: '#LOC-1028',
    customerId: 'cust-006',
    customerName: 'Patricia Linhares Gomes',
    customerPhone: '(11) 97654-3210',
    customerCpf: '298.114.908-72',
    items: [
      {
        productId: 'prod-bp-002',
        productCode: 'BP-014',
        productName: 'Berço Portátil Lullaby Magic',
        category: 'Berços',
        dailyRate: 38
      }
    ],
    startDate: '2026-10-04',
    expectedReturnDate: '2026-10-14',
    dailyRateTotal: 38,
    totalAmount: 380,
    depositAmount: 250,
    depositStatus: 'retida',
    paymentStatus: 'pago',
    paymentMethod: 'cartao',
    status: 'ativa',
    deliveryType: 'entrega',
    address: 'Rua Nebraska, 210 - Brooklin Novo',
    contractSigned: true,
    timeline: [
      { step: 'Entregue e montado', timestamp: '2026-10-04', done: true }
    ]
  }
];

export const initialReservations: Reservation[] = [
  {
    id: 'res-2045',
    reservationNumber: '#RES-2045',
    customerId: 'cust-012',
    customerName: 'Ana Beatriz Ramos',
    customerPhone: '(11) 98561-2390',
    items: [
      {
        productId: 'prod-bc-003',
        productCode: 'BC-006',
        productName: 'Bebê Conforto Aton S2 i-Size',
        category: 'Bebê-conforto',
        dailyRate: 46
      }
    ],
    startDate: '2026-10-06',
    endDate: '2026-10-13',
    totalDays: 7,
    rentalValue: 200,
    deliveryFee: 40,
    depositValue: 350,
    discount: 0,
    totalAmount: 240,
    paymentStatus: 'pago',
    paymentMethod: 'pix',
    status: 'confirmada',
    deliveryType: 'entrega',
    deliveryAddress: 'Av. Brigadeiro Luis Antonio, 3400 - Jardim Paulista',
    notes: 'Reserva para amanhã. Entrega agendada entre 09:00 e 11:00.',
    createdAt: '2026-10-04'
  },
  {
    id: 'res-2046',
    reservationNumber: '#RES-2046',
    customerId: 'cust-008',
    customerName: 'Gabriel Siqueira',
    customerPhone: '(11) 99876-1234',
    items: [
      {
        productId: 'prod-cb-003',
        productCode: 'CB-019',
        productName: 'Carrinho Priam Lux Travel System',
        category: 'Carrinhos',
        dailyRate: 85
      }
    ],
    startDate: '2026-10-08',
    endDate: '2026-10-15',
    totalDays: 7,
    rentalValue: 380,
    deliveryFee: 0,
    depositValue: 800,
    discount: 20,
    totalAmount: 360,
    paymentStatus: 'aguardando_pagamento' as any,
    paymentMethod: 'pix',
    status: 'aguardando_pagamento',
    deliveryType: 'retirada',
    notes: 'Cliente solicitou chave Pix para pagamento.',
    createdAt: '2026-10-05'
  },
  {
    id: 'res-2047',
    reservationNumber: '#RES-2047',
    customerId: 'cust-007',
    customerName: 'Fernanda Diniz Mattos',
    customerPhone: '(11) 98112-9988',
    items: [
      {
        productId: 'prod-bp-004',
        productCode: 'BP-020',
        productName: 'Berço Acoplável Next2Me',
        category: 'Berços',
        dailyRate: 42
      }
    ],
    startDate: '2026-10-10',
    endDate: '2026-10-25',
    totalDays: 15,
    rentalValue: 450,
    deliveryFee: 40,
    depositValue: 300,
    discount: 0,
    totalAmount: 490,
    paymentStatus: 'pago',
    paymentMethod: 'cartao',
    status: 'confirmada',
    deliveryType: 'entrega',
    deliveryAddress: 'Rua Barão de Capanema, 540 - Cerqueira César',
    createdAt: '2026-10-02'
  }
];
