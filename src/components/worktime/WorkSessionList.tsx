import { useAtomValue } from 'jotai';
import { workSessionsHistoryAtom } from '../../atoms/workTimeAtoms';
import type { WorkSession } from '../../atoms/workTimeAtoms';
import './WorkSessionList.css';

const WorkSessionList = () => {
	const sessions = useAtomValue(workSessionsHistoryAtom);

	const formatDuration = (duration: number): string => {
		const totalSeconds = Math.floor(duration / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		if (hours > 0) {
			return `${hours}t ${minutes}min ${seconds}s`;
		}
		return `${minutes}min ${seconds}s`;
	};

	if (sessions.length === 0) {
		return null;
	}

	return (
		<div className="work-session-list">
			<h3 className="session-list-title">Työajan historia</h3>
			<div className="session-list-container">
				{sessions.map((session: WorkSession) => (
					<div key={session.id} className="session-item">
						<div className="session-date">{session.date}</div>
						<div className="session-times">
							<span className="session-start">{session.startTime}</span>
							<span className="session-separator">→</span>
							<span className="session-end">{session.endTime}</span>
						</div>
						<div className="session-duration">{formatDuration(session.duration)}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WorkSessionList;
