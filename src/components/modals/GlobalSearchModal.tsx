import React, { useState, useEffect } from 'react';
import { Search, Package, Users, CalendarCheck, CalendarDays, X, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    customers,
    rentals,
    reservations,
    setSelectedProductId,
    setCurrentView
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedProducts = q
    ? products.filter(
        p =>
          p.code.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
    : [];

  const matchedCustomers = q
    ? customers.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.cpf.includes(q) ||
          c.phone.includes(q) ||
          c.email.toLowerCase().includes(q)
      )
    : [];

  const matchedRentals = q
    ? rentals.filter(
        r =>
          r.rentalNumber.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q)
      )
    : [];

  const matchedReservations = q
    ? reservations.filter(
        res =>
          res.reservationNumber.toLowerCase().includes(q) ||
          res.customerName.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    matchedProducts.length + matchedCustomers.length + matchedRentals.length + matchedReservations.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Input Header */}
        <div className="p-4 border-b border-slate-200 flex items-center space-x-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Digite o código (ex: CC-024), cliente (Mariana), CPF ou número..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="py-8 text-center text-slate-400 text-xs">
              Busque por códigos de produto (CC-024, CB-014), clientes, telefones, locações (#LOC) ou reservas.
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              Nenhum registro encontrado para "{query}".
            </div>
          )}

          {/* Matched Products */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
                <Package className="w-3.5 h-3.5" />
                <span>Produtos & Estoque ({matchedProducts.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedProducts.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      setIsSearchModalOpen(false);
                      setCurrentView('inventory');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/80 border border-slate-100 hover:border-blue-200 text-left transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <img src={prod.photoUrl} alt={prod.name} className="w-10 h-10 rounded-lg object-cover border" />
                      <div>
                        <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 flex items-center space-x-2">
                          <span className="bg-slate-800 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                            {prod.code}
                          </span>
                          <span>{prod.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {prod.brand} • Diária R$ {prod.dailyRate} • Local: {prod.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {prod.status}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Customers */}
          {matchedCustomers.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Clientes ({matchedCustomers.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedCustomers.map(cust => (
                  <button
                    key={cust.id}
                    onClick={() => {
                      setCurrentView('customers');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/80 border border-slate-100 hover:border-blue-200 text-left transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 flex items-center space-x-2">
                        <span>{cust.name}</span>
                        {cust.isRecurring && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1 rounded font-bold">
                            RECORRENTE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        CPF: {cust.cpf} • Tel: {cust.phone} • Total gasto: R$ {cust.totalSpent}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Rentals */}
          {matchedRentals.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Locações ({matchedRentals.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedRentals.map(rent => (
                  <button
                    key={rent.id}
                    onClick={() => {
                      setCurrentView('rentals');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/80 border border-slate-100 hover:border-blue-200 text-left transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                        {rent.rentalNumber} - {rent.customerName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Retorno: {rent.expectedReturnDate} • Valor: R$ {rent.totalAmount} • Status: {rent.status}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
