import { useAtomValue } from 'jotai';
import { finnishDateAtom } from '../atoms/dateTimeAtoms';
import './DateComponent.css';

const DateComponent = () => {
	const { long: longDate } = useAtomValue(finnishDateAtom);

	return (
		<div className="date-component">
			<div className="date-content">
				<div className="date-main">{longDate}</div>
			</div>
		</div>
	);
};

export default DateComponent;
