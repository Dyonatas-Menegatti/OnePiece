import { Compass, ShipWheel } from 'lucide-react';

export function SimulationHero() {
	return (
		<div className="mb-8 text-center">
			<div className="flex flex-col items-center">
				<div className="text-primary mb-3 flex items-center gap-3">
					<ShipWheel size={30} />
					<span className="text-treasure text-xs font-bold uppercase tracking-[0.28em]">
						Grand Line Finance
					</span>
					<Compass size={30} />
				</div>
				<h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
					Trace a rota até seu tesouro
				</h1>
			</div>
			<p className="text-muted-foreground text-sm">
				Reúna seus berries, escolha seu destino e deixe o Log Pose apontar o caminho.
			</p>
		</div>
	);
}
