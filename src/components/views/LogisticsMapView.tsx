import React, { useState } from 'react';
import {
  MapPin,
  Truck,
  RotateCcw,
  Navigation,
  Clock,
  Phone,
  User,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface DriverItem {
  id: string;
  name: string;
  vehicle: string;
  plate: string;
  phone: string;
  status: 'em_entrega' | 'em_coleta' | 'disponivel' | 'atrasado';
  currentDelivery: string;
  client: string;
  destination: string;
  eta: string;
  lastLocation: string;
  distance: string;
  completedToday: number;
  totalPending: number;
  pos: { top: string; left: string };
}

interface LogisticsMapViewProps {
  subTab?: string;
}

export const LogisticsMapView: React.FC<LogisticsMapViewProps> = ({ subTab }) => {
  const [selectedDriverId, setSelectedDriverId] = useState<string>('drv-1');
  const [filterType, setFilterType] = useState<string>('TODOS');
  const [activeTab, setActiveTab] = useState<'mapa' | 'rastreamento' | 'rotas' | 'motoristas' | 'ocorrencias' | 'performance'>('mapa');

  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'driver_tracking') setActiveTab('rastreamento');
    else if (subTab === 'routes_logistics') setActiveTab('rotas');
    else if (subTab === 'drivers_list') setActiveTab('motoristas');
    else if (subTab === 'logistics_incidents') setActiveTab('ocorrencias');
    else if (subTab === 'logistics_performance') setActiveTab('performance');
    else setActiveTab('mapa');
  }, [subTab]);

  const drivers: DriverItem[] = [
    {
      id: 'drv-1',
      name: 'João Silva',
      vehicle: 'Fiorino Refrigerada Kids #01',
      plate: 'BRA-9E82',
      phone: '(11) 98888-1101',
      status: 'em_entrega',
      currentDelivery: '#LOC-1024 (Cadeirinha CC-024)',
      client: 'Mariana Costa Silveira',
      destination: 'Rua Bela Cintra, 1420 - Jardins',
      eta: '10:45 (Em 12 min)',
      lastLocation: 'Av. Paulista próx. Al. Campinas',
      distance: '2.4 km restantes',
      completedToday: 3,
      totalPending: 2,
      pos: { top: '38%', left: '42%' }
    },
    {
      id: 'drv-2',
      name: 'Marcos Santos',
      vehicle: 'Kwid Cargo Urbano #02',
      plate: 'KID-4421',
      phone: '(11) 98888-1102',
      status: 'em_coleta',
      currentDelivery: 'Coleta #LOC-1031 (Banheira BN-003)',
      client: 'Renata Vasconcellos',
      destination: 'Alameda Lorena, 1890 - Cerqueira César',
      eta: '14:20 (Janela da tarde)',
      lastLocation: 'Rua Augusta próx. Oscar Freire',
      distance: '1.1 km restantes',
      completedToday: 2,
      totalPending: 3,
      pos: { top: '52%', left: '49%' }
    },
    {
      id: 'drv-3',
      name: 'Felipe Santana',
      vehicle: 'Doblò Maxi Carga #03',
      plate: 'SPK-7712',
      phone: '(11) 98888-1103',
      status: 'atrasado',
      currentDelivery: 'Tentativa Reagendada #LOC-1022',
      client: 'Rodrigo Santoro Filho',
      destination: 'Rua Itambé, 450 - Higienópolis',
      eta: 'Atrasado em 25 min (Trânsito pesado)',
      lastLocation: 'Av. Rebouças próx. Marginal Pinheiros',
      distance: '4.8 km restantes',
      completedToday: 1,
      totalPending: 4,
      pos: { top: '32%', left: '33%' }
    },
    {
      id: 'drv-4',
      name: 'Carlos Expedição',
      vehicle: 'Base Matriz / Galpão Central',
      plate: 'BASE-01',
      phone: '(11) 98888-1104',
      status: 'disponivel',
      currentDelivery: 'Aguardando Carregamento Lote 14h',
      client: 'Doca Central',
      destination: 'Galpão Operacional Moema',
      eta: 'Disponível na doca',
      lastLocation: 'Base Central Moema Pássaros',
      distance: '0 km',
      completedToday: 4,
      totalPending: 0,
      pos: { top: '65%', left: '58%' }
    }
  ];

  const selectedDriver = drivers.find(d => d.id === selectedDriverId) || drivers[0];

  const filteredDrivers = drivers.filter(d => {
    if (filterType === 'TODOS') return true;
    return d.status === filterType;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Mapa Operacional & Logística de Frotas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoramento das rotas de entrega e coleta em tempo real na Grande São Paulo
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
          {(['mapa', 'rastreamento', 'rotas', 'motoristas', 'ocorrencias', 'performance'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg transition-all capitalize whitespace-nowrap ${
                activeTab === tab ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab === 'mapa' ? 'Mapa Geral' : tab === 'rastreamento' ? 'Rastreamento' : tab === 'rotas' ? 'Rotas & Itinerários' : tab === 'motoristas' ? 'Motoristas' : tab === 'ocorrencias' ? 'Ocorrências' : 'Performance'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map & Drivers Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Map Area */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4 shadow-xl relative min-h-[460px] flex flex-col justify-between overflow-hidden">
          {/* Simulated Street Map Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Map Top Overlay Controls */}
          <div className="relative z-10 flex items-center justify-between bg-slate-950/80 backdrop-blur-xs p-3 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span className="font-bold text-white">Rotas Metropolitanas • São Paulo</span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Entrega</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Coleta</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Atraso</span>
              </span>
            </div>
          </div>

          {/* Interactive Markers on Simulated Map */}
          <div className="relative flex-1 my-4">
            {drivers.map(drv => {
              const isSelected = drv.id === selectedDriverId;
              const markerBg =
                drv.status === 'atrasado'
                  ? 'bg-rose-500'
                  : drv.status === 'em_coleta'
                  ? 'bg-amber-500'
                  : drv.status === 'disponivel'
                  ? 'bg-emerald-500'
                  : 'bg-blue-600';

              return (
                <button
                  key={drv.id}
                  onClick={() => setSelectedDriverId(drv.id)}
                  style={{ top: drv.pos.top, left: drv.pos.left }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                >
                  <div className={`p-2 rounded-full text-white shadow-lg flex items-center space-x-1.5 ${markerBg}`}>
                    <Truck className="w-4 h-4" />
                    <span className="text-[10px] font-bold pr-1">{drv.name.split(' ')[0]}</span>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-blue-400/40 absolute -inset-1 animate-ping pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Map Bottom Status Bar */}
          <div className="relative z-10 bg-slate-950/80 backdrop-blur-xs p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <span>Visualização gráfica e roteirizador logístico (Módulo Visual)</span>
            <span className="text-[11px] text-blue-400 font-mono">GPS Simulator Active</span>
          </div>
        </div>

        {/* Selected Driver Detailed Dossier Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                  {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{selectedDriver.name}</h3>
                  <div className="text-[11px] text-slate-400 font-mono">{selectedDriver.vehicle} • {selectedDriver.plate}</div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedDriver.status === 'atrasado'
                    ? 'bg-rose-100 text-rose-800'
                    : selectedDriver.status === 'em_coleta'
                    ? 'bg-amber-100 text-amber-800'
                    : selectedDriver.status === 'disponivel'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {selectedDriver.status}
              </span>
            </div>

            {/* Current Target Details */}
            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Atividade Atual</div>
                <div className="font-bold text-slate-900 text-xs">{selectedDriver.currentDelivery}</div>
                <div className="text-slate-600">Cliente: <strong>{selectedDriver.client}</strong></div>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{selectedDriver.destination}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Previsão: <strong className="text-slate-900">{selectedDriver.eta}</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Último ponto: {selectedDriver.lastLocation}</span>
                </div>
              </div>

              {/* Progress metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                  <span className="text-[10px] text-emerald-800 font-bold block">Concluídas Hoje</span>
                  <span className="text-base font-black text-emerald-900">{selectedDriver.completedToday}</span>
                </div>
                <div className="p-2 bg-blue-50 rounded-xl border border-blue-100 text-center">
                  <span className="text-[10px] text-blue-800 font-bold block">Pendentes Rota</span>
                  <span className="text-base font-black text-blue-900">{selectedDriver.totalPending}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">{selectedDriver.phone}</span>
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs">
              Ver Roteiro Completo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
