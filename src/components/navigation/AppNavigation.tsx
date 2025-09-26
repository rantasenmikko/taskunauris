import { Link } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { currentUserAtom, logoutAtom } from '../../atoms/userAtoms';
import './AppNavigation.css';

const AppNavigation = () => {
	const currentUser = useAtomValue(currentUserAtom);
	const logout = useSetAtom(logoutAtom);

	const handleLogout = () => {
		if (window.confirm('Haluatko varmasti kirjautua ulos?')) {
			logout();
		}
	};

	return (
		<nav className="app-nav">
			<div className="nav-links">
				<Link to="/" className="nav-page-link">
					Etusivu
				</Link>
				<Link to="/tehtavat" className="nav-page-link">
					Tehtävät
				</Link>
			</div>
			<div className="nav-authenticated">
				<span className="current-user">{currentUser?.username}</span>
				<button onClick={handleLogout} className="logout-button">
					Kirjaudu ulos
				</button>
			</div>
		</nav>
	);
};

export default AppNavigation;
