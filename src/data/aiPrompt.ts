import type { ConversationMessage, SimulationRecord } from '@/data/simulation';
import { parseCurrency } from '@/utils/currency';
import { calcMonthlySavings } from '@/utils/simulation';

const RESPONSE_SCHEMA = `{
  "feasibility": {
    "status": "viable" | "needs_adjustment" | "unfeasible",
    "content": "<Análise objetiva sobre se a meta é atingível no prazo com o valor disponível. Mencione os números relevantes.>"
  },
  "diagnosis": {
    "content": "<Diagnóstico focado no comprometimento do orçamento: quanto % da renda está comprometida com gastos e dívidas, e o que isso representa para a saúde financeira.>"
  },
  "suggestions": {
    "items": ["<Sugestão prática e concreta para reduzir gastos ou reorganizar o orçamento>"]
  },
  "extraIncome": {
    "items": ["<Ideia prática para gerar renda extra compatível com a realidade brasileira>"]
  },
  "investment": {
    "items": ["<Sugestão de investimento acessível para o perfil apresentado, com foco em atingir a meta>"]
  },
  "motivation": {
    "content": "<Mensagem final motivacional e personalizada, citando a meta pelo nome.>"
  }
}`;

export function buildAIPrompt(simulation: SimulationRecord) {
	const { income, expenses, debts, goalName, goalAmount, goalDeadline } = simulation;

	const monthlySavings = calcMonthlySavings(simulation);
	const monthlySavingsNeeded = parseCurrency(goalAmount) / parseInt(goalDeadline);

	return `Você é o navegador financeiro de uma tripulação brasileira. Analise os dados abaixo e gere um diagnóstico personalizado com linguagem clara, didática e encorajadora. Use referências leves a rotas, viagem, tripulação e tesouro, sem exagerar e sem sacrificar a precisão financeira. O diagnóstico será exibido diretamente ao usuário no app, fale sempre em segunda pessoa ("você tem...", "seu tesouro...").

Dados da simulação:
- Berries que entram por mês: ${income}
- Custos essenciais do navio: ${expenses}
- Promessas e parcelas mensais: ${debts}
- Berries disponíveis por mês: ${monthlySavings} reais
- Tesouro: ${goalName}
- Valor do tesouro: ${goalAmount}
- Tempo de rota: ${goalDeadline} meses
- Berries necessários por mês para chegar ao tesouro: ${monthlySavingsNeeded} reais
- Saldo após reservar para o tesouro: ${monthlySavings - monthlySavingsNeeded} reais

Retorne APENAS um JSON válido, sem texto adicional, sem blocos de código, neste formato exato:

${RESPONSE_SCHEMA}

Regras:
- Todos os textos em português do Brasil
- Máximo de 4 itens por lista
- Seja específico ao citar valores calculados
- Não repita informações entre seções
- Nunca use markdown dentro dos valores do JSON
- Para o campo "feasibility.status", use os seguintes critérios:
  - "viable": saldo após reserva para a meta é maior ou igual a 0
  - "needs_adjustment": saldo negativo de até 20% do valor da economia mensal necessária
  - "unfeasible": saldo negativo superior a 20% do valor da economia mensal necessária`;
}

export function buildQuestionPrompt(
	simulation: SimulationRecord,
	question: string,
	conversation: ConversationMessage[],
) {
	const history = conversation
		.map((message) => `${message.role === 'user' ? 'Usuário' : 'Educador'}: ${message.content}`)
		.join('\n');

	return `Você é o navegador financeiro de uma tripulação brasileira. Responda à pergunta usando os dados da rota abaixo. Seja objetivo, prático e responsável, usando referências leves a viagem, tripulação e tesouro. Não invente dados, não use markdown, listas com símbolos ou JSON. Responda em português do Brasil.

Dados da simulação:
- Renda mensal: ${simulation.income}
- Custos fixos: ${simulation.expenses}
- Dívidas e parcelas: ${simulation.debts}
- Meta: ${simulation.goalName}
- Valor da meta: ${simulation.goalAmount}
- Prazo: ${simulation.goalDeadline} meses

Histórico da conversa:
${history || 'Nenhuma pergunta anterior.'}

Pergunta atual: ${question}

Responda somente com a resposta que será exibida ao usuário.`;
}
