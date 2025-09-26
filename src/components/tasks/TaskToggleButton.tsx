interface TaskToggleButtonProps {
	isRunning: boolean;
	onClick: () => void;
}

const TaskToggleButton = ({ isRunning, onClick }: TaskToggleButtonProps) => {
	return (
		<button className={`task-toggle-button ${isRunning ? 'stop' : 'start'}`} onClick={onClick}>
			{isRunning ? 'Lopeta' : 'Aloita'}
		</button>
	);
};

export default TaskToggleButton;
