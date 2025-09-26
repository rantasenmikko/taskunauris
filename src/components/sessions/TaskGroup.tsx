import type { WorkSession } from '../../atoms/workTimeAtoms';
import SessionItem from './SessionItem';

interface TaskGroupProps {
	taskName: string;
	sessions: WorkSession[];
}

const TaskGroup = ({ taskName, sessions }: TaskGroupProps) => {
	return (
		<div className="task-group">
			<div className="task-group-header">
				<h4 className="task-name">{taskName}</h4>
				<span className="task-session-count">
					{sessions.length} istunto{sessions.length !== 1 ? 'a' : ''}
				</span>
			</div>
			{sessions.map((session: WorkSession) => (
				<SessionItem key={session.id} session={session} />
			))}
		</div>
	);
};

export default TaskGroup;
