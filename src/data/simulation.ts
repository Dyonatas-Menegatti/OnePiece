import { Anchor, Coins, Compass, Gem, Map, ScrollText } from 'lucide-react';

import type { InsightData } from '@/services/aiServices';
import type { FormStepProps } from '../components/features/Simulation/FormStep';

export const simulationFormSteps = [
	{
		id: 'income',
		icon: Coins,
		title: 'Berries da tripulação',
		question: 'Quanto entra no seu navio todo mês, somando todas as fontes?',
		inputProps: {
			placeholder: 'ex: 5.000,00',
			prefix: 'R$',
			maxLength: 12,
		},
	},
	{
		id: 'expenses',
		icon: Anchor,
		title: 'Custos para manter o navio',
		question: 'Quanto sua tripulação gasta por mês com custos essenciais?',
		inputProps: {
			placeholder: 'ex: 2.000,00',
			prefix: 'R$',
			maxLength: 12,
		},
	},
	{
		id: 'debts',
		icon: ScrollText,
		title: 'Promessas e parcelas',
		question: 'Quanto dos seus berries já está comprometido com dívidas ou parcelas?',
		inputProps: {
			placeholder: 'ex: 500,00',
			prefix: 'R$',
			maxLength: 12,
		},
	},
	{
		id: 'goalName',
		icon: Compass,
		title: 'Nome do seu tesouro',
		question: 'Qual tesouro você quer encontrar no fim dessa jornada?',
		inputProps: {
			placeholder: 'ex: Navio novo para a tripulação',
			maxLength: 50,
		},
	},
	{
		id: 'goalAmount',
		icon: Gem,
		title: 'Valor do tesouro',
		question: 'Quantos berries são necessários para realizar esse sonho?',
		inputProps: {
			placeholder: 'ex: 15.000,00',
			prefix: 'R$',
			maxLength: 12,
		},
	},
	{
		id: 'goalDeadline',
		icon: Map,
		title: 'Rota até o destino',
		question: 'Em quantos meses você quer chegar ao seu tesouro?',
		inputProps: {
			type: 'number',
			placeholder: 'ex: 12',
			suffix: 'meses',
			min: 1,
			max: 120,
		},
		submitButtonProps: {
			label: 'Traçar minha rota',
			emojiIcon: '⚓',
		},
	},
] satisfies FormStepProps[];

export type SimulationFormData = Record<(typeof simulationFormSteps)[number]['id'], string>;

export interface ConversationMessage {
	role: 'user' | 'assistant';
	content: string;
	timestamp: string;
}

export type SimulationRecord = SimulationFormData & {
	id: string;
	createdAt?: string;
	insight?: InsightData;
	conversation?: ConversationMessage[];
};
