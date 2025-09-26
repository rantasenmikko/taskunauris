import { useAtomValue } from 'jotai';
import { userWorkSessionsAtom, userTasksAtom } from '../../atoms/workTimeAtoms';
import type { WorkSession } from '../../atoms/workTimeAtoms';
import TaskGroup from './TaskGroup';
import './WorkSessionList.css';

const WorkSessionList = () => {
	const sessions = useAtomValue(userWorkSessionsAtom);
	const tasks = useAtomValue(userTasksAtom);

	const getTaskName = (taskId: string): string => {
		const task = tasks.find((t) => t.id === taskId);
		return task ? task.name : 'Tuntematon tehtävä';
	};

	// Group sessions by task
	const sessionsByTask = sessions.reduce((acc, session) => {
		const taskId = session.taskId;
		if (!acc[taskId]) {
			acc[taskId] = [];
		}
		acc[taskId].push(session);
		return acc;
	}, {} as Record<string, WorkSession[]>);

	if (sessions.length === 0) {
		return null;
	}

	return (
		<div className="work-session-list">
			<h3 className="session-list-title">Työajan historia</h3>
			<div className="session-list-container">
				{Object.entries(sessionsByTask).map(([taskId, taskSessions]) => (
					<TaskGroup key={taskId} taskName={getTaskName(taskId)} sessions={taskSessions} />
				))}
			</div>
		</div>
	);
};

export default WorkSessionList;
