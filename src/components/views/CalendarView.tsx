import React, { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, User, Package, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CalendarView: React.FC = () => {
  const { rentals, reservations, setSelectedProductId } = useApp();
  const [viewMode, setViewMode] = useState<'mes' | 'semana' | 'timeline'>('timeline');

  // Days for October 2026 timeline view
  const days = Array.from({ length: 15 }, (_, i) => {
    const day = i + 1;
    return {
      dateStr: `2026-10-${day < 10 ? '0' + day : day}`,
      dayNum: day,
      dayName: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][(day + 4) % 7]
    };
  });

  // Track all bookings (active rentals + future reservations)
  const bookings = [
    ...rentals.map(r => ({
      id: r.id,
      code: r.items[0]?.productCode || 'ITEM',
      productName: r.items[0]?.productName || 'Produto',
      productId: r.items[0]?.productId,
      customerName: r.customerName,
      start: r.startDate,
      end: r.expectedReturnDate,
      type: 'Locação Ativa',
      color: 'bg-blue-600 text-white border-blue-700'
    })),
    ...reservations.map(res => ({
      id: res.id,
      code: res.items[0]?.productCode || 'ITEM',
      productName: res.items[0]?.productName || 'Produto',
      productId: res.items[0]?.productId,
      customerName: res.customerName,
      start: res.startDate,
      end: res.endDate,
      type: 'Reserva Confirmada',
      color: 'bg-indigo-600 text-white border-indigo-700'
    }))
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Calendário de Ocupação & Reservas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Visão cronológica dos períodos ocupados por item (Outubro de 2026)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'timeline' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'
              }`}
            >
              Linha do Tempo
            </button>
            <button
              onClick={() => setViewMode('mes')}
              className={`px-3 py-1 rounded-lg transition-all ${
                viewMode === 'mes' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500'
              }`}
            >
              Mês Completo
            </button>
          </div>
        </div>
      </div>

      {/* Visual Timeline Schedule Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-sm text-slate-900">Outubro 2026</span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500">Períodos de locações e reservas ativas</span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600"></span>
              <span className="text-slate-600">Locação Ativa</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
              <span className="text-slate-600">Reserva Confirmada</span>
            </span>
          </div>
        </div>

        {/* Days Header */}
        <div className="min-w-[800px]">
          <div className="grid grid-cols-16 gap-1 text-center text-xs font-bold text-slate-500 mb-2">
            <div className="col-span-3 text-left pl-2 text-slate-400 uppercase text-[10px] tracking-wider">
              Produto / Código
            </div>
            {days.map(d => (
              <div
                key={d.dateStr}
                className={`py-1.5 rounded-lg border text-[11px] ${
                  d.dayNum === 5
                    ? 'bg-blue-600 text-white font-extrabold border-blue-700'
                    : 'bg-slate-50 border-slate-100 text-slate-700'
                }`}
              >
                <div className="text-[9px] uppercase font-normal">{d.dayName}</div>
                <div>{d.dayNum}</div>
              </div>
            ))}
          </div>

          {/* Bookings rows */}
          <div className="space-y-2 divide-y divide-slate-100">
            {bookings.map(b => (
              <div key={b.id} className="grid grid-cols-16 gap-1 items-center pt-2 text-xs">
                {/* Product code and customer */}
                <div className="col-span-3 text-left truncate pr-2">
                  <div className="flex items-center space-x-1.5">
                    <span
                      onClick={() => b.productId && setSelectedProductId(b.productId)}
                      className="font-mono bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      {b.code}
                    </span>
                    <span className="font-semibold text-slate-800 truncate">{b.productName}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">
                    Cliente: <strong>{b.customerName}</strong>
                  </div>
                </div>

                {/* Day slots */}
                <div className="col-span-13 relative h-10 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center p-1 overflow-hidden">
                  <div
                    className={`h-7 px-2.5 rounded-lg flex items-center justify-between text-[11px] font-bold shadow-xs truncate w-full ${b.color}`}
                  >
                    <div className="truncate flex items-center space-x-1.5">
                      <span>{b.code} • {b.customerName}</span>
                    </div>
                    <span className="text-[9px] font-mono opacity-90 shrink-0">
                      {b.start.slice(5)} → {b.end.slice(5)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
