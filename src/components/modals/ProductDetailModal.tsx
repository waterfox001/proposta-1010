import React, { useState } from 'react';
import {
  X,
  Package,
  CalendarCheck,
  RotateCcw,
  Sparkles,
  Wrench,
  DollarSign,
  Tag,
  MapPin,
  Clock,
  UserCheck,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductStatus } from '../../types';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductId,
    setSelectedProductId,
    products,
    updateProductStatus,
    rentals,
    reservations,
    sanitizations,
    maintenances,
    returns,
    setIsNewRentalModalOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'maintenance' | 'sanitization'>('info');

  if (!selectedProductId) return null;

  const product = products.find(p => p.id === selectedProductId);
  if (!product) return null;

  // Find related records
  const currentRental = rentals.find(r => r.id === product.currentRentalId);
  const productRentals = rentals.filter(r => r.items.some(i => i.productId === product.id));
  const productReservations = reservations.filter(res => res.items.some(i => i.productId === product.id));
  const productMaintenances = maintenances.filter(m => m.productId === product.id);
  const productSanitizations = sanitizations.filter(s => s.productId === product.id);
  const productReturns = returns.filter(ret => ret.productId === product.id);

  const statusColors: Record<ProductStatus, string> = {
    DISPONIVEL: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    RESERVADO: 'bg-blue-100 text-blue-800 border-blue-300',
    ALUGADO: 'bg-amber-100 text-amber-800 border-amber-300',
    EM_HIGIENIZACAO: 'bg-teal-100 text-teal-800 border-teal-300',
    EM_MANUTENCAO: 'bg-rose-100 text-rose-800 border-rose-300',
    DANIFICADO: 'bg-red-100 text-red-800 border-red-300',
    PERDIDO: 'bg-slate-200 text-slate-800 border-slate-400',
    INDISPONIVEL: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-600 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-lg">
              {product.code}
            </span>
            <div>
              <h2 className="text-base font-bold leading-tight">{product.name}</h2>
              <div className="text-xs text-slate-300">
                {product.brand} • {product.model} • SKU: {product.sku}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedProductId(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar & Quick Actions */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-medium">Status Atual:</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColors[product.status]}`}>
              {product.status}
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-600">
              Condição: <strong className="capitalize">{product.condition}</strong>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {product.status === 'DISPONIVEL' && (
              <button
                onClick={() => {
                  setSelectedProductId(null);
                  setIsNewRentalModalOpen(true);
                }}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm"
              >
                + Alugar este Item
              </button>
            )}

            {product.status !== 'EM_HIGIENIZACAO' && (
              <button
                onClick={() => updateProductStatus(product.id, 'EM_HIGIENIZACAO', 'Enviado manualmente para higienização')}
                className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-300 text-xs font-semibold rounded-lg"
              >
                Enviar Higienização
              </button>
            )}

            {product.status !== 'EM_MANUTENCAO' && (
              <button
                onClick={() => updateProductStatus(product.id, 'EM_MANUTENCAO', 'Enviado manualmente para manutenção')}
                className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 text-xs font-semibold rounded-lg"
              >
                Enviar Manutenção
              </button>
            )}

            {product.status !== 'DISPONIVEL' && (
              <button
                onClick={() => updateProductStatus(product.id, 'DISPONIVEL', 'Liberado manualmente para disponível')}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-semibold rounded-lg"
              >
                Liberar para Disponível
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white text-xs font-semibold">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3 border-b-2 transition-all ${
              activeTab === 'info' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Ficha do Produto
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-3 border-b-2 transition-all ${
              activeTab === 'history' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Histórico de Locações ({productRentals.length})
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`py-3 px-3 border-b-2 transition-all ${
              activeTab === 'maintenance' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Manutenções ({productMaintenances.length})
          </button>
          <button
            onClick={() => setActiveTab('sanitization')}
            className={`py-3 px-3 border-b-2 transition-all ${
              activeTab === 'sanitization' ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Higienizações ({productSanitizations.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Product hero banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3">
                  <img src={product.photoUrl} alt={product.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {product.code}
                  </span>
                </div>

                <div className="md:col-span-2 space-y-4">
                  {/* Current Active Rental Card if rented */}
                  {product.status === 'ALUGADO' && (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                          <UserCheck className="w-4 h-4 text-amber-700" />
                          <span>Locação Ativa em Andamento</span>
                        </span>
                        <span className="text-[11px] font-mono font-bold text-amber-800">
                          {currentRental?.rentalNumber || '#LOC-1024'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-amber-950">
                        <div>
                          Cliente: <strong>{product.currentCustomerName || 'Mariana Costa'}</strong>
                        </div>
                        <div>
                          Devolução prevista: <strong>{product.returnDueDate || '12/10/2026'}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rates and Values */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Diária</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">R$ {product.dailyRate}</div>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Semanal</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">R$ {product.weeklyRate}</div>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">Mensal</div>
                      <div className="text-sm font-extrabold text-slate-900 mt-0.5">R$ {product.monthlyRate}</div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
                      <div className="text-[10px] text-blue-700 font-bold uppercase">Caução</div>
                      <div className="text-sm font-extrabold text-blue-900 mt-0.5">R$ {product.depositValue}</div>
                    </div>
                  </div>

                  {/* Metadata Specs */}
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-400">Localização física:</span>{' '}
                      <strong className="text-slate-800">{product.location}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Valor de compra:</span>{' '}
                      <strong className="text-slate-800">R$ {product.purchaseValue}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Total de locações:</span>{' '}
                      <strong className="text-slate-800">{product.rentalCount} vezes</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Receita total gerada:</span>{' '}
                      <strong className="text-emerald-700 font-bold">R$ {product.totalRevenue}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessories and Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-slate-200 rounded-xl">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Acessórios Inclusos na Unidade</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {product.includedAccessories.map((acc, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{acc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-2 flex items-center space-x-1.5">
                    <Tag className="w-4 h-4 text-blue-600" />
                    <span>Observações Técnicas & Cuidados</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {product.notes || 'Nenhuma observação técnica pendente para esta unidade.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {productRentals.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">Nenhuma locação registrada ainda para este produto.</div>
              ) : (
                productRentals.map(rent => (
                  <div key={rent.id} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{rent.rentalNumber} • {rent.customerName}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">
                        Período: {rent.startDate} até {rent.expectedReturnDate} • Pagamento: {rent.paymentMethod.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">R$ {rent.totalAmount}</div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {rent.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-3">
              {productMaintenances.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">Nenhum registro de manutenção ou avaria para esta unidade.</div>
              ) : (
                productMaintenances.map(maint => (
                  <div key={maint.id} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-800">{maint.problemDescription}</span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">
                        {maint.status}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      Entrada: {maint.entryDate} • Técnico: {maint.technician} • Custo: R$ {maint.cost}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'sanitization' && (
            <div className="space-y-3">
              {productSanitizations.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">Nenhum processo de higienização pendente no momento.</div>
              ) : (
                productSanitizations.map(san => (
                  <div key={san.id} className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-800">Higienização e Esterilização</span>
                      <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-bold">
                        {san.status}
                      </span>
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      Químico: {san.chemicalUsed} • Responsável: {san.responsibleStaff}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
