import { GoogleGenAI } from '@google/genai';
import { ProductUnit, Rental, Reservation, FinancialTransaction } from '../types';

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export async function askOperationalAI(
  userQuery: string,
  contextData: {
    products: ProductUnit[];
    rentals: Rental[];
    reservations: Reservation[];
    financial: FinancialTransaction[];
    delayedCount: number;
    occupancyRate: number;
  }
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;

  const totalRevenue = contextData.financial
    .filter(f => f.type === 'receita_locacao')
    .reduce((sum, f) => sum + f.amount, 0);

  const pendingReceive = contextData.rentals
    .filter(r => r.paymentStatus === 'pendente')
    .reduce((sum, r) => sum + r.totalAmount, 0);

  const idleProducts = contextData.products.filter(p => p.daysInactive >= 30);
  const delayedRentals = contextData.rentals.filter(r => r.status === 'atrasada');
  const availableProducts = contextData.products.filter(p => p.status === 'DISPONIVEL');

  const systemContext = `
Você é o assistente executivo e operacional inteligente do sistema de locação infantil, especializado em gestão de produtos e carrinhos/cadeirinhas para bebês.
Responda de forma direta, analítica e precisa com base nos seguintes dados reais da empresa:
- Faturamento acumulado recente: R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- Valores pendentes a receber: R$ ${pendingReceive.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
- Taxa de Ocupação do Estoque: ${contextData.occupancyRate}%
- Total de produtos no acervo: ${contextData.products.length}
- Produtos 100% disponíveis agora: ${availableProducts.length}
- Locações atrasadas: ${delayedRentals.length} (${delayedRentals.map(d => `${d.rentalNumber} - ${d.customerName}`).join(', ')})
- Produtos parados há mais de 30 dias: ${idleProducts.length} (${idleProducts.map(p => `${p.code} ${p.name} - ${p.daysInactive} dias`).join(', ')})
- Categorias principais: Cadeirinhas, Bebê-conforto, Carrinhos, Berços, Cercadinhos, Alimentação, Banho, Brinquedos, Acessórios.

Regras de resposta:
- Seja profissional, claro e objetivo.
- Use marcadores e dados numéricos quando relevante.
- Forneça recomendações práticas para a operação (ex: sugerir desconto para produto parado ou acionar cliente em atraso).
- Responda sempre em português do Brasil.
`;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${systemContext}\n\nPergunta do usuário: "${userQuery}"`
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local analysis engine', err);
    }
  }

  // Fallback intelligent heuristic engine based on operational keywords
  const q = userQuery.toLowerCase();

  if (q.includes('fatur') || q.includes('receit') || q.includes('ganho') || q.includes('lucro')) {
    return `📊 **Análise Financeira:**\n\n• **Faturamento total registrado:** R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n• **A receber:** R$ ${pendingReceive.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n• **Categoria com maior ticket:** Carrinhos de Bebê (Priam e YOYO²) e Cadeirinhas 360°.\n• **Dica:** Oferecer pacotes de 15 a 30 dias aumenta o ticket médio em 34%.`;
  }

  if (q.includes('atras') || q.includes('vencid') || q.includes('pendent')) {
    if (delayedRentals.length > 0) {
      return `🔴 **Atenção: Locações em Atraso:**\n\n• **${delayedRentals[0].rentalNumber}** - ${delayedRentals[0].customerName}\n• **Item:** ${delayedRentals[0].items[0]?.productName || 'Produto'}\n• **Devolução prevista:** ${delayedRentals[0].expectedReturnDate}\n• **Ação recomendada:** Enviar notificação de cobrança e extensão contratual via WhatsApp imediatamente.`;
    }
    return `✅ Nenhuma locação em atraso crítico no momento! Todas as devoluções de hoje estão dentro da rota programada.`;
  }

  if (q.includes('parad') || q.includes('baixa utiliz') || q.includes('30 dia') || q.includes('ocios')) {
    return `⚠️ **Produtos com Baixa Utilização (> 30 dias parados):**\n\n${idleProducts
      .map(p => `• **${p.code}** - ${p.name} (${p.daysInactive} dias sem locação) - Sugestão: reduzir diária ou incluir em combo de berço.`)
      .join('\n')}\n\n💡 **Insight:** Itens com mais de 60 dias sem locação geram custo de oportunidade de armazenagem.`;
  }

  if (q.includes('dispon') || q.includes('estoque') || q.includes('quant')) {
    return `📦 **Visão do Estoque Atual:**\n\n• **Produtos Disponíveis:** ${availableProducts.length} itens\n• **Taxa de Ocupação:** ${contextData.occupancyRate}%\n• **Itens em Higienização:** ${contextData.products.filter(p => p.status === 'EM_HIGIENIZACAO').length}\n• **Itens em Manutenção:** ${contextData.products.filter(p => p.status === 'EM_MANUTENCAO').length}\n\nPara verificar datas específicas, utilize o botão **"Verificar Disponibilidade"** no menu superior.`;
  }

  return `🤖 **Assistente Operacional AI:**\n\nCom base nos dados em tempo real da operação:\n• Ocupação do estoque: **${contextData.occupancyRate}%**\n• Produtos prontos para saída: **${availableProducts.length}**\n• Locações ativas monitoradas: **${contextData.rentals.filter(r => r.status === 'ativa').length}**\n\nPosso ajudar você com análises de faturamento, verificação de itens ociosos, pendências de devolução ou sugestão de preços!`;
}
