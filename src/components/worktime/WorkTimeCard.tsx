import { useAtomValue, useSetAtom } from 'jotai';
import {
	formattedWorkTimeAtom,
	workStatusAtom,
	completeWorkSessionAtom,
	totalWorkedTimeAtom,
} from '../../atoms/workTimeAtoms';
import './WorkTimeCard.css';

const WorkTimeCard = () => {
	const formattedTime = useAtomValue(formattedWorkTimeAtom);
	const status = useAtomValue(workStatusAtom);
	const totalWorkedTime = useAtomValue(totalWorkedTimeAtom);
	const completeSession = useSetAtom(completeWorkSessionAtom);

	const handleComplete = () => {
		completeSession();
	};

	const showCompleteButton = totalWorkedTime > 0;

	return (
		<div className="work-time-card">
			<div className="work-time-header">
				<h3 className="work-time-title">Työajan seuranta</h3>
				<div className={`work-time-status ${status === 'Työskentelee' ? 'working' : 'break'}`}>
					{status === 'Työskentelee' ? '● Työskentelee' : '⏸ Tauko'}
				</div>
			</div>
			<div className="work-time-display">{formattedTime}</div>
			{showCompleteButton && (
				<button className="complete-session-button" onClick={handleComplete}>
					Valmis
				</button>
			)}
		</div>
	);
};

export default WorkTimeCard;
