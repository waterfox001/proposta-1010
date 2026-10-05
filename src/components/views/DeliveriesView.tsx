import React, { useState } from 'react';
import { Truck, MapPin, Clock, Phone, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DeliveriesView: React.FC = () => {
  const { deliveries, updateDeliveryStatus, openWhatsAppModal } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('TODAS');

  const filtered = deliveries.filter(d => {
    return filterStatus === 'TODAS' || d.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'entregue':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Entregue com Sucesso</span>;
      case 'em_rota':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 animate-pulse">Em Rota</span>;
      case 'separando':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Separando no Galpão</span>;
      case 'pronto':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">Pronto para Carregamento</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Logística & Roteiro de Entregas</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gestão das rotas de entrega e coleta em domicílio, horários e motoristas designados
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['TODAS', 'separando', 'pronto', 'em_rota', 'entregue'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === st
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {st === 'TODAS' ? 'Todas as Ordens' : st === 'separando' ? 'Separando' : st === 'pronto' ? 'Prontos' : st === 'em_rota' ? 'Em Rota' : 'Entregues'}
          </button>
        ))}
      </div>

      {/* Deliveries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(del => (
          <div
            key={del.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-400 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-xs text-slate-900">{del.customerName}</h3>
                  <div className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                    <Phone className="w-3 h-3" />
                    <span>{del.phone}</span>
                  </div>
                </div>
                {getStatusBadge(del.status)}
              </div>

              {/* Items in delivery */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Itens para Entrega / Coleta</span>
                {del.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5 text-xs text-slate-800">
                    <span className="font-mono bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      {item.productCode}
                    </span>
                    <span className="font-medium truncate">{item.productName}</span>
                  </div>
                ))}
              </div>

              {/* Address and Window */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">{del.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Janela: <strong>{del.timeWindow}</strong> ({del.date})</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Motorista: <strong className="text-slate-800">{del.driverName}</strong>
                </div>
              </div>

              {del.notes && (
                <div className="p-2 bg-blue-50/60 rounded-lg text-[10px] text-blue-900 italic">
                  "{del.notes}"
                </div>
              )}
            </div>

            {/* Quick status progress buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() =>
                  openWhatsAppModal({
                    phone: del.phone,
                    customerName: del.customerName,
                    defaultText: `Olá ${del.customerName}! O motorista está a caminho para entrega na janela das ${del.timeWindow}. Por gentileza, confirme se haverá alguém no local.`,
                    type: 'endereco'
                  })
                }
                className="text-xs text-emerald-600 hover:text-emerald-700 font-bold"
              >
                Avisar Cliente
              </button>

              <select
                value={del.status}
                onChange={e => updateDeliveryStatus(del.id, e.target.value)}
                className="text-[11px] font-bold p-1.5 bg-slate-100 border border-slate-300 rounded-lg outline-none cursor-pointer"
              >
                <option value="separando">Separando</option>
                <option value="pronto">Pronto</option>
                <option value="em_rota">Em Rota</option>
                <option value="entregue">Entregue</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
