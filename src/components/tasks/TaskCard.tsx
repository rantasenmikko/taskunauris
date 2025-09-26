import { useAtomValue, useSetAtom } from 'jotai';
import { isWorkingAtom, currentTaskIdAtom, switchToTaskAtom, formattedWorkTimeAtom } from '../../atoms/workTimeAtoms';
import type { Task } from '../../atoms/workTimeAtoms';
import TaskToggleButton from './TaskToggleButton';
import TaskInfo from './TaskInfo';
import TaskCompleteButton from './TaskCompleteButton';
import TaskReopenButton from './TaskReopenButton';
import './TaskCard.css';

interface TaskCardProps {
	task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
	const isWorking = useAtomValue(isWorkingAtom);
	const currentTaskId = useAtomValue(currentTaskIdAtom);
	const formattedTime = useAtomValue(formattedWorkTimeAtom);
	const switchToTask = useSetAtom(switchToTaskAtom);

	const isCurrentTask = currentTaskId === task.id;
	const isThisTaskRunning = isCurrentTask && isWorking && !task.isCompleted;

	const handleToggleWork = () => {
		if (!task.isCompleted) {
			switchToTask(task.id);
		}
	};

	return (
		<div className={`task-card ${isThisTaskRunning ? 'running' : ''} ${task.isCompleted ? 'completed' : ''}`}>
			<div className="task-card-header">
				<div className="task-title-section">
					<h3 className="task-title">{task.name}</h3>
					{task.isCompleted && task.completedAt && (
						<span className="completion-date">Valmistunut: {task.completedAt}</span>
					)}
				</div>
				{!task.isCompleted ? (
					<TaskToggleButton isRunning={isThisTaskRunning} onClick={handleToggleWork} />
				) : (
					<TaskReopenButton taskId={task.id} />
				)}
			</div>

			<TaskInfo
				totalDuration={task.totalDuration}
				currentSessionTime={formattedTime}
				showCurrentSession={isCurrentTask && !task.isCompleted}
			/>

			{!task.isCompleted && <TaskCompleteButton taskId={task.id} isCompleted={task.isCompleted} />}
		</div>
	);
};

export default TaskCard;
