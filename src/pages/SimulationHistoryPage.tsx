import { BookOpen, CalendarClock, Eye, Gem, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/shared/Button';
import { Divider } from '@/components/shared/Divider';
import { PageHero } from '@/components/shared/PageHero';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { parseCurrency } from '@/utils/currency';
import { calcMonthlySavings } from '@/utils/simulation';

const currency = (value: string) =>
	parseCurrency(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDate = (value?: string) =>
	value
		? new Date(value).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			})
		: 'Data não disponível';

export function SimulationHistoryPage() {
	const navigate = useNavigate();
	const { getAllFormData, deleteSimulation } = useSimulationStorage();
	const [simulations, setSimulations] = useState(getAllFormData);

	const removeSimulation = (id: string) => {
		const simulation = simulations.find((item) => item.id === id);
		if (
			!simulation ||
			!window.confirm(
				`Tem certeza que deseja retirar o tesouro "${simulation.goalName}" do diário de bordo?`,
			)
		) {
			return;
		}

		deleteSimulation(id);
		setSimulations((current) => current.filter((simulation) => simulation.id !== id));
	};

	return (
		<main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
			<PageHero
				title="Diário de bordo"
				subtitle="Relembre cada rota traçada pela sua tripulação financeira."
			/>
			{simulations.length === 0 ? (
				<section className="bg-card flex flex-col items-center justify-center rounded-2xl p-10 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.12)]">
					<BookOpen className="text-primary mb-4" size={36} />
					<h2 className="text-foreground text-xl font-semibold">Nenhuma rota registrada</h2>
					<p className="text-muted-foreground mt-2 max-w-md text-sm">
						Trace sua primeira rota e descubra como chegar ao tesouro com sua tripulação.
					</p>
					<Button variant="primary" icon={Plus} className="mt-6" onClick={() => void navigate('/')}>
						Novo Log Pose
					</Button>
				</section>
			) : (
				<div className="grid gap-4">
					{simulations.map((simulation) => (
						<article
							key={simulation.id}
							className="bg-card border-border rounded-2xl border p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.12)] sm:p-6"
						>
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-primary flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
										<Gem size={16} />
										Tesouro da tripulação
									</p>
									<h2 className="text-foreground mt-1 text-xl font-semibold">
										{simulation.goalName}
									</h2>
								</div>
							</div>
							<div className="text-muted-foreground mt-5 grid gap-4 text-sm sm:grid-cols-3">
								<div>
									<span className="block text-xs uppercase">Valor do tesouro</span>
									<strong className="text-foreground mt-1 block">
										{currency(simulation.goalAmount)}
									</strong>
								</div>
								<div>
									<span className="block text-xs uppercase">Berries por mês</span>
									<strong className="text-foreground mt-1 block">
										{currency(String(calcMonthlySavings(simulation)))}
									</strong>
								</div>
								<div>
									<span className="block text-xs uppercase">Tempo de rota</span>
									<strong className="text-foreground mt-1 flex items-center gap-1">
										<CalendarClock size={15} />
										{simulation.goalDeadline} meses
									</strong>
								</div>
							</div>
							<p className="text-muted-foreground mt-4 text-xs">
								Rota registrada em {formatDate(simulation.createdAt)}
							</p>
							<Divider spacing={16} />
							<div className="flex flex-row gap-3">
								<Button
									variant="secondary"
									icon={Eye}
									className="min-w-0 flex-1"
									onClick={() => void navigate(`/resultado/${simulation.id}`)}
								>
									Abrir mapa
								</Button>
								<Button
									variant="ghost"
									icon={Trash2}
									className="text-red-500"
									onClick={() => removeSimulation(simulation.id)}
								>
									Excluir
								</Button>
							</div>
						</article>
					))}
				</div>
			)}
		</main>
	);
}
