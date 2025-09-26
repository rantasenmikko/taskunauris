import { useSetAtom } from 'jotai';
import { completeWorkSessionAtom } from '../../atoms/workTimeAtoms';
import { promptForSessionDescription } from '../../utils/userPrompts';

interface CompleteSessionButtonProps {
	show: boolean;
}

const CompleteSessionButton = ({ show }: CompleteSessionButtonProps) => {
	const completeSession = useSetAtom(completeWorkSessionAtom);

	const handleComplete = () => {
		const description = promptForSessionDescription();
		if (description !== null) {
			completeSession(description);
		}
	};

	if (!show) {
		return null;
	}

	return (
		<button className="complete-session-button" onClick={handleComplete}>
			Valmis
		</button>
	);
};

export default CompleteSessionButton;
