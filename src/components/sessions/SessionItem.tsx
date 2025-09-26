import { formatDuration } from '../../utils/timeFormatters';
import type { WorkSession } from '../../atoms/workTimeAtoms';

interface SessionItemProps {
	session: WorkSession;
}

const SessionItem = ({ session }: SessionItemProps) => {
	return (
		<div className="session-item">
			<div className="session-header">
				<div className="session-date">{session.date}</div>
				<div className="session-times">
					<span className="session-start">{session.startTime}</span>
					<span className="session-separator">→</span>
					<span className="session-end">{session.endTime}</span>
				</div>
				<div className="session-duration">{formatDuration(session.duration)}</div>
			</div>
			{session.description && <div className="session-description">{session.description}</div>}
		</div>
	);
};

export default SessionItem;
