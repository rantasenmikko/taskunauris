import { useAtomValue } from 'jotai';
import { finnishTimeAtom, finnishGreetingAtom } from '../atoms/dateTimeAtoms';
import './TimeComponent.css';

const TimeComponent = () => {
	const time = useAtomValue(finnishTimeAtom);
	const greeting = useAtomValue(finnishGreetingAtom);

	return (
		<div className="time-component">
			<div className="time-content">
				<div className="time-main">{time}</div>
				<div className="time-greeting">{greeting}</div>
			</div>
		</div>
	);
};

export default TimeComponent;
