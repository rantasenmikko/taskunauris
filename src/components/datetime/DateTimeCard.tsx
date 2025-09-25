import DateComponent from './DateComponent';
import TimeComponent from './TimeComponent';
import './DateTimeCard.css';

const DateTimeCard = () => {
	return (
		<div className="datetime-card">
			<DateComponent />
			<TimeComponent />
		</div>
	);
};

export default DateTimeCard;
