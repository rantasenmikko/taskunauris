import { useAtomValue } from 'jotai';
import { userCompletedTasksAtom } from '../atoms/workTimeAtoms';
import type { Task } from '../atoms/workTimeAtoms';
import AppNavigation from '../components/navigation/AppNavigation';
import './TehtavatPage.css';

const TehtavatPage = () => {
	const completedTasks = useAtomValue(userCompletedTasksAtom);

	// Group tasks by completion date
	const tasksByDate = completedTasks.reduce((acc, task) => {
		const date = task.completedAt || 'Ei päivämäärää';
		if (!acc[date]) {
			acc[date] = [];
		}
		acc[date].push(task);
		return acc;
	}, {} as Record<string, Task[]>);

	// Sort dates (most recent first)
	const sortedDates = Object.keys(tasksByDate).sort((a, b) => {
		if (a === 'Ei päivämäärää') return 1;
		if (b === 'Ei päivämäärää') return -1;
		// Convert Finnish date format (dd.mm.yyyy) to comparable format
		const parseDate = (dateStr: string) => {
			const [day, month, year] = dateStr.split('.');
			return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
		};
		return parseDate(b).getTime() - parseDate(a).getTime();
	});

	const formatDuration = (duration: number): string => {
		const totalSeconds = Math.floor(duration / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);

		if (hours > 0) {
			return `${hours}t ${minutes}min`;
		}
		return `${minutes}min`;
	};

	if (completedTasks.length === 0) {
		return (
			<div className="tehtavat-page">
				<AppNavigation />
				<div className="tehtavat-container">
					<h1 className="tehtavat-title">Valmiit tehtävät</h1>
					<div className="no-tasks">
						<p>Ei valmistuneita tehtäviä.</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="tehtavat-page">
			<AppNavigation />
			<div className="tehtavat-container">
				<h1 className="tehtavat-title">Valmiit tehtävät</h1>

				{sortedDates.map((date) => (
					<div key={date} className="date-section">
						<h2 className="date-header">{date}</h2>
						<div className="tasks-table">
							<div className="table-header">
								<div className="col-task">Tehtävä</div>
								<div className="col-created">Luotu</div>
								<div className="col-duration">Työaika</div>
							</div>
							{tasksByDate[date].map((task) => (
								<div key={task.id} className="table-row">
									<div className="col-task">{task.name}</div>
									<div className="col-created">{task.createdAt}</div>
									<div className="col-duration">{formatDuration(task.totalDuration)}</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TehtavatPage;
