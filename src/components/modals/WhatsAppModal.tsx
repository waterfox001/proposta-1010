import React, { useState } from 'react';
import { MessageCircle, X, Send, Copy, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhatsAppModal: React.FC = () => {
  const { whatsAppData, closeWhatsAppModal, addAuditLog } = useApp();
  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(whatsAppData?.type || 'confirmacao');
  const [customText, setCustomText] = useState(whatsAppData?.defaultText || '');

  if (!whatsAppData) return null;

  const templates: Record<string, { label: string; text: string }> = {
    confirmacao: {
      label: 'Enviar Confirmação',
      text: `Olá ${whatsAppData.customerName}! 🌟\nSua locação está 100% confirmada! Seus produtos já foram higienizados e separados com todo carinho para seu bebê. Agradecemos a confiança!`
    },
    lembrete: {
      label: 'Lembrete de Devolução',
      text: `Olá ${whatsAppData.customerName}! Tudo bem?\nLembramos que o prazo de devolução dos itens alugados encerra-se em breve. Caso deseje estender o período por mais alguns dias, basta nos avisar por aqui!`
    },
    cobranca: {
      label: 'Cobrança de Atraso / Diária Extra',
      text: `Olá ${whatsAppData.customerName}, tudo bem?\nConstatamos que o prazo previsto para devolução expirou. Por favor, entre em contato para regularizarmos a renovação da locação ou agendarmos a coleta. Equipe de Atendimento.`
    },
    comprovante: {
      label: 'Enviar Comprovante / Recibo',
      text: `Olá ${whatsAppData.customerName}! Segue a confirmação do pagamento e caução da sua locação. O termo de responsabilidade e o laudo de higienização estão vinculados ao seu pedido.`
    },
    endereco: {
      label: 'Endereço e Janela de Entrega',
      text: `Olá ${whatsAppData.customerName}! Nosso motorista está em rota para realizar a entrega dos itens do seu bebê na janela combinada. Por favor, confirme se haverá alguém no local para o recebimento.`
    }
  };

  const handleTemplateChange = (type: string) => {
    setSelectedTemplate(type);
    setCustomText(templates[type].text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(customText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = whatsAppData.phone.replace(/\D/g, '');
    const encoded = encodeURIComponent(customText);
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
    addAuditLog(`Mensagem WhatsApp (${templates[selectedTemplate]?.label}) enviada para ${whatsAppData.customerName}`, 'locacao', `Telefone: ${cleanPhone}`);
    closeWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-600/50 rounded-xl">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">Disparo via WhatsApp</div>
              <div className="text-[11px] text-emerald-100">
                Cliente: {whatsAppData.customerName} ({whatsAppData.phone})
              </div>
            </div>
          </div>
          <button
            onClick={closeWhatsAppModal}
            className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates selector */}
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
            Modelos Rápidos (1-Clique)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(templates).map(([key, tpl]) => (
              <button
                key={key}
                onClick={() => handleTemplateChange(key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedTemplate === key
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message preview / edit */}
        <div className="p-4">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Mensagem personalizada:
          </label>
          <textarea
            rows={5}
            value={customText}
            onChange={e => setCustomText(e.target.value)}
            className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all leading-relaxed text-slate-800"
          />
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={closeWhatsAppModal}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/30 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Abrir WhatsApp Web</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
