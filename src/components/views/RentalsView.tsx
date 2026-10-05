import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  Plus,
  Filter,
  Eye,
  MessageCircle,
  RotateCcw,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Rental, RentalStatus } from '../../types';

export const RentalsView: React.FC = () => {
  const {
    rentals,
    setIsNewRentalModalOpen,
    openWhatsAppModal,
    setSelectedProductId,
    processReturnConference,
    setCurrentView
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

  const filteredRentals = rentals.filter(r => {
    const matchesStatus = filterStatus === 'TODAS' || r.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      r.rentalNumber.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.items.some(i => i.productName.toLowerCase().includes(q) || i.productCode.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const statusBadge = (status: RentalStatus) => {
    switch (status) {
      case 'ativa':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">Em Andamento</span>;
      case 'atrasada':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 animate-pulse">Atrasada</span>;
      case 'devolucao_hoje':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">Devolução Hoje</span>;
      case 'preparacao':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">Em Separação</span>;
      case 'devolvida':
      case 'finalizada':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Devolvida</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Gestão Central de Locações</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Controle de contratos, períodos em curso, cauções e ciclo de vida
          </p>
        </div>
        <button
          onClick={() => setIsNewRentalModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Locação</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por locação, cliente ou produto..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['TODAS', 'ativa', 'atrasada', 'devolucao_hoje', 'devolvida'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'TODAS'
                ? 'Todas'
                : st === 'ativa'
                ? 'Ativas'
                : st === 'atrasada'
                ? 'Atrasadas'
                : st === 'devolucao_hoje'
                ? 'Devolução Hoje'
                : 'Concluídas'}
            </button>
          ))}
        </div>
      </div>

      {/* Rentals Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Locação / Cliente</th>
                <th className="py-3 px-4">Produtos Alugados</th>
                <th className="py-3 px-4">Período</th>
                <th className="py-3 px-4">Financeiro</th>
                <th className="py-3 px-4">Caução</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações Rápidas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRentals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                    Nenhuma locação encontrada com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredRentals.map(rental => (
                  <tr key={rental.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Rental / Customer */}
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-blue-600 text-xs">{rental.rentalNumber}</div>
                      <div className="font-semibold text-slate-800 mt-0.5">{rental.customerName}</div>
                      <div className="text-[11px] text-slate-400">{rental.customerPhone}</div>
                    </td>

                    {/* Products */}
                    <td className="py-3 px-4">
                      {rental.items.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5">
                          <span
                            onClick={() => setSelectedProductId(item.productId)}
                            className="font-mono bg-slate-100 hover:bg-blue-100 text-slate-800 text-[10px] px-1.5 py-0.5 rounded cursor-pointer font-bold"
                          >
                            {item.productCode}
                          </span>
                          <span className="text-slate-700 font-medium truncate max-w-[180px]">{item.productName}</span>
                        </div>
                      ))}
                    </td>

                    {/* Dates */}
                    <td className="py-3 px-4 text-[11px]">
                      <div className="text-slate-700">Início: <strong>{rental.startDate}</strong></div>
                      <div className={rental.status === 'atrasada' ? 'text-red-600 font-bold' : 'text-slate-600'}>
                        Retorno: <strong>{rental.expectedReturnDate}</strong>
                      </div>
                    </td>

                    {/* Finance */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">R$ {rental.totalAmount}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{rental.paymentMethod} • {rental.paymentStatus}</div>
                    </td>

                    {/* Deposit */}
                    <td className="py-3 px-4">
                      <span className="text-xs font-bold text-blue-700">R$ {rental.depositAmount}</span>
                      <div className="text-[10px] text-slate-500 capitalize">{rental.depositStatus}</div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">{statusBadge(rental.status)}</td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {/* Open Drawer Details */}
                        <button
                          onClick={() => setSelectedRental(rental)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ver Timeline & Contrato"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* WhatsApp Communication */}
                        <button
                          onClick={() =>
                            openWhatsAppModal({
                              phone: rental.customerPhone,
                              customerName: rental.customerName,
                              defaultText:
                                rental.status === 'atrasada'
                                  ? `Olá ${rental.customerName}! Constatamos que a locação ${rental.rentalNumber} expirou em ${rental.expectedReturnDate}. Podemos agendar a coleta ou renovar?`
                                  : `Olá ${rental.customerName}! Informamos que sua locação ${rental.rentalNumber} está em dia!`,
                              type: rental.status === 'atrasada' ? 'cobranca' : 'lembrete'
                            })
                          }
                          className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Enviar WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {/* Return Action */}
                        {rental.status !== 'finalizada' && rental.status !== 'devolvida' && (
                          <button
                            onClick={() => {
                              setCurrentView('returns');
                            }}
                            className="px-2 py-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                            title="Registrar devolução e conferir produto"
                          >
                            Conferir Devolução
                          </button>
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

      {/* Drawer: Detailed Timeline & Contract Modal */}
      {selectedRental && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">
                  {selectedRental.rentalNumber} - Timeline Operacional
                </h3>
                <div className="text-xs text-slate-300">Cliente: {selectedRental.customerName}</div>
              </div>
              <button
                onClick={() => setSelectedRental(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Timeline Flow */}
              <div>
                <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3">
                  Ciclo de Vida da Locação
                </div>
                <div className="space-y-4 border-l-2 border-slate-200 pl-4 ml-2">
                  {selectedRental.timeline.map((st, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[23px] top-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          st.done ? 'bg-blue-600' : 'bg-slate-300'
                        }`}
                      />
                      <div className="text-xs font-bold text-slate-800">{st.step}</div>
                      <div className="text-[11px] text-slate-400">{st.timestamp}</div>
                      {st.note && (
                        <div className="text-[11px] text-red-600 font-semibold mt-0.5">
                          {st.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract specs */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Contrato de Adesão & Termo de Caução</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Contrato eletrônico assinado e autenticado. Caução de R$ {selectedRental.depositAmount} sob custódia de garantia para eventuais danos ou atrasos.
                </p>
                <div className="pt-2 flex justify-between font-mono text-[11px] text-slate-500">
                  <span>Entrega: {selectedRental.deliveryType}</span>
                  <span>Endereço: {selectedRental.address}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedRental(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
