import React, { useState } from 'react';
import {
  Users,
  Award,
  CalendarCheck,
  CreditCard,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Customer360ViewProps {
  subTab?: string;
}

export const Customer360View: React.FC<Customer360ViewProps> = ({ subTab }) => {
  const { customers, rentals, reservations, openWhatsAppModal } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 'cust-001');
  const [search, setSearch] = useState('');

  const currentCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  const customerRentals = rentals.filter(r => r.customerId === currentCustomer.id || r.customerName === currentCustomer.name);
  const customerReservations = reservations.filter(res => res.customerId === currentCustomer.id);

  const filteredCustomers = customers.filter(c => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.cpf.includes(q) || c.phone.includes(q);
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Visão Cliente 360° & Perfil Comportamental</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dossiê consolidado de LTV, recorrência, pontualidade de devolução, avarias e histórico de itens alugados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Selector List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
            {filteredCustomers.map(c => {
              const isSelected = c.id === currentCustomer.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCustomerId(c.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold shadow-2xs'
                      : 'bg-white border-slate-100 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold truncate">{c.name}</span>
                    {c.isRecurring && (
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
                        VIP
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{c.cpf}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 360 Dossier Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center">
                  {currentCustomer.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">{currentCustomer.name}</h2>
                  <div className="text-xs text-slate-400 font-mono">CPF: {currentCustomer.cpf}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Classificação: Cliente VIP (Score 98/100)</span>
                </span>
                <button
                  onClick={() =>
                    openWhatsAppModal({
                      phone: currentCustomer.phone,
                      customerName: currentCustomer.name,
                      defaultText: `Olá ${currentCustomer.name}! Agradecemos a confiança de sempre na locação dos itens do seu bebê!`,
                      type: 'confirmacao'
                    })
                  }
                  className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-colors"
                  title="WhatsApp"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">LTV Total Gasto</span>
                <span className="text-base font-black text-slate-900">R$ {currentCustomer.totalSpent}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Locações</span>
                <span className="text-base font-black text-blue-700">{currentCustomer.rentalCount} vezes</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Ticket Médio</span>
                <span className="text-base font-black text-emerald-700">R$ 410,00</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Índice Avarias</span>
                <span className="text-base font-black text-slate-700">0.0% (Perfeito)</span>
              </div>
            </div>

            {/* Contact Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentCustomer.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentCustomer.email}</span>
              </div>
              <div className="flex items-center space-x-2 col-span-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{currentCustomer.address}, {currentCustomer.city} - {currentCustomer.state}</span>
              </div>
            </div>
          </div>

          {/* Customer Rental History */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Histórico Consolidado de Locações ({customerRentals.length})
            </h3>

            <div className="space-y-2.5">
              {customerRentals.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400">Nenhuma locação registrada.</div>
              ) : (
                customerRentals.map(rent => (
                  <div key={rent.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{rent.rentalNumber} • {rent.items[0]?.productName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Período: {rent.startDate} até {rent.expectedReturnDate} • Caução: R$ {rent.depositAmount} ({rent.depositStatus})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900">R$ {rent.totalAmount}</div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {rent.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
