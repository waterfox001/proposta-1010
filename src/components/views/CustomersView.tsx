import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  CreditCard,
  CheckCircle,
  Award,
  Crown,
  UserMinus,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Customer } from '../../types';

interface CustomersViewProps {
  subTab?: string;
}

export const CustomersView: React.FC<CustomersViewProps> = ({ subTab }) => {
  const { customers, rentals, openWhatsAppModal } = useApp();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'todos' | 'vip' | 'recorrentes' | 'inativos' | 'restricao'>('todos');

  useEffect(() => {
    if (!subTab) return;
    if (subTab === 'vip_customers') setSelectedFilter('vip');
    else if (subTab === 'inactive_customers') setSelectedFilter('inativos');
    else if (subTab === 'rental_history') setSelectedFilter('recorrentes');
    else setSelectedFilter('todos');
  }, [subTab]);

  const filtered = customers.filter(c => {
    const q = search.toLowerCase();
    const matchQuery = (
      c.name.toLowerCase().includes(q) ||
      c.cpf.includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q)
    );
    if (!matchQuery) return false;

    if (selectedFilter === 'vip') return c.rentalCount >= 4 || c.totalSpent >= 1500;
    if (selectedFilter === 'recorrentes') return c.isRecurring;
    if (selectedFilter === 'inativos') return c.status === 'inadimplente' || c.rentalCount <= 1;
    if (selectedFilter === 'restricao') return c.status !== 'ativo';
    return true;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">CRM & Carteira de Clientes</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Histórico completo de locações, recorrência, endereços de entrega e comunicação direta via WhatsApp
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setSelectedFilter('todos')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              selectedFilter === 'todos' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Todos ({customers.length})
          </button>
          <button
            onClick={() => setSelectedFilter('vip')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              selectedFilter === 'vip' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Clientes VIP
          </button>
          <button
            onClick={() => setSelectedFilter('recorrentes')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              selectedFilter === 'recorrentes' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Recorrentes
          </button>
          <button
            onClick={() => setSelectedFilter('inativos')}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              selectedFilter === 'inativos' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Inativos
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF, WhatsApp ou e-mail..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 transition-all"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold">
          Exibindo <strong>{filtered.length}</strong> clientes
        </span>
      </div>

      {/* Customer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cust => (
          <div
            key={cust.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">{cust.name}</h3>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{cust.cpf}</div>
                </div>

                {cust.isRecurring ? (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-[10px] font-bold flex items-center space-x-1">
                    <Crown className="w-3 h-3 text-amber-500" />
                    <span>Recorrente</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-semibold">
                    1ª Locação
                  </span>
                )}
              </div>

              {/* Contact Info */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{cust.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{cust.email}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span className="truncate leading-snug">
                    {cust.address}, {cust.city} - {cust.state}
                  </span>
                </div>
              </div>

              {/* Financial Stats */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Locações Feitas</span>
                  <strong className="text-slate-900 font-mono text-sm">{cust.rentalCount}</strong>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-semibold">Total Gasto (LTV)</span>
                  <strong className="text-blue-700 font-mono text-sm">
                    R$ {cust.totalSpent.toLocaleString('pt-BR')},00
                  </strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[10px] font-bold ${cust.status === 'ativo' ? 'text-emerald-700' : 'text-rose-600'}`}>
                ● Status {cust.status.toUpperCase()}
              </span>

              <button
                onClick={() => openWhatsAppModal({
                  phone: cust.whatsapp,
                  customerName: cust.name,
                  type: 'confirmacao',
                  rentalNumber: '#CRM-CLIENTE'
                })}
                className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
