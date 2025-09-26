import { useSetAtom, useAtomValue } from 'jotai';
import { completeTaskAndSessionAtom, currentTaskIdAtom, totalWorkedTimeAtom } from '../../atoms/workTimeAtoms';
import { promptForSessionDescription } from '../../utils/userPrompts';
import './TaskCompleteButton.css';

interface TaskCompleteButtonProps {
	taskId: string;
	isCompleted: boolean;
}

const TaskCompleteButton = ({ taskId, isCompleted }: TaskCompleteButtonProps) => {
	const completeTaskAndSession = useSetAtom(completeTaskAndSessionAtom);
	const currentTaskId = useAtomValue(currentTaskIdAtom);
	const totalWorked = useAtomValue(totalWorkedTimeAtom);

	const isCurrentTask = currentTaskId === taskId;
	const hasActiveWork = isCurrentTask && totalWorked > 0;

	const handleComplete = () => {
		let sessionDescription = undefined;

		// If there's active work time, ask for session description first
		if (hasActiveWork) {
			sessionDescription = promptForSessionDescription();
			if (sessionDescription === null) {
				return; // User cancelled
			}
		}

		// Then confirm task completion
		if (window.confirm('Haluatko varmasti merkitä tehtävän valmiiksi?')) {
			completeTaskAndSession({ taskId, sessionDescription });
		}
	};

	if (isCompleted) {
		return null; // Don't show complete button for completed tasks
	}

	return (
		<button className="task-complete-button" onClick={handleComplete}>
			Valmis
		</button>
	);
};

export default TaskCompleteButton;
