import { useSetAtom } from 'jotai';
import { createTaskAtom } from '../../atoms/workTimeAtoms';
import { promptForTaskName } from '../../utils/userPrompts';
import './CreateTaskButton.css';

const CreateTaskButton = () => {
	const createTask = useSetAtom(createTaskAtom);

	const handleCreateTask = () => {
		const taskName = promptForTaskName();
		if (taskName !== null && taskName !== '') {
			createTask(taskName);
		}
	};

	return (
		<button className="create-task-button" onClick={handleCreateTask}>
			+ Uusi tehtävä
		</button>
	);
};

export default CreateTaskButton;
