import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './providers/AuthProvider';
import Dashboard from './components/Dashboard';
import TehtavatPage from './pages/TehtavatPage';
import './App.css';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/tehtavat" element={<TehtavatPage />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
