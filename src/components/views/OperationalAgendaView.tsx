import React, { useState } from 'react';
import {
  CalendarClock,
  Truck,
  RotateCcw,
  Sparkles,
  Wrench,
  CalendarDays,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OperationalAgendaView: React.FC = () => {
  const { rentals, reservations, deliveries, sanitizations, maintenances } = useApp();

  const [filterType, setFilterType] = useState<string>('TODOS');

  // Unified operational events list
  const events = [
    {
      id: 'ev-1',
      type: 'ENTREGA',
      time: '09:00 - 11:00',
      date: 'Hoje (05/10)',
      title: 'Entrega Cadeirinha CC-024',
      client: 'Mariana Costa Silveira',
      responsible: 'João Silva (Motorista 01)',
      status: 'Concluído',
      color: 'bg-blue-50 border-blue-200 text-blue-900'
    },
    {
      id: 'ev-2',
      type: 'COLETA_DEVOLUCAO',
      time: '14:00 - 16:00',
      date: 'Hoje (05/10)',
      title: 'Coleta Banheira Splash #BN-003',
      client: 'Renata Vasconcellos Silva',
      responsible: 'Marcos Santos (Motorista 02)',
      status: 'Em Rota',
      color: 'bg-amber-50 border-amber-200 text-amber-900'
    },
    {
      id: 'ev-3',
      type: 'HIGIENIZACAO',
      time: '09:30 - 11:30',
      date: 'Hoje (05/10)',
      title: 'Vapor 140°C Cadeirinha #CC-009',
      client: 'Interno',
      responsible: 'Carlos Sanitização',
      status: 'Em Andamento',
      color: 'bg-teal-50 border-teal-200 text-teal-900'
    },
    {
      id: 'ev-4',
      type: 'RESERVA_SAIDA',
      time: '09:30 - 11:30',
      date: 'Amanhã (06/10)',
      title: 'Separação e Saída Bebê Conforto #BC-006',
      client: 'Ana Beatriz Ramos (#RES-2045)',
      responsible: 'Equipe Expedição',
      status: 'Programado',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-900'
    },
    {
      id: 'ev-5',
      type: 'MANUTENCAO',
      time: '15:00',
      date: 'Amanhã (06/10)',
      title: 'Substituição Válvula Vedação Banheira #BN-009',
      client: 'Oficina Interna',
      responsible: 'Roberto Técnico',
      status: 'Aguardando Peça',
      color: 'bg-rose-50 border-rose-200 text-rose-900'
    }
  ];

  const filteredEvents = events.filter(e => {
    return filterType === 'TODOS' || e.type === filterType;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Agenda Operacional Unificada</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Programação diária consolidada de entregas, coletas, higienizações em bancada e ordens técnicas
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['TODOS', 'ENTREGA', 'COLETA_DEVOLUCAO', 'HIGIENIZACAO', 'RESERVA_SAIDA', 'MANUTENCAO'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterType === type
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {type === 'TODOS'
              ? 'Todos os Compromissos'
              : type === 'ENTREGA'
              ? 'Entregas'
              : type === 'COLETA_DEVOLUCAO'
              ? 'Coletas & Devoluções'
              : type === 'HIGIENIZACAO'
              ? 'Higienização'
              : type === 'RESERVA_SAIDA'
              ? 'Separação Reservas'
              : 'Manutenções'}
          </button>
        ))}
      </div>

      {/* Agenda Timeline Cards */}
      <div className="space-y-3">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className={`p-4 rounded-2xl border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${event.color}`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2.5 bg-white rounded-xl shadow-xs shrink-0 text-slate-800">
                {event.type.includes('ENTREGA') ? (
                  <Truck className="w-5 h-5 text-blue-600" />
                ) : event.type.includes('COLETA') ? (
                  <RotateCcw className="w-5 h-5 text-amber-600" />
                ) : event.type.includes('HIGIEN') ? (
                  <Sparkles className="w-5 h-5 text-teal-600" />
                ) : (
                  <Wrench className="w-5 h-5 text-rose-600" />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] font-bold uppercase bg-white/80 px-2 py-0.5 rounded border">
                    {event.type}
                  </span>
                  <span className="text-xs text-slate-600 font-semibold">{event.date}</span>
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 mt-1">{event.title}</h3>
                <div className="text-xs text-slate-600 mt-0.5">
                  Destinatário / Local: <strong>{event.client}</strong>
                </div>
              </div>
            </div>

            <div className="sm:text-right space-y-1">
              <div className="flex items-center sm:justify-end space-x-1.5 text-xs text-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Horário: <strong>{event.time}</strong></span>
              </div>
              <div className="text-xs text-slate-500">
                Responsável: <strong className="text-slate-800">{event.responsible}</strong>
              </div>
              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-800 shadow-xs border">
                {event.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
