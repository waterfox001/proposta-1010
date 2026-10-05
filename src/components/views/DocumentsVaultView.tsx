import React, { useState } from 'react';
import {
  FileText,
  FileCheck,
  Camera,
  Receipt,
  Download,
  Search,
  Filter,
  Eye,
  ShieldCheck
} from 'lucide-react';

interface DocumentsVaultViewProps {
  subTab?: string;
}

export const DocumentsVaultView: React.FC<DocumentsVaultViewProps> = ({ subTab }) => {
  const [filterType, setFilterType] = useState<string>('TODOS');

  React.useEffect(() => {
    if (!subTab) return;
    if (subTab === 'contracts_docs') setFilterType('Contrato');
    else if (subTab === 'invoices_nf') setFilterType('Nota Fiscal');
    else if (subTab === 'inspection_photos') setFilterType('Fotos');
    else setFilterType('TODOS');
  }, [subTab]);

  const documents = [
    { id: 'doc-1', title: 'Contrato de Locação Digital #LOC-1024', type: 'Contrato', client: 'Mariana Costa Silveira', date: '05/10/2026', size: '240 KB', status: 'Assinado Eletronicamente' },
    { id: 'doc-2', title: 'Termo de Retenção de Caução #LOC-1024', type: 'Comprovante', client: 'Mariana Costa Silveira', date: '05/10/2026', size: '110 KB', status: 'Autenticado' },
    { id: 'doc-3', title: 'Vistoria Fotográfica Pré-Entrega CC-024', type: 'Fotos', client: 'Mariana Costa Silveira', date: '05/10/2026', size: '4.2 MB', status: '3 Fotos em Alta Resolução' },
    { id: 'doc-4', title: 'Nota Fiscal de Serviço Eletrônica NFS-e #892', type: 'Nota Fiscal', client: 'Carlos Eduardo Mendes', date: '30/09/2026', size: '185 KB', status: 'Emitida / Transmitida' },
    { id: 'doc-5', title: 'Laudo Técnico de Vistoria de Avaria #BP-012', type: 'Fotos', client: 'Aline Barbosa Fontes', date: '04/10/2026', size: '2.8 MB', status: 'Comprovação de Rasgo' },
    { id: 'doc-6', title: 'Proposta Comercial Personalizada #PROP-204', type: 'Orçamento', client: 'Camila Peixoto', date: '04/10/2026', size: '310 KB', status: 'Em Aprovação' }
  ];

  const filtered = documents.filter(d => filterType === 'TODOS' || d.type === filterType);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Cofre de Documentos, Contratos & Vistorias</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Repositório central de contratos com assinatura digital, termos de caução, notas fiscais e registros fotográficos
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['TODOS', 'Contrato', 'Comprovante', 'Fotos', 'Nota Fiscal', 'Orçamento'].map(st => (
          <button
            key={st}
            onClick={() => setFilterType(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterType === st
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {st === 'TODOS' ? 'Todos os Documentos' : st}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Cliente / Referência</th>
                <th className="py-3 px-4">Data Emissão</th>
                <th className="py-3 px-4">Status / Validação</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900 flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{doc.title}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 pl-6">{doc.size}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{doc.client}</td>
                  <td className="py-3 px-4 text-slate-500 font-mono">{doc.date}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
