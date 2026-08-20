import { useInsight } from '@/hooks/useInsight';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Content } from '../../Insight/Content';
import { Error } from '../../Insight/Error';

interface AIInsightCardProps {
	simulationId: string;
}

export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
	const {
		insight,
		isLoading,
		error,
		fetchInsight,
		conversation,
		askQuestion,
		isAsking,
		questionError,
	} = useInsight(simulationId);
	const [question, setQuestion] = useState('');
	const conversationEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [conversation.length]);

	const submitQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!question.trim()) return;
		await askQuestion(question);
		setQuestion('');
	};

	return (
		<div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
			<div className="mb-3 flex items-center gap-1.5">
				<span>✨</span>
				<span className="text-primary text-xs font-semibold uppercase tracking-widest">
					Insight Financeiro Personalizado
				</span>
			</div>

			{isLoading && (
				<div className="flex">
					<Skeleton
						count={9.5}
						baseColor="var(--color-skeleton-base)"
						highlightColor="var(--color-skeleton-highlight)"
						className="mb-3 flex rounded-lg"
						containerClassName="flex-1"
						inline
					/>
				</div>
			)}
			{!isLoading && error && (
				<Error
					simulationId={simulationId}
					message={error}
					onRetry={() => fetchInsight(simulationId)}
				/>
			)}
			{!isLoading && insight && <Content insight={insight} />}

			{!isLoading && insight && (
				<section className="border-border mt-6 border-t pt-5">
					<div className="mb-3 flex items-center gap-2">
						<MessageCircle size={18} className="text-primary" />
						<h2 className="text-foreground text-sm font-semibold">
							Conversando com o Educador Financeiro
						</h2>
					</div>
					<div className="max-h-72 space-y-3 overflow-y-auto pr-1">
						{conversation.map((message, index) => (
							<div
								key={`${message.timestamp}-${index}`}
								className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
							>
								<p
									className={`max-w-[90%] rounded-xl px-3 py-2 text-sm leading-relaxed ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary-button text-muted-foreground'}`}
								>
									{message.content}
								</p>
							</div>
						))}
						{isAsking && (
							<p className="text-muted-foreground text-sm">
								O educador está preparando uma resposta...
							</p>
						)}
						<div ref={conversationEndRef} />
					</div>
					{questionError && <p className="mt-2 text-sm text-red-500">{questionError}</p>}
					<form className="mt-4 flex gap-2" onSubmit={submitQuestion}>
						<input
							value={question}
							onChange={(event) => setQuestion(event.target.value)}
							placeholder="Pergunte sobre sua simulação..."
							disabled={isAsking}
							className="border-border bg-input text-foreground focus:border-primary min-w-0 flex-1 rounded-xl border px-3 py-3 text-sm outline-none"
						/>
						<button
							type="submit"
							aria-label="Enviar pergunta"
							disabled={isAsking || !question.trim()}
							className="bg-primary text-primary-foreground flex h-11 w-11 shrink-0 items-center justify-center rounded-xl disabled:opacity-50"
						>
							<ArrowUp size={18} />
						</button>
					</form>
				</section>
			)}
		</div>
	);
}
