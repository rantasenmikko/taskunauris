import { useSetAtom } from 'jotai';
import { reopenTaskAtom } from '../../atoms/workTimeAtoms';
import './TaskReopenButton.css';

interface TaskReopenButtonProps {
	taskId: string;
}

const TaskReopenButton = ({ taskId }: TaskReopenButtonProps) => {
	const reopenTask = useSetAtom(reopenTaskAtom);

	const handleReopen = () => {
		if (window.confirm('Haluatko avata tehtävän uudelleen?')) {
			reopenTask(taskId);
		}
	};

	return (
		<button className="task-reopen-button" onClick={handleReopen}>
			Avaa uudelleen
		</button>
	);
};

export default TaskReopenButton;
