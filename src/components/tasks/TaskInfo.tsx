import { formatTaskDuration } from '../../utils/timeFormatters';

interface TaskInfoProps {
	totalDuration: number;
	currentSessionTime?: string;
	showCurrentSession: boolean;
}

const TaskInfo = ({ totalDuration, currentSessionTime, showCurrentSession }: TaskInfoProps) => {
	return (
		<div className="task-info">
			<div className="task-total-time">Yhteensä: {formatTaskDuration(totalDuration)}</div>
			{showCurrentSession && currentSessionTime && (
				<div className="current-session-time">Nykyinen istunto: {currentSessionTime}</div>
			)}
		</div>
	);
};

export default TaskInfo;
