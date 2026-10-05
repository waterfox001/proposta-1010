import React, { useState } from 'react';
import {
  Package,
  Search,
  Plus,
  Filter,
  Eye,
  MapPin,
  Tag,
  Clock,
  Sparkles,
  Wrench,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductStatus, ProductCategory, ProductCondition } from '../../types';

export const InventoryView: React.FC = () => {
  const {
    products,
    addProduct,
    setSelectedProductId,
    updateProductStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('TODOS');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newCode, setNewCode] = useState('CC-035');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('Cadeirinhas');
  const [newBrand, setNewBrand] = useState('Burigotto');
  const [newModel, setNewModel] = useState('');
  const [newLocation, setNewLocation] = useState('Setor A - Prateleira 04');
  const [newDailyRate, setNewDailyRate] = useState(35);
  const [newDeposit, setNewDeposit] = useState(200);

  const tabs = [
    { id: 'TODOS', label: 'Todos' },
    { id: 'DISPONIVEL', label: 'Disponíveis' },
    { id: 'ALUGADO', label: 'Alugados' },
    { id: 'RESERVADO', label: 'Reservados' },
    { id: 'EM_HIGIENIZACAO', label: 'Em Higienização' },
    { id: 'EM_MANUTENCAO', label: 'Em Manutenção' },
    { id: 'DANIFICADO', label: 'Danificados' },
    { id: 'PARADOS', label: 'Parados (>30d)' }
  ];

  const categories: (ProductCategory | 'TODAS')[] = [
    'TODAS',
    'Cadeirinhas',
    'Bebê-conforto',
    'Carrinhos',
    'Berços',
    'Cercadinhos',
    'Alimentação',
    'Banho',
    'Brinquedos',
    'Acessórios',
    'Outros'
  ];

  const filteredProducts = products.filter(p => {
    let matchesTab = true;
    if (activeTab === 'PARADOS') {
      matchesTab = p.daysInactive >= 30;
    } else if (activeTab !== 'TODOS') {
      matchesTab = p.status === activeTab;
    }

    const matchesCategory = selectedCategory === 'TODAS' || p.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch =
      p.code.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      (p.currentCustomerName && p.currentCustomerName.toLowerCase().includes(q));

    return matchesTab && matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case 'DISPONIVEL':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Disponível</span>;
      case 'ALUGADO':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Alugado</span>;
      case 'RESERVADO':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Reservado</span>;
      case 'EM_HIGIENIZACAO':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800">Em Higienização</span>;
      case 'EM_MANUTENCAO':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">Em Manutenção</span>;
      case 'DANIFICADO':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">Danificado</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    addProduct({
      code: newCode,
      sku: `SKU-${newCode}`,
      name: newName,
      category: newCategory,
      brand: newBrand,
      model: newModel || newName,
      location: newLocation,
      purchaseValue: 800,
      dailyRate: Number(newDailyRate),
      weeklyRate: Number(newDailyRate) * 4.5,
      monthlyRate: Number(newDailyRate) * 10,
      depositValue: Number(newDeposit),
      status: 'DISPONIVEL',
      condition: 'perfeito',
      photoUrl: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80',
      includedAccessories: ['Manual', 'Bolsa de proteção']
    });

    setIsAddModalOpen(false);
    setNewName('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Estoque & Controle Individual de Unidades</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Rastreamento unitário por código (CC-024, CB-014, BP-012), localização física e ciclo de higienização
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Cadastrar Nova Unidade</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Buscar por código (CC-024), nome, marca..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 transition-all"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs text-slate-500 font-semibold shrink-0">Categoria:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="p-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl outline-none font-medium text-slate-700"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-400 pl-2">
            Mostrando <strong>{filteredProducts.length}</strong> itens
          </span>
        </div>
      </div>

      {/* Products Grid / Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono bg-slate-900 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-md">
                    {product.code}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    {product.category}
                  </span>
                </div>
                {getStatusBadge(product.status)}
              </div>

              {/* Product Visual & Basic Info */}
              <div className="flex space-x-3">
                <img
                  src={product.photoUrl}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="font-bold text-xs text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-[11px] text-slate-500">
                    {product.brand} • {product.model}
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] text-slate-400">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{product.location}</span>
                  </div>
                </div>
              </div>

              {/* Status Specific Context Info */}
              {product.status === 'ALUGADO' && (
                <div className="mt-3 p-2 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-950">
                  <div className="font-bold">Locado para: {product.currentCustomerName}</div>
                  <div className="text-[10px] text-amber-800">
                    Devolução: <strong>{product.returnDueDate}</strong>
                  </div>
                </div>
              )}

              {product.daysInactive >= 30 && product.status === 'DISPONIVEL' && (
                <div className="mt-3 p-2 bg-rose-50 rounded-xl border border-rose-200 text-[11px] text-rose-900 flex items-center space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>
                    Parado há <strong>{product.daysInactive} dias</strong> sem locação.
                  </span>
                </div>
              )}

              {/* Rates strip */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10px] bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block">Diária</span>
                  <strong className="text-slate-800">R$ {product.dailyRate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Semanal</span>
                  <strong className="text-slate-800">R$ {product.weeklyRate}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Caução</span>
                  <strong className="text-blue-600">R$ {product.depositValue}</strong>
                </div>
              </div>
            </div>

            {/* Footer action button */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Alugado {product.rentalCount}x • Rec: R$ {product.totalRevenue}
              </span>
              <button
                onClick={() => setSelectedProductId(product.id)}
                className="flex items-center space-x-1 px-3 py-1 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Dossiê</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h2 className="text-sm font-bold">Cadastrar Nova Unidade no Estoque</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateProduct} className="p-5 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Código Unitário</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-mono uppercase font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  >
                    {categories.filter(c => c !== 'TODAS').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome do Produto</label>
                <input
                  type="text"
                  placeholder="Ex: Cadeirinha Matrix Evolution K"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Marca</label>
                  <input
                    type="text"
                    value={newBrand}
                    onChange={e => setNewBrand(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Localização no Galpão</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={e => setNewLocation(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Diária (R$)</label>
                  <input
                    type="number"
                    value={newDailyRate}
                    onChange={e => setNewDailyRate(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Caução Sugerida (R$)</label>
                  <input
                    type="number"
                    value={newDeposit}
                    onChange={e => setNewDeposit(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700"
                >
                  Salvar Unidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
