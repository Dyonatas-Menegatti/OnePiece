import { Anchor, Compass, Moon, ShipWheel, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@/hooks/useTheme';
import { Button } from './Button';
import { Divider } from './Divider';

export function Header() {
	const navigate = useNavigate();
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="border-(--border) border-b px-6 py-3">
			<nav className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
						<Anchor size={20} className="text-primary-foreground" />
					</div>
					<span className="text-lg">
						<span className="text-muted-foreground font-medium">Grand Line</span>
						<span className="text-primary font-extrabold"> Finance</span>
					</span>
				</div>
				<div className="flex items-center gap-1">
					<Button variant="secondary" icon={Compass} onClick={() => void navigate('/')}>
						<span className="hidden sm:inline">Novo Log Pose</span>
					</Button>
					<Button variant="ghost" icon={ShipWheel} onClick={() => void navigate('/historico')}>
						<span className="hidden sm:inline">Diário de bordo</span>
					</Button>
					<Divider orientation="vertical" />
					<Button
						aria-label={`Mudar para o modo ${theme === 'light' ? 'noite' : 'dia'}`}
						variant="ghost"
						icon={theme === 'light' ? Moon : Sun}
						onClick={toggleTheme}
					/>
				</div>
			</nav>
		</header>
	);
}
