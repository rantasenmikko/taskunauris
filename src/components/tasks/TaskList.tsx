import { useAtomValue } from 'jotai';
import { userOngoingTasksAtom, userCompletedTasksAtom } from '../../atoms/workTimeAtoms';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = () => {
	const ongoingTasks = useAtomValue(userOngoingTasksAtom);
	const completedTasks = useAtomValue(userCompletedTasksAtom);

	// Don't render anything if there are no tasks at all
	if (ongoingTasks.length === 0 && completedTasks.length === 0) {
		return null;
	}

	return (
		<div className="task-list">
			<h2 className="task-list-title">Tehtävät</h2>

			{/* Ongoing Tasks */}
			{ongoingTasks.length > 0 && (
				<div className="tasks-container">
					{ongoingTasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</div>
			)}

			{/* Completed Tasks */}
			{completedTasks.length > 0 && (
				<div className="completed-tasks-section">
					<h3 className="completed-tasks-title">Valmiit tehtävät ({completedTasks.length})</h3>
					<div className="tasks-container">
						{completedTasks.map((task) => (
							<TaskCard key={task.id} task={task} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default TaskList;
