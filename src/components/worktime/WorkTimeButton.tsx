import { useAtomValue, useSetAtom } from 'jotai';
import { isWorkingAtom, toggleWorkSessionAtom } from '../../atoms/workTimeAtoms';
import './WorkTimeButton.css';

const WorkTimeButton = () => {
	const isWorking = useAtomValue(isWorkingAtom);
	const toggleWorkSession = useSetAtom(toggleWorkSessionAtom);

	const handleClick = () => {
		toggleWorkSession();
	};

	return (
		<button className={`work-time-button ${isWorking ? 'stop' : 'start'}`} onClick={handleClick}>
			{isWorking ? 'Lopeta työskentely' : 'Aloita työskentely'}
		</button>
	);
};

export default WorkTimeButton;
