import React, { useState } from 'react';
import {
  CalendarDays,
  Search,
  Plus,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReservationStatus } from '../../types';

export const ReservationsView: React.FC = () => {
  const {
    reservations,
    setIsNewReservationModalOpen,
    convertReservationToRental,
    cancelReservation,
    openWhatsAppModal,
    setSelectedProductId
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('TODAS');

  const filteredReservations = reservations.filter(r => {
    const matchesStatus = statusFilter === 'TODAS' || r.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      r.reservationNumber.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.items.some(i => i.productName.toLowerCase().includes(q) || i.productCode.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Reservas Programadas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fluxo: Cliente → Escolhe Produto → Verifica Disponibilidade → Reserva → Pagamento → Entrega
          </p>
        </div>
        <button
          onClick={() => setIsNewReservationModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Reserva</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por reserva, cliente ou item..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['TODAS', 'confirmada', 'aguardando_pagamento', 'ativa', 'cancelada'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'TODAS'
                ? 'Todas'
                : st === 'confirmada'
                ? 'Confirmadas'
                : st === 'aguardando_pagamento'
                ? 'Aguardando Pagamento'
                : st === 'ativa'
                ? 'Convertidas em Locação'
                : 'Canceladas'}
            </button>
          ))}
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Reserva / Cliente</th>
                <th className="py-3 px-4">Itens Reservados</th>
                <th className="py-3 px-4">Período Previsto</th>
                <th className="py-3 px-4">Valores (Aluguel + Caução)</th>
                <th className="py-3 px-4">Pagamento</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação Operacional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    Nenhuma reserva encontrada com os filtros atuais.
                  </td>
                </tr>
              ) : (
                filteredReservations.map(res => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-indigo-600 text-xs">{res.reservationNumber}</div>
                      <div className="font-semibold text-slate-800 mt-0.5">{res.customerName}</div>
                      <div className="text-[11px] text-slate-400">{res.customerPhone}</div>
                    </td>

                    <td className="py-3 px-4">
                      {res.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5">
                          <span
                            onClick={() => setSelectedProductId(item.productId)}
                            className="font-mono bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-[10px] px-1.5 py-0.5 rounded cursor-pointer font-bold"
                          >
                            {item.productCode}
                          </span>
                          <span className="text-slate-700 font-medium truncate max-w-[160px]">{item.productName}</span>
                        </div>
                      ))}
                    </td>

                    <td className="py-3 px-4 text-[11px]">
                      <div>{res.startDate} → {res.endDate}</div>
                      <span className="text-slate-400 font-medium">{res.totalDays} dias de locação</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">R$ {res.totalAmount}</div>
                      <div className="text-[10px] text-slate-500">Caução: R$ {res.depositValue}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        res.paymentStatus === 'pago' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {res.paymentStatus.toUpperCase()} ({res.paymentMethod})
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        res.status === 'confirmada'
                          ? 'bg-blue-100 text-blue-800'
                          : res.status === 'ativa'
                          ? 'bg-emerald-100 text-emerald-800'
                          : res.status === 'cancelada'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {res.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() =>
                            openWhatsAppModal({
                              phone: res.customerPhone,
                              customerName: res.customerName,
                              defaultText: `Olá ${res.customerName}! Sua reserva ${res.reservationNumber} para o período de ${res.startDate} a ${res.endDate} está confirmada e pronta.`,
                              type: 'confirmacao'
                            })
                          }
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Enviar confirmação WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {res.status !== 'ativa' && res.status !== 'cancelada' && (
                          <>
                            <button
                              onClick={() => convertReservationToRental(res.id)}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold rounded-lg shadow-xs transition-colors flex items-center space-x-1"
                              title="Transformar esta reserva em locação ativa e entregar os produtos"
                            >
                              <span>Ativar Locação</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => cancelReservation(res.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Cancelar Reserva"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
