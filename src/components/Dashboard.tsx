import { useAtomValue } from 'jotai';
import { userWorkSessionsAtom } from '../atoms/workTimeAtoms';
import { useTimerUpdates } from '../hooks/useTimerUpdates';
import AppNavigation from './navigation/AppNavigation';
import DateTimeCard from './datetime/DateTimeCard';
import CreateTaskButton from './tasks/CreateTaskButton';
import TaskList from './tasks/TaskList';
import WorkSessionList from './sessions/WorkSessionList';
import './Dashboard.css';

const Dashboard = () => {
	useTimerUpdates();
	const workSessions = useAtomValue(userWorkSessionsAtom);

	// Show work session list if there are completed sessions
	const showWorkSessions = workSessions.length > 0;

	return (
		<div className="dashboard">
			<AppNavigation />
			<div className="datetime-container">
				<DateTimeCard />
			</div>
			<div className="create-task-container">
				<CreateTaskButton />
			</div>
			<TaskList />
			{showWorkSessions && <WorkSessionList />}
		</div>
	);
};

export default Dashboard;
