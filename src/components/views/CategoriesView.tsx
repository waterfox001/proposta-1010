import React, { useState } from 'react';
import { Layers, Plus, Package, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CategoriesView: React.FC = () => {
  const { products, setSelectedProductId, setCurrentView } = useApp();

  const [categories, setCategories] = useState<string[]>([
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
  ]);

  const [newCatName, setNewCatName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    if (!categories.includes(newCatName.trim())) {
      setCategories([...categories, newCatName.trim()]);
    }
    setNewCatName('');
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Categorias de Produtos</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Organização do catálogo de locação infantil por famílias de produtos
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nova Categoria</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => {
          const catProducts = products.filter(p => p.category === cat);
          const availableCount = catProducts.filter(p => p.status === 'DISPONIVEL').length;
          const rentedCount = catProducts.filter(p => p.status === 'ALUGADO').length;

          return (
            <div
              key={cat}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{cat}</h3>
                    <div className="text-[11px] text-slate-400">{catProducts.length} itens no acervo</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                  <span className="text-[10px] text-emerald-800 font-bold block">Disponíveis</span>
                  <span className="text-sm font-extrabold text-emerald-900">{availableCount}</span>
                </div>
                <div className="p-2 bg-blue-50 rounded-xl border border-blue-100">
                  <span className="text-[10px] text-blue-800 font-bold block">Alugados</span>
                  <span className="text-sm font-extrabold text-blue-900">{rentedCount}</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('inventory')}
                className="w-full flex items-center justify-center space-x-1.5 py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              >
                <span>Ver produtos no estoque</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal Nova Categoria */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Criar Nova Categoria</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleAddCategory} className="p-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome da Categoria</label>
                <input
                  type="text"
                  placeholder="Ex: Praia & Verão, Segurança"
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:bg-white focus:border-blue-600"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
