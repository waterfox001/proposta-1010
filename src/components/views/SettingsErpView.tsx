import React, { useState } from 'react';
import {
  Settings,
  Building,
  DollarSign,
  Truck,
  CreditCard,
  FileText,
  Bell,
  Link,
  Shield,
  Check
} from 'lucide-react';

interface SettingsErpViewProps {
  subTab?: string;
}

export const SettingsErpView: React.FC<SettingsErpViewProps> = ({ subTab }) => {
  const [activeSection, setActiveSection] = useState<'empresa' | 'taxas' | 'politicas' | 'integracoes'>('empresa');

  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'pricing_settings') setActiveSection('taxas');
    else if (subTab === 'policies_settings') setActiveSection('politicas');
    else if (subTab === 'integrations_settings') setActiveSection('integracoes');
    else setActiveSection('empresa');
  }, [subTab]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Configurações Gerais & Parâmetros do ERP</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Dados cadastrais da empresa, precificação de fretes, políticas de caução e regras de negócio
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveSection('empresa')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeSection === 'empresa' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Dados da Empresa
        </button>
        <button
          onClick={() => setActiveSection('taxas')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeSection === 'taxas' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Taxas & Logística
        </button>
        <button
          onClick={() => setActiveSection('politicas')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeSection === 'politicas' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Políticas de Caução
        </button>
        <button
          onClick={() => setActiveSection('integracoes')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeSection === 'integracoes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          Integrações & APIs
        </button>
      </div>

      {/* Section: Empresa */}
      {activeSection === 'empresa' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Razão Social</label>
              <input
                type="text"
                defaultValue="Kids Rent Locações de Bens Móveis Infantis Ltda"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">CNPJ</label>
              <input
                type="text"
                defaultValue="42.891.204/0001-89"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">E-mail Operacional</label>
              <input
                type="email"
                defaultValue="contato@locacaoinfantil.com.br"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Comercial</label>
              <input
                type="text"
                defaultValue="(11) 98452-9182"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Endereço da Base / Galpão de Higienização</label>
            <input
              type="text"
              defaultValue="Av. Moema, 450 - Doca 02 - Indianópolis, São Paulo - SP, 04077-020"
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs">
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* Section: Taxas */}
      {activeSection === 'taxas' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Taxa Padrão de Entrega (São Paulo Capital)</label>
              <input
                type="number"
                defaultValue={40}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Taxa Coleta Agendada</label>
              <input
                type="number"
                defaultValue={40}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Tolerância Máxima de Devolução sem Cobrança Extra</label>
            <select className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl">
              <option>Até 2 horas de tolerância após horário combinado</option>
              <option>Até 4 horas de tolerância</option>
              <option>Sem tolerância (cobrança proporcional imediata)</option>
            </select>
          </div>
        </div>
      )}

      {/* Section: Integrações */}
      {activeSection === 'integracoes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs">PIX</div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">Banco Central / Chave Pix</h4>
                <span className="text-[11px] text-emerald-600 font-bold">● Conectado & Ativo</span>
              </div>
            </div>
            <button className="text-xs text-blue-600 font-bold hover:underline">Configurar</button>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs">WA</div>
              <div>
                <h4 className="font-bold text-xs text-slate-900">WhatsApp Business Cloud API</h4>
                <span className="text-[11px] text-emerald-600 font-bold">● Pronto p/ Disparos</span>
              </div>
            </div>
            <button className="text-xs text-blue-600 font-bold hover:underline">Configurar</button>
          </div>
        </div>
      )}
    </div>
  );
};
