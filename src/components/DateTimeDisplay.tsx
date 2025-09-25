import { useEffect } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { updateDateTimeAtom } from '../atoms/dateTimeAtoms';
import { updateWorkTimeAtom, totalWorkedTimeAtom, workSessionsHistoryAtom } from '../atoms/workTimeAtoms';
import DateTimeCard from './datetime/DateTimeCard';
import WorkTimeButton from './worktime/WorkTimeButton';
import WorkTimeCard from './worktime/WorkTimeCard';
import WorkSessionList from './worktime/WorkSessionList';
import './DateTimeDisplay.css';

const DateTimeDisplay = () => {
	const updateDateTime = useSetAtom(updateDateTimeAtom);
	const updateWorkTime = useSetAtom(updateWorkTimeAtom);
	const totalWorkedTime = useAtomValue(totalWorkedTimeAtom);
	const workSessions = useAtomValue(workSessionsHistoryAtom);

	useEffect(() => {
		// Initial update
		updateDateTime();

		// Set up interval for real-time updates
		const timer = setInterval(() => {
			updateDateTime();
			updateWorkTime(); // Update work time as well
		}, 100); // Update more frequently for work time precision

		return () => clearInterval(timer);
	}, [updateDateTime, updateWorkTime]);

	// Show work time card if there's any worked time
	const showWorkTime = totalWorkedTime > 0;
	// Show work session list if there are completed sessions
	const showWorkSessions = workSessions.length > 0;

	return (
		<div className="datetime-display">
			<h1 className="datetime-title">Nykyinen päivämäärä ja aika</h1>
			<div className="datetime-container">
				<DateTimeCard />
			</div>
			<WorkTimeButton />
			{showWorkTime && <WorkTimeCard />}
			{showWorkSessions && <WorkSessionList />}
		</div>
	);
};

export default DateTimeDisplay;
