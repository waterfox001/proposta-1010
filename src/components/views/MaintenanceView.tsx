import React, { useState } from 'react';
import { Wrench, Plus, CheckCircle, Clock, AlertTriangle, ArrowRight, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MaintenanceView: React.FC = () => {
  const { maintenances, completeMaintenance, products, createMaintenanceOrder } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState(products[0]?.id || '');
  const [problemDesc, setProblemDesc] = useState('');
  const [vendor, setVendor] = useState('Oficina Autorizada');
  const [cost, setCost] = useState(120);

  const handleOpenOS = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find(p => p.id === selectedProdId);
    if (!prod || !problemDesc) return;

    createMaintenanceOrder({
      productId: prod.id,
      productCode: prod.code,
      productName: prod.name,
      category: prod.category,
      problemDescription: problemDesc,
      estimatedCompletion: '2026-10-12',
      technician: 'Roberto Técnico',
      vendor,
      cost,
      partsUsed: ['Reposição de presilha/ajuste']
    });

    setIsModalOpen(false);
    setProblemDesc('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Oficina & Ordens de Manutenção (O.S.)</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manutenção preventiva, conserto de travas, costura e reposição de peças de reposição autorizadas
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md shadow-rose-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Abrir Ordem de Serviço</span>
        </button>
      </div>

      {/* Maintenances List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {maintenances.map(maint => (
          <div
            key={maint.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
              maint.status === 'concluida'
                ? 'bg-slate-50 border-slate-200 opacity-80'
                : 'bg-white border-rose-200 shadow-xs hover:border-rose-400'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="font-mono bg-rose-900 text-rose-100 text-xs font-bold px-2 py-0.5 rounded-lg">
                  {maint.productCode}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    maint.status === 'concluida'
                      ? 'bg-emerald-100 text-emerald-800'
                      : maint.status === 'aguardando_peca'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800 animate-pulse'
                  }`}
                >
                  {maint.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-xs text-slate-900 leading-tight">{maint.productName}</h3>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Entrada: <strong>{maint.entryDate}</strong> • Previsão: <strong>{maint.estimatedCompletion}</strong>
                </div>
              </div>

              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs space-y-1">
                <div className="text-[10px] font-bold text-rose-900 uppercase">Defeito Registrado:</div>
                <div className="text-slate-800 text-[11px] leading-relaxed">{maint.problemDescription}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px]">Técnico / Oficina</span>
                  <strong>{maint.technician}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Custo do Reparo</span>
                  <strong className="text-rose-600">R$ {maint.cost}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">{maint.vendor}</span>

              {maint.status !== 'concluida' && (
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => completeMaintenance(maint.id, true)}
                    className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors"
                    title="Conclui conserto e envia para lavagem/esterilização"
                  >
                    Higienizar & Liberar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Nova O.S. */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">Abrir Ordem de Serviço de Manutenção</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleOpenOS} className="p-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Selecione o Produto</label>
                <select
                  value={selectedProdId}
                  onChange={e => setSelectedProdId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>[{p.code}] {p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descrição do Problema / Peça Danificada</label>
                <textarea
                  rows={3}
                  value={problemDesc}
                  onChange={e => setProblemDesc(e.target.value)}
                  placeholder="Ex: Cinto 5 pontos desfiado ou presilha de fixação isofix com mola frouxa..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fornecedor / Oficina</label>
                  <input
                    type="text"
                    value={vendor}
                    onChange={e => setVendor(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Custo Estimado (R$)</label>
                  <input
                    type="number"
                    value={cost}
                    onChange={e => setCost(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-md"
                >
                  Abrir O.S. & Travar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
