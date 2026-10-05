import React, { useState } from 'react';
import {
  Store,
  Calendar,
  MapPin,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Baby,
  Truck,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductUnit, ProductCategory } from '../../types';

export const CustomerStoreView: React.FC = () => {
  const { products, createReservation, setCurrentView } = useApp();

  const [selectedCity, setSelectedCity] = useState('São Paulo - SP (Grande SP e ABC)');
  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-15');
  const [categoryFilter, setCategoryFilter] = useState<string>('TODAS');
  const [cart, setCart] = useState<ProductUnit[]>([]);

  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('Mariana Costa');
  const [customerPhone, setCustomerPhone] = useState('(11) 98452-9182');
  const [deliveryAddress, setDeliveryAddress] = useState('Rua Bela Cintra, 1420 - Jardins');
  const [deliveryType, setDeliveryType] = useState<'entrega' | 'retirada'>('entrega');
  const [isFinished, setIsFinished] = useState(false);
  const [confirmedResNumber, setConfirmedResNumber] = useState('');

  // Calculate days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  const categories = ['TODAS', 'Cadeirinhas', 'Bebê-conforto', 'Carrinhos', 'Berços', 'Alimentação', 'Brinquedos'];

  const availableProducts = products.filter(p => {
    const matchesCat = categoryFilter === 'TODAS' || p.category === categoryFilter;
    return p.status === 'DISPONIVEL' && matchesCat;
  });

  const addToCart = (product: ProductUnit) => {
    if (!cart.some(item => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Calculations for checkout
  const rentalTotal = cart.reduce((acc, item) => acc + (item.dailyRate * diffDays), 0);
  const deliveryFee = deliveryType === 'entrega' ? 40 : 0;
  const depositTotal = cart.reduce((acc, item) => acc + item.depositValue, 0);
  const totalAmountToPay = rentalTotal + deliveryFee;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const resNumber = `#RES-${Math.floor(2000 + Math.random() * 8000)}`;

    createReservation({
      customerId: 'cust-001',
      customerName,
      customerPhone,
      items: cart.map(p => ({
        productId: p.id,
        productCode: p.code,
        productName: p.name,
        category: p.category,
        dailyRate: p.dailyRate
      })),
      startDate,
      endDate,
      totalDays: diffDays,
      rentalValue: rentalTotal,
      deliveryFee,
      depositValue: depositTotal,
      discount: 0,
      totalAmount: totalAmountToPay,
      paymentStatus: 'pago',
      paymentMethod: 'pix',
      deliveryType,
      deliveryAddress
    });

    setConfirmedResNumber(resNumber);
    setIsFinished(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Bar for Switch back to Admin */}
      <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Visão do Cliente Final (Loja de Locação Mobile-First)</span>
        </div>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center space-x-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar ao Painel Administrativo</span>
        </button>
      </div>

      {/* Brand Hero */}
      <div className="bg-gradient-to-b from-[#0a192f] to-slate-900 text-white pt-10 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Baby className="w-4 h-4" />
            <span>Locação Especializada para Bebês</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Viaje leve com seu bebê. Alugue carrinhos, cadeirinhas e berços.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Higienização hospitalar a vapor 140°C, entrega no seu hotel ou residência e garantia total de segurança.
          </p>

          {/* Quick Selection Bar */}
          <div className="mt-6 p-4 bg-white text-slate-900 rounded-2xl shadow-xl max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">1. Cidade</label>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none mt-1"
              >
                <option value="São Paulo - SP">São Paulo - SP (Capital)</option>
                <option value="Campinas - SP">Campinas & Região</option>
                <option value="Litoral - SP">Santos & Litoral</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">2. Início</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none mt-1"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">3. Devolução ({diffDays} dias)</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 space-y-6">
        {/* Categories Strip */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-xs ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {availableProducts.map(p => {
            const inCart = cart.some(item => item.id === p.id);
            const totalItemPrice = p.dailyRate * diffDays;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                    <img src={p.photoUrl} alt={p.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      ✓ Disponível
                    </span>
                    <span className="absolute top-2 right-2 bg-slate-900/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                      {p.code}
                    </span>
                  </div>

                  <div className="p-4 space-y-1">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{p.category} • {p.brand}</div>
                    <h3 className="font-bold text-xs text-slate-900 leading-snug">{p.name}</h3>

                    <div className="pt-2 flex items-baseline justify-between">
                      <div>
                        <span className="text-base font-extrabold text-blue-600">R$ {totalItemPrice}</span>
                        <span className="text-[10px] text-slate-400"> / {diffDays} dias</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        R$ {p.dailyRate}/dia
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400">
                      Caução reembolsável: R$ {p.depositValue}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  {inCart ? (
                    <button
                      onClick={() => removeFromCart(p.id)}
                      className="w-full py-2 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
                    >
                      <Check className="w-4 h-4" />
                      <span>Item no Carrinho</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1 shadow-sm transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar à Locação</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Cart Bar */}
      {cart.length > 0 && !isCheckoutOpen && (
        <div className="fixed bottom-4 inset-x-4 max-w-xl mx-auto bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between z-40 border border-slate-700 animate-in slide-in-from-bottom-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              {cart.length}
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Total da Locação: R$ {totalAmountToPay}</div>
              <div className="text-[10px] text-slate-400">
                {cart.length} {cart.length === 1 ? 'item' : 'itens'} por {diffDays} dias
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
          >
            Finalizar Pedido →
          </button>
        </div>
      )}

      {/* Modern Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Resumo da Reserva & Checkout</h3>
                <div className="text-xs text-slate-300">Locação Infantil • Entrega Programada</div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {!isFinished ? (
              <form onSubmit={handleCheckoutSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
                {/* Items in cart */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Itens Selecionados ({diffDays} dias: {startDate} até {endDate})
                  </div>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div>
                        <strong>{item.name}</strong>
                        <span className="text-slate-400 font-mono text-[10px] block">[{item.code}]</span>
                      </div>
                      <span className="font-bold text-slate-800">R$ {item.dailyRate * diffDays}</span>
                    </div>
                  ))}
                </div>

                {/* Delivery Option */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Como deseja receber os itens?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('entrega')}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                        deliveryType === 'entrega'
                          ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      Entrega no Domicílio (+ R$ 40)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('retirada')}
                      className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all ${
                        deliveryType === 'retirada'
                          ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      Retirar na Loja (Grátis)
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nome Completo do Responsável</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">WhatsApp de Contato</label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Endereço de Entrega</label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Clear Pricing Breakdown (Prompt Section #31) */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                  <div className="font-extrabold text-slate-900 uppercase tracking-wide mb-2">
                    Resumo da Locação
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Valor da Locação ({cart.length} itens, {diffDays} dias):</span>
                    <strong>R$ {rentalTotal}</strong>
                  </div>
                  {deliveryType === 'entrega' && (
                    <div className="flex justify-between text-slate-600">
                      <span>Taxa de Entrega:</span>
                      <strong>R$ {deliveryFee}</strong>
                    </div>
                  )}
                  <div className="flex justify-between text-blue-700 pt-1 border-t border-slate-200">
                    <span>Caução Reembolsável (Garantia):</span>
                    <strong>R$ {depositTotal}</strong>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-300">
                    <span>TOTAL A PAGAR AGORA:</span>
                    <span className="text-blue-600">R$ {totalAmountToPay}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 pt-1 italic">
                    * A caução de R$ {depositTotal} é retida como garantia e estornada no ato da devolução do item em bom estado.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Pagar via Pix Instantâneo (R$ {totalAmountToPay})</span>
                </button>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Reserva Confirmada com Sucesso!</h3>
                  <div className="text-xs text-slate-500 mt-1">
                    Número do pedido: <strong className="font-mono text-blue-600">{confirmedResNumber}</strong>
                  </div>
                </div>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  O produto já foi reservado no sistema administrativo central. Seus itens já foram encaminhados para a bancada de separação e esterilização.
                </p>
                <div className="pt-2 flex justify-center space-x-3">
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setIsFinished(false);
                      setCart([]);
                      setCurrentView('reservations');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md"
                  >
                    Ver no Painel de Reservas
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
