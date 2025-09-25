import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { updateDateTimeAtom } from '../atoms/dateTimeAtoms';
import DateTimeCard from './DateTimeCard';
import './DateTimeDisplay.css';

const DateTimeDisplay = () => {
	const updateDateTime = useSetAtom(updateDateTimeAtom);

	useEffect(() => {
		// Initial update
		updateDateTime();

		// Set up interval for real-time updates
		const timer = setInterval(() => {
			updateDateTime();
		}, 1000);

		return () => clearInterval(timer);
	}, [updateDateTime]);

	return (
		<div className="datetime-display">
			<div className="datetime-container">
				<DateTimeCard />
			</div>
		</div>
	);
};

export default DateTimeDisplay;
