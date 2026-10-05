import React, { useState } from 'react';
import { X, CalendarCheck, Package, Users, Truck, DollarSign, ShieldAlert, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NewRentalModal: React.FC = () => {
  const {
    isNewRentalModalOpen,
    setIsNewRentalModalOpen,
    customers,
    products,
    createRental
  } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [startDate, setStartDate] = useState('2026-10-06');
  const [returnDate, setReturnDate] = useState('2026-10-13');
  const [deliveryType, setDeliveryType] = useState<'entrega' | 'retirada'>('entrega');
  const [deliveryFee, setDeliveryFee] = useState(40);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'dinheiro'>('pix');
  const [notes, setNotes] = useState('');

  if (!isNewRentalModalOpen) return null;

  const availableProducts = products.filter(p => p.status === 'DISPONIVEL');
  const selectedProduct = products.find(p => p.id === (selectedProductId || availableProducts[0]?.id));
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(returnDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const dailyRate = selectedProduct?.dailyRate || 35;
  const rentalValue = diffDays >= 30 ? (selectedProduct?.monthlyRate || 320) : diffDays >= 7 ? (selectedProduct?.weeklyRate || 150) * Math.ceil(diffDays / 7) : dailyRate * diffDays;
  const depositValue = selectedProduct?.depositValue || 200;
  const totalToPay = rentalValue + (deliveryType === 'entrega' ? deliveryFee : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedCustomer) return;

    createRental({
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      customerCpf: selectedCustomer.cpf,
      items: [
        {
          productId: selectedProduct.id,
          productCode: selectedProduct.code,
          productName: selectedProduct.name,
          category: selectedProduct.category,
          dailyRate: selectedProduct.dailyRate
        }
      ],
      startDate,
      expectedReturnDate: returnDate,
      totalAmount: totalToPay,
      depositAmount: depositValue,
      paymentMethod,
      deliveryType,
      address: deliveryType === 'entrega' ? selectedCustomer.address : 'Retirada no balcão da loja',
      notes
    });

    setIsNewRentalModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-600 rounded-xl">
              <CalendarCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">Criar Nova Locação</h2>
              <div className="text-xs text-slate-300">Vincula estoque, contrato e financeiro imediatamente</div>
            </div>
          </div>
          <button
            onClick={() => setIsNewRentalModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Customer Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              1. Selecionar Cliente
            </label>
            <select
              value={selectedCustomerId}
              onChange={e => setSelectedCustomerId(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-blue-600 outline-none font-medium"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.cpf}) {c.isRecurring ? '★ VIP' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Product Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              2. Selecionar Produto (Apenas 100% Disponíveis)
            </label>
            {availableProducts.length === 0 ? (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                Não há produtos disponíveis no momento. Todos estão alugados, reservados ou em higienização.
              </div>
            ) : (
              <select
                value={selectedProductId || availableProducts[0].id}
                onChange={e => setSelectedProductId(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-blue-600 outline-none font-medium"
              >
                {availableProducts.map(p => (
                  <option key={p.id} value={p.id}>
                    [{p.code}] {p.name} - Diária: R$ {p.dailyRate} ({p.brand})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Data Início (Retirada/Entrega)
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Data Devolução Prevista
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none font-medium"
              />
            </div>
          </div>

          {/* Delivery Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Modalidade de Entrega
              </label>
              <select
                value={deliveryType}
                onChange={e => setDeliveryType(e.target.value as any)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none font-medium"
              >
                <option value="entrega">Entrega em Domicílio (+ R$ 40)</option>
                <option value="retirada">Retirada no Balcão Loja (Grátis)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Forma de Pagamento
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value as any)}
                className="w-full p-2 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none font-medium"
              >
                <option value="pix">Pix Instantâneo</option>
                <option value="cartao">Cartão de Crédito</option>
                <option value="dinheiro">Dinheiro no Ato</option>
              </select>
            </div>
          </div>

          {/* Breakdown summary card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Resumo Financeiro da Locação ({diffDays} dias)
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>Aluguel ({selectedProduct?.name}):</span>
              <strong className="text-slate-900">R$ {rentalValue}</strong>
            </div>
            {deliveryType === 'entrega' && (
              <div className="flex justify-between text-xs text-slate-600">
                <span>Taxa de Entrega / Logística:</span>
                <strong className="text-slate-900">R$ {deliveryFee}</strong>
              </div>
            )}
            <div className="flex justify-between text-xs text-blue-700 pt-1 border-t border-slate-200">
              <span>Caução Retida (Garantia de Devolução):</span>
              <strong>R$ {depositValue}</strong>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-200">
              <span>Total a Cobrar da Locação:</span>
              <span className="text-blue-600">R$ {totalToPay}</span>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsNewRentalModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={availableProducts.length === 0}
              className="flex items-center space-x-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 transition-all disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar e Ativar Locação</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
