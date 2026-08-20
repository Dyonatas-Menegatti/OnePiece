import { useCallback, useEffect, useRef, useState } from 'react';

import { buildAIPrompt, buildQuestionPrompt } from '@/data/aiPrompt';
import type { ConversationMessage, SimulationRecord } from '@/data/simulation';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { askQuestion as askAIQuestion, getInsight, type InsightData } from '@/services/aiServices';

export const useInsight = (id: string) => {
	const isRequestPending = useRef(false);
	const { getFormData, updateSimulation } = useSimulationStorage();
	const [insight, setInsight] = useState<InsightData | null>(() => {
		const simulation = getFormData(id);

		if (simulation?.insight) {
			return simulation.insight;
		}

		return null;
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [conversation, setConversation] = useState<ConversationMessage[]>(
		() => getFormData(id)?.conversation ?? [],
	);
	const [isAsking, setIsAsking] = useState(false);
	const [questionError, setQuestionError] = useState<string | null>(null);

	// useCallback é necessário pois essa função entra no array de dependências do useEffect
	const fetchInsight = useCallback(
		async (simulationId: string) => {
			const simulation = getFormData(simulationId);

			if (!simulation) {
				setError('Simulação não encontrada.');
				return;
			}

			isRequestPending.current = true;
			setIsLoading(true);
			setError(null);

			try {
				const prompt = buildAIPrompt(simulation);
				const data = await getInsight(prompt);
				setInsight(data);

				updateSimulation(simulationId, {
					...simulation,
					insight: data,
				} as SimulationRecord);
				return data;
			} catch {
				setError('Erro ao gerar o diagnóstico. Tente novamente.');
			} finally {
				isRequestPending.current = false;
				setIsLoading(false);
			}
		},
		[getFormData, updateSimulation],
	);

	useEffect(() => {
		if (insight || isLoading || error || isRequestPending.current) {
			return;
		}

		fetchInsight(id);
	}, [id, insight, isLoading, error, fetchInsight]);

	const askQuestion = useCallback(
		async (question: string) => {
			const simulation = getFormData(id);
			if (!simulation || !question.trim() || isAsking) return;

			setIsAsking(true);
			setQuestionError(null);
			try {
				const answer = await askAIQuestion(
					buildQuestionPrompt(simulation, question.trim(), conversation),
				);
				const messages: ConversationMessage[] = [
					...conversation,
					{ role: 'user', content: question.trim(), timestamp: new Date().toISOString() },
					{ role: 'assistant', content: answer, timestamp: new Date().toISOString() },
				];
				setConversation(messages);
				updateSimulation(id, { ...simulation, conversation: messages } as SimulationRecord);
			} catch {
				setQuestionError('Não foi possível responder agora. Tente novamente.');
			} finally {
				setIsAsking(false);
			}
		},
		[conversation, getFormData, id, isAsking, updateSimulation],
	);

	return {
		insight,
		isLoading,
		error,
		fetchInsight,
		conversation,
		askQuestion,
		isAsking,
		questionError,
	};
};
