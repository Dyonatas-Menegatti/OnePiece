import { AIInsightsCard } from '@/components/features/Simulation/SimulationResults/AIInsightCardProps';
import { Card } from '@/components/features/Simulation/SimulationResults/Card';
import { PageHero } from '@/components/shared/PageHero';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { calcMonthlySavings } from '@/utils/simulation';
import { Anchor, Coins, Gem, Map, ScrollText } from 'lucide-react';
import { useParams } from 'react-router-dom';

export function SimulationResultsPage() {
	const { id } = useParams<{ id: string }>();
	const { getFormData } = useSimulationStorage();
	const data = id ? getFormData(id) : null;

	if (!data) {
		return <p className="text-foreground p-6">Este mapa não aponta para nenhuma simulação.</p>;
	}

	const monthlySavings = calcMonthlySavings(data);

	return (
		<main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
			<PageHero
				title="Mapa da sua jornada"
				subtitle="O Log Pose calculou a rota mais clara até o seu tesouro."
			/>
			<div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
				<Card
					icon={Gem}
					label="Valor do tesouro"
					value={data.goalAmount}
					subtitle={data.goalName}
				/>
				<Card
					icon={Map}
					label="Tempo de navegação"
					value={`${data.goalDeadline} meses`}
					subtitle="Tempo estimado até o destino"
				/>
				<Card
					variant="primary"
					icon={Coins}
					label="Berries por mês"
					value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
					subtitle="Reserva mensal para a rota"
				/>
			</div>
			<div className="grid gap-6 lg:grid-cols-3">
				<AIInsightsCard simulationId={data.id} />
				<div className="order-1 flex flex-col gap-6 lg:order-2">
					<Card
						icon={Coins}
						label="Berries da tripulação"
						value={data.income}
						subtitle="Total que entra no navio por mês"
					/>
					<Card
						icon={Anchor}
						label="Custos do navio"
						value={data.expenses}
						subtitle="Gastos essenciais da tripulação"
					/>
					<Card
						icon={ScrollText}
						label="Promessas e parcelas"
						value={data.debts}
						subtitle="Berries já comprometidos"
					/>
				</div>
			</div>
		</main>
	);
}
